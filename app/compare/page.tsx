import { fitTitle, fitDesc } from '@/lib/catalog';
import { Metadata } from 'next';
import Link from 'next/link';
import { PRODUCTS, SITE } from '@/config/site';
import { money } from '@/lib/order';
import { ArrowRight, Zap } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { CompareSelector } from '@/components/CompareSelector';
import { toComparable } from '@/lib/compare';

export const metadata: Metadata = {
  title: fitTitle('Compare Electric Bike Specs & Prices'),
  description: fitDesc('Side-by-side comparison of electric commuter, cargo, folding and fat tyre e-bikes: motor, battery, range, weight and price.'),
  alternates: { canonical: `https://${SITE.domain}/compare/` },
};

export default function ComparePage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `https://${SITE.domain}/` },
      { '@type': 'ListItem', position: 2, name: 'Compare Matrix', item: `https://${SITE.domain}/compare/` },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <div className="bg-slate-950 text-white min-h-screen pb-20">
        <div className="bg-slate-900 border-b border-slate-800 py-12 px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Technical & Battery Compatibility Matrix</span>
            <h1 className="text-3xl sm:text-5xl font-black text-white">Interactive EV Spec & Battery Comparison</h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Select two models to compare motor torque, battery voltage compatibility, 10% crypto discount prices, and payload capacities side-by-side.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {/* Interactive Custom Bar Chooser & Battery Compatibility */}
          <CompareSelector products={PRODUCTS.map(toComparable)} />

          {/* Full 500-Item Technical Table */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-white">Full Catalog Technical Specification Matrix ({PRODUCTS.length} Models)</h2>
              <span className="text-xs text-slate-400">Scroll horizontally to view all specs</span>
            </div>

            <div className="overflow-x-auto bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-300 uppercase tracking-wider text-[11px] font-extrabold border-b border-slate-800">
                  <tr>
                    <th className="p-4 min-w-[200px]">Model Name</th>
                    <th className="p-4 min-w-[110px]">Price (AUD)</th>
                    <th className="p-4 min-w-[130px]">10% Crypto Price</th>
                    <th className="p-4 min-w-[140px]">Motor Drive</th>
                    <th className="p-4 min-w-[160px]">Battery Pack</th>
                    <th className="p-4 min-w-[100px]">Max Range</th>
                    <th className="p-4 min-w-[130px]">Braking</th>
                    <th className="p-4 min-w-[100px]">Weight</th>
                    <th className="p-4 min-w-[100px]">Payload</th>
                    <th className="p-4 min-w-[100px]">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  {PRODUCTS.slice(0, 100).map((p) => {
                    const cryptoPrice = Math.round(p.price * 0.9);
                    return (
                      <tr key={p.slug} className="hover:bg-slate-850 transition-colors">
                        <td className="p-4 font-extrabold text-white">
                          <Link href={`/shop/${p.category}/${p.slug}/`} className="hover:text-emerald-400">
                            {p.name}
                          </Link>
                          <div className="text-[10px] text-emerald-400 font-semibold uppercase">{p.category}</div>
                        </td>
                        <td className="p-4 font-black text-white">{money(p.price)}</td>
                        <td className="p-4 font-black text-emerald-400">
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-emerald-400" />
                            {money(cryptoPrice)}
                          </span>
                        </td>
                        <td className="p-4 font-medium">{p.specs.motor}</td>
                        <td className="p-4 font-medium">{p.specs.battery}</td>
                        <td className="p-4 font-bold text-emerald-400">{p.specs.range}</td>
                        <td className="p-4">{p.specs.brakes}</td>
                        <td className="p-4">{p.specs.weight}</td>
                        <td className="p-4">{p.specs.payload}</td>
                        <td className="p-4">
                          <Link
                            href={`/shop/${p.category}/${p.slug}/`}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg inline-flex items-center gap-1 text-[11px]"
                          >
                            <span>View</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
