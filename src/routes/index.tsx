import { createFileRoute } from "@tanstack/react-router";
import { MomentBanner } from "@/components/MomentBanner";

const TITLE = "The Moment Maker – General Mills × Walmart (demo)";
const DESC = "Four picnic moments from General Mills × Walmart in a portrait Moment Maker ad.";

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
    <main className="moment-page">
      <div className="moment-page-inner">
        <MomentBanner />
      </div>
    </main>
  );
}
