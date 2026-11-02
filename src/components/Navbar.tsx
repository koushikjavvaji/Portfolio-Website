import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Stats", href: "#stats" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    navItems.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-background/80 backdrop-blur-xl border-b border-border/30 py-3"
          : "py-5"
      }`}
    >
      <motion.div
        style={{ scaleX: progress }}
        className="absolute bottom-0 left-0 right-0 h-px origin-left bg-primary"
      />
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#" className="font-mono text-sm font-bold text-primary">
          {"<koushik />"}
        </a>
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm transition-colors font-mono ${
                active === item.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/Koushik_Javvaji_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline text-xs font-mono px-4 py-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-colors"
          >
            resume
          </a>
          <button
            className="md:hidden p-2 text-foreground"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-6 pt-4 pb-2 flex flex-col">
              {[...navItems, { label: "Resume", href: "/Koushik_Javvaji_Resume.pdf" }].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="py-3 font-mono text-sm text-muted-foreground hover:text-primary border-b border-border/30 last:border-0"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
