export type Weight = "250g" | "1kg";
export type Grind = "whole" | "filter" | "espresso" | "press";

export interface Product {
  id: string;
  name: string;
  code: string;
  origin: string;
  region: string;
  producer: string;
  category: "single-origin" | "espresso" | "blend" | "decaf";
  price: number; // per 250 g
  rating: number;
  reviews: number;
  roast: 1 | 2 | 3 | 4 | 5;
  process: string;
  altitude: string;
  variety: string;
  notes: string[];
  description: string;
  badge: string;
  brew: { method: string; ratio: string; temp: string; time: string };
  accent: string;
}

export const CATEGORY_LABELS: Record<Product["category"], string> = {
  "single-origin": "Single origin",
  espresso: "Espresso",
  blend: "Blend",
  decaf: "Decaf",
};

export const CATEGORIES: { id: Product["category"]; label: string }[] = [
  { id: "single-origin", label: "Single origin" },
  { id: "espresso", label: "Espresso" },
  { id: "blend", label: "Blend" },
  { id: "decaf", label: "Decaf" },
];

export const WEIGHTS: { id: Weight; label: string }[] = [
  { id: "250g", label: "250 g" },
  { id: "1kg", label: "1 kg" },
];

export const GRINDS: { id: Grind; label: string }[] = [
  { id: "whole", label: "Whole bean" },
  { id: "filter", label: "Filter" },
  { id: "espresso", label: "Espresso" },
  { id: "press", label: "French press" },
];

export const ROAST_LABELS: Record<number, string> = {
  1: "Light",
  2: "Light +",
  3: "Medium",
  4: "Med-dark",
  5: "Dark",
};

export function priceFor(p: Product, w: Weight): number {
  return w === "1kg" ? Math.round(p.price * 3.6) : p.price;
}

export function money(n: number): string {
  return `$${n.toFixed(2)}`;
}

export function grindLabel(g: Grind): string {
  return GRINDS.find((x) => x.id === g)?.label ?? g;
}

export function weightLabel(w: Weight): string {
  return WEIGHTS.find((x) => x.id === w)?.label ?? w;
}

export const PRODUCTS: Product[] = [
  {
    id: "idido",
    name: "Idido Natural",
    code: "ETH",
    origin: "Ethiopia",
    region: "Gedeb, Yirgacheffe",
    producer: "Idido washing station · ~450 smallholders",
    category: "single-origin",
    price: 21,
    rating: 4.9,
    reviews: 128,
    roast: 1,
    process: "Natural, 21-day raised beds",
    altitude: "1,950 – 2,200 masl",
    variety: "Ethiopian heirloom",
    notes: ["Apricot jam", "Bergamot", "Raw honey"],
    description:
      "A natural lot from the cooperative behind some of Yirgacheffe's most celebrated cups. The long, slow drying gives it a syrupy body and a perfume that fills the room before the water even hits the grounds.",
    badge: "Roast of the week",
    brew: { method: "V60 pour-over", ratio: "1 : 16", temp: "94 °C", time: "2:45" },
    accent: "#d9964a",
  },
  {
    id: "el-paraiso",
    name: "El Paraíso",
    code: "COL",
    origin: "Colombia",
    region: "San Agustín, Huila",
    producer: "Twelve smallholders · picked ripe only",
    category: "single-origin",
    price: 19,
    rating: 4.8,
    reviews: 96,
    roast: 2,
    process: "Washed, 18 h dry ferment",
    altitude: "1,650 – 1,850 masl",
    variety: "Caturra & Pink Bourbon",
    notes: ["Caramel", "Red apple", "Cacao nib"],
    description:
      "The coffee we reach for when someone asks what specialty coffee is supposed to taste like. Round, sweet and unmistakably clean — a daily drinker with a tailored suit on.",
    badge: "Crowd favourite",
    brew: { method: "V60 pour-over", ratio: "1 : 15.5", temp: "93 °C", time: "2:50" },
    accent: "#b96a45",
  },
  {
    id: "kiamugumo",
    name: "Kiamugumo AA",
    code: "KEN",
    origin: "Kenya",
    region: "Kirinyaga County",
    producer: "Kiamugumo factory · 700 members",
    category: "single-origin",
    price: 22.5,
    rating: 4.9,
    reviews: 74,
    roast: 1,
    process: "Washed, double fermentation",
    altitude: "1,700 – 1,900 masl",
    variety: "SL28 & SL34",
    notes: ["Blackcurrant", "Grapefruit", "Molasses"],
    description:
      "New-crop Kenya with the classic Kirinyaga sparkle — bright, vinous and unapologetically loud. If your palate likes its coffee turned up to eleven, this is the bag.",
    badge: "New crop",
    brew: { method: "V60 pour-over", ratio: "1 : 16", temp: "94 °C", time: "2:40" },
    accent: "#8a4456",
  },
  {
    id: "midnight-ledger",
    name: "Midnight Ledger",
    code: "HSE",
    origin: "House blend",
    region: "Brazil · Ethiopia · Honduras",
    producer: "Three farms, one recipe since 2019",
    category: "espresso",
    price: 18,
    rating: 4.7,
    reviews: 203,
    roast: 4,
    process: "Natural & washed components",
    altitude: "1,100 – 1,900 masl",
    variety: "Catuaí, Heirloom, Lempira",
    notes: ["Dark chocolate", "Toasted hazelnut", "Brown sugar"],
    description:
      "Our workhorse espresso, tuned for milk but happy black. Dense crema, low acidity, and a finish that lingers like the last track on a good record.",
    badge: "Staff pick",
    brew: { method: "Espresso", ratio: "1 : 2 (18 g in)", temp: "93 °C", time: "0:27" },
    accent: "#5f4632",
  },
  {
    id: "cloud-forest",
    name: "Cloud Forest",
    code: "HSE",
    origin: "House blend",
    region: "Colombia · Guatemala",
    producer: "Two co-ops, roasted for batch brew",
    category: "blend",
    price: 17.5,
    rating: 4.6,
    reviews: 88,
    roast: 3,
    process: "Washed",
    altitude: "1,500 – 1,900 masl",
    variety: "Castillo & Bourbon",
    notes: ["Toffee", "Orange zest", "Marzipan"],
    description:
      "Built for the office machine and the Sunday batch brewer alike. Forgiving of your grind size, generous with sweetness, and endlessly drinkable by the pot.",
    badge: "Batch-brew ready",
    brew: { method: "Batch / Clever", ratio: "1 : 16.5", temp: "92 °C", time: "3:30" },
    accent: "#77804f",
  },
  {
    id: "quiet-hours",
    name: "Quiet Hours",
    code: "DCF",
    origin: "Colombia",
    region: "Cauca & Nariño",
    producer: "Smallholder lots · sugarcane EA decaf",
    category: "decaf",
    price: 19.5,
    rating: 4.8,
    reviews: 61,
    roast: 3,
    process: "Sugarcane E.A. decaffeination",
    altitude: "1,500 – 1,700 masl",
    variety: "Caturra & Colombia",
    notes: ["Milk chocolate", "Medjool date", "Graham cracker"],
    description:
      "Decaf that nobody clocks as decaf. The sugarcane process keeps the sweetness intact, so the 4 pm cup tastes like dessert and the 11 pm one still lets you sleep.",
    badge: "After-dark cup",
    brew: { method: "French press", ratio: "1 : 14", temp: "96 °C", time: "4:00" },
    accent: "#566b8a",
  },
];

export const FREE_SHIPPING_THRESHOLD = 45;
export const FLAT_SHIPPING = 6;
