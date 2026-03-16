import { useEffect, useRef } from "react";

/* Pure CSS + lightweight canvas starfield — no WebGL, no flicker */

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate stars
    const stars = Array.from({ length: 300 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
    }));

    // Shooting stars
    const shootingStars: { x: number; y: number; len: number; speed: number; alpha: number; active: boolean }[] = [];
    let lastShoot = 0;

    let animId: number;
    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Stars with twinkle
      for (const s of stars) {
        const a = s.alpha * (0.6 + 0.4 * Math.sin(time * s.twinkleSpeed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 220, 255, ${a})`;
        ctx.fill();
      }

      // Shooting stars
      if (time - lastShoot > 4000 + Math.random() * 6000) {
        lastShoot = time;
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.4,
          len: 80 + Math.random() * 120,
          speed: 6 + Math.random() * 4,
          alpha: 1,
          active: true,
        });
      }

      for (const ss of shootingStars) {
        if (!ss.active) continue;
        ss.x += ss.speed;
        ss.y += ss.speed * 0.6;
        ss.alpha -= 0.015;
        if (ss.alpha <= 0) { ss.active = false; continue; }

        const grad = ctx.createLinearGradient(ss.x, ss.y, ss.x - ss.len * 0.7, ss.y - ss.len * 0.4);
        grad.addColorStop(0, `rgba(130, 255, 200, ${ss.alpha})`);
        grad.addColorStop(1, "transparent");
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(ss.x - ss.len * 0.7, ss.y - ss.len * 0.4);
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Deep space gradient */}
      <div className="absolute inset-0 bg-background" />

      {/* Nebula glow layers */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%]"
          style={{
            animation: "spin 200s linear infinite",
            background: `
              radial-gradient(ellipse 600px 200px at 30% 20%, hsl(155 100% 50% / 0.06), transparent),
              radial-gradient(ellipse 500px 300px at 70% 60%, hsl(270 80% 65% / 0.05), transparent),
              radial-gradient(ellipse 400px 250px at 50% 80%, hsl(185 80% 50% / 0.04), transparent)
            `,
          }}
        />
        <div
          className="absolute -top-1/3 -right-1/4 w-[150%] h-[150%]"
          style={{
            animation: "spin 280s linear infinite reverse",
            background: `
              radial-gradient(ellipse 500px 350px at 60% 30%, hsl(270 80% 50% / 0.04), transparent),
              radial-gradient(ellipse 350px 200px at 20% 70%, hsl(155 100% 40% / 0.03), transparent)
            `,
          }}
        />
      </div>

      {/* Planets */}
      {/* Large Saturn-like planet - top right, slow orbit */}
      <div
        className="absolute"
        style={{
          top: "8%",
          right: "12%",
          width: 80,
          height: 80,
          animation: "planet-orbit-1 40s ease-in-out infinite, planet-spin-1 20s linear infinite",
          opacity: 0.7,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, hsl(270 60% 45%), hsl(270 80% 20%) 60%, hsl(270 90% 10%))",
            boxShadow: "inset -8px -4px 12px hsl(270 90% 8%), 0 0 40px hsl(270 80% 50% / 0.15), 0 0 80px hsl(270 80% 50% / 0.08)",
            overflow: "hidden",
          }}
        >
          {/* Surface bands */}
          <div style={{ position: "absolute", top: "30%", left: 0, right: 0, height: 3, background: "hsl(270 40% 35% / 0.4)" }} />
          <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 5, background: "hsl(270 50% 30% / 0.3)" }} />
          <div style={{ position: "absolute", top: "65%", left: 0, right: 0, height: 2, background: "hsl(270 40% 40% / 0.25)" }} />
        </div>
        {/* Ring */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: 130,
            height: 20,
            borderRadius: "50%",
            border: "1.5px solid hsl(270 60% 50% / 0.3)",
            transform: "translate(-50%, -50%) rotateX(75deg) rotateZ(-15deg)",
            boxShadow: "0 0 8px hsl(270 60% 50% / 0.1)",
          }}
        />
      </div>

      {/* Small warm planet - left side, gentle drift */}
      <div
        className="absolute"
        style={{
          top: "55%",
          left: "6%",
          width: 40,
          height: 40,
          animation: "planet-orbit-2 35s ease-in-out infinite",
          opacity: 0.6,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 30%, hsl(25 90% 60%), hsl(15 80% 35%) 60%, hsl(10 70% 15%))",
            boxShadow: "inset -5px -3px 8px hsl(10 80% 10%), 0 0 25px hsl(25 80% 50% / 0.12)",
            animation: "planet-self-rotate 8s linear infinite",
          }}
        />
      </div>

      {/* Tiny moon - mid right, orbiting motion */}
      <div
        className="absolute"
        style={{
          top: "35%",
          right: "5%",
          width: 18,
          height: 18,
          animation: "planet-orbit-3 18s ease-in-out infinite",
          opacity: 0.5,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "radial-gradient(circle at 40% 35%, hsl(200 10% 70%), hsl(200 10% 35%) 70%)",
            boxShadow: "inset -3px -2px 5px hsl(200 10% 15%), 0 0 15px hsl(200 20% 60% / 0.1)",
            animation: "planet-self-rotate 6s linear infinite reverse",
          }}
        />
      </div>

      {/* Icy planet - bottom area */}
      <div
        className="absolute"
        style={{
          bottom: "15%",
          right: "25%",
          width: 55,
          height: 55,
          animation: "planet-orbit-4 30s ease-in-out infinite",
          opacity: 0.55,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, hsl(185 70% 60%), hsl(195 80% 30%) 55%, hsl(200 90% 12%))",
            boxShadow: "inset -6px -3px 10px hsl(200 90% 8%), 0 0 35px hsl(185 80% 50% / 0.1), 0 0 60px hsl(185 70% 40% / 0.05)",
            animation: "planet-self-rotate 12s linear infinite",
            overflow: "hidden",
          }}
        >
          {/* Ice caps */}
          <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 8, borderRadius: "0 0 50% 50%", background: "hsl(185 40% 80% / 0.3)" }} />
        </div>
      </div>

      {/* Canvas starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default SpaceBackground;
