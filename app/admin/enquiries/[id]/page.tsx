'use client';

import { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';
import { useAdminPasscode } from '@/components/admin/AdminPasscodeContext';
import { EnquiryRecord } from '@/lib/enquiryStore';
import { ArrowLeft, Send, Trash2, Calendar, User, Mail, Phone, Building2, MessageSquare } from 'lucide-react';

export default function EnquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { passcode } = useAdminPasscode();
  const [enquiry, setEnquiry] = useState<EnquiryRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchEnquiry = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/enquiries/${resolvedParams.id}/?passcode=${encodeURIComponent(passcode || '')}`, {
        headers: { 'X-Admin-Passcode': passcode || '' },
      });
      if (res.ok) {
        const data = await res.json();
        setEnquiry(data.enquiry);
      } else {
        setError('Enquiry not found');
      }
    } catch {
      setError('Connection error fetching enquiry');
    } finally {
      setLoading(false);
    }
  }, [resolvedParams.id, passcode]);

  useEffect(() => {
    if (passcode) {
      const timer = setTimeout(() => {
        fetchEnquiry();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [passcode, fetchEnquiry]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this enquiry record?')) return;
    try {
      const res = await fetch(`/api/admin/enquiries/${resolvedParams.id}/?passcode=${encodeURIComponent(passcode || '')}`, {
        method: 'DELETE',
        headers: { 'X-Admin-Passcode': passcode || '' },
      });
      if (res.ok) {
        window.location.href = '/admin/enquiries/';
      }
    } catch {
      alert('Error deleting enquiry');
    }
  };

  if (loading) {
    return <div className="text-center text-slate-400 py-12 text-xs">Loading enquiry #{resolvedParams.id}...</div>;
  }

  if (error || !enquiry) {
    return (
      <div className="space-y-4 text-center py-12">
        <div className="text-red-400 text-sm font-bold">{error || 'Enquiry not found'}</div>
        <Link href="/admin/enquiries/" className="inline-flex items-center gap-2 text-xs text-emerald-400 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Back to Enquiries
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <Link href="/admin/enquiries/" className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-2 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Enquiries List
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black text-white font-mono">Enquiry #{enquiry.id}</h1>
            <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase ${
              enquiry.status === 'replied' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-sky-950 text-sky-300 border border-sky-800'
            }`}>
              {enquiry.status}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={`/admin/reply-enquiry/?enquiryId=${enquiry.id}`}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow"
          >
            <Send className="w-4 h-4" />
            <span>Compose Reply</span>
          </Link>
          <button
            onClick={handleDelete}
            className="px-3 py-2 bg-red-950/40 hover:bg-red-900/60 text-red-300 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all border border-red-800/40"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              Customer Inquiry Message
            </h2>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
              {enquiry.message}
            </div>
          </div>

          {enquiry.replyText && (
            <div className="bg-slate-900 border border-emerald-900/50 rounded-2xl p-6 space-y-3">
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <Send className="w-4 h-4" />
                Dispatched Response ({enquiry.repliedAt ? new Date(enquiry.repliedAt).toLocaleString() : 'Replied'})
              </h2>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-emerald-200 whitespace-pre-wrap leading-relaxed">
                {enquiry.replyText}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-400" />
              Sender Details
            </h2>

            <div className="space-y-3 text-slate-300">
              <div className="flex items-start gap-2.5">
                <User className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Name</div>
                  <div className="font-bold text-white text-sm">{enquiry.name}</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Email</div>
                  <a href={`mailto:${enquiry.email}`} className="text-emerald-400 font-medium hover:underline">{enquiry.email}</a>
                </div>
              </div>

              {enquiry.phone && (
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500">Phone</div>
                    <a href={`tel:${enquiry.phone}`} className="text-white hover:underline">{enquiry.phone}</a>
                  </div>
                </div>
              )}

              {enquiry.companyName && (
                <div className="flex items-start gap-2.5">
                  <Building2 className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-500">Company / Business</div>
                    <div className="text-white font-bold">{enquiry.companyName}</div>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2.5">
                <Calendar className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-500">Date Received</div>
                  <div className="text-slate-400">{new Date(enquiry.createdAt).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
