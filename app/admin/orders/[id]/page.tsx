'use client';

import { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';
import { useAdminPasscode } from '@/components/admin/AdminPasscodeContext';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { money } from '@/lib/order';
import { OrderRecord } from '@/lib/orderStore';
import { ArrowLeft, Mail, CheckCircle2, Trash2, ExternalLink, Calendar, User, MapPin, Phone, CreditCard, ShoppingBag } from 'lucide-react';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { passcode } = useAdminPasscode();
  const [order, setOrder] = useState<OrderRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionSuccess, setActionSuccess] = useState('');

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/orders/${resolvedParams.id}/`, {
        headers: { 'X-Admin-Passcode': passcode || '' },
      });
      if (res.ok) {
        const data = await res.json();
        setOrder(data.order);
      } else {
        setError('Order not found');
      }
    } catch {
      setError('Connection error fetching order');
    } finally {
      setLoading(false);
    }
  }, [resolvedParams.id, passcode]);

  useEffect(() => {
    if (passcode) {
      const timer = setTimeout(() => {
        fetchOrder();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [passcode, fetchOrder]);

  const handleUpdateStatus = async (newStatus: OrderRecord['status']) => {
    try {
      const res = await fetch(`/api/admin/orders/${resolvedParams.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Passcode': passcode || '',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setActionSuccess(`Status updated to ${newStatus}`);
        fetchOrder();
      }
    } catch {
      alert('Error updating status');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this order record?')) return;
    try {
      const res = await fetch(`/api/admin/orders/${resolvedParams.id}/`, {
        method: 'DELETE',
        headers: { 'X-Admin-Passcode': passcode || '' },
      });
      if (res.ok) {
        window.location.href = '/admin/orders/';
      }
    } catch {
      alert('Error deleting order');
    }
  };

  if (loading) {
    return <div className="text-center text-slate-400 py-12 text-xs">Loading order #{resolvedParams.id}...</div>;
  }

  if (error || !order) {
    return (
      <div className="space-y-4 text-center py-12">
        <div className="text-red-400 text-sm font-bold">{error || 'Order not found'}</div>
        <Link href="/admin/orders/" className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <Link href="/admin/orders/" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-2 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Orders List
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-white font-mono">Order #{order.id}</h1>
            <StatusBadge status={order.status} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/admin/send-payment-email/?orderId=${order.id}`}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow"
          >
            <Mail className="w-4 h-4" />
            <span>Send Payment Email / WA</span>
          </Link>
          {order.status !== 'payment_confirmed' && (
            <button
              onClick={() => handleUpdateStatus('payment_confirmed')}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark Paid</span>
            </button>
          )}
          <button
            onClick={handleDelete}
            className="px-3 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all border border-red-800/40"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-3 bg-emerald-950/60 border border-emerald-800 text-emerald-200 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Order Items */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              Ordered E-Bike & EV Items
            </h2>

            <div className="divide-y divide-slate-800">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white text-sm">{item.name}</div>
                    <div className="text-slate-400">Qty: {item.quantity} × {money(item.price)}</div>
                  </div>
                  <div className="font-extrabold text-white text-sm">{money(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between items-center text-sm font-black text-white">
              <span>Total Amount:</span>
              <span className="text-emerald-400 text-lg">{money(order.totalAmount)}</span>
            </div>
          </div>

          {/* Parsed Payment Details */}
          {order.parsedPaymentDetails && order.parsedPaymentDetails.length > 0 && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
                Dispatched Payment Detail Fields (`parsePaymentDetail`)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {order.parsedPaymentDetails.map((f, i) => (
                  <div key={i} className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-xs">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">{f.label}</div>
                    <code className="text-emerald-400 font-mono font-bold text-sm">{f.value}</code>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Customer Sidebar Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-400" />
              Customer Profile
            </h2>

            <div className="space-y-3 text-slate-300">
              <div className="flex items-start gap-2.5">
                <User className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Name</div>
                  <div className="font-bold text-white text-sm">{order.customerName}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Email</div>
                  <a href={`mailto:${order.email}`} className="text-emerald-400 font-medium hover:underline">{order.email}</a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Phone</div>
                  <a href={`tel:${order.phone}`} className="text-white hover:underline">{order.phone || 'N/A'}</a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Address</div>
                  <div className="text-white">{order.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CreditCard className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Method Rail</div>
                  <div className="text-white font-bold">{order.paymentMethod} ({order.channel})</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Date Placed</div>
                  <div className="text-slate-400">{new Date(order.createdAt).toLocaleString()}</div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800">
              <a
                href={`/order/payment-details/?id=${order.id}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold hover:underline"
              >
                <span>View Public Customer Payment Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
