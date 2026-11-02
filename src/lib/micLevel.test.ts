import { afterEach, describe, expect, it, vi } from "vitest";
import { getBins, getLevel, isMicActive, startMic, stopMic, subscribeMic } from "./micLevel";

afterEach(() => {
  stopMic();
  vi.unstubAllGlobals();
});

describe("micLevel", () => {
  it("is inactive with zero level by default", () => {
    expect(isMicActive()).toBe(false);
    expect(getBins()).toBeNull();
    expect(getLevel()).toBe(0);
  });

  it("returns false and stays inactive when permission is denied", async () => {
    vi.stubGlobal("navigator", {
      mediaDevices: { getUserMedia: vi.fn().mockRejectedValue(new Error("denied")) },
    });
    expect(await startMic()).toBe(false);
    expect(isMicActive()).toBe(false);
  });

  it("notifies subscribers and stops tracks when the mic starts and stops", async () => {
    const stopTrack = vi.fn();
    vi.stubGlobal("navigator", {
      mediaDevices: { getUserMedia: vi.fn().mockResolvedValue({ getTracks: () => [{ stop: stopTrack }] }) },
    });
    const analyser = {
      fftSize: 0,
      smoothingTimeConstant: 0,
      frequencyBinCount: 4,
      connect: vi.fn(),
      getByteFrequencyData: (a: Uint8Array) => a.fill(128),
    };
    vi.stubGlobal(
      "AudioContext",
      class {
        createMediaStreamSource() {
          return { connect: vi.fn() };
        }
        createAnalyser() {
          return analyser;
        }
        resume() {
          return Promise.resolve();
        }
        close() {
          return Promise.resolve();
        }
      },
    );

    const seen: boolean[] = [];
    const unsub = subscribeMic((a) => seen.push(a));
    expect(await startMic()).toBe(true);
    expect(isMicActive()).toBe(true);
    expect(getLevel()).toBeGreaterThan(0);
    expect(getLevel()).toBeLessThanOrEqual(1);

    stopMic();
    expect(stopTrack).toHaveBeenCalled();
    expect(isMicActive()).toBe(false);
    expect(seen).toEqual([true, false]);
    unsub();
  });
});
