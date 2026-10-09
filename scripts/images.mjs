// Image pipeline: turns the raw photos in your "Website Images" folder into consistent, optimised site assets.
//
//   node scripts/images.mjs [path-to-"Website Images"-folder]
//
// Products : trimmed to the bike, centred on a white 4:3 canvas (1200x900), small sources enlarged, WebP.
//            Matched to products by file name (= product name). Writes config/data/productImages.ts.
// Homepage : hero slides and category tiles cropped to a 4:3 frame around the main subject, WebP.
//
// Nothing here removes backgrounds; it only trims uniform borders and normalises size, framing and weight.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ARGS = process.argv.slice(2);
const HOME_ONLY = ARGS.includes('--home-only');
const ROOT = ARGS.find((a) => !a.startsWith('--')) || 'C:/Users/rtutc/Desktop/Independent Electric Bikes/Website Images';
const OUT = 'public/images';
const W = 1200;
const H = 900;
const FILL_W = 0.92; // product occupies at most 92% of the canvas width
const FILL_H = 0.94;
const MAX_KB = 150;

const norm = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9+]/g, '');
const kb = (n) => Math.round(n / 1024);

function loadProducts() {
  const out = [];
  for (const f of fs.readdirSync('config/data').filter((f) => f.endsWith('.ts') && !['verified.ts', 'productImages.ts', 'accessoryRedirects.ts', 'compatibility.ts'].includes(f))) {
    const t = fs.readFileSync(`config/data/${f}`, 'utf8').replace(/\r\n/g, '\n');
    JSON.parse(t.slice(t.indexOf('= [') + 2, t.lastIndexOf(']') + 1)).forEach((p) => out.push({ slug: p.slug, name: p.name, category: p.category }));
  }
  return out;
}

async function encodeWebp(pipeline, maxKb = MAX_KB) {
  for (const quality of [84, 78, 72, 66, 60, 52]) {
    const buf = await pipeline.clone().webp({ quality, effort: 5 }).toBuffer();
    if (kb(buf.length) <= maxKb) return buf;
  }
  return pipeline.clone().webp({ quality: 45, effort: 5 }).toBuffer();
}

/** Average colour of the four corners (null when the corners disagree, i.e. not a plain studio background). */
async function cornerColour(buf) {
  const { data, info } = await sharp(buf).resize(40, 30, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true });
  const px = (x, y) => [0, 1, 2].map((c) => data[(y * info.width + x) * 3 + c]);
  const pts = [px(1, 1), px(info.width - 2, 1), px(1, info.height - 2), px(info.width - 2, info.height - 2)];
  const avg = [0, 1, 2].map((c) => pts.reduce((a, p) => a + p[c], 0) / 4);
  const spread = Math.max(...pts.map((p) => Math.abs(p[0] - avg[0])));
  if (spread <= 6) return avg;
  // Soft gradient backdrop: corners differ a little but the whole border is light. Treat 232+ as white.
  const border = [];
  for (let x = 0; x < info.width; x++) for (const y of [0, 1, info.height - 2, info.height - 1]) border.push(px(x, y)[0]);
  const mean = border.reduce((a, b) => a + b, 0) / border.length;
  const sd = Math.sqrt(border.reduce((a, b) => a + (b - mean) ** 2, 0) / border.length);
  return mean >= 226 && sd <= 16 ? [Math.min(232, mean - 2), Math.min(232, mean - 2), Math.min(232, mean - 2)] : null;
}

/**
 * Brightens a hero photo toward a comfortable mean luminance (gamma only, so highlights are not clipped),
 * with a small saturation lift so lifted shadows do not look grey.
 */
async function brightenHero(pipeline, target = 132) {
  const { channels } = await pipeline.clone().resize(200).stats();
  const mean = channels.slice(0, 3).reduce((a, c) => a + c.mean, 0) / 3;
  const gamma = Math.min(1.9, Math.max(1, Math.log(mean / 255) / Math.log(target / 255)));
  console.log(`  hero mean ${mean.toFixed(0)} -> gamma ${gamma.toFixed(2)}`);
  return pipeline.gamma(gamma).modulate({ saturation: 1.06 });
}

/** Studio shot -> product trimmed from its background, centred and enlarged on a white 4:3 canvas. */
async function productCanvas(file) {
  let flat = await sharp(file).rotate().flatten({ background: '#ffffff' }).png().toBuffer();

  // Off-white studio backgrounds (e.g. 241-248 grey) show as a faint box on the white card; lift them to pure white.
  const bg = await cornerColour(flat);
  if (bg && bg.every((c) => c >= 225 && c < 254)) {
    flat = await sharp(flat)
      .linear(bg.map((c) => Math.min(1.15, 255 / c)), [0, 0, 0])
      .png()
      .toBuffer();
  }
  const meta = await sharp(flat).metadata();

  let subject = flat;
  try {
    const trimmed = await sharp(flat).trim({ threshold: 22 }).toBuffer({ resolveWithObject: true });
    // Guard: keep the trim only if the subject did not collapse to a sliver (protects shots that touch the edge).
    if (trimmed.info.width >= meta.width * 0.12 && trimmed.info.height >= meta.height * 0.12) subject = trimmed.data;
  } catch {
    /* uniform image or trim failed: use as is */
  }
  // The backdrop may only become the border after trimming a white margin (a grey box inside white): lift it again.
  const bg2 = await cornerColour(subject);
  if (bg2 && bg2.every((c) => c >= 225 && c < 254)) {
    subject = await sharp(subject)
      .linear(bg2.map((c) => Math.min(1.15, 255 / c)), [0, 0, 0])
      .png()
      .toBuffer();
  }
  const sm = await sharp(subject).metadata();
  const scale = Math.min((W * FILL_W) / sm.width, (H * FILL_H) / sm.height);
  const tw = Math.max(1, Math.round(sm.width * scale));
  const th = Math.max(1, Math.round(sm.height * scale));
  let resized = sharp(subject).resize(tw, th, { kernel: 'lanczos3' });
  if (scale > 1.1) resized = resized.sharpen({ sigma: 0.8 }); // recover crispness lost to enlargement
  const piece = await resized.png().toBuffer();

  const pipeline = sharp({ create: { width: W, height: H, channels: 3, background: '#ffffff' } }).composite([
    { input: piece, left: Math.round((W - tw) / 2), top: Math.round((H - th) / 2) },
  ]);
  return { pipeline, upscale: scale, srcShort: Math.min(sm.width, sm.height) };
}

function walk(d) {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
}

fs.mkdirSync(`${OUT}/products`, { recursive: true });
fs.mkdirSync(`${OUT}/home`, { recursive: true });
fs.mkdirSync(`${OUT}/categories`, { recursive: true });

// ---------- products ----------
if (!HOME_ONLY) for (const f of fs.readdirSync(`${OUT}/products`)) fs.unlinkSync(`${OUT}/products/${f}`);
const products = loadProducts();
const byName = new Map(products.map((p) => [norm(p.name), p]));
const manifest = {};
const unmatched = [];
const lowRes = [];
const productDir = path.join(ROOT, 'product images');
if (!HOME_ONLY && fs.existsSync(productDir)) {
  // Oldest first, so when two files share a product name (e.g. an old .webp and a replacement .avif) the newest wins.
  const productFiles = walk(productDir).sort((x, y) => fs.statSync(x).mtimeMs - fs.statSync(y).mtimeMs);
  const newest = new Map(); // slug -> latest file for that product
  for (const file of productFiles) {
    const base = path.basename(file).replace(/\.[^.]+$/, '');
    const product = byName.get(norm(base));
    if (!product) {
      unmatched.push(path.relative(productDir, file));
      continue;
    }
    newest.set(product.slug, { file, base, product });
  }
  for (const { file, base, product } of newest.values()) {
    const { pipeline, upscale, srcShort } = await productCanvas(file);
    const canvas = await pipeline.png().toBuffer(); // finished 1200x900 white canvas; smaller sizes are cut from this
    const buf = await encodeWebp(sharp(canvas));
    // Content-hashed names let the CDN and browsers cache these files forever (see next.config.ts headers).
    const hash = crypto.createHash('sha1').update(buf).digest('hex').slice(0, 8);
    const outBase = `${OUT}/products/${product.slug}.${hash}`;
    fs.writeFileSync(`${outBase}.webp`, buf);
    // Smaller renditions for cards (about 240-480 css px wide) and thumbnails, so cards never download the 1200px file.
    for (const [width, maxKb] of [[800, 55], [400, 24]]) {
      fs.writeFileSync(`${outBase}-${width}.webp`, await encodeWebp(sharp(canvas).resize(width, Math.round((width * H) / W), { kernel: 'lanczos3' }), maxKb));
    }
    manifest[product.slug] = `/images/products/${product.slug}.${hash}.webp`;
    if (srcShort < 450 || upscale > 2.2) lowRes.push(`${base} (shortest side ${srcShort}px, enlarged ${upscale.toFixed(1)}x)`);
  }
}
// --home-only skips products entirely, so it must never rewrite the product manifest (that would empty it).
if (!HOME_ONLY) {
  if (Object.keys(manifest).length === 0) {
    console.error('No product photos were processed; refusing to overwrite config/data/productImages.ts with an empty list.');
    process.exit(1);
  }
  const lines = Object.entries(manifest)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([slug, p]) => `  '${slug}': '${p}',`);
  fs.writeFileSync(
    'config/data/productImages.ts',
    `// Generated by scripts/images.mjs - do not edit by hand. Re-run the script after adding photos.\n` +
      `export const PRODUCT_PLACEHOLDER = '/images/product-placeholder.svg';\n\n` +
      `export const PRODUCT_IMAGES: Record<string, string> = {\n${lines.join('\n')}\n};\n`
  );
}

// ---------- homepage ----------
const heroDir = path.join(ROOT, 'homepage images', 'hero images');
if (fs.existsSync(heroDir)) {
  const files = fs.readdirSync(heroDir).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort();
  for (const [i, f] of files.entries()) {
    // The hero fills the whole section: a wide desktop crop and a tall mobile crop, both around the main subject.
    const src = () => sharp(path.join(heroDir, f)).rotate();
    const wide = await brightenHero(src().resize(2000, 1125, { fit: 'cover', position: sharp.strategy.attention }));
    fs.writeFileSync(`${OUT}/home/hero-${i + 1}.webp`, await encodeWebp(wide, 260));
    const tall = await brightenHero(src().resize(900, 1200, { fit: 'cover', position: sharp.strategy.attention }));
    fs.writeFileSync(`${OUT}/home/hero-${i + 1}-m.webp`, await encodeWebp(tall, 170));
  }
  console.log(`hero slides: ${files.length}`);
}
const CATEGORY_FILES = {
  'accessories and parts': 'accessories',
  'e bikes': 'electric-bikes',
  'e scooter': 'electric-scooters',
  'e skateboard': 'electric-skateboards',
  'kids and off road': 'kids-off-road-ev',
  mobility: 'mobility-scooters',
  'self balancing ev': 'self-balancing-ev',
};
const CATEGORY_FOCUS = { 'electric-bikes': 'south' };
const catDir = path.join(ROOT, 'homepage images', 'shop by cat grid');
if (fs.existsSync(catDir)) {
  for (const f of fs.readdirSync(catDir)) {
    const slug = CATEGORY_FILES[f.replace(/\.[^.]+$/, '').toLowerCase()];
    if (!slug) {
      console.log(`category image not mapped: ${f}`);
      continue;
    }
    // Tall photos are cropped to landscape, so the subject position is chosen per image (default: most salient region).
    const position = CATEGORY_FOCUS[slug] || sharp.strategy.attention;
    const p = sharp(path.join(catDir, f)).rotate().resize(W, H, { fit: 'cover', position });
    fs.writeFileSync(`${OUT}/categories/${slug}.webp`, await encodeWebp(p, 140));
  }
}

// The accessories tile is shared by the merged parts and safety categories.
if (fs.existsSync(`${OUT}/categories/accessories.webp`)) for (const n of ['batteries-parts-kits', 'safety-security-carry']) fs.copyFileSync(`${OUT}/categories/accessories.webp`, `${OUT}/categories/${n}.webp`);

console.log(`product photos matched: ${Object.keys(manifest).length}`);
if (unmatched.length) console.log(`NOT matched to a product (check the name or whether it was a removed duplicate):\n  ${unmatched.join('\n  ')}`);
if (lowRes.length) console.log(`low-resolution sources (enlarged; reshoot candidates):\n  ${lowRes.join('\n  ')}`);
