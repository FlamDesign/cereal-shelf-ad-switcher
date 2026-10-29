import { createFileRoute } from "@tanstack/react-router";
import { MomentBanner } from "@/components/MomentBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brand Shop Demo – The Moment Maker" },
      { name: "description", content: "Demo brand shelf page with an interactive Moment Maker banner." },
      { property: "og:title", content: "Brand Shop Demo – The Moment Maker" },
      { property: "og:description", content: "Demo brand shelf page with an interactive Moment Maker banner." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Pacifico&display=swap" }],
  }),
  component: Index,
});

const products = [
  ["Honey Oat Rings Cereal, Family Size, 18 oz", "4.97", "#f3c443"],
  ["Cocoa Crunch Breakfast Cereal, 18.1 oz", "4.97", "#6b3b22"],
  ["Crunchy Granola Bars, Oats 'n Honey, 12 ct", "6.97", "#3f8a3a"],
  ["Refrigerated Cinnamon Rolls with Icing, 2-Pack", "4.68", "#2b6cc4"],
  ["Crescent Rolls Dough, 2-Pack, 16 oz", "4.68", "#e7a73a"],
  ["Shells & White Cheddar Mac, 6 oz", "1.68", "#7b4ba8"],
];
const recipes = [["NEW JERSEY", "#c9563a"], ["NEW YORK", "#e5a347"], ["PENNSYLVANIA", "#8a5a3c"]];
const nav = ["Departments", "Services", "Rollbacks & More", "Get It Fast", "Pharmacy", "Halloween", "New Arrivals", "Holiday Shop", "Gifting", "Toy Shop", "Meals Made Easy"];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4 py-3">
          <div className="text-2xl font-black">✷</div>
          <div className="hidden rounded-full bg-primary-foreground/10 px-4 py-2 text-xs md:block">
            <div className="font-bold">Pickup or delivery?</div>
            <div className="opacity-80">Sacramento, 95829 • Supercenter</div>
          </div>
          <div className="flex-1 rounded-full bg-background px-5 py-2.5 text-sm text-muted-foreground">Search everything online and in store</div>
          <div className="hidden text-xs font-bold md:block">Reorder<br />My Items</div>
          <div className="hidden text-xs font-bold md:block">Sign In<br />Account</div>
          <div className="text-xs font-bold">🛒 $0.00</div>
        </div>
      </header>
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-[1400px] gap-2 overflow-x-auto px-4 py-2">
          {nav.map((n) => (
            <span key={n} className="whitespace-nowrap rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold">{n}</span>
          ))}
        </div>
      </div>

      <main className="mx-auto max-w-[1400px] space-y-10 px-4 py-8">
        <h1 className="text-2xl font-bold">General Mills</h1>
        <section>
          <h2 className="mb-4 text-lg font-bold">Popular picks</h2>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-6">
            {products.map(([name, price, color]) => (
              <div key={name} className="text-sm">
                <div className="mb-2 flex aspect-square items-center justify-center rounded-lg bg-muted">
                  <div className="h-3/4 w-1/2 rounded-md shadow-md" style={{ background: color }} />
                </div>
                <button className="mb-2 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">+ Add</button>
                <div className="text-base font-bold">${price}</div>
                <div className="line-clamp-2">{name}</div>
                <div className="mt-1 text-xs text-muted-foreground">Pickup as soon as 8am</div>
              </div>
            ))}
          </div>
        </section>

        <section><MomentBanner /></section>

        <section>
          <h2 className="mb-4 text-lg font-bold">Explore recipes</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {recipes.map(([t, c]) => (
              <div key={t} className="relative aspect-[4/3] overflow-hidden rounded-lg" style={{ background: c }}>
                <span className="absolute left-3 top-3 rounded bg-background px-3 py-1 text-xl font-black text-primary">{t}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
