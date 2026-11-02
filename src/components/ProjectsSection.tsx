import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import FloatingAccents from "./FloatingAccents";

const projects = [
  {
    title: "DevHive – Multi-Agent AI Debugging War Room",
    description:
      "Built a GPT-style transformer from scratch (byte-level BPE, RoPE, grouped-query attention, SwiGLU, KV-cached inference) and trained it end-to-end; vectorized pair-counting with NumPy, cutting BPE training time by 30%. Independent LLM teammates diagnose a pasted bug concurrently, then run structured cross-critique rounds to converge on one fix.",
    tech: ["Python", "PyTorch", "FastAPI", "WebSockets", "SQLite", "pytest", "GitHub Actions", "Render"],
    link: "https://github.com/koushikjavvaji/devhive",
  },
  {
    title: "Hyperion HTTP Server",
    description:
      "High-performance HTTP server built from scratch in C++17. Custom kqueue event loop with a completion-based proactor architecture (submission queue, completion queue). Achieves 215,000+ req/sec with a custom HTTP parser, in-memory file cache, connection pooling, and live metrics dashboard.",
    tech: ["C++17", "CMake", "kqueue", "HTTP/1.1"],
    link: "https://github.com/koushikjavvaji/Hyperion-http-server",
  },
  {
    title: "DRAWR – Collaborative Drawing App",
    description:
      "Real-time collaborative canvas where multiple users draw simultaneously. Supports shape tools, freehand drawing, text annotations, and undo/redo with smooth WebSocket synchronization.",
    tech: [
      "Next.js",
      "TypeScript",
      "WebSockets",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "Turborepo",
    ],
    link: "https://github.com/koushikjavvaji/DRAWR",
    live: "https://koushik-drawr.vercel.app",
  },
  {
    title: "Solana Token Launchpad",
    description:
      "Decentralized platform for creating and deploying custom SPL tokens on Solana with Phantom wallet integration and a clean token minting flow.",
    tech: [
      "React.js",
      "Solana Web3.js",
      "Node.js",
      "Express.js",
      "Phantom Wallet",
      "Radix UI",
    ],
    link: "https://github.com/koushikjavvaji/solana-token-launchpad",
  },
  {
    title: "FinFlow – Payment Application",
    description:
      "Full-stack payment app where users can sign up, check their balance, search other users, and transfer money between accounts with secure JWT authentication and atomic transactions.",
    tech: [
      "React.js",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Zod",
    ],
    link: "https://github.com/koushikjavvaji/FinFlow",
    live: "https://koushik-finflow.vercel.app/",
  },
];
const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-6 relative overflow-hidden">
      <FloatingAccents variant="secondary" density="medium" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="font-mono text-sm text-primary mb-2 block">
            // projects
          </span>
          <h2 className="text-3xl md:text-4xl font-bold">
            Things I've <span className="text-gradient">Built</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass glass-hover rounded-xl p-6 group relative overflow-hidden"
            >
              {/* Hover gradient accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      title="Source"
                    >
                      <Github
                        size={16}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      />
                    </a>
                    {"live" in project && project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live demo`}
                        title="Live demo"
                      >
                        <ExternalLink
                          size={16}
                          className="text-muted-foreground hover:text-primary transition-colors"
                        />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-muted text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-12 text-center"
      >
        <a
          href="https://github.com/koushikjavvaji/?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 glass glass-hover rounded-lg font-mono text-sm"
        >
          <Github size={18} />
          View More on GitHub
        </a>
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
