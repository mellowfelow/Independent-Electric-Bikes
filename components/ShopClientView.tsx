'use client';

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { PRODUCTS, MASTER_TAXONOMY } from '@/config/site';
import { FilterPanel } from '@/components/FacetedFilterSidebar';
import { ProductCard } from '@/components/ProductCard';
import {
  FACETS,
  SORT_OPTIONS,
  activeFilterCount,
  applyFilters,
  buildFacetOptions,
  emptyFilters,
  facetLabel,
  isVehicle,
  parseFilters,
  priceBounds,
  serializeFilters,
  type FacetKey,
  type FilterState,
  type SortKey,
} from '@/lib/shopFilters';
import { ChevronLeft, ChevronRight, SlidersHorizontal, X } from 'lucide-react';

interface ShopClientViewProps {
  /** Slug of a main category, subcategory or leaf. Omit on the main shop page. */
  initialCategory?: string;
}

const ITEMS_PER_PAGE = 16;
const fmt = (n: number) => `$${n.toLocaleString('en-AU')}`;

const URL_EVENT = 'ieb-shop-url';

// The URL query is the single source of truth. The server snapshot is empty, so the server (and the first client
// render) show the unfiltered first page - good for crawlers - and the query is applied right after hydration.
const subscribe = (cb: () => void) => {
  window.addEventListener('popstate', cb);
  window.addEventListener(URL_EVENT, cb);
  return () => {
    window.removeEventListener('popstate', cb);
    window.removeEventListener(URL_EVENT, cb);
  };
};
const getSearch = () => window.location.search;
const getServerSearch = () => '';

export function ShopClientView({ initialCategory }: ShopClientViewProps) {
  const search = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  const state = useMemo(() => parseFilters(search), [search]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const gridTop = useRef<HTMLDivElement>(null);

  const update = useCallback((next: FilterState, opts: { keepPage?: boolean } = {}) => {
    const value = opts.keepPage ? next : { ...next, page: 1 };
    window.history.replaceState(null, '', `${window.location.pathname}${serializeFilters(value)}`);
    window.dispatchEvent(new Event(URL_EVENT));
  }, []);

  const scope = useMemo(
    () => PRODUCTS.filter((p) => !initialCategory || p.category === initialCategory || p.subcategory === initialCategory || p.subSubcategory === initialCategory),
    [initialCategory]
  );

  const filtered = useMemo(() => applyFilters(scope, state), [scope, state]);
  const options = useMemo(() => buildFacetOptions(scope, state), [scope, state]);
  const bounds = useMemo(() => priceBounds(scope), [scope]);
  const showVehicleFacets = useMemo(() => scope.some(isVehicle), [scope]);
  const activeCount = activeFilterCount(state);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const page = Math.min(state.page, totalPages);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(start, start + ITEMS_PER_PAGE);

  const toggle = (key: FacetKey, value: string) => {
    const current = state.facets[key];
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    const facets = { ...state.facets, [key]: next };
    // Leaf "type" options belong to a subcategory, so changing the subcategory resets them.
    if (key === 'sub') facets.type = [];
    update({ ...state, facets });
  };

  const setPrice = (min?: number, max?: number) => update({ ...state, minPrice: min, maxPrice: max });
  const setQuery = (q: string) => update({ ...state, q });
  const setSort = (sort: SortKey) => update({ ...state, sort });
  const clearAll = () => update({ ...emptyFilters(), sort: state.sort });
  const goToPage = (n: number) => {
    update({ ...state, page: n }, { keepPage: true });
    gridTop.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Mobile drawer: lock body scroll and close on Escape.
  useEffect(() => {
    if (!drawerOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawerOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [drawerOpen]);

  const chips: { id: string; label: string; remove: () => void }[] = [];
  for (const f of FACETS) {
    for (const v of state.facets[f.key]) {
      chips.push({ id: `${f.key}:${v}`, label: facetLabel(f.key, v), remove: () => toggle(f.key, v) });
    }
  }
  if (state.minPrice !== undefined || state.maxPrice !== undefined) {
    const label =
      state.minPrice !== undefined && state.maxPrice !== undefined
        ? `${fmt(state.minPrice)} - ${fmt(state.maxPrice)}`
        : state.minPrice !== undefined
          ? `${fmt(state.minPrice)}+`
          : `Under ${fmt((state.maxPrice ?? 0) + 1)}`;
    chips.push({ id: 'price', label, remove: () => setPrice(undefined, undefined) });
  }
  if (state.q) chips.push({ id: 'q', label: `"${state.q}"`, remove: () => setQuery('') });

  const panel = (
    <FilterPanel state={state} options={options} bounds={bounds} showVehicleFacets={showVehicleFacets} onToggle={toggle} onPrice={setPrice} onQuery={setQuery} />
  );

  // Quick-pick row: subcategories on a category page (acts as a filter), main categories on the shop index (links).
  const subOptions = options.sub;
  const quickPill = (active: boolean) =>
    `shrink-0 whitespace-nowrap rounded-full border px-4 py-2.5 text-xs font-bold transition-colors ${
      active ? 'border-emerald-500 bg-emerald-600 text-white shadow-md' : 'border-slate-800 bg-slate-900 text-slate-300 hover:border-slate-600 hover:bg-slate-800'
    }`;

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
      {/* Desktop sidebar */}
      <aside className="hidden lg:col-span-3 lg:block" aria-label="Product filters">
        <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-sm font-extrabold text-white">
              <SlidersHorizontal className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              Filters
            </h2>
            {activeCount > 0 && (
              <button type="button" onClick={clearAll} className="text-[11px] font-bold text-emerald-400 hover:underline">
                Clear all ({activeCount})
              </button>
            )}
          </div>
          {panel}
        </div>
      </aside>

      <div className="min-w-0 space-y-5 lg:col-span-9" ref={gridTop}>
        {/* Quick-pick chips */}
        <div className="-mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden" role="group" aria-label="Quick category filters">
          {initialCategory ? (
            subOptions.length > 1 && (
              <>
                <button type="button" onClick={() => update({ ...state, facets: { ...state.facets, sub: [], type: [] } })} className={quickPill(state.facets.sub.length === 0)}>
                  All ({scope.length})
                </button>
                {subOptions.map((o) => (
                  <button key={o.value} type="button" aria-pressed={state.facets.sub.includes(o.value)} onClick={() => toggle('sub', o.value)} className={quickPill(state.facets.sub.includes(o.value))}>
                    {o.label} <span className="opacity-70">({o.count})</span>
                  </button>
                ))}
              </>
            )
          ) : (
            <>
              <span className={quickPill(true)}>All Products ({PRODUCTS.length})</span>
              {MASTER_TAXONOMY.map((m) => (
                <Link key={m.slug} href={`/shop/${m.slug}/`} className={quickPill(false)}>
                  {m.name} ({PRODUCTS.filter((p) => p.category === m.slug).length})
                </Link>
              ))}
            </>
          )}
        </div>

        {/* Toolbar: filters button (mobile), result count, sort */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 text-xs font-bold text-white lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            Filters
            {activeCount > 0 && <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[10px]">{activeCount}</span>}
          </button>
          <p className="flex-1 text-xs text-slate-400" role="status" aria-live="polite">
            {filtered.length === 0 ? (
              'No products found'
            ) : (
              <>
                Showing <strong className="text-slate-200">{start + 1}-{Math.min(start + ITEMS_PER_PAGE, filtered.length)}</strong> of <strong className="text-slate-200">{filtered.length}</strong> products
              </>
            )}
          </p>
          <label className="flex items-center gap-2 text-xs text-slate-400">
            <span className="hidden sm:inline">Sort by</span>
            <select
              value={state.sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort products"
              className="min-h-[44px] rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs font-semibold text-white focus:border-emerald-500 focus:outline-none lg:min-h-[40px]"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Active filter chips */}
        {chips.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            {chips.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={c.remove}
                className="inline-flex min-h-[32px] items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 py-1 pl-3 pr-2 text-xs font-semibold text-emerald-200 hover:bg-emerald-500/20"
                aria-label={`Remove filter ${c.label}`}
              >
                {c.label}
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            ))}
            <button type="button" onClick={clearAll} className="px-2 text-xs font-bold text-slate-400 underline hover:text-white">
              Clear all
            </button>
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
            <p className="text-sm font-bold text-white">No products match these filters</p>
            <p className="mt-1 text-xs text-slate-400">Try removing a filter or widening the price range.</p>
            <button type="button" onClick={clearAll} className="mt-5 min-h-[44px] rounded-xl bg-emerald-600 px-5 text-xs font-bold text-white hover:bg-emerald-500">
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-5">
            {pageItems.map((product, i) => (
              <ProductCard key={product.slug} product={product} priority={i < 4} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="flex flex-wrap items-center justify-center gap-2 pt-6" aria-label="Pagination">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => goToPage(page - 1)}
              aria-label="Previous page"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
              if (n !== 1 && n !== totalPages && Math.abs(n - page) > 1) {
                return Math.abs(n - page) === 2 ? (
                  <span key={n} className="px-1 text-xs text-slate-600" aria-hidden="true">
                    ...
                  </span>
                ) : null;
              }
              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => goToPage(n)}
                  aria-current={n === page ? 'page' : undefined}
                  className={`h-11 w-11 rounded-xl text-xs font-bold ${n === page ? 'bg-emerald-600 text-white' : 'border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
                >
                  {n}
                </button>
              );
            })}
            <button
              type="button"
              disabled={page === totalPages}
              onClick={() => goToPage(page + 1)}
              aria-label="Next page"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        )}
      </div>

      {/* Mobile filter drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Filter products">
          <button type="button" aria-label="Close filters" className="absolute inset-0 bg-black/70" onClick={() => setDrawerOpen(false)} />
          <div className="absolute inset-x-0 bottom-0 flex max-h-[88vh] flex-col rounded-t-3xl border-t border-slate-700 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
              <h2 className="text-sm font-extrabold text-white">Filters {activeCount > 0 && <span className="ml-1 text-emerald-400">({activeCount})</span>}</h2>
              <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Close filters" className="rounded-full p-2 text-slate-300 hover:bg-slate-800">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">{panel}</div>
            <div className="flex gap-3 border-t border-slate-800 bg-slate-900 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <button type="button" onClick={clearAll} disabled={activeCount === 0} className="min-h-[48px] flex-1 rounded-xl border border-slate-700 text-xs font-bold text-white disabled:opacity-40">
                Clear all
              </button>
              <button type="button" onClick={() => setDrawerOpen(false)} className="min-h-[48px] flex-[2] rounded-xl bg-emerald-600 text-xs font-extrabold text-white hover:bg-emerald-500">
                Show {filtered.length} {filtered.length === 1 ? 'product' : 'products'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
