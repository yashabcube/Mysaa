# MYŚAA Luxe Store — v4.2

Static front-end for the MYŚAA Luxe e-commerce site (Himalayan botanical skincare, Australia).
Design and build by Cubical Frames. Prepared for migration to Shopify.

## Pages (hash-routed, single `index.html`)
- `#home` — hero, collection, reels, Who it is for, From foothills to your vanity, rituals, texture videos, reviews, awards & certifications, press, newsletter
- `#shop` — shop with tabs (All, Bestsellers, Face, Mists, Lips & hands, Rituals), skin-type and concern filters
  - `#rituals` opens the shop on the Rituals tab
  - `#shop-skin-<type>`, `#shop-concern-<concern>`, `#shop-grp-<category>` open filtered views (used by the Shop mega menu)
- `#product-<id>` — product and ritual pages
- `#story` — Our story (content from mysaasecrets.com.au/pages/our-story)
- `#contact` — contact details, message and callback forms
- `#journal` — press placeholder

## Run locally
Open `index.html` through any static server, for example:

```
python3 -m http.server 8000
```

then visit http://localhost:8000.

## Structure
- `index.html` — markup, styles and app logic
- `data.js` — product data and verified reviews
- `fonts/` — Erstoria (headings) and Aileron (body), woff2
- `js/` — GSAP, ScrollTrigger, Lenis (bundled locally)
- `img/` — product cut-outs (`p/`), star-ingredient images (`ing/`), award badges (`award/`), scenes and press
- `media/` — reels and texture videos

## Notes
- Prices are AUD; other currencies are indicative only (Shopify Markets will handle conversion).
- Placeholders in square brackets (INCI lists, Acknowledgement of Country, shipping times) need client copy.
- Forms validate but do not submit yet; connect to Shopify / email service on migration.
