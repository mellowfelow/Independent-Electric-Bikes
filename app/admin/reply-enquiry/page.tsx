'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAdminPasscode } from '@/components/admin/AdminPasscodeContext';
import { Send, CheckCircle2 } from 'lucide-react';

function ReplyEnquiryContent() {
  const searchParams = useSearchParams();
  const initialEnquiryId = searchParams.get('enquiryId') || '';

  const { passcode } = useAdminPasscode();
  const [enquiryId, setEnquiryId] = useState(initialEnquiryId);
  const [enquiry, setEnquiry] = useState<any>(null);
  const [replyText, setReplyText] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const fetchEnquiry = useCallback(async (id: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}/?passcode=${encodeURIComponent(passcode || '')}`, {
        headers: { 'X-Admin-Passcode': passcode || '' },
      });
      if (res.ok) {
        const data = await res.json();
        setEnquiry(data.enquiry);
      }
    } catch (err) {
      console.error(err);
    }
  }, [passcode]);

  useEffect(() => {
    if (enquiryId && passcode) {
      const timer = setTimeout(() => {
        fetchEnquiry(enquiryId);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [enquiryId, passcode, fetchEnquiry]);

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) {
      setErrorMsg('Please enter a reply message.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await fetch(`/api/admin/reply-enquiry/?passcode=${encodeURIComponent(passcode || '')}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Passcode': passcode || '',
        },
        body: JSON.stringify({
          enquiryId: enquiryId || enquiry?.id,
          replyText,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg(data.message);
      } else {
        setErrorMsg(data.message || 'Error sending reply.');
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

        {enquiry && (
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
            <div className="font-bold text-white text-sm">{enquiry.name} ({enquiry.email})</div>
            <p className="text-slate-300 italic">&quot;{enquiry.message}&quot;</p>
          </div>
        )}

        <form onSubmit={handleSendReply} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Enquiry ID
            </label>
            <input
              type="text"
              value={enquiryId}
              onChange={(e) => setEnquiryId(e.target.value)}
              placeholder="e.g. ENQ-77182"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Response Message
            </label>
            <textarea
              rows={6}
              required
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Hi Sarah, thank you for reaching out! Yes, test rides for the Vyron Hazmats are available at our Brunswick showroom..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Sending Reply...' : `Send Reply Email to ${enquiry?.email || 'Customer'}`}</span>
          </button>
        </form>
      </div>

      <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
          Live Response Preview
        </h2>

        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
          <div className="text-slate-400">
            To: <strong className="text-white">{enquiry?.email || 'customer@example.com.au'}</strong>
          </div>
          <div className="border-t border-slate-800 pt-3 text-slate-200 whitespace-pre-wrap">
            {replyText || 'Your composed reply text will appear here...'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ReplyEnquiryPage() {
  return (
    <div className="space-y-8">
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl font-black text-white">Compose Enquiry Response</h1>
        <p className="text-xs text-slate-400 mt-1">Send a branded response email directly to customer inquiries.</p>
      </div>

      <Suspense fallback={<div className="text-center text-slate-400 py-12 text-xs">Loading composer...</div>}>
        <ReplyEnquiryContent />
      </Suspense>
    </div>
  );
}
