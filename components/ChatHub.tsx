'use client';

import { EmailText } from '@/components/EmailText';
import { useState } from 'react';
import { MessageSquare, Phone, Mail, X, Send, Bike } from 'lucide-react';
import { SITE, CONTACT, CHAT } from '@/config/site';

export function ChatHub() {
  const [isOpen, setIsOpen] = useState(false);

  const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hi ${SITE.name}, I have a question about electric bikes!`)}`;

  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Expanded Widget */}
      {isOpen && (
        <div className="bg-slate-900 border border-slate-800 text-white rounded-2xl shadow-2xl p-5 mb-4 w-[340px] max-w-[90vw] animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-700 flex items-center justify-center text-white">
                <Bike className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white leading-tight">{SITE.name}</h3>
                <p className="text-xs text-emerald-400 font-medium">Brunswick Team Online</p>
              </div>
            </div>
            <button
              type="button"
              aria-label="Close Chat Hub"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 my-3">
            Have questions about battery range, motor wattage, or Australian e-bike laws? Speak directly with our Brunswick technicians!
          </p>

          <div className="space-y-2.5">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold transition-all shadow-md hover:shadow-emerald-900/30"
            >
              <Send className="w-4 h-4" />
              <div className="text-left">
                <div>WhatsApp Direct Chat</div>
                <div className="text-[10px] font-normal text-emerald-100">Fastest response (0480 811 308)</div>
              </div>
            </a>

            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors border border-slate-700"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <div className="text-left">
                <div>Call Brunswick Showroom</div>
                <div className="text-[10px] font-normal text-slate-400">{CONTACT.phoneDisplay}</div>
              </div>
            </a>

            <a
              href={`mailto:${CONTACT.email.replace("@", "%40")}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors border border-slate-700"
            >
              <Mail className="w-4 h-4 text-emerald-400" />
              <div className="text-left">
                <div>Email Support Team</div>
                <div className="text-[10px] font-normal text-slate-400"><EmailText email={CONTACT.email} /></div>
              </div>
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        type="button"
        aria-label="Open Chat Hub"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-full shadow-xl hover:scale-105 transition-all text-xs border border-emerald-400/30"
      >
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline">Questions? Chat with Us</span>
      </button>
    </div>
  );
}
