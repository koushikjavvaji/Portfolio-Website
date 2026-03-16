import { motion } from "framer-motion";
const skillCategories = [
  {
    title: "Languages",
    skills: [
      "C++",
      "Python",
      "Java",
      "JavaScript",
      "TypeScript",
      "SQL",
      "Bash",
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Spring Boot",
      "Spring MVC",
      "Spring Data JPA",
      "Hibernate",
      "GraphQL",
    ],
  },
  {
    title: "Systems Programming",
    skills: [
      "Socket Programming",
      "Non-blocking I/O (epoll/kqueue)",
      "Event-driven Architecture",
      "HTTP/1.1 Protocol",
      "Memory Management",
      "Lock-free Programming",
      "Multithreading",
    ],
  },
  {
    title: "Tools & Infrastructure",
    skills: [
      "Git",
      "Docker",
      "Kubernetes",
      "Redis",
      "PostgreSQL",
      "MongoDB",
      "Linux",
      "GitHub Actions",
      "Postman",
    ],
  },
  {
    title: "CONCEPTS",
    skills: [
      "Data Structures & Algorithms",
      "Competitive Programming",
      "Operating Systems",
      "Computer Networks",
      "Database Systems",
      "Distributed Systems",
      "System Design",
    ],
  },
];
const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-primary mb-2 block">
            // skills
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Tech <span className="text-gradient">Arsenal</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass rounded-xl p-6"
            >
              <h3 className="font-mono text-sm text-primary mb-4 uppercase tracking-widest">
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0, delay: 0 }}
                    whileHover={{
                      scale: 1.05,
                      backgroundColor: "hsl(155 100% 50% / 0.1)",
                    }}
                    className="px-3 py-1.5 rounded-lg border border-border text-sm text-foreground font-mono cursor-default transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
