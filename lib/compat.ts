import { PRODUCTS, type Product } from '@/config/site';
import { PART_FITS } from '@/config/data/compatibility';

const byName = new Map(PRODUCTS.map((p) => [p.name, p]));

const resolve = (names: string[] = []): Product[] =>
  names.map((n) => byName.get(n)).filter((p): p is Product => !!p);

export interface PartFitResult {
  rule: string;
  confirmed: Product[];
  system: Product[];
}

/** Vehicles a part fits. `system` excludes anything already confirmed. */
export function fitsOfPart(part: Product): PartFitResult | null {
  const fit = PART_FITS[part.name];
  if (!fit) return null;
  const confirmed = resolve(fit.confirmed);
  const seen = new Set(confirmed.map((p) => p.slug));
  const system = resolve(fit.system).filter((p) => !seen.has(p.slug));
  return { rule: fit.rule, confirmed, system };
}

export interface VehiclePart {
  part: Product;
  level: 'confirmed' | 'system';
  rule: string;
}

/** Parts that suit a vehicle, confirmed fits first. */
export function partsForVehicle(vehicle: Product): VehiclePart[] {
  const out: VehiclePart[] = [];
  for (const [name, fit] of Object.entries(PART_FITS)) {
    const part = byName.get(name);
    if (!part) continue;
    if (fit.confirmed?.includes(vehicle.name)) out.push({ part, level: 'confirmed', rule: fit.rule });
    else if (fit.system?.includes(vehicle.name)) out.push({ part, level: 'system', rule: fit.rule });
  }
  return out.sort((a, b) => (a.level === b.level ? 0 : a.level === 'confirmed' ? -1 : 1));
}

/** One-line summary for product cards, e.g. "Fits Merida eBig.Nine 400 and 7 more". */
export function fitSummary(part: Product): string | null {
  const f = fitsOfPart(part);
  if (!f) return null;
  const all = [...f.confirmed, ...f.system];
  if (all.length === 0) return 'Fits by size: see product page';
  const first = all[0].name;
  return all.length === 1 ? `Fits ${first}` : `Fits ${first} and ${all.length - 1} more`;
}

/** Related products for a product page: compatible parts or vehicles first, then more from the same range. */
export function relatedProducts(product: Product, isPart: boolean, limit = 8): Product[] {
  const out: Product[] = [];
  const push = (p: Product) => {
    if (p.slug !== product.slug && !out.some((o) => o.slug === p.slug)) out.push(p);
  };
  // Siblings are taken in a ring starting just after this product, so every product is linked from the next few
  // in its sub-category instead of everyone linking to the same first items.
  const ring = (list: Product[]) => {
    const i = list.findIndex((p) => p.slug === product.slug);
    return i < 0 ? list : [...list.slice(i + 1), ...list.slice(0, i)];
  };
  const sameSub = ring(PRODUCTS.filter((p) => p.category === product.category && p.subcategory === product.subcategory));
  const sameCat = ring(PRODUCTS.filter((p) => p.category === product.category));
  if (isPart) {
    const f = fitsOfPart(product);
    f?.confirmed.forEach(push);
    f?.system.forEach(push);
    sameSub.forEach(push);
  } else {
    // A few fitting parts, then neighbouring models.
    partsForVehicle(product).slice(0, Math.max(2, Math.floor(limit / 2))).forEach(({ part }) => push(part));
    sameSub.forEach(push);
  }
  sameCat.forEach(push);
  return out.slice(0, limit);
}

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
