// One-off: applies the approved taxonomy/product expansion. Source of prices: scripts/expansion-items.json (checked 2026-10-09).
import fs from 'node:fs';

const read = (f) => {
  const t = fs.readFileSync(`config/data/${f}.ts`, 'utf8').replace(/\r\n/g, '\n');
  const i = t.indexOf('= [');
  return { head: t.slice(0, i + 2), arr: JSON.parse(t.slice(i + 2, t.lastIndexOf(']') + 1)) };
};
const write = (f, head, arr) => fs.writeFileSync(`config/data/${f}.ts`, `${head} ${JSON.stringify(arr, null, 2)};\n`);

// 1. Move existing accessories into the new categories.
const MOVE = {
  'security-locks': ['locks-security', null],
  'safety-apparel-helmets': ['safety-gear', null],
  'utility-cargo-add-ons': ['bags-racks-carry', null],
  'replacement-batteries-chargers': ['batteries-chargers', 'ebike-chargers'],
};
const SUB_BY_SLUG = {
  'kryptonite-evolution-standard-u-lock': 'u-d-locks',
  'abus-granit-x-plus-540-u-lock': 'u-d-locks',
  'hiplok-d1000-anti-angle-grinder-u-lock': 'u-d-locks',
  'kryptonite-evolution-mini-7-with-cable': 'u-d-locks',
  'hiplok-gold-chain-lock': 'chain-locks',
  'kryptonite-new-york-legend-1515-chain-lock': 'chain-locks',
  'abus-bordo-granit-xplus-6500-folding-lock': 'folding-locks',
  'fox-racing-dropframe-pro-helmet': 'helmets',
  'troy-lee-designs-stage-mips-helmet': 'helmets',
  'thousand-heritage-helmet-mips': 'helmets',
  'lumos-ultra-smart-led-helmet-with-indicators': 'helmets',
  'giro-fixture-mips-ii-mountain-helmet': 'helmets',
  'fox-racing-dropframe-pro-enduro-helmet': 'helmets',
  'alpinestars-venture-riding-jacket': 'jackets-hi-vis',
  'proviz-reflect360-high-vis-waterproof-jacket': 'jackets-hi-vis',
  'thule-yepp-nexxt-maxi-child-seat': 'child-seats',
  'thule-yepp-maxi-frame-mount-child-seat': 'child-seats',
  'rixen-kaul-front-handlebar-basket': 'racks-baskets',
  'blackburn-outpost-front-cargo-rack': 'racks-baskets',
  'ortlieb-back-roller-classic-waterproof-panniers-40l': 'panniers-bags',
  'quad-lock-handlebar-mount-pro-kit': 'phone-mounts',
  'bosch-smartphonegrip-smart-system-mount': 'phone-mounts',
  'bosch-fast-charger-6a-smart-system': 'ebike-chargers',
  'shimano-steps-4a-fast-battery-charger': 'ebike-chargers',
};
const acc = read('accessories');
const redirects = [];
for (const p of acc.arr) {
  const [cat] = MOVE[p.subcategory] ?? [];
  if (!cat) continue; // already moved on a previous run
  const sub = SUB_BY_SLUG[p.slug];
  if (!sub) throw new Error('no mapping for ' + p.slug);
  redirects.push([p.slug, cat, sub]);
  p.category = cat;
  p.subcategory = sub;
  p.subSubcategory = sub;
}
// Verified price correction (99 Bikes: Ortlieb Back-Roller Classic pair $199).
for (const p of acc.arr) if (p.slug === 'ortlieb-back-roller-classic-waterproof-panniers-40l') p.price = 199;
write('accessories', acc.head, acc.arr);

// 2. Existing Onewheels -> Onewheel-style subcategory; verified price corrections.
const sk = read('skateboards');
for (const p of sk.arr) if (/^onewheel-/.test(p.slug)) { p.subcategory = 'onewheel-style-boards'; p.subSubcategory = 'onewheel-style-boards'; }
write('skateboards', sk.head, sk.arr);
const kids = read('kids');
for (const p of kids.arr) if (p.slug === 'stacyc-12edrive-balance-bike') p.price = 1299; // stacyc.com.au A$1,299
write('kids', kids.head, kids.arr);
const sc = read('scooters');
for (const p of sc.arr) if (p.slug === 'segway-ninebot-f3-pro') p.price = 1398; // Harvey Norman $1,398
write('scooters', sc.head, sc.arr);

// 3. New products.
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const existing = new Set([...acc.arr, ...sk.arr, ...kids.arr, ...sc.arr].map((p) => p.slug));
for (const f of ['ebikes', 'selfbalancing', 'mobility']) read(f).arr.forEach((p) => existing.add(p.slug));
const EMPTY = { motor: '', battery: '', range: '', topSpeed: '', brakes: '', weight: '', payload: '', frame: '', gears: '' };
const items = JSON.parse(fs.readFileSync('scripts/expansion-items.json', 'utf8')).map(([name, price, category, subcategory, subSubcategory, badge]) => {
  const slug = slugify(name);
  if (existing.has(slug)) throw new Error('duplicate slug ' + slug);
  existing.add(slug);
  return { slug, name, price, category, subcategory, subSubcategory, badge, featured: false, filters: {}, description: '', shortDescription: '', images: [], specs: EMPTY };
});
fs.writeFileSync(
  'config/data/expansion.ts',
  `import type { Product } from '../site';\n\n// Added 2026-10-09 from the approved taxonomy review. Prices were checked against Australian retailer pages (see docs/price-verification.md).\nexport const EXPANSION_ITEMS: Product[] = ${JSON.stringify(items, null, 2)};\n`,
);
fs.writeFileSync(
  'config/data/accessoryRedirects.ts',
  `// Old /shop/accessories/... URLs after the accessories category was split into dedicated categories.\nexport const ACCESSORY_REDIRECTS: { source: string; destination: string }[] = ${JSON.stringify(
    [
      ...['security-locks', 'safety-apparel-helmets', 'utility-cargo-add-ons', 'replacement-batteries-chargers'].map((s) => ({
        source: `/shop/accessories/${s}`,
        destination: `/shop/${MOVE[s][0]}`,
      })),
      ...redirects.flatMap(([slug, cat, sub]) => [
        { source: `/shop/accessories/${slug}`, destination: `/shop/${cat}/${sub}/${slug}` },
      ]),
      { source: '/shop/accessories', destination: '/shop/batteries-chargers' },
    ],
    null,
    2,
  )};\n`,
);
console.log('moved', redirects.length, 'new', items.length);
const by = {};
for (const p of items) by[`${p.category}/${p.subcategory}`] = (by[`${p.category}/${p.subcategory}`] || 0) + 1;
console.log(by);
