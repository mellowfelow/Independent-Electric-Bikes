import Link from 'next/link';
import { MASTER_TAXONOMY } from '@/config/site';
import { topBrandsFor } from '@/lib/catalog';
import { partsForCategory } from '@/lib/compat';
import { money } from '@/lib/order';

const PART_CATS = ['batteries-parts-kits', 'safety-security-carry'];

/** In-content links on category pages: types to browse, top brands, and the matching parts or vehicles. */
export function CategoryLinks({ categorySlug, subSlug }: { categorySlug: string; subSlug?: string }) {
  const main = MASTER_TAXONOMY.find((m) => m.slug === categorySlug);
  if (!main) return null;
  const sub = main.subcategories.find((s) => s.slug === subSlug);
  const types = sub ? (sub.items ?? []) : [];
  const siblings = sub ? main.subcategories.filter((s) => s.slug !== sub.slug) : main.subcategories;
  const brands = topBrandsFor(categorySlug, subSlug);
  const isPartCat = PART_CATS.includes(categorySlug);
  const parts = isPartCat ? [] : partsForCategory(categorySlug, subSlug);
  const cross = MASTER_TAXONOMY.filter((m) => (isPartCat ? !PART_CATS.includes(m.slug) : PART_CATS.includes(m.slug)));

  const chip = 'inline-block rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-bold text-slate-200 hover:border-emerald-500 hover:text-emerald-400';
  return (
    <section aria-label="Browse more" className="mx-auto max-w-[1600px] space-y-5 px-4 pt-8 sm:px-6 lg:px-8">
      {(types.length > 0 || siblings.length > 0) && (
        <div>
          <h2 className="mb-2 text-xs font-extrabold uppercase tracking-wider text-emerald-400">{sub ? `More ${main.name} types` : `Browse ${main.name} by type`}</h2>
          <ul className="flex flex-wrap gap-2">
            {types.map((t) => (
              <li key={t.slug}><Link href={`${t.path}/`} className={chip}>{t.name}</Link></li>
            ))}
            {siblings.map((s) => (
              <li key={s.slug}><Link href={`${s.path}/`} className={chip}>{s.name}</Link></li>
            ))}
          </ul>
        </div>
      )}
      {brands.length > 0 && (
        <div>
          <h2 className="mb-2 text-xs font-extrabold uppercase tracking-wider text-emerald-400">Popular brands here</h2>
          <ul className="flex flex-wrap gap-2">
            {brands.map((b) => (
              <li key={b.slug}><Link href={`/brands/${b.slug}/`} className={chip}>{b.name} ({b.count})</Link></li>
            ))}
          </ul>
        </div>
      )}
      {!isPartCat && (
        <div>
          <h2 className="mb-2 text-xs font-extrabold uppercase tracking-wider text-emerald-400">Batteries, chargers &amp; parts for these models</h2>
          {parts.length > 0 ? (
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {parts.map(({ part, fits }) => (
                <li key={part.slug}>
                  <Link href={`/shop/${part.category}/${part.slug}/`} className="block h-full rounded-xl border border-slate-700 bg-slate-900 p-3 hover:border-emerald-500">
                    <span className="block text-xs font-bold text-white">{part.name}</span>
                    <span className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Fits {fits} model{fits === 1 ? '' : 's'} here</span>
                      <span className="font-extrabold text-emerald-400">{money(part.price)}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400">
              We do not list a battery or charger for these models yet.{' '}
              <Link href="/contact/" className="font-bold text-emerald-400 underline">Ask us for your model</Link> and we will confirm what is available.
            </p>
          )}
          {parts.length > 0 && (
            <p className="mt-2 text-xs text-slate-400">
              Not seeing the battery or charger for your exact model? <Link href="/contact/" className="font-bold text-emerald-400 underline">Ask us</Link> and we will confirm what is available.
            </p>
          )}
        </div>
      )}
      <div>
        <h2 className="mb-2 text-xs font-extrabold uppercase tracking-wider text-emerald-400">{isPartCat ? 'Shop vehicles' : 'More batteries, parts and accessories'}</h2>
        <ul className="flex flex-wrap gap-2">
          {cross.map((m) => (
            <li key={m.slug}><Link href={`/shop/${m.slug}/`} className={chip}>{m.name}</Link></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
