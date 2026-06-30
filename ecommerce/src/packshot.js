// Visuels Kogia 100% dessinés en SVG (aucune image externe).
// Café = pochette, Mug = tasse, Accessoire = écrin — chacun montre le "logo de goût" (icône).
const clamp=v=>Math.max(0,Math.min(255,Math.round(v)))
const hx=({r,g,b})=>'#'+[r,g,b].map(v=>clamp(v).toString(16).padStart(2,'0')).join('')
const rgb=h=>{const n=parseInt(h.slice(1),16);return{r:(n>>16)&255,g:(n>>8)&255,b:n&255}}
export const shade=(h,d)=>{const c=rgb(h);return hx({r:c.r+d,g:c.g+d,b:c.b+d})}
export const mix=(h,t,k)=>{const a=rgb(h),b=rgb(t);return hx({r:a.r+(b.r-a.r)*k,g:a.g+(b.g-a.g)*k,b:a.b+(b.b-a.b)*k})}
const lum=h=>{const c=rgb(h);return 0.299*c.r+0.587*c.g+0.114*c.b}
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')

// Icônes "logo de goût" — dessinées dans un repère 24×24, couleur = %C%
const ICONS={
  coffee:`<g fill='none' stroke='%C%' stroke-width='2.1' stroke-linecap='round' stroke-linejoin='round'><path d='M5 9h11v5a5.5 5.5 0 0 1-11 0z'/><path d='M16 10h2a2.6 2.6 0 0 1 0 5.2h-1'/><path d='M8 5.5c-1-1 0-2 0-3'/><path d='M12 5.5c-1-1 0-2 0-3'/></g>`,
  flame:`<path fill='%C%' d='M12.5 2c.4 3.4-2.7 4.6-2.7 8.2a3 3 0 0 0 6 0c0-1.5-.8-2.4-1.4-3.4.3 1.7-1.6 1.9-1.6 0 0-1.7-.3-2.9-.3-4.8z'/>`,
  sun:`<g fill='%C%'><circle cx='12' cy='12' r='4.4'/></g><g fill='none' stroke='%C%' stroke-width='2' stroke-linecap='round'><path d='M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7'/></g>`,
  droplet:`<path fill='%C%' d='M12 3c2.3 4 5.2 6.4 5.2 9.5a5.2 5.2 0 0 1-10.4 0C6.8 9.4 9.7 7 12 3z'/>`,
  flower:`<g fill='%C%'><circle cx='12' cy='12' r='2.7'/><ellipse cx='12' cy='6.3' rx='2.3' ry='3.6'/><ellipse cx='12' cy='17.7' rx='2.3' ry='3.6'/><ellipse cx='6.3' cy='12' rx='3.6' ry='2.3'/><ellipse cx='17.7' cy='12' rx='3.6' ry='2.3'/></g>`,
  citrus:`<g fill='none' stroke='%C%' stroke-width='2'><circle cx='12' cy='12' r='8.2'/><path d='M12 4v16M4 12h16M6.3 6.3l11.4 11.4M17.7 6.3L6.3 17.7'/></g>`,
  sprout:`<g fill='none' stroke='%C%' stroke-width='2.1' stroke-linecap='round' stroke-linejoin='round'><path d='M12 20v-7'/><path d='M12 13c0-3.4-3-4.6-5.5-4.4C6.7 11.8 9 13.4 12 13z'/><path d='M12 14.5c0-2.6 2.4-3.7 4.6-3.5C16.4 13.4 14.5 14.7 12 14.5z'/></g>`,
  crown:`<path fill='%C%' d='M3.5 8.5l3.4 7.5h10.2l3.4-7.5-4.6 3.4L12 5.5 8.1 11.9z'/>`,
  cookie:`<g fill='%C%'><circle cx='12' cy='12' r='8.2' fill='none' stroke='%C%' stroke-width='2'/><circle cx='10' cy='9.5' r='1.2'/><circle cx='15' cy='11' r='1.2'/><circle cx='11' cy='15' r='1.2'/><circle cx='15.5' cy='15' r='1'/></g>`,
  candy:`<g fill='none' stroke='%C%' stroke-width='2' stroke-linejoin='round'><circle cx='12' cy='12' r='4.5'/><path d='M7.5 12L3 9.5v5zM16.5 12L21 9.5v5z'/></g>`,
  icecream:`<g fill='%C%'><path d='M8.5 11h7l-3.5 9z'/><path d='M12 3a4.5 4.5 0 0 1 4.5 4.5c0 1-3 1.5-4.5 1.5s-4.5-.5-4.5-1.5A4.5 4.5 0 0 1 12 3z'/></g>`,
  // accessoires
  cup:`<g fill='none' stroke='%C%' stroke-width='2.1' stroke-linecap='round' stroke-linejoin='round'><path d='M6 9h10v4.5a5 5 0 0 1-10 0z'/><path d='M16 10h1.8a2.4 2.4 0 0 1 0 4.8H16'/></g>`,
  tray:`<g fill='none' stroke='%C%' stroke-width='2.1' stroke-linecap='round' stroke-linejoin='round'><rect x='3.5' y='8' width='17' height='8' rx='2.5'/><path d='M2 17.5h20'/></g>`,
  utensils:`<g fill='none' stroke='%C%' stroke-width='2.1' stroke-linecap='round' stroke-linejoin='round'><path d='M9 3v8a2 2 0 0 1-4 0V3M7 11v10'/><path d='M16 3c-2 0-3 2-3 5s1 4 3 4 3-1 3-4-1-5-3-5zM16 12v9'/></g>`,
  gift:`<g fill='none' stroke='%C%' stroke-width='2.1' stroke-linejoin='round'><rect x='4' y='9' width='16' height='11' rx='1.5'/><path d='M4 13h16M12 9v11'/><path d='M12 9c-1-3-5-3-5-.5 0 1.5 3 .5 5 .5zM12 9c1-3 5-3 5-.5 0 1.5-3 .5-5 .5z'/></g>`,
}
const iconSVG=(key,color)=>(ICONS[key]||ICONS.coffee).replaceAll('%C%',color)
const enc=svg=>'data:image/svg+xml,'+encodeURIComponent(svg.replace(/\s+/g,' ').trim())
const CATLABEL={doux:'DOUX',floral:'FLORAL',corse:'CORSÉ',digestif:'DIGESTIF',leger:'LÉGER'}

// ÉCRIN commun : fond clair teinté + ombre + halo
const stage=(a,inner)=>`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' font-family='Helvetica,Arial,sans-serif'>
  <rect width='400' height='300' fill='${mix(a,'#ffffff',0.9)}'/>
  <ellipse cx='200' cy='24' rx='260' ry='84' fill='#ffffff' opacity='0.6'/>
  <ellipse cx='200' cy='270' rx='88' ry='13' fill='${shade(a,-70)}' opacity='0.18'/>${inner}</svg>`

// CAFÉ — pochette avec médaillon "logo de goût"
export function packshot(p){
  const a=p.accent, ink=lum(a)>165?'#2A211B':'#FFFFFF'
  const soft=lum(a)>165?'rgba(42,33,27,.55)':'rgba(255,255,255,.78)'
  const name=esc(p.name), nf=name.length>10?13.5:(name.length>7?16:20)
  const cat=CATLABEL[p.cat]||''
  const inner=`
    <rect x='150' y='50' width='100' height='13' rx='4' fill='${shade(a,-46)}'/>
    <rect x='150' y='59' width='100' height='202' rx='15' fill='${a}'/>
    <rect x='150' y='234' width='100' height='27' rx='15' fill='${shade(a,-22)}'/>
    <rect x='153' y='72' width='7' height='176' rx='3.5' fill='#ffffff' opacity='0.12'/>
    <text x='200' y='82' text-anchor='middle' font-size='9.5' font-weight='700' letter-spacing='3.5' fill='${soft}'>KOGIA</text>
    <circle cx='200' cy='108' r='19' fill='${ink}' opacity='${lum(a)>165?'0.08':'0.16'}'/>
    <circle cx='200' cy='108' r='17' fill='none' stroke='${ink}' stroke-width='1.3' opacity='0.7'/>
    <g transform='translate(200 108) scale(1.15) translate(-12 -12)'>${iconSVG(p.icon,ink)}</g>
    <text x='200' y='${name.length>10?156:158}' text-anchor='middle' font-family='Georgia,serif' font-weight='700' font-size='${nf}' fill='${ink}'>${name}</text>
    <line x1='170' y1='170' x2='230' y2='170' stroke='${ink}' stroke-opacity='0.28' stroke-width='1.3'/>
    <text x='200' y='187' text-anchor='middle' font-size='8.5' font-weight='700' letter-spacing='2.5' fill='${soft}'>${cat}</text>
    <text x='200' y='210' text-anchor='middle' font-size='10' font-weight='700' fill='${ink}'>CAFÉ MOULU · 250 G</text>`
  return enc(stage(a,inner))
}

// MUG — tasse dessinée
export function mugshot(m){
  const a=m.accent, ink=lum(a)>165?'#2A211B':'#FFFFFF'
  const inner=`
    <path d='M120 120 h120 v55 a60 60 0 0 1 -120 0 z' fill='${a}'/>
    <path d='M240 130 h22 a30 30 0 0 1 0 60 h-12' fill='none' stroke='${a}' stroke-width='14'/>
    <ellipse cx='180' cy='120' rx='60' ry='15' fill='${shade(a,-18)}'/>
    <ellipse cx='180' cy='120' rx='48' ry='10' fill='${shade(a,-40)}'/>
    <circle cx='180' cy='158' r='22' fill='none' stroke='${ink}' stroke-width='1.4' opacity='0.7'/>
    <g transform='translate(180 158) scale(1.5) translate(-12 -12)'>${iconSVG(m.icon||'cup',ink)}</g>
    <text x='180' y='250' text-anchor='middle' font-family='Georgia,serif' font-weight='700' font-size='17' fill='#2A211B'>${esc(m.name.replace('Mug ','').replace('Kogia','Kogia'))}</text>`
  return enc(stage(a,inner))
}

// ACCESSOIRE — médaillon dans un écrin
export function setshot(it){
  const a=it.accent
  const name=esc(it.name), nf=name.length>16?13:15
  const inner=`
    <rect x='118' y='78' width='164' height='150' rx='18' fill='${a}'/>
    <rect x='118' y='78' width='164' height='150' rx='18' fill='none' stroke='${shade(a,-30)}' stroke-width='2'/>
    <rect x='130' y='90' width='140' height='100' rx='12' fill='#FBF7F1'/>
    <circle cx='200' cy='130' r='30' fill='none' stroke='${a}' stroke-width='1.6'/>
    <g transform='translate(200 130) scale(2) translate(-12 -12)'>${iconSVG(it.icon||'gift',a)}</g>
    <text x='200' y='176' text-anchor='middle' font-family='Arial' font-size='8.5' font-weight='700' letter-spacing='3' fill='${a}'>KOGIA</text>
    <text x='200' y='216' text-anchor='middle' font-family='Georgia,serif' font-weight='700' font-size='${nf}' fill='#ffffff'>${name}</text>`
  return enc(stage(a,inner))
}
