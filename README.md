# Emberline Roasters

A premium, small-batch specialty coffee e-commerce prototype. Six meticulously curated coffees with SVG bag art, tasting notes, brew recipes and a full shopping flow — built with React + Vite + Tailwind CSS.

**Live preview:** https://editorav010-dev.github.io/Emberline-Roasters/

Repo: https://github.com/editorav010-dev/Emberline-Roasters

---

## ✨ Features

- **Curated catalog** – 6 products across Single Origin, Espresso, Blend & Decaf with producer stories, altitude, process, variety and brew guides
- **Rich product UX** – SVG bag artwork, roast scale, tasting notes, accent colors, quick add and full product drawer with weight / grind options
- **Smart shop** – Live search, category filters, sort by price / roast, product counts, clear-all
- **Cart & checkout** – Persistent cart via localStorage, quantity controls, free shipping threshold $45, flat $6 shipping, simulated checkout with order confirmation
- **Polished UI** – Warm espresso/cream palette, marquee ticker, origin marquee, craft story, reviews, sticky header, toasts, film grain overlay
- **Motion & accessibility** – Framer Motion reveals, body lock on overlays, keyboard-friendly drawers/modals
- **Performance** – Vite build, Tailwind v4, tree-shaken React 18

---

## 🛠 Tech Stack

- **Framework:** React 18 + TypeScript, Vite 6
- **Styling:** Tailwind CSS v4, custom design tokens `bg-espresso`, `text-cream`, `bg-caramel`
- **UI:** Framer Motion, Lucide React icons, @dnd-kit core/sortable/utilities
- **State:** React hooks + localStorage persistence
- **Data:** Static TypeScript product catalog in `src/data/products.ts`
- **Tooling:** ESLint, TypeScript, npm scripts

Dependencies:
`react`, `react-dom`, `react-router-dom`, `framer-motion`, `lucide-react`, `date-fns`, `canvas-confetti`, `@supabase/supabase-js`, `@dnd-kit/*`, `recharts`, `uuid`

Dev:
`vite`, `@vitejs/plugin-react`, `tailwindcss`, `@tailwindcss/vite`, `typescript`

---

## 🚀 Getting Started

```bash
# clone
git clone https://github.com/editorav010-dev/Emberline-Roasters.git
cd Emberline-Roasters

# install
npm ci

# dev server
npm run dev
```
Open http://localhost:3000

Build for production:
```bash
npm run build
npm run typecheck
```
Output → `dist/`

---

## 📁 Project Structure

```
src/
  App.tsx                # Root app, cart logic, filtering, layout
  main.tsx               # Vite entry
  index.css              # Tailwind + custom tokens
  hooks.tsx              # useLocalStorage, useLockBody, Reveal
  data/
    products.ts          # Product types, catalog, pricing helpers
  components/
    chrome.tsx           # Header, Hero, OriginMarquee, Ticker, Craft, Footer, Reviews
    shop.tsx             # Shop section, filters, grid
    overlays.tsx         # CartDrawer, ProductDrawer, CheckoutModal, Toasts
    icons.tsx            # Lucide-based icon set
    BagArt.tsx           # SVG bag artwork primitives
```

Key constants from `products.ts`:
- `FREE_SHIPPING_THRESHOLD = 45`
- `FLAT_SHIPPING = 6`
- Weights: `250g`, `1kg` → price multiplier 3.6x
- Grinds: whole, filter, espresso, press

---

## 🎨 Brand

- Palette: Espresso #0a0502, Cream #f7f1e8, Caramel #d9964a
- Type: Fraunces, Karla, Space Mono via Google Fonts
- Vibe: Small-batch, roast-to-order, Portland OR

---

## 🚢 Deployment

The repo uses GitHub Pages via Actions.

` .github/workflows/deploy.yml` builds with `npm run build` and deploys `dist/` to GitHub Pages.

Preview URL:
https://editorav010-dev.github.io/Emberline-Roasters/

To change the Pages source:
Repo → Settings → Pages → Source = GitHub Actions, or Branch `gh-pages`

Manual build & deploy:
```bash
npm run build
# dist/ is ready to upload
```

---

## 📦 Product Data

Products are defined in `src/data/products.ts`. Each product includes:
`id, name, code, origin, region, producer, category, price, rating, reviews, roast, process, altitude, variety, notes[], description, badge, brew{method,ratio,temp,time}, accent`

Extend the `PRODUCTS` array to add new coffees.

---

## 🔧 Notes

- Cart persists in `localStorage` under key `emberline-cart-v1`
- Checkout is simulated – no backend required for prototype
- Supabase client is installed but not wired; ready for future auth/products sync
- DnD Kit is present for future sorting/drag interactions

---

## 📄 License

Prototype for demo purposes. All coffee content is fictional.

---

Built with ❤️ for Emberline Roasters — six coffees, zero warehouses, roasted the morning you order.
