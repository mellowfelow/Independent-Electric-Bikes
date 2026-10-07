'use client';

import { useState, ReactNode, FormEvent, useEffect, useCallback } from 'react';
import { useAdminPasscode } from './AdminPasscodeContext';
import { Lock, Bike, ArrowRight, ShieldAlert } from 'lucide-react';
import { SITE } from '@/config/site';

export function PasscodeGate({ children }: { children: ReactNode }) {
  const { passcode, setPasscode } = useAdminPasscode();
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const verifyCode = useCallback(async (codeToTest: string) => {
    setIsChecking(true);
    setError('');

    try {
      const url = `/api/admin/orders/?passcode=${encodeURIComponent(codeToTest.trim())}`;
      const res = await fetch(url, {
        headers: {
          'X-Admin-Passcode': codeToTest.trim(),
        },
      });

      if (res.ok) {
        setIsValidated(true);
        setPasscode(codeToTest);
      } else {
        setError('Invalid admin passcode. Access denied.');
        setIsValidated(false);
        setPasscode(null);
      }
    } catch {
      setError('Connection error verifying passcode.');
      setIsValidated(false);
    } finally {
      setIsChecking(false);
    }
  }, [setPasscode]);

  useEffect(() => {
    if (passcode) {
      const timer = setTimeout(() => {
        verifyCode(passcode);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [passcode, verifyCode]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    verifyCode(inputCode.trim());
  };

  if (isValidated && passcode) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/30">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-black text-white">{SITE.name}</h1>
          <p className="text-xs text-slate-400 mt-1">Reply Portal & Order Management Dashboard</p>
        </div>

        {error && (
          <div className="bg-red-950/60 border border-red-800/80 p-3 rounded-xl text-red-200 text-xs mb-5 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 flex-shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
              Admin Passcode
            </label>
            <input
              type="password"
              required
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Enter admin passcode (e.g. orderreply)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isChecking}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{isChecking ? 'Verifying...' : 'Unlock Reply Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
