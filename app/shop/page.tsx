import { Metadata } from 'next';
import { SITE } from '@/config/site';
import { SITE_SHORT } from '@/lib/catalog';
import { ShopClientView } from '@/components/ShopClientView';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: `Shop Electric Bikes, Scooters & Skateboards | ${SITE_SHORT}`,
  description: `Shop electric commuter and cargo e-bikes, eMTBs, e-scooters, skateboards and personal EVs. Direct prices and express Australian freight from Brunswick, VIC.`,
  alternates: { canonical: `https://${SITE.domain}/shop/` },
};

export default function ShopIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Shop Catalog', item: `https://${SITE.domain}/shop/` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="bg-slate-950 text-white min-h-screen pb-20">
        <div className="bg-slate-900 border-b border-slate-800 py-12 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Master EV Taxonomy</span>
            <h1 className="text-3xl sm:text-5xl font-black text-white">Full Store Catalog</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Browse our complete range of electric bikes, e-scooters, skateboards, and personal mobility EVs. Filter by motor, sensor, or compliance standards.
            </p>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ShopClientView />
        </div>
      </div>
    </>
  );
}
