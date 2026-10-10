import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { SITE } from '@/config/site';
import { JsonLd } from '@/components/JsonLd';
import type { TrailItem } from '@/lib/catalog';

/** Visible breadcrumb trail plus matching BreadcrumbList JSON-LD. The last item is the current page (not a link). */
export function Breadcrumbs({ items }: { items: TrailItem[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `https://${SITE.domain}${it.href}` })),
  };
  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="mb-6 text-xs text-slate-400">
        <ol className="flex flex-wrap items-center gap-1.5">
          {items.map((it, i) => (
            <li key={it.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3 w-3 shrink-0 text-slate-600" aria-hidden="true" />}
              {i === items.length - 1 ? (
                <span aria-current="page" className="max-w-[60vw] truncate font-bold text-slate-200">{it.name}</span>
              ) : (
                <Link href={it.href} className="hover:text-emerald-400">{it.name}</Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
