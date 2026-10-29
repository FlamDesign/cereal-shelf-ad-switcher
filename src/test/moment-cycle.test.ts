import { describe, it, expect } from "vitest";
import { nextMomentIndex, AUTO_ADVANCE_MS, RESUME_AFTER_MS } from "@/lib/moment-cycle";

describe("moment auto-advance", () => {
  it("advances every 10 seconds", () => expect(AUTO_ADVANCE_MS).toBe(10000));
  it("resumes after 30 seconds without interaction", () => expect(RESUME_AFTER_MS).toBe(30000));
  it("loops from On the road back to After practice", () => {
    expect(nextMomentIndex(0, 4)).toBe(1);
    expect(nextMomentIndex(3, 4)).toBe(0);
  });
});
