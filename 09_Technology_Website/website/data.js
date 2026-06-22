/* ============================================================
   Kogia Coffee — shared data layer
   Used by both the storefront (index) and the owner dashboard.
   Prices in TND (DT). Profiles & recipes mirror 02_Products_and_RnD.
   ============================================================ */

const CURRENCY = "DT";

/* ---- Product catalogue (the 6 blends) ---- */
const PRODUCTS = [
  {
    id: "djerbi",
    name: "Djerbi Signature",
    arabic: "الجربية",
    profile: "Aromatic & rounded",
    tag: "House blend",
    roast: "Medium-dark",
    desc: "Our house blend — premium coffee with roasted barley, coriander (tabil), chickpea, cardamom, orange peel & rosebuds. Warm, smooth, slightly sweet-spiced.",
    ingredients: "Coffee 57% · roasted barley · coriander/tabil · roasted chickpea · cardamom · orange peel · rosebuds",
    meter: { body: 4, spice: 3, sweet: 3, aroma: 5 },
    img: "../../assets/images/product_1.jpg",
    prices: { "250g": 16, "500g": 28, "1kg": 49 },
    bestseller: true
  },
  {
    id: "ethiopian",
    name: "Ethiopian Classic",
    arabic: "الكلاسيكية",
    profile: "Clean & coffee-forward",
    tag: "Purist",
    roast: "Light-medium",
    desc: "Mostly 100% Arabica with a light spice lift of cardamom, clove & cinnamon. For drinkers who want more coffee, fewer fillers.",
    ingredients: "Coffee ~93% Arabica · cardamom · clove · cinnamon · orange peel",
    meter: { body: 3, spice: 2, sweet: 2, aroma: 4 },
    img: "../../assets/images/product_2.jpg",
    prices: { "250g": 19, "500g": 33, "1kg": 59 }
  },
  {
    id: "khaleeji",
    name: "Khaleeji Gold",
    arabic: "الذهبية",
    profile: "Light & floral",
    tag: "Cardamom & saffron",
    roast: "Light",
    desc: "Gulf-style: light roast, heavy cardamom, a thread of saffron and rosebuds. Pale, floral, very aromatic, low bitterness.",
    ingredients: "Light-roast Arabica · cardamom (heavy) · saffron · clove · rosebuds",
    meter: { body: 2, spice: 3, sweet: 2, aroma: 5 },
    img: "../../assets/images/product_3.jpg",
    prices: { "250g": 21, "500g": 36, "1kg": 65 },
    premium: true
  },
  {
    id: "marrakech",
    name: "Marrakech Spice",
    arabic: "الحارة",
    profile: "Spicy & warming",
    tag: "Bold spice",
    roast: "Medium-dark",
    desc: "Moroccan six-spice inspiration: cinnamon, ginger, nutmeg, star anise, pepper & toasted sesame. Dark, bold, warming.",
    ingredients: "Coffee · cinnamon · ginger · nutmeg · star anise · black pepper · sesame",
    meter: { body: 4, spice: 5, sweet: 2, aroma: 4 },
    img: "../../assets/images/product_4.jpg",
    prices: { "250g": 17, "500g": 29, "1kg": 52 }
  },
  {
    id: "sweetdunes",
    name: "Sweet Dunes",
    arabic: "الحلوة",
    profile: "Naturally sweet",
    tag: "Sugar-free sweet",
    roast: "Medium",
    desc: "Sweetness without sugar — extra roasted barley, cinnamon, date powder & cardamom. Smooth, mellow, gentle on the stomach.",
    ingredients: "Coffee · roasted barley · cinnamon · date powder · cardamom · orange peel",
    meter: { body: 3, spice: 2, sweet: 5, aroma: 3 },
    img: "../../assets/images/product_1.jpg",
    prices: { "250g": 15, "500g": 26, "1kg": 45 }
  },
  {
    id: "sahara",
    name: "Sahara Ginger",
    arabic: "الصحراوية",
    profile: "Bold & zesty",
    tag: "Ginger kick",
    roast: "Dark",
    desc: "Yemeni-style, ginger-forward and dark. Strong, sharp, energizing — with cinnamon, clove and cardamom behind the ginger.",
    ingredients: "Dark-roast coffee · ginger (dominant) · cinnamon · clove · cardamom",
    meter: { body: 5, spice: 5, sweet: 1, aroma: 3 },
    img: "../../assets/images/product_2.jpg",
    prices: { "250g": 16, "500g": 28, "1kg": 50 }
  }
];

/* ---- Expense categories (mirror 04_Finance/expenses) ---- */
const EXPENSE_CATEGORIES = [
  { code: "RENT",  label: "Rent",            color: "#C8741A" },
  { code: "UTIL",  label: "Utilities",       color: "#7A8450" },
  { code: "RAW",   label: "Raw Materials",   color: "#3B2415" },
  { code: "PACK",  label: "Packaging",       color: "#B8893E" },
  { code: "EQUIP", label: "Equipment",       color: "#9C5A2B" },
  { code: "MAINT", label: "Maintenance",     color: "#5B6238" },
  { code: "STAFF", label: "Staff",           color: "#D89A4E" },
  { code: "MKT",   label: "Marketing",       color: "#A8531B" },
  { code: "LEGAL", label: "Legal & Licenses",color: "#6E4A2A" },
  { code: "MISC",  label: "Miscellaneous",   color: "#8A7B6B" }
];

/* ---- Seed expenses (sample — owner edits/adds in the dashboard) ---- */
const SEED_EXPENSES = [
  { date: "2026-06-01", category: "RENT",  desc: "Shop rent — June",            amount: 900 },
  { date: "2026-06-02", category: "EQUIP", desc: "Coin coffee machine (deposit)",amount: 1800 },
  { date: "2026-06-03", category: "EQUIP", desc: "Grinder + scales",            amount: 1200 },
  { date: "2026-06-05", category: "RAW",   desc: "Premium beans 40kg @37",      amount: 1480 },
  { date: "2026-06-05", category: "RAW",   desc: "Cardamom + saffron + spices", amount: 620 },
  { date: "2026-06-07", category: "PACK",  desc: "Kraft pouches + labels",      amount: 540 },
  { date: "2026-06-08", category: "MKT",   desc: "Photography + signage",       amount: 700 },
  { date: "2026-06-10", category: "LEGAL", desc: "Business registration",       amount: 450 },
  { date: "2026-06-12", category: "UTIL",  desc: "Electricity + internet",      amount: 210 },
  { date: "2026-06-15", category: "STAFF", desc: "Barista salary (half month)", amount: 600 },
  { date: "2026-06-18", category: "MAINT", desc: "Machine cleaning kit",        amount: 95  }
];

/* ---- Seed sales (sample) ---- */
const SEED_SALES = [
  { date: "2026-06-12", item: "Djerbi Signature 1kg", qty: 6, amount: 294 },
  { date: "2026-06-13", item: "Machine cups",          qty: 40, amount: 70 },
  { date: "2026-06-14", item: "Sweet Dunes 500g",      qty: 9, amount: 234 },
  { date: "2026-06-15", item: "Gift box 3×250g",       qty: 3, amount: 165 },
  { date: "2026-06-16", item: "Marrakech Spice 1kg",   qty: 4, amount: 208 },
  { date: "2026-06-18", item: "Khaleeji Gold 250g",    qty: 7, amount: 147 }
];
