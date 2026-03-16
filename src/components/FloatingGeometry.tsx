import { motion } from "framer-motion";

/* Pure CSS/SVG floating geometry — no WebGL */

const FloatingGeometry = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
      {/* Rotating wireframe ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full border border-primary/10"
          style={{ transform: "rotateX(60deg)" }}
        />
      </motion.div>

      {/* Second ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full border border-secondary/10"
          style={{ transform: "rotateX(70deg) rotateY(20deg)" }}
        />
      </motion.div>

      {/* Third ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full border border-accent/8"
          style={{ transform: "rotateX(50deg) rotateY(-30deg)" }}
        />
      </motion.div>

      {/* Floating dots */}
      {[
        { x: "20%", y: "30%", size: 3, delay: 0, duration: 6 },
        { x: "75%", y: "25%", size: 2, delay: 1, duration: 8 },
        { x: "60%", y: "70%", size: 4, delay: 2, duration: 7 },
        { x: "35%", y: "65%", size: 2, delay: 0.5, duration: 9 },
        { x: "85%", y: "50%", size: 3, delay: 1.5, duration: 5 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/30"
          style={{ left: dot.x, top: dot.y, width: dot.size, height: dot.size }}
          animate={{ y: [-10, 10, -10], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: dot.duration, repeat: Infinity, delay: dot.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Center glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(155 100% 50% / 0.05), transparent 70%)",
        }}
      />
    </div>
  );
};

export default FloatingGeometry;
