'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ShoppingCart, MessageSquare, ArrowRight, RefreshCw, DollarSign, Plus } from 'lucide-react';
import { useAdminFetch } from '@/components/admin/useAdminFetch';
import { OrderCard } from '@/components/admin/OrderCard';
import { EnquiryCard } from '@/components/admin/EnquiryCard';
import { StorageNotice } from '@/components/admin/StorageNotice';
import { money } from '@/lib/order';
import type { OrderRecord } from '@/lib/orderStore';
import type { EnquiryRecord } from '@/lib/enquiryStore';

export default function AdminHubPage() {
  const o = useAdminFetch<{ orders: OrderRecord[] }>('/api/admin/orders/');
  const e = useAdminFetch<{ enquiries: EnquiryRecord[] }>('/api/admin/enquiries/');
  const orders = useMemo(() => o.data?.orders ?? [], [o.data]);
  const enquiries = useMemo(() => e.data?.enquiries ?? [], [e.data]);
  const loading = o.loading || e.loading;
  const refresh = () => {
    o.reload();
    e.reload();
  };

  const awaitingInvoice = orders.filter((x) => x.status === 'new').length;
  const unreplied = enquiries.filter((x) => x.status === 'new').length;
  const pipeline = orders.filter((x) => x.status !== 'cancelled').reduce((sum, x) => sum + (x.totalAmount || 0), 0);

  const stat = 'rounded-2xl border border-slate-800 bg-slate-900 p-6';
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-black text-white sm:text-3xl">Reply Portal Dashboard</h1>
          <p className="mt-1 text-xs text-slate-400">All orders and enquiries in one place. Reply by branded email or WhatsApp.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={refresh} className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800">
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" /> Refresh
          </button>
          <Link href="/admin/orders/new/" className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-600">
            <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add order
          </Link>
        </div>
      </div>

      <StorageNotice />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div className={stat}>
          <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-wider text-slate-400">Orders</span><span className="rounded-lg bg-amber-500/10 p-2 text-amber-400"><ShoppingCart className="h-5 w-5" aria-hidden="true" /></span></div>
          <div className="mt-3 text-3xl font-black text-white">{orders.length}</div>
          <div className="mt-1 text-xs font-bold text-amber-400">{awaitingInvoice} waiting for a payment invoice</div>
        </div>
        <div className={stat}>
          <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-wider text-slate-400">Enquiries</span><span className="rounded-lg bg-sky-500/10 p-2 text-sky-400"><MessageSquare className="h-5 w-5" aria-hidden="true" /></span></div>
          <div className="mt-3 text-3xl font-black text-white">{enquiries.length}</div>
          <div className="mt-1 text-xs font-bold text-sky-400">{unreplied} unreplied</div>
        </div>
        <div className={stat}>
          <div className="flex items-center justify-between"><span className="text-xs font-bold uppercase tracking-wider text-slate-400">Order value</span><span className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400"><DollarSign className="h-5 w-5" aria-hidden="true" /></span></div>
          <div className="mt-3 text-3xl font-black text-emerald-400">{money(pipeline)}</div>
          <div className="mt-1 text-xs font-medium text-slate-400">All orders except cancelled</div>
        </div>
      </div>

      <section aria-label="Recent orders" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-white">Recent orders</h2>
          <Link href="/admin/orders/" className="flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300">View all ({orders.length}) <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
        </div>
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-xs text-slate-400">No orders stored yet.</div>
        ) : (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {orders.slice(0, 4).map((x) => <OrderCard key={x.id} order={x} />)}
          </div>
        )}
      </section>

      <section aria-label="Recent enquiries" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-white">Recent enquiries</h2>
          <Link href="/admin/enquiries/" className="flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300">View all ({enquiries.length}) <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" /></Link>
        </div>
        {enquiries.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center text-xs text-slate-400">No enquiries stored yet.</div>
        ) : (
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            {enquiries.slice(0, 4).map((x) => <EnquiryCard key={x.id} enquiry={x} />)}
          </div>
        )}
      </section>
    </div>
  );
}
