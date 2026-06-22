const EXPENSE_CATEGORIES = [
  { code:"RENT",  label:"Rent",             color:"#C0743C" },
  { code:"UTIL",  label:"Utilities",        color:"#7C8A57" },
  { code:"RAW",   label:"Raw Materials",    color:"#6F4E37" },
  { code:"PACK",  label:"Packaging",        color:"#D9A441" },
  { code:"EQUIP", label:"Equipment",        color:"#A85F2C" },
  { code:"MAINT", label:"Maintenance",      color:"#8FA06A" },
  { code:"STAFF", label:"Staff",            color:"#C68A4E" },
  { code:"MKT",   label:"Marketing",        color:"#C56B6B" },
  { code:"LEGAL", label:"Legal & Licenses", color:"#A8895A" },
  { code:"MISC",  label:"Miscellaneous",    color:"#9C8E7E" }
];
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
const SEED_SALES = [
  { date:"2026-06-12", item:"Djerbi Signature 1kg", qty:6,  amount:294 },
  { date:"2026-06-13", item:"Machine cups",          qty:40, amount:70 },
  { date:"2026-06-14", item:"Sweet Dunes 500g",      qty:9,  amount:234 },
  { date:"2026-06-15", item:"Gift box 3×250g",       qty:3,  amount:165 },
  { date:"2026-06-16", item:"Marrakech Spice 1kg",   qty:4,  amount:208 },
  { date:"2026-06-18", item:"Khaleeji Gold 250g",    qty:7,  amount:147 }
];
