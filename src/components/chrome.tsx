import { useEffect, useState, type FormEvent } from "react";
import { Reveal } from "../hooks";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  BeanIcon,
  CartIcon,
  FlameIcon,
  KettleIcon,
  LeafIcon,
  MenuIcon,
  PinIcon,
  SearchIcon,
  StarIcon,
  TruckIcon,
  XIcon,
} from "./icons";
import { RingStain, StampBadge } from "./BagArt";

export const HERO_IMG =
  "https://image.qwenlm.ai/generated-images/9240929a-140f-4eb2-a41c-c30508f6a969/_result.png";
export const CRAFT_IMG =
  "https://image.qwenlm.ai/generated-images/a41d5e2a-9261-4b5d-861f-440b4a2b03fa/_result.png";

/* ---------------------------------- ticker ---------------------------------- */

const TICKER_ITEMS = [
  "Fresh roast every Tuesday",
  "Free shipping over $45",
  "Roasted to order — ships within 72h",
  "Cupping lab open Sat 10 am",
  "Six coffees · zero warehouses",
];

export function Ticker() {
  const row = (hidden: boolean) => (
    <div
      aria-hidden={hidden}
      className="flex shrink-0 items-center gap-8 pr-8 font-mono text-[11px] font-bold uppercase tracking-[0.18em]"
    >
      {TICKER_ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-8 whitespace-nowrap">
          {item}
          <BeanIcon className="h-3.5 w-3.5 opacity-70" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-b border-espresso/20 bg-caramel py-2 text-espresso marquee-paused">
      <div className="animate-marquee flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

/* ---------------------------------- header ---------------------------------- */

const NAV = [
  { href: "#shop", label: "The shelf" },
  { href: "#craft", label: "Our craft" },
  { href: "#word", label: "Word of mouth" },
];

export function Header({
  cartCount,
  onCartOpen,
  onSearchFocus,
}: {
  cartCount: number;
  onCartOpen: () => void;
  onSearchFocus: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-cream/10 bg-espresso/90 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-[0_10px_30px_rgba(10,5,2,0.5)]" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-caramel text-espresso transition-transform duration-300 group-hover:rotate-12">
            <BeanIcon className="h-5 w-5" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-lg font-semibold tracking-wide">Emberline</span>
            <span className="mt-0.5 block font-mono text-[9px] tracking-[0.32em] text-cream/50">
              ROASTERS · PDX
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="relative text-sm font-semibold text-cream/70 transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-caramel after:transition-transform after:duration-300 hover:text-caramel hover:after:scale-x-100"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onSearchFocus}
            title="Search the shelf"
            className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition-all hover:border-caramel hover:text-caramel active:scale-95"
          >
            <SearchIcon className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={onCartOpen}
            className="relative flex h-10 items-center gap-2 rounded-full border border-cream/15 px-4 text-sm font-bold text-cream/85 transition-all hover:border-caramel hover:text-caramel active:scale-95"
          >
            <CartIcon className="h-4.5 w-4.5" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="animate-bump absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-caramel px-1 font-mono text-[11px] font-bold text-espresso"
              >
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-caramel hover:text-caramel lg:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <XIcon className="h-4.5 w-4.5" /> : <MenuIcon className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="animate-fade border-t border-cream/10 bg-roast px-6 py-4 lg:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between border-b border-cream/5 py-3 font-display text-xl text-cream/85 last:border-0 hover:text-caramel"
            >
              {n.label}
              <ArrowRightIcon className="h-4 w-4 text-caramel" />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

/* ----------------------------------- hero ----------------------------------- */

export function Hero({ onBrowse, onFeatured }: { onBrowse: () => void; onFeatured: () => void }) {
  return (
    <section className="relative overflow-hidden">
      {/* ambient glows + stains */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(55% 45% at 78% 12%, rgba(217,150,74,0.16), transparent 70%), radial-gradient(45% 40% at 8% 85%, rgba(176,96,63,0.12), transparent 70%)",
        }}
      />
      <RingStain className="pointer-events-none absolute right-[34%] top-24 hidden w-36 rotate-12 text-caramel opacity-[0.13] lg:block" />
      <RingStain className="pointer-events-none absolute -left-10 bottom-8 w-28 -rotate-6 text-sienna opacity-10 lg:block" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.3em] text-caramel">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-caramel" />
              Portland, OR — small-batch roastery
            </p>
          </Reveal>
          <Reveal delay={90}>
            <h1 className="mt-6 font-display text-[42px] font-medium leading-[1.02] sm:text-6xl xl:text-[74px]">
              Six coffees.
              <br />
              <em className="text-caramel">Roasted the morning</em>
              <br />
              you order them.
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/65">
              We buy direct from fourteen farms, roast in twelve-kilo batches, and ship within
              three days of the drop. No warehouses, no stale shelves — just coffee that still
              tastes like where it grew.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                onClick={onBrowse}
                className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-caramel px-7 font-bold text-espresso shadow-[0_10px_28px_rgba(217,150,74,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-cream active:translate-y-0"
              >
                Browse the shelf
                <ArrowDownIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </button>
              <button
                onClick={onFeatured}
                className="group inline-flex h-12 items-center gap-2.5 rounded-full border border-cream/20 px-7 font-bold text-cream/85 transition-all duration-300 hover:border-caramel hover:text-caramel"
              >
                Meet this week's roast
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </Reveal>
          <Reveal delay={340}>
            <dl className="mt-12 grid grid-cols-3 divide-x divide-cream/10 border-t border-cream/10 pt-6">
              {[
                ["06", "Coffees in rotation"],
                ["72h", "Roast to ship"],
                ["14", "Partner farms"],
              ].map(([num, label]) => (
                <div key={label} className="px-4 first:pl-0">
                  <dt className="sr-only">{label}</dt>
                  <dd className="font-mono text-2xl text-cream sm:text-3xl">{num}</dd>
                  <dd className="mt-1 text-[10px] uppercase tracking-[0.2em] text-cream/45">{label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <Reveal delay={150}>
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 translate-x-3.5 translate-y-3.5 rounded-t-full rounded-b-[28px] border border-caramel/40"
              />
              <div className="relative aspect-[4/5.1] overflow-hidden rounded-t-full rounded-b-[28px] border border-cream/15">
                <img
                  src={HERO_IMG}
                  alt="Gooseneck kettle pouring into a ceramic pour-over dripper"
                  className="animate-kenburns absolute inset-0 h-full w-full object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-espresso/10"
                />
                <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-xl border border-cream/10 bg-espresso/70 px-4 py-3 backdrop-blur-sm">
                  <div>
                    <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.24em] text-caramel">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-caramel" />
                      Today's pour
                    </p>
                    <p className="mt-1 text-sm font-bold text-cream">Idido Natural — V60</p>
                  </div>
                  <KettleIcon className="h-8 w-8 shrink-0 text-caramel" />
                </div>
              </div>
              <StampBadge
                text="ROASTED TO ORDER · SMALL BATCH · EST. 2017 ·"
                className="spin-slow absolute -left-10 -top-7 hidden h-28 w-28 text-caramel drop-shadow-[0_6px_18px_rgba(217,150,74,0.35)] sm:block"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ origin marquee ------------------------------ */

const ORIGINS = [
  "Ethiopia · Gedeb",
  "Colombia · Huila",
  "Kenya · Kirinyaga",
  "Brazil · Cerrado",
  "Guatemala · Acatenango",
  "Honduras · Intibucá",
];

export function OriginMarquee() {
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center gap-10 pr-10">
      {ORIGINS.map((o) => (
        <span key={o} className="flex items-center gap-10">
          <span className="whitespace-nowrap font-display text-2xl italic text-cream/75">{o}</span>
          <BeanIcon className="h-5 w-5 shrink-0 text-caramel" />
        </span>
      ))}
    </div>
  );
  return (
    <section aria-label="Origins we source from" className="marquee-paused overflow-hidden border-y border-cream/10 bg-roast py-5">
      <div className="animate-marquee-slow flex w-max">{row(false)}{row(true)}</div>
    </section>
  );
}

/* -------------------------------- craft section ----------------------------- */

const STEPS = [
  {
    n: "01",
    icon: LeafIcon,
    t: "Source direct",
    d: "Fourteen farms we visit and pay above commodity — relationships measured in years, not containers.",
  },
  {
    n: "02",
    icon: FlameIcon,
    t: "Sample obsessively",
    d: "Every lot is cupped three times before it earns a slot on the shelf. Most don't make it.",
  },
  {
    n: "03",
    icon: KettleIcon,
    t: "Roast in small batches",
    d: "Twelve kilos at a time, profiles tuned per lot and logged to the second.",
  },
  {
    n: "04",
    icon: TruckIcon,
    t: "Rest, pack, ship",
    d: "Beans rest 24 hours, then ship in valve-sealed bags within 72 hours of roast.",
  },
];

export function CraftSection() {
  return (
    <section id="craft" className="relative scroll-mt-20 bg-espresso py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div
              aria-hidden
              className="absolute inset-0 -translate-x-3.5 translate-y-3.5 rounded-t-full rounded-b-[28px] border border-caramel/40"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full rounded-b-[28px] border border-cream/15">
              <img
                src={CRAFT_IMG}
                alt="Freshly roasted beans cooling in the roastery tray"
                className="animate-kenburns absolute inset-0 h-full w-full object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/70 via-transparent to-transparent" />
              <p className="absolute inset-x-4 bottom-4 flex items-center gap-2.5 rounded-xl border border-cream/10 bg-espresso/70 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-cream/80 backdrop-blur-sm">
                <PinIcon className="h-4 w-4 text-caramel" />
                The roastery — SE Ankeny St
              </p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-caramel">// Our craft</p>
            <h2 className="mt-5 font-display text-4xl font-medium leading-tight sm:text-5xl">
              Patience is the <em className="text-caramel">whole</em> recipe.
            </h2>
            <p className="mt-5 max-w-lg leading-relaxed text-cream/60">
              Great coffee is mostly waiting: waiting for cherries to ripen, waiting for the drum
              to come up to temperature, waiting for the bean to rest. We built the whole shop
              around the parts nobody hurries.
            </p>
          </Reveal>

          <div className="mt-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 80}>
                <div className="group -mx-3 flex items-baseline gap-5 rounded-xl border-t border-cream/10 px-3 py-5 transition-all duration-300 hover:bg-cream/[0.04] hover:pl-6 sm:gap-7">
                  <span className="font-mono text-sm font-bold text-caramel/50 transition-colors group-hover:text-caramel">
                    {s.n}
                  </span>
                  <div>
                    <h3 className="flex items-center gap-2.5 font-display text-2xl">
                      <s.icon className="h-5 w-5 text-sienna opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      {s.t}
                    </h3>
                    <p className="mt-1.5 max-w-md text-sm leading-relaxed text-cream/55">{s.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <div className="mt-8 rounded-xl border border-cream/10 bg-roast p-5 font-mono text-[11px] leading-relaxed text-cream/70">
              <div className="flex items-center justify-between text-caramel">
                <span className="font-bold tracking-[0.18em]">ROAST LOG — BATCH #214</span>
                <span className="text-[10px] text-cream/40">LORING S15</span>
              </div>
              <div className="mt-3 space-y-0.5">
                <p>LOT ......... ETHIOPIA · IDIDO NATURAL</p>
                <p>CHARGE ...... 176°C · 0:00</p>
                <p>TURNING ..... 95°C · 1:24</p>
                <p>FIRST CRACK . 196°C · 9:42</p>
                <p>
                  DROP ........ 204°C · 11:30 <span className="text-caramel">(1:48 dev)</span>
                  <span className="animate-blink ml-1 inline-block h-3 w-1.5 translate-y-0.5 bg-caramel" />
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- reviews ---------------------------------- */

const REVIEWS = [
  {
    quote: "The Idido tastes like apricot jam in the best possible way. I've ruined café coffee for myself.",
    name: "Maya R.",
    city: "Portland, OR",
    stars: 5,
    cls: "md:-rotate-2 bg-cream",
  },
  {
    quote: "Midnight Ledger is the first espresso I've pulled at home that tastes like the shop's.",
    name: "Daniel K.",
    city: "Austin, TX",
    stars: 5,
    cls: "md:rotate-1 md:translate-y-8 bg-caramel/25",
  },
  {
    quote: "Quiet Hours converted me to decaf. My 4 pm self is grateful — my 11 pm self especially.",
    name: "Priya S.",
    city: "Seattle, WA",
    stars: 5,
    cls: "md:-rotate-1 md:translate-y-3 bg-cream",
  },
];

export function ReviewsSection() {
  return (
    <section id="word" className="relative scroll-mt-20 overflow-hidden bg-parchment py-20 text-espresso lg:py-28">
      <RingStain className="pointer-events-none absolute -right-8 top-10 w-40 rotate-6 text-sienna opacity-[0.14]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-sienna">// Word of mouth</p>
              <h2 className="mt-4 font-display text-4xl font-medium sm:text-5xl">From the cupping table.</h2>
            </div>
            <p className="font-mono text-sm text-espresso/50">4.8 avg · 650+ reviews</p>
          </div>
        </Reveal>

        <div className="mt-14 grid items-start gap-10 md:grid-cols-3 md:gap-8">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 110}>
              <figure
                className={`relative border border-espresso/10 p-6 pt-8 shadow-[0_16px_40px_rgba(26,17,12,0.1)] transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[0_24px_56px_rgba(26,17,12,0.16)] ${r.cls}`}
              >
                <span
                  aria-hidden
                  className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-3 rounded-sm bg-caramel/60 shadow-sm"
                />
                <div className="flex gap-1 text-sienna">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <StarIcon key={j} filled className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="mt-4 font-display text-xl italic leading-snug">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-espresso/50">
                  {r.name} — {r.city}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- footer ---------------------------------- */

export function Footer({
  onToast,
  onFeatured,
}: {
  onToast: (msg: string) => void;
  onFeatured: () => void;
}) {
  const [email, setEmail] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      onToast("Hmm — that email doesn't look right.");
      return;
    }
    setEmail("");
    onToast("You're on the first-crack list. Welcome in.");
  };

  return (
    <footer className="border-t border-cream/10 bg-espresso">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl font-medium leading-tight sm:text-4xl">
              First crack news, <em className="text-caramel">once a month.</em>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/55">
              Roast schedules, new lots, and the occasional brew argument. One email a month,
              written by a human with chaff in their hair.
            </p>
            <form onSubmit={submit} className="mt-6 flex max-w-md gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@somewhere.com"
                className="h-12 min-w-0 flex-1 rounded-full border border-cream/15 bg-roast px-5 text-sm text-cream placeholder:text-cream/35 transition-colors focus:border-caramel focus:outline-none"
              />
              <button className="h-12 shrink-0 rounded-full bg-caramel px-6 font-bold text-espresso transition-all hover:bg-cream active:scale-95">
                Sign me up
              </button>
            </form>
          </div>

          <div className="lg:col-span-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/40">Shop</p>
            <ul className="mt-4 space-y-2.5 text-sm font-semibold text-cream/70">
              <li><a href="#shop" className="transition-colors hover:text-caramel">The shelf</a></li>
              <li>
                <button onClick={onFeatured} className="transition-colors hover:text-caramel">
                  Roast of the week
                </button>
              </li>
              <li><a href="#craft" className="transition-colors hover:text-caramel">Our craft</a></li>
              <li><a href="#word" className="transition-colors hover:text-caramel">Word of mouth</a></li>
            </ul>
          </div>

          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-cream/40">Visit</p>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/60">
              <li className="flex items-start gap-2.5">
                <PinIcon className="mt-0.5 h-4 w-4 shrink-0 text-caramel" />
                1214 SE Ankeny St, Portland, OR
              </li>
              <li className="pl-6.5">Espresso bar — Tue–Sun, 7–4</li>
              <li className="pl-6.5">Cupping lab — Saturdays, 10 am</li>
            </ul>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-cream/40">Elsewhere</p>
            <div className="mt-4 flex gap-5 text-sm font-semibold text-cream/70">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-caramel">Instagram</a>
              <a href="https://open.spotify.com" target="_blank" rel="noreferrer" className="transition-colors hover:text-caramel">Roastery radio</a>
              <a href="mailto:hello@emberline.coffee" className="transition-colors hover:text-caramel">Email us</a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-3 border-t border-cream/10 pt-6 font-mono text-[11px] text-cream/40 md:flex-row">
          <p>© 2026 Emberline Roasters — roasted with patience in Portland, OR</p>
          <p>Demo storefront · no beans were charged in the making</p>
        </div>
      </div>
    </footer>
  );
}
