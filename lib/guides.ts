import { POSTS } from '@/config/site';
import { GUIDE_LINKS } from '@/config/blogLinks';

export interface RelatedGuide {
  slug: string;
  title: string;
}

interface IndexedGuide extends RelatedGuide {
  prefixes: string[];
  /** Top-level shop category of the first shop link: what the guide is mainly about. */
  primary?: string;
}

let index: IndexedGuide[] | null = null;

function getIndex(): IndexedGuide[] {
  if (index) return index;
  index = POSTS.filter((p) => GUIDE_LINKS[p.slug]?.body).map((p) => {
    const prefixes = (GUIDE_LINKS[p.slug]?.shop ?? []).map((l) => l.href.replace(/\/$/, '')).filter((h) => h.startsWith('/shop/') && h !== '/shop');
    return { slug: p.slug, title: p.title, prefixes, primary: prefixes[0]?.split('/')[2] };
  });
  return index;
}

const hash = (s: string) => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
};

/** Picks `limit` items from a list, starting at a seed-dependent offset so every guide gets linked from many pages. */
function rotate<T>(list: T[], seed: string, limit: number): T[] {
  if (list.length <= limit) return list;
  const start = hash(seed) % list.length;
  return Array.from({ length: limit }, (_, i) => list[(start + i) % list.length]);
}

/**
 * Guides whose "shop related" links point at this category (or sub-category). Sub-category matches come first.
 * The seed (a product or brand slug) spreads the picks so guides are linked evenly rather than always the same few.
 */
export function guidesFor(category: string, sub: string | undefined, seed: string, limit = 3): RelatedGuide[] {
  const catPrefix = `/shop/${category}`;
  const subPrefix = sub ? `${catPrefix}/${sub}` : '';
  const exact: IndexedGuide[] = [];
  const primary: IndexedGuide[] = [];
  const secondary: IndexedGuide[] = [];
  for (const g of getIndex()) {
    const inCategory = g.prefixes.some((p) => p === catPrefix || p.startsWith(`${catPrefix}/`));
    if (!inCategory) continue;
    if (subPrefix && g.primary === category && g.prefixes.some((p) => p === subPrefix || p.startsWith(`${subPrefix}/`))) exact.push(g);
    else if (g.primary === category) primary.push(g);
    else secondary.push(g);
  }
  const picked: IndexedGuide[] = [];
  for (const tier of [exact, primary, secondary]) {
    for (const g of rotate(tier, seed, limit)) if (picked.length < limit && !picked.includes(g)) picked.push(g);
  }
  return picked.map(({ slug, title }) => ({ slug, title }));
}
