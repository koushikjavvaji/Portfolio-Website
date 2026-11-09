import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download, Mail, Mic } from "lucide-react";
import { useTranscript } from "@/hooks/useTranscript";
import { getLevel, isMicActive, startMic, stopMic, subscribeMic } from "@/lib/micLevel";
import { useRatings, type Ratings } from "@/hooks/useRatings";

const Stat = ({ label, value, className }: { label: string; value: number; className: string }) => (
  <div className="glass rounded-lg px-4 py-3 text-left min-w-[96px]">
    <div className="text-xs font-mono text-muted-foreground">{label}</div>
    <div className={`text-2xl font-semibold ${className}`}>{value}</div>
  </div>
);

const LevelMeter = () => {
  const refs = useRef<(HTMLSpanElement | null)[]>([]);
  useEffect(() => {
    let raf = 0;
    const tick = (t: number) => {
      const l = getLevel();
      refs.current.forEach((el, i) => {
        if (el) el.style.height = `${4 + l * 16 * (0.6 + 0.4 * Math.sin(t / 120 + i * 1.3) ** 2)}px`;
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <span className="inline-flex items-center gap-0.5 h-5">
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} ref={(el) => (refs.current[i] = el)} className="w-0.5 rounded-full bg-primary" style={{ height: 4 }} />
      ))}
    </span>
  );
};

const MicButton = () => {
  const on = useSyncExternalStore(subscribeMic, isMicActive);
  const [denied, setDenied] = useState(false);
  const toggle = async () => {
    if (on) return stopMic();
    setDenied(!(await startMic()));
  };
  return (
    <div className="flex flex-col items-center">
      <button
        onClick={toggle}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg glass glass-hover font-mono text-sm ${
          on ? "ring-1 ring-primary" : ""
        }`}
        title="Speak and watch the background react"
      >
        {on ? <LevelMeter /> : <Mic size={16} className="text-primary" />}
        {denied ? "Mic blocked" : on ? "Listening… tap to stop" : "Try voice mode"}
      </button>
    </div>
  );
};

const TranscriptBox = () => {
  const on = useSyncExternalStore(subscribeMic, isMicActive);
  const { text, supported } = useTranscript(on);
  if (!on) return null;
  return (
    <div className="glass rounded-xl px-5 py-4 max-w-xl mx-auto mb-6 text-left min-h-[3.5rem]">
      <div className="text-xs font-mono text-muted-foreground mb-1">live transcript</div>
      <p className="text-base leading-relaxed">
        {!supported
          ? "Live transcript isn't supported in this browser. Try Chrome, Edge or Safari."
          : text || <span className="text-muted-foreground">Say something…</span>}
      </p>
    </div>
  );
};

const HeroSection = () => {
  const { ratings } = useRatings();
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden z-0 mb-0"
      style={{ isolation: "isolate" }}
    >
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
          <span className="text-gradient ">
            Javvaji Venkata Koushik
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
        >
          Software Engineer · AI Voice Agents · Competitive Programmer · Ex-Pine Labs
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
          <MicButton />
        </motion.div>

        <TranscriptBox />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <Stat label="Codeforces peak" value={ratings.codeforces.peak} className="text-blue-600" />
          <Stat label="CodeChef peak" value={ratings.codechef.peak} className="text-amber-600" />
          {ratings.leetcode.peak > 0 && (
            <Stat label="LeetCode peak" value={ratings.leetcode.peak} className="text-orange-600" />
          )}
          <Stat label="AtCoder peak" value={ratings.atcoder.peak} className="text-emerald-600" />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
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
