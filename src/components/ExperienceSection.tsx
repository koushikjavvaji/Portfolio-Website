import { motion } from "framer-motion";
import { Briefcase, Users, Code } from "lucide-react";

const experiences = [
  {
    title: "Software Engineer",
    company: "Pine Labs (Mosambee)",
    period: "Sep 2025 – Present",
    icon: Users,
    location: "Mumbai, India",
    description: [
      "Designed and implemented an IMPS-based Instant Payout platform with payout previews, partial/full settlements, and configurable workflows. Redis-backed status caching avoided repeated database reads; deployed to 3,000+ merchants processing ₹6–7 Cr daily at 280 ms p99 latency.",
      "Built idempotent, retry-safe payout processing with exponential backoff and dead-letter queues, guaranteeing exactly-once settlement on API failures; added reconciliation to resolve state mismatches against partner data.",
      "Migrated payout services from blocking RestTemplate to Spring WebFlux + Netty with asynchronous downstream calls and non-blocking processing, raising throughput from 120 to 180 requests/sec and cutting thread usage by 50%.",
      "Replaced a manual Excel-driven settlement workflow with a configurable scheduling engine supporting admin-defined windows, merchant/global rules, and day-of-week scheduling—cutting batch processing time from 45 minutes to 12 minutes.",
      "Extended Metagrox, a GraphQL reporting platform, with queries consolidating multiple REST requests into a single fetch, reducing dashboard latency from 800 ms to 300 ms.",
      "Implemented chargeback processing and real-time transaction cancellation, improving accuracy of the AI-driven Settlement Fraud Risk Manager (SFRM) for pre-payout risk screening.",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-primary mb-2 block">
            // experience
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Where I've <span className="text-gradient">Contributed</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative pl-16 md:pl-20"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full bg-background border-2 border-primary glow-primary" />

                <div className="glass glass-hover rounded-xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <exp.icon className="text-primary" size={18} />
                      <h3 className="text-lg font-semibold text-foreground">
                        {exp.title}
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground mt-1 md:mt-0">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-primary font-mono mb-3">
                    {exp.company} · {exp.location}
                  </p>
                  <ul className="space-y-2">
                    {exp.description.map((desc, j) => (
                      <li
                        key={j}
                        className="text-sm text-muted-foreground flex gap-2"
                      >
                        <span className="text-primary mt-1 shrink-0">›</span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
