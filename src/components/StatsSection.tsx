import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useRatings, codechefStars, leetcodeTitle, atcoderKyu, titleCase } from "@/hooks/useRatings";
const profiles = [
  {
    key: "codeforces" as const,
    platform: "Codeforces",
    color: "text-blue-600",
    bar: "bg-blue-600",
    max: 3500,
    url: "https://codeforces.com/profile/KVK18",
  },
  {
    key: "codechef" as const,
    platform: "CodeChef",
    color: "text-amber-600",
    bar: "bg-amber-600",
    max: 3000,
    url: "https://www.codechef.com/users/kvk18",
  },
  {
    key: "leetcode" as const,
    platform: "LeetCode",
    color: "text-orange-600",
    bar: "bg-orange-600",
    max: 3500,
    url: "https://leetcode.com/u/JVK18/",
  },
  {
    key: "atcoder" as const,
    platform: "AtCoder",
    color: "text-emerald-600",
    bar: "bg-emerald-600",
    max: 3500,
    url: "https://atcoder.jp/users/KVK18",
  },
];

const AnimatedNumber = ({
  value,
  inView,
}: {
  value: number;
  inView: boolean;
}) => {
  const num = value;

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 2000 });

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [spring]);

  useEffect(() => {
    if (inView) motionValue.set(num);
  }, [inView, num, motionValue]);

  return (
    <motion.span className="font-mono text-4xl md:text-5xl font-bold">
      {display.toLocaleString()}
    </motion.span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { ratings, live } = useRatings();

  const totalSolved =
    (ratings.codeforces.solved ?? 0) +
    (ratings.codechef.solved ?? 0) +
    (ratings.leetcode.solved ?? 0) +
    (ratings.atcoder.solved ?? 0);

  const stats = profiles.map((p) => {
    const d = ratings[p.key];
    const rank =
      p.key === "codeforces"
        ? titleCase((d as typeof ratings.codeforces).rank ?? "expert")
        : p.key === "codechef"
          ? `${codechefStars(d.peak)}★`
          : p.key === "atcoder"
            ? atcoderKyu(d.peak)
            : d.peak > 0
              ? leetcodeTitle(d.peak)
              : null;
    return {
      ...p,
      rating: d.peak,
      solved: d.solved ?? 0,
      rank,
      detail: [
        p.key === "codeforces" && ratings.codeforces.airLabel
          ? `AIR ${ratings.codeforces.airLabel}`
          : null,
        p.key === "codechef" && ratings.codechef.airBest
          ? `AIR ${ratings.codechef.airBest}`
          : null,
        p.key === "leetcode" && ratings.leetcode.topPercent
          ? `Top ${ratings.leetcode.topPercent}%`
          : null,
        d.peak > 0 && d.solved ? `${d.solved.toLocaleString()} solved` : null,
      ]
        .filter(Boolean)
        .join(" · "),
      current: d.current,
    };
  });

  return (
    <section id="stats" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-primary mb-2 block">
            // competitive_programming
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Peak <span className="text-gradient">Ratings</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground font-mono flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${live ? "bg-emerald-600 animate-pulse" : "bg-muted-foreground"}`}
            />
            {live ? "synced live" : "cached"} · highest rating per platform
          </p>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.a
              key={stat.key}
              href={stat.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass glass-hover rounded-xl p-6 block cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                  {stat.platform}
                </span>
                {stat.rank && (
                  <span
                    className={`text-xs font-mono px-3 py-1 rounded-full border border-border ${stat.color}`}
                  >
                    {stat.rank}
                  </span>
                )}
              </div>
              <div className={stat.color}>
                {stat.rating > 0 ? (
                  <AnimatedNumber value={stat.rating} inView={inView} />
                ) : (
                  <>
                    <AnimatedNumber value={stat.solved} inView={inView} />
                    <span className="ml-2 text-sm font-mono text-muted-foreground">solved</span>
                  </>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-4 font-mono">
                {stat.detail}
              </p>
              {stat.current && (
                <p className="text-xs text-muted-foreground/70 mt-1 font-mono">
                  current {stat.current}
                </p>
              )}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
                  View Profile →
                </span>
              </div>
              <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${stat.bar}`}
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${(stat.rating / stat.max) * 100}%`,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.2,
                    ease: "easeOut",
                  }}
                />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Total problems solved */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-4 glass rounded-xl px-8 py-4">
            <span className="text-muted-foreground font-mono text-sm">
              total_problems_solved
            </span>
            <span className="text-gradient font-mono text-2xl font-bold">
              &gt; {totalSolved.toLocaleString()}+
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
