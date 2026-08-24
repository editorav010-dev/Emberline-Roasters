import { useCallback, useMemo, useState } from "react";
import {
  CATEGORY_LABELS,
  FLAT_SHIPPING,
  FREE_SHIPPING_THRESHOLD,
  PRODUCTS,
  priceFor,
  type Grind,
  type Product,
  type Weight,
} from "./data/products";
import { useLocalStorage, useLockBody } from "./hooks";
import {
  CraftSection,
  Footer,
  Header,
  Hero,
  OriginMarquee,
  ReviewsSection,
  Ticker,
} from "./components/chrome";
import { ShopSection, type SortId } from "./components/shop";
import {
  CartDrawer,
  CheckoutModal,
  ProductDrawer,
  Toasts,
  type CartLine,
  type EnrichedLine,
  type ToastMsg,
} from "./components/overlays";

export default function App() {
  const [cart, setCart] = useLocalStorage<CartLine[]>("emberline-cart-v1", []);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortId>("featured");
  const [active, setActive] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  useLockBody(Boolean(active) || cartOpen || checkoutOpen);

  /* ------------------------------- toasts ------------------------------- */
  const pushToast = useCallback((msg: string) => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t.slice(-2), { id, msg }]);
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3400);
  }, []);

  /* ----------------------------- filtering ------------------------------ */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => category === "all" || p.category === category);
    if (q) {
      list = list.filter((p) =>
        [p.name, p.origin, p.region, p.process, p.badge, CATEGORY_LABELS[p.category], ...p.notes]
          .join(" ")
          .toLowerCase()
          .includes(q),
      );
    }
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "roast":
        list = [...list].sort((a, b) => a.roast - b.roast);
        break;
      default:
        break;
    }
    return list;
  }, [search, category, sort]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: PRODUCTS.length };
    for (const p of PRODUCTS) c[p.category] = (c[p.category] ?? 0) + 1;
    return c;
  }, []);

  /* -------------------------------- cart -------------------------------- */
  const lines: EnrichedLine[] = useMemo(
    () =>
      cart
        .map((l) => {
          const product = PRODUCTS.find((p) => p.id === l.id);
          return product
            ? { ...l, product, lineTotal: priceFor(product, l.weight) * l.qty }
            : null;
        })
        .filter((l): l is EnrichedLine => l !== null),
    [cart],
  );

  const cartCount = lines.reduce((n, l) => n + l.qty, 0);
  const subtotal = lines.reduce((n, l) => n + l.lineTotal, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const total = subtotal + shipping;

  const addToCart = useCallback(
    (p: Product, weight: Weight = "250g", grind: Grind = "whole", qty = 1) => {
      const key = `${p.id}|${weight}|${grind}`;
      setCart((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (existing) {
          return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(10, l.qty + qty) } : l));
        }
        return [...prev, { key, id: p.id, weight, grind, qty }];
      });
      pushToast(`${p.name} added to your cart`);
    },
    [pushToast, setCart],
  );

  const changeQty = useCallback(
    (key: string, qty: number) => {
      setCart((prev) =>
        prev.map((l) => (l.key === key ? { ...l, qty: Math.min(10, Math.max(1, qty)) } : l)),
      );
    },
    [setCart],
  );

  const removeLine = useCallback(
    (key: string) => setCart((prev) => prev.filter((l) => l.key !== key)),
    [setCart],
  );

  /* ------------------------------ navigation ----------------------------- */
  const scrollToShop = useCallback(() => {
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const focusSearch = useCallback(() => {
    scrollToShop();
    window.setTimeout(() => {
      const el = document.getElementById("shop-search") as HTMLInputElement | null;
      el?.focus({ preventScroll: true });
    }, 450);
  }, [scrollToShop]);

  const openFeatured = useCallback(() => setActive(PRODUCTS[0]), []);

  const completeCheckout = useCallback(
    (orderNo: string) => {
      setCart([]);
      setCheckoutOpen(false);
      setCartOpen(false);
      pushToast(`Order ${orderNo} confirmed — see you at first crack`);
    },
    [pushToast, setCart],
  );

  /* -------------------------------- render ------------------------------- */
  return (
    <div id="top" className="min-h-screen bg-espresso text-cream">
      <Ticker />
      <Header
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onSearchFocus={focusSearch}
      />

      <main>
        <Hero onBrowse={scrollToShop} onFeatured={openFeatured} />
        <OriginMarquee />
        <ShopSection
          products={filtered}
          shown={filtered.length}
          total={PRODUCTS.length}
          search={search}
          onSearch={setSearch}
          category={category}
          onCategory={setCategory}
          sort={sort}
          onSort={setSort}
          counts={counts}
          onOpen={setActive}
          onQuickAdd={(p) => addToCart(p)}
          onClearAll={() => {
            setSearch("");
            setCategory("all");
            setSort("featured");
          }}
        />
        <CraftSection />
        <ReviewsSection />
      </main>

      <Footer onToast={pushToast} onFeatured={openFeatured} />

      {active && (
        <ProductDrawer
          key={active.id}
          product={active}
          onClose={() => setActive(null)}
          onAdd={(p, w, g, q) => {
            addToCart(p, w, g, q);
            setActive(null);
            setCartOpen(true);
          }}
        />
      )}

      {cartOpen && (
        <CartDrawer
          lines={lines}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          onClose={() => setCartOpen(false)}
          onQty={changeQty}
          onRemove={removeLine}
          onCheckout={() => {
            setCartOpen(false);
            setCheckoutOpen(true);
          }}
          onBrowse={() => {
            setCartOpen(false);
            scrollToShop();
          }}
        />
      )}

      {checkoutOpen && lines.length > 0 && (
        <CheckoutModal
          lines={lines}
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          onClose={() => setCheckoutOpen(false)}
          onComplete={completeCheckout}
        />
      )}

      <Toasts toasts={toasts} />

      {/* film grain */}
      <div aria-hidden className="grain-overlay pointer-events-none fixed inset-0 z-[95] opacity-[0.05]" />
    </div>
  );
}
