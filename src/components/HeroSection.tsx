import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download, Mail } from "lucide-react";
import FloatingGeometry from "./FloatingGeometry";
import { useRatings, type Ratings } from "@/hooks/useRatings";

const buildLines = (r: Ratings) => [
  { prefix: "const", text: ' name = "Javvaji Venkata Koushik";', delay: 0 },
  {
    prefix: "const",
    text: ' achievement = "2× ICPC Regionalist";',
    delay: 0.8,
  },
  {
    prefix: "const",
    text: [
      { value: ' previously = "Software Engineer @ ' },
      { value: "Pine Labs", className: "text-primary" },
      { value: '";' },
    ],
    delay: 1.6,
  },
  {
    prefix: "const",
    text: ' status = "open to new opportunities";',
    delay: 2.4,
  },
  {
    prefix: "const",
    text: [
      { value: " peak = { cf: " },
      { value: String(r.codeforces.peak), className: "text-blue-400" },
      { value: ", cc: " },
      { value: String(r.codechef.peak), className: "text-amber-400" },
      { value: ", lc: " },
      { value: String(r.leetcode.peak), className: "text-orange-400" },
      { value: ", ac: " },
      { value: String(r.atcoder.peak), className: "text-emerald-400" },
      { value: " };" },
    ],
    delay: 3.2,
  },
  {
    prefix: "//",
    text: " Ready to build something extraordinary.",
    delay: 4.0,
  },
];

const TypingLine = ({ prefix, text, delay }) => {
  const [displayed, setDisplayed] = useState(0);
  const [started, setStarted] = useState(false);

  const segments = Array.isArray(text) ? text : [{ value: text }];

  const full = segments.map((s) => s.value).join("");

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= full.length) {
        setDisplayed(i);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [started]);

  if (!started) return null;

  let remaining = displayed;

  const isComment = prefix === "//";

  return (
    <div className="font-mono text-sm md:text-base leading-relaxed">
      <span className={isComment ? "text-muted-foreground" : "text-accent"}>
        {prefix}
      </span>

      {segments.map((seg, i) => {
        const take = Math.min(seg.value.length, remaining);
        remaining -= take;
        if (take <= 0) return null;

        return (
          <span
            key={i}
            className={
              isComment ? "text-muted-foreground" : seg.className || "text-foreground"
            }
          >
            {seg.value.slice(0, take)}
          </span>
        );
      })}

      {displayed < full.length && (
        <span className="terminal-cursor text-primary">▎</span>
      )}
    </div>
  );
};

const HeroSection = () => {
  const { ratings } = useRatings();
  const lines = buildLines(ratings);
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden z-0 mb-0"
      style={{ isolation: "isolate" }}
    >
      <FloatingGeometry />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-mono text-muted-foreground">
              open to new opportunities
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-2"
        >
          <span className="text-gradient drop-shadow-[0_0_30px_hsl(252,95%,68%,0.35)]">
            Javvaji Venkata Koushik
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
        >
          Backend &amp; Systems Engineer · Competitive Programmer · Ex-Pine Labs
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <a
            href="/Koushik_Javvaji_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-mono text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Download size={16} /> Resume
          </a>
          <a
            href="mailto:javvajikoushik2004@gmail.com"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg glass glass-hover font-mono text-sm"
          >
            <Mail size={16} className="text-primary" /> Get in touch
          </a>
        </motion.div>

        {/* Terminal window */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1.0, ease: "easeOut" }}
          className="glass rounded-xl overflow-hidden text-left max-w-2xl mx-auto"
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <div className="w-3 h-3 rounded-full bg-primary/40" />
            <div className="w-3 h-3 rounded-full bg-primary/60" />
            <span className="text-xs font-mono text-muted-foreground ml-2">
              ~/javvaji-venkata-koushik/portfolio
            </span>
          </div>
          <div className="p-6 space-y-2">
            {lines.map((line, i) => (
              <TypingLine key={i} {...line} />
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="mx-auto text-muted-foreground" size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
