'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CopyField } from '@/components/CopyField';
import { Bike, ShieldCheck, Upload, AlertCircle } from 'lucide-react';

function PaymentDetailsContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');

  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDetails = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/order/payment-details?id=${encodeURIComponent(id)}`);
      if (res.ok) {
        const data = await res.json();
        setDetails(data);
      } else {
        setError('Order payment details not found or expired.');
      }
    } catch {
      setError('Error loading payment details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!orderId) {
        setError('No Order Reference ID provided in link.');
        setLoading(false);
        return;
      }
      fetchDetails(orderId);
    }, 0);
    return () => clearTimeout(timer);
  }, [orderId]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 font-bold text-xs rounded-full">
          <Bike className="w-4 h-4" />
          <span>Official Invoice & Payment Gateway</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Payment Details · Order #{orderId || '—'}
        </h1>
        <p className="text-xs text-slate-400">
          Tap any field below to copy details directly into your banking app.
        </p>
      </div>

      {loading ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-xs">
          Loading secure payment details...
        </div>
      ) : error ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
          <div className="text-sm font-bold text-white">{error}</div>
          <p className="text-xs text-slate-400">
            Payment details are generated when our sales team sends your invoice email. Please check your inbox or message us on WhatsApp for assistance.
          </p>
          <Link href="/" className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl inline-block">
            Return to Store
          </Link>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-5 text-center space-y-1">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Amount Due</div>
            <div className="text-3xl font-black text-emerald-400">{details.formattedAmount}</div>
            <div className="text-xs font-semibold text-slate-300 pt-1">
              Method: <span className="text-white font-bold">{details.methodLabel}</span>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {details.openingText}
          </p>

          <div className="space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
              Payment Account Details
            </div>

            <CopyField label="Payment Reference (Required)" value={details.orderId} />

            {details.parsedPaymentDetails.map((f: any, idx: number) => (
              <CopyField key={idx} label={f.label} value={f.value} />
            ))}
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {details.closingText}
          </p>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>256-Bit SSL Encrypted Verification</span>
            </div>

            <Link
              href={`/order/confirm-payment/?id=${encodeURIComponent(details.orderId)}`}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-950/50"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Payment Receipt / Screenshot &rarr;</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrderPaymentDetailsPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4">
      <Suspense fallback={<div className="text-center text-slate-400 py-12 text-xs">Loading payment details...</div>}>
        <PaymentDetailsContent />
      </Suspense>
    </div>
  );
}
