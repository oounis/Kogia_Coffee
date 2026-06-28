// Illustrations vectorielles maison (SVG) pour chaque mélange — libres de droits,
// nettes à toute taille, ~1 Ko (vs ~600 Ko en photo). Couleur dérivée du mélange.

export function shade(hex, p) {
  const n = parseInt(hex.slice(1), 16)
  let r = (n >> 16) + p, g = ((n >> 8) & 255) + p, b = (n & 255) + p
  r = Math.max(0, Math.min(255, r)); g = Math.max(0, Math.min(255, g)); b = Math.max(0, Math.min(255, b))
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

// Pictos par mélange, dessinés dans un repère 96×96 (centre ~48,48), couleur = ACCENT.
const ICONS = {
  cup: `<g fill='none' stroke='ACCENT' stroke-width='5' stroke-linecap='round' stroke-linejoin='round'><path d='M22 40 h44 v10 a22 22 0 0 1 -44 0 z'/><path d='M66 42 h8 a9 9 0 0 1 0 18 h-5'/><path d='M30 22 q-5 -7 0 -14'/><path d='M44 22 q5 -7 0 -14'/></g>`,
  bean: `<g fill='none' stroke='ACCENT' stroke-width='5' stroke-linecap='round'><ellipse cx='48' cy='48' rx='22' ry='28' transform='rotate(35 48 48)'/><path d='M40 30 q8 18 16 36'/></g>`,
  flower: `<g fill='ACCENT'><circle cx='48' cy='48' r='9'/><ellipse cx='48' cy='28' rx='7' ry='13'/><ellipse cx='48' cy='68' rx='7' ry='13'/><ellipse cx='28' cy='48' rx='13' ry='7'/><ellipse cx='68' cy='48' rx='13' ry='7'/></g>`,
  spice: `<g fill='none' stroke='ACCENT' stroke-width='5' stroke-linecap='round'><path d='M48 20 v56'/><path d='M48 30 l-16 -8'/><path d='M48 30 l16 -8'/><path d='M48 48 l-18 -6'/><path d='M48 48 l18 -6'/><path d='M48 64 l-14 -5'/><path d='M48 64 l14 -5'/></g>`,
  drop: `<path fill='ACCENT' d='M48 22 C60 40 66 50 66 58 a18 18 0 0 1 -36 0 C30 50 36 40 48 22 Z'/>`,
  flame: `<path fill='ACCENT' d='M48 18 C40 34 30 40 30 54 a18 18 0 0 0 36 0 C66 44 60 40 56 32 C54 40 50 40 50 34 C50 28 48 22 48 18 Z'/>`,
}
const icon = (key, color) => (ICONS[key] || ICONS.cup).replaceAll('ACCENT', color)

const enc = svg => 'data:image/svg+xml,' + encodeURIComponent(svg.replace(/\s+/g, ' ').trim())
// Échappe les caractères réservés XML dans le texte injecté (ex. profils "Léger & floral").
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Sachet de café centré sur fond dégradé (couleur du mélange). Composition pensée pour
// rester lisible même rognée en 5:3 (carte produit) ou en carré (panier).
export function coffeeBagSVG(p) {
  const a = p.accent, d = shade(a, -34)
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
    <defs><linearGradient id='bg' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${d}'/></linearGradient></defs>
    <rect width='100' height='100' fill='url(#bg)'/>
    <ellipse cx='50' cy='16' rx='62' ry='34' fill='#ffffff' opacity='0.10'/>
    <g stroke='#ffffff' stroke-width='2.3' stroke-linecap='round' fill='none' opacity='0.45'>
      <path d='M41 15 q-4 -6 0 -12'/><path d='M50 13 q-4 -6 0 -12'/><path d='M59 15 q-4 -6 0 -12'/>
    </g>
    <rect x='32' y='24' width='36' height='56' rx='7' fill='#241C16'/>
    <rect x='32' y='17' width='36' height='9' rx='3' fill='#15100C'/>
    <rect x='36.5' y='29' width='5' height='48' rx='2.5' fill='#ffffff' opacity='0.06'/>
    <circle cx='50' cy='54' r='15' fill='#F6EAE0'/>
    <g transform='translate(50 54) scale(0.30) translate(-48 -48)'>${icon(p.icon, a)}</g>
  </svg>`
  return enc(svg)
}

// Étiquette portrait pour la vitrine "Notre packaging".
export function labelSVG(p) {
  const a = p.accent, d = shade(a, -28)
  const dots = Array.from({ length: 5 }, (_, i) =>
    `<circle cx='${88 + i * 18}' cy='250' r='5.5' fill='${i < (p.intensity || 3) ? a : '#E5DCD2'}'/>`).join('')
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 300'>
    <rect x='3' y='3' width='214' height='294' rx='20' fill='#FBF6F0' stroke='${shade(a, 60)}' stroke-width='2'/>
    <path d='M3 23 a20 20 0 0 1 20 -20 h174 a20 20 0 0 1 20 20 v74 h-214 z' fill='url(#hd)'/>
    <defs><linearGradient id='hd' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${d}'/></linearGradient></defs>
    <text x='110' y='30' text-anchor='middle' fill='#ffffff' opacity='0.85' font-family='Arial, sans-serif' font-size='11' letter-spacing='3'>KOGIA COFFEE</text>
    <text x='110' y='72' text-anchor='middle' fill='#ffffff' font-family='Georgia, serif' font-size='30' font-weight='700'>${esc(p.ar)}</text>
    <text x='110' y='132' text-anchor='middle' fill='#2A211B' font-family='Georgia, serif' font-size='19' font-weight='700'>${esc(p.name)}</text>
    <text x='110' y='154' text-anchor='middle' fill='#8B7B6E' font-family='Arial, sans-serif' font-size='12' font-style='italic'>${esc(p.profile)}</text>
    <line x1='70' y1='168' x2='150' y2='168' stroke='${shade(a, 50)}' stroke-width='2'/>
    <g transform='translate(110 200) scale(0.52) translate(-48 -48)'>${icon(p.icon, a)}</g>
    <text x='70' y='254' text-anchor='middle' fill='#8B7B6E' font-family='Arial, sans-serif' font-size='11'>Intensité</text>
    ${dots}
    <text x='110' y='285' text-anchor='middle' fill='#8B7B6E' font-family='Arial, sans-serif' font-size='10.5'>Torréfié &amp; moulu à Djerba</text>
  </svg>`
  return enc(svg)
}
