'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAdminPasscode } from './AdminPasscodeContext';

/** Loads an admin API endpoint with the passcode header. `status` is the HTTP status so pages can tell "not signed in" from "not found". */
export function useAdminFetch<T>(path: string) {
  const { passcode } = useAdminPasscode();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<number | null>(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(path, { headers: { 'X-Admin-Passcode': passcode || '' }, cache: 'no-store' });
      setStatus(res.status);
      setData(res.ok ? ((await res.json()) as T) : null);
    } catch {
      setStatus(0);
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [path, passcode]);

  useEffect(() => {
    if (!passcode) return;
    const t = setTimeout(reload, 0);
    return () => clearTimeout(t);
  }, [passcode, reload]);

  return { data, loading, status, reload, passcode };
}
