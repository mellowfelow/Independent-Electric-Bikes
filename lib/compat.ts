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
