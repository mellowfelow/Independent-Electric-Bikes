'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Search, Bike, BookOpen } from 'lucide-react';
import { money } from '@/lib/order';
import { ProductCard } from '@/components/ProductCard';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<{ products: any[]; posts: any[] }>({ products: [], posts: [] });
  const [loading, setLoading] = useState(false);

  const fetchResults = async (q: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setResults({ products: data.products || [], posts: data.posts || [] });
    } catch {
      setResults({ products: [], posts: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      const timer = setTimeout(() => {
        fetchResults(initialQuery);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [initialQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      fetchResults(query.trim());
    }
  };

  return (
    <>
      <div className="bg-slate-900 border-b border-slate-800 py-12 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <h1 className="text-2xl sm:text-4xl font-black text-white">Search Electric Bikes & Guides</h1>
          <form onSubmit={handleSearchSubmit} className="flex items-center relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search 500W, cargo, folding, Bafang, laws..."
              className="w-full bg-slate-950 border border-slate-800 text-sm rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12 text-slate-400">Searching e-bikes and guides...</div>
        ) : (
          <div className="space-y-12">
            <div>
              <h2 className="text-lg font-extrabold text-white mb-6 flex items-center gap-2 border-b border-slate-800 pb-3">
                <Bike className="w-5 h-5 text-emerald-400" />
                <span>Matching Electric Bikes ({results.products.length})</span>
              </h2>

              {results.products.length === 0 ? (
                <p className="text-xs text-slate-400">No matching e-bikes found for &quot;{query}&quot;.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {results.products.map((p) => (
                    p.product ? (
                      <ProductCard key={p.slug} product={p.product} />
                    ) : (
                      <div key={p.slug} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-bold text-emerald-400 uppercase">{p.category}</div>
                          <h3 className="text-base font-extrabold text-white mt-1">
                            <Link href={p.url} className="hover:text-emerald-400">{p.title}</Link>
                          </h3>
                          <p className="text-xs text-slate-300 mt-2 line-clamp-2">{p.description}</p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                          <div className="text-base font-black text-emerald-400">{money(p.price)}</div>
                          <Link href={p.url} className="px-3 py-1.5 bg-emerald-600 text-white font-bold text-xs rounded-lg">
                            View Specs
                          </Link>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-extrabold text-white mb-6 flex items-center gap-2 border-b border-slate-800 pb-3">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <span>Matching E-Bike Guides ({results.posts.length})</span>
              </h2>

              {results.posts.length === 0 ? (
                <p className="text-xs text-slate-400">No matching articles found.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {results.posts.map((post) => (
                    <div key={post.slug} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                      <div className="text-[10px] font-bold text-emerald-400 uppercase">{post.category}</div>
                      <h3 className="text-base font-extrabold text-white mt-1">
                        <Link href={post.url} className="hover:text-emerald-400">{post.title}</Link>
                      </h3>
                      <p className="text-xs text-slate-300 mt-2 line-clamp-2">{post.description}</p>
                      <div className="mt-4">
                        <Link href={post.url} className="text-xs font-bold text-emerald-400">Read Article &rarr;</Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-20">
      <Suspense fallback={<div className="text-center text-slate-400 py-12 text-xs">Loading search...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
