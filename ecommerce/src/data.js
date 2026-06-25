export const CUR="DT"
export const DELIVERY={fee:7,freeOver:60}
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
  {id:"djerbi",name:"Signature Djerbi",ar:"الجربية",profile:"Aromatique & rond",tag:"Mélange maison",roast:"Torréfaction moyenne-foncée",accent:"#B5673A",icon:"cup",desc:"Café premium, orge torréfié, coriandre (tabil), pois chiche, cardamome, écorce d'orange & boutons de rose.",prices:{"250g":16,"500g":28,"1kg":49},best:true},
  {id:"ethiopien",name:"Éthiopien Classique",ar:"الكلاسيكية",profile:"Pur & corsé",tag:"Puriste",roast:"Torréfaction claire",accent:"#6F8C3A",icon:"bean",desc:"100% Arabica, légère touche de cardamome, clou de girofle & cannelle. Plus de café, moins de mélange.",prices:{"250g":19,"500g":33,"1kg":59}},
  {id:"khaleeji",name:"Khaleeji Or",ar:"الذهبية",profile:"Léger & floral",tag:"Cardamome & safran",roast:"Torréfaction claire",accent:"#D9A441",icon:"flower",desc:"Style du Golfe : torréfaction claire, cardamome généreuse, un fil de safran & boutons de rose.",prices:{"250g":21,"500g":36,"1kg":65},premium:true},
  {id:"marrakech",name:"Épices de Marrakech",ar:"الحارة",profile:"Épicé & chaleureux",tag:"Épices intenses",roast:"Torréfaction moyenne-foncée",accent:"#C0533A",icon:"spice",desc:"Inspiration marocaine : cannelle, gingembre, muscade, anis étoilé, poivre & sésame torréfié.",prices:{"250g":17,"500g":29,"1kg":52}},
  {id:"dunes",name:"Douceur des Dunes",ar:"الحلوة",profile:"Naturellement doux",tag:"Doux sans sucre",roast:"Torréfaction moyenne",accent:"#C99A5B",icon:"drop",desc:"Douceur sans sucre — orge torréfié, cannelle, poudre de datte & cardamome. Onctueux & doux.",prices:{"250g":15,"500g":26,"1kg":45}},
  {id:"sahara",name:"Gingembre du Sahara",ar:"الصحراوية",profile:"Corsé & relevé",tag:"Coup de gingembre",roast:"Torréfaction foncée",accent:"#A0552A",icon:"flame",desc:"Style yéménite, dominé par le gingembre & foncé. Fort, vif, énergisant.",prices:{"250g":16,"500g":28,"1kg":50}},
]
export const productById=id=>PRODUCTS.find(p=>p.id===id)
