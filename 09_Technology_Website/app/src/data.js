export const CURRENCY = "DT";
const A = import.meta.env.BASE_URL; // asset base

export const PRODUCTS = [
  { id:"djerbi", name:"Djerbi Signature", arabic:"الجربية", profile:"Aromatic & rounded", tag:"House blend", roast:"Medium-dark", tint:"#F6E6CF", accent:"#C0743C",
    img:A+"photos/djerbi.jpg", meter:{Body:4,Spice:3,Sweet:3,Aroma:5},
    desc:"Premium coffee with roasted barley, coriander (tabil), chickpea, cardamom, orange peel & rosebuds.",
    prices:{"250g":16,"500g":28,"1kg":49}, bestseller:true },
  { id:"ethiopian", name:"Ethiopian Classic", arabic:"الكلاسيكية", profile:"Clean & coffee-forward", tag:"Purist", roast:"Light-medium", tint:"#E7ECD6", accent:"#7C8A57",
    img:A+"photos/ethiopian.jpg", meter:{Body:3,Spice:2,Sweet:2,Aroma:4},
    desc:"Mostly 100% Arabica with a light lift of cardamom, clove & cinnamon. More coffee, fewer fillers.",
    prices:{"250g":19,"500g":33,"1kg":59} },
  { id:"khaleeji", name:"Khaleeji Gold", arabic:"الذهبية", profile:"Light & floral", tag:"Cardamom & saffron", roast:"Light", tint:"#FBF0CC", accent:"#D9A441",
    img:A+"photos/khaleeji.jpg", meter:{Body:2,Spice:3,Sweet:2,Aroma:5},
    desc:"Gulf-style: light roast, heavy cardamom, a thread of saffron & rosebuds. Floral, very aromatic.",
    prices:{"250g":21,"500g":36,"1kg":65}, premium:true },
  { id:"marrakech", name:"Marrakech Spice", arabic:"الحارة", profile:"Spicy & warming", tag:"Bold spice", roast:"Medium-dark", tint:"#F6DFD2", accent:"#C56B6B",
    img:A+"photos/marrakech.jpg", meter:{Body:4,Spice:5,Sweet:2,Aroma:4},
    desc:"Moroccan six-spice: cinnamon, ginger, nutmeg, star anise, pepper & toasted sesame. Dark & warming.",
    prices:{"250g":17,"500g":29,"1kg":52} },
  { id:"sweetdunes", name:"Sweet Dunes", arabic:"الحلوة", profile:"Naturally sweet", tag:"Sugar-free sweet", roast:"Medium", tint:"#F3E6CF", accent:"#C68A4E",
    img:A+"photos/sweetdunes.jpg", meter:{Body:3,Spice:2,Sweet:5,Aroma:3},
    desc:"Sweetness without sugar — extra roasted barley, cinnamon, date powder & cardamom. Smooth & gentle.",
    prices:{"250g":15,"500g":26,"1kg":45} },
  { id:"sahara", name:"Sahara Ginger", arabic:"الصحراوية", profile:"Bold & zesty", tag:"Ginger kick", roast:"Dark", tint:"#F8E2C8", accent:"#B5642A",
    img:A+"photos/sahara.jpg", meter:{Body:5,Spice:5,Sweet:1,Aroma:3},
    desc:"Yemeni-style, ginger-forward & dark. Strong, sharp, energizing — cinnamon, clove & cardamom behind.",
    prices:{"250g":16,"500g":28,"1kg":50} },
];

export const PHOTOS = { hero:A+"photos/hero.jpg", beans:A+"photos/beans.jpg" };

export const TESTIMONIALS = [
  { name:"Amira", city:"Houmt Souk", avatar:A+"avatars/Amira.svg", stars:5, text:"The Khaleeji Gold smells like a wedding. I buy a 1kg bag every month now." },
  { name:"Youssef", city:"Midoun", avatar:A+"avatars/Youssef.svg", stars:5, text:"Tasted the Sahara Ginger at the corner and walked out with two bags. Strong and clean." },
  { name:"Leila", city:"Djerba", avatar:A+"avatars/Leila.svg", stars:5, text:"Sweet Dunes with no sugar — finally a coffee my mother and I both love." },
  { name:"Karim", city:"Zarzis", avatar:A+"avatars/Karim.svg", stars:4, text:"They list every gram on the bag. You can taste the honesty. Marrakech Spice is my winter cup." },
];

/* ---- Finance (owner dashboard) ---- */
export const EXPENSE_CATEGORIES = [
  { code:"RENT",  label:"Rent",             color:"#C0743C" },
  { code:"UTIL",  label:"Utilities",        color:"#7C8A57" },
  { code:"RAW",   label:"Raw Materials",    color:"#6F4E37" },
  { code:"PACK",  label:"Packaging",        color:"#D9A441" },
  { code:"EQUIP", label:"Equipment",        color:"#A85F2C" },
  { code:"MAINT", label:"Maintenance",      color:"#8FA06A" },
  { code:"STAFF", label:"Staff",            color:"#C68A4E" },
  { code:"MKT",   label:"Marketing",        color:"#C56B6B" },
  { code:"LEGAL", label:"Legal & Licenses", color:"#A8895A" },
  { code:"MISC",  label:"Miscellaneous",    color:"#9C8E7E" },
];
export const SEED_EXPENSES = [
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
  { date:"2026-06-18", category:"MAINT", desc:"Machine cleaning kit",         amount:95 },
];
export const SEED_SALES = [
  { date:"2026-06-12", item:"Djerbi Signature 1kg", qty:6,  amount:294 },
  { date:"2026-06-13", item:"Machine cups",          qty:40, amount:70 },
  { date:"2026-06-14", item:"Sweet Dunes 500g",      qty:9,  amount:234 },
  { date:"2026-06-15", item:"Gift box 3×250g",       qty:3,  amount:165 },
  { date:"2026-06-16", item:"Marrakech Spice 1kg",   qty:4,  amount:208 },
  { date:"2026-06-18", item:"Khaleeji Gold 250g",    qty:7,  amount:147 },
];
