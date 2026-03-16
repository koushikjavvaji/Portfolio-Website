import { motion } from "framer-motion";

interface FloatingAccentsProps {
  variant?: "primary" | "secondary" | "accent";
  density?: "low" | "medium";
}

const shapes = {
  primary: [
    { top: "10%", left: "5%", size: 60, rotate: 45, delay: 0 },
    { top: "70%", right: "8%", size: 40, rotate: 20, delay: 1 },
    { bottom: "15%", left: "12%", size: 30, rotate: -30, delay: 2 },
  ],
  secondary: [
    { top: "15%", right: "6%", size: 50, rotate: -15, delay: 0.5 },
    { bottom: "20%", left: "4%", size: 45, rotate: 60, delay: 1.5 },
    { top: "50%", right: "3%", size: 35, rotate: 10, delay: 0.8 },
  ],
  accent: [
    { top: "20%", left: "3%", size: 55, rotate: 30, delay: 0.3 },
    { bottom: "10%", right: "5%", size: 38, rotate: -45, delay: 1.2 },
  ],
};

const FloatingAccents = ({ variant = "primary", density = "medium" }: FloatingAccentsProps) => {
  const items = density === "low" ? shapes[variant].slice(0, 2) : shapes[variant];
  const colorClass = variant === "primary" ? "border-primary/20" : variant === "secondary" ? "border-secondary/20" : "border-accent/20";
  const glowColor = variant === "primary" ? "hsl(155 100% 50% / 0.08)" : variant === "secondary" ? "hsl(185 80% 50% / 0.08)" : "hsl(270 80% 65% / 0.08)";

  return (
    <>
      {items.map((shape, i) => (
        <motion.div
          key={i}
          className={`absolute pointer-events-none border ${colorClass} rounded-lg`}
          style={{
            top: shape.top,
            left: (shape as any).left,
            right: (shape as any).right,
            bottom: (shape as any).bottom,
            width: shape.size,
            height: shape.size,
            background: glowColor,
            backdropFilter: "blur(1px)",
          }}
          initial={{ opacity: 0, rotate: shape.rotate }}
          whileInView={{ opacity: 1, rotate: shape.rotate + 360 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: shape.delay }}
          animate={{
            y: [0, -15, 0, 10, 0],
            rotate: [shape.rotate, shape.rotate + 90, shape.rotate + 180, shape.rotate + 270, shape.rotate + 360],
          }}
        />
      ))}
    </>
  );
};

export default FloatingAccents;
