import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { FlickSlot } from "@/components/FlickSlot";
import { nextMomentIndex } from "@/lib/moment-cycle";
import bg from "@/assets/hub/picnic-portrait.png.asset.json";
import font from "@/assets/hub/3a90540dc35e5382ba159fc56c774fd6.otf.asset.json";
import logo from "@/assets/hub/moment-maker-logo.png.asset.json";

const C = "var(--moment-red)";
type Moment = { id: string; label: string; icon: ReactNode; src: string; videoSrc?: string };

const icons: Record<string, ReactNode> = {
  "after-practice": (
    <>
      <path d="M22 15V11a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v4" fill="none" stroke={C} strokeWidth="4" strokeLinecap="round" />
      <rect x="7" y="15" width="50" height="12" rx="4" fill={C} />
      <rect x="9" y="29" width="46" height="28" rx="5" fill={C} />
      <rect x="28" y="23" width="8" height="9" rx="2" fill="var(--moment-plate)" />
      <rect x="14" y="38" width="9" height="4" rx="2" fill="var(--moment-plate)" />
      <rect x="41" y="38" width="9" height="4" rx="2" fill="var(--moment-plate)" />
      <rect x="9" y="27" width="46" height="2" fill="var(--moment-plate)" />
    </>
  ),
  "around-the-table": (
    <>
      <path d="M17 29C17 12 47 12 47 29" fill="none" stroke={C} strokeWidth="5" strokeLinecap="round" />
      <rect x="7" y="27" width="50" height="9" rx="3" fill={C} />
      <path d="M10 38H54L49 55a3 3 0 0 1-3 2H18a3 3 0 0 1-3-2Z" fill={C} />
      <path d="M14 44H50M16 50H48" stroke="var(--moment-plate)" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 39V56M32 39V56M42 39V56" stroke="var(--moment-plate)" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  "at-the-park": (
    <>
      <rect x="25" y="7" width="14" height="6" rx="3" fill={C} />
      <path d="M9 45V31C9 19 20 12 32 12S55 19 55 31V45" fill="none" stroke={C} strokeWidth="4" strokeLinejoin="round" />
      <circle cx="23" cy="31" r="6.5" fill={C} />
      <path d="M16.5 34H29.5L28 44H18Z" fill={C} />
      <circle cx="41" cy="31" r="6.5" fill={C} />
      <path d="M34.5 34H47.5L46 44H36Z" fill={C} />
      <path d="M20 37.5H27M38 37.5H45" stroke="var(--moment-plate)" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="4" y="45" width="56" height="9" rx="4.5" fill={C} />
    </>
  ),
  "on-the-road": (
    <>
      <circle cx="32" cy="32" r="23" fill="none" stroke={C} strokeWidth="6" />
      <path d="M10 30C17 27 24 26 32 26S47 27 54 30" fill="none" stroke={C} strokeWidth="6" strokeLinecap="round" />
      <path d="M32 38V54" stroke={C} strokeWidth="6" strokeLinecap="round" />
      <circle cx="32" cy="32" r="8" fill={C} />
      <circle cx="32" cy="32" r="3" fill="var(--moment-plate)" />
    </>
  ),
};

export const MOMENTS: Moment[] = [
  { id: "after-practice", label: "After Practice", icon: icons["after-practice"], src: "/ads/after-practice.html" },
  { id: "around-the-table", label: "Around the Table", icon: icons["around-the-table"], src: "/ads/around-the-table.html" },
  { id: "at-the-park", label: "At the Park", icon: icons["at-the-park"], src: "/ads/at-the-park.html" },
  { id: "on-the-road", label: "On the Road", icon: icons["on-the-road"], src: "/ads/on-the-road.html" },
];

export function MomentBanner() {
  const [idx, setIdx] = useState(0);
  const current = MOMENTS[idx];
  if (!current) return null;
  return (
    <>
      <style>{`@font-face{font-family:"Brandon Printed Two";src:url("${font.url}") format("opentype");font-display:swap}`}</style>
      <section className="moment-frame" aria-label="The Moment Maker" style={{ backgroundImage: `url("${bg.url}")` }}>
        <FlickSlot src={current.src} title={current.label}
          {...(current.videoSrc ? { videoSrc: current.videoSrc } : {})}
          onEnded={() => setIdx((i) => nextMomentIndex(i, MOMENTS.length))} />
        <img className="moment-badge" src={logo.url} alt="The moment Maker" />
        <nav className="moment-nav" aria-label="Pick your moment">
          {MOMENTS.map((m, i) => (
            <Button key={m.id} variant="ghost" className="moment-button" aria-pressed={i === idx}
              aria-label={m.label} onClick={() => setIdx(i)}>
              <span className="moment-plate-wrap"><span className="moment-plate">
                <svg className="moment-icon" viewBox="0 0 64 64" aria-hidden="true">{m.icon}</svg>
                <span className="moment-label">{m.label}</span>
              </span></span>
            </Button>
          ))}
        </nav>
      </section>
    </>
  );
}
