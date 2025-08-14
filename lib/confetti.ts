// Lightweight confetti burst without external deps
// Creates a temporary canvas overlay and animates colorful particles

export function launchConfetti(durationMs: number = 1200) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  const DPR = Math.min(2, window.devicePixelRatio || 1);
  function resize() {
    canvas.width = window.innerWidth * DPR;
    canvas.height = window.innerHeight * DPR;
  }
  resize();
  const onResize = () => resize();
  window.addEventListener('resize', onResize);

  const colors = [
    '#6C63FF', '#00C2FF', '#FF7AD9', '#FFD166', '#06D6A0', '#EF476F'
  ];

  const count = 140;
  const gravity = 0.0009 * DPR;
  const drag = 0.0005 * DPR;
  const particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: -20 * DPR,
    vx: (Math.random() - 0.5) * 0.8 * DPR,
    vy: (Math.random() * -0.6 - 0.4) * DPR,
    w: (6 + Math.random() * 6) * DPR,
    h: (8 + Math.random() * 8) * DPR,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
  }));

  const start = performance.now();
  let raf = 0;
  function frame(now: number) {
    if (!ctx) return cleanup();
    const t = now - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.vy += gravity;
      p.vx *= 1 - drag;
      p.vy *= 1 - drag;
      p.x += p.vx * 16;
      p.y += p.vy * 16;
      p.rot += p.vr;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    }

    if (t < durationMs) {
      raf = requestAnimationFrame(frame);
    } else {
      cleanup();
    }
  }

  function cleanup() {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
    canvas.remove();
  }

  raf = requestAnimationFrame(frame);
}


