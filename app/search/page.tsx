'use client';

import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Bike, X, Tag, Store } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { MASTER_TAXONOMY } from '@/config/site';
import { search } from '@/lib/search';

const URL_EVENT = 'ieb-search-url';
const PAGE_SIZE = 24;
const POPULAR = ['step-through e-bike', 'cargo bike', 'folding e-bike', 'e-scooter', 'Trek', 'electric skateboard', 'e-bike under $2000', 'helmet'];

type Sort = 'relevance' | 'price-asc' | 'price-desc';

// The URL query (?q=) is the single source of truth, so results survive reloads and can be shared.
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
const noopSubscribe = () => () => {};
const money = (n: number) => `$${n.toLocaleString('en-AU')}`;

export default function SearchPage() {
  const urlSearch = useSyncExternalStore(subscribe, getSearch, getServerSearch);
  // The server cannot see ?q=, so the results area waits for hydration instead of flashing the empty state.
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const q = useMemo(() => new URLSearchParams(urlSearch).get('q') ?? '', [urlSearch]);
  const [sort, setSort] = useState<Sort>('relevance');
  const [visible, setVisible] = useState(PAGE_SIZE);
  const inputRef = useRef<HTMLInputElement>(null);

  const setQuery = useCallback((value: string, opts: { replace?: boolean } = {}) => {
    const url = value ? `/search/?q=${encodeURIComponent(value)}` : '/search/';
    if (opts.replace) window.history.replaceState(null, '', url);
    else window.history.pushState(null, '', url);
    window.dispatchEvent(new Event(URL_EVENT));
    setVisible(PAGE_SIZE);
  }, []);

  useEffect(() => {
    if (!q) inputRef.current?.focus();
  }, [q]);

  const results = useMemo(() => search(q), [q]);
  const products = useMemo(() => {
    const list = results.products.map((h) => h.product);
    if (sort === 'price-asc') return [...list].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [results, sort]);

  const hasQuery = q.trim().length > 0;
  const hasAny = products.length > 0 || results.posts.length > 0;
  const priceLabel =
    results.price.min !== undefined && results.price.max !== undefined
      ? `${money(results.price.min)} - ${money(results.price.max)}`
      : results.price.max !== undefined
        ? `Under ${money(results.price.max)}`
        : results.price.min !== undefined
          ? `Over ${money(results.price.min)}`
          : null;

  return (
    <>
      <div className="border-b border-slate-800 bg-slate-900 px-4 py-10 text-center sm:py-12">
        <div className="mx-auto max-w-2xl space-y-4">
          <h1 className="text-2xl font-black text-white sm:text-4xl">Search</h1>
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              inputRef.current?.blur();
            }}
            className="relative"
          >
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              ref={inputRef}
              type="search"
              value={q}
              onChange={(e) => setQuery(e.target.value, { replace: true })}
              placeholder="Try a brand, type or budget: Trek, cargo, scooter under $1500"
              aria-label="Search products and guides"
              autoComplete="off"
              enterKeyHint="search"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 py-3.5 pl-10 pr-10 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {q && (
              <button type="button" onClick={() => setQuery('', { replace: true })} aria-label="Clear search" className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1.5 text-slate-400 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="mx-auto min-h-[60vh] max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8">
        {!hydrated ? null : !hasQuery ? (
          <div className="mx-auto max-w-3xl space-y-10 text-center">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Popular searches</p>
              <div className="flex flex-wrap justify-center gap-2">
                {POPULAR.map((p) => (
                  <button key={p} type="button" onClick={() => setQuery(p)} className="min-h-[40px] rounded-full border border-slate-700 bg-slate-900 px-4 text-xs font-semibold text-slate-200 hover:border-emerald-500 hover:text-white">
                    {p}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Or browse a range</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {MASTER_TAXONOMY.map((m) => (
                  <Link key={m.slug} href={`/shop/${m.slug}/`} className="rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:border-emerald-500">
                    {m.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Summary + shortcuts */}
            <div className="space-y-3">
              <p className="text-sm text-slate-300" role="status" aria-live="polite">
                {hasAny ? (
                  <>
                    <strong className="text-white">{products.length}</strong> {products.length === 1 ? 'product' : 'products'}
                    {results.posts.length > 0 && (
                      <>
                        {' '}
                        and <strong className="text-white">{results.posts.length}</strong> {results.posts.length === 1 ? 'guide' : 'guides'}
                      </>
                    )}{' '}
                    for &ldquo;{q}&rdquo;
                  </>
                ) : (
                  <>
                    No results for &ldquo;{q}&rdquo;
                  </>
                )}
                {priceLabel && <span className="ml-2 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-300">{priceLabel}</span>}
              </p>
              {results.relaxed && products.length > 0 && <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-xs text-amber-200">No product matched every word, so these are the closest matches.</p>}
              {(results.categories.length > 0 || results.brands.length > 0) && (
                <div className="flex flex-wrap gap-2">
                  {results.categories.map((c) => (
                    <Link key={c.href} href={c.href} className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900 px-3.5 text-xs font-semibold text-slate-200 hover:border-emerald-500">
                      <Tag className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                      {c.parent ? `${c.parent} / ` : ''}
                      {c.name}
                    </Link>
                  ))}
                  {results.brands.map((b) => (
                    <Link key={b.slug} href={`/brands/${b.slug}/`} className="inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900 px-3.5 text-xs font-semibold text-slate-200 hover:border-emerald-500">
                      <Store className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                      {b.name} <span className="text-slate-500">({b.count})</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {products.length > 0 && (
              <section aria-labelledby="products-heading">
                <div className="mb-6 flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <h2 id="products-heading" className="flex items-center gap-2 text-lg font-extrabold text-white">
                    <Bike className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                    Products
                  </h2>
                  <label className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="hidden sm:inline">Sort by</span>
                    <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} aria-label="Sort results" className="min-h-[40px] rounded-xl border border-slate-700 bg-slate-900 px-3 text-xs font-semibold text-white focus:border-emerald-500 focus:outline-none">
                      <option value="relevance">Best match</option>
                      <option value="price-asc">Price: low to high</option>
                      <option value="price-desc">Price: high to low</option>
                    </select>
                  </label>
                </div>
                <div className="grid grid-cols-1 gap-4 min-[520px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 xl:gap-5">
                  {products.slice(0, visible).map((p) => (
                    <ProductCard key={p.slug} product={p} />
                  ))}
                </div>
                {products.length > visible && (
                  <div className="pt-8 text-center">
                    <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className="min-h-[48px] rounded-xl border border-slate-700 bg-slate-900 px-6 text-xs font-bold text-white hover:border-emerald-500">
                      Show more ({products.length - visible} remaining)
                    </button>
                  </div>
                )}
              </section>
            )}

            {results.posts.length > 0 && (
              <section aria-labelledby="guides-heading">
                <h2 id="guides-heading" className="mb-6 flex items-center gap-2 border-b border-slate-800 pb-3 text-lg font-extrabold text-white">
                  <BookOpen className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                  Guides
                </h2>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {results.posts.map(({ post }) => (
                    <Link key={post.slug} href={`/blog/${post.slug}/`} className="group rounded-2xl border border-slate-800 bg-slate-900 p-5 hover:border-emerald-500/60">
                      <div className="text-[10px] font-bold uppercase text-emerald-400">{post.category}</div>
                      <h3 className="mt-1 text-base font-extrabold text-white group-hover:text-emerald-400">{post.title}</h3>
                      <p className="mt-2 line-clamp-2 text-xs text-slate-300">{post.excerpt}</p>
                      <span className="mt-4 inline-block text-xs font-bold text-emerald-400">Read article &rarr;</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {!hasAny && (
              <div className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
                <p className="text-base font-bold text-white">We couldn&rsquo;t find anything for &ldquo;{q}&rdquo;</p>
                <p className="mt-2 text-xs text-slate-400">Check the spelling, try fewer words, or search by brand, type or budget.</p>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {POPULAR.slice(0, 6).map((p) => (
                    <button key={p} type="button" onClick={() => setQuery(p)} className="min-h-[40px] rounded-full border border-slate-700 px-4 text-xs font-semibold text-slate-200 hover:border-emerald-500">
                      {p}
                    </button>
                  ))}
                </div>
                <p className="mt-6 text-xs text-slate-400">
                  Still stuck?{' '}
                  <Link href="/contact/" className="font-bold text-emerald-400 underline">
                    Ask us
                  </Link>{' '}
                  and we will help you find the right model.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
