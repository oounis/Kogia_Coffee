export const CUR="DT"
export const DELIVERY={fee:7,freeOver:60}
export const WHATSAPP="21620000000" // numéro Kogia Coffee (format international sans +)

// Profils de goût (filtres)
export const PROFILS=[
  {id:"doux",label:"Doux",emoji:"🍯"},
  {id:"corse",label:"Corsé",emoji:"🔥"},
  {id:"epice",label:"Épicé",emoji:"🌶️"},
  {id:"floral",label:"Floral",emoji:"🌸"},
  {id:"gourmand",label:"Gourmand",emoji:"🍫"},
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

// ───────────────────────── CAFÉS ─────────────────────────
export const PRODUCTS=[
  // — Mélanges traditionnels —
  {id:"djerbi",name:"Âme de Djerba",ar:"روح جربة",profile:"Aromatique & rond",cat:"corse",family:"Traditionnel",tag:"Signature maison",roast:"Torréfaction moyenne-foncée",accent:"#B5673A",icon:"coffee",desc:"Notre signature : café premium, orge torréfié, coriandre (tabil), pois chiche, cardamome, écorce d'orange & boutons de rose.",ingredients:["Café Arabica premium","Orge torréfié","Coriandre (tabil)","Pois chiche","Cardamome","Écorce d'orange","Boutons de rose"],intensity:4,rating:4.9,reviews:214,prices:{"250g":16,"500g":28,"1kg":49},best:true},
  {id:"ethiopien",name:"Perle d'Abyssinie",ar:"لؤلؤة الحبشة",profile:"Pur & corsé",cat:"corse",family:"Traditionnel",tag:"Puriste",roast:"Torréfaction claire",accent:"#6F8C3A",icon:"leaf",desc:"100% Arabica d'Éthiopie, légère touche de cardamome, clou de girofle & cannelle. Plus de café, moins de mélange.",ingredients:["100% Café Arabica","Cardamome","Clou de girofle","Cannelle"],intensity:4,rating:4.8,reviews:167,prices:{"250g":19,"500g":33,"1kg":59}},
  {id:"khaleeji",name:"Or du Golfe",ar:"ذهب الخليج",profile:"Léger & floral",cat:"floral",family:"Traditionnel",tag:"Cardamome & safran",roast:"Torréfaction claire",accent:"#D9A441",icon:"crown",desc:"Style du Golfe : torréfaction claire, cardamome généreuse, un fil de safran & boutons de rose.",ingredients:["Café Arabica clair","Cardamome généreuse","Safran","Boutons de rose"],intensity:2,rating:4.9,reviews:98,prices:{"250g":21,"500g":36,"1kg":65},premium:true},
  {id:"marrakech",name:"Route des Épices",ar:"درب البهارات",profile:"Épicé & chaleureux",cat:"epice",family:"Traditionnel",tag:"Épices intenses",roast:"Torréfaction moyenne-foncée",accent:"#C0533A",icon:"flame",desc:"Inspiration marocaine : cannelle, gingembre, muscade, anis étoilé, poivre & sésame torréfié.",ingredients:["Café torréfié","Cannelle","Gingembre","Muscade","Anis étoilé","Poivre","Sésame torréfié"],intensity:5,rating:4.7,reviews:142,prices:{"250g":17,"500g":29,"1kg":52}},
  {id:"dunes",name:"Velours des Dunes",ar:"مخمل الكثبان",profile:"Naturellement doux",cat:"doux",family:"Traditionnel",tag:"Doux sans sucre",roast:"Torréfaction moyenne",accent:"#C99A5B",icon:"droplet",desc:"Douceur sans sucre — orge torréfié, cannelle, poudre de datte & cardamome. Onctueux & doux.",ingredients:["Orge torréfié","Café doux","Cannelle","Poudre de datte","Cardamome"],intensity:2,rating:4.8,reviews:131,prices:{"250g":15,"500g":26,"1kg":45}},
  {id:"sahara",name:"Braise du Sahara",ar:"جمر الصحراء",profile:"Corsé & relevé",cat:"corse",family:"Traditionnel",tag:"Coup de gingembre",roast:"Torréfaction foncée",accent:"#A0552A",icon:"sun",desc:"Style yéménite, dominé par le gingembre & foncé. Fort, vif, énergisant.",ingredients:["Café torréfié foncé","Gingembre","Cardamome","Clou de girofle"],intensity:5,rating:4.7,reviews:89,prices:{"250g":16,"500g":28,"1kg":50}},
  // — Floral & signature —
  {id:"blanc",name:"Café Blanc",ar:"القهوة البيضاء",profile:"Floral & délicat",cat:"floral",family:"Floral",tag:"Fleur d'oranger (zhar)",roast:"Torréfaction claire",accent:"#E0A878",icon:"citrus",desc:"Le café blanc tunisien : une eau de fleur d'oranger (zhar) délicate sur un café doux & léger. Apaisant, parfumé, traditionnel.",ingredients:["Café Arabica doux","Eau de fleur d'oranger","Une pointe de cardamome"],intensity:1,rating:4.9,reviews:76,prices:{"250g":18,"500g":31,"1kg":55},premium:true},
  {id:"rose",name:"Rose de Nabeul",ar:"ورد نابل",profile:"Floral & romantique",cat:"floral",family:"Floral",tag:"Eau de rose",roast:"Torréfaction claire",accent:"#D26A86",icon:"flower",desc:"Hommage aux roseraies de Nabeul : eau de rose, cardamome & boutons de rose sur un café tendre. Élégant et raffiné.",ingredients:["Café Arabica clair","Eau de rose","Cardamome","Boutons de rose"],intensity:2,rating:4.8,reviews:64,prices:{"250g":19,"500g":33,"1kg":59}},
  {id:"qishr",name:"Qishr du Yémen",ar:"قشر يمني",profile:"Épicé & sans caféine",cat:"epice",family:"Floral",tag:"Sans caféine · gingembre",roast:"Infusion d'écorces",accent:"#C77D3A",icon:"sprout",desc:"Le « café du soir » yéménite : infusion des écorces de la cerise de café (qishr) au gingembre & cannelle. Quasiment sans caféine.",ingredients:["Écorces de café (qishr)","Gingembre","Cannelle"],intensity:2,rating:4.7,reviews:41,prices:{"250g":17,"500g":29,"1kg":52}},
  // — Gourmand —
  {id:"noisette",name:"Noisette Royale",ar:"بندق ملكي",profile:"Gourmand & nappé",cat:"gourmand",family:"Gourmand",tag:"Noisette torréfiée",roast:"Torréfaction moyenne",accent:"#8C5A33",icon:"cookie",desc:"Un café rond aux éclats de noisette torréfiée. Gourmand, doux et réconfortant, sans sucre ajouté.",ingredients:["Café Arabica","Arôme naturel de noisette","Une pointe de vanille"],intensity:3,rating:4.8,reviews:103,prices:{"250g":17,"500g":29,"1kg":52}},
  {id:"caramel",name:"Caramel Doré",ar:"كراميل ذهبي",profile:"Gourmand & sucré",cat:"gourmand",family:"Gourmand",tag:"Caramel beurre salé",roast:"Torréfaction moyenne",accent:"#C68A3E",icon:"candy",desc:"Notes de caramel au beurre salé sur un café onctueux. Le plus gourmand de la maison — fondant et chaleureux.",ingredients:["Café Arabica","Arôme naturel de caramel","Fleur de sel"],intensity:3,rating:4.9,reviews:128,prices:{"250g":17,"500g":30,"1kg":53}},
  {id:"vanille",name:"Vanille de Madagascar",ar:"فانيليا",profile:"Doux & crémeux",cat:"gourmand",family:"Gourmand",tag:"Vanille Bourbon",roast:"Torréfaction moyenne",accent:"#C9A86A",icon:"icecream",desc:"Vanille Bourbon de Madagascar sur un café tendre et crémeux. Velouté, parfumé, irrésistible au lait.",ingredients:["Café Arabica","Vanille Bourbon de Madagascar"],intensity:2,rating:4.8,reviews:91,prices:{"250g":18,"500g":31,"1kg":55}},
]
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
  desc:"Nos 3 mélanges les plus aimés en format 250g — Âme de Djerba, Velours des Dunes & Route des Épices. La meilleure façon de goûter à Kogia.",
  items:["djerbi","dunes","marrakech"],size:"250g",
  oldPrice:48,price:42,
}

// Coffrets cadeaux
export const GIFTS=[
  {id:"coffret-decouverte",name:"Coffret Découverte",ar:"علبة الاكتشاف",accent:"#B5673A",
   desc:"3 mélanges signés en 250g, présentés dans une boîte cadeau Kogia avec carte personnalisée. Idéal pour faire découvrir.",
   items:["djerbi","khaleeji","dunes"],size:"250g",badge:"Le plus offert",
   includes:["3 × 250g de café moulu","Boîte cadeau rigide Kogia","Carte de vœux manuscrite","Mode de préparation"],
   oldPrice:62,price:54},
  {id:"coffret-prestige",name:"Coffret Prestige",ar:"العلبة الفاخرة",accent:"#9C5630",
   desc:"Notre coffret d'exception : 4 mélanges en 250g dont l'Or du Golfe au safran, dans un écrin haut de gamme avec dallah miniature.",
   items:["khaleeji","djerbi","marrakech","ethiopien"],size:"250g",badge:"Édition prestige",
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
export const FEATURED={id:"blanc",month:"Juin",
  pitch:"Ce mois-ci, on célèbre la finesse tunisienne : le Café Blanc à la fleur d'oranger. Doux, parfumé, apaisant — le café des grands jours.",
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
  {name:"Sonia M.",gov:"Tunis",stars:5,blend:"Âme de Djerba",quote:"Exactement le goût du café de ma grand-mère. La coriandre et la cardamome sont parfaitement dosées. Cliente fidèle depuis 4 commandes."},
  {name:"Karim B.",gov:"Sousse",stars:5,blend:"Braise du Sahara",quote:"Puissant, vif, ça réveille ! Livré en 2 jours à Msaken et payé au livreur, rien à dire. La torréfaction est vraiment fraîche."},
  {name:"Hela T.",gov:"Sfax",stars:5,blend:"Or du Golfe",quote:"Le safran fait toute la différence, c'est un café de fête. Offert en coffret à ma belle-mère, elle a adoré l'emballage."},
  {name:"Mohamed Ali J.",gov:"Nabeul",stars:4,blend:"Route des Épices",quote:"Très parfumé, l'anis étoilé ressort bien. Un peu corsé pour moi le matin mais idéal l'après-midi. Bon rapport qualité-prix."},
  {name:"Ines G.",gov:"Ariana",stars:5,blend:"Café Blanc",quote:"La fleur d'oranger est divine, ça sent la Tunisie de mon enfance. Mon mari qui ne boit jamais de café en redemande !"},
  {name:"Walid R.",gov:"Médenine (Djerba)",stars:5,blend:"Pack Découverte",quote:"Fier de soutenir une marque djerbienne. Le pack permet de tout goûter. Mention spéciale pour la Perle d'Abyssinie, pure et franche."},
]
