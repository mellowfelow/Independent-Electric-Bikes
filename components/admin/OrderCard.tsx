'use client';

import Link from 'next/link';
import { Calendar, Mail, MapPin, Phone, Trash2, ArrowRight, Eye, ReceiptText } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { ChannelBadge, PaymentBadge, stripeFor } from './Badges';
import { money } from '@/lib/order';
import type { OrderRecord } from '@/lib/orderStore';

const when = (iso: string) => {
  try {
    return new Date(iso).toLocaleString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' });
  } catch {
    return iso;
  }
};

export function OrderCard({ order: o, onDelete }: { order: OrderRecord; onDelete?: (id: string) => void }) {
  const units = o.items.reduce((n, i) => n + i.quantity, 0);
  return (
    <article className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-lg transition-colors hover:border-slate-600">
      <span className={`absolute inset-y-0 left-0 w-1.5 ${stripeFor(o.status)}`} aria-hidden="true" />
      <div className="space-y-4 p-5 pl-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-lg font-black text-white">#{o.id}</span>
              <StatusBadge status={o.status} />
            </div>
            <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-400">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              {when(o.createdAt)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-black text-emerald-400">{money(o.totalAmount)}</div>
            <div className="text-[11px] text-slate-400">{units} item{units === 1 ? '' : 's'}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <ChannelBadge channel={o.channel} />
          <PaymentBadge method={o.paymentMethod} />
        </div>

        <div className="space-y-1 text-xs">
          <div className="text-sm font-bold text-white">{o.customerName}</div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-300">
            <span className="flex items-center gap-1.5"><Mail className="h-3 w-3 text-slate-500" aria-hidden="true" />{o.email}</span>
            {o.phone && <span className="flex items-center gap-1.5"><Phone className="h-3 w-3 text-slate-500" aria-hidden="true" />{o.phone}</span>}
          </div>
          {o.address && <div className="flex items-start gap-1.5 text-slate-400"><MapPin className="mt-0.5 h-3 w-3 shrink-0 text-slate-500" aria-hidden="true" /><span>{o.address}</span></div>}
        </div>

        <ul className="space-y-1 rounded-xl border border-slate-800 bg-slate-950 p-3 text-xs text-slate-300">
          {o.items.slice(0, 3).map((i) => (
            <li key={i.slug} className="flex justify-between gap-3">
              <span className="truncate">{i.name} &times; {i.quantity}</span>
              <span className="shrink-0 font-bold text-slate-200">{money(i.price * i.quantity)}</span>
            </li>
          ))}
          {o.items.length > 3 && <li className="text-slate-500">+ {o.items.length - 3} more</li>}
        </ul>

        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/admin/orders/${o.id}/`} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-bold text-slate-100 hover:bg-slate-700">
            <Eye className="h-3.5 w-3.5" aria-hidden="true" /> Open order
          </Link>
          <Link href={`/admin/send-payment-email/?orderId=${o.id}`} className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white shadow hover:bg-emerald-600">
            <ReceiptText className="h-3.5 w-3.5" aria-hidden="true" />
            {o.status === 'new' ? 'Send payment invoice' : 'Resend payment invoice'}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          {onDelete && (
            <button type="button" onClick={() => onDelete(o.id)} aria-label={`Delete order ${o.id}`} className="ml-auto rounded-xl border border-slate-800 bg-slate-950 p-2 text-slate-500 hover:text-red-400">
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
