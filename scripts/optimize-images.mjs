// Image optimization for the hero banner.
// Converts heavy hero PNGs to WebP (keeps PNG originals as fallback) and
// generates responsive background variants so mobile does not download the
// full-size desktop backgrounds. Also optimizes the localized decor PNGs.
//
// Run: npm run optimize-images
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMAGES = path.resolve(__dirname, '../assets/images');
const DECOR = path.join(IMAGES, 'decor');

// Full-viewport backgrounds -> single WebP + two responsive widths.
const BACKGROUNDS = ['bg_spicy_cheese', 'bg_cheese', 'bg_salted_egg'];
// Product images -> single optimized WebP (displayed via object-fit: contain).
const PRODUCTS = ['sot-pho-mai-cay-final', 'sot-pho-mai-final', 'sot-trung-muoi-final'];
const BG_WIDTHS = [1600, 800];

async function toWebp(src, dest, opts = {}) {
  await sharp(src).webp({ quality: 80, effort: 5, ...opts }).toFile(dest);
  return dest;
}

async function human(file) {
  const { size } = await fs.stat(file);
  return (size / 1024).toFixed(0) + 'KB';
}

async function processBackgrounds() {
  for (const name of BACKGROUNDS) {
    const src = path.join(IMAGES, `${name}.png`);
    const full = path.join(IMAGES, `${name}.webp`);
    await toWebp(src, full);
    console.log(`bg  ${name}.webp -> ${await human(full)} (from ${await human(src)})`);
    for (const w of BG_WIDTHS) {
      const dest = path.join(IMAGES, `${name}-${w}w.webp`);
      await sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78, effort: 5 }).toFile(dest);
      console.log(`bg  ${name}-${w}w.webp -> ${await human(dest)}`);
    }
  }
}

async function processProducts() {
  for (const name of PRODUCTS) {
    const src = path.join(IMAGES, `${name}.png`);
    const dest = path.join(IMAGES, `${name}.webp`);
    await toWebp(src, dest, { quality: 82 });
    console.log(`prod ${name}.webp -> ${await human(dest)} (from ${await human(src)})`);
  }
}

async function processDecor() {
  let entries;
  try {
    entries = await fs.readdir(DECOR);
  } catch {
    console.log('decor/ not found, skipping decor optimization');
    return;
  }
  for (const file of entries) {
    if (!/\.png$/i.test(file)) continue;
    const src = path.join(DECOR, file);
    const dest = path.join(DECOR, file.replace(/\.png$/i, '.webp'));
    // Decor renders at <=220px CSS width; 560px covers 2x retina comfortably.
    await sharp(src).resize({ width: 560, withoutEnlargement: true }).webp({ quality: 82, effort: 5 }).toFile(dest);
    console.log(`decor ${path.basename(dest)} -> ${await human(dest)} (from ${await human(src)})`);
  }
}

await processBackgrounds();
await processProducts();
await processDecor();
console.log('Done.');
