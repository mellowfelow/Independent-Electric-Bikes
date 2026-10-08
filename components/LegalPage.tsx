import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { SITE } from '@/config/site';

export const LEGAL_UPDATED = '8 October 2026';

export const LEGAL_LINKS = [
  { href: '/shipping/', label: 'Shipping & Delivery' },
  { href: '/returns/', label: 'Returns, Refunds & Warranty' },
  { href: '/privacy/', label: 'Privacy Policy' },
  { href: '/terms/', label: 'Terms of Sale' },
];

interface LegalPageProps {
  title: string;
  intro: string;
  path: string;
  sections: { id: string; heading: string; body: React.ReactNode }[];
}

export function LegalPage({ title, intro, path, sections }: LegalPageProps) {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
      { '@type': 'ListItem', position: 2, name: title, item: `https://${SITE.domain}${path}` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumb} />
      <div className="bg-slate-950 pb-20 text-slate-200">
        <header className="border-b border-slate-800 bg-slate-900 px-4 py-12 text-center">
          <div className="mx-auto max-w-3xl space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">{SITE.entityName}</p>
            <h1 className="text-3xl font-black text-white sm:text-4xl">{title}</h1>
            <p className="text-sm text-slate-300">{intro}</p>
            <p className="text-[11px] text-slate-500">Last updated {LEGAL_UPDATED}</p>
          </div>
        </header>

        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <nav aria-label="On this page" className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-xs">
              <p className="mb-2 font-extrabold uppercase tracking-wider text-slate-400">On this page</p>
              <ul className="space-y-1.5">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="block rounded px-1 py-1 text-slate-300 hover:text-emerald-400">
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Policies" className="rounded-2xl border border-slate-800 bg-slate-900 p-4 text-xs">
              <p className="mb-2 font-extrabold uppercase tracking-wider text-slate-400">Policies</p>
              <ul className="space-y-1.5">
                {LEGAL_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} aria-current={l.href === path ? 'page' : undefined} className={`block rounded px-1 py-1 hover:text-emerald-400 ${l.href === path ? 'font-bold text-emerald-400' : 'text-slate-300'}`}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <article className="max-w-3xl space-y-10 text-sm leading-relaxed text-slate-300">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24 space-y-3">
                <h2 className="text-lg font-extrabold text-white">{s.heading}</h2>
                {s.body}
              </section>
            ))}
          </article>
        </div>
      </div>
    </>
  );
}

/** Small helpers so each policy reads as plain, consistently styled prose. */
export const P = ({ children }: { children: React.ReactNode }) => <p>{children}</p>;
export const UL = ({ children }: { children: React.ReactNode }) => <ul className="list-disc space-y-1.5 pl-5 marker:text-emerald-500">{children}</ul>;
