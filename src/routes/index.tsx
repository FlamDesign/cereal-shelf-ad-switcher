import { createFileRoute } from "@tanstack/react-router";
import { MomentBanner } from "@/components/MomentBanner";

const TITLE = "The Moment Maker – General Mills × Walmart (demo)";
const DESC = "Interactive Moment Maker module: tap a moment to play its ad.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen px-0 py-6 md:px-8 md:py-12" style={{ background: "#F5F5F2" }}>
      <div className="mx-auto w-full max-w-[1550px]">
        <MomentBanner />
      </div>
    </main>
  );
}
