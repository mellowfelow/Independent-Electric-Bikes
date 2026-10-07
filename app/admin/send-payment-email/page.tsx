'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAdminPasscode } from '@/components/admin/AdminPasscodeContext';
import { WhatsAppSendPanel } from '@/components/admin/WhatsAppSendPanel';
import { parsePaymentDetail, money, paymentMethodParts } from '@/lib/order';
import { Mail, CheckCircle2 } from 'lucide-react';

function SendPaymentEmailContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';

  const { passcode } = useAdminPasscode();
  const [orderId, setOrderId] = useState(initialOrderId);
  const [order, setOrder] = useState<any>(null);
  const [methodId, setMethodId] = useState('bank-transfer');
  const [pastedDetails, setPastedDetails] = useState(
    `BSB: 063-000\nAccount Number: 12345678\nAccount Name: VYRON Industries Pty Ltd\nBank: Commonwealth Bank Australia`
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchOrder = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${id}/?passcode=${encodeURIComponent(passcode || '')}`, {
        headers: { 'X-Admin-Passcode': passcode || '' },
      });
      if (res.ok) {
        const data = await res.json();
        setOrder(data.order);
        if (data.order?.paymentMethod) {
          setMethodId(data.order.paymentMethod);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }, [passcode]);

  useEffect(() => {
    if (orderId && passcode) {
      const timer = setTimeout(() => {
        fetchOrder(orderId);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [orderId, passcode, fetchOrder]);

  const parsedFields = parsePaymentDetail(pastedDetails);
  const totalAmt = order?.totalAmount || 1899;
  const refCode = order?.id || orderId || 'IEB-SAMPLE';
  const methodParts = paymentMethodParts(methodId, totalAmt, refCode);

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(`/api/admin/send-payment-email/?passcode=${encodeURIComponent(passcode || '')}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Passcode': passcode || '',
        },
        body: JSON.stringify({
          orderId: refCode,
          methodId,
          pastedDetails,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg(data.message);
      } else {
        setErrorMsg(data.message || 'Error sending payment details.');
      }
    } catch {
      setErrorMsg('Server connection error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
        {errorMsg && (
          <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded-xl">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSendEmail} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Order Reference ID
            </label>
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. IEB-9A82X1"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Payment Method Rail
            </label>
            <select
              value={methodId}
              onChange={(e) => setMethodId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
            >
              <option value="bank-transfer">Direct Bank Transfer (EFT)</option>
              <option value="payid">PayID / Osko Fast Payment</option>
              <option value="crypto">Cryptocurrency (BTC / USDT)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Paste Real Payment Account Info (Raw Text Blob)
            </label>
            <textarea
              rows={5}
              value={pastedDetails}
              onChange={(e) => setPastedDetails(e.target.value)}
              placeholder="Paste account details here (e.g. BSB: 063-000, Account: 12345678...)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Mail className="w-4 h-4" />
            <span>{isSubmitting ? 'Sending Email...' : `Send Branded Email to ${order?.email || 'Customer'}`}</span>
          </button>
        </form>
      </div>

      <div className="lg:col-span-5 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
            Live Email Payment Details Preview (`parsePaymentDetail`)
          </h2>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="text-xs text-slate-400">
              Amount Due: <strong className="text-emerald-400 text-sm">{money(totalAmt)}</strong>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] font-bold text-slate-500 uppercase">Parsed Copy Fields ({parsedFields.length}):</div>
              {parsedFields.map((f, idx) => (
                <div key={idx} className="bg-slate-900 p-2.5 rounded border border-slate-800 text-xs">
                  <div className="text-[10px] text-slate-400 font-bold uppercase">{f.label}</div>
                  <code className="text-emerald-400 font-mono font-bold">{f.value}</code>
                </div>
              ))}
            </div>
          </div>
        </div>

        <WhatsAppSendPanel
          customerPhone={order?.phone || '+61480811308'}
          customerName={order?.customerName || 'Customer'}
          orderRef={refCode}
          amountFormatted={money(totalAmt)}
          methodLabel={methodParts.label}
          openingText={methodParts.opening}
          pastedDetails={pastedDetails}
          closingText={methodParts.closing}
        />
      </div>
    </div>
  );
}

export default function SendPaymentEmailPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white">Payment Details Composer & Dispatch</h1>
        <p className="text-xs text-slate-400 mt-1">Paste real account/wallet details below. `parsePaymentDetail` auto-splits it into individually copyable fields for the customer.</p>
      </div>

      <Suspense fallback={<div className="text-center text-slate-400 py-12 text-xs">Loading composer...</div>}>
        <SendPaymentEmailContent />
      </Suspense>
    </div>
  );
}
