"use client";
import { useEffect } from "react";

export function ClientEffects() {
  useEffect(() => {
    const isProd = process.env.NODE_ENV === 'production';
    if (typeof window === 'undefined') return;
    if ('serviceWorker' in navigator && isProd) {
      const onLoad = () => {
        navigator.serviceWorker.register('/sw.js').catch(() => void 0);
      };
      window.addEventListener('load', onLoad);
      return () => window.removeEventListener('load', onLoad);
    }
  }, []);

  return null;
}


