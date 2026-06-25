export const CUR="DT"
export const GOUVERNORATS=["Ariana","Béja","Ben Arous","Bizerte","Gabès","Gafsa","Jendouba","Kairouan","Kasserine","Kébili","Le Kef","Mahdia","Manouba","Médenine","Monastir","Nabeul","Sfax","Sidi Bouzid","Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan"]
export const SIZES=["250g","500g","1kg"]
export const PRODUCTS=[
  {id:"djerbi",name:"Signature Djerbi",ar:"الجربية",profile:"Aromatique & rond",tag:"Mélange maison",roast:"Torréfaction moyenne-foncée",c1:"#F6EAE0",c2:"#EAD7C6",desc:"Café premium, orge torréfié, coriandre (tabil), pois chiche, cardamome, écorce d'orange & boutons de rose.",prices:{"250g":16,"500g":28,"1kg":49},best:true},
  {id:"ethiopien",name:"Éthiopien Classique",ar:"الكلاسيكية",profile:"Pur & corsé",tag:"Puriste",roast:"Torréfaction claire",c1:"#EFEFE6",c2:"#E2E4D2",desc:"100% Arabica, légère touche de cardamome, clou de girofle & cannelle. Plus de café, moins de mélange.",prices:{"250g":19,"500g":33,"1kg":59}},
  {id:"khaleeji",name:"Khaleeji Or",ar:"الذهبية",profile:"Léger & floral",tag:"Cardamome & safran",roast:"Torréfaction claire",c1:"#FBF1D6",c2:"#F3E2B8",desc:"Style du Golfe : torréfaction claire, cardamome généreuse, un fil de safran & boutons de rose.",prices:{"250g":21,"500g":36,"1kg":65},premium:true},
  {id:"marrakech",name:"Épices de Marrakech",ar:"الحارة",profile:"Épicé & chaleureux",tag:"Épices intenses",roast:"Torréfaction moyenne-foncée",c1:"#F6E0D6",c2:"#EBC8B6",desc:"Inspiration marocaine : cannelle, gingembre, muscade, anis étoilé, poivre & sésame torréfié.",prices:{"250g":17,"500g":29,"1kg":52}},
  {id:"dunes",name:"Douceur des Dunes",ar:"الحلوة",profile:"Naturellement doux",tag:"Doux sans sucre",roast:"Torréfaction moyenne",c1:"#F4E8D8",c2:"#E8D3B9",desc:"Douceur sans sucre — orge torréfié, cannelle, poudre de datte & cardamome. Onctueux & doux.",prices:{"250g":15,"500g":26,"1kg":45}},
  {id:"sahara",name:"Gingembre du Sahara",ar:"الصحراوية",profile:"Corsé & relevé",tag:"Coup de gingembre",roast:"Torréfaction foncée",c1:"#F1DDD0",c2:"#E2C2AC",desc:"Style yéménite, dominé par le gingembre & foncé. Fort, vif, énergisant.",prices:{"250g":16,"500g":28,"1kg":50}},
]
export const productById=id=>PRODUCTS.find(p=>p.id===id)
