import { createFileRoute } from "@tanstack/react-router";
import { MomentBanner } from "@/components/MomentBanner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "General Mills Brand Shop – Demo" },
      { name: "description", content: "Demo brand shelf page with an interactive Moment Maker banner." },
      { property: "og:title", content: "General Mills Brand Shop – Demo" },
      { property: "og:description", content: "Demo brand shelf page with an interactive Moment Maker banner." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Pacifico&family=Anton&family=Dancing+Script:wght@700&display=swap" },
    ],
  }),
  component: Index,
});

type P = { name: string; price: string; was?: string; unit?: string; options?: string; badge?: "Rollback" | "Best seller"; color: string; label: string; btn?: "Options" };

const flavor: P[] = [
  { name: "Cinnamon Toast Crunch Cereal, Root Beer Float Flavored, Limited Edition, 18.8 oz", price: "14.49", options: "3 options", color: "#1f4fa8", label: "CINNAMON TOAST" },
  { name: "Birthday Cake Cheerios Breakfast Cereal, Gluten Free, Family Size, 19 oz", price: "11.98", options: "2 options", color: "#2a5bc0", label: "CHEERIOS" },
  { name: "Betty Crocker Super Moist Delights Cake Mix, America's Birthday Cake, 13.25 oz", price: "12.63", options: "2 options", color: "#c8202f", label: "CAKE MIX" },
  { name: "Totino's Pizza Rolls, Cheeseburger Flavored, Frozen Appetizers, 50 Rolls, 24.46 oz", price: "5.47", unit: "10.9 ¢/count", color: "#e2231a", label: "PIZZA ROLLS" },
  { name: "Pillsbury Premade Refrigerated Pie Crust, Two Pie Crusts, 14.1 oz", price: "3.82", was: "$4.68", unit: "27.1 ¢/oz", badge: "Rollback", color: "#b8442a", label: "PIE CRUSTS" },
  { name: "Gold Medal All Purpose Flour, Baking Flour, 5 lb Bag", price: "3.97", options: "2 options", badge: "Best seller", color: "#f2efe6", label: "FLOUR" },
];
const celebrate: P[] = [
  { name: "Cheerios, Heart Healthy Gluten Free Breakfast Cereal, Family Size, 18 oz", price: "4.97", options: "13 options", badge: "Best seller", color: "#f6c21c", label: "CHEERIOS", btn: "Options" },
  { name: "Cocoa Puffs, Chocolate Breakfast Cereal with Whole Grains, Family Size, 18.1 oz", price: "4.97", options: "4 options", badge: "Best seller", color: "#5a3420", label: "COCOA PUFFS", btn: "Options" },
  { name: "Nature Valley Sweet and Salty Nut Granola Bars, Peanut, 15 Bars, 18 oz", price: "6.97", options: "2 options", badge: "Best seller", color: "#e88a1a", label: "15 BARS" },
  { name: "Pillsbury Cinnamon Rolls, Original Icing, 16 Rolls, Value 2-Pack, 24.8 oz", price: "4.68", was: "$5.22", unit: "18.9 ¢/oz", badge: "Rollback", color: "#1d4fa0", label: "CINNAMON ROLLS" },
  { name: "Pillsbury Crescent Rolls, Original Refrigerated Canned Pastry Dough, Value 2-Pack, 16 oz", price: "4.68", was: "$5.22", unit: "29.3 ¢/oz", badge: "Rollback", color: "#2a62b8", label: "CRESCENTS" },
  { name: "Annie's Shells and White Cheddar, Made with Organic Pasta and Real Cheese, 6 oz", price: "1.48", was: "$6.12", options: "6 options", badge: "Best seller", color: "#6b3fa0", label: "SHELLS & CHEDDAR" },
];

const regions = [
  { title: "NORTHEAST", bg: "#5bc0f0", fg: "#ffffff", recipes: [["NEW JERSEY", "Everything Bagel Dogs", "Made easy with Pillsbury Crescents.", "#3b5a7a"], ["NEW YORK", "Buffalo Mac & Cheese", "Baked to perfection with chicken and Annie's Mac & Cheese.", "#e09a4a"], ["PENNSYLVANIA", "Cinnamon Roll Pie", "Put a spin on Dutch apple pie with Pillsbury Cinnamon Rolls.", "#8a5a3c"]] },
  { title: "SOUTHEAST", bg: "#ec3b33", fg: "#ffffff", recipes: [["GEORGIA", "Classic Peach Cobbler", "Bake up this sweet summer dessert with Bisquick.", "#e8a860"], ["VIRGINIA", "Hot Biscuit Sandwiches", "Layers of ham and Swiss cheese on Pillsbury Biscuits.", "#c99a5a"], ["FLORIDA", "Berry Key Lime Pie", "A fresh twist on a classic starts with Pillsbury pie crust.", "#d8394a"]] },
  { title: "MIDWEST", bg: "#0b2fb0", fg: "#ffffff", recipes: [["MICHIGAN", "Classic Blueberry Pie", "Use Gold Medal All-Purpose Flour for this homemade pie.", "#3a3448"], ["KANSAS", "BBQ Chicken Crescents", "Make it an easy weeknight win with a side of green beans.", "#d79a3c"], ["INDIANA", "Piggy Pop Party Mix", "Add crispy bacon & buttery popcorn to this Chex Party Mix.", "#c7843a"]] },
  { title: "SOUTHWEST", bg: "#efe4d4", fg: "#9b7f66", recipes: [["NEW MEXICO", "Green Chile Chex Mix", "A zesty, spicy twist on classic Chex Party Mix.", "#d4a24a"], ["OKLAHOMA", "Sugar Cookie Bars", "Easy bars made with Betty Crocker Sugar Cookie mix.", "#d9b77a"], ["TEXAS", "Loaded Pizza Roll Nachos", "Game-day nachos piled high on Totino's Pizza Rolls.", "#c94a2a"]] },
];

const nav = ["Rollbacks & More", "Get it Fast", "Pharmacy", "Halloween", "New Arrivals", "Holiday Shop", "Gifting", "Toy Shop", "Meals Made Easy", "Only at Walmart", "Credit Card", "Walmart+"];
const BLUE = "#0053e2";
const NAVY = "#001e60";

function Spark({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden>
      {[0, 60, 120, 180, 240, 300].map((r) => (
        <rect key={r} x="17.5" y="2" width="5" height="13" rx="2.5" fill="#ffc220" transform={`rotate(${r} 20 20)`} />
      ))}
    </svg>
  );
}

function Price({ p }: { p: P }) {
  const [d, c] = p.price.split(".");
  const now = !!p.was;
  return (
    <div className="flex items-baseline gap-1.5">
      <span className="font-bold" style={{ color: now ? "#2a8703" : undefined }}>
        {now && <span className="text-base">Now </span>}
        <sup className="text-[10px]">$</sup><span className="text-xl">{d}</span><sup className="text-[10px]">{c}</sup>
      </span>
      {p.was && <span className="text-xs text-gray-500 line-through">{p.was}</span>}
      {p.unit && <span className="text-xs text-gray-600">{p.unit}</span>}
    </div>
  );
}

function ProductCard({ p }: { p: P }) {
  return (
    <div className="relative text-sm">
      <div className="h-6">
        {p.badge && (
          <span className="rounded px-2 py-0.5 text-xs font-bold" style={p.badge === "Rollback" ? { background: "#ea1100", color: "#fff" } : { background: "#e6f1fc", color: NAVY }}>
            {p.badge === "Rollback" ? "↓ Rollback" : p.badge}
          </span>
        )}
      </div>
      <div className="relative mt-2 flex aspect-square items-center justify-center">
        <div className="flex h-[88%] w-[62%] items-center justify-center rounded-sm p-2 text-center shadow-lg" style={{ background: p.color }}>
          <span className="text-lg font-black leading-tight" style={{ fontFamily: "Anton, sans-serif", color: p.color === "#f2efe6" ? NAVY : "#fff" }}>{p.label}</span>
        </div>
        <span className="absolute right-1 top-1 text-xl">♡</span>
      </div>
      <div className="mt-2 h-5 text-center text-xs text-gray-600">{p.options && `+ ${p.options}`}</div>
      <button className="mt-2 rounded-full px-4 py-1.5 text-sm font-bold text-white" style={{ background: BLUE }}>{p.btn ?? "+ Add"}</button>
      <div className="mt-2"><Price p={p} /></div>
      {p.options && !p.was && <div className="text-xs text-gray-600">Options from ${p.price}</div>}
      <div className="mt-1 line-clamp-3 text-[15px] leading-5 text-gray-900">{p.name}</div>
      <div className="mt-1 text-xs font-bold" style={{ color: BLUE }}>Save with W+</div>
      <div className="mt-1 text-[11px] text-gray-700">Delivery as soon as <b>7am</b><br />Pickup as soon as <b>7am</b></div>
    </div>
  );
}

function Shelf({ title, items }: { title: string; items: P[] }) {
  return (
    <section className="border-b border-gray-200 pb-6">
      <h2 className="mb-4 text-[22px] font-bold">{title}</h2>
      <div className="relative">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-6">
          {items.map((p) => <ProductCard key={p.name} p={p} />)}
        </div>
        <button className="absolute -right-4 top-[30%] hidden h-11 w-11 items-center justify-center rounded-full border border-gray-800 bg-white text-xl md:flex">›</button>
      </div>
    </section>
  );
}

function Stripes({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 opacity-25" style={{ backgroundImage: `repeating-linear-gradient(90deg, ${color} 0 6px, transparent 6px 14px)`, maskImage: "linear-gradient(180deg, #000 0 18%, transparent 18% 82%, #000 82%)", WebkitMaskImage: "linear-gradient(180deg, #000 0 18%, transparent 18% 82%, #000 82%)" }} />
  );
}

function RegionBanner({ title, bg, fg }: { title: string; bg: string; fg: string }) {
  return (
    <div className="relative flex h-[clamp(110px,14vw,226px)] items-center overflow-hidden rounded-lg px-[5%]" style={{ background: bg }}>
      <Stripes color={fg} />
      <span className="relative mr-4 text-[clamp(24px,4.4vw,72px)]" style={{ fontFamily: "'Dancing Script', cursive", color: fg }}>Flavors from the</span>
      <span className="relative -rotate-3 text-[clamp(44px,9vw,150px)] leading-none" style={{ fontFamily: "Anton, sans-serif", color: fg }}>{title}</span>
    </div>
  );
}

function RecipeCard({ state, title, desc, color }: { state: string; title: string; desc: string; color: string }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-[0_1px_4px_rgba(0,0,0,.2)]">
      <div className="relative aspect-[16/9]" style={{ background: `radial-gradient(circle at 40% 60%, ${color}, #2b2b2b 140%)` }}>
        <div className="absolute left-0 right-0 top-[14px] h-[3px] bg-[#ea1100]" />
        <div className="absolute left-0 right-0 top-[30px] h-[3px] bg-[#7fd0f5]" />
        <span className="absolute left-0 top-0 bg-white px-4 py-2 text-[26px] tracking-wide" style={{ fontFamily: "Anton, sans-serif", color: "#0b2fa0" }}>{state}</span>
      </div>
      <div className="p-4">
        <h3 className="text-[17px] font-bold">{title}</h3>
        <p className="mt-2 h-10 text-[13px] text-gray-700">{desc}</p>
        <button className="mt-2 rounded-full border border-gray-900 px-4 py-1.5 text-[13px] font-bold">Shop Ingredients</button>
      </div>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Bogle', 'Helvetica Neue', Arial, sans-serif" }}>
      <header style={{ background: BLUE }} className="text-white">
        <div className="flex items-center gap-5 px-6 py-3">
          <Spark />
          <div className="hidden items-center gap-3 rounded-full px-4 py-2 md:flex" style={{ background: "#002d9c" }}>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm">🛍</span>
            <div className="text-xs leading-tight"><div className="text-sm font-bold">Pickup or delivery?</div>Sacramento, 95829 • Sacramento Su...</div>
            <span>⌄</span>
          </div>
          <div className="flex flex-1 items-center rounded-full bg-white py-1.5 pl-5 pr-1.5 text-sm text-gray-700">
            <span className="flex-1">Search everything at Walmart online and in store</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full text-white" style={{ background: NAVY }}>⌕</span>
          </div>
          <div className="hidden text-xs leading-tight md:block">♡ Reorder<br /><b className="text-sm">My Items</b></div>
          <div className="hidden text-xs leading-tight md:block">Sign In<br /><b className="text-sm">Account</b></div>
          <div className="text-center text-xs">🛒<br />$0.00</div>
        </div>
      </header>
      <div className="flex gap-2 overflow-x-auto px-6 py-2 shadow-sm">
        <span className="whitespace-nowrap rounded-full border border-gray-300 px-3 py-1.5 text-[13px] font-bold">Departments ⌄</span>
        <span className="whitespace-nowrap rounded-full border border-gray-300 px-3 py-1.5 text-[13px] font-bold">Services ⌄</span>
        {nav.map((n) => (
          <span key={n} className="whitespace-nowrap rounded-full border border-gray-300 px-3 py-1.5 text-[13px]" style={{ color: NAVY }}>{n}</span>
        ))}
      </div>

      <main className="mx-auto max-w-[1612px] space-y-8 px-[8%] py-8">
        <h1 className="text-[30px] font-bold">General Mills</h1>

        <div className="relative flex h-[clamp(120px,14vw,227px)] items-center justify-center gap-4 overflow-hidden rounded-lg" style={{ background: "#0b2fa8", backgroundImage: "radial-gradient(#ffffff22 1px, transparent 1px)", backgroundSize: "6px 6px" }}>
          <span className="text-[clamp(40px,7vw,120px)] leading-none text-white" style={{ fontFamily: "Anton, sans-serif" }}>AMERICA</span>
          <span className="text-[clamp(28px,5vw,80px)] text-[#7fd0f5]" style={{ fontFamily: "'Dancing Script', cursive" }}>the</span>
          <span className="text-[clamp(40px,7vw,120px)] leading-none text-[#ea1100]" style={{ fontFamily: "Anton, sans-serif" }}>FLAVORFUL</span>
        </div>

        <Shelf title="Find your flavor" items={flavor} />
        <Shelf title="Celebrate America's birthday" items={celebrate} />

        <MomentBanner />

        {regions.map((r) => (
          <section key={r.title} className="space-y-6">
            <RegionBanner title={r.title} bg={r.bg} fg={r.fg} />
            <h2 className="text-[20px] font-bold">Explore recipes</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {r.recipes.map(([s, t, d, c]) => <RecipeCard key={s} state={s!} title={t!} desc={d!} color={c!} />)}
            </div>
          </section>
        ))}
      </main>

      <footer className="mt-10 py-10 text-center text-xs text-white" style={{ background: NAVY }}>
        Demo replica for presentation purposes only. © 2026
      </footer>
    </div>
  );
}
