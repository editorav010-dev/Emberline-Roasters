import { useEffect, useRef, useState } from "react";
import {
  CATEGORIES,
  money,
  type Product,
} from "../data/products";
import { Reveal } from "../hooks";
import { BagArt, RingStain, RoastMeter } from "./BagArt";
import { ArrowRightIcon, BeanIcon, CheckIcon, PlusIcon, SearchIcon, StarIcon, XIcon } from "./icons";

export type SortId = "featured" | "price-asc" | "price-desc" | "roast";

/* --------------------------------- shop bar --------------------------------- */

function ShopBar({
  search,
  onSearch,
  category,
  onCategory,
  sort,
  onSort,
  counts,
}: {
  search: string;
  onSearch: (v: string) => void;
  category: string;
  onCategory: (v: string) => void;
  sort: SortId;
  onSort: (v: SortId) => void;
  counts: Record<string, number>;
}) {
  return (
    <div className="sticky top-16 z-30 -mx-4 border-y border-espresso/10 bg-parchment/95 px-4 py-3.5 backdrop-blur-sm sm:-mx-6 sm:px-6">
      <div className="mx-auto flex max-w-7xl flex-col gap-3">
        <div className="flex gap-2.5">
          <div className="relative min-w-0 flex-1">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso/40" />
            <input
              id="shop-search"
              type="text"
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search beans, origins, tasting notes…"
              className="h-11 w-full rounded-full border border-espresso/15 bg-cream pl-11 pr-9 text-sm text-espresso placeholder:text-espresso/35 transition-colors focus:border-sienna focus:outline-none"
            />
            {search && (
              <button
                onClick={() => onSearch("")}
                title="Clear search"
                className="absolute right-2.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-espresso/45 transition-colors hover:bg-espresso hover:text-cream"
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <div className="relative shrink-0">
            <select
              value={sort}
              onChange={(e) => onSort(e.target.value as SortId)}
              className="h-11 cursor-pointer appearance-none rounded-full border border-espresso/15 bg-cream pl-4 pr-9 font-mono text-[11px] font-bold uppercase tracking-wide text-espresso transition-colors focus:border-sienna focus:outline-none"
              aria-label="Sort products"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price · low first</option>
              <option value="price-desc">Price · high first</option>
              <option value="roast">Roast · light first</option>
            </select>
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso/50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onCategory("all")}
            className={`h-9 rounded-full border px-4 text-sm font-bold transition-all duration-200 ${
              category === "all"
                ? "border-espresso bg-espresso text-cream shadow-[0_6px_16px_rgba(26,17,12,0.25)]"
                : "border-espresso/20 text-espresso/70 hover:-translate-y-0.5 hover:border-espresso/60"
            }`}
          >
            All beans
            <span className="ml-1.5 font-mono text-[10px] opacity-60">{counts.all}</span>
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => onCategory(c.id)}
              className={`h-9 rounded-full border px-4 text-sm font-bold transition-all duration-200 ${
                category === c.id
                  ? "border-espresso bg-espresso text-cream shadow-[0_6px_16px_rgba(26,17,12,0.25)]"
                  : "border-espresso/20 text-espresso/70 hover:-translate-y-0.5 hover:border-espresso/60"
              }`}
            >
              {c.label}
              <span className="ml-1.5 font-mono text-[10px] opacity-60">{counts[c.id] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------- product card ------------------------------ */

function ProductCard({
  product,
  index,
  onOpen,
  onQuickAdd,
}: {
  product: Product;
  index: number;
  onOpen: () => void;
  onQuickAdd: () => void;
}) {
  const [added, setAdded] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const accent = product.accent;

  return (
    <Reveal delay={(index % 3) * 80}>
      <article
        onClick={onOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen();
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View details for ${product.name}`}
        className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-[22px] border border-espresso/10 bg-cream transition-all duration-300 hover:-translate-y-1.5 hover:border-espresso/25 hover:shadow-[0_28px_52px_rgba(26,17,12,0.16)]"
      >
        <div
          className="relative flex h-60 items-end justify-center pt-5"
          style={{
            background: `radial-gradient(85% 95% at 50% 105%, ${accent}30, ${accent}12 62%, transparent)`,
          }}
        >
          <div
            aria-hidden
            className="absolute inset-x-12 top-5 bottom-0 rounded-t-full border transition-colors duration-300 group-hover:border-transparent"
            style={{ borderColor: `${accent}3d`, background: `${accent}14` }}
          />
          <span className="absolute left-4 top-4 z-10 rounded-full border border-espresso/15 bg-cream/85 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-espresso/70">
            {product.badge}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd();
              setAdded(true);
              window.clearTimeout(timer.current);
              timer.current = window.setTimeout(() => setAdded(false), 1300);
            }}
            title="Quick add — 250 g, whole bean"
            aria-label={`Quick add ${product.name} to cart`}
            className={`absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full shadow-[0_8px_18px_rgba(26,17,12,0.28)] transition-all duration-300 hover:scale-110 active:scale-95 ${
              added ? "bg-olive text-cream" : "bg-espresso text-cream hover:bg-sienna"
            }`}
          >
            {added ? <CheckIcon className="h-4.5 w-4.5" /> : <PlusIcon className="h-4.5 w-4.5" />}
          </button>
          <BagArt
            product={product}
            className="relative z-[5] h-44 drop-shadow-[0_16px_20px_rgba(26,17,12,0.22)] transition-transform duration-500 ease-out group-hover:-rotate-3 group-hover:scale-[1.05]"
          />
        </div>

        <div className="flex flex-1 flex-col p-5 pt-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/45">
            {product.origin} — {product.process.split(",")[0]}
          </p>
          <h3 className="mt-1 font-display text-[26px] leading-tight transition-colors group-hover:text-sienna">
            {product.name}
          </h3>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {product.notes.slice(0, 3).map((n) => (
              <li
                key={n}
                className="rounded-full border border-espresso/15 bg-parchment/70 px-2.5 py-0.5 text-xs font-semibold text-espresso/70"
              >
                {n}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between gap-3">
            <RoastMeter roast={product.roast} />
            <span className="flex items-center gap-1 font-mono text-xs text-espresso/60">
              <StarIcon filled className="h-3.5 w-3.5 text-sienna" />
              {product.rating}
              <span className="text-espresso/35">({product.reviews})</span>
            </span>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-dashed border-espresso/20 pt-4">
            <p>
              <span className="font-display text-2xl font-semibold">{money(product.price)}</span>
              <span className="ml-1.5 font-mono text-[10px] text-espresso/40">/ 250 g</span>
            </p>
            <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-espresso/40 transition-colors group-hover:text-sienna">
              Details
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

/* -------------------------------- shop section ------------------------------ */

export function ShopSection({
  products,
  shown,
  total,
  search,
  onSearch,
  category,
  onCategory,
  sort,
  onSort,
  counts,
  onOpen,
  onQuickAdd,
  onClearAll,
}: {
  products: Product[];
  shown: number;
  total: number;
  search: string;
  onSearch: (v: string) => void;
  category: string;
  onCategory: (v: string) => void;
  sort: SortId;
  onSort: (v: SortId) => void;
  counts: Record<string, number>;
  onOpen: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
  onClearAll: () => void;
}) {
  return (
    <section id="shop" className="relative scroll-mt-16 bg-parchment pb-24 pt-14 text-espresso">
      <RingStain className="pointer-events-none absolute -left-12 top-40 w-44 -rotate-12 text-sienna opacity-[0.1]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal>
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-sienna">// The shelf</p>
              <h2 className="mt-3 font-display text-4xl font-medium sm:text-5xl">This week's rotation.</h2>
            </div>
            <p aria-live="polite" className="font-mono text-xs text-espresso/50">
              Showing {shown} of {total} coffees
            </p>
          </div>
        </Reveal>
      </div>

      <ShopBar
        search={search}
        onSearch={onSearch}
        category={category}
        onCategory={onCategory}
        sort={sort}
        onSort={onSort}
        counts={counts}
      />

      <div className="mx-auto mt-10 grid max-w-7xl gap-x-6 gap-y-10 px-4 sm:grid-cols-2 sm:px-6 xl:grid-cols-3">
        {products.map((p, i) => (
          <ProductCard
            key={p.id}
            product={p}
            index={i}
            onOpen={() => onOpen(p)}
            onQuickAdd={() => onQuickAdd(p)}
          />
        ))}

        {products.length === 0 && (
          <div className="col-span-full py-16 text-center">
            <BeanIcon className="mx-auto h-12 w-12 rotate-12 text-espresso/25" />
            <h3 className="mt-5 font-display text-3xl">
              Nothing brewed up{search ? <> for “{search}”</> : " here"}.
            </h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-espresso/55">
              Try a tasting note like “apricot”, an origin, or clear the filters and start fresh.
            </p>
            <button
              onClick={onClearAll}
              className="mt-6 h-11 rounded-full border border-espresso/30 px-6 font-bold transition-all hover:bg-espresso hover:text-cream"
            >
              Clear search & filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
