# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server at localhost:3000
npm run build    # production build
npm run start    # serve production build
```

No test suite or linter is configured.

## Stack

- **Next.js 16** (App Router) with **React 19**
- **Tailwind CSS v4** — configured via `@theme inline {}` in `app/globals.css`, not `tailwind.config.js`
- **No database** — all product data lives in `lib/products.js` as a static array

## Architecture

### Data layer — `lib/products.js`
Single source of truth. Exports `products[]`, `categories[]`, `testimonials[]`, and helper functions (`getProductBySlug`, `getFeaturedProducts`, `getRelatedProducts`, `formatPrice`). Also exports `WHATSAPP_NUMBER` and pre-built WhatsApp link builders. **Adding or editing products means editing this file only.**

### Pages (App Router)
All pages are server components except where interactivity is needed. Key routes:

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.js` | Homepage — hero, trust bar, category scroll, new arrivals, testimonials |
| `/shop` | `app/shop/page.js` | Server component; reads `?category` searchParam to filter |
| `/shop/[slug]` | `app/shop/[slug]/page.js` | Server component with `generateStaticParams` + `generateMetadata`; mounts `<ProductOrderPanel>` for interactivity |
| `/wholesale` | `app/wholesale/page.js` | |
| `/contact` | `app/contact/page.js` | Includes FAQ section — footer FAQ links point here |
| `/delivery` | `app/delivery/page.js` | |
| `/size-guide` | `app/size-guide/page.js` | |

### Client components
Only two components need `"use client"`:
- **`components/ProductOrderPanel.js`** — size selector + quantity stepper + WhatsApp CTA. Receives a `product` object as prop from the server page. Defines its own local `fmt()` to avoid bundling the full products array.
- **`components/ShopFilters.js`** — category filter pill buttons on the shop page; uses `useRouter` to update the URL.
- **`components/ProductGallery.js`** — swipeable image gallery with touch events and thumbnail strip.

### Shared layout components
`Navbar`, `Footer`, `ProductCard` are used across all pages. `Navbar` handles the mobile slide-in menu and the sticky announcement bar.

### Fonts & design tokens
- `Oswald` → `--font-display` → `.font-display` class — used for all headings and the brand logo
- `Inter` → `--font-sans` — body text
- Brand colour: `#C4703A` (terracotta) — used for accent text and the "CLOSET" wordmark
- Product image placeholder background: `#D4A87A`

### WhatsApp ordering
All purchases flow through WhatsApp (`wa.me/2348133053455`). The pre-filled message is built in `ProductOrderPanel.buildLink()` and includes product name, size, quantity, unit price, and total. No cart, no checkout, no payment gateway.

### Images
All product images are local files in `public/products/` and `public/photos/`. Referenced in `lib/products.js` as root-relative paths (e.g. `/products/product_1_photo_1.jpeg`). `next.config.mjs` whitelists these paths for `next/image`.
