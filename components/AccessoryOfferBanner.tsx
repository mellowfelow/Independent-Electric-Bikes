import Link from 'next/link';
import { Tag } from 'lucide-react';
import { SHOP } from '@/config/site';
import { money } from '@/lib/order';
import type { AccessoryDiscount } from '@/lib/cartDiscount';

/** Explains the e-vehicle accessory discount in the cart, based on what is in it right now. */
export function AccessoryOfferBanner({ discount, onNavigate }: { discount: AccessoryDiscount; onNavigate?: () => void }) {
  const { hasVehicle, accessoryUnits, amount } = discount;
  const pct = SHOP.accessoryDiscount;

  if (hasVehicle && accessoryUnits > 0) {
    return (
      <div className="flex items-start gap-2.5 rounded-xl border border-emerald-700/60 bg-emerald-950/40 p-3.5 text-xs text-emerald-200">
        <Tag className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" aria-hidden="true" />
        <span>
          <strong className="text-emerald-300">{pct}% off parts &amp; accessories applied</strong> ({money(amount)} saved) because your cart includes an e-vehicle.
          Remove the e-vehicle and this discount is removed too.
        </span>
      </div>
    );
  }

  if (hasVehicle) {
    return (
      <div className="rounded-xl border border-emerald-700/60 bg-emerald-950/40 p-3.5 text-xs text-emerald-200">
        <div className="flex items-start gap-2.5">
          <Tag className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" aria-hidden="true" />
          <span>
            <strong className="text-emerald-300">Save {pct}% on parts &amp; accessories</strong> added to this order, because it includes an e-vehicle.
          </span>
        </div>
        <div className="mt-2.5 flex flex-wrap gap-2 pl-6">
          <Link href="/shop/safety-security-carry/" onClick={onNavigate} className="rounded-full border border-emerald-600/60 px-3 py-1 font-bold text-emerald-300 hover:bg-emerald-900/40">
            Helmets, locks &amp; bags
          </Link>
          <Link href="/shop/batteries-parts-kits/" onClick={onNavigate} className="rounded-full border border-emerald-600/60 px-3 py-1 font-bold text-emerald-300 hover:bg-emerald-900/40">
            Batteries, parts &amp; kits
          </Link>
        </div>
      </div>
    );
  }

  if (accessoryUnits > 0) {
    return (
      <div className="flex items-start gap-2.5 rounded-xl border border-slate-700 bg-slate-950/60 p-3.5 text-xs text-slate-300">
        <Tag className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" aria-hidden="true" />
        <span>
          Add an e-vehicle (e-bike, scooter, skateboard and more) to unlock <strong className="text-white">{pct}% off</strong> these parts &amp; accessories.{' '}
          <Link href="/shop/" onClick={onNavigate} className="font-bold text-emerald-400 underline">
            Shop e-vehicles
          </Link>
        </span>
      </div>
    );
  }

  return null;
}
