'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AdminPasscodeContextType {
  passcode: string | null;
  setPasscode: (passcode: string | null) => void;
  logout: () => void;
}

const AdminPasscodeContext = createContext<AdminPasscodeContextType>({
  passcode: null,
  setPasscode: () => {},
  logout: () => {},
});

export function AdminPasscodeProvider({ children }: { children: ReactNode }) {
  const [passcode, setPasscodeState] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('ieb_admin_passcode');
    if (stored) {
      const timer = setTimeout(() => {
        setPasscodeState(stored);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const setPasscode = (code: string | null) => {
    if (code) {
      localStorage.setItem('ieb_admin_passcode', code);
      if (typeof document !== 'undefined') {
        document.cookie = `ieb_admin_passcode=${encodeURIComponent(code)}; path=/; max-age=86400; SameSite=Lax`;
      }
    } else {
      localStorage.removeItem('ieb_admin_passcode');
      if (typeof document !== 'undefined') {
        document.cookie = `ieb_admin_passcode=; path=/; max-age=0; SameSite=Lax`;
      }
    }
    setPasscodeState(code);
  };

  const logout = () => {
    localStorage.removeItem('ieb_admin_passcode');
    setPasscodeState(null);
  };

  return (
    <AdminPasscodeContext.Provider value={{ passcode, setPasscode, logout }}>
      {children}
    </AdminPasscodeContext.Provider>
  );
}

export function useAdminPasscode() {
  return useContext(AdminPasscodeContext);
}
