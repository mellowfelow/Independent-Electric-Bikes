'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ComparableProduct } from '@/lib/compare';
import { money } from '@/lib/order';
import { Zap, CheckCircle2, AlertTriangle, XCircle, ArrowRight, ArrowLeftRight } from 'lucide-react';

export function CompareSelector({ products }: { products: ComparableProduct[] }) {
  const [productASlug, setProductASlug] = useState<string>(products[0]?.slug || '');
  const [productBSlug, setProductBSlug] = useState<string>(products[1]?.slug || '');

  const productA = products.find((p) => p.slug === productASlug) || products[0];
  const productB = products.find((p) => p.slug === productBSlug) || products[1];

  // Helper to extract voltage number from battery string
  const getVoltage = (batteryStr: string) => {
    const match = batteryStr.match(/(\d+)\s*V/i);
    return match ? match[1] + 'V' : '36V/48V';
  };

  const voltA = getVoltage(productA?.specs?.battery || '');
  const voltB = getVoltage(productB?.specs?.battery || '');

  // Battery Compatibility Logic
  const getBatteryCompatibility = () => {
    if (!productA || !productB) return null;

    if (voltA === voltB) {
      if (productA.category === productB.category) {
        return {
          status: 'Direct Battery Swappable',
          color: 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400',
          icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
          notes: `Both models operate on a matching ${voltA} electrical system. Batteries and chargers can be shared with matching mounting cradles.`,
        };
      }
      return {
        status: 'Voltage Compatible (Adapter Mount Needed)',
        color: 'bg-amber-500/10 border-amber-500/40 text-amber-400',
        icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
        notes: `Both models use a ${voltA} power system, but frame physical mounting points differ. An external cable adapter is required.`,
      };
    }

    return {
      status: 'Incompatible System Voltages',
      color: 'bg-rose-500/10 border-rose-500/40 text-rose-400',
      icon: <XCircle className="w-5 h-5 text-rose-400" />,
      notes: `Voltage mismatch (${voltA} vs ${voltB}). Attempting to cross-connect batteries will damage motor controllers and BMS boards.`,
    };
  };

  const compatibility = getBatteryCompatibility();

  return (
    <div className="space-y-10">
      {/* Interactive Custom Selector Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-emerald-400">
          <ArrowLeftRight className="w-4 h-4" />
          <span>Custom Product & Battery Comparison Bar</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Select Product A */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">Select First Model (Item A)</label>
            <select
              value={productASlug}
              onChange={(e) => setProductASlug(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {products.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name} — {money(p.price)}
                </option>
              ))}
            </select>
          </div>

          {/* Select Product B */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">Select Second Model (Item B)</label>
            <select
              value={productBSlug}
              onChange={(e) => setProductBSlug(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-bold text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {products.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name} — {money(p.price)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Battery Compatibility Banner */}
        {compatibility && (
          <div className={`p-4 rounded-xl border ${compatibility.color} flex items-start gap-3.5`}>
            <div className="flex-shrink-0 mt-0.5">{compatibility.icon}</div>
            <div className="space-y-1">
              <div className="font-extrabold text-xs uppercase tracking-wider">{compatibility.status}</div>
              <p className="text-xs font-normal opacity-90 leading-relaxed">{compatibility.notes}</p>
            </div>
          </div>
        )}
      </div>

      {/* Side-By-Side Comparison Grid */}
      {productA && productB && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card A */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
            <div className="p-6 space-y-4">
              <div className="relative bg-white aspect-[4/3] rounded-xl p-4 flex items-center justify-center overflow-hidden">
                <span className="absolute top-3 left-3 bg-emerald-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded">
                  Item A
                </span>
                <img src={productA.images[0]} alt={productA.name} className="object-contain max-h-full" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{productA.category}</span>
                <h3 className="text-lg font-black text-white">{productA.name}</h3>
              </div>

              {/* Prices */}
              <div className="space-y-1 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Regular Price:</span>
                  <span className="font-black text-white">{money(productA.price)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> 10% Crypto Discount:
                  </span>
                  <span className="font-black text-sm">{money(Math.round(productA.price * 0.9))}</span>
                </div>
              </div>

              {/* Specs Table */}
              <div className="space-y-2 text-xs divide-y divide-slate-800/60 pt-2">
                <div className="flex justify-between py-1.5"><span className="text-slate-400">System Voltage:</span> <strong className="text-emerald-400 font-bold">{voltA}</strong></div>
                <div className="flex justify-between py-1.5"><span className="text-slate-400">Motor Drive:</span> <span className="font-semibold">{productA.specs.motor}</span></div>
                <div className="flex justify-between py-1.5"><span className="text-slate-400">Battery Pack:</span> <span className="font-semibold">{productA.specs.battery}</span></div>
                <div className="flex justify-between py-1.5"><span className="text-slate-400">Max Range:</span> <span className="font-bold text-emerald-400">{productA.specs.range}</span></div>
                <div className="flex justify-between py-1.5"><span className="text-slate-400">Braking:</span> <span>{productA.specs.brakes}</span></div>
                <div className="flex justify-between py-1.5"><span className="text-slate-400">Weight:</span> <span>{productA.specs.weight}</span></div>
                <div className="flex justify-between py-1.5"><span className="text-slate-400">Payload:</span> <span>{productA.specs.payload}</span></div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/shop/${productA.category}/${productA.slug}/`}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition-all text-center flex items-center justify-center gap-2"
              >
                <span>View Full {productA.name} Specs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Card B */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between">
            <div className="p-6 space-y-4">
              <div className="relative bg-white aspect-[4/3] rounded-xl p-4 flex items-center justify-center overflow-hidden">
                <span className="absolute top-3 left-3 bg-blue-600 text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded">
                  Item B
                </span>
                <img src={productB.images[0]} alt={productB.name} className="object-contain max-h-full" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{productB.category}</span>
                <h3 className="text-lg font-black text-white">{productB.name}</h3>
              </div>

              {/* Prices */}
              <div className="space-y-1 bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Regular Price:</span>
                  <span className="font-black text-white">{money(productB.price)}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-emerald-400 font-bold">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> 10% Crypto Discount:
                  </span>
                  <span className="font-black text-sm">{money(Math.round(productB.price * 0.9))}</span>
                </div>
              </div>

              {/* Specs Table */}
              <div className="space-y-2 text-xs divide-y divide-slate-800/60 pt-2">
                <div className="flex justify-between py-1.5"><span className="text-slate-400">System Voltage:</span> <strong className="text-emerald-400 font-bold">{voltB}</strong></div>
                <div className="flex justify-between py-1.5"><span className="text-slate-400">Motor Drive:</span> <span className="font-semibold">{productB.specs.motor}</span></div>
                <div className="flex justify-between py-1.5"><span className="text-slate-400">Battery Pack:</span> <span className="font-semibold">{productB.specs.battery}</span></div>
                <div className="flex justify-between py-1.5"><span className="text-slate-400">Max Range:</span> <span className="font-bold text-emerald-400">{productB.specs.range}</span></div>
                <div className="flex justify-between py-1.5"><span className="text-slate-400">Braking:</span> <span>{productB.specs.brakes}</span></div>
                <div className="flex justify-between py-1.5"><span className="text-slate-400">Weight:</span> <span>{productB.specs.weight}</span></div>
                <div className="flex justify-between py-1.5"><span className="text-slate-400">Payload:</span> <span>{productB.specs.payload}</span></div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <Link
                href={`/shop/${productB.category}/${productB.slug}/`}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition-all text-center flex items-center justify-center gap-2"
              >
                <span>View Full {productB.name} Specs</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
