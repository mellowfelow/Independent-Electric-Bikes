import { PRODUCTS, POSTS, MASTER_TAXONOMY, type Product } from '@/config/site';
import { ALL_BRANDS } from '@/config/brands';
import { brandNameOf, productCategoryLabel } from '@/lib/catalog';

/**
 * Site search shared by the /search page, the nav autocomplete and /api/search.
 *  - every word must match (name, brand, category, type); word order does not matter
 *  - common spellings are treated alike ("e-bike" / "ebike" / "electric bike", "step thru" / "step-through" ...)
 *  - small typos are forgiven; if nothing matches strictly the closest partial matches are returned
 *  - price intent: "under $2000", "over 3000", "$1000-2000"
 */

const PHRASES: [RegExp, string | ((m: string) => string)][] = [
  [/\b(?:e[\s-]?bikes?|electric[\s-]?bikes?|electric[\s-]?bicycles?)\b/g, 'ebike'],
  [/\b(?:e[\s-]?scooters?|electric[\s-]?scooters?)\b/g, 'escooter'],
  [/\b(?:e[\s-]?skateboards?|electric[\s-]?skateboards?|electric[\s-]?longboards?|longboards?|skateboards?)\b/g, 'skateboard'],
  [/\bstep[\s-]*(?:through|thru|over)\b/g, (m) => (m.includes('over') ? 'stepover' : 'stepthrough')],
  [/\b(?:low[\s-]?step)\b/g, 'stepthrough'],
  [/\b(?:fold(?:ing|able|er|ers|s)?)\b/g, 'folding'],
  [/\b(?:mid[\s-]?drive|centre[\s-]?motor|center[\s-]?motor)\b/g, 'middrive'],
  [/\b(?:long[\s-]?tail|cargo|utility|family)\b/g, 'cargo'],
  [/\b(?:kids?|child(?:ren)?|youth|junior|toddler)\b/g, 'kids'],
  [/\b(?:fat[\s-]?(?:tyre|tire)s?)\b/g, 'fattyre'],
  [/\b(?:emtb|mountain[\s-]?bikes?|mtb)\b/g, 'emtb'],
  [/\b(?:hover[\s-]?boards?|self[\s-]?balancing)\b/g, 'selfbalancing'],
  [/\b(?:mobility|disability|wheelchair)\b/g, 'mobility'],
  [/\b(?:helmets?)\b/g, 'helmet'],
  [/\b(?:batter(?:y|ies))\b/g, 'battery'],
  [/\b(?:locks?)\b/g, 'lock'],
];

export function normalise(input: string): string {
  let s = input.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');
  s = s.replace(/&/g, ' and ');
  for (const [re, to] of PHRASES) s = s.replace(re, to as string);
  return s;
}

const STOP = new Set(['a', 'an', 'the', 'for', 'and', 'with', 'of', 'in', 'to', 'bike', 'bikes']);

export function tokenise(input: string): string[] {
  return normalise(input)
    .split(/[^a-z0-9+]+/)
    .filter(Boolean)
    .map((t) => (t.length > 3 && t.endsWith('s') && !t.endsWith('ss') ? t.slice(0, -1) : t));
}

function editDistanceAtMostOne(a: string, b: string): boolean {
  if (a === b) return true;
  if (Math.abs(a.length - b.length) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (a.length > b.length) i++;
    else if (b.length > a.length) j++;
    else {
      i++;
      j++;
    }
  }
  return edits + (a.length - i) + (b.length - j) <= 1;
}

export interface PriceIntent {
  min?: number;
  max?: number;
}

/** Pulls "under $2000" style intent out of the query and returns the remaining text. */
export function parsePrice(q: string): { text: string; price: PriceIntent } {
  const price: PriceIntent = {};
  let text = q;
  const num = (v: string) => Number(v.replace(/,/g, ''));
  text = text.replace(/\$?\s*(\d[\d,]*)\s*(?:-|to)\s*\$?\s*(\d[\d,]*)/i, (_m, a, b) => {
    price.min = Math.min(num(a), num(b));
    price.max = Math.max(num(a), num(b));
    return ' ';
  });
  text = text.replace(/\b(?:under|below|less than|up to|max|<)\s*\$?\s*(\d[\d,]*)/i, (_m, a) => {
    price.max = num(a);
    return ' ';
  });
  text = text.replace(/\b(?:over|above|more than|from|min|>)\s*\$?\s*(\d[\d,]*)/i, (_m, a) => {
    price.min = num(a);
    return ' ';
  });
  return { text, price };
}

interface IndexedProduct {
  product: Product;
  name: string;
  nameTokens: string[];
  brandTokens: string[];
  catTokens: string[];
  hasPhoto: boolean;
}

let productIndex: IndexedProduct[] | null = null;

function getProductIndex(): IndexedProduct[] {
  if (productIndex) return productIndex;
  productIndex = PRODUCTS.map((product) => {
    const main = MASTER_TAXONOMY.find((m) => m.slug === product.category)?.name ?? '';
    return {
      product,
      name: normalise(product.name),
      nameTokens: tokenise(product.name),
      brandTokens: tokenise(brandNameOf(product)),
      catTokens: tokenise(`${main} ${productCategoryLabel(product)} ${product.subcategory ?? ''} ${product.subSubcategory ?? ''}`.replace(/-/g, ' ')),
      hasPhoto: !product.images[0]?.endsWith('.svg'),
    };
  });
  return productIndex;
}

function tokenScore(t: string, row: { nameTokens: string[]; brandTokens: string[]; catTokens: string[] }): number {
  let best = 0;
  for (const n of row.nameTokens) {
    if (n === t) best = Math.max(best, 10);
    else if (t.length >= 2 && n.startsWith(t)) best = Math.max(best, 7);
    else if (t.length >= 4 && n.length >= 4 && editDistanceAtMostOne(t, n)) best = Math.max(best, 4);
  }
  for (const n of row.brandTokens) {
    if (n === t) best = Math.max(best, 9);
    else if (t.length >= 2 && n.startsWith(t)) best = Math.max(best, 6);
    else if (t.length >= 4 && n.length >= 4 && editDistanceAtMostOne(t, n)) best = Math.max(best, 4);
  }
  let cat = 0;
  for (const n of row.catTokens) {
    if (n === t) cat = Math.max(cat, 5);
    else if (t.length >= 3 && n.startsWith(t)) cat = Math.max(cat, 3);
  }
  // A word that matches the name AND the category ("folding" in a folding e-bike) outranks a name-only match
  // (a folding lock), so the products people usually mean come first.
  return best > 0 && cat > 0 ? best + 2 : Math.max(best, cat);
}

export interface ProductHit {
  product: Product;
  score: number;
}

export interface SearchResults {
  query: string;
  tokens: string[];
  price: PriceIntent;
  products: ProductHit[];
  posts: { post: (typeof POSTS)[number]; score: number }[];
  categories: { name: string; href: string; parent?: string }[];
  brands: { name: string; slug: string; count: number }[];
  /** True when nothing matched every word and the closest partial matches are shown instead. */
  relaxed: boolean;
}

export function search(raw: string): SearchResults {
  const query = raw.trim().slice(0, 100);
  const { text, price } = parsePrice(query);
  const tokens = tokenise(text).filter((t) => !STOP.has(t));
  const hasPrice = price.min !== undefined || price.max !== undefined;
  const empty: SearchResults = { query, tokens, price, products: [], posts: [], categories: [], brands: [], relaxed: false };
  if (!tokens.length && !hasPrice) return empty;

  const phrase = normalise(text).replace(/\s+/g, ' ').trim();
  const inPrice = (p: Product) => (price.min === undefined || p.price >= price.min) && (price.max === undefined || p.price <= price.max);
  const rank = (a: ProductHit & { photo: boolean }, b: ProductHit & { photo: boolean }) =>
    b.score - a.score || Number(b.photo) - Number(a.photo) || Number(!!b.product.featured) - Number(!!a.product.featured) || a.product.price - b.product.price;

  const strict: (ProductHit & { photo: boolean })[] = [];
  const partial: (ProductHit & { photo: boolean })[] = [];
  for (const row of getProductIndex()) {
    if (!inPrice(row.product)) continue;
    if (!tokens.length) {
      strict.push({ product: row.product, score: 1, photo: row.hasPhoto });
      continue;
    }
    const scores = tokens.map((t) => tokenScore(t, row));
    const matched = scores.filter((s) => s > 0).length;
    if (matched === 0) continue;
    let total = scores.reduce((a, b) => a + b, 0);
    if (phrase && row.name.includes(phrase)) total += 15;
    if (phrase && row.name.startsWith(phrase)) total += 10;
    const hit = { product: row.product, score: total, photo: row.hasPhoto };
    if (matched === tokens.length) strict.push(hit);
    else if (matched >= Math.max(1, Math.ceil(tokens.length / 2))) partial.push({ ...hit, score: total / 2 });
  }
  strict.sort(rank);
  partial.sort(rank);
  const relaxed = strict.length === 0 && partial.length > 0;
  const products = (relaxed ? partial : strict).map(({ product, score }) => ({ product, score }));

  const posts = POSTS.map((post) => {
    const row = { nameTokens: tokenise(post.title), brandTokens: [] as string[], catTokens: tokenise(`${post.category} ${post.excerpt}`) };
    const scores = tokens.map((t) => tokenScore(t, row));
    return { post, score: tokens.length && scores.every((s) => s > 0) ? scores.reduce((a, b) => a + b, 0) : 0 };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  // Category and brand shortcuts ("scooter" -> E-Scooters, "trek" -> Trek).
  const categories: SearchResults['categories'] = [];
  for (const m of MASTER_TAXONOMY) {
    const entries: { name: string; href: string; parent?: string }[] = [{ name: m.name, href: `/shop/${m.slug}/` }];
    for (const s of m.subcategories) {
      entries.push({ name: s.name, href: `/shop/${m.slug}/${s.slug}/`, parent: m.name });
      for (const i of s.items ?? []) entries.push({ name: i.name, href: `/shop/${m.slug}/${i.slug}/`, parent: s.name });
    }
    for (const e of entries) {
      const row = { nameTokens: tokenise(`${e.name} ${e.parent ?? ''}`), brandTokens: [] as string[], catTokens: [] as string[] };
      if (tokens.length && tokens.every((t) => tokenScore(t, row) >= 7)) categories.push(e);
    }
  }
  const brandCounts = new Map<string, number>();
  for (const { product } of products) brandCounts.set(brandNameOf(product), (brandCounts.get(brandNameOf(product)) ?? 0) + 1);
  const brands = ALL_BRANDS.filter((b) => {
    const row = { nameTokens: tokenise(b.name), brandTokens: [] as string[], catTokens: [] as string[] };
    return tokens.length > 0 && tokens.every((t) => tokenScore(t, row) >= 7);
  })
    .map((b) => ({ name: b.name, slug: b.slug, count: PRODUCTS.filter((p) => brandNameOf(p) === b.name).length }))
    .filter((b) => b.count > 0)
    .slice(0, 4);

  return { query, tokens, price, products, posts: posts.slice(0, 6), categories: categories.slice(0, 5), brands, relaxed };
}
