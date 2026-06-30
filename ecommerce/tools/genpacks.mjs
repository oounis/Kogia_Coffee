// Générateur de visuels Kogia : SVG dessiné -> PNG (polices Lilita One / Inter / Tifinagh
// embarquées via resvg-js). Pochettes café réalistes, mugs, écrins accessoires.
import { Resvg } from '@resvg/resvg-js'
import fs from 'fs'
import os from 'os'

const HOME = os.homedir()
const FONTS = [`${HOME}/.local/share/fonts/LilitaOne.ttf`, `${HOME}/.local/share/fonts/Inter.ttf`, `${HOME}/.local/share/fonts/NotoTifinagh.ttf`]
const OUT = 'public/packs/'   // exécuter depuis le dossier ecommerce/
fs.mkdirSync(OUT, { recursive: true })

const clamp = v => Math.max(0, Math.min(255, Math.round(v)))
const hx = ({ r, g, b }) => '#' + [r, g, b].map(v => clamp(v).toString(16).padStart(2, '0')).join('')
const rgb = h => { const n = parseInt(h.slice(1), 16); return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 } }
const shade = (h, d) => { const c = rgb(h); return hx({ r: c.r + d, g: c.g + d, b: c.b + d }) }
const mix = (h, t, k) => { const a = rgb(h), b = rgb(t); return hx({ r: a.r + (b.r - a.r) * k, g: a.g + (b.g - a.g) * k, b: a.b + (b.b - a.b) * k }) }
const lum = h => { const c = rgb(h); return 0.299 * c.r + 0.587 * c.g + 0.114 * c.b }
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const ICONS = {
  coffee:`<g fill='none' stroke='%C%' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M5 9h11v5a5.5 5.5 0 0 1-11 0z'/><path d='M16 10h2a2.6 2.6 0 0 1 0 5.2h-1'/><path d='M8 5.5c-1-1 0-2 0-3'/><path d='M12 5.5c-1-1 0-2 0-3'/></g>`,
  flame:`<path fill='%C%' d='M12.5 2c.4 3.4-2.7 4.6-2.7 8.2a3 3 0 0 0 6 0c0-1.5-.8-2.4-1.4-3.4.3 1.7-1.6 1.9-1.6 0 0-1.7-.3-2.9-.3-4.8z'/>`,
  sun:`<g fill='%C%'><circle cx='12' cy='12' r='4.4'/></g><g fill='none' stroke='%C%' stroke-width='2' stroke-linecap='round'><path d='M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7'/></g>`,
  droplet:`<path fill='%C%' d='M12 3c2.3 4 5.2 6.4 5.2 9.5a5.2 5.2 0 0 1-10.4 0C6.8 9.4 9.7 7 12 3z'/>`,
  flower:`<g fill='%C%'><circle cx='12' cy='12' r='2.7'/><ellipse cx='12' cy='6.3' rx='2.3' ry='3.6'/><ellipse cx='12' cy='17.7' rx='2.3' ry='3.6'/><ellipse cx='6.3' cy='12' rx='3.6' ry='2.3'/><ellipse cx='17.7' cy='12' rx='3.6' ry='2.3'/></g>`,
  citrus:`<g fill='none' stroke='%C%' stroke-width='2'><circle cx='12' cy='12' r='8.2'/><path d='M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7'/></g>`,
  sprout:`<g fill='none' stroke='%C%' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 20v-7'/><path d='M12 13c0-3.4-3-4.6-5.5-4.4C6.7 11.8 9 13.4 12 13z'/><path d='M12 14.5c0-2.6 2.4-3.7 4.6-3.5C16.4 13.4 14.5 14.7 12 14.5z'/></g>`,
  crown:`<path fill='%C%' d='M3.5 8.5l3.4 7.5h10.2l3.4-7.5-4.6 3.4L12 5.5 8.1 11.9z'/>`,
  cookie:`<g fill='%C%'><circle cx='12' cy='12' r='8.2' fill='none' stroke='%C%' stroke-width='2'/><circle cx='10' cy='9.5' r='1.2'/><circle cx='15' cy='11' r='1.2'/><circle cx='11' cy='15' r='1.2'/><circle cx='15.5' cy='15' r='1'/></g>`,
  cup:`<g fill='none' stroke='%C%' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M6 9h10v4.5a5 5 0 0 1-10 0z'/><path d='M16 10h1.8a2.4 2.4 0 0 1 0 4.8H16'/></g>`,
  tray:`<g fill='none' stroke='%C%' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='3.5' y='8' width='17' height='8' rx='2.5'/><path d='M2 17.5h20'/></g>`,
  utensils:`<g fill='none' stroke='%C%' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M9 3v8a2 2 0 0 1-4 0V3M7 11v10'/><path d='M16 3c-2 0-3 2-3 5s1 4 3 4 3-1 3-4-1-5-3-5zM16 12v9'/></g>`,
  gift:`<g fill='none' stroke='%C%' stroke-width='2' stroke-linejoin='round'><rect x='4' y='9' width='16' height='11' rx='1.5'/><path d='M4 13h16M12 9v11'/><path d='M12 9c-1-3-5-3-5-.5 0 1.5 3 .5 5 .5zM12 9c1-3 5-3 5-.5 0 1.5-3 .5-5 .5z'/></g>`,
}
const icon = (k, c, cx, cy, s) => `<g transform='translate(${cx} ${cy}) scale(${s}) translate(-12 -12)'>${(ICONS[k]||ICONS.coffee).replaceAll('%C%', c)}</g>`
const CAT = { doux:'DOUX', floral:'FLORAL', corse:'CORSÉ', digestif:'DIGESTIF', leger:'LÉGER' }

function bg(a){ return `<defs><radialGradient id='bg' cx='50%' cy='38%' r='75%'><stop offset='0' stop-color='${mix(a,'#ffffff',0.93)}'/><stop offset='1' stop-color='${mix(a,'#ffffff',0.8)}'/></radialGradient>
  <linearGradient id='bag' x1='0' y1='0' x2='1' y2='0'><stop offset='0' stop-color='${shade(a,-18)}'/><stop offset='0.18' stop-color='${a}'/><stop offset='0.55' stop-color='${mix(a,'#ffffff',0.12)}'/><stop offset='0.85' stop-color='${a}'/><stop offset='1' stop-color='${shade(a,-26)}'/></linearGradient></defs>
  <rect width='500' height='300' fill='url(#bg)'/>` }

// POCHETTE CAFÉ réaliste (fin seal cranté + corps galbé + soufflet) avec étiquette texte
function pouch(p){
  const a=p.accent, ink=lum(a)>168?'#1c1330':'#FFFFFF', soft=lum(a)>168?'#6a5a4a':'rgba(255,255,255,.82)'
  const cx=250, name=esc(p.name), nf=name.length>10?20:(name.length>7?24:30)
  const teeth=[...Array(13)].map((_,i)=>`${190+i*10},44 ${195+i*10},48`).join(' ')
  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 300'>${bg(a)}
    <ellipse cx='250' cy='284' rx='80' ry='10' fill='#000' opacity='0.13'/>
    <!-- fin seal cranté -->
    <rect x='188' y='30' width='124' height='14' rx='2' fill='${shade(a,-30)}'/>
    <polyline points='${teeth}' fill='none' stroke='${shade(a,-44)}' stroke-width='1.4'/>
    <!-- corps galbé de la pochette -->
    <path d='M198 44 C190 44 186 49 185 57 C179 110 179 205 188 252 C190 264 197 270 209 272 L291 272 C303 270 310 264 312 252 C321 205 321 110 315 57 C314 49 310 44 302 44 Z' fill='url(#bag)'/>
    <!-- soufflet bas -->
    <path d='M188 252 C190 264 197 270 209 272 L291 272 C303 270 310 264 312 252 C300 262 280 266 250 266 C220 266 200 262 188 252 Z' fill='${shade(a,-24)}' opacity='0.9'/>
    <!-- brillant satiné -->
    <rect x='196' y='52' width='10' height='208' rx='5' fill='#fff' opacity='0.13'/>
    <!-- ÉTIQUETTE -->
    <text x='250' y='84' text-anchor='middle' font-family='Lilita One' font-size='15' letter-spacing='3' fill='${ink}'>KOGIA</text>
    <circle cx='250' cy='128' r='30' fill='${lum(a)>168?'#ffffff':'rgba(255,255,255,.92)'}'/>
    ${icon(p.icon,a,250,128,2.25)}
    <text x='250' y='${name.length>10?186:189}' text-anchor='middle' font-family='Lilita One' font-size='${nf}' fill='${ink}'>${name}</text>
    <text x='250' y='209' text-anchor='middle' font-family='Noto Sans Tifinagh' font-size='14' fill='${soft}'>${esc(p.tifi||'')}</text>
    <line x1='212' y1='222' x2='288' y2='222' stroke='${ink}' stroke-opacity='0.3' stroke-width='1.3'/>
    <text x='250' y='240' text-anchor='middle' font-family='Inter' font-weight='700' font-size='11' letter-spacing='1.5' fill='${soft}'>${CAT[p.cat]||''} · CAFÉ MOULU · 250 G</text>
  </svg>`
}
function mug(m){
  const a=m.accent
  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 300'>${bg(a)}
    <ellipse cx='250' cy='276' rx='72' ry='10' fill='#000' opacity='0.12'/>
    <path d='M186 120 h128 v62 a64 64 0 0 1 -128 0 z' fill='url(#bag)'/>
    <path d='M314 132 h22 a30 30 0 0 1 0 60 h-13' fill='none' stroke='${a}' stroke-width='14'/>
    <ellipse cx='250' cy='120' rx='64' ry='15' fill='${shade(a,-14)}'/><ellipse cx='250' cy='120' rx='50' ry='10' fill='${shade(a,-36)}'/>
    <circle cx='250' cy='162' r='28' fill='#fff' opacity='0.92'/>${icon(m.icon||'cup',a,250,162,2.05)}
    <text x='250' y='250' text-anchor='middle' font-family='Lilita One' font-size='20' fill='#1c1330'>${esc(m.label||m.name)}</text>
  </svg>`
}
function setv(it){
  const a=it.accent, name=esc(it.label||it.name), nf=name.length>15?15:18
  return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 500 300'>${bg(a)}
    <ellipse cx='250' cy='268' rx='80' ry='10' fill='#000' opacity='0.10'/>
    <rect x='160' y='66' width='180' height='150' rx='20' fill='url(#bag)'/>
    <rect x='174' y='80' width='152' height='100' rx='13' fill='#fff' opacity='0.95'/>
    <circle cx='250' cy='124' r='32' fill='none' stroke='${a}' stroke-width='2'/>${icon(it.icon||'gift',a,250,124,2.3)}
    <text x='250' y='168' text-anchor='middle' font-family='Lilita One' font-size='13' letter-spacing='2' fill='${a}'>KOGIA</text>
    <text x='250' y='204' text-anchor='middle' font-family='Lilita One' font-size='${nf}' fill='#fff'>${name}</text>
  </svg>`
}

// — données minimales (id, nom, accent, icône, cat, tifinagh) —
const COFFEES=[
 ['tamurt','Tamurt','#B5673A','coffee','corse','ⵜⴰⵎⵓⵔⵜ'],['idurar','Idurar','#8C5A33','droplet','doux','ⵉⴷⵓⵔⴰⵔ'],['tmar','Tmar','#A66A38','cookie','doux','ⵜⵎⴰⵔ'],
 ['azul','Azul','#E0A878','citrus','floral','ⴰⵣⵓⵍ'],['tanit','Tanit','#D9A441','crown','floral','ⵜⵏⵜ'],['ward','Ward','#D26A86','flower','floral','ⵡⴰⵔⴷ'],
 ['zhar','Café Blanc','#C9A86A','flower','floral','ⵣⵀⴰⵔ'],['ifri','Ifri','#5A3A22','flame','corse','ⵉⴼⵔⵉ'],['tafukt','Tafukt','#C0533A','sun','corse','ⵜⴰⴼⵓⴽⵜ'],
 ['skinjbir','Skinjbir','#C77D3A','sprout','digestif','ⵙⴽⵏⵊⴱⵉⵔ'],['lhend','Café du Soir','#7A5C3A','droplet','leger','ⵉⴹ'],
]
const MUGS=[['mug-baleine','Mug Kogia « Baleine »','#3E6B7C','cup','Baleine'],['mug-espresso','Tasse Espresso Kogia','#2A211B','coffee','Espresso'],['mug-emaille','Mug Émaillé Artisanal','#B5673A','cup','Émaillé'],['mug-duo','Duo Mugs Kogia','#6F8C3A','cup','Duo']]
const ACC=[['dallah','Dallah Artisanale','#B98B4E','coffee','Dallah'],['finjan','Finjans — lot de 6','#C0533A','cup','Finjans ×6'],['plateau','Plateau Olivier','#7A7A45','tray','Plateau'],['cuilleres','Cuillères Olivier','#8C8C5A','utensils','Cuillères'],['cezve','Zazwa en Cuivre','#9C6B3A','coffee','Zazwa'],['coffret-kogia','Coffret Découverte','#3E6B7C','gift','Coffret']]

function render(svg, file){
  const r=new Resvg(svg,{ fitTo:{mode:'width',value:600}, font:{ fontFiles:FONTS, loadSystemFonts:true, defaultFontFamily:'Inter' } })
  fs.writeFileSync(OUT+file, r.render().asPng())
}
let n=0
for(const [id,name,accent,ic,cat,tifi] of COFFEES){ render(pouch({name,accent,icon:ic,cat,tifi}), id+'.png'); n++ }
for(const [id,name,accent,ic,label] of MUGS){ render(mug({name,accent,icon:ic,label}), id+'.png'); n++ }
for(const [id,name,accent,ic,label] of ACC){ render(setv({name,accent,icon:ic,label}), id+'.png'); n++ }
console.log('rendered', n, 'PNG packs to', OUT)
