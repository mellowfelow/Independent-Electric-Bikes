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
  [/\b(?:e[\s-]*bikes?|electric[\s-]*bikes?|electric[\s-]*bicycles?)\b/g, 'ebike'],
  [/\b(?:e[\s-]*scooters?|electric[\s-]*scooters?)\b/g, 'escooter'],
  [/\b(?:e[\s-]*skateboards?|electric[\s-]*skateboards?|electric[\s-]*longboards?|longboards?|skateboards?)\b/g, 'skateboard'],
  [/\bstep[\s-]*(?:through|thru|over)\b/g, (m) => (m.includes('over') ? 'stepover' : 'stepthrough')],
  [/\b(?:low[\s-]*step)\b/g, 'stepthrough'],
  [/\b(?:fold(?:ing|able|er|ers|s)?)\b/g, 'folding'],
  [/\b(?:mid[\s-]*drive|centre[\s-]*motor|center[\s-]*motor)\b/g, 'middrive'],
  [/\b(?:long[\s-]*tail|cargo|utility|family)\b/g, 'cargo'],
  [/\b(?:kids?|child(?:ren)?|youth|junior|toddler)\b/g, 'kids'],
  [/\b(?:fat[\s-]*(?:tyre|tire)s?)\b/g, 'fattyre'],
  [/\b(?:emtb|mountain[\s-]*bikes?|mtb)\b/g, 'emtb'],
  [/\b(?:hover[\s-]*boards?|self[\s-]*balancing)\b/g, 'selfbalancing'],
  [/\b(?:mobility|disability|wheelchair)\b/g, 'mobility'],
  [/\b(?:jet[\s-]*skis?|pwc|personal[\s-]*water[\s-]*craft)\b/g, 'jetski'],
  [/\b(?:sea[\s-]*doo|seadoo|seedoo|see[\s-]*doo)\b/g, 'seadoo'],
  [/\b(?:e[\s-]*foils?|electric[\s-]*foils?|hydrofoils?)\b/g, 'efoil'],
  [/\b(?:jet[\s-]*boards?|electric[\s-]*surfboards?)\b/g, 'jetboard'],
  [/\b(?:helmets?)\b/g, 'helmet'],
  [/\b(?:batter(?:y|ies))\b/g, 'battery'],
  [/\b(?:locks?)\b/g, 'lock'],
  [/\bbicycles?\b/g, 'bike'],
  [/\btires\b/g, 'tyres'],
  [/\btire\b/g, 'tyre'],
];

/** Common misspellings, fixed first so "electrik bike" or "scoter" still find the right products. */
const TYPOS: [RegExp, string][] = [
  [/\b(?:electrik|electrick|electrc|elctric|eletric|electic|electirc|electrci)\b/g, 'electric'],
  [/\b(?:scoter|scotter|skooter|scooer|scooteer|scooterr)(s?)\b/g, 'scooter$1'],
  [/\b(?:bycicle|bicycel|bycycle|bicyle|bicylce)(s?)\b/g, 'bicycle$1'],
  [/\b(?:skatebord|skatboard|skateboad|skateboar)(s?)\b/g, 'skateboard$1'],
  [/\b(?:hoverbord|hovaboard|hoverboad)(s?)\b/g, 'hoverboard$1'],
  [/\b(?:unicyle|unicycel|unicicle)(s?)\b/g, 'unicycle$1'],
  [/\b(?:mobilty|mobilitiy)\b/g, 'mobility'],
  [/\b(?:batery|baterry|batary|battrey|batterie)(s?)\b/g, 'battery$1'],
  [/\b(?:chargr|chager|charget)(s?)\b/g, 'charger$1'],
  [/\b(?:helmat|helment|hemlet)(s?)\b/g, 'helmet$1'],
  [/\b(?:foldable|foldin)\b/g, 'folding'],
];

export function normalise(input: string): string {
  let s = input.toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '');
  s = s.replace(/&/g, ' and ');
  for (const [re, to] of TYPOS) s = s.replace(re, to);
  for (const [re, to] of PHRASES) s = s.replace(re, to as string);
  return s;
}

// Filler words ("best", "top") never narrow results; "cheap"/"premium" re-order them instead.
const STOP = new Set(['a', 'an', 'the', 'for', 'and', 'with', 'of', 'in', 'to', 'bike', 'bikes', 'best', 'top', 'good', 'great', 'buy', 'cheap', 'cheapest', 'budget', 'affordable', 'inexpensive', 'premium', 'expensive', 'luxury']);
// Spare parts rank below whole vehicles unless the search is clearly for a part.
const PART_WORDS = new Set(['battery', 'charger', 'tyre', 'tube', 'brake', 'rotor', 'pad', 'kit', 'motor', 'part', 'replacement', 'belt', 'truck', 'wheel', 'throttle', 'controller', 'display', 'cable', 'spoke', 'inner', 'fork', 'chain', 'cassette', 'crank', 'saddle', 'pedal', 'bms', 'cell', 'adapter', 'conversion', 'middrive', 'hub', 'spare', 'fuse', 'trucks', 'bearing', 'grip']);
const CHEAP = new Set(['cheap', 'cheapest', 'budget', 'affordable', 'inexpensive']);
const PREMIUM = new Set(['premium', 'expensive', 'luxury']);

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
  labelTokens: string[];
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
      labelTokens: tokenise(productCategoryLabel(product).replace(/-/g, ' ')),
      hasPhoto: !product.images[0]?.endsWith('.svg'),
    };
  });
  return productIndex;
}

function tokenScore(t: string, row: { nameTokens: string[]; brandTokens: string[]; catTokens: string[]; labelTokens?: string[] }): number {
  let best = 0;
  for (const n of row.nameTokens) {
    if (n === t) best = Math.max(best, 10);
    else if (n === 'e' + t) best = Math.max(best, 9);
    else if (t.length >= 2 && n.startsWith(t)) best = Math.max(best, 7);
    else if (t.length >= 5 && n.length >= 5 && editDistanceAtMostOne(t, n)) best = Math.max(best, 4);
  }
  for (const n of row.brandTokens) {
    if (n === t) best = Math.max(best, 9);
    else if (t.length >= 2 && n.startsWith(t)) best = Math.max(best, 6);
    else if (t.length >= 5 && n.length >= 5 && editDistanceAtMostOne(t, n)) best = Math.max(best, 4);
  }
  let cat = 0;
  for (const n of row.catTokens) {
    if (n === t) cat = Math.max(cat, 5);
    else if (n === 'e' + t) cat = Math.max(cat, 4);
    else if (t.length >= 3 && n.startsWith(t)) cat = Math.max(cat, 3);
  }
  // A word that matches the name AND the category ("folding" in a folding e-bike) outranks a name-only match
  // (a folding lock), so the products people usually mean come first.
  // The product's own type ("U-Locks", "Kids Electric Quad Bikes") beats a brand or sub-brand that merely shares the word.
  const label = row.labelTokens?.includes(t) || row.labelTokens?.includes('e' + t) ? 3 : 0;
  // A word that only matches a brand ("Quad Lock", "Segway") ranks below products that are that type of thing.
  const brandOnly = label === 0 && row.brandTokens.includes(t) && !row.nameTokens.includes('e' + t) ? 3 : 0;
  if (best > 0 && cat >= 4) return best + 4 + label - brandOnly;
  return (best > 0 && cat > 0 ? best + 2 : Math.max(best, cat)) + (best > 0 || cat > 0 ? label : 0) - (best > 0 ? brandOnly : 0);
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
  const rawTokens = tokenise(text);
  let tokens = rawTokens.filter((t) => !STOP.has(t));
  // A bare "bike" / "bicycle" search means e-bikes.
  if (!tokens.length && rawTokens.some((t) => t === 'bike' || t === 'bicycle')) tokens = ['ebike'];
  const intent: 'cheap' | 'premium' | null = rawTokens.some((t) => CHEAP.has(t)) ? 'cheap' : rawTokens.some((t) => PREMIUM.has(t)) ? 'premium' : null;
  const hasPrice = price.min !== undefined || price.max !== undefined;
  const empty: SearchResults = { query, tokens, price, products: [], posts: [], categories: [], brands: [], relaxed: false };
  if (!tokens.length && !hasPrice && !intent) return empty;

  const phrase = normalise(text)
    .split(/\s+/)
    .filter((w) => w && !STOP.has(w))
    .join(' ');
  // Whole-word match only, so "ebike" does not get the phrase bonus inside "ebikeling".
  const phraseRe = phrase ? new RegExp('(^|[^a-z0-9])e?' + phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '($|[^a-z0-9])') : null;
  const partIntent = tokens.some((t) => PART_WORDS.has(t));
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
    if (row.product.category === 'batteries-parts-kits' && !partIntent) total -= 4;
    if (phraseRe && phraseRe.test(row.name)) total += 15;
    if (phrase && (row.name === phrase || row.name.startsWith(phrase + ' '))) total += 2;
    const hit = { product: row.product, score: total, photo: row.hasPhoto };
    if (matched === tokens.length) strict.push(hit);
    else if (matched >= Math.max(1, Math.ceil(tokens.length / 2))) partial.push({ ...hit, score: total / 2 });
  }
  strict.sort(rank);
  partial.sort(rank);
  if (intent) {
    const dir = intent === 'cheap' ? 1 : -1;
    // Only re-order the strong matches, so "cheap ebike" is the cheapest e-bikes, not the cheapest charger.
    const keep = (list: typeof strict) => {
      const top = list[0]?.score ?? 0;
      return list.filter((h) => h.score >= top * 0.6).sort((a, b) => (a.product.price - b.product.price) * dir);
    };
    const s2 = keep(strict);
    strict.length = 0;
    strict.push(...s2);
    const p2 = keep(partial);
    partial.length = 0;
    partial.push(...p2);
  }
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
