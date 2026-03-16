import { motion } from "framer-motion";
import { Trophy, Medal, Award, Flame, ExternalLink } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "ICPC Regionals 2025 & 2026",
    description:
      "Qualified for ICPC Regionals twice and competed at Amritapuri in 2025 and 2026, solving 4 and 3 problems respectively",
    highlight: true,
    url: "https://icpc.global/",
  },
  {
    icon: Flame,
    title: "Meta Hacker Cup 2024",
    description:
      "Advanced to Round 2 (Global Rank 3173 among 22,000+ participants worldwide)",
    highlight: true,
    url: "https://www.facebook.com/codingcompetitions/hacker-cup",
  },
  {
    icon: Medal,
    title: "TCS CodeVita 2024",
    description:
      "Ranked 819 in Round 1 among 400,000+ participants and 332 in Round 2",
    highlight: false,
    url: "https://codevita.tcsapps.com",
  },
  {
    icon: Medal,
    title: "Petrichor 2025 — IIT Palakkad",
    description:
      "Secured 4th place in the institute-level competitive programming contest",
    highlight: false,
    url: "https://iitpkd.ac.in/events/petrichor-2025",
  },
  {
    icon: Medal,
    title: "Shaastra Programming Contest 2026 — IIT Madras",
    description: "Finalist qualified for the on-campus finals at IIT Madras",
    highlight: false,
    url: "https://www.shaastra.org",
  },
];

const AchievementsSection = () => {
  return (
    <section id="achievements" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-primary mb-2 block">
            // achievements
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Achieve<span className="text-gradient">ments</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {achievements.map((ach, i) => (
            <motion.a
              key={i}
              href={ach.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`glass glass-hover rounded-xl p-6 flex items-start gap-5 group cursor-pointer ${
                ach.highlight ? "border-primary/20" : ""
              }`}
            >
              <div
                className={`p-3 rounded-lg shrink-0 ${
                  ach.highlight
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <ach.icon size={22} />
              </div>
              <div className="flex-1">
                <h3
                  className={`font-semibold text-lg ${ach.highlight ? "text-primary" : "text-foreground"}`}
                >
                  {ach.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {ach.description}
                </p>
              </div>
              <div className="ml-auto shrink-0 flex items-center gap-3">
                {ach.highlight && (
                  <span className="text-xs font-mono px-3 py-1 rounded-full border border-primary/30 text-primary bg-primary/5">
                    featured
                  </span>
                )}
                <ExternalLink
                  size={16}
                  className="text-muted-foreground group-hover:text-primary transition-colors"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievementsSection;
