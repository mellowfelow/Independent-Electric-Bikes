// One-off: adds replacement batteries priced above A$350 for brands that had none. USD at A$1.43, EUR at A$1.63 (late-July 2026 mid-market).
import fs from 'node:fs';

const CAT = 'batteries-parts-kits';
const usd = (n) => Math.round(n * 1.43);
// [name, price AUD, sub, retailer, note]
const ITEMS = [
  ['Eunorau Universal 48V 15Ah Secondary Battery', 699, 'ebike-batteries', 'Eunorau Australia', 'AUD; RA4/Bullet/XT60-F ports'],
  ['Mokwheel Basalt Series Battery 48V 19.6Ah', usd(599.99), 'ebike-batteries', 'Mokwheel', 'US$599.99 converted at 1.43 (sale US$299.99 while stock lasts)'],
  ['DiroDi Rover G5-6 Battery 52V 20Ah', 890, 'ebike-batteries', 'DiroDi Australia', "AUD; listed 'not available for sale' at check"],
  ['DiroDi Rover Pro/Dual Battery 52V 20Ah', 950, 'ebike-batteries', 'DiroDi Australia', "AUD; listed 'not available for sale' at check"],
  ['DiroDi Rover Gen 1-4 Battery 48V 17.4Ah', 790, 'ebike-batteries', 'DiroDi Australia', "AUD; listed 'not available for sale' at check"],
  ['DiroDi Rover Gen 1-4 Battery 48V 15.6Ah', 730, 'ebike-batteries', 'DiroDi Australia', "AUD; listed 'not available for sale' at check"],
  ['Rad Power Safe Shield Semi-Integrated Battery 14Ah', usd(499), 'ebike-batteries', 'Rad Power Bikes USA', 'US$499 converted at 1.43; needs updated Rad charger'],
  ['Pedego Long Range Cargo Battery 48V 20Ah', usd(1099), 'ebike-batteries', 'Pedego USA', 'US$1,099 converted at 1.43'],
  ['Bosch PowerTube 750 Horizontal Battery (BBP3770)', 1599, 'ebike-batteries', '99 Bikes', 'AUD; pre-order at check'],
  ['Giant EnergyPak 500 Top Load Battery', 1199, 'ebike-batteries', 'Giant Australia', 'AUD RRP; charger sold separately'],
  ['Engwe EP-2 Pro Battery 13Ah', Math.round(299 * 1.63), 'ebike-batteries', 'Engwe', 'EUR 299 converted at 1.63'],
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

// Fits
const EUN = ['Eunorau META26 X2.0', 'Eunorau E-Fat-Step Pro', 'Eunorau G30 Max Cargo', 'Eunorau E-Fat-Step 20', 'Eunorau 1000W FAT-HD All-Terrain Fat Tyre E-Bike'];
const fits = `
  // Replacement batteries above A$350 for brands that had none (USD at 1.43, EUR at 1.63)
  'Eunorau Universal 48V 15Ah Secondary Battery': { system: ${JSON.stringify(EUN)}, rule: 'Universal 48V 15Ah add-on pack with RA4, Bullet and XT60-F ports. Eunorau lists it for the FAT-AWD 3.0 and G20-Cargo; confirm the port and mount for your model.' },
  'Mokwheel Basalt Series Battery 48V 19.6Ah': { confirmed: ['Mokwheel Basalt Step-Thru', 'Mokwheel Basalt Deluxe ST'], rule: '48V 19.6Ah removable pack for the Mokwheel Basalt, Scoria, Obsidian and Onyx series.' },
  'DiroDi Rover G5-6 Battery 52V 20Ah': { confirmed: ['DiroDi Rover Plus Gen 6 Step-Thru'], rule: '52V 20Ah pack for DiroDi Rover generations 5 and 6.' },
  'DiroDi Rover Pro/Dual Battery 52V 20Ah': { confirmed: ['DiroDi Rover Gen 6 1000W Dual'], rule: '52V 20Ah pack for the DiroDi Rover Pro and Dual.' },
  'DiroDi Rover Gen 1-4 Battery 48V 17.4Ah': { system: ['DiroDi Rover Plus Low-Step 48V', 'DiroDi Rover Plus 750W'], rule: '48V 17.4Ah pack for DiroDi Rover generations 1 to 4. Check your generation and voltage first (Gen 1 250W bikes are 36V).' },
  'DiroDi Rover Gen 1-4 Battery 48V 15.6Ah': { system: ['DiroDi Rover Plus Low-Step 48V', 'DiroDi Rover Plus 750W'], rule: '48V 15.6Ah pack for DiroDi Rover generations 1 to 4. Check your generation and voltage first (Gen 1 250W bikes are 36V).' },
  'Rad Power Safe Shield Semi-Integrated Battery 14Ah': { confirmed: ['Rad Power RadWagon 4 Pro'], system: ['Rad Power RadExpand 5'], rule: '48V 14Ah (589 to 672Wh) Rad battery. It only works with Rad\\'s updated charger, not older Rad or third-party chargers.' },
  'Pedego Long Range Cargo Battery 48V 20Ah': { system: ['Pedego Stretch Cargo'], rule: 'Genuine UL 2271 replacement for the Pedego Cargo. Confirm your battery voltage and connector.' },
  'Bosch PowerTube 750 Horizontal Battery (BBP3770)': { system: BOSCH_BIKES, rule: 'Bosch PowerTube 750Wh BBP3770, horizontal mount (Smart System). Mainly for cargo and touring bikes that take a 750Wh pack: confirm yours does.' },
  'Giant EnergyPak 500 Top Load Battery': { rule: "Giant lists it for MY17-18 e-bike models and MY19 FastRoad E+ and Quick E. Check your model year with a Giant dealer." },
  'Engwe EP-2 Pro Battery 13Ah': { confirmed: ['Engwe EP-2 Pro Fat Folder'], rule: '13Ah battery for the Engwe EP-2 Pro.' },
`;
const cp = 'config/data/compatibility.ts';
const c = fs.readFileSync(cp, 'utf8');
fs.writeFileSync(cp, c.replace(/\n};\s*$/, fits + '};\n'));
console.log('added', add.length);
