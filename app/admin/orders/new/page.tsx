'use client';

import { useMemo, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import { useAdminPasscode } from '@/components/admin/AdminPasscodeContext';
import { PRODUCTS, REPLY, SHOP } from '@/config/site';

interface Line {
  slug: string;
  quantity: number;
}

const field = 'w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none';

/** Adds an order by hand, e.g. to restore one from a notification email. Entering the original order number makes old email links work again. */
export default function AddOrderPage() {
  const { passcode } = useAdminPasscode();
  const [ref, setRef] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [method, setMethod] = useState('bank-transfer');
  const [channel, setChannel] = useState('email');
  const [status, setStatus] = useState('new');
  const [lines, setLines] = useState<Line[]>([{ slug: '', quantity: 1 }]);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');

  const options = useMemo(() => [...PRODUCTS].sort((a, b) => a.name.localeCompare(b.name)), []);
  const setLine = (i: number, patch: Partial<Line>) => setLines((l) => l.map((x, j) => (j === i ? { ...x, ...patch } : x)));

  const submit = async (ev: FormEvent) => {
    ev.preventDefault();
    setMsg('');
    setBusy(true);
    try {
      const res = await fetch('/api/admin/orders/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Admin-Passcode': passcode || '' },
        body: JSON.stringify({ id: ref, customerName: name, email, phone, address, paymentMethod: method, channel, status, items: lines.filter((l) => l.slug) }),
      });
      const data = await res.json();
      if (res.ok && data.order) {
        window.location.href = `/admin/orders/${data.order.id}/`;
        return;
      }
      setMsg(data.error || data.message || 'Could not save the order.');
    } catch {
      setMsg('Connection error. Try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link href="/admin/orders/" className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:underline"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to orders</Link>
      <div>
        <h1 className="text-2xl font-black text-white">Add order</h1>
        <p className="text-xs text-slate-400">Use this to restore an order from a notification email or to enter a phone order. Prices come from the catalogue.</p>
      </div>

      <form onSubmit={submit} className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-6">
        <label className="block text-xs font-bold text-slate-300">
          Order number (optional)
          <input className={`${field} mt-1 font-mono`} value={ref} onChange={(e) => setRef(e.target.value.toUpperCase())} placeholder={`${REPLY.orderPrefix}-ABCD2345 (from the email, so its links work again)`} />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-xs font-bold text-slate-300">Customer name<input required className={`${field} mt-1`} value={name} onChange={(e) => setName(e.target.value)} /></label>
          <label className="block text-xs font-bold text-slate-300">Email<input required type="email" className={`${field} mt-1`} value={email} onChange={(e) => setEmail(e.target.value)} /></label>
          <label className="block text-xs font-bold text-slate-300">Phone<input className={`${field} mt-1`} value={phone} onChange={(e) => setPhone(e.target.value)} /></label>
          <label className="block text-xs font-bold text-slate-300">Delivery address<input className={`${field} mt-1`} value={address} onChange={(e) => setAddress(e.target.value)} /></label>
          <label className="block text-xs font-bold text-slate-300">Payment method
            <select className={`${field} mt-1`} value={method} onChange={(e) => setMethod(e.target.value)}>
              {(SHOP.paymentMethods as string[]).map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </label>
          <label className="block text-xs font-bold text-slate-300">Order came in by
            <select className={`${field} mt-1`} value={channel} onChange={(e) => setChannel(e.target.value)}>
              <option value="email">Email order</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="both">Both</option>
            </select>
          </label>
          <label className="block text-xs font-bold text-slate-300">Status
            <select className={`${field} mt-1`} value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="new">New</option>
              <option value="payment_details_sent">Invoice sent</option>
              <option value="payment_confirmed">Paid</option>
              <option value="dispatched">Dispatched</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-300">Items</div>
          {lines.map((l, i) => (
            <div key={i} className="flex gap-2">
              <select required={i === 0} aria-label="Product" className={`${field} flex-1`} value={l.slug} onChange={(e) => setLine(i, { slug: e.target.value })}>
                <option value="">Choose a product...</option>
                {options.map((p) => <option key={p.slug} value={p.slug}>{p.name} (${p.price})</option>)}
              </select>
              <input aria-label="Quantity" type="number" min={1} max={20} className={`${field} w-20`} value={l.quantity} onChange={(e) => setLine(i, { quantity: Math.max(1, Number(e.target.value) || 1) })} />
              {lines.length > 1 && <button type="button" aria-label="Remove item" onClick={() => setLines((x) => x.filter((_, j) => j !== i))} className="rounded-xl border border-slate-800 bg-slate-950 p-2 text-slate-500 hover:text-red-400"><Trash2 className="h-4 w-4" /></button>}
            </div>
          ))}
          <button type="button" onClick={() => setLines((x) => [...x, { slug: '', quantity: 1 }])} className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"><Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add another item</button>
        </div>

        {msg && <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200">{msg}</div>}
        <button disabled={busy} type="submit" className="rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-bold text-white hover:bg-emerald-600 disabled:opacity-50">{busy ? 'Saving...' : 'Save order'}</button>
      </form>
    </div>
  );
}
