/* eslint-disable no-console */
require('dotenv').config();

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const { CATEGORIES, PRODUCTS, STORES, JOURNAL_ARTICLES } = require('./seedData');
const { searchUnsplash, resolveImage, UNSPLASH_ACCESS_KEY } = require('./lib/images');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'product-images';

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n' +
      'Copy server/.env.example to server/.env, fill in your Supabase project credentials, and re-run `npm run seed`.'
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, { auth: { persistSession: false } });

async function ensureBucket() {
  const { data: buckets, error } = await supabase.storage.listBuckets();
  if (error) throw error;

  if (!buckets.some((b) => b.name === BUCKET)) {
    console.log(`Creating storage bucket "${BUCKET}"...`);
    const { error: createError } = await supabase.storage.createBucket(BUCKET, { public: true });
    if (createError) throw createError;
  }
}

// `source` is either an http(s) URL or a local file path, relative to this
// scripts/ directory (real product photography — see scripts/product-photos/).
// Generated placeholder images are `data:` URIs and never reach this
// function — they're stored directly, skipping the upload (see seedProducts).
async function uploadImage(source, storagePath) {
  let buffer;
  if (/^https?:\/\//.test(source)) {
    const res = await fetch(source);
    if (!res.ok) throw new Error(`Failed to download ${source}: ${res.status}`);
    buffer = Buffer.from(await res.arrayBuffer());
  } else {
    buffer = fs.readFileSync(path.join(__dirname, source));
  }

  const { error } = await supabase.storage.from(BUCKET).upload(storagePath, buffer, {
    contentType: 'image/jpeg',
    upsert: true,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
  return data.publicUrl;
}

async function seedCategories() {
  console.log(`Seeding ${CATEGORIES.length} categories...`);
  const { data, error } = await supabase
    .from('categories')
    .upsert(CATEGORIES, { onConflict: 'slug' })
    .select();
  if (error) throw error;

  const bySlug = {};
  data.forEach((c) => (bySlug[c.slug] = c.id));
  return bySlug;
}

async function seedProducts(categoryIdBySlug) {
  console.log(
    UNSPLASH_ACCESS_KEY
      ? `Seeding ${PRODUCTS.length} products (fetching photos from Unsplash where none are checked in)...`
      : `Seeding ${PRODUCTS.length} products (no UNSPLASH_ACCESS_KEY set — using placeholder swatches; see .env.example)...`
  );

  for (const p of PRODUCTS) {
    process.stdout.write(`  ${p.slug} `);

    const images = [];
    if (Array.isArray(p.sourceImages)) {
      // Explicit override — real photography or a direct URL.
      for (let i = 0; i < p.sourceImages.length; i++) {
        const publicUrl = await uploadImage(p.sourceImages[i], `products/${p.slug}/${i}.jpg`);
        images.push(publicUrl);
        process.stdout.write('.');
      }
    } else {
      // Search marker — one Unsplash search per product, reused across slots.
      const { search, count, seed } = p.sourceImages;
      const results = await searchUnsplash(search);
      for (let i = 0; i < count; i++) {
        const w = 900;
        const h = i === 0 ? 1125 : 1000;
        const resolved = resolveImage(results, p.name, w, h, `${seed}-${i}`);
        const publicUrl = resolved.startsWith('data:') ? resolved : await uploadImage(resolved, `products/${p.slug}/${i}.jpg`);
        images.push(publicUrl);
        process.stdout.write('.');
      }
    }

    const { sourceImages, category, ...rest } = p;
    const { error } = await supabase.from('products').upsert(
      {
        ...rest,
        category_id: categoryIdBySlug[category] || null,
        images,
      },
      { onConflict: 'slug' }
    );
    if (error) throw error;
    console.log(' done');
  }
}

async function seedStores() {
  console.log(`Seeding ${STORES.length} stores...`);
  const { error } = await supabase.from('stores').insert(STORES);
  if (error && !`${error.message}`.includes('duplicate')) throw error;
}

async function seedJournal() {
  console.log(`Seeding ${JOURNAL_ARTICLES.length} journal articles...`);
  const withCovers = [];
  for (const a of JOURNAL_ARTICLES) {
    const results = await searchUnsplash(a.title);
    withCovers.push({ ...a, cover_image: resolveImage(results, a.title, 1200, 900, `jd-journal-${a.slug}`) });
  }
  const { error } = await supabase.from('journal_articles').upsert(withCovers, { onConflict: 'slug' });
  if (error) throw error;
}

async function seedCollection(categoryIdBySlug) {
  console.log('Seeding "Autumn Collection"...');
  const { data: existing } = await supabase
    .from('collections')
    .select('id')
    .eq('slug', 'autumn-collection')
    .maybeSingle();

  let collectionId = existing?.id;
  if (!collectionId) {
    const heroResults = await searchUnsplash('autumn wool fashion collection');
    const { data, error } = await supabase
      .from('collections')
      .insert({
        slug: 'autumn-collection',
        name: 'Autumn Collection',
        description: 'Wool flannel, raw silk and cashmere — a season built around three cloths.',
        season: 'Autumn',
        hero_image: resolveImage(heroResults, 'Autumn Collection', 1600, 900, 'jd-autumn-hero'),
      })
      .select()
      .single();
    if (error) throw error;
    collectionId = data.id;
  }

  const { data: featuredProducts, error: prodError } = await supabase
    .from('products')
    .select('id')
    .eq('is_featured', true);
  if (prodError) throw prodError;

  const links = featuredProducts.map((p) => ({ collection_id: collectionId, product_id: p.id }));
  if (links.length) {
    const { error } = await supabase.from('collection_products').upsert(links, {
      onConflict: 'collection_id,product_id',
    });
    if (error) throw error;
  }
}

async function main() {
  console.log(`Seeding Supabase project at ${SUPABASE_URL}\n`);
  await ensureBucket();
  const categoryIdBySlug = await seedCategories();
  await seedProducts(categoryIdBySlug);
  await seedStores();
  await seedJournal();
  await seedCollection(categoryIdBySlug);
  console.log('\nDone. Your Supabase project now has categories, products (with images in Storage), stores, journal articles and a featured collection.');
}

main().catch((err) => {
  console.error('\nSeed failed:', err);
  process.exit(1);
});
