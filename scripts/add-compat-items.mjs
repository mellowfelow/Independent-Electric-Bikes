// One-off: adds 17 charger/battery/part products (AU prices checked 2026-10-09) to config/data/expansion.ts and scripts/expansion-items.json.
import fs from 'node:fs';

const CAT = 'batteries-parts-kits';
// [name, price, subcategory, retailer, note]
const ITEMS = [
  ['Shimano STEPS BT-E8035 Integrated Down Tube Battery 504Wh', 860, 'ebike-batteries', 'Pushys', 'Pushys listings $859.99 to $949.99; BikeExchange $875 to $1,199'],
  ['Shimano STEPS BT-E8010 Down Tube Battery 504Wh', 750, 'ebike-batteries', '99 Bikes', 'sale, was $899'],
  ['Shimano STEPS EC-E6002 Battery Charger', 99, 'ebike-chargers', '99 Bikes', 'sale, was $109.99'],
  ['Bosch 4A Standard Charger Smart System (BPC3400)', 199, 'ebike-chargers', '99 Bikes', 'PedL listed $195 (sold out)'],
  ['Giant EnergyPak Smart Charger', 284, 'ebike-chargers', 'Giant Australia', 'RRP'],
  ['Segway-Ninebot Fast Charger for MAX Scooters', 150, 'scooter-skate-chargers', 'Segway Australia', '$149.95; page about four years old'],
  ['Original Ninebot by Segway Scooter Charger 42V 1.7A', 100, 'scooter-skate-chargers', 'PedL', '$99.99'],
  ['Multi-Voltage Charger for Kaabo, Dualtron, Apollo and Vsett Scooters', 99, 'scooter-skate-chargers', 'PedL', '48V/52V/60V/72V outputs; match pack voltage'],
  ['Evolve 5A Charger for Hadean, Diablo and Renegade', 171, 'scooter-skate-chargers', 'Twelve Board Store', ''],
  ['Onewheel Pint Car Charger', 150, 'scooter-skate-chargers', 'Twelve Board Store', '$149.99 sale'],
  ['Stacyc 18V Smart Battery Charger', 219, 'scooter-skate-chargers', 'Stacyc Australia', ''],
  ['Evolve Replacement Trucks (Hadean, GT, GTR)', 72, 'scooter-skate-parts', 'Twelve Board Store', ''],
  ['Exway Riot 15mm Replacement Belt (Pair)', 35, 'scooter-skate-parts', 'Twelve Board Store', ''],
  ['Stacyc Replacement Throttle for 12eDrive and 16eDrive', 139, 'scooter-skate-parts', 'Stacyc Australia', 'RRP'],
  ['Xiaomi Scooter 8.5 x 2.0 Inner Tube with Bent Valve', 20, 'scooter-skate-parts', 'PedL', '$19.99'],
  ['Entity Inner Tube 700c', 7, 'tyres-tubes', 'Reid Cycles', '$6.99; Presta and Schrader options'],
  ['Freedom to Ride Schrader Tube 27.5 x 2.1-2.5', 10, 'tyres-tubes', '99 Bikes', '$9.90'],
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
