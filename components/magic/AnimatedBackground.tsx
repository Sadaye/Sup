import React from 'react';

export function AnimatedBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden dark:hidden">
      <div className="absolute inset-0 opacity-[0.25] animate-[pulse_8s_ease-in-out_infinite]" style={{
        background: 'radial-gradient(60% 50% at 10% 10%, hsla(var(--primary), 0.35) 0%, transparent 60%), radial-gradient(60% 50% at 90% 90%, hsla(var(--secondary), 0.35) 0%, transparent 60%)'
      }} />
      <div className="absolute inset-0 mix-blend-soft-light opacity-40" style={{
        backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'1920\' height=\'1080\' viewBox=\'0 0 1920 1080\'><filter id=\'n\'><feTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'2\' stitchTiles=\'stitch\'/></filter><rect width=\'100%\' height=\'100%\' filter=\'url(%23n)\'/></svg>")'
      }} />
    </div>
  );
}


