import {
  useEffect,
  useState,
  type FormEvent,
  type InputHTMLAttributes,
} from "react";
import {
  CATEGORY_LABELS,
  FREE_SHIPPING_THRESHOLD,
  GRINDS,
  WEIGHTS,
  grindLabel,
  money,
  priceFor,
  weightLabel,
  type Grind,
  type Product,
  type Weight,
} from "../data/products";
import { useEscape } from "../hooks";
import { BagArt, RoastMeter } from "./BagArt";
import {
  ArrowRightIcon,
  BeanIcon,
  CardIcon,
  CheckIcon,
  LockIcon,
  MinusIcon,
  PlusIcon,
  StarIcon,
  TrashIcon,
  TruckIcon,
  XIcon,
} from "./icons";

export interface CartLine {
  key: string;
  id: string;
  weight: Weight;
  grind: Grind;
  qty: number;
}

export interface EnrichedLine extends CartLine {
  product: Product;
  lineTotal: number;
}

export interface ToastMsg {
  id: number;
  msg: string;
}

/* --------------------------------- toasts ----------------------------------- */

export function Toasts({ toasts }: { toasts: ToastMsg[] }) {
  return (
    <div className="pointer-events-none fixed bottom-5 left-4 z-[90] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 sm:left-6">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="animate-toast flex items-center gap-3 rounded-xl border-l-4 border-caramel bg-espresso py-3 pl-3 pr-5 text-cream shadow-[0_16px_40px_rgba(10,5,2,0.5)]"
        >
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-caramel text-espresso">
            <CheckIcon className="h-4 w-4" />
          </span>
          <p className="text-sm font-bold">{t.msg}</p>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------ product drawer ------------------------------ */

export function ProductDrawer({
  product,
  onClose,
  onAdd,
}: {
  product: Product;
  onClose: () => void;
  onAdd: (p: Product, w: Weight, g: Grind, qty: number) => void;
}) {
  const [weight, setWeight] = useState<Weight>("250g");
  const [grind, setGrind] = useState<Grind>("whole");
  const [qty, setQty] = useState(1);
  useEscape(true, onClose);

  const price = priceFor(product, weight);
  const accent = product.accent;

  return (
    <div className="fixed inset-0 z-50">
      <div className="animate-fade absolute inset-0 bg-espresso/60 backdrop-blur-[2px]" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} details`}
        className="animate-slide-in absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-parchment text-espresso shadow-2xl"
      >
        <div className="flex items-center justify-between px-6 pt-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-espresso/45">
            {CATEGORY_LABELS[product.category]} · {product.region}
          </p>
          <button
            onClick={onClose}
            aria-label="Close details"
            className="grid h-9 w-9 place-items-center rounded-full border border-espresso/15 text-espresso/70 transition-all hover:bg-espresso hover:text-cream active:scale-95"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        <div
          className="relative mx-6 mt-3 flex h-56 shrink-0 items-end justify-center rounded-t-full border sm:h-60"
          style={{
            borderColor: `${accent}45`,
            background: `radial-gradient(85% 100% at 50% 105%, ${accent}33, ${accent}12 60%, transparent)`,
          }}
        >
          <span className="absolute left-5 top-7 rounded-full border border-espresso/15 bg-cream/85 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-espresso/70">
            {product.badge}
          </span>
          <BagArt
            product={product}
            className="h-44 drop-shadow-[0_18px_24px_rgba(26,17,12,0.25)] sm:h-48"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-4">
          <h2 className="mt-5 font-display text-3xl font-medium leading-tight">{product.name}</h2>
          <div className="mt-2 flex items-center gap-2">
            <span className="flex gap-0.5 text-sienna">
              {[1, 2, 3, 4, 5].map((i) => (
                <StarIcon key={i} filled={i <= Math.round(product.rating)} className="h-4 w-4" />
              ))}
            </span>
            <span className="font-mono text-xs text-espresso/55">
              {product.rating} · {product.reviews} reviews
            </span>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-espresso/70">{product.description}</p>

          {/* weight */}
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/50">Bag size</p>
          <div className="mt-2 flex rounded-full border border-espresso/15 bg-cream p-1">
            {WEIGHTS.map((w) => (
              <button
                key={w.id}
                onClick={() => setWeight(w.id)}
                className={`h-9 flex-1 rounded-full text-sm font-bold transition-all ${
                  weight === w.id ? "bg-espresso text-cream shadow" : "text-espresso/60 hover:text-espresso"
                }`}
              >
                {w.label}
                {w.id === "1kg" && (
                  <span className={`ml-1.5 font-mono text-[9px] ${weight === w.id ? "text-caramel" : "text-olive"}`}>
                    SAVE 10%
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* grind */}
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/50">Grind</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {GRINDS.map((g) => (
              <button
                key={g.id}
                onClick={() => setGrind(g.id)}
                className={`h-9 rounded-full border text-sm font-bold transition-all ${
                  grind === g.id
                    ? "border-espresso bg-espresso text-cream"
                    : "border-espresso/20 text-espresso/60 hover:border-espresso/60 hover:text-espresso"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          {/* tasting notes */}
          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-espresso/50">In the cup</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {product.notes.map((n) => (
              <li
                key={n}
                className="rounded-full border border-caramel/40 bg-caramel/15 px-3 py-1 text-xs font-bold text-espresso/80"
              >
                {n}
              </li>
            ))}
          </ul>

          {/* specs */}
          <dl className="mt-6 divide-y divide-dashed divide-espresso/15 border-y border-dashed border-espresso/15">
            {(
              [
                ["Producer", product.producer],
                ["Process", product.process],
                ["Altitude", product.altitude],
                ["Variety", product.variety],
              ] as [string, string][]
            ).map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-espresso/45">{k}</dt>
                <dd className="text-right text-sm font-semibold">{v}</dd>
              </div>
            ))}
            <div className="flex items-center justify-between gap-4 py-2.5">
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-espresso/45">Roast</dt>
              <dd>
                <RoastMeter roast={product.roast} />
              </dd>
            </div>
          </dl>

          {/* brew card */}
          <div className="mt-6 rounded-xl bg-espresso p-5 text-cream">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-caramel">
              Brewer's card — {product.brew.method}
            </p>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {(
                [
                  ["Ratio", product.brew.ratio],
                  ["Temp", product.brew.temp],
                  ["Time", product.brew.time],
                ] as [string, string][]
              ).map(([k, v]) => (
                <div key={k}>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cream/45">{k}</p>
                  <p className="mt-1 font-display text-lg leading-none">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* sticky footer */}
        <div className="flex gap-3 border-t border-espresso/10 bg-parchment/95 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center rounded-full border border-espresso/20 bg-cream">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              disabled={qty <= 1}
              aria-label="Decrease quantity"
              className="grid h-11 w-10 place-items-center text-espresso/70 transition-colors hover:text-sienna disabled:opacity-30 disabled:hover:text-espresso/70"
            >
              <MinusIcon className="h-4 w-4" />
            </button>
            <span className="w-7 text-center font-mono text-sm font-bold">{qty}</span>
            <button
              onClick={() => setQty((q) => Math.min(10, q + 1))}
              aria-label="Increase quantity"
              className="grid h-11 w-10 place-items-center text-espresso/70 transition-colors hover:text-sienna"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => onAdd(product, weight, grind, qty)}
            className="flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-caramel px-4 font-bold text-espresso transition-all hover:bg-espresso hover:text-cream active:scale-[0.98]"
          >
            Add {qty} to cart — {money(price * qty)}
          </button>
        </div>
      </aside>
    </div>
  );
}

/* -------------------------------- cart drawer ------------------------------- */

export function CartDrawer({
  lines,
  subtotal,
  shipping,
  total,
  onClose,
  onQty,
  onRemove,
  onCheckout,
  onBrowse,
}: {
  lines: EnrichedLine[];
  subtotal: number;
  shipping: number;
  total: number;
  onClose: () => void;
  onQty: (key: string, qty: number) => void;
  onRemove: (key: string) => void;
  onCheckout: () => void;
  onBrowse: () => void;
}) {
  useEscape(true, onClose);
  const count = lines.reduce((n, l) => n + l.qty, 0);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50">
      <div className="animate-fade absolute inset-0 bg-espresso/60 backdrop-blur-[2px]" onClick={onClose} />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className="animate-slide-in absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-parchment text-espresso shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-espresso/10 px-6 py-5">
          <h2 className="font-display text-2xl font-medium">
            Your cart{" "}
            <span className="font-mono text-sm text-espresso/45">
              · {count} item{count === 1 ? "" : "s"}
            </span>
          </h2>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="grid h-9 w-9 place-items-center rounded-full border border-espresso/15 text-espresso/70 transition-all hover:bg-espresso hover:text-cream active:scale-95"
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="grid flex-1 place-items-center px-8 text-center">
            <div>
              <BeanIcon className="mx-auto h-14 w-14 rotate-12 text-espresso/20" />
              <h3 className="mt-5 font-display text-3xl">Nothing in the hopper.</h3>
              <p className="mx-auto mt-2 max-w-xs text-sm text-espresso/55">
                Six coffees are waiting on the shelf, freshly roasted and impatient.
              </p>
              <button
                onClick={onBrowse}
                className="mt-6 h-11 rounded-full bg-espresso px-7 font-bold text-cream transition-all hover:bg-sienna active:scale-95"
              >
                Browse the shelf
              </button>
            </div>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-dashed divide-espresso/15 overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-4 py-5">
                  <div
                    className="flex h-20 w-16 shrink-0 items-end justify-center rounded-t-full border"
                    style={{ borderColor: `${l.product.accent}45`, background: `${l.product.accent}17` }}
                  >
                    <BagArt product={l.product} className="h-16" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg leading-tight">{l.product.name}</h3>
                    <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-espresso/45">
                      {weightLabel(l.weight)} · {grindLabel(l.grind)} · {money(priceFor(l.product, l.weight))}
                    </p>
                    <div className="mt-2.5 inline-flex items-center rounded-full border border-espresso/20 bg-cream">
                      <button
                        onClick={() => onQty(l.key, l.qty - 1)}
                        disabled={l.qty <= 1}
                        aria-label="Decrease quantity"
                        className="grid h-7 w-8 place-items-center text-espresso/70 transition-colors hover:text-sienna disabled:opacity-30"
                      >
                        <MinusIcon className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center font-mono text-xs font-bold">{l.qty}</span>
                      <button
                        onClick={() => onQty(l.key, l.qty + 1)}
                        disabled={l.qty >= 10}
                        aria-label="Increase quantity"
                        className="grid h-7 w-8 place-items-center text-espresso/70 transition-colors hover:text-sienna disabled:opacity-30"
                      >
                        <PlusIcon className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => onRemove(l.key)}
                      aria-label={`Remove ${l.product.name}`}
                      className="text-espresso/35 transition-colors hover:text-sienna"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                    <p className="font-display text-lg font-semibold">{money(l.lineTotal)}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-espresso/10 bg-cream/70 px-6 py-5">
              {remaining > 0 ? (
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-espresso/55">
                    <span className="flex items-center gap-1.5">
                      <TruckIcon className="h-3.5 w-3.5" /> Free shipping over {money(FREE_SHIPPING_THRESHOLD)}
                    </span>
                    <span className="font-bold text-sienna">{money(remaining)} to go</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-espresso/10">
                    <div
                      className="h-full rounded-full bg-caramel transition-all duration-500 ease-out"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ) : (
                <p className="flex items-center gap-2 text-sm font-bold text-olive">
                  <CheckIcon className="h-4 w-4" /> Free shipping unlocked
                </p>
              )}

              <div className="mt-4 space-y-1.5 font-mono text-sm text-espresso/75">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{money(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : money(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-dashed border-espresso/20 pt-2 text-base font-bold text-espresso">
                  <span>Total</span>
                  <span>{money(total)}</span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="group mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-espresso font-bold text-cream transition-all hover:bg-sienna active:scale-[0.99]"
              >
                Checkout — {money(total)}
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <p className="mt-2.5 text-center font-mono text-[10px] text-espresso/40">
                Simulated checkout — no card required
              </p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

/* --------------------------------- checkout --------------------------------- */

type Step = "details" | "payment" | "processing" | "receipt";

function Field({
  label,
  error,
  hint,
  ...rest
}: { label: string; error?: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 flex items-baseline justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-espresso/50">
        {label}
        {hint && <span className="normal-case tracking-normal text-espresso/35">{hint}</span>}
      </span>
      <input
        {...rest}
        className={`h-11 w-full rounded-xl border bg-cream px-4 text-sm text-espresso transition-colors placeholder:text-espresso/30 focus:outline-none ${
          error ? "border-sienna" : "border-espresso/15 focus:border-sienna"
        }`}
      />
      {error && <span className="mt-1 block font-mono text-[10px] text-sienna">{error}</span>}
    </label>
  );
}

const BARS = [3, 1, 2, 1, 4, 1, 1, 3, 2, 1, 2, 4, 1, 1, 3, 1, 2, 2, 1, 3, 1, 4, 2, 1, 1, 3, 2, 1];

export function CheckoutModal({
  lines,
  subtotal,
  shipping,
  total,
  onClose,
  onComplete,
}: {
  lines: EnrichedLine[];
  subtotal: number;
  shipping: number;
  total: number;
  onClose: () => void;
  onComplete: (orderNo: string) => void;
}) {
  const [step, setStep] = useState<Step>("details");
  const [orderNo, setOrderNo] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  useEscape(step === "details" || step === "payment", onClose);

  useEffect(() => {
    if (step !== "processing") return;
    const t = window.setTimeout(() => {
      setOrderNo(`EMB-${Math.random().toString(36).slice(2, 7).toUpperCase()}`);
      setStep("receipt");
    }, 1700);
    return () => window.clearTimeout(t);
  }, [step]);

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const stepIdx = step === "details" ? 0 : step === "payment" || step === "processing" ? 1 : 2;

  const submitDetails = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = "We need a name for the label.";
    if (!/\S+@\S+\.\S+/.test(email)) errs.email = "That email won't brew.";
    if (address.trim().length < 4) errs.address = "Where should the beans go?";
    if (city.trim().length < 2) errs.city = "City, please.";
    if (zip.trim().length < 3) errs.zip = "ZIP, please.";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep("payment");
  };

  const submitPayment = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (cardName.trim().length < 2) errs.cardName = "Name as printed on card.";
    if (cardNumber.replace(/\s/g, "").length !== 16) errs.cardNumber = "16 digits, any will do.";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) errs.expiry = "MM/YY";
    if (!/^\d{3,4}$/.test(cvc)) errs.cvc = "3–4 digits";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep("processing");
  };

  const date = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-[70]">
      <div className="animate-fade absolute inset-0 bg-espresso/75 backdrop-blur-[3px]" onClick={step === "processing" ? undefined : onClose} />
      <div className="absolute inset-0 flex items-stretch justify-center sm:items-center sm:p-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Checkout"
          className="animate-rise relative flex h-full w-full flex-col overflow-y-auto bg-parchment text-espresso shadow-2xl sm:h-auto sm:max-h-[92vh] sm:max-w-lg sm:rounded-[24px]"
        >
          <div className="flex items-center justify-between px-6 pt-6">
            <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-sienna">
              <LockIcon className="h-3.5 w-3.5" /> Simulated secure checkout
            </p>
            {step !== "processing" && step !== "receipt" && (
              <button
                onClick={onClose}
                aria-label="Close checkout"
                className="grid h-9 w-9 place-items-center rounded-full border border-espresso/15 text-espresso/70 transition-all hover:bg-espresso hover:text-cream active:scale-95"
              >
                <XIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* step dots */}
          <div className="mt-4 flex gap-2 px-6" aria-hidden>
            {["Details", "Payment", "Receipt"].map((s, i) => (
              <span
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
                  i <= stepIdx ? "bg-caramel" : "bg-espresso/10"
                }`}
              />
            ))}
          </div>

          {step === "details" && (
            <form onSubmit={submitDetails} className="px-6 py-6" noValidate>
              <h2 className="font-display text-3xl font-medium">Where's it headed?</h2>
              <div className="mt-5 grid gap-4">
                <Field label="Full name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jo Brewer" error={errors.name} autoComplete="name" />
                <Field label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="jo@somewhere.com" error={errors.email} autoComplete="email" />
                <Field label="Street address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="414 Short St" error={errors.address} autoComplete="street-address" />
                <div className="grid grid-cols-[1fr_120px] gap-3">
                  <Field label="City" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Portland" error={errors.city} />
                  <Field label="ZIP" value={zip} onChange={(e) => setZip(e.target.value)} placeholder="97214" error={errors.zip} />
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="h-12 rounded-full border border-espresso/25 px-6 font-bold text-espresso/70 transition-colors hover:border-espresso hover:text-espresso"
                >
                  Cancel
                </button>
                <button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-espresso font-bold text-cream transition-all hover:bg-sienna active:scale-[0.99]">
                  Continue to payment
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}

          {step === "payment" && (
            <form onSubmit={submitPayment} className="px-6 py-6" noValidate>
              <h2 className="font-display text-3xl font-medium">Almost brewing.</h2>
              <div className="mt-5 space-y-1.5 rounded-xl border border-dashed border-espresso/25 bg-cream/60 p-4 font-mono text-xs text-espresso/75">
                <div className="flex justify-between">
                  <span>{count} item{count === 1 ? "" : "s"} · subtotal</span>
                  <span>{money(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : money(shipping)}</span>
                </div>
                <div className="flex justify-between border-t border-dashed border-espresso/20 pt-1.5 text-sm font-bold text-espresso">
                  <span>Total</span>
                  <span>{money(total)}</span>
                </div>
              </div>
              <div className="mt-5 grid gap-4">
                <Field
                  label="Card number"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(
                      e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 "),
                    )
                  }
                  placeholder="4242 4242 4242 4242"
                  error={errors.cardNumber}
                />
                <Field label="Name on card" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="JO BREWER" error={errors.cardName} />
                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Expiry"
                    inputMode="numeric"
                    value={expiry}
                    onChange={(e) => {
                      const d = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setExpiry(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
                    }}
                    placeholder="09/27"
                    error={errors.expiry}
                  />
                  <Field
                    label="CVC"
                    inputMode="numeric"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="123"
                    error={errors.cvc}
                  />
                </div>
              </div>
              <p className="mt-4 flex items-start gap-2 rounded-lg border border-caramel/40 bg-caramel/15 p-3 font-mono text-[10px] leading-relaxed text-espresso/70">
                <CardIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                DEMO MODE — nothing is charged and nothing leaves your browser. Any valid-looking
                numbers pass.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="h-12 rounded-full border border-espresso/25 px-6 font-bold text-espresso/70 transition-colors hover:border-espresso hover:text-espresso"
                >
                  Back
                </button>
                <button className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-caramel font-bold text-espresso transition-all hover:bg-espresso hover:text-cream active:scale-[0.99]">
                  Place order — {money(total)}
                </button>
              </div>
            </form>
          )}

          {step === "processing" && (
            <div className="grid place-items-center px-6 py-24 text-center">
              <div>
                <div className="flex justify-center gap-2 text-sienna">
                  <BeanIcon className="h-8 w-8 animate-bounce" />
                  <BeanIcon className="h-8 w-8 animate-bounce [animation-delay:0.15s]" />
                  <BeanIcon className="h-8 w-8 animate-bounce [animation-delay:0.3s]" />
                </div>
                <p className="mt-7 font-mono text-xs uppercase tracking-[0.28em] text-espresso/55">
                  Locking in your roast…
                </p>
              </div>
            </div>
          )}

          {step === "receipt" && (
            <div className="px-6 py-6">
              <h2 className="font-display text-3xl font-medium">Order confirmed.</h2>
              <p className="mt-1.5 text-sm text-espresso/60">
                A receipt is on its way to <strong>{email}</strong> — pretend inbox, real excitement.
              </p>

              <div className="relative mt-6 rounded-lg border border-espresso/15 bg-cream p-5 font-mono text-xs leading-relaxed text-espresso/85 shadow-[0_14px_36px_rgba(26,17,12,0.12)]">
                <span className="animate-pop absolute -right-3 -top-4 grid h-20 w-20 place-items-center rounded-full border-[3px] border-olive bg-cream/85 text-center font-mono text-[10px] font-bold uppercase leading-tight tracking-[0.18em] text-olive">
                  Paid ·<br />Emberline
                </span>
                <div className="border-b border-dashed border-espresso/25 pb-3 text-center">
                  <p className="text-sm font-bold tracking-[0.22em]">EMBERLINE ROASTERS</p>
                  <p className="mt-1 text-[10px] text-espresso/55">1214 SE ANKENY ST · PORTLAND OR</p>
                </div>
                <div className="flex justify-between py-2 text-[10px] uppercase tracking-[0.14em] text-espresso/55">
                  <span>Order {orderNo}</span>
                  <span>{date}</span>
                </div>
                <div className="space-y-1 border-t border-dashed border-espresso/25 pt-2">
                  {lines.map((l) => (
                    <div key={l.key} className="flex justify-between gap-3">
                      <span className="min-w-0 truncate">
                        {l.qty}× {l.product.name.toUpperCase()} ({weightLabel(l.weight)})
                      </span>
                      <span className="shrink-0">{money(l.lineTotal)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 space-y-1 border-t border-dashed border-espresso/25 pt-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{money(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "FREE" : money(shipping)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold">
                    <span>TOTAL</span>
                    <span>{money(total)}</span>
                  </div>
                </div>
                <div className="mt-3 flex h-9 items-stretch gap-[2px] border-t border-dashed border-espresso/25 pt-2" aria-hidden>
                  {BARS.map((w, i) => (
                    <span key={i} className="bg-espresso" style={{ width: w, opacity: i % 4 === 0 ? 0.55 : 0.9 }} />
                  ))}
                </div>
                <p className="mt-2 text-center text-[9px] uppercase tracking-[0.3em] text-espresso/50">
                  Thank you — drink it fresh
                </p>
              </div>

              <button
                onClick={() => onComplete(orderNo)}
                className="mt-6 h-12 w-full rounded-full bg-espresso font-bold text-cream transition-all hover:bg-caramel hover:text-espresso active:scale-[0.99]"
              >
                Back to the shop
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
