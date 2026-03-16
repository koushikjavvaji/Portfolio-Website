import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<"countdown" | "launch" | "exit">("countdown");
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (phase === "countdown" && count > 0) {
      const t = setTimeout(() => setCount((c) => c - 1), 600);
      return () => clearTimeout(t);
    }
    if (phase === "countdown" && count === 0) {
      setPhase("launch");
    }
  }, [phase, count]);

  useEffect(() => {
    if (phase === "launch") {
      const t = setTimeout(() => setPhase("exit"), 1200);
      return () => clearTimeout(t);
    }
    if (phase === "exit") {
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? null : null}
      <motion.div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        animate={phase === "exit" ? { opacity: 0, scale: 1.1 } : { opacity: 1, scale: 1 }}
      >
        {/* Stars background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 2 + 1,
                height: Math.random() * 2 + 1,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: "hsl(200 20% 80%)",
                opacity: Math.random() * 0.6 + 0.2,
                animation: `blink ${1 + Math.random() * 2}s ease-in-out infinite ${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Rocket */}
        <motion.div
          className="relative z-10"
          animate={
            phase === "launch"
              ? { y: -800, scale: 0.5 }
              : { y: 0, scale: 1 }
          }
          transition={
            phase === "launch"
              ? { duration: 1.2, ease: [0.45, 0, 0.55, 1] }
              : {}
          }
        >
          {/* Rocket body */}
          <div className="relative flex flex-col items-center">
            {/* Nose cone */}
            <div
              className="w-0 h-0"
              style={{
                borderLeft: "16px solid transparent",
                borderRight: "16px solid transparent",
                borderBottom: "28px solid hsl(0 0% 90%)",
              }}
            />
            {/* Body */}
            <div
              className="w-8 rounded-b-sm relative overflow-hidden"
              style={{
                height: 48,
                background: "linear-gradient(180deg, hsl(0 0% 90%), hsl(0 0% 80%))",
              }}
            >
              {/* Window */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-2 w-3.5 h-3.5 rounded-full"
                style={{
                  background: "radial-gradient(circle at 40% 40%, hsl(200 80% 70%), hsl(220 80% 40%))",
                  boxShadow: "0 0 6px hsl(200 80% 60% / 0.5)",
                }}
              />
              {/* Stripe */}
              <div
                className="absolute bottom-3 left-0 right-0 h-2"
                style={{ background: "hsl(0 70% 50%)" }}
              />
            </div>
            {/* Fins */}
            <div className="relative w-16 flex justify-between" style={{ marginTop: -4 }}>
              <div
                className="w-0 h-0"
                style={{
                  borderTop: "12px solid hsl(0 70% 50%)",
                  borderLeft: "10px solid transparent",
                  borderBottom: "0",
                  borderRight: "0",
                }}
              />
              <div
                className="w-0 h-0"
                style={{
                  borderTop: "12px solid hsl(0 70% 50%)",
                  borderRight: "10px solid transparent",
                  borderBottom: "0",
                  borderLeft: "0",
                }}
              />
            </div>

            {/* Flame */}
            <motion.div
              className="flex flex-col items-center"
              animate={
                phase === "launch"
                  ? { scaleY: [1, 2.5, 1.5, 3, 2], opacity: 1 }
                  : { scaleY: [0.6, 1, 0.6], opacity: [0.4, 0.8, 0.4] }
              }
              transition={{ duration: 0.3, repeat: Infinity }}
              style={{ originY: 0 }}
            >
              <div
                className="w-4 rounded-b-full"
                style={{
                  height: phase === "launch" ? 40 : 16,
                  background: "linear-gradient(180deg, hsl(40 100% 60%), hsl(25 100% 55%), hsl(0 90% 50%))",
                  filter: "blur(1px)",
                  transition: "height 0.3s",
                }}
              />
              <div
                className="w-2 rounded-b-full -mt-1"
                style={{
                  height: phase === "launch" ? 20 : 8,
                  background: "linear-gradient(180deg, hsl(50 100% 70%), hsl(35 100% 55%))",
                  filter: "blur(2px)",
                  transition: "height 0.3s",
                }}
              />
            </motion.div>
          </div>

          {/* Smoke particles on launch */}
          {phase === "launch" && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: 6 + Math.random() * 10,
                    height: 6 + Math.random() * 10,
                    background: `hsl(0 0% ${70 + Math.random() * 20}% / ${0.3 + Math.random() * 0.3})`,
                    filter: "blur(3px)",
                  }}
                  initial={{ x: 0, y: 0, scale: 0.5, opacity: 0.6 }}
                  animate={{
                    x: (Math.random() - 0.5) * 80,
                    y: 30 + Math.random() * 60,
                    scale: 2 + Math.random() * 2,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.8 + Math.random() * 0.6,
                    repeat: Infinity,
                    delay: Math.random() * 0.5,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Text */}
        <motion.div
          className="relative z-10 mt-12 text-center"
          animate={phase === "launch" ? { opacity: 0, y: 20 } : {}}
          transition={{ duration: 0.4 }}
        >
          {phase === "countdown" && count > 0 ? (
            <motion.span
              key={count}
              className="text-4xl font-bold font-mono text-primary"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {count}
            </motion.span>
          ) : phase === "countdown" ? (
            <motion.span
              className="text-2xl font-bold font-mono text-primary"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              LAUNCH! 🚀
            </motion.span>
          ) : null}
          <p className="text-sm text-muted-foreground mt-3 font-mono">
            {phase === "countdown" ? "Initializing portfolio..." : ""}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
