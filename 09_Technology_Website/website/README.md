# Kogia Coffee — Website (two-sided)

A static, dependency-free site. No build step — just open the HTML files in a browser (or host on any static host: GitHub Pages, Netlify, Vercel).

## Two sides
| Side | File | Who | What |
|------|------|-----|------|
| **Storefront** | `index.html` | Customers | Browse the 6 blends, pick size, add to cart, checkout |
| **Owner dashboard** | `dashboard.html` | Othman | Track expenses by category, KPIs, sales, add/delete expenses |

## Run it
```bash
# simplest: just open index.html in a browser
# or serve locally (better for the image paths):
cd 09_Technology_Website/website
python3 -m http.server 8080
# → http://localhost:8080/index.html
# → http://localhost:8080/dashboard.html   (passcode: kogia)
```

## Files
- `index.html` / `app.js` — storefront + cart (cart persists in `localStorage`)
- `dashboard.html` / `dashboard.js` / `dashboard.css` — owner side (expenses persist in `localStorage`, seeded from `data.js`)
- `data.js` — **shared**: products, prices, expense categories, seed expenses & sales
- `styles.css` — shared visual system (brand palette + fonts)
- images: `../../assets/images/product_*.jpg`

## Notes / next steps
- The owner passcode (`kogia`) and login are a **demo gate only — not real security.** Before putting the dashboard on the public internet, add a real backend + auth and move data server-side.
- Product photos are placeholders (your dropped images) — swap for proper per-blend shots.
- To go live: push to GitHub and enable **GitHub Pages** on the repo (serve `/09_Technology_Website/website`), or deploy that folder to Netlify/Vercel.
- Next build-out: real checkout/payment (e.g. local gateway), per-blend product pages from the QR codes, order storage.
