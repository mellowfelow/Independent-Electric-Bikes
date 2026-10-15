import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import { guidesFor } from '@/lib/guides';

/** Buying guides and advice articles that match a category, sub-category, product or brand. Renders nothing without matches. */
export function RelatedGuides({ category, sub, seed, heading = 'Buying guides & advice' }: { category: string; sub?: string; seed: string; heading?: string }) {
  const guides = guidesFor(category, sub, seed);
  if (guides.length === 0) return null;
  return (
    <section aria-label="Related guides" className="mx-auto max-w-[1600px] px-4 pb-10 sm:px-6 lg:px-8">
      <h2 className="mb-3 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-400">
        <BookOpen className="h-4 w-4" aria-hidden="true" />
        {heading}
      </h2>
      <ul className="grid gap-2 md:grid-cols-3">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link href={`/blog/${g.slug}/`} className="block h-full rounded-xl border border-slate-800 bg-slate-900 p-4 text-sm font-bold text-white hover:border-emerald-500 hover:text-emerald-400">
              {g.title}
              <span className="mt-1 block text-[11px] font-semibold text-emerald-400">Read the guide &rarr;</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
