import { PRODUCTS, MASTER_TAXONOMY, SITE, SHOP, type Product } from '@/config/site';
import { ALL_BRANDS, type BrandDef } from '@/config/brands';

const money0 = (n: number) => `$${Math.round(n).toLocaleString('en-AU')}`;

/** Short brand used in <title> suffixes so titles stay within ~60 characters. */
export const SITE_SHORT = 'IEB Australia';

const brandCache = new Map<string, BrandDef | null>();

/** Resolves the real manufacturer brand of a product from its name (longest matching alias wins). */
export function brandOf(p: Product): BrandDef | null {
  if (brandCache.has(p.slug)) return brandCache.get(p.slug)!;
  const name = p.name.toLowerCase();
  let best: BrandDef | null = null;
  let bestLen = 0;
  for (const b of ALL_BRANDS) {
    const aliases = (b.aliases ?? [b.name, b.slug.replace(/-/g, ' ')]).map((a) => a.toLowerCase());
    for (const a of aliases) {
      if ((name.startsWith(a + ' ') || name === a) && a.length > bestLen) {
        best = b;
        bestLen = a.length;
      }
    }
  }
  brandCache.set(p.slug, best);
  return best;
}

export function brandNameOf(p: Product): string {
  const known = brandOf(p);
  if (known) return known.name;
  // Brands missing from the brand list: use the leading token(s) of the name, never a bare initial or a spec like "36V".
  const [first, second] = p.name.split(' ');
  if (/^d/.test(first)) return 'Other';
  if (first.replace(/[^A-Za-z]/g, '').length <= 2 && second) return `${first} ${second}`;
  return first;
}

export interface CategoryNode {
  main: (typeof MASTER_TAXONOMY)[number];
  sub?: (typeof MASTER_TAXONOMY)[number]['subcategories'][number];
  leaf?: { slug: string; name: string; path: string };
  name: string;
  description: string;
  segments: string[];
}

/** Resolves /shop/<main>[/<sub-or-leaf>] to a taxonomy node. */
export function resolveCategory(segments: string[]): CategoryNode | null {
  const main = MASTER_TAXONOMY.find((m) => m.slug === segments[0]);
  if (!main) return null;
  if (!segments[1]) return { main, name: main.name, description: main.description, segments };
  for (const sub of main.subcategories) {
    if (sub.slug === segments[1]) return { main, sub, name: sub.name, description: sub.description || main.description, segments };
    const leaf = sub.items?.find((i) => i.slug === segments[1]);
    if (leaf) return { main, sub, leaf, name: leaf.name, description: sub.description || main.description, segments };
  }
  return null;
}

export function productsInCategory(node: CategoryNode): Product[] {
  return PRODUCTS.filter((p) => {
    if (p.category !== node.main.slug) return false;
    if (node.leaf) return p.subSubcategory === node.leaf.slug;
    if (node.sub) return p.subcategory === node.sub.slug;
    return true;
  });
}

export function productCategoryLabel(p: Product): string {
  const main = MASTER_TAXONOMY.find((m) => m.slug === p.category);
  const sub = main?.subcategories.find((s) => s.slug === p.subcategory);
  const leaf = sub?.items?.find((i) => i.slug === p.subSubcategory);
  return (leaf?.name || sub?.name || main?.name || 'Electric vehicle').trim();
}

function trim(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:\-–—\s]+$/, '') + '…';
}

export function productTitle(p: Product): string {
  const full = `${p.name} | ${SITE.name}`;
  if (full.length <= 60) return full;
  const short = `${p.name} | ${SITE_SHORT}`;
  if (short.length <= 60) return short;
  // Keep a trailing variant marker ("Type 2") so near-identical long names stay distinct after truncation.
  const variant = p.name.match(/\s((?:Type|Gen|Mk|V)\s?\d+)$/i)?.[1];
  const room = 60 - 3 - SITE_SHORT.length - (variant ? variant.length + 1 : 0);
  return `${trim(variant ? p.name.slice(0, p.name.length - variant.length - 1) : p.name, room)}${variant ? ` ${variant}` : ''} | ${SITE_SHORT}`;
}

/** Meta description (<=155 chars) built from the product's own data - unique per product. */
export function productMetaDescription(p: Product): string {
  const free = p.price >= SHOP.freeShippingThreshold ? ' Free express freight.' : '';
  const brand = brandNameOf(p);
  const by = p.name.toLowerCase().startsWith(brand.toLowerCase()) ? '' : ` by ${brand}`;
  return fitDesc(`${p.name}${by}: ${productCategoryLabel(p)} from ${money0(p.price)} AUD.${free} 2-year frame warranty, shipped from Brunswick VIC.`, ' Buy online with express Australian freight.');
}

/** Long description assembled from the product's structured fields (no invented claims). */
export function productDescription(p: Product): string {
  const f = p.filters || {};
  const s = p.specs;
  const brand = brandNameOf(p);
  const parts: string[] = [`${p.name} is a ${brand} model in our ${productCategoryLabel(p)} range, priced at ${money0(p.price)} AUD.`];

  const verified = !!p.verified;
  const drive = verified ? [f.motorType && `${f.motorType.toLowerCase()} motor`, f.sensorType && `${f.sensorType.toLowerCase()} pedal assist`].filter(Boolean) : [];
  if (drive.length) parts.push(`It pairs a ${drive.join(' with ')}${f.brakeType ? ` and ${f.brakeType.toLowerCase()} brakes` : ''}.`);
  else if (verified && f.brakeType) parts.push(`It is fitted with ${f.brakeType.toLowerCase()} brakes.`);

  const figures = !verified ? [] : [s.range && `range ${s.range.toLowerCase()}`, s.topSpeed && `top speed ${s.topSpeed}`, s.weight && `weight ${s.weight}`, s.payload && `payload ${s.payload}`].filter(Boolean);
  if (figures.length) parts.push(`Key figures: ${figures.join(', ')}.`);
  if (verified && f.compliance) parts.push(`Compliance: ${f.compliance}.`);

  parts.push(`Sold by ${SITE.entityName} in Brunswick, Victoria with a 2-year frame warranty and a ${SHOP.cryptoDiscount}% discount when paying by cryptocurrency.`);
  return parts.join(' ');
}

export function categoryMetaDescription(node: CategoryNode): string {
  const list = productsInCategory(node);
  const min = list.length ? Math.min(...list.map((p) => p.price)) : 0;
  const base = node.description.replace(/\s+/g, ' ').trim();
  const tail = list.length ? ` ${list.length} models from ${money0(min)} AUD with express Australian freight from Brunswick, VIC.` : ' Express Australian freight from Brunswick, VIC.';
  return fitDesc(base.replace(/\.?$/, '.') + tail, '');
}

export function categoryTitle(node: CategoryNode): string {
  // A bare "<name> Australia" can repeat across levels (e.g. "E-Bikes"), so only leaf/sub names get the market suffix.
  const base = `${node.name} Australia`;
  for (const suffix of [SITE.name, SITE_SHORT]) {
    const t = `${base} | ${suffix}`;
    if (t.length <= 60) return t;
  }
  const t = `${node.name} | ${SITE_SHORT}`;
  return t.length <= 60 ? t : trim(node.name, 60 - 3 - SITE_SHORT.length) + ` | ${SITE_SHORT}`;
}

/** Fits `<base> | <site>` inside a ~60 character title, falling back to the short site name, then truncating. */
export function fitTitle(base: string, max = 60): string {
  for (const suffix of [SITE.name, SITE_SHORT]) {
    const t = `${base} | ${suffix}`;
    if (t.length <= max) return t;
  }
  return trim(base, max - 3 - SITE_SHORT.length) + ` | ${SITE_SHORT}`;
}

/** Keeps a meta description inside the 120-158 character band (pads short ones with `tail`). */
export function fitDesc(text: string, tail = ' Shipped across Australia from Brunswick, VIC.'): string {
  let t = text.replace(/\s+/g, ' ').trim();
  if (t.length < 120 && tail) t = `${t.replace(/[.!?]?$/, '.')}${tail}`;
  return trim(t, 158);
}
