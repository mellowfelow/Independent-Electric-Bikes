'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Plus, X } from 'lucide-react';
import { COMPARE_ROWS, type ComparableProduct } from '@/lib/compare';
import { SHOP } from '@/config/site';
import { money } from '@/lib/order';

const MAX_COLUMNS = 3;

export function CompareSelector({ products }: { products: ComparableProduct[] }) {
  const [slugs, setSlugs] = useState<string[]>(() => products.slice(0, 2).map((p) => p.slug));

  const chosen = slugs.map((s) => products.find((p) => p.slug === s)).filter((p): p is ComparableProduct => !!p);

  const setAt = (index: number, slug: string) => setSlugs((cur) => cur.map((s, i) => (i === index ? slug : s)));
  const remove = (index: number) => setSlugs((cur) => cur.filter((_, i) => i !== index));
  const add = () => {
    const next = products.find((p) => !slugs.includes(p.slug));
    if (next) setSlugs((cur) => [...cur, next.slug]);
  };

  // A spec row is highlighted when the compared models differ, so the differences stand out.
  const differs = (key: (typeof COMPARE_ROWS)[number]['key']) => new Set(chosen.map((p) => p.specs[key] || '-')).size > 1;

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
        <div className={`grid gap-4 ${chosen.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {slugs.map((slug, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor={`compare-${i}`} className="text-xs font-bold text-slate-300">
                  Model {String.fromCharCode(65 + i)}
                </label>
                {slugs.length > 2 && (
                  <button type="button" onClick={() => remove(i)} aria-label={`Remove model ${String.fromCharCode(65 + i)}`} className="rounded p-1 text-slate-400 hover:text-white">
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <select
                id={`compare-${i}`}
                value={slug}
                onChange={(e) => setAt(i, e.target.value)}
                className="min-h-[44px] w-full rounded-xl border border-slate-700 bg-slate-950 px-3 text-sm font-semibold text-white focus:border-emerald-500 focus:outline-none"
              >
                {products.map((p) => (
                  <option key={p.slug} value={p.slug} disabled={slugs.includes(p.slug) && p.slug !== slug}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        {slugs.length < MAX_COLUMNS && slugs.length < products.length && (
          <button type="button" onClick={add} className="mt-4 inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-slate-700 px-3 text-xs font-bold text-slate-200 hover:border-emerald-500">
            <Plus className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            Add a third model
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
        <table className="w-full min-w-[560px] text-left text-sm">
          <caption className="sr-only">Side-by-side specification comparison</caption>
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950">
              <th scope="col" className="sticky left-0 z-10 w-36 bg-slate-950 p-4 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                Specification
              </th>
              {chosen.map((p) => (
                <th key={p.slug} scope="col" className="min-w-[200px] p-4 align-top">
                  <Link href={`/shop/${p.category}/${p.slug}/`} className="font-extrabold text-white hover:text-emerald-400">
                    {p.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 text-slate-200">
            <tr>
              <th scope="row" className="sticky left-0 z-10 bg-slate-900 p-4 text-xs font-bold text-slate-400">
                Our price (AUD)
              </th>
              {chosen.map((p) => (
                <td key={p.slug} className="p-4">
                  <div className="text-lg font-black text-white">{money(p.price)}</div>
                  <div className="text-xs text-emerald-400">{money(Math.round(p.price * (1 - SHOP.cryptoDiscount / 100)))} paying with crypto</div>
                </td>
              ))}
            </tr>
            {COMPARE_ROWS.map((row) => (
              <tr key={row.key} className={differs(row.key) ? 'bg-emerald-500/[0.04]' : undefined}>
                <th scope="row" className={`sticky left-0 z-10 p-4 text-xs font-bold text-slate-400 ${differs(row.key) ? 'bg-slate-900' : 'bg-slate-900'}`}>
                  {row.label}
                </th>
                {chosen.map((p) => (
                  <td key={p.slug} className="p-4 leading-snug">
                    {p.specs[row.key] || <span className="text-slate-600">Not published</span>}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <th scope="row" className="sticky left-0 z-10 bg-slate-900 p-4 text-xs font-bold text-slate-400">
                Source
              </th>
              {chosen.map((p) => (
                <td key={p.slug} className="p-4 text-xs text-slate-400">
                  {p.sources.map((s) => (
                    <a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer" className="block text-emerald-400 underline hover:text-emerald-300">
                      {s.label}
                    </a>
                  ))}
                  <span className="mt-1 block">Verified {p.checked}</span>
                </td>
              ))}
            </tr>
            <tr>
              <th scope="row" className="sticky left-0 z-10 bg-slate-900 p-4" />
              {chosen.map((p) => (
                <td key={p.slug} className="p-4">
                  <Link href={`/shop/${p.category}/${p.slug}/`} className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-emerald-700 px-4 text-xs font-bold text-white hover:bg-emerald-600">
                    View product <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {chosen.some((p) => p.note) && (
        <ul className="space-y-2 text-xs leading-relaxed text-slate-400">
          {chosen
            .filter((p) => p.note)
            .map((p) => (
              <li key={p.slug}>
                <strong className="text-slate-200">{p.name}:</strong> {p.note}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
