"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function RouteProgressBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // simulate progress while route changes
    setVisible(true);
    setProgress(10);
    const t1 = setTimeout(() => setProgress(40), 80);
    const t2 = setTimeout(() => setProgress(75), 200);
    const t3 = setTimeout(() => setProgress(95), 400);
    const t4 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setVisible(false), 120);
      setTimeout(() => setProgress(0), 200);
    }, 600);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="fixed left-0 right-0 top-0 z-[70]">
      <div className="h-0.5 bg-primary/30">
        <div
          className="h-0.5 bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}


