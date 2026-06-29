import { useId } from 'react'
import { Atmosphere } from './atmo.jsx'
// Logo Kogia (queue de baleine) + identité simple par mélange
export function KogiaMark({ size=34, c1="#8C4A2F", c2="#C0743C" }){
  return (<svg viewBox="0 0 68 72" width={size} height={size} aria-hidden="true">
    <defs><linearGradient id="kcm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={c1}/><stop offset="1" stopColor={c2}/></linearGradient></defs>
    <path d="M34 62 C31 52 28 47 22 43 C15 38 10 31 7 22 C18 27 28 33 31 41 L34 46 L37 41 C40 33 50 27 61 22 C58 31 53 38 46 43 C40 47 37 52 34 62 Z" fill="url(#kcm)"/>
  </svg>)
}
// pictos simples par mélange (sur pastille dégradée de la couleur du mélange)
const PICTO={
  cup:<g fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 40 h44 v10 a22 22 0 0 1 -44 0 z"/><path d="M66 42 h8 a9 9 0 0 1 0 18 h-5"/><path d="M30 22 q-5 -7 0 -14"/><path d="M44 22 q5 -7 0 -14"/></g>,
  bean:<g fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round"><ellipse cx="48" cy="48" rx="22" ry="28" transform="rotate(35 48 48)"/><path d="M40 30 q8 18 16 36"/></g>,
  flower:<g fill="#fff"><circle cx="48" cy="48" r="9"/><g><ellipse cx="48" cy="28" rx="7" ry="13"/><ellipse cx="48" cy="68" rx="7" ry="13"/><ellipse cx="28" cy="48" rx="13" ry="7"/><ellipse cx="68" cy="48" rx="13" ry="7"/></g></g>,
  spice:<g fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round"><path d="M48 20 v56"/><path d="M48 30 l-16 -8"/><path d="M48 30 l16 -8"/><path d="M48 48 l-18 -6"/><path d="M48 48 l18 -6"/><path d="M48 64 l-14 -5"/><path d="M48 64 l14 -5"/></g>,
  drop:<g fill="#fff"><path d="M48 22 C60 40 66 50 66 58 a18 18 0 0 1 -36 0 C30 50 36 40 48 22 Z"/></g>,
  flame:<g fill="#fff"><path d="M48 18 C40 34 30 40 30 54 a18 18 0 0 0 36 0 C66 44 60 40 56 32 C54 40 50 40 50 34 C50 28 48 22 48 18 Z"/></g>,
}
export function BlendMark({ p, size=96 }){
  return (<svg viewBox="0 0 96 96" width={size} height={size} aria-label={p.name}>
    <defs><linearGradient id={"bm"+p.id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={p.accent}/><stop offset="1" stopColor={shade(p.accent,-22)}/></linearGradient></defs>
    <rect width="96" height="96" rx="26" fill={"url(#bm"+p.id+")"}/>
    {PICTO[p.icon]||PICTO.cup}
  </svg>)
}
function shade(hex,p){ const n=parseInt(hex.slice(1),16); let r=(n>>16)+p,g=((n>>8)&255)+p,b=(n&255)+p
  r=Math.max(0,Math.min(255,r));g=Math.max(0,Math.min(255,g));b=Math.max(0,Math.min(255,b)); return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1) }
export function ProductImg({ p, size=96, radius=20 }){
  if(p?.img) return <img src={p.img} alt={p?.name||''} loading="lazy" className="object-cover shrink-0" style={{width:size,height:size,borderRadius:radius}}/>
  return <Atmosphere accent={p?.accent||'#B5673A'} icon={p?.icon||'coffee'} size={size} radius={radius}/>
}
// Étoiles de notation (statique, partielle selon la note)
export function Stars({ value=5, size=14 }){
  const full=Math.floor(value), frac=value-full
  // useId garantit des identifiants de dégradé uniques par instance — sinon les
  // étoiles partielles de notes différentes (même taille) entrent en collision (ids SVG globaux).
  const uid=useId().replace(/:/g,'')
  return (<span className="inline-flex items-center" style={{lineHeight:0}} aria-label={value+" sur 5"}>
    {[0,1,2,3,4].map(i=>{
      const fill=i<full?1:(i===full?frac:0)
      const gid=`st${i}_${uid}`
      return (<svg key={i} width={size} height={size} viewBox="0 0 20 20" style={{display:'block'}}>
        <defs><linearGradient id={gid}><stop offset={fill*100+'%'} stopColor="#E8A93B"/><stop offset={fill*100+'%'} stopColor="#E5DCD2"/></linearGradient></defs>
        <path d="M10 1.6l2.47 5.01 5.53.8-4 3.9.94 5.5L10 15.9 5.06 18.3l.94-5.5-4-3.9 5.53-.8z" fill={`url(#${gid})`}/>
      </svg>)
    })}
  </span>)
}
// Niveau d'intensité (grains pleins / vides)
export function Intensity({ value=3, max=5, size=10 }){
  return (<span className="inline-flex items-center gap-0.5" aria-label={`Intensité ${value} sur ${max}`}>
    {Array.from({length:max}).map((_,i)=>(
      <svg key={i} width={size} height={size+3} viewBox="0 0 14 18">
        <ellipse cx="7" cy="9" rx="6" ry="8" fill={i<value?"#6B4226":"#E5DCD2"}/>
        <path d="M4 3 q3 6 6 12" stroke={i<value?"#FBF8F4":"#fff"} strokeWidth="1.4" fill="none" opacity={i<value?.6:.9}/>
      </svg>))}
  </span>)
}
