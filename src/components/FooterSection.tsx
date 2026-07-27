import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ExternalLink } from "lucide-react";

const FooterSection = () => {
  return (
    <footer id="contact" className="py-24 px-6 relative border-t border-border">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-sm text-primary mb-2 block">
            // contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground mb-10 max-w-md mx-auto">
            Open to internships, collaborations, and competitive programming
            discussions.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <motion.a
              href="mailto:javvajikoushik2004@gmail.com"
              whileHover={{ y: -2 }}
              className="glass glass-hover rounded-xl px-6 py-3 flex items-center gap-3 font-mono text-sm"
            >
              <Mail size={16} className="text-primary" />
              <span>javvajikoushik2004@gmail.com</span>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/koushik-javvaji"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="glass glass-hover rounded-xl px-6 py-3 flex items-center gap-3 font-mono text-sm"
            >
              <Linkedin size={16} className="text-secondary" />
              <span>LinkedIn</span>
            </motion.a>
            <motion.a
              href="https://github.com/koushikjavvaji"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="glass glass-hover rounded-xl px-6 py-3 flex items-center gap-3 font-mono text-sm"
            >
              <Github size={16} className="text-accent" />
              <span>GitHub</span>
            </motion.a>
            <motion.a
              href="https://www.codechef.com/users/kvk18"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="glass glass-hover rounded-xl px-6 py-3 flex items-center gap-3 font-mono text-sm"
            >
              <ExternalLink size={16} className="text-primary" />
              <span>CodeChef</span>
            </motion.a>
            <motion.a
              href="https://codeforces.com/profile/KVK18"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="glass glass-hover rounded-xl px-6 py-3 flex items-center gap-3 font-mono text-sm"
            >
              <ExternalLink size={16} className="text-secondary" />
              <span>Codeforces</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
