'use client';

import { useState } from 'react';
import { Send, Copy, Check, MessageSquare } from 'lucide-react';
import { waLinkTo, waMessageText } from '@/lib/whatsapp';

interface WhatsAppSendPanelProps {
  customerPhone: string;
  customerName: string;
  orderRef: string;
  amountFormatted: string;
  methodLabel: string;
  openingText: string;
  pastedDetails: string;
  closingText: string;
}

export function WhatsAppSendPanel({
  customerPhone,
  customerName,
  orderRef,
  amountFormatted,
  methodLabel,
  openingText,
  pastedDetails,
  closingText,
}: WhatsAppSendPanelProps) {
  const [copied, setCopied] = useState(false);

  const rawBody = `Payment Instructions for Order #${orderRef}

Hi ${customerName},

Amount Due: ${amountFormatted}
Payment Method: ${methodLabel}

${openingText}

--- PAYMENT DETAILS ---
${pastedDetails}
----------------------

${closingText}

Please use your Order Number (#${orderRef}) as your payment description/reference. Once sent, reply to this message or email us with your payment receipt screenshot.`;

  const waUrl = waLinkTo(customerPhone, rawBody);
  const copyText = waMessageText(rawBody);

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
        <MessageSquare className="w-4 h-4" />
        <span>WhatsApp Customer Dispatch Panel</span>
      </div>

      <p className="text-xs text-slate-300">
        Send prefilled payment instructions directly to <strong>{customerName}</strong> ({customerPhone || 'Phone not provided'}):
      </p>

      <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-300 whitespace-pre-wrap max-h-48 overflow-y-auto">
        {copyText}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all shadow-md"
        >
          <Send className="w-3.5 h-3.5" />
          <span>Open WhatsApp Chat directly &rarr;</span>
        </a>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg transition-all border border-slate-700"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied to Clipboard' : 'Copy Message Text'}</span>
        </button>
      </div>
    </div>
  );
}
