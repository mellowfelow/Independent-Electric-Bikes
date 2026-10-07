'use client';

import { useState, FormEvent, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Upload, CheckCircle2, Bike } from 'lucide-react';

function ConfirmPaymentContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id') || '';

  const [inputRef, setInputRef] = useState(orderId);
  const [proofUrl, setProofUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [complete, setComplete] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!inputRef.trim()) {
      setErrorMsg('Order Reference ID required.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/order/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: inputRef.trim(),
          proofUrl,
          notes,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setComplete(true);
      } else {
        setErrorMsg(data.message || 'Error processing confirmation.');
      }
    } catch {
      setErrorMsg('Server connection error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 font-bold text-xs rounded-full">
          <Bike className="w-4 h-4" />
          <span>Fast Express Dispatch Processing</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Confirm Payment Receipt
        </h1>
        <p className="text-xs text-slate-400">
          Submit your transfer screenshot or bank reference for fast same-day dispatch.
        </p>
      </div>

      {complete ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-white">Payment Proof Submitted!</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Thank you! Our Brunswick accounts team has received your proof for Order <strong>#{inputRef}</strong>. We will confirm receipt and provide courier tracking updates via email.
          </p>
          <div className="pt-4">
            <Link href="/" className="px-6 py-3 bg-emerald-600 text-white font-bold text-xs rounded-xl inline-block">
              Return to Store
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {errorMsg && (
            <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded-xl">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Order Reference ID *
              </label>
              <input
                type="text"
                required
                value={inputRef}
                onChange={(e) => setInputRef(e.target.value)}
                placeholder="e.g. IEB-9A82X1"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Receipt Image Link / Imgur / Drive URL (Optional)
              </label>
              <input
                type="url"
                value={proofUrl}
                onChange={(e) => setProofUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                Bank Reference / Transfer Notes / Tx Hash
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Transferred $1,899 AUD via PayID from CommBank account ending in 4812..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Payment Proof to Brunswick Accounts'}</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default function ConfirmPaymentPage() {
  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-12 px-4">
      <Suspense fallback={<div className="text-center text-slate-400 py-12 text-xs">Loading payment form...</div>}>
        <ConfirmPaymentContent />
      </Suspense>
    </div>
  );
}
