import { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import FloatingAccents from "./FloatingAccents";
const stats = [
  {
    platform: "Codeforces",
    rating: "1626",
    rank: "Expert",
    detail: "AIR <1500 · 1000+ solved",
    color: "text-blue-500",
    url: "https://codeforces.com/profile/KVK18",
  },
  {
    platform: "CodeChef",
    rating: "1960",
    rank: "4 Star",
    detail: "AIR 1715",
    color: "text-purple-400",
    url: "https://www.codechef.com/users/kvk18",
  },
  {
    platform: "LeetCode",
    rating: "1979",
    rank: "Knight",
    detail: "Top 2%",
    color: "text-orange-500",
    url: "https://leetcode.com/u/JVKoushik/",
  },
];

const AnimatedNumber = ({
  value,
  inView,
}: {
  value: string;
  inView: boolean;
}) => {
  const num = parseInt(value);

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
    <motion.span className="font-mono text-5xl md:text-6xl font-bold">
      {display.toLocaleString()}
    </motion.span>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="stats" className="py-24 px-6 relative overflow-hidden">
      <FloatingAccents variant="primary" density="medium" />
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
            Ratings <span className="text-gradient">Stats</span>
          </h2>
        </motion.div>

        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.a
              key={stat.platform}
              href={stat.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass glass-hover rounded-xl p-8 block cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                  {stat.platform}
                </span>
                <span
                  className={`text-xs font-mono px-3 py-1 rounded-full border border-border ${stat.color}`}
                >
                  {stat.rank}
                </span>
              </div>
              <div className={stat.color}>
                <AnimatedNumber value={stat.rating} inView={inView} />
              </div>
              <p className="text-sm text-muted-foreground mt-4 font-mono">
                {stat.detail}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
                  View Profile →
                </span>
              </div>
              <div className="mt-3 h-1 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    i === 0
                      ? "bg-blue-500"
                      : i === 1
                        ? "bg-purple-400"
                        : i === 2
                          ? "bg-orange-500"
                          : "bg-blue-500"
                  }`}
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${(parseInt(stat.rating) / 3000) * 100}%`,
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
              &gt; 2000+
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
