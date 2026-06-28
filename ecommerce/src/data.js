import { coffeeBagSVG, labelSVG } from './art.js'
export const CUR="DT"
export const DELIVERY={fee:7,freeOver:60}
export const WHATSAPP="21620000000" // numéro Kogia Coffee (format international sans +)
// Profils de goût pour le filtre
export const PROFILS=[
  {id:"doux",label:"Doux",emoji:"🍯"},
  {id:"corse",label:"Corsé",emoji:"🔥"},
  {id:"epice",label:"Épicé",emoji:"🌶️"},
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
export const PRODUCTS=[
  {id:"djerbi",name:"Signature Djerbi",ar:"الجربية",profile:"Aromatique & rond",cat:"corse",tag:"Mélange maison",roast:"Torréfaction moyenne-foncée",accent:"#B5673A",icon:"cup",desc:"Café premium, orge torréfié, coriandre (tabil), pois chiche, cardamome, écorce d'orange & boutons de rose.",ingredients:["Café Arabica premium","Orge torréfié","Coriandre (tabil)","Pois chiche","Cardamome","Écorce d'orange","Boutons de rose"],intensity:4,rating:4.9,reviews:214,prices:{"250g":16,"500g":28,"1kg":49},best:true},
  {id:"ethiopien",name:"Éthiopien Classique",ar:"الكلاسيكية",profile:"Pur & corsé",cat:"corse",tag:"Puriste",roast:"Torréfaction claire",accent:"#6F8C3A",icon:"bean",desc:"100% Arabica, légère touche de cardamome, clou de girofle & cannelle. Plus de café, moins de mélange.",ingredients:["100% Café Arabica","Cardamome","Clou de girofle","Cannelle"],intensity:4,rating:4.8,reviews:167,prices:{"250g":19,"500g":33,"1kg":59}},
  {id:"khaleeji",name:"Khaleeji Or",ar:"الذهبية",profile:"Léger & floral",cat:"epice",tag:"Cardamome & safran",roast:"Torréfaction claire",accent:"#D9A441",icon:"flower",desc:"Style du Golfe : torréfaction claire, cardamome généreuse, un fil de safran & boutons de rose.",ingredients:["Café Arabica clair","Cardamome généreuse","Safran","Boutons de rose"],intensity:2,rating:4.9,reviews:98,prices:{"250g":21,"500g":36,"1kg":65},premium:true},
  {id:"marrakech",name:"Épices de Marrakech",ar:"الحارة",profile:"Épicé & chaleureux",cat:"epice",tag:"Épices intenses",roast:"Torréfaction moyenne-foncée",accent:"#C0533A",icon:"spice",desc:"Inspiration marocaine : cannelle, gingembre, muscade, anis étoilé, poivre & sésame torréfié.",ingredients:["Café torréfié","Cannelle","Gingembre","Muscade","Anis étoilé","Poivre","Sésame torréfié"],intensity:5,rating:4.7,reviews:142,prices:{"250g":17,"500g":29,"1kg":52}},
  {id:"dunes",name:"Douceur des Dunes",ar:"الحلوة",profile:"Naturellement doux",cat:"doux",tag:"Doux sans sucre",roast:"Torréfaction moyenne",accent:"#C99A5B",icon:"drop",desc:"Douceur sans sucre — orge torréfié, cannelle, poudre de datte & cardamome. Onctueux & doux.",ingredients:["Orge torréfié","Café doux","Cannelle","Poudre de datte","Cardamome"],intensity:2,rating:4.8,reviews:131,prices:{"250g":15,"500g":26,"1kg":45}},
  {id:"sahara",name:"Gingembre du Sahara",ar:"الصحراوية",profile:"Corsé & relevé",cat:"corse",tag:"Coup de gingembre",roast:"Torréfaction foncée",accent:"#A0552A",icon:"flame",desc:"Style yéménite, dominé par le gingembre & foncé. Fort, vif, énergisant.",ingredients:["Café torréfié foncé","Gingembre","Cardamome","Clou de girofle"],intensity:5,rating:4.7,reviews:89,prices:{"250g":16,"500g":28,"1kg":50}},
]
// Images produits = illustrations vectorielles maison (voir art.js) — libres, légères, nettes.
PRODUCTS.forEach(p=>{p.img=coffeeBagSVG(p);p.label=labelSVG(p)})
export const productById=id=>PRODUCTS.find(p=>p.id===id)
// Pack Découverte : 3 mélanges 250g à prix réduit (livraison gratuite incluse)
export const BUNDLE={
  id:"pack-decouverte",name:"Pack Découverte",ar:"باقة الاكتشاف",
  desc:"Nos 3 mélanges les plus aimés en format 250g — Signature Djerbi, Douceur des Dunes & Épices de Marrakech. La meilleure façon de goûter à Kogia.",
  items:["djerbi","dunes","marrakech"],size:"250g",
  oldPrice:48,price:42,accent:"#B5673A",
}

// Coffrets cadeaux — boîtes prêtes à offrir (paiement à la livraison)
export const GIFTS=[
  {id:"coffret-decouverte",name:"Coffret Découverte",ar:"علبة الاكتشاف",accent:"#B5673A",
   desc:"3 mélanges signés en 250g, présentés dans une boîte cadeau Kogia avec carte personnalisée. Idéal pour faire découvrir.",
   items:["djerbi","khaleeji","dunes"],size:"250g",badge:"Le plus offert",
   includes:["3 × 250g de café moulu","Boîte cadeau rigide Kogia","Carte de vœux manuscrite","Mode de préparation"],
   oldPrice:62,price:54},
  {id:"coffret-prestige",name:"Coffret Prestige",ar:"العلبة الفاخرة",accent:"#9C5630",
   desc:"Notre coffret d'exception : 4 mélanges en 250g dont le Khaleeji Or au safran, dans un écrin haut de gamme avec dallah miniature.",
   items:["khaleeji","djerbi","marrakech","ethiopien"],size:"250g",badge:"Édition prestige",
   includes:["4 × 250g de café moulu","Écrin prestige noir & or","Dallah décorative miniature","Carte de vœux manuscrite"],
   oldPrice:88,price:75},
]
export const giftById=id=>GIFTS.find(g=>g.id===id)

// Abonnement café — recevez votre mélange à fréquence régulière, −10%
export const SUBSCRIPTION={
  discount:0.10,size:"250g",
  freqs:[
    {id:"hebdo",label:"Chaque semaine",sub:"Hebdomadaire",every:"7 jours"},
    {id:"bimensuel",label:"Toutes les 2 semaines",sub:"Bimensuel",every:"14 jours"},
    {id:"mensuel",label:"Chaque mois",sub:"Mensuel",every:"30 jours"},
  ],
  perks:["−10% à vie sur chaque livraison","Livraison toujours gratuite","Modifiable ou annulable à tout moment","Café torréfié frais à chaque envoi"],
}

// Café du mois — mélange mis en avant
export const FEATURED={
  id:"khaleeji",month:"Juin",
  pitch:"Ce mois-ci, on célèbre la finesse : torréfaction claire, cardamome généreuse et un fil de safran. Un café de cérémonie, doux et floral.",
}

// Codes promo (appliqués au sous-total au checkout)
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

// Avis clients — témoignages français crédibles
export const REVIEWS=[
  {name:"Sonia M.",gov:"Tunis",stars:5,blend:"Signature Djerbi",quote:"Exactement le goût du café de ma grand-mère. La coriandre et la cardamome sont parfaitement dosées. Je suis cliente fidèle depuis 4 commandes."},
  {name:"Karim B.",gov:"Sousse",stars:5,blend:"Gingembre du Sahara",quote:"Puissant, vif, ça réveille ! Livré en 2 jours à Msaken et payé au livreur, rien à dire. La torréfaction est vraiment fraîche."},
  {name:"Hela T.",gov:"Sfax",stars:5,blend:"Khaleeji Or",quote:"Le safran fait toute la différence, c'est un café de fête. Je l'ai offert en coffret à ma belle-mère, elle a adoré l'emballage."},
  {name:"Mohamed Ali J.",gov:"Nabeul",stars:4,blend:"Épices de Marrakech",quote:"Très parfumé, l'anis étoilé ressort bien. Un peu corsé pour moi le matin mais idéal l'après-midi. Bon rapport qualité-prix."},
  {name:"Ines G.",gov:"Ariana",stars:5,blend:"Douceur des Dunes",quote:"Doux sans aucun sucre ajouté, la datte apporte une rondeur incroyable. Mon mari qui ne boit jamais de café en redemande !"},
  {name:"Walid R.",gov:"Médenine (Djerba)",stars:5,blend:"Pack Découverte",quote:"Fier de soutenir une marque djerbienne. Le pack permet de tout goûter. Mention spéciale pour l'Éthiopien, pur et franc."},
]
