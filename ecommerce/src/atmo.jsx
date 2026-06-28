import { Coffee, Leaf, Crown, Flame, Droplet, Sun, Flower2, Citrus, Sprout, Cookie, Candy, IceCream, CupSoda, Utensils, UtensilsCrossed, Gift, Sparkles } from 'lucide-react'

const ICONS = {
  coffee: Coffee, leaf: Leaf, crown: Crown, flame: Flame, droplet: Droplet, sun: Sun,
  flower: Flower2, citrus: Citrus, sprout: Sprout, cookie: Cookie, candy: Candy, icecream: IceCream,
  cup: CupSoda, utensils: Utensils, tray: UtensilsCrossed, gift: Gift, sparkles: Sparkles,
}

// Éclaircit une couleur hex vers le blanc (amount 0..1)
export function tint(hex, amount) {
  const n = parseInt(hex.slice(1), 16)
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255
  const m = v => Math.round(v + (255 - v) * amount)
  return `rgb(${m(r)},${m(g)},${m(b)})`
}

// Pastille "atmosphère" : dégradé couleur + médaillon blanc + icône colorée.
// Utilisée partout (vignettes panier, cartes produit) pour une identité cohérente sur fond blanc.
export function Atmosphere({ accent = '#B5673A', icon = 'coffee', size = 96, radius = 20, className = '', style = {} }) {
  const Ic = ICONS[icon] || Coffee
  const inner = Math.round(size * 0.6)
  return (
    <div className={`relative grid place-items-center shrink-0 ${className}`}
      style={{ width: size, height: size, borderRadius: radius, background: `linear-gradient(145deg, ${tint(accent, 0.55)}, ${accent})`, ...style }}>
      <div className="grid place-items-center rounded-full bg-white/90 shadow-sm" style={{ width: inner, height: inner }}>
        <Ic size={Math.round(inner * 0.54)} strokeWidth={1.6} color={accent} />
      </div>
    </div>
  )
}

// Entête de carte (large), avec le nom arabe en filigrane + grande icône.
export function CardArt({ accent = '#B5673A', icon = 'coffee', ar = '', className = '', children }) {
  const Ic = ICONS[icon] || Coffee
  return (
    <div className={`relative overflow-hidden grid place-items-center ${className}`}
      style={{ background: `linear-gradient(145deg, ${tint(accent, 0.62)}, ${accent})` }}>
      {ar && <span className="absolute inset-0 grid place-items-center serif font-bold pointer-events-none select-none"
        style={{ fontSize: '5.5rem', color: '#ffffff', opacity: 0.16, lineHeight: 1 }}>{ar}</span>}
      <div className="relative grid place-items-center rounded-full bg-white/90 shadow-md" style={{ width: 86, height: 86 }}>
        <Ic size={42} strokeWidth={1.5} color={accent} />
      </div>
      {children}
    </div>
  )
}
