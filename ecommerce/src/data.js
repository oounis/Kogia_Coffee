import { packshot } from './packshot.js'
export const CUR="DT"
export const DELIVERY={fee:7,freeOver:60}
export const WHATSAPP="21620000000" // numéro Kogia Coffee (format international sans +)

// Profils de goût (filtres)
export const PROFILS=[
  {id:"doux",label:"Doux",emoji:"🍯"},
  {id:"floral",label:"Floral",emoji:"🌸"},
  {id:"corse",label:"Corsé",emoji:"🔥"},
  {id:"digestif",label:"Digestif",emoji:"🌿"},
  {id:"leger",label:"Léger",emoji:"☁️"},
]
export const GOUVERNORATS=["Ariana","Béja","Ben Arous","Bizerte","Gabès","Gafsa","Jendouba","Kairouan","Kasserine","Kébili","Le Kef","Mahdia","Manouba","Médenine","Monastir","Nabeul","Sfax","Sidi Bouzid","Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan"]
export const CITIES={
  "Tunis":["Tunis","Le Bardo","La Marsa","Carthage","Le Kram","Sidi Bou Saïd","La Goulette","El Menzah","El Omrane"],
  "Ariana":["Ariana","Raoued","La Soukra","Ettadhamen","Mnihla","Kalâat el-Andalous","Sidi Thabet"],
  "Ben Arous":["Ben Arous","Radès","Ezzahra","Hammam Lif","Mégrine","Mornag","Fouchana","Mohamedia"],
  "Manouba":["Manouba","Den Den","Douar Hicher","Oued Ellil","Tebourba","Borj El Amri","Mornaguia"],
  "Nabeul":["Nabeul","Hammamet","Kélibia","Korba","Menzel Temime","Soliman","Dar Chaâbane","Béni Khalled"],
  "Sousse":["Sousse","Msaken","Hammam Sousse","Akouda","Kalâa Kebira","Enfidha","Kalâa Seghira"],
  "Sfax":["Sfax","Sakiet Ezzit","Sakiet Eddaier","Thyna","El Ain","Agareb","Jebeniana","Kerkennah"],
  "Monastir":["Monastir","Moknine","Jemmal","Ksar Hellal","Téboulba","Sahline","Bekalta"],
  "Mahdia":["Mahdia","Ksour Essef","Chebba","El Jem","Bou Merdes","Sidi Alouane"],
  "Bizerte":["Bizerte","Menzel Bourguiba","Mateur","Ras Jebel","Menzel Jemil","Sejnane","Tinja"],
  "Gabès":["Gabès","Mareth","El Hamma","Métouia","Ghannouch","Matmata"],
  "Médenine":["Médenine","Houmt Souk (Djerba)","Midoun (Djerba)","Ajim (Djerba)","Zarzis","Ben Gardane","Beni Khedache"],
  "Gafsa":["Gafsa","Métlaoui","Redeyef","El Ksar","Moularès","Sened"],
  "Kairouan":["Kairouan","Sbikha","Haffouz","Bou Hajla","Chebika","Oueslatia"],
  "Kasserine":["Kasserine","Sbeïtla","Fériana","Thala","Foussana","Sbiba"],
  "Kébili":["Kébili","Douz","Souk Lahad","Faouar"],
  "Le Kef":["Le Kef","Dahmani","Tajerouine","Sers","Nebeur"],
  "Jendouba":["Jendouba","Tabarka","Aïn Draham","Bou Salem","Fernana","Ghardimaou"],
  "Béja":["Béja","Medjez el-Bab","Téboursouk","Testour","Nefza","Goubellat"],
  "Siliana":["Siliana","Bou Arada","Gaâfour","Makthar","El Krib","Bargou"],
  "Sidi Bouzid":["Sidi Bouzid","Regueb","Meknassy","Jelma","Bir El Hafey","Menzel Bouzaiane"],
  "Tozeur":["Tozeur","Nefta","Degache","Tameghza","Hazoua"],
  "Tataouine":["Tataouine","Ghomrassen","Remada","Dehiba","Bir Lahmar"],
  "Zaghouan":["Zaghouan","El Fahs","Zriba","Nadhour","Bir Mcherga"],
}
export const SIZES=["250g","500g","1kg"]

// ──────────────── CAFÉS AMAZIGHS — recettes locales de Djerba & Carthage ────────────────
// Recettes 100% locales (peuple amazigh), épices choisies selon l'accord des saveurs :
// épices douces sur torréfactions claires, épices fortes sur torréfactions foncées.
// (jamais d'ail/carvi qui masquent l'arôme du café). Chaque mélange a un bienfait réel.
export const PRODUCTS=[
  // — Signature —
  {id:"tamurt",name:"Tamurt",amazigh:"ⵜⴰⵎⵓⵔⵜ · Tamurt",ar:"تامورت",meaning:"« la terre-mère »",profile:"Aromatique & rond",cat:"corse",family:"Signature",tag:"La recette-mère amazighe",roast:"Moyenne-foncée",caf:"Moyen",accent:"#B5673A",icon:"coffee",desc:"Notre âme : café de Djerba, orge torréfié, cardamome et un souffle de rose. La recette-mère transmise de génération en génération chez les Amazighs.",pairing:"L'orge adoucit l'amertume, la cardamome relève l'arôme — un équilibre parfait.",health:"Orge & cardamome : digestion douce et faible acidité.",ingredients:["Café Arabica","Orge torréfié","Cardamome","Boutons de rose","Écorce d'orange"],intensity:4,rating:4.9,reviews:214,prices:{"250g":16,"500g":28,"1kg":49},best:true},
  {id:"idurar",name:"Idurar",amazigh:"ⵉⴷⵓⵔⴰⵔ · Idurar",ar:"إدورار",meaning:"« les montagnes »",profile:"Doux & terreux",cat:"doux",family:"Signature",tag:"Sucré sans sucre",roast:"Moyenne",caf:"Doux",accent:"#8C5A33",icon:"droplet",desc:"Des montagnes amazighes : orge torréfié, caroube (kharroub), cannelle et datte. Naturellement sucré, sans sucre ajouté, tout en douceur.",pairing:"La caroube apporte un sucré naturel — inutile d'ajouter du sucre.",health:"Caroube : sans caféine, riche en fibres, sucre naturel doux pour l'estomac.",ingredients:["Orge torréfié","Caroube (kharroub)","Cannelle","Poudre de datte"],intensity:2,rating:4.8,reviews:131,prices:{"250g":15,"500g":26,"1kg":45}},
  {id:"tmar",name:"Tmar",amazigh:"Tmar · ⵜⵎⴰⵔ",ar:"تمر",meaning:"« les dattes »",profile:"Gourmand & doux",cat:"doux",family:"Signature",tag:"Aux dattes du désert",roast:"Moyenne",caf:"Moyen",accent:"#A66A38",icon:"cookie",desc:"La douceur du désert : poudre de datte, cannelle et sésame torréfié sur un café rond. Gourmand et énergisant, sans sucre ajouté.",pairing:"Datte + cannelle + sésame : un trio sucré-grillé qui s'accorde au café moyen.",health:"Dattes : énergie naturelle, fer et fibres.",ingredients:["Café Arabica","Poudre de datte","Cannelle","Sésame torréfié"],intensity:3,rating:4.8,reviews:91,prices:{"250g":17,"500g":30,"1kg":53}},
  // — Floral & apaisant —
  {id:"azul",name:"Azul",amazigh:"ⴰⵣⵓⵍ · Azul",ar:"أزول",meaning:"« bonjour / paix »",profile:"Léger & floral",cat:"floral",family:"Floral & apaisant",tag:"Le café de bienvenue",roast:"Claire",caf:"Doux",accent:"#E0A878",icon:"citrus",desc:"Un café clair et tendre parfumé à la fleur d'oranger (zhar) et à la cardamome. Doux comme un « azul » — le bonjour amazigh.",pairing:"Torréfaction claire + épices douces : on ne masque pas le floral.",health:"Fleur d'oranger : apaise, réduit le stress, aide la digestion.",ingredients:["Arabica clair","Fleur d'oranger (zhar)","Cardamome douce"],intensity:2,rating:4.9,reviews:98,prices:{"250g":18,"500g":31,"1kg":55},premium:true},
  {id:"tanit",name:"Tanit",amazigh:"Tanit · ⵜⵏⵜ",ar:"تانيت",meaning:"déesse de Carthage",profile:"Floral & précieux",cat:"floral",family:"Floral & apaisant",tag:"Édition Carthage · safran",roast:"Claire",caf:"Doux",accent:"#D9A441",icon:"crown",desc:"L'or de Carthage : torréfaction claire, safran, boutons de rose et cardamome. Un café de cérémonie, floral et lumineux, sous la protection de la déesse Tanit.",pairing:"Safran et rose, délicats, demandent une torréfaction claire pour s'exprimer.",health:"Safran : réputé pour soutenir l'humeur, riche en antioxydants.",ingredients:["Arabica clair","Safran","Boutons de rose","Cardamome"],intensity:2,rating:4.9,reviews:76,prices:{"250g":21,"500g":36,"1kg":65},premium:true},
  {id:"ward",name:"Ward",amazigh:"Ward · ⵡⴰⵔⴷ",ar:"ورد",meaning:"« la rose »",profile:"Floral & romantique",cat:"floral",family:"Floral & apaisant",tag:"À l'eau de rose",roast:"Claire",caf:"Doux",accent:"#D26A86",icon:"flower",desc:"Hommage aux roses de Carthage : eau de rose, boutons de rose et cardamome sur un café tendre. Élégant et apaisant.",pairing:"La rose se marie à la cardamome citronnée — fraîcheur florale équilibrée.",health:"Rose : apaisante, traditionnellement adoucissante.",ingredients:["Arabica clair","Eau de rose","Boutons de rose","Cardamome"],intensity:2,rating:4.8,reviews:64,prices:{"250g":19,"500g":33,"1kg":59}},
  {id:"zhar",name:"Café Blanc",amazigh:"Zhar · ⵣⵀⴰⵔ",ar:"قهوة بيضاء",meaning:"« fleur d'oranger »",profile:"Très doux & floral",cat:"floral",family:"Floral & apaisant",tag:"Le vrai café blanc tunisien",roast:"Très claire",caf:"Très doux",accent:"#C9A86A",icon:"flower",desc:"Le café blanc de nos grand-mères : à peine torréfié, généreusement parfumé à la fleur d'oranger (zhar). Le café du soir des familles.",pairing:"Très peu torréfié pour laisser tout l'espace au zhar — un classique intouchable.",health:"Zhar : anti-stress, favorise un sommeil calme.",ingredients:["Arabica très doux","Fleur d'oranger","Une pointe de cardamome"],intensity:1,rating:4.9,reviews:88,prices:{"250g":18,"500g":31,"1kg":55}},
  // — Corsé & épicé —
  {id:"ifri",name:"Ifri",amazigh:"ⵉⴼⵔⵉ · Ifri",ar:"إفري",meaning:"« la grotte » (racine d'Afrique)",profile:"Corsé & profond",cat:"corse",family:"Corsé & épicé",tag:"Le plus puissant",roast:"Foncée",caf:"Fort",accent:"#5A3A22",icon:"flame",desc:"Sombre comme la grotte d'Ifri, qui a donné son nom à l'Afrique. Torréfaction foncée, gingembre, girofle et une pointe de poivre noir.",pairing:"Torréfaction foncée + épices fortes (gingembre, girofle, poivre) : les épices équilibrent l'amertume — l'accord recommandé.",health:"Gingembre & girofle : circulation, antibactérien, anti-nausée.",ingredients:["Arabica torréfaction foncée","Gingembre","Clou de girofle","Poivre noir (pointe)"],intensity:5,rating:4.8,reviews:142,prices:{"250g":17,"500g":29,"1kg":52}},
  {id:"tafukt",name:"Tafukt",amazigh:"ⵜⴰⴼⵓⴽⵜ · Tafukt",ar:"تافوكت",meaning:"« le soleil »",profile:"Corsé & énergisant",cat:"corse",family:"Corsé & épicé",tag:"Énergie du matin",roast:"Moyenne-foncée",caf:"Fort",accent:"#C0533A",icon:"sun",desc:"Le café-soleil : Arabica corsé, gingembre et cannelle pour démarrer fort. Réveille le corps et l'esprit.",pairing:"Gingembre vif + cannelle chaude sur un corsé : énergie sans agressivité.",health:"Gingembre & cannelle : métabolisme, glycémie, coup de fouet naturel.",ingredients:["Arabica corsé","Gingembre","Cannelle"],intensity:5,rating:4.7,reviews:89,prices:{"250g":16,"500g":28,"1kg":50}},
  // — Digestif & bien-être —
  {id:"skinjbir",name:"Skinjbir",amazigh:"Skinjbir · ⵙⴽⵏⵊⴱⵉⵔ",ar:"سكنجبير",meaning:"« le gingembre »",profile:"Épicé & digestif",cat:"digestif",family:"Digestif & bien-être",tag:"Après le repas",roast:"Moyenne",caf:"Moyen",accent:"#C77D3A",icon:"sprout",desc:"Le digestif amazigh : gingembre généreux, écorce de citron et cannelle. À savourer après le repas pour faciliter la digestion.",pairing:"Gingembre + citron : on commence par une pincée, le gingembre domine vite.",health:"Gingembre : digestion, immunité, anti-nausée — l'allié d'après-repas.",ingredients:["Arabica","Gingembre","Écorce de citron","Cannelle"],intensity:3,rating:4.7,reviews:103,prices:{"250g":17,"500g":29,"1kg":52}},
  {id:"lhend",name:"Café du Soir",amazigh:"Iḍ · ⵉⴹ",ar:"قهوة المساء",meaning:"« la nuit »",profile:"Léger & sans nervosité",cat:"leger",family:"Digestif & bien-être",tag:"Faible caféine · le soir",roast:"Orge & caroube",caf:"Très doux",accent:"#7A5C3A",icon:"droplet",desc:"Le café du soir amazigh : orge torréfié et caroube, à peine de café. La chaleur d'une tasse sans la nervosité — pour les veillées (iḍ) en famille.",pairing:"Orge + caroube remplacent l'essentiel du café : chaleur sans caféine.",health:"Très faible caféine : la chaleur du soir sans troubler le sommeil.",ingredients:["Orge torréfié","Caroube","Cannelle","Très peu de café"],intensity:1,rating:4.7,reviews:41,prices:{"250g":17,"500g":29,"1kg":52}},
]
// Packshots maison dessinés en SVG (aucun visuel externe) — voir src/packshot.js
PRODUCTS.forEach(p=>{p.img=packshot(p)})
export const productById=id=>PRODUCTS.find(p=>p.id===id)

// ───────────────────── TASSES & MUGS (faits main) ─────────────────────
export const MUGS=[
  {id:"mug-baleine",kind:"mug",name:"Mug Kogia « Baleine »",ar:"كوب الحوت",accent:"#3E6B7C",icon:"cup",price:34,badge:"Signature",material:"Céramique émaillée",desc:"Notre mug signature orné de la queue de baleine Kogia, émaillé à la main. 300 ml, tient bien la chaleur."},
  {id:"mug-espresso",kind:"mug",name:"Tasse Espresso Kogia",ar:"فنجان إسبريسو",accent:"#2A211B",icon:"coffee",price:22,badge:"Lot de 2",material:"Céramique",desc:"Deux petites tasses espresso (80 ml) au liseré doré et logo Kogia. Parfaites pour un café serré."},
  {id:"mug-emaille",kind:"mug",name:"Mug Émaillé Artisanal",ar:"كوب مزخرف",accent:"#B5673A",icon:"cup",price:38,badge:"Pièce unique",material:"Grès émaillé",desc:"Mug en grès tourné et émaillé à la main — chaque pièce est unique, avec ses nuances et son grain."},
  {id:"mug-duo",kind:"mug",name:"Duo Mugs Kogia",ar:"ثنائي الأكواب",accent:"#6F8C3A",icon:"cup",price:60,badge:"Coffret duo",material:"Céramique émaillée",desc:"Deux mugs assortis dans un joli coffret — l'idée cadeau pour les amoureux du café."},
]
export const mugById=id=>MUGS.find(m=>m.id===id)

// ─────────────── ACCESSOIRES ARTISANAUX (faits main) ───────────────
export const ACCESSORIES=[
  {id:"dallah",kind:"accessory",name:"Dallah Artisanale",ar:"دلّة",accent:"#B98B4E",icon:"coffee",price:75,badge:"Cuivre martelé",material:"Cuivre",desc:"La cafetière arabe traditionnelle, en cuivre martelé à la main. Pour servir le café à la mode du Golfe."},
  {id:"finjan",kind:"accessory",name:"Finjans — lot de 6",ar:"فناجين",accent:"#C0533A",icon:"cup",price:45,badge:"Fait main",material:"Céramique",desc:"Six petites tasses sans anse (finjan) peintes à la main, pour servir le café arabe avec élégance."},
  {id:"plateau",kind:"accessory",name:"Plateau en Bois d'Olivier",ar:"صينية زيتون",accent:"#7A7A45",icon:"tray",price:65,badge:"Bois d'olivier · Djerba",material:"Bois d'olivier",desc:"Plateau de service sculpté dans le bois d'olivier tunisien — grain unique, durable, fierté de Djerba."},
  {id:"cuilleres",kind:"accessory",name:"Cuillères en Bois d'Olivier",ar:"ملاعق زيتون",accent:"#8C8C5A",icon:"utensils",price:28,badge:"Lot de 4 · fait main",material:"Bois d'olivier",desc:"Quatre cuillères à café taillées dans le bois d'olivier, douces au toucher et inusables."},
  {id:"cezve",kind:"accessory",name:"Zazwa en Cuivre",ar:"زازوة نحاس",accent:"#9C6B3A",icon:"coffee",price:42,badge:"Cuivre",material:"Cuivre",desc:"La cafetière à café turc (zazwa / cezve) en cuivre, manche en bois. Pour le café à la sable, à l'ancienne."},
  {id:"coffret-kogia",kind:"accessory",name:"Coffret Découverte Kogia",ar:"علبة كوجيا",accent:"#3E6B7C",icon:"gift",price:89,badge:"Mug + café + finjan",material:"Coffret cadeau",desc:"Le cadeau parfait : un mug Baleine, 250g de notre signature Âme de Djerba et deux finjans, dans un écrin Kogia."},
]
export const accessoryById=id=>ACCESSORIES.find(a=>a.id===id)

// Recherche tous types (pour le panier / commandes)
export const itemById=id=>productById(id)||mugById(id)||accessoryById(id)

// Pack Découverte : 3 mélanges 250g à prix réduit
export const BUNDLE={
  id:"pack-decouverte",name:"Pack Découverte",ar:"باقة الاكتشاف",accent:"#B5673A",
  desc:"Nos 3 mélanges amazighs les plus aimés en format 250g — Tamurt, Idurar & Ward. La meilleure façon de découvrir Kogia.",
  items:["tamurt","idurar","ward"],size:"250g",
  oldPrice:48,price:42,
}

// Coffrets cadeaux
export const GIFTS=[
  {id:"coffret-decouverte",name:"Coffret Découverte",ar:"علبة الاكتشاف",accent:"#B5673A",
   desc:"3 mélanges signés en 250g, présentés dans une boîte cadeau Kogia avec carte personnalisée. Idéal pour faire découvrir.",
   items:["tamurt","tanit","azul"],size:"250g",badge:"Le plus offert",
   includes:["3 × 250g de café moulu","Boîte cadeau rigide Kogia","Carte de vœux manuscrite","Mode de préparation"],
   oldPrice:62,price:54},
  {id:"coffret-prestige",name:"Coffret Prestige",ar:"العلبة الفاخرة",accent:"#9C5630",
   desc:"Notre coffret d'exception : 4 mélanges en 250g dont le Tanit au safran de Carthage, dans un écrin haut de gamme avec dallah miniature.",
   items:["tanit","tamurt","ifri","ward"],size:"250g",badge:"Édition prestige",
   includes:["4 × 250g de café moulu","Écrin prestige noir & or","Dallah décorative miniature","Carte de vœux manuscrite"],
   oldPrice:88,price:75},
]
export const giftById=id=>GIFTS.find(g=>g.id===id)

// Abonnement café — −10%
export const SUBSCRIPTION={
  discount:0.10,size:"250g",
  freqs:[
    {id:"hebdo",label:"Chaque semaine",sub:"Hebdomadaire",every:"7 jours"},
    {id:"bimensuel",label:"Toutes les 2 semaines",sub:"Bimensuel",every:"14 jours"},
    {id:"mensuel",label:"Chaque mois",sub:"Mensuel",every:"30 jours"},
  ],
  perks:["−10% à vie sur chaque livraison","Livraison toujours gratuite","Modifiable ou annulable à tout moment","Café torréfié frais à chaque envoi"],
}

// Café du mois
export const FEATURED={id:"tanit",month:"Juin",
  pitch:"Ce mois-ci, l'or de Carthage : Tanit, au safran et à la rose. Un café de cérémonie amazigh, floral et lumineux.",
}

// Codes promo
export const PROMOS={
  "BIENVENUE10":{type:"pct",value:0.10,label:"−10% bienvenue"},
  "KOGIA15":{type:"pct",value:0.15,label:"−15% Kogia"},
  "DJERBA5":{type:"fixed",value:5,label:"−5 DT Djerba"},
}
export const applyPromo=(code,sub)=>{
  const c=(code||'').trim().toUpperCase(); const p=PROMOS[c]
  if(!p) return {ok:false,discount:0,code:c}
  const discount=p.type==='pct'?Math.round(sub*p.value):Math.min(p.value,sub)
  return {ok:true,discount,code:c,label:p.label}
}

// Avis clients
export const REVIEWS=[
  {name:"Sonia M.",gov:"Tunis",stars:5,blend:"Tamurt",quote:"Exactement le goût du café de ma grand-mère. L'orge et la cardamome sont parfaitement dosés. Cliente fidèle depuis 4 commandes."},
  {name:"Karim B.",gov:"Sousse",stars:5,blend:"Ifri",quote:"Puissant, vif, ça réveille ! Le gingembre et le girofle sur le foncé, c'est exactement l'équilibre que je cherchais. Livré en 2 jours."},
  {name:"Hela T.",gov:"Sfax",stars:5,blend:"Tanit",quote:"Le safran fait toute la différence, c'est un café de fête. Offert en coffret à ma belle-mère, elle a adoré l'histoire de Carthage."},
  {name:"Mohamed Ali J.",gov:"Nabeul",stars:4,blend:"Skinjbir",quote:"Le digestif au gingembre après le déjeuner, une vraie trouvaille. Bien dosé, ça ne pique pas trop. Bon rapport qualité-prix."},
  {name:"Ines G.",gov:"Ariana",stars:5,blend:"Café Blanc",quote:"La fleur d'oranger est divine, ça sent la Tunisie de mon enfance. Mon mari qui ne boit jamais de café en redemande !"},
  {name:"Walid R.",gov:"Médenine (Djerba)",stars:5,blend:"Idurar",quote:"Fier de boire un café 100% amazigh. La caroube apporte un sucré naturel incroyable, sans sucre ajouté. Mention spéciale au Café du Soir, sans nervosité."},
]
