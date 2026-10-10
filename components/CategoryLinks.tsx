import Link from 'next/link';
import { MASTER_TAXONOMY } from '@/config/site';
import { topBrandsFor } from '@/lib/catalog';

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
      <div>
        <h2 className="mb-2 text-xs font-extrabold uppercase tracking-wider text-emerald-400">{isPartCat ? 'Shop vehicles' : 'Batteries, parts and accessories'}</h2>
        <ul className="flex flex-wrap gap-2">
          {cross.map((m) => (
            <li key={m.slug}><Link href={`/shop/${m.slug}/`} className={chip}>{m.name}</Link></li>
          ))}
        </ul>
      </div>
    </section>
  );
}
