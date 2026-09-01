/* eslint-disable no-console */
// Upgrades the decorative placeholder images in web/public/assets/placeholders
// from generated swatches to real Unsplash photos. Safe to re-run — each slot
// is looked up fresh and overwritten in place, so the web app's <Image>
// sources never need to change. Requires UNSPLASH_ACCESS_KEY (see .env.example).
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { searchUnsplash, pickUnsplashUrl, UNSPLASH_ACCESS_KEY } = require('./lib/images');

const SLOTS = require('./web-image-slots.json');
const OUT_DIR = path.join(__dirname, '..', '..', 'web', 'public', 'assets', 'placeholders');

if (!UNSPLASH_ACCESS_KEY) {
  console.error(
    'Missing UNSPLASH_ACCESS_KEY.\n' +
      'Copy server/.env.example to server/.env (if you haven\'t) and fill in a free Unsplash access key — see the comment above UNSPLASH_ACCESS_KEY in that file for how to get one.'
  );
  process.exit(1);
}

async function main() {
  const names = Object.keys(SLOTS);
  console.log(`Fetching ${names.length} decorative images from Unsplash...`);

  for (const name of names) {
    const { query, w, h } = SLOTS[name];
    process.stdout.write(`  ${name} (${query}) `);
    const results = await searchUnsplash(query);
    const url = pickUnsplashUrl(results, `jd-${name}`, w, h);
    if (!url) {
      console.log('- no results, left as-is');
      continue;
    }
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`- download failed (${res.status}), left as-is`);
      continue;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(path.join(OUT_DIR, `${name}.jpg`), buffer);
    console.log('done');
  }

  console.log('\nDone. Restart the web dev server (or rebuild) to see the new images.');
}

main().catch((err) => {
  console.error('\nFailed:', err);
  process.exit(1);
});
