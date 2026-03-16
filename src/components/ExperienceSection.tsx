import { motion } from "framer-motion";
import { Briefcase, Users, Code } from "lucide-react";

const experiences = [
  {
    title: "Software Engineer Intern",
    company: "Pine Labs (Mosambee)",
    period: "Sep 2025 - Current",
    icon: Users,
    location: "Remote",
    description: [
      "Designed a configurable retry framework for transaction posting using exponential backoff, timeout handling, and dead-letter queues, reducing manual reconciliation effort by ~30%.",
      "Implemented a real-time transaction cancellation system in the payment authorization service, enabling merchants to abort pending transactions and reducing payment disputes.",
      "Built an Instant Payout system enabling T+0 merchant settlements (vs T+1), accelerating merchant cash flow and supporting 1.8Cr+ daily payouts.",
      "Migrated payout service APIs from blocking RestTemplate to reactive WebFlux + Netty, improving throughput by ~35% in load testing and reducing thread usage by ~50% under high transaction load.",
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
                    {exp.company}
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
