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
