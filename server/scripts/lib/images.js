// Shared image-sourcing helpers for the seed scripts.
//
// Primary source: the Unsplash API (real, licensed stock photography),
// searched by a descriptive query and picked deterministically so re-running
// the seed doesn't reshuffle every photo. Falls back to a generated
// placeholder swatch — never a live "random photo" service — when no
// UNSPLASH_ACCESS_KEY is configured, a search errors, or it comes up empty.

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

function seedToLock(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return hash;
}

// One search per call — cache/reuse the results across a product's multiple
// image slots rather than searching per-image.
async function searchUnsplash(query) {
  if (!UNSPLASH_ACCESS_KEY) return [];
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=10&orientation=portrait`;
  const res = await fetch(url, { headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` } });
  if (!res.ok) {
    console.warn(`  [unsplash] search failed for "${query}": ${res.status} ${res.statusText}`);
    return [];
  }
  const json = await res.json();
  return json.results || [];
}

// Deterministically pick one result and build a URL cropped to the requested
// size via Unsplash's dynamic image params.
function pickUnsplashUrl(results, seed, w, h) {
  if (!results.length) return null;
  const photo = results[seedToLock(seed) % results.length];
  const base = photo.urls?.raw;
  if (!base) return null;
  return `${base}&w=${w}&h=${h}&fit=crop&crop=entropy&q=80`;
}

// Neutral tone pairs only — the brand guidelines reserve gold for strokes,
// never a fill, so placeholder art stays ink/surface tones.
const PLACEHOLDER_PALETTE = [
  ['#E9E8E4', '#DEDDD9'],
  ['#DEDDD9', '#CFCEC9'],
  ['#F5F4F1', '#E9E8E4'],
];

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// A neutral diagonal-stripe swatch captioned with a label, as a data: URI —
// the last-resort fallback when no real photo is available. Never uploaded
// to Storage (see uploadImage in seed.js) — stored inline as-is.
function placeholderSvg(label, w, h, seed) {
  const [bg, stripe] = PLACEHOLDER_PALETTE[seedToLock(seed) % PLACEHOLDER_PALETTE.length];
  const fontSize = Math.max(11, Math.round(Math.min(w, h) / 28));
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">` +
    `<defs><pattern id="stripe" width="28" height="28" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">` +
    `<rect width="28" height="28" fill="${bg}"/><rect width="14" height="28" fill="${stripe}"/></pattern></defs>` +
    `<rect width="100%" height="100%" fill="url(#stripe)"/>` +
    `<text x="16" y="${h - 16}" font-family="ui-monospace, monospace" font-size="${fontSize}" fill="#6E6E6A">${escapeXml(label)}</text>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// Resolve one image: try Unsplash (given pre-fetched search results), fall
// back to the local swatch. Always succeeds.
function resolveImage(results, label, w, h, seed) {
  return pickUnsplashUrl(results, seed, w, h) || placeholderSvg(label, w, h, seed);
}

module.exports = { seedToLock, searchUnsplash, pickUnsplashUrl, placeholderSvg, resolveImage, UNSPLASH_ACCESS_KEY };
