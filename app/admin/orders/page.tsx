'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, RefreshCw } from 'lucide-react';
import { useAdminFetch } from '@/components/admin/useAdminFetch';
import { OrderCard } from '@/components/admin/OrderCard';
import { StorageNotice } from '@/components/admin/StorageNotice';
import type { OrderRecord } from '@/lib/orderStore';

const FILTERS: { id: 'all' | OrderRecord['status']; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'new', label: 'New' },
  { id: 'payment_details_sent', label: 'Invoice sent' },
  { id: 'payment_confirmed', label: 'Paid' },
  { id: 'dispatched', label: 'Dispatched' },
  { id: 'cancelled', label: 'Cancelled' },
];

export default function AdminOrdersListPage() {
  const { data, loading, reload, passcode } = useAdminFetch<{ orders: OrderRecord[] }>('/api/admin/orders/');
  const [filter, setFilter] = useState<'all' | OrderRecord['status']>('all');
  const [q, setQ] = useState('');
  const orders = useMemo(() => data?.orders ?? [], [data]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length };
    for (const o of orders) c[o.status] = (c[o.status] || 0) + 1;
    return c;
  }, [orders]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return orders.filter((o) => (filter === 'all' || o.status === filter) && (!needle || `${o.id} ${o.customerName} ${o.email} ${o.phone}`.toLowerCase().includes(needle)));
  }, [orders, filter, q]);

  const handleDelete = async (id: string) => {
    if (!confirm(`Delete order #${id}? This cannot be undone.`)) return;
    await fetch(`/api/admin/orders/${id}/`, { method: 'DELETE', headers: { 'X-Admin-Passcode': passcode || '' } });
    reload();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white">Orders</h1>
          <p className="text-xs text-slate-400">Every order from the website checkout, newest first.</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={reload} className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900 px-3.5 py-2 text-xs font-bold text-slate-200 hover:bg-slate-800">
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} aria-hidden="true" /> Refresh
          </button>
          <Link href="/admin/orders/new/" className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-3.5 py-2 text-xs font-bold text-white hover:bg-emerald-600">
            <Plus className="h-3.5 w-3.5" aria-hidden="true" /> Add order
          </Link>
        </div>
      </div>

      <StorageNotice />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label="Filter orders" className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-bold ${filter === f.id ? 'border-emerald-500 bg-emerald-700 text-white' : 'border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500'}`}
            >
              {f.label} <span className="opacity-70">({counts[f.id] || 0})</span>
            </button>
          ))}
        </div>
        <label className="relative block sm:w-72">
          <span className="sr-only">Search orders</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden="true" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email or order #" className="w-full rounded-xl border border-slate-700 bg-slate-900 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none" />
        </label>
      </div>

      {loading && orders.length === 0 ? (
        <div className="py-12 text-center text-xs text-slate-400">Loading orders...</div>
      ) : shown.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-12 text-center text-xs text-slate-400">
          {orders.length === 0 ? (
            <>No orders are stored yet. If you expect some, they may have been placed before permanent storage was connected: use <Link href="/admin/orders/new/" className="font-bold text-emerald-400 underline">Add order</Link> to restore them from the notification emails.</>
          ) : (
            'No orders match this filter.'
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {shown.map((o) => (
            <OrderCard key={o.id} order={o} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
