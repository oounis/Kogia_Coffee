# Kogia Coffee — Website (v2, testing build)

> ⚠️ Work in progress / testing — not the final site.

A modern, **dependency-free** static site. No build step, no framework runtime, no stock photos.
Just open the HTML (or host on any static host: GitHub Pages, Netlify, Vercel).

## What's new in v2
- 🎨 **New "Noir & Honey" palette** — dark luxe (deep espresso + honey gold + warm rose/pistachio accents).
- 🖼️ **No photos — all visuals are generated** as SVG from each blend's colours (`blendArt()` in `data.js`). Animated steam, gradient mesh, film grain.
- 🎵 **Café ambiance music** — a generated oud/Hijaz soundscape (Web Audio, copyright-safe). Floating player, bottom-left. See `assets/audio/README.md` to drop in a licensed track (e.g. Fairouz) later.
- ✨ Modern CSS/JS — `color-mix()`, `backdrop-filter`, fluid `clamp()` type, scroll-reveal (IntersectionObserver), marquee, micro-interactions.

## Two sides
| Side | File | Who | What |
|------|------|-----|------|
| **Storefront** | `index.html` | Customers | Browse 6 blends, pick size, cart, checkout |
| **Owner dashboard** | `dashboard.html` | Othman | Expenses by category, KPIs, sales, add/delete (passcode `kogia`) |

## Run it
```bash
cd 09_Technology_Website/website
python3 -m http.server 8080
# → http://localhost:8080/index.html
# → http://localhost:8080/dashboard.html   (passcode: kogia)
```
*(Open via a server, not file://, so the audio fallback and fetch behave.)*

## Files
- `index.html` / `app.js` — storefront + cart (`localStorage`)
- `dashboard.html` / `dashboard.js` / `dashboard.css` — owner side (`localStorage`, seeded from `data.js`)
- `music.js` — generative ambient engine + licensed-file fallback
- `data.js` — **shared**: products + generated-art helpers + expense categories + seed data
- `styles.css` — shared visual system
- `assets/audio/` — drop `ambient.mp3` here to use a licensed track

## Still to do
- Real per-blend art refinement / optional real photography later
- Real checkout/payment + order storage (needs a backend)
- Real auth for the owner side before it goes public (current passcode = demo only)
- Confirm pricing (37/32 DT = cost vs retail?) and brand name
