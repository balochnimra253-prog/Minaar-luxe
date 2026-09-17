# MINAAR Luxe

A premium, editorial-style website for **MINAAR Luxe**, a Pakistani luxury fashion house. Built with React, Vite, and Tailwind CSS.

## What's inside

- Full-screen cinematic hero with parallax-free editorial type treatment
- Sticky navigation with cart, wishlist and search overlays
- Four collections: Luxury Pret, Formal Wear, Festive Collection, New Arrivals
- 24 sample products with realistic Pakistani luxury fashion names, PKR pricing, sale pricing, ratings and fabric details
- Product cards with Quick View and Add to Cart
- Full product detail pages with gallery, size guide, fabric/styling/packaging tabs and related products
- Customer reviews carousel
- Instagram-style gallery grid
- About / brand story section
- Newsletter signup band
- Footer with social links
- Floating WhatsApp order button
- Mobile-first, fully responsive layout with premium micro-animations

## Getting started

You'll need [Node.js](https://nodejs.org) 18+ installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the local dev server
npm run dev
```

Then open the URL shown in your terminal (usually `http://localhost:5173`).

## Building for production

```bash
npm run build
```

This outputs a production-ready static site into the `dist/` folder, which you can deploy to any static host (Vercel, Netlify, GitHub Pages, cPanel, etc.).

To preview the production build locally:

```bash
npm run preview
```

## Project structure

```
minaar-luxe/
├── index.html            Entry HTML file
├── package.json           Dependencies and scripts
├── vite.config.js         Vite configuration
├── tailwind.config.js     Tailwind CSS configuration
├── postcss.config.js      PostCSS configuration
└── src/
    ├── main.jsx           React entry point
    ├── index.css          Tailwind base styles
    └── App.jsx            The entire MINAAR Luxe website
```

## Customizing

- **Products & collections**: edit the `NAMES`, `FABRICS`, and `COLLECTIONS` arrays near the top of `src/App.jsx`.
- **Images**: all photography currently points to Unsplash placeholder URLs (`IMG` and `PRODUCT_IMAGES` objects in `src/App.jsx`). Replace these with your own campaign photography before launch.
- **WhatsApp number**: update the phone number in the floating WhatsApp button (`wa.me/923000000000`) near the bottom of the `App` component.
- **Brand colors**: the gold accent (`#B8935F`) is defined as the `GOLD` constant in `src/App.jsx` and also registered in `tailwind.config.js` as `gold`.
- **Fonts**: Bodoni Moda (display serif) and Jost (sans) are loaded from Google Fonts in the `useLuxuryFonts` hook.

## Notes

This is a front-end demo/portfolio build. Cart, wishlist, checkout and the newsletter form are functional in-browser (React state) but are not wired to a real payment gateway, database, or email service — connect them to your preferred backend (Shopify, a custom API, Stripe, etc.) before taking this live.
