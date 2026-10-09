// One-off: adds batteries/chargers/parts for more vehicles. USD prices converted at A$1.43 per US$1 (late-July 2026 mid-market,
// no freight, GST or margin added). Source rows are recorded in scripts/expansion-items.json.
import fs from 'node:fs';

const FX = 1.43;
const CAT = 'batteries-parts-kits';
// [name, price AUD, sub, retailer, note]
const usd = (n) => Math.round(n * FX);
const ITEMS = [
  ['Specialized U2-710 Battery (Turbo Tero, Vado and Como Gen 2)', usd(1199.99), 'ebike-batteries', 'Specialized USA', 'US$1,199.99 converted at 1.43'],
  ['Lectric XPedition 2.0 Spare Battery', usd(425), 'ebike-batteries', 'Lectric', 'US$425 converted at 1.43'],
  ['Aventon Level Replacement Battery 48V 14Ah', usd(499.99), 'ebike-batteries', 'Aventon (list via Treefort Bikes)', 'US$499.99 converted at 1.43; Treefort sale US$373.99'],
  ['Fiido C11 and C11 Pro Replacement Battery', usd(267), 'ebike-batteries', 'Fiido', 'US$267 converted at 1.43; new version only'],
  ['Brompton Electric Replacement Battery 36V 8.55Ah (Original)', usd(799), 'ebike-batteries', 'Clever Cycles USA', 'US$799 incl. tax converted at 1.43; original charger only'],
  ['Evolve Standard Electric Skateboard Battery', 763, 'scooter-batteries', 'Twelve Board Store', "'from' price AUD"],
  ['Hoverboard 36V 4.4Ah 10S2P Replacement Battery', 109, 'scooter-batteries', 'Amazon AU', 'AUD; generic pack, 6.5 inch boards'],
  ['Mobility Scooter 12V 35Ah AGM Replacement Battery', usd(114.99), 'scooter-batteries', 'Walmart USA', 'US$114.99 converted at 1.43'],
  ['InMotion V12 Charger 100.8V 2.3A', usd(107), 'scooter-skate-chargers', 'ewheels USA', 'US$107 converted at 1.43'],
  ['100.8V 8A Rapid Charger for Begode EX.N, RS, Sherman and InMotion V12', usd(199), 'scooter-skate-chargers', 'ewheels USA', 'US$199 converted at 1.43'],
  ['84.2V 5A Rapid Charger for KingSong 16X/18XL and InMotion V11/V10F', usd(150), 'scooter-skate-chargers', 'ewheels USA', 'US$150 converted at 1.43'],
  ['InMotion V11 18 x 3 CST C-1488 Tyre', usd(53), 'scooter-skate-parts', 'ewheels USA', 'US$53 converted at 1.43'],
];

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const EMPTY = { motor: '', battery: '', range: '', topSpeed: '', brakes: '', weight: '', payload: '', frame: '', gears: '' };
const p = 'config/data/expansion.ts';
const t = fs.readFileSync(p, 'utf8');
const i = t.indexOf('= [');
const head = t.slice(0, i + 1);
const arr = JSON.parse(t.slice(i + 2, t.lastIndexOf(']') + 1));
const have = new Set(arr.map((x) => x.slug));
const add = [];
for (const [name, price, subcategory] of ITEMS) {
  const slug = slugify(name);
  if (have.has(slug)) continue;
  add.push({ slug, name, price, category: CAT, subcategory, subSubcategory: subcategory, badge: 'none', featured: false, filters: {}, description: '', shortDescription: '', images: [], specs: EMPTY });
}
fs.writeFileSync(p, `${head} ${JSON.stringify([...arr, ...add], null, 2)};\n`);

const jp = 'scripts/expansion-items.json';
const rows = JSON.parse(fs.readFileSync(jp, 'utf8'));
const names = new Set(rows.map((r) => r[0]));
for (const [name, price, sub, shop, note] of ITEMS) if (!names.has(name)) rows.push([name, price, CAT, sub, sub, 'none', shop, note]);
fs.writeFileSync(jp, JSON.stringify(rows));
console.log('added', add.length);
