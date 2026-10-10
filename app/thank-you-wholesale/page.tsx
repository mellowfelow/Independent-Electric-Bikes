import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { SITE } from '@/config/site';

export const metadata: Metadata = {
  title: `Wholesale Inquiry Received | ${SITE.name}`,
  robots: { index: false, follow: true },
};

export default function ThankYouWholesalePage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-black text-white">Wholesale Inquiry Received</h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Thank you for your commercial e-bike fleet inquiry. Our commercial sales manager will review your specs and contact you with wholesale pricing tiers.
        </p>
        <div className="pt-4">
          <Link href="/" className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl inline-block">
            Return to Store
          </Link>
        </div>
      </div>
    </div>
  );
}
