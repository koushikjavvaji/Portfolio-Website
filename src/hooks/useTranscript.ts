import { useEffect, useState } from "react";

/* Live speech-to-text using the browser's built-in SpeechRecognition (free, no API key).
   Supported in Chrome/Edge/Safari; unsupported browsers just report supported = false. */

type Result = { 0: { transcript: string } };
type RecEvent = { results: ArrayLike<Result> };

type Rec = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((e: RecEvent) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
};

const getCtor = (): (new () => Rec) | null => {
  const w = window as unknown as Record<string, (new () => Rec) | undefined>;
  return w.SpeechRecognition || w.webkitSpeechRecognition || null;
};

export const useTranscript = (listening: boolean) => {
  const [text, setText] = useState("");
  const supported = typeof window !== "undefined" && !!getCtor();

  useEffect(() => {
    const Ctor = getCtor();
    if (!listening || !Ctor) return;

    setText("");
    const rec = new Ctor();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";
    let stopped = false;

    rec.onresult = (e) => {
      let out = "";
      for (let i = 0; i < e.results.length; i++) out += e.results[i][0].transcript;
      setText(out.trim());
    };
    // Chrome ends sessions after a pause; restart while still listening.
    rec.onend = () => {
      if (!stopped) {
        try {
          rec.start();
        } catch {
          /* already started */
        }
      }
    };
    rec.onerror = () => {};
    try {
      rec.start();
    } catch {
      /* ignore */
    }

    return () => {
      stopped = true;
      rec.onend = null;
      rec.stop();
    };
  }, [listening]);

  return { text, supported };
};
