'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAdminPasscode } from '@/components/admin/AdminPasscodeContext';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { ShoppingCart, MessageSquare, ArrowRight, RefreshCw, DollarSign } from 'lucide-react';
import { money } from '@/lib/order';

export default function AdminHubPage() {
  const { passcode } = useAdminPasscode();
  const [orders, setOrders] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [ordersRes, enquiriesRes] = await Promise.all([
        fetch(`/api/admin/orders/`, { headers: { 'X-Admin-Passcode': passcode || '' } }),
        fetch(`/api/admin/enquiries/`, { headers: { 'X-Admin-Passcode': passcode || '' } }),
      ]);

      if (ordersRes.ok) {
        const oData = await ordersRes.json();
        setOrders(oData.orders || []);
      }

      if (enquiriesRes.ok) {
        const eData = await enquiriesRes.json();
        setEnquiries(eData.enquiries || []);
      }
    } catch (err) {
      console.error('[Admin Hub] Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [passcode]);

  useEffect(() => {
    if (passcode) {
      const timer = setTimeout(() => {
        fetchData();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [passcode, fetchData]);

  const newOrdersCount = orders.filter((o) => o.status === 'new').length;
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;
  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalAmount || 0), 0);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">Reply Portal Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">Live order requests, enquiry replies, and payment details composer hub.</p>
        </div>

        <button
          type="button"
          onClick={fetchData}
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-bold rounded-xl border border-slate-800 transition-all self-start sm:self-auto"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Live Data</span>
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Orders</span>
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mt-3">{orders.length}</div>
          <div className="text-xs text-amber-400 font-bold mt-1">{newOrdersCount} pending payment details</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Live Enquiries</span>
            <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white mt-3">{enquiries.length}</div>
          <div className="text-xs text-blue-400 font-bold mt-1">{newEnquiriesCount} unreplied inquiries</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Gross Pipeline</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-400 mt-3">{money(totalRevenue)}</div>
          <div className="text-xs text-slate-400 font-medium mt-1">Total across submitted drafts</div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-base font-extrabold text-white">Recent E-Bike Orders</h2>
          <Link href="/admin/orders/" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
            <span>View All ({orders.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-xs text-slate-400 py-6 text-center">No order drafts submitted yet.</div>
        ) : (
          <div className="divide-y divide-slate-800">
            {orders.slice(0, 5).map((o) => (
              <div key={o.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-white text-sm">#{o.id}</span>
                    <StatusBadge status={o.status} />
                  </div>
                  <div className="text-slate-300 font-medium mt-0.5">
                    {o.customerName} ({o.email}) · <span className="text-emerald-400 font-bold">{money(o.totalAmount)}</span>
                  </div>
                </div>

                <Link
                  href={`/admin/send-payment-email/?orderId=${o.id}`}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl self-start sm:self-auto"
                >
                  Send Payment Details &rarr;
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Enquiries Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-base font-extrabold text-white">Recent Customer Enquiries</h2>
          <Link href="/admin/enquiries/" className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
            <span>View All ({enquiries.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {enquiries.length === 0 ? (
          <div className="text-xs text-slate-400 py-6 text-center">No customer enquiries submitted yet.</div>
        ) : (
          <div className="divide-y divide-slate-800">
            {enquiries.slice(0, 5).map((e) => (
              <div key={e.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-300">#{e.id}</span>
                    <StatusBadge status={e.status} />
                  </div>
                  <div className="text-slate-300 font-medium mt-0.5">
                    {e.name} ({e.email}) — <span className="text-slate-400 font-normal truncate max-w-xs">{e.message}</span>
                  </div>
                </div>

                <Link
                  href={`/admin/reply-enquiry/?enquiryId=${e.id}`}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 self-start sm:self-auto"
                >
                  Compose Reply &rarr;
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
