import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MomentBanner } from "@/components/MomentBanner";
import { FlickSlot } from "@/components/FlickSlot";
import { nextMomentIndex } from "@/lib/moment-cycle";

afterEach(cleanup);

describe("portrait moment playback", () => {
  it("starts with After Practice and jumps immediately to the tapped moment", () => {
    render(<MomentBanner />);
    expect(screen.getByRole("button", { name: "After Practice" })).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "At the Park" }));
    expect(screen.getByTitle("At the Park")).toHaveAttribute("src", "/ads/at-the-park.html");
    expect(screen.getByRole("button", { name: "At the Park" })).toHaveAttribute("aria-pressed", "true");
  });
  it("autoplays actual media muted and inline and advances only on completion", () => {
    const onEnded = vi.fn();
    render(<FlickSlot src="/ads/after-practice.html" videoSrc="/test-video.mp4" title="After Practice" onEnded={onEnded} />);
    const video = screen.getByLabelText("After Practice") as HTMLVideoElement;
    expect(video.autoplay).toBe(true);
    expect(video.muted).toBe(true);
    expect(video.playsInline).toBe(true);
    expect(onEnded).not.toHaveBeenCalled();
    fireEvent.ended(video);
    expect(onEnded).toHaveBeenCalledTimes(1);
  });
  it("continues from the selected moment and loops after On the Road", () => {
    expect(nextMomentIndex(2, 4)).toBe(3);
    expect(nextMomentIndex(3, 4)).toBe(0);
  });
});