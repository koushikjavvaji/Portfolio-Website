import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import VoiceDemoSection, { DEMO } from "./VoiceDemoSection";

describe("VoiceDemoSection", () => {
  it("renders nothing until a demo source is configured", () => {
    const original = DEMO.src;
    DEMO.src = "";
    const { container } = render(<VoiceDemoSection />);
    expect(container).toBeEmptyDOMElement();
    DEMO.src = original;
  });

  it("renders a video player when a source is set", () => {
    DEMO.src = "/demo.mp4";
    const { container } = render(<VoiceDemoSection />);
    expect(container.querySelector("video")).toHaveAttribute("src", "/demo.mp4");
    DEMO.src = "";
  });

  it("renders an audio player for audio files", () => {
    DEMO.src = "/demo.mp3";
    const { container } = render(<VoiceDemoSection />);
    expect(container.querySelector("audio")).not.toBeNull();
    DEMO.src = "";
  });
});
