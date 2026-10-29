import { useCallback, useEffect, useRef, useState } from "react";
import { AUTO_ADVANCE_MS, nextMomentIndex } from "@/lib/moment-cycle";

export function useMomentPlayback(count: number) {
  const [playback, setPlayback] = useState({ idx: 0, cycle: 0 });
  const completedCycle = useRef(-1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearTimer = useCallback(() => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  const advance = useCallback(() => {
    // An ended event and the fallback must never advance the same play twice.
    if (completedCycle.current >= playback.cycle) return;
    completedCycle.current = playback.cycle;
    clearTimer();
    setPlayback((p) => ({ idx: nextMomentIndex(p.idx, count), cycle: p.cycle + 1 }));
  }, [playback.cycle, count, clearTimer]);

  useEffect(() => {
    timer.current = setTimeout(advance, AUTO_ADVANCE_MS);
    return clearTimer;
  }, [advance, clearTimer]);

  const pick = (idx: number) => {
    clearTimer();
    completedCycle.current = playback.cycle;
    setPlayback((p) => ({ idx, cycle: p.cycle + 1 }));
  };

  return { ...playback, pick, advance };
}