import type { Product } from '@/config/site';
import type { BrandDef } from '@/config/brands';
import { COPY_POOLS } from '@/config/data/copy';
import { productCategoryLabel } from '@/lib/catalog';

const money0 = (n: number) => `$${Math.round(n).toLocaleString('en-AU')}`;
const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619) >>> 0;
  return h;
};
const list = (items: string[]) => (items.length <= 1 ? items.join('') : `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}`);

export interface BrandCopy {
  /** Replaces the shared "Browse the X we list..." text on generated brand pages. */
  intro: string;
  /** Extra paragraphs for every brand page, built from the brand's own products. */
  about: string[];
}

/** Brand copy from the brand's real product list; nothing about the manufacturer is claimed. */
export function brandCopy(brand: BrandDef, products: Product[]): BrandCopy {
  const sorted = [...products].sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
  const n = sorted.length;
  const cheap = sorted[0];
  const dear = sorted[n - 1];
  const labels = [...new Set(sorted.map((p) => productCategoryLabel(p)))];
  const named = sorted.slice(0, 3).map((p) => p.name);

  const intro =
    n === 0
      ? `${brand.name} products are listed here as they arrive.`
      : n === 1
        ? `${cheap.name} is the ${brand.name} product currently listed, at ${money0(cheap.price)} AUD.`
        : `${brand.name} has ${n} products listed here, from ${money0(cheap.price)} to ${money0(dear.price)} AUD, including ${list(named)}${n > 3 ? ` and ${n - 3} more` : ''}.`;

  const about: string[] = [];
  if (n > 1) {
    about.push(
      `The ${brand.name} range here covers ${list(labels.slice(0, 4))}${labels.length > 4 ? ` and ${labels.length - 4} more types` : ''}. The lowest-priced item is the ${cheap.name} at ${money0(cheap.price)} and the highest is the ${dear.name} at ${money0(dear.price)}.`
    );
  } else if (n === 1) {
    about.push(`${brand.name} is represented here by one ${labels[0]?.toLowerCase() ?? 'product'}, the ${cheap.name}.`);
  }

  // Type guidance from the sub-category most of this brand's products sit in.
  const counts = new Map<string, number>();
  for (const p of sorted) counts.set(`${p.category}/${p.subcategory}`, (counts.get(`${p.category}/${p.subcategory}`) ?? 0) + 1);
  const topKey = [...counts].sort((a, b) => b[1] - a[1])[0]?.[0];
  const pool = topKey ? COPY_POOLS[topKey] : undefined;
  if (pool) {
    const h = hash(brand.slug);
    about.push(`${pool.intro[h % pool.intro.length]} ${pool.suits[(h >> 3) % pool.suits.length]}`);
    about.push(`${pool.check[(h >> 5) % pool.check.length]} ${pool.care[(h >> 7) % pool.care.length]}`);
  }
  return { intro, about };
}

/** True when the brand description is the shared template rather than hand-written text. */
export const isTemplateBrand = (brand: BrandDef) => brand.description.startsWith('Browse the ');
