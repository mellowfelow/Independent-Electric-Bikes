// One-off: batteries for the kids / youth dirt bike category, plus a "parts for these vehicles" list on vehicle category pages.
import fs from 'node:fs';

const edit = (file, fn) => {
  let t = fs.readFileSync(file, 'utf8');
  const crlf = t.includes('\r\n');
  t = fn(t.replace(/\r\n/g, '\n'));
  fs.writeFileSync(file, crlf ? t.replace(/\n/g, '\r\n') : t);
};
const swap = (t, a, b) => {
  if (!t.includes(a)) throw new Error('missing: ' + a.slice(0, 70));
  return t.replace(a, b);
};

const SUB = 'kids-dirt-bike-batteries';
const ITEMS = [
  ['Razor MX650 12V 12Ah Sealed Lead Acid Battery (3-Pack)', Math.round(119.85 * 1.43), 'Batterymart (USA)', 'US$119.85 converted at 1.43; three 12V 12Ah batteries'],
  ['Stacyc 18V 5Ah Battery', 329, 'Stacyc Australia', 'RRP A$329'],
];

// 1. Taxonomy: new subcategory.
edit('config/site.ts', (t) =>
  swap(
    t,
    "        description: 'Trucks, belts, throttles and inner tubes for scooters, skateboards and kids bikes.',\n      },\n",
    "        description: 'Trucks, belts, throttles and inner tubes for scooters, skateboards and kids bikes.',\n      },\n      {\n        slug: 'kids-dirt-bike-batteries',\n        name: 'Kids & Dirt Bike Batteries',\n        path: '/shop/batteries-parts-kits/kids-dirt-bike-batteries',\n        description: 'Replacement batteries for kids electric balance bikes and youth electric pit bikes.',\n      },\n",
  ),
);

// 2. Products.
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const EMPTY = { motor: '', battery: '', range: '', topSpeed: '', brakes: '', weight: '', payload: '', frame: '', gears: '' };
const p = 'config/data/expansion.ts';
const txt = fs.readFileSync(p, 'utf8');
const i = txt.indexOf('= [');
const head = txt.slice(0, i + 1);
const arr = JSON.parse(txt.slice(i + 2, txt.lastIndexOf(']') + 1));
const have = new Set(arr.map((x) => x.slug));
for (const [name, price] of ITEMS) {
  const slug = slugify(name);
  if (have.has(slug)) continue;
  arr.push({ slug, name, price, category: 'batteries-parts-kits', subcategory: SUB, subSubcategory: SUB, badge: 'none', featured: false, filters: {}, description: '', shortDescription: '', images: [], specs: EMPTY });
}
fs.writeFileSync(p, `${head} ${JSON.stringify(arr, null, 2)};\n`);
const jp = 'scripts/expansion-items.json';
const rows = JSON.parse(fs.readFileSync(jp, 'utf8'));
const names = new Set(rows.map((r) => r[0]));
for (const [name, price, shop, note] of ITEMS) if (!names.has(name)) rows.push([name, price, 'batteries-parts-kits', SUB, SUB, 'none', shop, note]);
fs.writeFileSync(jp, JSON.stringify(rows));

// 3. Fits.
edit('config/data/compatibility.ts', (t) =>
  swap(
    t,
    '  // Conversion kits\n',
    `  'Razor MX650 12V 12Ah Sealed Lead Acid Battery (3-Pack)': {
    confirmed: ['Razor MX650 Dirt Rocket Pit Bike'],
    rule: 'Three 12V 12Ah sealed lead-acid batteries (36V in series). The retailer lists this pack for the Razor MX650 and MX500. Charge with the original Razor 36V charger. Not for lithium-powered bikes.',
  },
  'Stacyc 18V 5Ah Battery': {
    confirmed: STACYC_BIKES,
    system: STACYC_FAMILY,
    rule: 'Stacyc 18V (20V max) 5Ah battery for the 18V platform. The 16eDrive ships with a 4Ah pack, so confirm the pack size you need. Not for the 36V 16eDrive Elite, 18eDrive or 20eDrive.',
  },
  // Conversion kits\n`,
  ),
);

// 4. Vehicle category pages list the parts that fit vehicles in that category.
edit('lib/compat.ts', (t) =>
  t +
  `
/** Parts that fit at least one vehicle in a category (and subcategory), most widely fitting first. */
export function partsForCategory(categorySlug: string, subSlug?: string, limit = 8): { part: Product; fits: number }[] {
  const vehicles = PRODUCTS.filter((p) => {
    if (p.category !== categorySlug) return false;
    if (!subSlug) return true;
    return p.subcategory === subSlug || p.subSubcategory === subSlug;
  });
  const names = new Set(vehicles.map((v) => v.name));
  const out: { part: Product; fits: number }[] = [];
  for (const [partName, fit] of Object.entries(PART_FITS)) {
    const part = byName.get(partName);
    if (!part) continue;
    const fits = new Set([...(fit.confirmed ?? []), ...(fit.system ?? [])].filter((n) => names.has(n))).size;
    if (fits > 0) out.push({ part, fits });
  }
  return out.sort((a, b) => b.fits - a.fits || a.part.price - b.part.price).slice(0, limit);
}
`,
);

edit('components/CategoryLinks.tsx', (t) => {
  t = swap(t, "import { topBrandsFor } from '@/lib/catalog';", "import { topBrandsFor } from '@/lib/catalog';\nimport { partsForCategory } from '@/lib/compat';\nimport { money } from '@/lib/order';");
  t = swap(t, "  const isPartCat = PART_CATS.includes(categorySlug);", "  const isPartCat = PART_CATS.includes(categorySlug);\n  const parts = isPartCat ? [] : partsForCategory(categorySlug, subSlug);");
  t = swap(
    t,
    '      <div>\n        <h2 className="mb-2 text-xs font-extrabold uppercase tracking-wider text-emerald-400">{isPartCat ? \'Shop vehicles\' : \'Batteries, parts and accessories\'}</h2>',
    `      {!isPartCat && (
        <div>
          <h2 className="mb-2 text-xs font-extrabold uppercase tracking-wider text-emerald-400">Batteries, chargers &amp; parts for these models</h2>
          {parts.length > 0 ? (
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {parts.map(({ part, fits }) => (
                <li key={part.slug}>
                  <Link href={\`/shop/\${part.category}/\${part.slug}/\`} className="block h-full rounded-xl border border-slate-700 bg-slate-900 p-3 hover:border-emerald-500">
                    <span className="block text-xs font-bold text-white">{part.name}</span>
                    <span className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Fits {fits} model{fits === 1 ? '' : 's'} here</span>
                      <span className="font-extrabold text-emerald-400">{money(part.price)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400">
              We do not list a battery or charger for these models yet.{' '}
              <Link href="/contact/" className="font-bold text-emerald-400 underline">Ask us for your model</Link> and we will confirm what is available.
            </p>
          )}
        </div>
      )}
      <div>
        <h2 className="mb-2 text-xs font-extrabold uppercase tracking-wider text-emerald-400">{isPartCat ? 'Shop vehicles' : 'More batteries, parts and accessories'}</h2>`,
  );
  return t;
});
console.log('ok');
