import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Command,
  Search,
  ExternalLink,
  Mail,
  Github,
  Trophy,
  Code,
  X,
} from "lucide-react";

const commands = [
  {
    label: "View Codeforces Profile",
    icon: Code,
    action: () => window.open("https://codeforces.com/profile/KVK18", "_blank"),
    category: "Profiles",
  },
  {
    label: "View LeetCode Profile",
    icon: Code,
    action: () => window.open("https://leetcode.com/u/JVKoushik/", "_blank"),
    category: "Profiles",
  },
  {
    label: "View LinkedIn",
    icon: ExternalLink,
    action: () =>
      window.open(
        "https://www.linkedin.com/in/koushik-javvaji",
        "_blank",
      ),
    category: "Profiles",
  },
  {
    label: "View GitHub",
    icon: Github,
    action: () => window.open("https://github.com/koushikjavvaji", "_blank"),
    category: "Profiles",
  },
  {
    label: "Send Email",
    icon: Mail,
    action: () => window.open("mailto:javvajikoushik2004@gmail.com"),
    category: "Contact",
  },
  {
    label: "Go to Stats",
    icon: Trophy,
    action: () =>
      document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" }),
    category: "Navigate",
  },
  {
    label: "Go to Projects",
    icon: Code,
    action: () =>
      document
        .getElementById("projects")
        ?.scrollIntoView({ behavior: "smooth" }),
    category: "Navigate",
  },
  {
    label: "Go to Achievements",
    icon: Trophy,
    action: () =>
      document
        .getElementById("achievements")
        ?.scrollIntoView({ behavior: "smooth" }),
    category: "Navigate",
  },
  {
    label: "Go to Experience",
    icon: ExternalLink,
    action: () =>
      document
        .getElementById("experience")
        ?.scrollIntoView({ behavior: "smooth" }),
    category: "Navigate",
  },
  {
    label: "Go to Skills",
    icon: Code,
    action: () =>
      document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
    category: "Navigate",
  },
  {
    label: "Go to Education",
    icon: Trophy,
    action: () =>
      document
        .getElementById("education")
        ?.scrollIntoView({ behavior: "smooth" }),
    category: "Navigate",
  },
  {
    label: "Go to Contact",
    icon: Mail,
    action: () =>
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" }),
    category: "Navigate",
  },
];

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()),
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setSelected(0);
      }
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      }
      if (e.key === "Enter" && filtered[selected]) {
        filtered[selected].action();
        setOpen(false);
      }
    },
    [open, filtered, selected],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const grouped = filtered.reduce<Record<string, typeof commands>>(
    (acc, cmd) => {
      if (!acc[cmd.category]) acc[cmd.category] = [];
      acc[cmd.category].push(cmd);
      return acc;
    },
    {},
  );

  return (
    <>
      {/* Floating hint */}
      <motion.button
        onClick={() => {
          setOpen(true);
          setQuery("");
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5 }}
        className="fixed bottom-6 right-6 z-50 glass glass-hover rounded-xl px-3 py-2 flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
      >
        <Command size={16} className="text-primary" />
        <span className="hidden sm:inline text-lg font-semibold text-primary leading-none">
          K
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15 }}
              className="fixed top-[20%] left-1/2 -translate-x-1/2 w-[90vw] max-w-lg z-[101] glass rounded-xl border border-border overflow-hidden shadow-2xl"
            >
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Search size={16} className="text-muted-foreground shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent text-sm text-foreground font-mono outline-none placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="max-h-[300px] overflow-y-auto py-2">
                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    <div className="px-4 py-1.5 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                      {category}
                    </div>
                    {items.map((cmd) => {
                      const globalIdx = filtered.indexOf(cmd);
                      return (
                        <button
                          key={cmd.label}
                          onClick={() => {
                            cmd.action();
                            setOpen(false);
                          }}
                          onMouseEnter={() => setSelected(globalIdx)}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-mono transition-colors ${
                            globalIdx === selected
                              ? "bg-primary/10 text-primary"
                              : "text-foreground hover:bg-muted"
                          }`}
                        >
                          <cmd.icon size={14} className="shrink-0" />
                          {cmd.label}
                        </button>
                      );
                    })}
                  </div>
                ))}
                {filtered.length === 0 && (
                  <p className="px-4 py-6 text-sm text-muted-foreground text-center font-mono">
                    No results found.
                  </p>
                )}
              </div>
              <div className="border-t border-border px-4 py-2 flex items-center gap-4 text-[10px] font-mono text-muted-foreground">
                <span>↑↓ navigate</span>
                <span>↵ select</span>
                <span>esc close</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
