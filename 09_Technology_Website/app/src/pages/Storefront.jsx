import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Plus, Minus, X, Music2, Pause, Star, Coffee, Sparkles, Leaf, ArrowRight, MapPin } from 'lucide-react'
import { PRODUCTS, PHOTOS, TESTIMONIALS, CURRENCY } from '../data.js'
import { toggleAudio } from '../audio.js'

const SIZES = ['250g', '500g', '1kg']
const rise = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: .6, ease: [.2,.7,.2,1] } } }
const Reveal = ({ children, className = '', delay = 0 }) => (
  <motion.div className={className} variants={rise} initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }} transition={{ delay }}>{children}</motion.div>
)
const scrollTo = (id) => (e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

function Meter({ data }) {
  return (
    <div className="flex flex-col gap-1.5 my-1.5">
      {Object.entries(data).map(([k, v]) => (
        <div key={k} className="flex items-center gap-2 text-[11px] text-mute">
          <span className="w-14">{k}</span>
          <span className="flex gap-[3px]">
            {[1,2,3,4,5].map(i => <i key={i} className="w-[15px] h-[7px] rounded-[2px]" style={{ background: i <= v ? 'var(--color-caramel)' : 'rgba(44,32,24,.12)' }} />)}
          </span>
        </div>
      ))}
    </div>
  )
}

function ProductCard({ p, onAdd }) {
  const [size, setSize] = useState('250g')
  return (
    <Reveal className="group flex flex-col rounded-3xl bg-foam border border-latte/70 overflow-hidden shadow-[0_10px_30px_-18px_rgba(70,46,28,.3)] hover:shadow-[0_22px_50px_-22px_rgba(70,46,28,.4)] hover:-translate-y-2 transition-all duration-300">
      <div className="relative aspect-square overflow-hidden">
        <img src={p.img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <span className="absolute top-3 left-3 text-[11px] font-semibold px-3 py-1 rounded-full backdrop-blur" style={{ background: p.premium ? 'var(--color-gold)' : 'rgba(255,255,255,.88)', color: p.premium ? '#fff' : 'var(--color-espresso)' }}>
          {p.bestseller ? '★ Bestseller' : p.tag}
        </span>
      </div>
      <div className="p-5 flex flex-col gap-1 flex-1">
        <div className="font-ar text-caramel text-xl leading-none mb-0.5">{p.arabic}</div>
        <h3 className="font-serif text-[1.55rem] leading-tight">{p.name}</h3>
        <div className="text-sm text-mute">{p.profile} · {p.roast}</div>
        <Meter data={p.meter} />
        <div className="flex gap-1.5 mt-1">
          {SIZES.map(s => (
            <button key={s} onClick={() => setSize(s)} className={`flex-1 rounded-xl py-1.5 text-xs font-semibold border transition ${size===s ? 'bg-espresso text-cream border-espresso' : 'border-latte text-mute hover:border-caramel'}`}>{s}</button>
          ))}
        </div>
        <div className="mt-auto pt-3 flex items-center justify-between">
          <div className="font-serif text-2xl font-bold">{p.prices[size]} <span className="text-xs font-sans text-mute">{CURRENCY}</span></div>
          <button onClick={() => onAdd(p, size)} className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-semibold text-sm text-white bg-gradient-to-br from-caramel to-caramel-dark hover:shadow-lg hover:-translate-y-0.5 transition"><Plus size={16}/> Add</button>
        </div>
      </div>
    </Reveal>
  )
}

function MusicPlayer() {
  const [on, setOn] = useState(false)
  return (
    <button onClick={() => setOn(toggleAudio())} className="fixed left-5 bottom-5 z-40 flex items-center gap-3 pl-2 pr-4 py-2 rounded-full bg-foam/90 backdrop-blur border border-latte shadow-[0_18px_50px_-22px_rgba(70,46,28,.5)] hover:border-caramel transition">
      <span className={`w-10 h-10 rounded-full grid place-items-center text-white bg-gradient-to-br from-caramel to-caramel-dark ${on ? 'spin' : ''}`}>{on ? <Pause size={18}/> : <Music2 size={18}/>}</span>
      <span className="text-left"><b className="block text-[13px] leading-none">{on ? 'Now playing' : 'Play café music'}</b><span className="text-[11px] text-mute">oud · café ambiance</span></span>
      <span className="flex items-end gap-[2px] h-4 ml-1">{[0,1,2,3].map(i => <i key={i} className={`w-[3px] rounded-full bg-caramel ${on ? 'eqbar' : ''}`} style={{ height: 4, animationDelay: `${i*.15}s` }} />)}</span>
    </button>
  )
}

export default function Storefront() {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('kogia_cart') || '[]'))
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState('')
  useEffect(() => { localStorage.setItem('kogia_cart', JSON.stringify(cart)) }, [cart])
  const showToast = (m) => { setToast(m); clearTimeout(window.__t); window.__t = setTimeout(() => setToast(''), 2200) }
  const add = (p, size) => {
    const key = `${p.id}_${size}`
    setCart(c => { const ex = c.find(i => i.key === key); return ex ? c.map(i => i.key===key ? {...i, qty:i.qty+1} : i) : [...c, { key, id:p.id, size, name:p.name, price:p.prices[size], img:p.img, qty:1 }] })
    showToast(`Added ${p.name} (${size})`)
  }
  const chg = (key, d) => setCart(c => c.map(i => i.key===key ? {...i, qty:i.qty+d} : i).filter(i => i.qty>0))
  const count = cart.reduce((s,i) => s+i.qty, 0)
  const total = cart.reduce((s,i) => s+i.price*i.qty, 0)
  const checkout = () => { if (!count) return showToast('Your bag is empty'); showToast(`Order placed — ${total} ${CURRENCY}. Shukran! 🤎`); setCart([]); setOpen(false) }

  const nav = [['Blends','blends'],['The Shop','shop'],['Our Promise','promise'],['Reviews','love']]

  return (
    <div className="bg-ambient min-h-screen">
      <header className="sticky top-0 z-30 backdrop-blur bg-cream/80 border-b border-latte/70">
        <div className="mx-auto w-[92vw] max-w-[1180px] flex items-center justify-between py-3.5">
          <a href="#" onClick={(e)=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'})}} className="flex items-center gap-2 font-serif text-2xl font-extrabold">
            <span className="w-9 h-9 rounded-full grid place-items-center text-white bg-gradient-to-br from-caramel to-caramel-dark font-ar">ك</span>Kogia<span className="text-caramel">.</span>
          </a>
          <nav className="hidden md:flex gap-7 text-sm text-mute font-medium">
            {nav.map(([t,id]) => <a key={id} href={'#'+id} onClick={scrollTo(id)} className="hover:text-caramel transition">{t}</a>)}
            <Link to="/owner" className="hover:text-caramel transition">Owner</Link>
          </nav>
          <button onClick={() => setOpen(true)} className="relative inline-flex items-center gap-2 rounded-full px-4 py-2 font-semibold text-sm bg-foam border border-latte hover:border-caramel transition">
            <ShoppingBag size={16}/> Cart
            {count > 0 && <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 grid place-items-center rounded-full text-[11px] font-bold text-white bg-caramel">{count}</span>}
          </button>
        </div>
      </header>

      <section className="mx-auto w-[92vw] max-w-[1180px] grid md:grid-cols-2 gap-10 items-center py-16 md:py-24">
        <Reveal>
          <div className="text-[11px] font-bold tracking-[.28em] uppercase text-caramel flex items-center gap-2"><MapPin size={13}/> Djerba · Tunisia</div>
          <h1 className="text-5xl md:text-7xl mt-4 mb-5">Roasted traditions,<br/><span className="italic text-caramel">ground fresh.</span></h1>
          <p className="text-lg text-coffee/80 max-w-[46ch]">Six authentic spiced coffee blends — sold as powder, by the bag. Taste them at our corner, then take your favourite home.</p>
          <div className="flex gap-3 mt-8 flex-wrap">
            <a href="#blends" onClick={scrollTo('blends')} className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white bg-gradient-to-br from-caramel to-caramel-dark hover:-translate-y-0.5 hover:shadow-lg transition">Shop the blends <ArrowRight size={17}/></a>
            <a href="#shop" onClick={scrollTo('shop')} className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold bg-foam border border-latte hover:border-caramel transition">Visit the shop</a>
          </div>
          <div className="flex gap-9 mt-10">
            {[['6','blends'],['100%','listed grams'],['15 DT','from / bag']].map(([a,b]) => <div key={b}><b className="font-serif text-3xl block">{a}</b><span className="text-xs uppercase tracking-wide text-mute">{b}</span></div>)}
          </div>
        </Reveal>
        <Reveal delay={.1}>
          <div className="relative rounded-[28px] overflow-hidden shadow-[0_30px_70px_-30px_rgba(70,46,28,.5)] aspect-[4/5]">
            <img src={PHOTOS.hero} alt="Kogia coffee" className="w-full h-full object-cover"/>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center px-4 py-3 rounded-2xl bg-foam/85 backdrop-blur border border-white/60">
              <div><b className="font-serif">Djerbi Signature</b><div className="text-xs text-mute">aromatic · house blend</div></div>
              <div className="text-right"><b className="font-serif text-gold">★</b><div className="text-xs text-mute">bestseller</div></div>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="border-y border-latte/70 bg-sand/60 overflow-hidden">
        <div className="marquee flex gap-12 py-3.5 whitespace-nowrap w-max text-sm text-coffee/80">
          {[...Array(2)].map((_,k) => (
            <div key={k} className="flex gap-12">
              <span className="flex items-center gap-2"><Coffee size={16} className="text-caramel"/> Roasted &amp; ground in Djerba</span>
              <span className="flex items-center gap-2"><Sparkles size={16} className="text-caramel"/> Every gram listed</span>
              <span className="flex items-center gap-2"><Coffee size={16} className="text-caramel"/> Insert a coin, taste a tradition</span>
              <span className="flex items-center gap-2"><Leaf size={16} className="text-caramel"/> No sugar, no secrets</span>
            </div>
          ))}
        </div>
      </div>

      <section id="blends" className="mx-auto w-[92vw] max-w-[1180px] py-20 scroll-mt-20">
        <Reveal className="text-center max-w-[60ch] mx-auto mb-12">
          <div className="text-[11px] font-bold tracking-[.24em] uppercase text-caramel">The Menu</div>
          <h2 className="text-4xl md:text-5xl mt-2">Find your blend</h2>
          <p className="text-coffee/70 mt-3">From light &amp; floral to bold &amp; zesty. Pick a size — each bag shows its taste profile, just like on the shelf.</p>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{PRODUCTS.map(p => <ProductCard key={p.id} p={p} onAdd={add}/>)}</div>
      </section>

      <section id="shop" className="bg-sand/50 border-y border-latte/70 py-20 scroll-mt-16">
        <div className="mx-auto w-[92vw] max-w-[1180px]">
          <Reveal className="text-center max-w-[60ch] mx-auto mb-10">
            <div className="text-[11px] font-bold tracking-[.24em] uppercase text-caramel">The Shop</div>
            <h2 className="text-4xl md:text-5xl mt-2">Taste before you take it home</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {[{ic:<Coffee/>,n:'01',t:'The coin machine',d:'Insert a coin, get a fresh cup of a rotating house blend. The easiest way to try a tradition.'},
              {ic:<Sparkles/>,n:'02',t:'The tasting corner',d:'Sit at the zellige bar, tell us how you like your coffee, and we pour the blend that fits you.'},
              {ic:<ShoppingBag/>,n:'03',t:'Take the bag',d:'Loved it? The matching bag is right there — 250 g, 500 g or 1 kg, sealed fresh.'}].map((c,i) => (
              <Reveal key={i} delay={i*.08} className="rounded-3xl bg-foam border border-latte/70 p-8 hover:-translate-y-1.5 transition shadow-[0_10px_30px_-20px_rgba(70,46,28,.3)]">
                <div className="w-14 h-14 rounded-2xl grid place-items-center bg-caramel/12 text-caramel mb-4">{c.ic}</div>
                <div className="font-serif text-caramel/70 text-sm">{c.n}</div>
                <h3 className="text-2xl mb-1">{c.t}</h3>
                <p className="text-coffee/70 text-[15px]">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="promise" className="mx-auto w-[92vw] max-w-[1180px] py-20 grid md:grid-cols-2 gap-10 items-center scroll-mt-16">
        <Reveal>
          <div className="text-[11px] font-bold tracking-[.24em] uppercase text-caramel">Our Promise</div>
          <h2 className="text-4xl md:text-5xl mt-2 mb-4">No secrets.<br/>Just grams.</h2>
          <p className="text-coffee/75">We don't sell mystique — we sell craft. Every blend lists exactly what's inside, down to the grams of cardamom and barley. Premium beans, roasted with discipline, then ground fresh and sealed with a one-way valve to lock the aroma.</p>
          <a href="#blends" onClick={scrollTo('blends')} className="inline-flex items-center gap-2 rounded-full px-6 py-3 mt-6 font-semibold text-white bg-gradient-to-br from-caramel to-caramel-dark hover:-translate-y-0.5 transition">Browse blends <ArrowRight size={17}/></a>
        </Reveal>
        <Reveal delay={.1}><div className="rounded-[24px] overflow-hidden aspect-[4/3] shadow-[0_30px_70px_-30px_rgba(70,46,28,.5)]"><img src={PHOTOS.beans} alt="Coffee beans" className="w-full h-full object-cover"/></div></Reveal>
      </section>

      <section id="love" className="bg-sand/50 border-y border-latte/70 py-20 scroll-mt-16">
        <div className="mx-auto w-[92vw] max-w-[1180px]">
          <Reveal className="text-center mb-10">
            <div className="text-[11px] font-bold tracking-[.24em] uppercase text-caramel">Loved in Djerba</div>
            <h2 className="text-4xl md:text-5xl mt-2">From our tasting corner</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t,i) => (
              <Reveal key={i} delay={i*.06} className="rounded-3xl bg-foam border border-latte/70 p-6 flex flex-col">
                <div className="flex gap-0.5 mb-3 text-gold">{[...Array(t.stars)].map((_,j) => <Star key={j} size={15} fill="currentColor"/>)}</div>
                <p className="text-[15px] text-coffee/80 flex-1">“{t.text}”</p>
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-latte/70">
                  <img src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full bg-latte"/>
                  <div><b className="text-sm">{t.name}</b><div className="text-xs text-mute">{t.city}</div></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-espresso text-cream/80 py-14">
        <div className="mx-auto w-[92vw] max-w-[1180px]">
          <div className="flex justify-between gap-8 flex-wrap">
            <div className="max-w-[280px]">
              <h4 className="font-serif text-cream text-lg mb-2">Kogia Coffee</h4>
              <p className="text-sm text-cream/60">Premium traditional coffee powder, roasted &amp; ground in Djerba, Tunisia.</p>
            </div>
            <div><h4 className="font-serif text-cream mb-3">Shop</h4>
              <a href="#blends" onClick={scrollTo('blends')} className="block text-sm text-cream/65 hover:text-gold py-0.5">All blends</a>
              <a href="#shop" onClick={scrollTo('shop')} className="block text-sm text-cream/65 hover:text-gold py-0.5">Visit us</a></div>
            <div><h4 className="font-serif text-cream mb-3">Company</h4>
              <a href="#promise" onClick={scrollTo('promise')} className="block text-sm text-cream/65 hover:text-gold py-0.5">Our promise</a>
              <Link to="/owner" className="block text-sm text-cream/65 hover:text-gold py-0.5">Owner dashboard</Link></div>
            <div><h4 className="font-serif text-cream mb-3">Contact</h4>
              <span className="block text-sm text-cream/65 py-0.5">Djerba, Tunisia</span>
              <span className="block text-sm text-cream/65 py-0.5">@kogiacoffee</span></div>
          </div>
          <div className="border-t border-cream/15 mt-9 pt-5 text-xs text-cream/50 flex justify-between flex-wrap gap-2">
            <span>© 2026 Kogia Coffee — testing build, work in progress.</span><span>Roasted traditions, ground fresh.</span>
          </div>
        </div>
      </footer>

      <div onClick={() => setOpen(false)} className={`fixed inset-0 z-40 bg-espresso/40 backdrop-blur-sm transition ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} />
      <aside className={`fixed top-0 right-0 h-full w-[min(420px,92vw)] z-50 bg-cream border-l border-latte shadow-2xl flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-latte"><h3 className="font-serif text-2xl">Your bag</h3><button onClick={() => setOpen(false)} className="text-mute hover:text-espresso"><X/></button></div>
        <div className="flex-1 overflow-y-auto thin-scroll px-6 py-5 flex flex-col gap-4">
          {cart.length === 0 ? <div className="text-center text-mute mt-12">Your bag is empty.<br/>Go taste a blend ☕</div>
            : cart.map(i => (
              <div key={i.key} className="flex gap-3 items-center">
                <img src={i.img} className="w-14 h-14 rounded-xl object-cover" alt=""/>
                <div className="flex-1"><b className="text-sm">{i.name}</b><div className="text-xs text-mute">{i.size} · {i.price} {CURRENCY}</div>
                  <div className="flex items-center gap-2 mt-1"><button onClick={() => chg(i.key,-1)} className="w-6 h-6 rounded-md border border-latte grid place-items-center"><Minus size={13}/></button><span className="text-sm">{i.qty}</span><button onClick={() => chg(i.key,1)} className="w-6 h-6 rounded-md border border-latte grid place-items-center"><Plus size={13}/></button></div>
                </div>
                <div className="font-serif font-bold text-caramel">{i.price*i.qty} {CURRENCY}</div>
              </div>
            ))}
        </div>
        <div className="border-t border-latte px-6 py-5"><div className="flex justify-between mb-4 text-lg"><span>Total</span><b className="font-serif text-2xl text-caramel">{total} {CURRENCY}</b></div><button onClick={checkout} className="w-full rounded-full py-3 font-semibold text-white bg-gradient-to-br from-caramel to-caramel-dark hover:-translate-y-0.5 transition">Checkout</button></div>
      </aside>

      <MusicPlayer/>
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full bg-espresso text-cream font-semibold text-sm shadow-xl transition-all ${toast ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>{toast}</div>
    </div>
  )
}
