import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useTranscript } from "./useTranscript";

afterEach(() => vi.unstubAllGlobals());

describe("useTranscript", () => {
  it("reports unsupported browsers", () => {
    const { result } = renderHook(() => useTranscript(true));
    expect(result.current.supported).toBe(false);
    expect(result.current.text).toBe("");
  });

  it("collects recognised text and stops on cleanup", () => {
    let instance: { onresult: (e: unknown) => void; stop: () => void } | undefined;
    const stop = vi.fn();
    class FakeRec {
      continuous = false;
      interimResults = false;
      lang = "";
      onresult: ((e: unknown) => void) | null = null;
      onend = null;
      onerror = null;
      start = vi.fn();
      stop = stop;
      constructor() {
        instance = this as never;
      }
    }
    vi.stubGlobal("webkitSpeechRecognition", FakeRec);

    const { result, unmount } = renderHook(() => useTranscript(true));
    expect(result.current.supported).toBe(true);

    act(() => {
      instance!.onresult({ results: [{ 0: { transcript: "hello " } }, { 0: { transcript: "world" } }] });
    });
    expect(result.current.text).toBe("hello world");

    unmount();
    expect(stop).toHaveBeenCalled();
  });

  it("does not start when not listening", () => {
    const ctor = vi.fn();
    vi.stubGlobal("webkitSpeechRecognition", ctor);
    renderHook(() => useTranscript(false));
    expect(ctor).not.toHaveBeenCalled();
  });
});
