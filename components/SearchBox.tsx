'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { thumbSrc } from '@/lib/productImage';

interface Suggestion {
  slug: string;
  title: string;
  brand: string;
  categoryLabel: string;
  price: number;
  image: string | null;
  url: string;
}

interface SearchBoxProps {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  /** Called after a search is submitted (e.g. to close a mobile menu). */
  onNavigate?: () => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

const money = (n: number) => `$${Math.round(n).toLocaleString('en-AU')}`;

/** Search field with live product suggestions. Suggestions come from /api/search so the nav stays light. */
export function SearchBox({ placeholder = 'Search e-bikes, scooters, brands...', className = '', inputClassName = '', onNavigate, inputRef }: SearchBoxProps) {
  const [q, setQ] = useState('');
  const [items, setItems] = useState<Suggestion[]>([]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef<HTMLFormElement>(null);
  const listId = useId();

  const trimmed = q.trim();

  // Debounced lookup; an in-flight request is cancelled when the query changes.
  useEffect(() => {
    if (trimmed.length < 2) return;
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search/?q=${encodeURIComponent(trimmed)}&limit=6`, { signal: ctrl.signal });
        const data = await res.json();
        setItems(data.products ?? []);
        setTotal(data.totalProducts ?? 0);
        setActive(-1);
      } catch {
        /* aborted or offline: keep the previous suggestions */
      } finally {
        if (!ctrl.signal.aborted) setLoading(false);
      }
    }, 180);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [trimmed]);

  // Close when clicking elsewhere.
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const go = (url: string) => {
    setOpen(false);
    onNavigate?.();
    window.location.href = url;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (active >= 0 && items[active]) return go(new URL(items[active].url).pathname);
    if (trimmed) go(`/search/?q=${encodeURIComponent(trimmed)}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (!open || items.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => (a + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => (a <= 0 ? items.length - 1 : a - 1));
    }
  };

  const showPanel = open && trimmed.length >= 2;

  return (
    <form ref={wrapRef} onSubmit={submit} role="search" className={`relative ${className}`}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
      <input
        ref={inputRef}
        type="search"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        aria-label="Search the store"
        role="combobox"
        aria-expanded={showPanel}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
        autoComplete="off"
        enterKeyHint="search"
        className={`w-full rounded-full border border-slate-800 bg-slate-900 py-2 pl-9 pr-8 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none [&::-webkit-search-cancel-button]:hidden ${inputClassName}`}
      />
      {q && (
        <button
          type="button"
          onClick={() => {
            setQ('');
            setItems([]);
            setOpen(false);
          }}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-white"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}

      {showPanel && (
        <div className="absolute right-0 top-full z-50 mt-2 w-[min(92vw,26rem)] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
          <ul id={listId} role="listbox" aria-label="Product suggestions" className="max-h-[60vh] overflow-y-auto py-1">
            {items.map((it, i) => (
              <li key={it.slug} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                <a
                  href={new URL(it.url).pathname}
                  onMouseEnter={() => setActive(i)}
                  className={`flex items-center gap-3 px-3 py-2 text-left ${i === active ? 'bg-slate-800' : 'hover:bg-slate-800/70'}`}
                >
                  <span className="flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
                    {it.image ? <img src={thumbSrc(new URL(it.image).pathname)} alt="" width={64} height={48}  decoding="async" className="h-full w-full object-contain" /> : <Search className="h-4 w-4 text-slate-300" aria-hidden="true" />}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-xs font-bold text-white">{it.title}</span>
                    <span className="block truncate text-[11px] text-slate-400">{it.categoryLabel}</span>
                  </span>
                  <span className="shrink-0 text-xs font-extrabold text-emerald-400">{money(it.price)}</span>
                </a>
              </li>
            ))}
          </ul>
          {items.length === 0 && !loading && <p className="px-4 py-4 text-xs text-slate-400">No products found for &ldquo;{trimmed}&rdquo;. Try a brand or type, such as &ldquo;Trek&rdquo; or &ldquo;cargo&rdquo;.</p>}
          {loading && items.length === 0 && <p className="px-4 py-4 text-xs text-slate-400">Searching...</p>}
          <a href={`/search/?q=${encodeURIComponent(trimmed)}`} className="block border-t border-slate-800 bg-slate-950/60 px-4 py-3 text-xs font-bold text-emerald-400 hover:text-emerald-300">
            {total > items.length ? `See all ${total} results` : 'See all results'} for &ldquo;{trimmed}&rdquo; &rarr;
          </a>
        </div>
      )}
    </form>
  );
}
