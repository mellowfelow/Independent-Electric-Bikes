// One-off: merges the six accessory categories into two (batteries-parts-kits, safety-security-carry).
import fs from 'node:fs';

const MAP = {
  'batteries-chargers': 'batteries-parts-kits',
  'parts-components': 'batteries-parts-kits',
  'conversion-kits': 'batteries-parts-kits',
  'safety-gear': 'safety-security-carry',
  'locks-security': 'safety-security-carry',
  'bags-racks-carry': 'safety-security-carry',
};
const re = new RegExp(`"category": "(${Object.keys(MAP).join('|')})"`, 'g');
for (const f of ['accessories', 'expansion']) {
  const p = `config/data/${f}.ts`;
  const t = fs.readFileSync(p, 'utf8');
  fs.writeFileSync(p, t.replace(re, (_, c) => `"category": "${MAP[c]}"`));
}
const ip = 'scripts/expansion-items.json';
fs.writeFileSync(ip, fs.readFileSync(ip, 'utf8').replace(new RegExp(`"(${Object.keys(MAP).join('|')})"`, 'g'), (_, c) => `"${MAP[c]}"`));

const rp = 'config/data/accessoryRedirects.ts';
let r = fs.readFileSync(rp, 'utf8');
for (const [o, n] of Object.entries(MAP)) r = r.replaceAll(`/shop/${o}`, `/shop/${n}`);
// Category-level redirects for the first-split URLs (live for a short time) plus the old accessories paths.
const extra = Object.keys(MAP).map((o) => `  { source: '/shop/${o}', destination: '/shop/${MAP[o]}' },`).join('\n');
r = r.replace('];\n', `${extra}\n];\n`);
fs.writeFileSync(rp, r);

// Taxonomy: replace the six blocks with two.
let s = fs.readFileSync('config/site.ts', 'utf8');
const crlf = s.includes('\r\n');
s = s.replace(/\r\n/g, '\n');
const start = s.indexOf("  {\n    slug: 'batteries-chargers',");
const end = s.indexOf('];\n\n// Flat CATEGORIES');
if (start < 0 || end < 0) throw new Error('markers');
const sub = (main, slug, name, desc) => `      {\n        slug: '${slug}',\n        name: '${name}',\n        path: '/shop/${main}/${slug}',\n        description: '${desc}',\n      },\n`;
const block = (slug, name, desc, subs) => `  {\n    slug: '${slug}',\n    name: '${name}',\n    path: '/shop/${slug}',\n    description: '${desc}',\n    image: '/images/categories/${slug}.webp',\n    subcategories: [\n${subs.map(([a, b, c]) => sub(slug, a, b, c)).join('')}    ],\n  },\n`;
const a = 'batteries-parts-kits';
const b = 'safety-security-carry';
const out =
  block(a, 'Batteries, Parts & Kits', 'Replacement batteries and chargers, tyres, brake parts and mid-drive conversion kits.', [
    ['ebike-batteries', 'E-Bike Batteries', 'Frame and downtube packs for popular mid-drive systems.'],
    ['ebike-chargers', 'E-Bike Chargers', 'Fast and standard chargers for Bosch and Shimano systems.'],
    ['scooter-batteries', 'Scooter Batteries', 'Replacement packs for performance e-scooters.'],
    ['tyres-tubes', 'Tyres & Tubes', 'E-bike rated commuter and touring tyres.'],
    ['brakes-rotors-pads', 'Brake Pads & Rotors', 'Disc rotors and pads that fit Shimano and Tektro brakes.'],
    ['mid-drive-conversion-kits', 'Mid-Drive Conversion Kits', 'Bafang mid-drive kits. Higher-power kits are for private land only.'],
  ]) +
  block(b, 'Safety, Locks & Carry', 'Helmets, lights, locks, racks, panniers, child seats and phone mounts.', [
    ['helmets', 'Helmets', 'Road, urban and mountain helmets.'],
    ['lights-visibility', 'Lights & Visibility', 'USB rechargeable front and rear light sets.'],
    ['jackets-hi-vis', 'Jackets & Hi-Vis', 'Reflective and weatherproof riding jackets.'],
    ['u-d-locks', 'U-Locks & D-Locks', 'Rigid hardened-steel shackle locks.'],
    ['folding-locks', 'Folding Locks', 'Compact articulated locks that fold flat.'],
    ['chain-locks', 'Chain Locks', 'Flexible chain locks for frames and wheels.'],
    ['racks-baskets', 'Racks & Baskets', 'Rear racks, front racks and baskets.'],
    ['panniers-bags', 'Panniers & Bags', 'Waterproof panniers, dry bags and rack bags for commuting, touring and shopping runs.'],
    ['child-seats', 'Child Seats', 'Frame and rack mounted child seats.'],
    ['phone-mounts', 'Phone Mounts', 'Handlebar, stem and out-front phone mounts for navigation and ride tracking.'],
  ]);
s = s.slice(0, start) + out + s.slice(end);
fs.writeFileSync('config/site.ts', crlf ? s.replace(/\n/g, '\r\n') : s);

const sf = 'lib/shopFilters.ts';
let f = fs.readFileSync(sf, 'utf8');
f = f.replace(/new Set\(\['batteries-chargers'[^\]]*\]\)/, "new Set(['batteries-parts-kits', 'safety-security-carry'])");
fs.writeFileSync(sf, f);

for (const [o, n] of Object.entries(MAP)) fs.rmSync(`public/images/categories/${o}.webp`, { force: true });
for (const n of [a, b]) fs.copyFileSync('public/images/categories/accessories.webp', `public/images/categories/${n}.webp`);
console.log('done');
