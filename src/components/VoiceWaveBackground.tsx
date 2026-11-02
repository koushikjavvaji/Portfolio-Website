import { useEffect, useRef } from "react";
import { getLevel } from "@/lib/micLevel";

/* Soft pastel aurora. Blobs drift slowly, lean toward the mouse, and
   swell with scroll speed and live microphone input (voice-reactive). */

const BLOBS = [
  { color: "170, 215, 190", x: 0.08, y: 0.06, r: 0.36, sx: 0.00021, sy: 0.00017 }, // sage
  { color: "250, 205, 160", x: 0.95, y: 0.08, r: 0.32, sx: 0.00017, sy: 0.00023 }, // peach
  { color: "180, 205, 240", x: 0.98, y: 0.95, r: 0.38, sx: 0.00019, sy: 0.00015 }, // sky
  { color: "245, 190, 200", x: 0.02, y: 0.94, r: 0.3, sx: 0.00023, sy: 0.00021 }, // blush
];

const VoiceWaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Low resolution is plenty for blurry gradients and keeps it cheap.
    const scale = 0.12;
    let w = 0;
    let h = 0;

    const resize = () => {
      w = Math.ceil(window.innerWidth * scale);
      h = Math.ceil(window.innerHeight * scale);
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onMove = (e: MouseEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMove);

    let lastScroll = window.scrollY;
    let scrollEnergy = 0;
    const onScroll = () => {
      scrollEnergy = Math.min(1, scrollEnergy + Math.abs(window.scrollY - lastScroll) / 250);
      lastScroll = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let micLevel = 0;
    let raf = 0;

    let lastFrame = 0;
    const draw = (time: number) => {
      if (document.hidden || time - lastFrame < 33) {
        if (!reduced) raf = requestAnimationFrame(draw);
        return;
      }
      lastFrame = time;
      const target = getLevel();
      micLevel += (target - micLevel) * 0.15;
      scrollEnergy *= 0.94;
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      canvas.style.opacity = String(0.85 + micLevel * 0.15);
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "source-over";

      const swell = 1 + micLevel * 0.9 + scrollEnergy * 0.25;
      BLOBS.forEach((b, i) => {
        const cx = (b.x + Math.sin(time * b.sx + i * 2) * 0.05 + (mouse.x - 0.5) * 0.06 * (i % 2 ? 1 : -1)) * w;
        const cy = (b.y + Math.cos(time * b.sy + i * 3) * 0.05 + (mouse.y - 0.5) * 0.06 * (i % 2 ? -1 : 1)) * h;
        const radius = b.r * Math.max(w, h) * swell;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        g.addColorStop(0, `rgba(${b.color}, ${0.75 + micLevel * 0.25})`);
        g.addColorStop(1, `rgba(${b.color}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      });

      if (!reduced) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <div className="absolute inset-0 bg-background" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.85, imageRendering: "auto", willChange: "opacity", transform: "translateZ(0)" }}
      />
    </div>
  );
};

export default VoiceWaveBackground;
