'use client';

import { useEffect, useState } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { FACETS, type FacetKey, type FacetOption, type FilterState } from '@/lib/shopFilters';

interface FilterPanelProps {
  state: FilterState;
  options: Record<FacetKey, FacetOption[]>;
  bounds: { min: number; max: number };
  showVehicleFacets: boolean;
  onToggle: (key: FacetKey, value: string) => void;
  onPrice: (min?: number, max?: number) => void;
  onQuery: (q: string) => void;
}

const COLLAPSED_LIMIT = 8;
const QUICK_PRICE_STEPS = [1000, 2500, 5000];
const fmt = (n: number) => `$${n.toLocaleString('en-AU')}`;

function Group({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="group border-t border-slate-800/80 first:border-t-0">
      <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-[11px] font-extrabold uppercase tracking-wider text-slate-200 [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="h-4 w-4 text-slate-500 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="pb-4">{children}</div>
    </details>
  );
}

function CheckList({
  facet,
  options,
  selected,
  onToggle,
}: {
  facet: FacetKey;
  options: FacetOption[];
  selected: string[];
  onToggle: (key: FacetKey, value: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [find, setFind] = useState('');
  const searchable = options.length > 14;
  const filtered = find ? options.filter((o) => o.label.toLowerCase().includes(find.toLowerCase())) : options;
  // Selected options are always shown, even when the list is collapsed.
  const visible = expanded || find ? filtered : filtered.filter((o, i) => i < COLLAPSED_LIMIT || selected.includes(o.value));
  const hidden = filtered.length - visible.length;

  return (
    <div className="space-y-1">
      {searchable && (
        <div className="relative mb-2">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" aria-hidden="true" />
          <input
            type="search"
            value={find}
            onChange={(e) => setFind(e.target.value)}
            placeholder={`Find ${FACETS.find((f) => f.key === facet)?.label.toLowerCase()}`}
            aria-label={`Find ${facet}`}
            className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2 pl-8 pr-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
          />
        </div>
      )}
      {visible.map((o) => {
        const checked = selected.includes(o.value);
        const disabled = o.count === 0 && !checked;
        return (
          <label
            key={o.value}
            className={`flex min-h-[40px] cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 text-[13px] transition-colors lg:min-h-[32px] ${
              checked ? 'bg-emerald-500/10 text-white' : 'text-slate-300 hover:bg-slate-800/70'
            } ${disabled ? 'cursor-not-allowed opacity-40' : ''}`}
          >
            <input
              type="checkbox"
              checked={checked}
              disabled={disabled}
              onChange={() => onToggle(facet, o.value)}
              className="h-4 w-4 shrink-0 rounded border-slate-600 bg-slate-950 accent-emerald-500"
            />
            <span className="flex-1 leading-snug">{o.label}</span>
            <span className="text-[11px] tabular-nums text-slate-500">{o.count}</span>
          </label>
        );
      })}
      {filtered.length === 0 && <p className="px-2 py-1 text-xs text-slate-500">No matches</p>}
      {hidden > 0 && (
        <button type="button" onClick={() => setExpanded(true)} className="px-2 py-1.5 text-xs font-bold text-emerald-400 hover:underline">
          Show all {filtered.length}
        </button>
      )}
      {expanded && !find && filtered.length > COLLAPSED_LIMIT && (
        <button type="button" onClick={() => setExpanded(false)} className="px-2 py-1.5 text-xs font-bold text-emerald-400 hover:underline">
          Show fewer
        </button>
      )}
    </div>
  );
}

function PriceFilter({ state, bounds, onPrice }: { state: FilterState; bounds: { min: number; max: number }; onPrice: (min?: number, max?: number) => void }) {
  const [min, setMin] = useState(state.minPrice?.toString() ?? '');
  const [max, setMax] = useState(state.maxPrice?.toString() ?? '');

  // Re-sync the inputs when the price is changed elsewhere (chips, "clear all", browser back) - derived during render.
  const [seen, setSeen] = useState({ min: state.minPrice, max: state.maxPrice });
  if (seen.min !== state.minPrice || seen.max !== state.maxPrice) {
    setSeen({ min: state.minPrice, max: state.maxPrice });
    setMin(state.minPrice?.toString() ?? '');
    setMax(state.maxPrice?.toString() ?? '');
  }

  const commit = () => {
    const lo = min === '' ? undefined : Math.max(0, Number(min));
    const hi = max === '' ? undefined : Math.max(0, Number(max));
    if (lo !== undefined && hi !== undefined && lo > hi) onPrice(hi, lo);
    else onPrice(lo, hi);
  };

  const steps = QUICK_PRICE_STEPS.filter((s) => s > bounds.min && s < bounds.max);
  const ranges: { label: string; lo?: number; hi?: number }[] = [];
  const edges = steps.length ? [undefined, ...steps, undefined] : [];
  for (let i = 0; i < edges.length - 1; i++) {
    const lo = edges[i];
    const hi = edges[i + 1];
    ranges.push({ label: lo === undefined ? `Under ${fmt(hi!)}` : hi === undefined ? `${fmt(lo)}+` : `${fmt(lo)} - ${fmt(hi)}`, lo, hi });
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <label className="flex-1">
          <span className="sr-only">Minimum price</span>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">$</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={min}
              placeholder={String(bounds.min)}
              onChange={(e) => setMin(e.target.value)}
              onBlur={commit}
              onKeyDown={(e) => e.key === 'Enter' && commit()}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 pl-6 pr-2 text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </label>
        <span className="text-slate-600" aria-hidden="true">–</span>
        <label className="flex-1">
          <span className="sr-only">Maximum price</span>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">$</span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={max}
              placeholder={String(bounds.max)}
              onChange={(e) => setMax(e.target.value)}
              onBlur={commit}
              onKeyDown={(e) => e.key === 'Enter' && commit()}
              className="w-full rounded-lg border border-slate-800 bg-slate-950 py-2.5 pl-6 pr-2 text-xs text-white placeholder-slate-600 focus:border-emerald-500 focus:outline-none"
            />
          </div>
        </label>
      </div>
      {ranges.length > 1 && (
        <div className="flex flex-wrap gap-1.5">
          {ranges.map((r) => {
            const active = state.minPrice === r.lo && state.maxPrice === (r.hi !== undefined ? r.hi - 1 : undefined);
            return (
              <button
                key={r.label}
                type="button"
                onClick={() => onPrice(active ? undefined : r.lo, active ? undefined : r.hi !== undefined ? r.hi - 1 : undefined)}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-colors ${
                  active ? 'border-emerald-500 bg-emerald-500/15 text-emerald-300' : 'border-slate-700 text-slate-300 hover:border-slate-500'
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function FilterPanel({ state, options, bounds, showVehicleFacets, onToggle, onPrice, onQuery }: FilterPanelProps) {
  const [q, setQ] = useState(state.q);
  const [seenQ, setSeenQ] = useState(state.q);
  if (seenQ !== state.q) {
    setSeenQ(state.q);
    setQ(state.q);
  }
  useEffect(() => {
    const t = setTimeout(() => q !== state.q && onQuery(q), 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  return (
    <div className="text-xs">
      <div className="relative pb-4">
        <Search className="pointer-events-none absolute left-3 top-[1.15rem] h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search this range"
          aria-label="Search this range"
          className="w-full rounded-xl border border-slate-800 bg-slate-950 py-2.5 pl-9 pr-8 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
        />
        {q && (
          <button type="button" onClick={() => setQ('')} aria-label="Clear search" className="absolute right-2 top-[1.15rem] -translate-y-1/2 rounded p-1 text-slate-400 hover:text-white">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <Group title="Price (AUD)">
        <PriceFilter state={state} bounds={bounds} onPrice={onPrice} />
      </Group>

      {FACETS.map((f) => {
        if (f.vehicleOnly && !showVehicleFacets) return null;
        // Leaf "type" options only make sense inside one subcategory.
        if (f.key === 'type' && state.facets.sub.length !== 1 && options.sub.length > 1) return null;
        const list = options[f.key];
        // A facet with a single value (and nothing selected) cannot narrow anything, so it is not shown.
        if (list.length === 0 || (list.length === 1 && state.facets[f.key].length === 0)) return null;
        return (
          <Group key={f.key} title={f.label} defaultOpen={f.key !== 'compliance' && f.key !== 'badge'}>
            <CheckList facet={f.key} options={list} selected={state.facets[f.key]} onToggle={onToggle} />
          </Group>
        );
      })}
    </div>
  );
}
