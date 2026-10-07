import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, CheckCircle2 } from 'lucide-react';
import { SITE, CONTACT } from '@/config/site';

export const metadata: Metadata = {
  title: `Order Received | ${SITE.name}`,
  robots: { index: false, follow: true },
};

export default async function ThankYouOrderPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string }>;
}) {
  const params = await searchParams;
  const orderRef = params?.ref;

  return (
    <div className="py-20 flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-5 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Order Placed Successfully!</h1>

        {orderRef && (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 inline-block">
            <span className="text-xs text-slate-400 font-bold uppercase block">Order Reference</span>
            <span className="text-emerald-400 font-mono font-extrabold text-lg">#{orderRef}</span>
          </div>
        )}

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
          Thank you for ordering with <strong>{SITE.name}</strong>! Please <strong>watch your email inbox for your official payment-details email</strong>.
        </p>

        <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-200 text-left space-y-1.5">
          <div className="font-bold flex items-center gap-1.5 text-emerald-300">
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span>Next Steps for Your Order:</span>
          </div>
          <p className="text-[11px] text-emerald-200/90 leading-relaxed">
            Our Melbourne showroom team is reviewing your selection. We will email you payment details (BSB/Account, PayID, or Crypto deposit address) shortly.
          </p>
        </div>

        <div className="text-xs text-slate-400 pt-2">
          Questions? Contact our Brunswick team at <a href={`tel:${CONTACT.phone}`} className="text-white underline">{CONTACT.phone}</a>.
        </div>

        <div className="pt-2">
          <Link href="/shop/" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl inline-block transition-all shadow-lg">
            Return to Store Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
