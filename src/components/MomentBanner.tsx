import { useEffect, useRef, useState, type ReactNode } from "react";
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

const C = "#E2231A";

type Moment = { id: string; label: string; tilt: number; icon: ReactNode; src: string };

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
  { id: "after-practice", label: "After practice", tilt: -3, icon: icons["after-practice"], src: "/ads/after-practice.html" },
  { id: "around-the-table", label: "Around the table", tilt: 2, icon: icons["around-the-table"], src: "/ads/around-the-table.html" },
  { id: "at-the-park", label: "At the park", tilt: -2, icon: icons["at-the-park"], src: "/ads/at-the-park.html" },
  { id: "on-the-road", label: "On the road", tilt: 3, icon: icons["on-the-road"], src: "/ads/on-the-road.html" },
];

function Circle({ m, size, ring = true }: { m: Moment; size: number; ring?: boolean }) {
  const r = size / 118;
  return (
    <span
      style={{
        width: size, height: size, borderRadius: "50%", background: "#FFF", flexShrink: 0,
        boxShadow: ring
          ? `0 ${14 * r}px ${18 * r}px rgba(0,0,0,.4), inset 0 0 0 ${9 * r}px #FBF9F5, inset 0 0 0 ${11 * r}px #ECE6DA`
          : "0 4px 10px rgba(0,0,0,.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <svg width={size * 0.61} height={size * 0.61} viewBox="0 0 64 64" aria-hidden>{m.icon}</svg>
    </span>
  );
}

const FONT = "'Brandon Printed Two','Arial Black',sans-serif";
const Chevron = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden><path d="M6 3l5 5-5 5" fill="none" stroke={C} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

export function MomentBanner() {
  const wrap = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setScale(el.clientWidth / 1550));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <style>{`@font-face{font-family:"Brandon Printed Two";src:url("${font.url}") format("opentype");font-display:block}
.mm-btn{transition:transform .18s ease;cursor:pointer;background:none;border:0;padding:0}
.mm-btn:hover{transform:translateY(-4px) rotate(0deg)!important}`}</style>
      <div ref={wrap} style={{ width: "100%", height: 204 * scale, overflow: "hidden", borderRadius: 8 }}>
        <div style={{ position: "relative", width: 1550, height: 204, overflow: "hidden", background: "#2F5A1E", fontFamily: FONT, color: "#00463C", transform: `scale(${scale})`, transformOrigin: "top left" }}>
          <img src={bg.url} alt="" style={{ position: "absolute", left: 0, top: -260, width: 1550, height: 1030, objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,40,20,.18)" }} />
          <img src={a1.url} alt="" style={{ position: "absolute", left: -40, top: -118, width: 420, transform: "rotate(-4deg)", filter: "drop-shadow(0 8px 6px rgba(0,0,0,.35))" }} />
          <img src={a2.url} alt="" style={{ position: "absolute", right: -70, top: -72, width: 330, transform: "rotate(8deg)", filter: "drop-shadow(0 6px 5px rgba(0,0,0,.35))" }} />
          <img src={a3.url} alt="" style={{ position: "absolute", left: -96, bottom: -150, width: 300, transform: "rotate(-90deg)", filter: "drop-shadow(0 8px 8px rgba(0,0,0,.35))" }} />
          <img src={a4.url} alt="" style={{ position: "absolute", left: 1372, bottom: 4, width: 104, transform: "rotate(-16deg)", filter: "drop-shadow(0 6px 5px rgba(0,0,0,.45))" }} />
          <img src={a5.url} alt="" style={{ position: "absolute", left: 300, top: 12, width: 38, transform: "rotate(-12deg)" }} />
          <img src={a6.url} alt="" style={{ position: "absolute", left: 26, top: 128, width: 34, transform: "rotate(18deg)" }} />
          <img src={a7.url} alt="" style={{ position: "absolute", right: 22, bottom: 18, width: 42, transform: "rotate(-20deg)" }} />
          <img src={a8.url} alt="" style={{ position: "absolute", left: 300, bottom: 8, width: 34, transform: "rotate(10deg)" }} />

          <div style={{ position: "absolute", left: 96, top: 6, width: 192, height: 192, borderRadius: "50%", background: "#FFF", boxShadow: "0 12px 20px rgba(0,0,0,.45),0 2px 5px rgba(0,0,0,.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 150, height: 150, borderRadius: "50%", boxShadow: "inset 0 0 0 1px #ECE6DA,0 0 0 4px #FBF9F5", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <h2 style={{ margin: 0, display: "flex", flexDirection: "column", alignItems: "center", lineHeight: 1, fontWeight: "normal" }}>
                <span style={{ fontSize: 19, letterSpacing: 2, color: "#3C9CCC" }}>THE</span>
                <span style={{ fontFamily: "'Pacifico',cursive", fontSize: 41, color: "#F05454", margin: "-2px 0 -1px" }}>Moment</span>
                <span style={{ fontSize: 27, letterSpacing: 2, color: "#3C9CCC" }}>MAKER</span>
              </h2>
            </div>
          </div>

          <nav aria-label="Pick your moment" style={{ position: "absolute", left: 360, top: 20, width: 980, height: 170, display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 24 }}>
            {MOMENTS.map((m) => (
              <button key={m.id} className="mm-btn" onClick={() => setActive(m.id)} style={{ display: "flex", flexDirection: "column", alignItems: "center", transform: `rotate(${m.tilt}deg)`, fontFamily: FONT }}>
                <Circle m={m} size={118} />
                <span style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 6, padding: "7px 14px 6px", background: "#FFF8EC", borderRadius: 999, boxShadow: "0 6px 10px rgba(0,0,0,.3)", fontSize: 18, letterSpacing: 0.5, color: "#00463C", whiteSpace: "nowrap", textTransform: "uppercase" }}>
                  {m.label} <Chevron />
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      {active && <AdPlayer activeId={active} onSelect={setActive} onClose={() => setActive(null)} />}
    </>
  );
}

function AdPlayer({ activeId, onSelect, onClose }: { activeId: string; onSelect: (id: string) => void; onClose: () => void }) {
  const current = MOMENTS.find((m) => m.id === activeId)!;
  const others = MOMENTS.filter((m) => m.id !== activeId);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 100, background: "rgba(0,0,0,.35)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ position: "relative", width: "min(63vw, 112vh, 1200px)", minWidth: 300, aspectRatio: "16/9", background: "#d9d9d9", borderRadius: 6, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,.4)" }}>
        <iframe key={current.id} src={current.src} title={current.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} allow="autoplay; fullscreen" />

        {/* Now playing badge */}
        <div style={{ position: "absolute", left: 12, top: 12, display: "flex", alignItems: "center", gap: 8, padding: "4px 14px 4px 4px", background: "#FFF8EC", borderRadius: 999, boxShadow: "0 4px 10px rgba(0,0,0,.3)", fontFamily: FONT, color: "#00463C", fontSize: 14, textTransform: "uppercase", letterSpacing: 0.5 }}>
          <Circle m={current} size={40} ring={false} />
          {current.label}
        </div>

        <button onClick={onClose} aria-label="Close" style={{ position: "absolute", right: 10, top: 10, width: 32, height: 32, borderRadius: "50%", border: 0, background: "rgba(0,0,0,.55)", color: "#fff", fontSize: 18, cursor: "pointer" }}>✕</button>

        {/* Other moments */}
        <div style={{ position: "absolute", right: "3%", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "4%", alignItems: "center" }}>
          {others.map((m) => (
            <button key={m.id} className="mm-btn" onClick={() => onSelect(m.id)} title={m.label} aria-label={`Play ${m.label}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <Circle m={m} size={64} />
              <span style={{ fontFamily: FONT, fontSize: 11, color: "#00463C", background: "#FFF8EC", borderRadius: 999, padding: "2px 8px", textTransform: "uppercase", whiteSpace: "nowrap" }}>{m.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
