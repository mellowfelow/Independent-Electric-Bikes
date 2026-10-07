'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAdminPasscode } from '@/components/admin/AdminPasscodeContext';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { money } from '@/lib/order';

export default function AdminOrdersListPage() {
  const { passcode } = useAdminPasscode();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/?passcode=${encodeURIComponent(passcode || '')}`, {
        headers: { 'X-Admin-Passcode': passcode || '' },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [passcode]);

  useEffect(() => {
    if (passcode) {
      const timer = setTimeout(() => {
        fetchOrders();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [passcode, fetchOrders]);

  const handleDelete = async (id: string) => {
    if (!confirm(`Delete order #${id}?`)) return;
    try {
      await fetch(`/api/admin/orders/${id}/?passcode=${encodeURIComponent(passcode || '')}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Passcode': passcode || '' },
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white">Orders Management</h1>
          <p className="text-xs text-slate-400">View customer orders, mark statuses, or compose payment detail invoices.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs">Loading orders list...</div>
      ) : orders.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-xs">
          No customer orders found in store.
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="divide-y divide-slate-800">
            {orders.map((o) => (
              <div key={o.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-black text-white text-base">#{o.id}</span>
                    <StatusBadge status={o.status} />
                    <span className="text-[10px] font-bold text-slate-500 uppercase">Channel: {o.channel}</span>
                  </div>
                  <div className="text-slate-200 font-bold text-sm">
                    {o.customerName} ({o.email}, {o.phone || 'No phone'})
                  </div>
                  <div className="text-slate-400">
                    Address: {o.address} · Total: <strong className="text-emerald-400">{money(o.totalAmount)}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/send-payment-email/?orderId=${o.id}`}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md"
                  >
                    <span>Send Payment Email</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(o.id)}
                    className="p-2 text-slate-500 hover:text-red-400 bg-slate-950 rounded-xl border border-slate-800"
                    aria-label="Delete order"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
