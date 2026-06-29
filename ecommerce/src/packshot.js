// Packshots Kogia — emballages dessinés à la main (SVG), aucun visuel externe.
// Pochette de café moderne : couleur du mélange + typographie blanche/sombre selon le contraste.
const clamp=v=>Math.max(0,Math.min(255,Math.round(v)))
const hx=({r,g,b})=>'#'+[r,g,b].map(v=>clamp(v).toString(16).padStart(2,'0')).join('')
const rgb=h=>{const n=parseInt(h.slice(1),16);return{r:(n>>16)&255,g:(n>>8)&255,b:n&255}}
export const shade=(h,d)=>{const c=rgb(h);return hx({r:c.r+d,g:c.g+d,b:c.b+d})}
export const mix=(h,t,k)=>{const a=rgb(h),b=rgb(t);return hx({r:a.r+(b.r-a.r)*k,g:a.g+(b.g-a.g)*k,b:a.b+(b.b-a.b)*k})}
const lum=h=>{const c=rgb(h);return 0.299*c.r+0.587*c.g+0.114*c.b}
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')

export function packshot(p){
  const a=p.accent
  const bg=mix(a,'#ffffff',0.9)
  const ink=lum(a)>165?'#2A211B':'#FFFFFF'      // texte sombre sur sachet clair, blanc sinon
  const soft=lum(a)>165?'rgba(42,33,27,0.55)':'rgba(255,255,255,0.75)'
  const rule=lum(a)>165?'rgba(42,33,27,0.25)':'rgba(255,255,255,0.4)'
  const name=esc(p.name)
  const nf=name.length>10?14:(name.length>7?17:21)
  const svg=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' font-family='Helvetica,Arial,sans-serif'>
    <rect width='400' height='300' fill='${bg}'/>
    <ellipse cx='200' cy='26' rx='260' ry='86' fill='#ffffff' opacity='0.6'/>
    <ellipse cx='200' cy='268' rx='86' ry='13' fill='${shade(a,-70)}' opacity='0.18'/>
    <rect x='150' y='52' width='100' height='13' rx='4' fill='${shade(a,-46)}'/>
    <rect x='150' y='61' width='100' height='200' rx='14' fill='${a}'/>
    <rect x='150' y='234' width='100' height='27' rx='14' fill='${shade(a,-22)}'/>
    <rect x='153' y='74' width='7' height='172' rx='3.5' fill='#ffffff' opacity='0.13'/>
    <rect x='240' y='74' width='5' height='172' rx='2.5' fill='#000000' opacity='0.08'/>
    <text x='200' y='98' text-anchor='middle' font-size='11' font-weight='700' letter-spacing='4' fill='${soft}'>KOGIA</text>
    <path d='M200 116 c-3 -4 -8 -4 -11 0 c-4 5 -9 8 -16 10 c7 2 12 4 16 9 c3 4 8 4 11 0 c4 -5 9 -7 16 -9 c-7 -2 -12 -5 -16 -10 z' fill='${ink}' opacity='0.92'/>
    <text x='200' y='${name.length>10?165:168}' text-anchor='middle' font-family='Georgia,serif' font-weight='700' font-size='${nf}' fill='${ink}'>${name}</text>
    <line x1='168' y1='182' x2='232' y2='182' stroke='${rule}' stroke-width='1.5'/>
    <text x='200' y='200' text-anchor='middle' font-size='9' font-weight='700' letter-spacing='2' fill='${soft}'>CAFÉ MOULU</text>
    <text x='200' y='224' text-anchor='middle' font-size='10' font-weight='700' fill='${ink}'>250 G</text>
  </svg>`
  return 'data:image/svg+xml,'+encodeURIComponent(svg.replace(/\s+/g,' ').trim())
}
