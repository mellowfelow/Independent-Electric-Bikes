import { MASTER_TAXONOMY, type Product } from '@/config/site';
import { brandNameOf } from '@/lib/catalog';

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name' | 'newest';

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name', label: 'Name A-Z' },
  { value: 'newest', label: 'New arrivals' },
];

/** Multi-select facets, in display order. `vehicleOnly` facets are hidden for accessories (batteries, locks, helmets...). */
export const FACETS = [
  { key: 'sub', param: 'sub', label: 'Subcategory', vehicleOnly: false },
  { key: 'type', param: 'type', label: 'Type', vehicleOnly: false },
  { key: 'brand', param: 'brand', label: 'Brand', vehicleOnly: false },
  { key: 'motor', param: 'motor', label: 'Motor', vehicleOnly: true },
  { key: 'sensor', param: 'assist', label: 'Pedal assist / control', vehicleOnly: true },
  { key: 'brake', param: 'brakes', label: 'Brakes', vehicleOnly: true },
  { key: 'range', param: 'range', label: 'Battery range', vehicleOnly: true },
  { key: 'compliance', param: 'standard', label: 'Compliance', vehicleOnly: true },
  { key: 'badge', param: 'tag', label: 'Highlights', vehicleOnly: false },
] as const;

export type FacetKey = (typeof FACETS)[number]['key'];

export interface FilterState {
  q: string;
  facets: Record<FacetKey, string[]>;
  minPrice?: number;
  maxPrice?: number;
  sort: SortKey;
  page: number;
}

export const emptyFilters = (): FilterState => ({
  q: '',
  facets: Object.fromEntries(FACETS.map((f) => [f.key, [] as string[]])) as Record<FacetKey, string[]>,
  sort: 'featured',
  page: 1,
});

const subName = new Map<string, string>();
const typeName = new Map<string, string>();
const leafToSub = new Map<string, string>();
for (const m of MASTER_TAXONOMY) {
  for (const s of m.subcategories) {
    subName.set(s.slug, s.name);
    for (const i of s.items ?? []) {
      typeName.set(i.slug, i.name);
      leafToSub.set(i.slug, s.slug);
    }
  }
}

// Some products store a leaf type (e.g. "step-over-commuters") in `subcategory`; normalise to a real subcategory + type.
function subOf(p: Product): string | undefined {
  if (p.subcategory && subName.has(p.subcategory)) return p.subcategory;
  return leafToSub.get(p.subcategory ?? '') ?? leafToSub.get(p.subSubcategory ?? '');
}
function typeOf(p: Product): string | undefined {
  if (p.subSubcategory && typeName.has(p.subSubcategory)) return p.subSubcategory;
  return p.subcategory && typeName.has(p.subcategory) ? p.subcategory : undefined;
}

/** Value(s) a product has for a facet. */
export function facetValue(p: Product, key: FacetKey): string | undefined {
  switch (key) {
    case 'sub':
      return subOf(p);
    case 'type':
      return typeOf(p);
    case 'brand':
      return brandNameOf(p);
    case 'motor':
      return p.filters?.motorType;
    case 'sensor':
      return p.filters?.sensorType;
    case 'brake':
      return p.filters?.brakeType;
    case 'range':
      return p.filters?.batteryRange;
    case 'compliance':
      return p.filters?.compliance;
    case 'badge':
      return p.badge && p.badge !== 'none' ? p.badge : undefined;
  }
}

export function facetLabel(key: FacetKey, value: string): string {
  if (key === 'sub') return subName.get(value) ?? value;
  if (key === 'type') return typeName.get(value) ?? value;
  return value;
}

export const isVehicle = (p: Product) => p.category !== 'accessories';

function matchesFacets(p: Product, state: FilterState, skip?: FacetKey): boolean {
  for (const f of FACETS) {
    if (f.key === skip) continue;
    const wanted = state.facets[f.key];
    if (wanted.length === 0) continue;
    const v = facetValue(p, f.key);
    if (!v || !wanted.includes(v)) return false;
  }
  return true;
}

function matchesPrice(p: Product, state: FilterState): boolean {
  if (state.minPrice !== undefined && p.price < state.minPrice) return false;
  if (state.maxPrice !== undefined && p.price > state.maxPrice) return false;
  return true;
}

function matchesQuery(p: Product, q: string): boolean {
  if (!q) return true;
  const hay = `${p.name} ${brandNameOf(p)} ${p.shortDescription ?? ''}`.toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((t) => hay.includes(t));
}

export function applyFilters(scope: Product[], state: FilterState): Product[] {
  const list = scope.filter((p) => matchesQuery(p, state.q) && matchesPrice(p, state) && matchesFacets(p, state));
  return sortProducts(list, state.sort);
}

export function sortProducts(list: Product[], sort: SortKey): Product[] {
  const out = [...list];
  switch (sort) {
    case 'price-asc':
      return out.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return out.sort((a, b) => b.price - a.price);
    case 'name':
      return out.sort((a, b) => a.name.localeCompare(b.name));
    case 'newest':
      return out.sort((a, b) => Number(b.badge === 'New') - Number(a.badge === 'New'));
    default:
      return out.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }
}

export interface FacetOption {
  value: string;
  label: string;
  count: number;
}

/**
 * Disjunctive facet counts: each facet is counted against every OTHER active filter, so selecting one brand
 * still shows how many results the other brands would give. Options with zero results stay visible only if selected.
 */
export function buildFacetOptions(scope: Product[], state: FilterState): Record<FacetKey, FacetOption[]> {
  const out = {} as Record<FacetKey, FacetOption[]>;
  for (const f of FACETS) {
    const counts = new Map<string, number>();
    for (const p of scope) {
      if (!matchesQuery(p, state.q) || !matchesPrice(p, state) || !matchesFacets(p, state, f.key)) continue;
      const v = facetValue(p, f.key);
      if (v) counts.set(v, (counts.get(v) ?? 0) + 1);
    }
    for (const selected of state.facets[f.key]) if (!counts.has(selected)) counts.set(selected, 0);
    out[f.key] = [...counts.entries()]
      .map(([value, count]) => ({ value, label: facetLabel(f.key, value), count }))
      .sort((a, b) => (f.key === 'sub' || f.key === 'type' ? a.label.localeCompare(b.label) : b.count - a.count || a.label.localeCompare(b.label)));
  }
  return out;
}

export function priceBounds(scope: Product[]): { min: number; max: number } {
  if (scope.length === 0) return { min: 0, max: 0 };
  let min = Infinity;
  let max = 0;
  for (const p of scope) {
    min = Math.min(min, p.price);
    max = Math.max(max, p.price);
  }
  return { min: Math.floor(min), max: Math.ceil(max) };
}

export function activeFilterCount(state: FilterState): number {
  return (
    FACETS.reduce((n, f) => n + state.facets[f.key].length, 0) +
    (state.minPrice !== undefined || state.maxPrice !== undefined ? 1 : 0) +
    (state.q ? 1 : 0)
  );
}

// ---- URL <-> state -------------------------------------------------------------------------------------------

export function parseFilters(search: string): FilterState {
  const sp = new URLSearchParams(search);
  const s = emptyFilters();
  s.q = (sp.get('q') || '').slice(0, 80);
  for (const f of FACETS) {
    const raw = sp.get(f.param);
    if (raw) s.facets[f.key] = raw.split('~').filter(Boolean).slice(0, 20);
  }
  const num = (v: string | null) => (v !== null && v !== '' && Number.isFinite(Number(v)) ? Math.max(0, Number(v)) : undefined);
  s.minPrice = num(sp.get('min'));
  s.maxPrice = num(sp.get('max'));
  const sort = sp.get('sort') as SortKey | null;
  if (sort && SORT_OPTIONS.some((o) => o.value === sort)) s.sort = sort;
  const page = Number(sp.get('page'));
  if (Number.isInteger(page) && page > 1) s.page = page;
  return s;
}

export function serializeFilters(state: FilterState): string {
  const sp = new URLSearchParams();
  if (state.q) sp.set('q', state.q);
  for (const f of FACETS) if (state.facets[f.key].length) sp.set(f.param, state.facets[f.key].join('~'));
  if (state.minPrice !== undefined) sp.set('min', String(state.minPrice));
  if (state.maxPrice !== undefined) sp.set('max', String(state.maxPrice));
  if (state.sort !== 'featured') sp.set('sort', state.sort);
  if (state.page > 1) sp.set('page', String(state.page));
  const qs = sp.toString();
  return qs ? `?${qs}` : '';
}
