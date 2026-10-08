import { fitTitle, fitDesc } from '@/lib/catalog';
import { Metadata } from 'next';
import Link from 'next/link';
import { PRODUCTS, SITE } from '@/config/site';
import { JsonLd } from '@/components/JsonLd';
import { CompareSelector } from '@/components/CompareSelector';
import { toComparable, type ComparableProduct } from '@/lib/compare';

export const metadata: Metadata = {
  title: fitTitle('Compare Electric Bike Specs & Prices'),
  description: fitDesc('Side-by-side comparison of manufacturer-verified e-bike specifications: motor, battery, claimed range, weight, load limit and price, with sources.'),
  alternates: { canonical: `https://${SITE.domain}/compare/` },
};

export default function ComparePage() {
  const comparable = PRODUCTS.map(toComparable).filter((p): p is ComparableProduct => p !== null);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Compare', item: `https://${SITE.domain}/compare/` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="min-h-screen bg-slate-950 pb-20 text-white">
        <div className="border-b border-slate-800 bg-slate-900 px-4 py-12 text-center">
          <div className="mx-auto max-w-3xl space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Compare</span>
            <h1 className="text-3xl font-black text-white sm:text-5xl">Compare e-bike specifications</h1>
            <p className="mx-auto max-w-xl text-xs text-slate-300 sm:text-sm">
              Every figure on this page is taken from the manufacturer&rsquo;s own product page, with the source linked under each model. We add models as we verify them.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6 lg:px-8">
          {comparable.length >= 2 ? (
            <CompareSelector products={comparable} />
          ) : (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-sm text-slate-300">
              We are verifying model specifications with the manufacturers. Check back soon, or{' '}
              <Link href="/contact/" className="font-bold text-emerald-400 underline">
                ask us for a spec sheet
              </Link>
              .
            </div>
          )}

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 text-xs leading-relaxed text-slate-400">
            <p className="mb-1 font-bold text-slate-200">About these specifications</p>
            <p>
              {comparable.length} of {PRODUCTS.length} models in our catalogue are verified so far. Manufacturers change specifications by model year and market, and range figures are manufacturer claims that depend on rider weight, load, terrain and assist level. Confirm the
              exact specification and Australian road-legal status with us before you order.{' '}
              <Link href="/shop/" className="text-emerald-400 underline">
                Browse the full range
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
