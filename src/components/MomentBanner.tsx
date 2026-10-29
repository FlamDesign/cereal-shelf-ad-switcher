import { useEffect, useRef, useState, type ReactNode } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { nextMomentIndex, AUTO_ADVANCE_MS, RESUME_AFTER_MS } from "@/lib/moment-cycle";
import bg from "@/assets/hub/e935057293a3b1f28fb3909b7cb20217.jpg.asset.json";
import a1 from "@/assets/hub/f36f1c51483d3292c8da92f1604de657.png.asset.json";
import a2 from "@/assets/hub/d18c634c3e7bc44881d8ded4bd9756e0.png.asset.json";
import a3 from "@/assets/hub/eac8367eb1c18a77acc49d1efa9cbd5a.png.asset.json";
import a4 from "@/assets/hub/fc68bc9aba51158c7186ce06acf5ee53.png.asset.json";
import a5 from "@/assets/hub/367e882648a7df0244f3763869282c6b.png.asset.json";
import a6 from "@/assets/hub/54eb5e9aca6fe7b4d45bf16bb1eb6dc7.png.asset.json";
import a7 from "@/assets/hub/5c778920950a45a039d7c03c9236d4f1.png.asset.json";
import a8 from "@/assets/hub/392eae8086746841ea6b22f4005db43f.png.asset.json";
import font from "@/assets/hub/3a90540dc35e5382ba159fc56c774fd6.otf.asset.json";
import logo from "@/assets/hub/moment-maker-logo.png.asset.json";

const C = "#E2231A";

type Moment = { id: string; label: string; tilt: number; icon: ReactNode; src: string; aspect: "1/1" };

const icons: Record<string, ReactNode> = {
  "after-practice": (
    <>
      <path d="M22 15V11a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v4" fill="none" stroke={C} strokeWidth="4" strokeLinecap="round" />
      <rect x="7" y="15" width="50" height="12" rx="4" fill={C} />
      <rect x="9" y="29" width="46" height="28" rx="5" fill={C} />
      <rect x="28" y="23" width="8" height="9" rx="2" fill="#FFF" />
      <rect x="14" y="38" width="9" height="4" rx="2" fill="#FFF" />
      <rect x="41" y="38" width="9" height="4" rx="2" fill="#FFF" />
      <rect x="9" y="27" width="46" height="2" fill="#FFF" />
    </>
  ),
  "around-the-table": (
    <>
      <path d="M17 29C17 12 47 12 47 29" fill="none" stroke={C} strokeWidth="5" strokeLinecap="round" />
      <rect x="7" y="27" width="50" height="9" rx="3" fill={C} />
      <path d="M10 38H54L49 55a3 3 0 0 1-3 2H18a3 3 0 0 1-3-2Z" fill={C} />
      <path d="M14 44H50M16 50H48" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 39V56M32 39V56M42 39V56" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
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
      <path d="M20 37.5H27M38 37.5H45" stroke="#FFF" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="4" y="45" width="56" height="9" rx="4.5" fill={C} />
    </>
  ),
  "on-the-road": (
    <>
      <circle cx="32" cy="32" r="23" fill="none" stroke={C} strokeWidth="6" />
      <path d="M10 30C17 27 24 26 32 26S47 27 54 30" fill="none" stroke={C} strokeWidth="6" strokeLinecap="round" />
      <path d="M32 38V54" stroke={C} strokeWidth="6" strokeLinecap="round" />
      <circle cx="32" cy="32" r="8" fill={C} />
      <circle cx="32" cy="32" r="3" fill="#FFF" />
    </>
  ),
};

// Replace the src paths with the real ad HTML files when ready (place them in /public/ads/).
export const MOMENTS: Moment[] = [
  { id: "after-practice", label: "After practice", tilt: -3, icon: icons["after-practice"], src: "/ads/after-practice.html", aspect: "1/1" },
  { id: "around-the-table", label: "Around the table", tilt: 2, icon: icons["around-the-table"], src: "/ads/around-the-table.html", aspect: "1/1" },
  { id: "at-the-park", label: "At the park", tilt: -2, icon: icons["at-the-park"], src: "/ads/at-the-park.html", aspect: "1/1" },
  { id: "on-the-road", label: "On the road", tilt: 3, icon: icons["on-the-road"], src: "/ads/on-the-road.html", aspect: "1/1" },
];

function Circle({ m, size }: { m: Moment; size: number }) {
  const r = size / 118;
  return (
    <span
      style={{
        width: size, height: size, borderRadius: "50%", background: "#FFF", flexShrink: 0,
        boxShadow: `0 ${10 * r}px ${14 * r}px rgba(0,0,0,.4), inset 0 0 0 ${9 * r}px #FBF9F5, inset 0 0 0 ${11 * r}px #ECE6DA`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <svg width={size * 0.61} height={size * 0.61} viewBox="0 0 64 64" aria-hidden>{m.icon}</svg>
    </span>
  );
}

/** Plate with red ring + progress ring that fills over AUTO_ADVANCE_MS while auto-playing. */
function Plate({ m, size, on, auto, cycle }: { m: Moment; size: number; on: boolean; auto: boolean; cycle: number }) {
  const pad = on ? Math.max(5, size * 0.06) : 0;
  const outer = size + pad * 2 + (on ? 8 : 0);
  const rr = outer / 2 - 3;
  const len = 2 * Math.PI * rr;
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: outer, height: outer }}>
      {on && (
        <svg width={outer} height={outer} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }} aria-hidden>
          <circle cx={outer / 2} cy={outer / 2} r={rr} fill="none" stroke="rgba(255,255,255,.45)" strokeWidth={5} />
          <circle
            key={cycle}
            className={auto ? "mm-progress" : undefined}
            cx={outer / 2} cy={outer / 2} r={rr} fill="none" stroke="#FFF8EC" strokeWidth={5} strokeLinecap="round"
            strokeDasharray={len} strokeDashoffset={auto ? len : 0}
            style={{ ["--len" as string]: len }}
          />
        </svg>
      )}
      <span style={{ borderRadius: "50%", padding: pad, background: on ? C : "transparent", display: "inline-flex" }}>
        <Circle m={m} size={size} />
      </span>
    </span>
  );
}

const FONT = "'Brandon Printed Two','Arial Black',sans-serif";
const Chevron = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden><path d="M6 3l5 5-5 5" fill="none" stroke={C} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);
const Hand = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="none" stroke={C} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 11V5a1.5 1.5 0 0 1 3 0v5" /><path d="M12 10V9a1.5 1.5 0 0 1 3 0v2" /><path d="M15 11a1.5 1.5 0 0 1 3 0v3a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L4 15a1.5 1.5 0 0 1 2.5-1.6L9 16" />
    <path d="M5 4l-1.5-1.5M9 1.5V0M13 4l1.5-1.5" />
  </svg>
);

function Hint() {
  return (
    <span className="mm-hint" style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px 5px", background: "#FFF8EC", borderRadius: 999, boxShadow: "0 4px 8px rgba(0,0,0,.3)", color: "#00463C", fontFamily: FONT, fontSize: 14, letterSpacing: 0.5, textTransform: "uppercase", whiteSpace: "nowrap" }}>
      <Hand /> Tap a moment
    </span>
  );
}

function Label({ m, on, fs, wrap }: { m: Moment; on: boolean; fs: number; wrap?: boolean }) {
  return (
    <span style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 5, padding: "6px 12px 5px", background: on ? C : "#FFF8EC", borderRadius: 999, boxShadow: "0 5px 9px rgba(0,0,0,.3)", fontSize: fs, letterSpacing: 0.5, color: on ? "#FFF" : "#00463C", whiteSpace: wrap ? "normal" : "nowrap", textAlign: "center", justifyContent: "center", lineHeight: 1.1, textTransform: "uppercase", ...(wrap ? { padding: "5px 6px 4px", gap: 3, maxWidth: "100%" } : {}) }}>
      {on && <span aria-hidden>▶</span>}{m.label} {!on && <Chevron />}
    </span>
  );
}

const STYLE = `@font-face{font-family:"Brandon Printed Two";src:url("${font.url}") format("opentype");font-display:block}
.mm-btn{transition:transform .25s ease;cursor:pointer;background:none;border:0;padding:0;-webkit-tap-highlight-color:transparent}
@media (hover:hover){.mm-btn:hover{transform:translateY(-4px)!important}}
.mm-progress{animation:mm-fill ${AUTO_ADVANCE_MS}ms linear forwards}
@keyframes mm-fill{from{stroke-dashoffset:var(--len)}to{stroke-dashoffset:0}}
.mm-hint{animation:mm-pulse 1.6s ease-in-out infinite}
@keyframes mm-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
@media (prefers-reduced-motion:reduce){.mm-hint{animation:none}.mm-btn{transition:none}}`;

function useMomentCycle() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [touched, setTouched] = useState(false);
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const t = paused
      ? setTimeout(() => { setPaused(false); setCycle((c) => c + 1); }, RESUME_AFTER_MS)
      : setTimeout(() => { setIdx((i) => nextMomentIndex(i, MOMENTS.length)); setCycle((c) => c + 1); }, AUTO_ADVANCE_MS);
    return () => clearTimeout(t);
  }, [paused, cycle]);
  const pick = (i: number) => { setIdx(i); setPaused(true); setTouched(true); setCycle((c) => c + 1); };
  return { idx, auto: !paused, touched, cycle, pick };
}

const shadow = "drop-shadow(0 8px 6px rgba(0,0,0,.35))";
const logoShadow = "drop-shadow(0 12px 20px rgba(0,0,0,.45)) drop-shadow(0 2px 5px rgba(0,0,0,.25))";

export function MomentBanner() {
  const mobile = useIsMobile();
  const s = useMomentCycle();
  return (
    <>
      <style>{STYLE}</style>
      {mobile ? <Mobile {...s} /> : <Desktop {...s} />}
    </>
  );
}

type S = ReturnType<typeof useMomentCycle>;

function Desktop({ idx, auto, touched, cycle, pick }: S) {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / 1550));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const H = 760;
  const current = MOMENTS[idx]!;
  return (
    <div ref={wrap} style={{ width: "100%", height: H * scale, overflow: "hidden", borderRadius: 8 }}>
      <div style={{ position: "relative", width: 1550, height: H, overflow: "hidden", background: "#2F5A1E", fontFamily: FONT, color: "#00463C", transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <img src={bg.url} alt="" style={{ position: "absolute", inset: 0, width: 1550, height: H, objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,40,20,.35)" }} />
        <img src={a1.url} alt="" style={{ position: "absolute", left: -120, top: -200, width: 640, transform: "rotate(-10deg)", filter: shadow }} />
        <img src={a2.url} alt="" style={{ position: "absolute", left: 1290, top: -70, width: 340, transform: "rotate(14deg)", filter: shadow }} />
        <img src={a3.url} alt="" style={{ position: "absolute", left: -150, bottom: -200, width: 300, transform: "rotate(-90deg)", filter: shadow }} />
        <img src={a4.url} alt="" style={{ position: "absolute", left: 1320, bottom: 30, width: 190, transform: "rotate(-16deg)", filter: shadow }} />
        <img src={a5.url} alt="" style={{ position: "absolute", left: 1470, top: 300, width: 40, transform: "rotate(-12deg)" }} />
        <img src={a6.url} alt="" style={{ position: "absolute", left: 1450, top: 560, width: 36, transform: "rotate(18deg)" }} />
        <img src={a7.url} alt="" style={{ position: "absolute", left: 580, top: 300, width: 34, transform: "rotate(-20deg)" }} />
        <img src={a8.url} alt="" style={{ position: "absolute", left: 1340, top: 330, width: 38, transform: "rotate(10deg)" }} />

        <img src={logo.url} alt="The Moment Maker" style={{ position: "absolute", left: -36, top: -44, width: 400, height: 400, transform: "rotate(-10deg)", filter: logoShadow, zIndex: 3 }} />
        {!touched && <div style={{ position: "absolute", left: 385, top: 200, zIndex: 4 }}><Hint /></div>}

        <nav aria-label="Pick your moment" style={{ position: "absolute", left: 30, top: 350, width: 530, height: 390, display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gridTemplateRows: "repeat(2,1fr)", gap: 10, alignItems: "center", justifyItems: "center", zIndex: 4 }}>
          {MOMENTS.map((m, i) => {
            const on = i === idx;
            return (
              <button key={m.id} className="mm-btn" onClick={() => pick(i)} aria-pressed={on} aria-label={m.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", fontFamily: FONT, opacity: on ? 1 : 0.9 }}>
                <Plate m={m} size={on ? 124 : 104} on={on} auto={auto} cycle={cycle} />
                <Label m={m} on={on} fs={on ? 18 : 15} />
              </button>
            );
          })}
        </nav>

        <div style={{ position: "absolute", left: 650, top: 60, width: 640, height: 640, background: "#000", borderRadius: 8, overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,.5)", zIndex: 5 }}>
          <iframe key={current.id} src={current.src} title={current.label} style={{ width: "100%", height: "100%", border: 0 }} allow="autoplay; fullscreen" />
        </div>
      </div>
    </div>
  );
}

function Mobile({ idx, auto, touched, cycle, pick }: S) {
  const current = MOMENTS[idx]!;
  return (
    <section style={{ position: "relative", width: "100%", overflow: "hidden", background: "#2F5A1E", fontFamily: FONT, color: "#00463C" }}>
      <img src={bg.url} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,40,20,.35)" }} />
      <img src={a1.url} alt="" style={{ position: "absolute", left: "-8%", top: "-6vw", width: "80%", filter: shadow }} />
      <img src={a2.url} alt="" style={{ position: "absolute", right: "-12%", top: "-4vw", width: "60%", transform: "rotate(6deg)", filter: shadow }} />
      <img src={logo.url} alt="The Moment Maker" style={{ position: "absolute", left: "-5vw", top: "-6vw", width: "48vw", height: "48vw", transform: "rotate(-10deg)", filter: logoShadow, zIndex: 3 }} />
      <div style={{ position: "relative", height: "38vw" }}>
        {!touched && <div style={{ position: "absolute", right: 12, bottom: 10, zIndex: 4 }}><Hint /></div>}
      </div>
      <div style={{ position: "relative", zIndex: 2, padding: "0 10px" }}>
        <div style={{ width: "100%", aspectRatio: "1/1", background: "#000", borderRadius: 8, overflow: "hidden", boxShadow: "0 12px 30px rgba(0,0,0,.5)" }}>
          <iframe key={current.id} src={current.src} title={current.label} style={{ width: "100%", height: "100%", border: 0 }} allow="autoplay; fullscreen" />
        </div>
        <nav aria-label="Pick your moment" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 4, padding: "12px 0 16px", alignItems: "start" }}>
          {MOMENTS.map((m, i) => {
            const on = i === idx;
            return (
              <button key={m.id} className="mm-btn" onClick={() => pick(i)} aria-pressed={on} aria-label={m.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: 44, fontFamily: FONT }}>
                <Plate m={m} size={on ? 74 : 66} on={on} auto={auto} cycle={cycle} />
                <Label m={m} on={on} fs={12} wrap />
              </button>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
