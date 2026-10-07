import { Metadata } from 'next';
import Link from 'next/link';
import { Mail, Bike } from 'lucide-react';
import { SITE } from '@/config/site';

export const metadata: Metadata = {
  title: `Order Received | ${SITE.name}`,
  robots: { index: false, follow: true },
};

export default function ThankYouOrderPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-20 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
          <Mail className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-white">Order Received!</h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Please <strong>watch your inbox for your official payment-details email</strong>. Our Brunswick team is reviewing your item selection and will dispatch payment instructions shortly.
        </p>
        <div className="pt-4">
          <Link href="/" className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl inline-block">
            Return to Store
          </Link>
        </div>
      </div>
    </div>
  );
}
