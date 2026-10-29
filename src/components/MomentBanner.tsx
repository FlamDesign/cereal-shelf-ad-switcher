import { Button } from "@/components/ui/button";
import { FlickSlot } from "@/components/FlickSlot";
import { AUTO_ADVANCE_MS } from "@/lib/moment-cycle";
import { useMomentPlayback } from "@/hooks/use-moment-playback";
import bg from "@/assets/hub/picnic-portrait.png.asset.json";
import logo from "@/assets/hub/moment-maker-logo.png.asset.json";
import afterPractice from "@/assets/moments/after-practice.png.asset.json";
import aroundTable from "@/assets/moments/around-the-table.png.asset.json";
import atPark from "@/assets/moments/at-the-park.png.asset.json";
import onRoad from "@/assets/moments/on-the-road.png.asset.json";

type Moment = { id: string; label: string; badge: string; src: string; videoSrc?: string };

export const MOMENTS: Moment[] = [
  { id: "after-practice", label: "After Practice", badge: afterPractice.url, src: "/ads/after-practice.html" },
  { id: "around-the-table", label: "Around the Table", badge: aroundTable.url, src: "/ads/around-the-table.html" },
  { id: "at-the-park", label: "At the Park", badge: atPark.url, src: "/ads/at-the-park.html" },
  { id: "on-the-road", label: "On the Road", badge: onRoad.url, src: "/ads/on-the-road.html" },
];

export function MomentBanner() {
  const { idx, cycle, pick, advance } = useMomentPlayback(MOMENTS.length);
  const current = MOMENTS[idx];
  if (!current) return null;
  return (
    <>
      <style>{`.moment-progress-fill{animation-duration:${AUTO_ADVANCE_MS}ms}`}</style>
      <section className="moment-frame" aria-label="The Moment Maker" style={{ backgroundImage: `url("${bg.url}")` }}>
        <FlickSlot key={cycle} src={current.src} title={current.label}
          {...(current.videoSrc ? { videoSrc: current.videoSrc } : {})}
          onEnded={advance} />
        <img className="moment-badge" src={logo.url} alt="The moment Maker" />
        <nav className="moment-nav" aria-label="Pick your moment">
          {MOMENTS.map((m, i) => (
            <Button key={m.id} variant="ghost" className="moment-button" aria-pressed={i === idx}
              aria-label={m.label} onClick={() => pick(i)}>
              <span className="moment-plate-wrap">
                {i === idx && <svg key={cycle} className="moment-progress" viewBox="0 0 100 100" aria-hidden="true">
                  <circle className="moment-progress-fill" cx="50" cy="50" r="49" pathLength="100" />
                </svg>}
                <img className="moment-badge-img" src={m.badge} alt="" draggable={false} />
              </span>
            </Button>
          ))}
        </nav>
      </section>
    </>
  );
}
