'use client';

import { EmailText } from '@/components/EmailText';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { SITE, CONTACT } from '@/config/site';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, Bike } from 'lucide-react';

export default function ContactPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formName: 'contact',
          website,
          name,
          email,
          phone,
          subject,
          message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        router.push('/thank-you-contact/');
      } else {
        setErrorMsg(data.message || 'Error submitting message.');
      }
    } catch {
      setErrorMsg('Server connection error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen pb-20">
      <div className="bg-slate-900 border-b border-slate-800 py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Get in Touch</span>
          <h1 className="text-3xl sm:text-5xl font-black text-white">Contact Our Brunswick Showroom</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Test rides, sales inquiries, and technical warranty support from VYRON Industries.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <h2 className="text-lg font-extrabold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
                <Bike className="w-5 h-5 text-emerald-400" />
                <span>Showroom & Corporate Details</span>
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Brunswick Showroom & Warehouse:</strong>
                    <span>{CONTACT.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Phone & WhatsApp Support:</strong>
                    <span>{CONTACT.phoneDisplay} (Call or WhatsApp)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Sales & Support Email:</strong>
                    <span><EmailText email={CONTACT.email} /></span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Trading Hours:</strong>
                    <span>Monday – Friday: 9:00am – 5:30pm<br />Saturday: 10:00am – 4:00pm</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-400 space-y-1">
                <div className="font-bold text-white">{SITE.entityName}</div>
                <div>ABN {SITE.abn} · Registered for GST</div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h2 className="text-xl font-extrabold text-white mb-6">Send an Inquiry to Our Tech Team</h2>

              {errorMsg && (
                <div className="p-3 bg-red-950/60 border border-red-800 text-red-200 text-xs rounded-xl mb-6">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. sarah@example.com.au"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0400 000 000"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Test Ride Inquiry"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Your Message / Question *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your daily commute route or e-bike questions..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message to Brunswick Team'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
