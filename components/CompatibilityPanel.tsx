import Link from 'next/link';
import { Check, Info, Plug } from 'lucide-react';
import type { Product } from '@/config/site';
import { fitsOfPart, partsForVehicle } from '@/lib/compat';
import { PART_FITS } from '@/config/data/compatibility';
import { money } from '@/lib/order';

const href = (p: Product) => `/shop/${p.category}/${p.slug}/`;

const CAUTION = "Always check your bike's battery or charger label (voltage, capacity, connector and mount) before ordering. If you are unsure, send us your model and we will confirm the fit.";

/** Fit list on a part page, or compatible parts on a vehicle page. Renders nothing when there is nothing to show. */
export function CompatibilityPanel({ product, isPart }: { product: Product; isPart: boolean }) {
  if (isPart) {
    if (!PART_FITS[product.name]) return null;
    const fit = fitsOfPart(product);
    if (!fit) return null;
    return (
      <section className="mt-16 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8" aria-labelledby="compat-h">
        <h2 id="compat-h" className="mb-4 flex items-center gap-2 border-b border-slate-800 pb-4 text-xl font-extrabold text-white">
          <Plug className="h-5 w-5 text-emerald-400" aria-hidden="true" />
          <span>Compatibility</span>
        </h2>
        <p className="mb-5 text-sm leading-relaxed text-slate-300">{fit.rule}</p>
        {fit.confirmed.length > 0 && (
          <div className="mb-5">
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
              <Check className="h-3.5 w-3.5" aria-hidden="true" /> Listed as compatible
            </h3>
            <ul className="flex flex-wrap gap-2">
              {fit.confirmed.map((v) => (
                <li key={v.slug}>
                  <Link href={href(v)} className="inline-block rounded-lg border border-emerald-500/40 bg-slate-950 px-3 py-1.5 text-xs font-bold text-white hover:border-emerald-400">
                    {v.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {fit.system.length > 0 && (
          <div className="mb-5">
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
              <Info className="h-3.5 w-3.5" aria-hidden="true" /> Same drive system, confirm before ordering
            </h3>
            <ul className="flex flex-wrap gap-2">
              {fit.system.map((v) => (
                <li key={v.slug}>
                  <Link href={href(v)} className="inline-block rounded-lg border border-slate-700 bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-slate-500">
                    {v.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {fit.confirmed.length + fit.system.length === 0 && <p className="mb-4 text-sm text-slate-300">This part fits by size and type rather than by model. Match the specification above to your current part.</p>}
        <p className="text-[11px] leading-relaxed text-slate-400">{CAUTION}</p>
      </section>
    );
  }

  const parts = partsForVehicle(product);
  if (parts.length === 0) return null;
  return (
    <section className="mt-16 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8" aria-labelledby="parts-h">
      <h2 id="parts-h" className="mb-4 flex items-center gap-2 border-b border-slate-800 pb-4 text-xl font-extrabold text-white">
        <Plug className="h-5 w-5 text-emerald-400" aria-hidden="true" />
        <span>Batteries, chargers &amp; parts for the {product.name}</span>
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {parts.map(({ part, level, rule }) => (
          <li key={part.slug}>
            <Link href={href(part)} className="block h-full rounded-xl border border-slate-800 bg-slate-950 p-4 hover:border-emerald-500/60">
              <span className="flex items-start justify-between gap-3">
                <span className="text-sm font-bold text-white">{part.name}</span>
                <span className="shrink-0 text-sm font-extrabold text-emerald-400">{money(part.price)}</span>
              </span>
              <span className={`mt-1 inline-block text-[10px] font-bold uppercase tracking-wider ${level === 'confirmed' ? 'text-emerald-400' : 'text-slate-400'}`}>
                {level === 'confirmed' ? 'Listed as compatible' : 'Same drive system, confirm before ordering'}
              </span>
              <span className="mt-1 block text-[11px] leading-relaxed text-slate-400">{rule}</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-[11px] leading-relaxed text-slate-400">{CAUTION}</p>
    </section>
  );
}
