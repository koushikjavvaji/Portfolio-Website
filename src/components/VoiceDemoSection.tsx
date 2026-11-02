import { motion } from "framer-motion";

/* Voice agent demo. Set DEMO to show this section; while both are empty it renders nothing.
   Put a recording in /public (e.g. public/voice-agent-demo.mp4) and set src below. */
export const DEMO = {
  src: "", // e.g. "/voice-agent-demo.mp4" (video) or an .mp3 for audio only
  poster: "", // optional preview image, e.g. "/voice-agent-poster.png"
  title: "AI voice agent in action",
  description: "A short recording of the voice agent I built.",
};

const VoiceDemoSection = () => {
  if (!DEMO.src) return null;
  const isAudio = /\.(mp3|wav|m4a|ogg)$/i.test(DEMO.src);

  return (
    <section id="demo" className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <span className="font-mono text-sm text-primary mb-2 block">// demo</span>
          <h2 className="text-3xl md:text-4xl font-bold">{DEMO.title}</h2>
          <p className="text-muted-foreground mt-3">{DEMO.description}</p>
        </motion.div>
        <div className="glass rounded-xl overflow-hidden p-2">
          {isAudio ? (
            <audio controls preload="none" src={DEMO.src} className="w-full" />
          ) : (
            <video
              controls
              preload="metadata"
              poster={DEMO.poster || undefined}
              src={DEMO.src}
              className="w-full rounded-lg"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default VoiceDemoSection;
