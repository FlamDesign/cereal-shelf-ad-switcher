import { act, cleanup, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MomentBanner } from "@/components/MomentBanner";
import { useMomentPlayback } from "@/hooks/use-moment-playback";

beforeEach(() => vi.useFakeTimers());
afterEach(() => { cleanup(); vi.useRealTimers(); });
const tick = (ms: number) => act(() => { vi.advanceTimersByTime(ms); });

describe("10-second Flicks cycle", () => {
  it("switches the selected button and embed every 10 seconds and loops", () => {
    render(<MomentBanner />);
    tick(9999);
    expect(screen.getByTitle("After Practice")).toBeInTheDocument();
    tick(1);
    expect(screen.getByTitle("Around the Table")).toHaveAttribute("src", "/ads/around-the-table.html");
    expect(screen.getByRole("button", { name: "Around the Table" })).toHaveAttribute("aria-pressed", "true");
    for (const name of ["At the Park", "On the Road", "After Practice", "Around the Table"]) {
      tick(10000);
      expect(screen.getByTitle(name)).toBeInTheDocument();
    }
  });
  it("tapping restarts a full 10 seconds without pausing or stacking the old timer", () => {
    render(<MomentBanner />);
    tick(7000);
    fireEvent.click(screen.getByRole("button", { name: "At the Park" }));
    tick(9999);
    expect(screen.getByTitle("At the Park")).toBeInTheDocument();
    tick(1);
    expect(screen.getByTitle("On the Road")).toBeInTheDocument();
  });
  it("tapping the active moment reloads the embed and restarts its timer", () => {
    render(<MomentBanner />);
    const oldEmbed = screen.getByTitle("After Practice");
    tick(7000);
    fireEvent.click(screen.getByRole("button", { name: "After Practice" }));
    expect(screen.getByTitle("After Practice")).not.toBe(oldEmbed);
    tick(9999);
    expect(screen.getByTitle("After Practice")).toBeInTheDocument();
    tick(1);
    expect(screen.getByTitle("Around the Table")).toBeInTheDocument();
  });
  it("native ended advances early and cancels the preceding fallback", () => {
    const { result } = renderHook(() => useMomentPlayback(4));
    tick(3000);
    act(() => { result.current.advance(); result.current.advance(); });
    expect(result.current.idx).toBe(1);
    tick(9999);
    expect(result.current.idx).toBe(1);
    tick(1);
    expect(result.current.idx).toBe(2);
  });
  it("clears the only timer on unmount", () => {
    const { unmount } = renderHook(() => useMomentPlayback(4));
    expect(vi.getTimerCount()).toBe(1);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});