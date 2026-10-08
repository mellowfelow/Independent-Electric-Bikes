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

const ROOT = process.argv[2] || 'C:/Users/rtutc/Desktop/Independent Electric Bikes/Website Images';
const OUT = 'public/images';
const W = 1200;
const H = 900;
const FILL_W = 0.92; // product occupies at most 92% of the canvas width
const FILL_H = 0.88;
const MAX_KB = 150;

const norm = (s) => s.toLowerCase().normalize('NFKD').replace(/[^a-z0-9+]/g, '');
const kb = (n) => Math.round(n / 1024);

function loadProducts() {
  const out = [];
  for (const f of fs.readdirSync('config/data').filter((f) => f.endsWith('.ts') && f !== 'verified.ts' && f !== 'productImages.ts')) {
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
  return mean >= 236 && sd <= 12 ? [232, 232, 232] : null;
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
const products = loadProducts();
const byName = new Map(products.map((p) => [norm(p.name), p]));
const manifest = {};
const unmatched = [];
const lowRes = [];
const productDir = path.join(ROOT, 'product images');
if (fs.existsSync(productDir)) {
  for (const file of walk(productDir)) {
    const base = path.basename(file).replace(/\.[^.]+$/, '');
    const product = byName.get(norm(base));
    if (!product) {
      unmatched.push(path.relative(productDir, file));
      continue;
    }
    const { pipeline, upscale, srcShort } = await productCanvas(file);
    const buf = await encodeWebp(pipeline);
    fs.writeFileSync(`${OUT}/products/${product.slug}.webp`, buf);
    manifest[product.slug] = `/images/products/${product.slug}.webp`;
    if (srcShort < 450 || upscale > 2.2) lowRes.push(`${base} (shortest side ${srcShort}px, enlarged ${upscale.toFixed(1)}x)`);
  }
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

// ---------- homepage ----------
const heroDir = path.join(ROOT, 'homepage images', 'hero images');
if (fs.existsSync(heroDir)) {
  const files = fs.readdirSync(heroDir).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f)).sort();
  for (const [i, f] of files.entries()) {
    const p = sharp(path.join(heroDir, f)).rotate().resize(W, H, { fit: 'cover', position: sharp.strategy.attention });
    fs.writeFileSync(`${OUT}/home/hero-${i + 1}.webp`, await encodeWebp(p, 170));
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

console.log(`product photos matched: ${Object.keys(manifest).length}`);
if (unmatched.length) console.log(`NOT matched to a product (check the name or whether it was a removed duplicate):\n  ${unmatched.join('\n  ')}`);
if (lowRes.length) console.log(`low-resolution sources (enlarged; reshoot candidates):\n  ${lowRes.join('\n  ')}`);
