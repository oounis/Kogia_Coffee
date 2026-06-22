/* ============================================================
   Kogia Coffee — shared data layer (v2)
   Visuals are GENERATED as SVG from each blend's colours (no photos).
   Prices in TND (DT). Profiles mirror 02_Products_and_RnD.
   ============================================================ */

const CURRENCY = "DT";

/* ---- Product catalogue (the 6 blends) ----
   c1/c2 = panel gradient (dark), accent = the blend's signature colour */
const PRODUCTS = [
  {
    id:"djerbi", name:"Djerbi Signature", arabic:"الجربية",
    profile:"Aromatic & rounded", tag:"House blend", roast:"Medium-dark",
    desc:"Our house blend — premium coffee with roasted barley, coriander (tabil), chickpea, cardamom, orange peel & rosebuds. Warm, smooth, slightly sweet-spiced.",
    ingredients:"Coffee 57% · roasted barley · coriander/tabil · roasted chickpea · cardamom · orange peel · rosebuds",
    meter:{body:4,spice:3,sweet:3,aroma:5},
    c1:"#2A1C12", c2:"#4A2E18", accent:"#E3A85A",
    prices:{"250g":16,"500g":28,"1kg":49}, bestseller:true
  },
  {
    id:"ethiopian", name:"Ethiopian Classic", arabic:"الكلاسيكية",
    profile:"Clean & coffee-forward", tag:"Purist", roast:"Light-medium",
    desc:"Mostly 100% Arabica with a light spice lift of cardamom, clove & cinnamon. For drinkers who want more coffee, fewer fillers.",
    ingredients:"Coffee ~93% Arabica · cardamom · clove · cinnamon · orange peel",
    meter:{body:3,spice:2,sweet:2,aroma:4},
    c1:"#21241A", c2:"#3A4128", accent:"#B7C99A",
    prices:{"250g":19,"500g":33,"1kg":59}
  },
  {
    id:"khaleeji", name:"Khaleeji Gold", arabic:"الذهبية",
    profile:"Light & floral", tag:"Cardamom & saffron", roast:"Light",
    desc:"Gulf-style: light roast, heavy cardamom, a thread of saffron and rosebuds. Pale, floral, very aromatic, low bitterness.",
    ingredients:"Light-roast Arabica · cardamom (heavy) · saffron · clove · rosebuds",
    meter:{body:2,spice:3,sweet:2,aroma:5},
    c1:"#2E2410", c2:"#5A4413", accent:"#EBC25A",
    prices:{"250g":21,"500g":36,"1kg":65}, premium:true
  },
  {
    id:"marrakech", name:"Marrakech Spice", arabic:"الحارة",
    profile:"Spicy & warming", tag:"Bold spice", roast:"Medium-dark",
    desc:"Moroccan six-spice inspiration: cinnamon, ginger, nutmeg, star anise, pepper & toasted sesame. Dark, bold, warming.",
    ingredients:"Coffee · cinnamon · ginger · nutmeg · star anise · black pepper · sesame",
    meter:{body:4,spice:5,sweet:2,aroma:4},
    c1:"#2C1410", c2:"#5A241A", accent:"#D98A72",
    prices:{"250g":17,"500g":29,"1kg":52}
  },
  {
    id:"sweetdunes", name:"Sweet Dunes", arabic:"الحلوة",
    profile:"Naturally sweet", tag:"Sugar-free sweet", roast:"Medium",
    desc:"Sweetness without sugar — extra roasted barley, cinnamon, date powder & cardamom. Smooth, mellow, gentle on the stomach.",
    ingredients:"Coffee · roasted barley · cinnamon · date powder · cardamom · orange peel",
    meter:{body:3,spice:2,sweet:5,aroma:3},
    c1:"#2A2014", c2:"#4E3A1E", accent:"#D9B27A",
    prices:{"250g":15,"500g":26,"1kg":45}
  },
  {
    id:"sahara", name:"Sahara Ginger", arabic:"الصحراوية",
    profile:"Bold & zesty", tag:"Ginger kick", roast:"Dark",
    desc:"Yemeni-style, ginger-forward and dark. Strong, sharp, energizing — with cinnamon, clove and cardamom behind the ginger.",
    ingredients:"Dark-roast coffee · ginger (dominant) · cinnamon · clove · cardamom",
    meter:{body:5,spice:5,sweet:1,aroma:3},
    c1:"#241712", c2:"#45221A", accent:"#E08A4A",
    prices:{"250g":16,"500g":28,"1kg":50}
  }
];

/* ---- Expense categories (mirror 04_Finance/expenses) ---- */
const EXPENSE_CATEGORIES = [
  { code:"RENT",  label:"Rent",             color:"#E3A85A" },
  { code:"UTIL",  label:"Utilities",        color:"#B7C99A" },
  { code:"RAW",   label:"Raw Materials",    color:"#D98A72" },
  { code:"PACK",  label:"Packaging",        color:"#EBC25A" },
  { code:"EQUIP", label:"Equipment",        color:"#C98A3C" },
  { code:"MAINT", label:"Maintenance",      color:"#8FA06A" },
  { code:"STAFF", label:"Staff",            color:"#E0A06A" },
  { code:"MKT",   label:"Marketing",        color:"#D9728F" },
  { code:"LEGAL", label:"Legal & Licenses", color:"#A8895A" },
  { code:"MISC",  label:"Miscellaneous",    color:"#9C8E7E" }
];

/* ---- Seed expenses (sample — owner edits/adds in the dashboard) ---- */
const SEED_EXPENSES = [
  { date:"2026-06-01", category:"RENT",  desc:"Shop rent — June",             amount:900 },
  { date:"2026-06-02", category:"EQUIP", desc:"Coin coffee machine (deposit)", amount:1800 },
  { date:"2026-06-03", category:"EQUIP", desc:"Grinder + scales",             amount:1200 },
  { date:"2026-06-05", category:"RAW",   desc:"Premium beans 40kg @37",       amount:1480 },
  { date:"2026-06-05", category:"RAW",   desc:"Cardamom + saffron + spices",  amount:620 },
  { date:"2026-06-07", category:"PACK",  desc:"Kraft pouches + labels",       amount:540 },
  { date:"2026-06-08", category:"MKT",   desc:"Photography + signage",        amount:700 },
  { date:"2026-06-10", category:"LEGAL", desc:"Business registration",        amount:450 },
  { date:"2026-06-12", category:"UTIL",  desc:"Electricity + internet",       amount:210 },
  { date:"2026-06-15", category:"STAFF", desc:"Barista salary (half month)",  amount:600 },
  { date:"2026-06-18", category:"MAINT", desc:"Machine cleaning kit",         amount:95 }
];

/* ---- Seed sales (sample) ---- */
const SEED_SALES = [
  { date:"2026-06-12", item:"Djerbi Signature 1kg", qty:6,  amount:294 },
  { date:"2026-06-13", item:"Machine cups",          qty:40, amount:70 },
  { date:"2026-06-14", item:"Sweet Dunes 500g",      qty:9,  amount:234 },
  { date:"2026-06-15", item:"Gift box 3×250g",       qty:3,  amount:165 },
  { date:"2026-06-16", item:"Marrakech Spice 1kg",   qty:4,  amount:208 },
  { date:"2026-06-18", item:"Khaleeji Gold 250g",    qty:7,  amount:147 }
];

/* ---- Self-generated SVG art (no photos) ---- */
/* A branded "cup + steam" illustration on the blend's gradient. */
function blendArt(p, h=400){
  const uid = p.id;
  return `
  <svg class="art" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" width="100%" height="${h}" role="img" aria-label="${p.name}">
    <defs>
      <linearGradient id="bg-${uid}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${p.c1}"/><stop offset="1" stop-color="${p.c2}"/>
      </linearGradient>
      <radialGradient id="gl-${uid}" cx="50%" cy="64%" r="55%">
        <stop offset="0" stop-color="${p.accent}" stop-opacity=".45"/>
        <stop offset="1" stop-color="${p.accent}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="400" height="400" fill="url(#bg-${uid})"/>
    <circle cx="200" cy="255" r="180" fill="url(#gl-${uid})"/>
    <!-- bean speckle -->
    <g fill="${p.accent}" opacity=".10">
      <ellipse cx="60" cy="70" rx="9" ry="6" transform="rotate(30 60 70)"/>
      <ellipse cx="340" cy="110" rx="9" ry="6" transform="rotate(-20 340 110)"/>
      <ellipse cx="320" cy="330" rx="9" ry="6" transform="rotate(40 320 330)"/>
      <ellipse cx="70" cy="320" rx="9" ry="6" transform="rotate(-35 70 320)"/>
    </g>
    <!-- steam -->
    <g fill="none" stroke="${p.accent}" stroke-width="3.4" stroke-linecap="round" opacity=".85">
      <path d="M178 150 q-16 -22 0 -44 q16 -22 0 -44">
        <animate attributeName="opacity" values=".25;.85;.25" dur="3.6s" repeatCount="indefinite"/>
      </path>
      <path d="M222 150 q16 -22 0 -44 q-16 -22 0 -44">
        <animate attributeName="opacity" values=".7;.2;.7" dur="3.6s" repeatCount="indefinite"/>
      </path>
    </g>
    <!-- cup -->
    <g fill="none" stroke="${p.accent}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
      <path d="M132 168 h136 v40 a68 68 0 0 1 -136 0 z"/>
      <path d="M268 176 h24 a26 26 0 0 1 0 52 h-16"/>
      <line x1="120" y1="300" x2="280" y2="300"/>
    </g>
    <text x="200" y="356" text-anchor="middle" font-family="'Playfair Display',serif"
      font-size="40" fill="${p.accent}" opacity=".96">${p.arabic}</text>
  </svg>`;
}

/* small icon-mark version for the cart */
function blendThumb(p){
  return `<div class="thumb" style="background:linear-gradient(135deg,${p.c1},${p.c2})">
    <span style="color:${p.accent};font-family:'Playfair Display',serif;font-size:1.1rem">${p.arabic.slice(0,3)}</span>
  </div>`;
}
