# Technology / Website

The Kogia Coffee site, rebuilt v3 with a **modern toolchain** and a **bright "Café Crème"** light theme.

## Two folders
| Folder | What | Notes |
|--------|------|-------|
| `app/` | **Source code** (React + Vite + Tailwind) | Edit here. Run `npm install` then `npm run dev`. |
| `website/` | **Built site** (deployable) | Generated from `app/` by `npm run build`. Open `index.html` directly or host it. |

## Stack
- **Vite 8** + **React 19** — modern build tooling & components
- **Tailwind CSS v4** — the light "Café Crème" design system
- **Framer Motion** — scroll/hover animations
- **Lucide** — icons
- Real **coffee photography** (Unsplash) + **DiceBear avatars** for customer reviews
- **Web Audio** generative café-ambiance music (copyright-safe), `app/src/audio.js`

## Run the source (dev)
```bash
cd 09_Technology_Website/app
npm install        # first time only
npm run dev        # http://localhost:5173
```

## Rebuild the deployable site
```bash
cd 09_Technology_Website/app
npm run build      # outputs to app/dist
# then copy app/dist/* over 09_Technology_Website/website/
```

## Just view the built site
```bash
cd 09_Technology_Website/website
python3 -m http.server 8080
# → http://localhost:8080/                       (storefront)
# → http://localhost:8080/owner/dashboard.html   (owner, passcode: kogia)
```

## The two sides
- **Storefront** — `website/index.html` (the React app): blends, sizes, cart, reviews, music.
- **Owner dashboard** — `website/owner/dashboard.html`: expenses by category, KPIs, sales, add/delete. Light theme, passcode `kogia` (demo gate — **add real auth before going public**).

## Music
Floating player, **bottom-left** — click **"Play café music"** (browsers block autoplay, so it needs one click). It's a generated oud/Hijaz soundscape. To use a licensed track instead, drop `ambient.mp3` into `app/public/audio/` and rebuild — see that folder's README. (Real Fairouz is copyrighted; only ship audio you have rights to.)

## Notes / next
- node_modules and dist are gitignored in `app/`; the committed `website/` is the build so it's viewable without installing anything.
- Swap any product photo by replacing the file in `app/public/photos/` and rebuilding.
- Confirm pricing (37/32 DT = cost vs retail?) and brand name.
