"use client";
import React, { useRef } from 'react';

interface Tilt3DProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxTilt?: number;
}

export function Tilt3D({ children, maxTilt = 8, className = "", ...props }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltX = (maxTilt / 2 - x * maxTilt).toFixed(2);
    const tiltY = (y * maxTilt - maxTilt / 2).toFixed(2);
    el.style.transform = `perspective(700px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) translateZ(0)`;
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`transition-transform duration-200 will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
      {...props}
    >
      {children}
    </div>
  );
}


