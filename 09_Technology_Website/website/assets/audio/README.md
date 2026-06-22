# Audio — café ambiance

The site plays a **generated** oud/Hijaz ambient soundscape (synthesized live in the
browser via the Web Audio API in `../music.js`). It is **100% free and copyright-safe**
because nothing is recorded — it's made on the fly.

## Want a real track (e.g. Fairouz)?
Fairouz recordings are **copyrighted** — don't ship them on a public site without a licence.

If you license a track (or use a royalty-free / Creative Commons oud piece), just drop it here as:

```
ambient.mp3
```

`music.js` checks for `assets/audio/ambient.mp3` first and plays it (looped, soft fade-in).
If it isn't found, it falls back to the generated soundscape automatically. No code change needed.

### Good sources for free/royalty-free Arabic/oud ambience
- Free Music Archive (freemusicarchive.org) — filter by CC licence
- ccMixter (dig.ccmixter.org)
- YouTube Audio Library (free, check the licence per track)
- Pixabay Music / Uppbeat (royalty-free)

Always keep the licence/attribution note with the file.
