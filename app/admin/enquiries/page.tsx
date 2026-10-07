'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useAdminPasscode } from '@/components/admin/AdminPasscodeContext';
import { StatusBadge } from '@/components/admin/StatusBadge';
import { Trash2, ArrowRight } from 'lucide-react';

export default function AdminEnquiriesListPage() {
  const { passcode } = useAdminPasscode();
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/enquiries/?passcode=${encodeURIComponent(passcode || '')}`, {
        headers: { 'X-Admin-Passcode': passcode || '' },
      });
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
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
        fetchEnquiries();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [passcode, fetchEnquiries]);

  const handleDelete = async (id: string) => {
    if (!confirm(`Delete enquiry #${id}?`)) return;
    try {
      await fetch(`/api/admin/enquiries/${id}/?passcode=${encodeURIComponent(passcode || '')}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Passcode': passcode || '' },
      });
      fetchEnquiries();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white">Enquiries Management</h1>
          <p className="text-xs text-slate-400">View customer questions and reply directly via branded email.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-400 text-xs">Loading enquiries...</div>
      ) : enquiries.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 text-xs">
          No customer enquiries found.
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="divide-y divide-slate-800">
            {enquiries.map((e) => (
              <div key={e.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-slate-400">#{e.id}</span>
                    <StatusBadge status={e.status} />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">Form: {e.formName}</span>
                  </div>
                  <div className="text-slate-200 font-bold text-sm">
                    {e.name} ({e.email}, {e.phone || 'No phone'})
                  </div>
                  <p className="text-slate-300 italic bg-slate-950 p-2.5 rounded-lg border border-slate-800/80 max-w-xl">
                    &quot;{e.message}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/reply-enquiry/?enquiryId=${e.id}`}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 flex items-center gap-1.5"
                  >
                    <span>Reply to Customer</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(e.id)}
                    className="p-2 text-slate-500 hover:text-red-400 bg-slate-950 rounded-xl border border-slate-800"
                    aria-label="Delete enquiry"
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
