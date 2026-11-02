/* Shared microphone level (0..1) + frequency bins, used to drive the waveform background. */

type Listener = (active: boolean) => void;

let ctx: AudioContext | null = null;
let analyser: AnalyserNode | null = null;
let stream: MediaStream | null = null;
let data: Uint8Array<ArrayBuffer> | null = null;
let active = false;
const listeners = new Set<Listener>();

const emit = () => listeners.forEach((l) => l(active));

export const subscribeMic = (l: Listener) => {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
};

export const isMicActive = () => active;

export const startMic = async (): Promise<boolean> => {
  if (active) return true;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    ctx = new AudioContext();
    const src = ctx.createMediaStreamSource(stream);
    analyser = ctx.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.8;
    src.connect(analyser);
    await ctx.resume();
    data = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
    active = true;
    emit();
    return true;
  } catch {
    stopMic();
    return false;
  }
};

export const stopMic = () => {
  stream?.getTracks().forEach((t) => t.stop());
  ctx?.close().catch(() => {});
  ctx = null;
  analyser = null;
  stream = null;
  data = null;
  active = false;
  emit();
};

/** Returns frequency bins normalised to 0..1, or null when the mic is off. */
export const getBins = (): Uint8Array | null => {
  if (!active || !analyser || !data) return null;
  analyser.getByteFrequencyData(data);
  return data;
};

/** Voice level 0..1, boosted so normal speech clearly registers. */
export const getLevel = (): number => {
  const bins = getBins();
  if (!bins) return 0;
  let max = 0;
  let sum = 0;
  for (let i = 0; i < bins.length; i++) {
    sum += bins[i];
    if (bins[i] > max) max = bins[i];
  }
  const v = (sum / bins.length / 255) * 3 + (max / 255) * 0.6;
  return Math.min(1, v);
};
