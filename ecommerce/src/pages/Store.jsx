import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Plus, Minus, X, Coffee, Truck, Leaf, ArrowRight, Wallet, ShieldCheck, Search, Sparkles, Star, Repeat, Gift, Quote, Mail, Crown, Check, CupSoda, Hand } from 'lucide-react'
import { PRODUCTS, MUGS, ACCESSORIES, SIZES, CUR, DELIVERY, PROFILS, BUNDLE, GIFTS, SUBSCRIPTION, FEATURED, REVIEWS, productById } from '../data.js'
import { KogiaMark, ProductImg, Stars, Intensity } from '../marks.jsx'
import { loadCart, saveCart, addNewsletter } from '../store.js'
import toast from 'react-hot-toast'

export default function Store(){
  const nav=useNavigate()
  const [cart,setCart]=useState(loadCart); const [open,setOpen]=useState(false); const [toastMsg,setToastMsg]=useState('')
  const [detail,setDetail]=useState(null) // produit ouvert en détail
  const [query,setQuery]=useState(''); const [filter,setFilter]=useState('all')
  useEffect(()=>saveCart(cart),[cart])
  // Liens d'ancrage internes : avec HashRouter, #section casse la route → on intercepte et on défile.
  useEffect(()=>{
    const onClick=e=>{
      const a=e.target.closest('a[href^="#"]'); if(!a) return
      const href=a.getAttribute('href')
      if(href.startsWith('#/')||href==='#') return // routes (#/suivi, #/admin) ou haut de page
      const el=document.getElementById(href.slice(1))
      if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth',block:'start'}) }
    }
    document.addEventListener('click',onClick)
    return ()=>document.removeEventListener('click',onClick)
  },[])
  const note=m=>{setToastMsg(m);clearTimeout(window.__t);window.__t=setTimeout(()=>setToastMsg(''),1800)}
  const add=(p,size,qty=1)=>{const key=`${p.id}_${size}`;setCart(c=>{const e=c.find(i=>i.key===key);return e?c.map(i=>i.key===key?{...i,qty:i.qty+qty}:i):[...c,{key,id:p.id,size,name:p.name,price:p.prices[size],qty,accent:p.accent,icon:p.icon}]});note(`${p.name} (${size}) ajouté ✓`)}
  const addBundle=()=>{const key='bundle_'+BUNDLE.id;setCart(c=>{const e=c.find(i=>i.key===key);return e?c.map(i=>i.key===key?{...i,qty:i.qty+1}:i):[...c,{key,id:BUNDLE.id,bundle:true,size:'Pack',name:BUNDLE.name,price:BUNDLE.price,qty:1,accent:BUNDLE.accent||'#E8962B',icon:'sparkles'}]});note('Pack Découverte ajouté ✓')}
  const addGift=g=>{const key='gift_'+g.id;setCart(c=>{const e=c.find(i=>i.key===key);return e?c.map(i=>i.key===key?{...i,qty:i.qty+1}:i):[...c,{key,id:g.id,gift:true,size:'Coffret',name:g.name,price:g.price,qty:1,accent:g.accent,icon:'gift'}]});note(`${g.name} ajouté ✓`)}
  const addSub=(p,freq)=>{const price=Math.round(p.prices[SUBSCRIPTION.size]*(1-SUBSCRIPTION.discount));const key=`sub_${p.id}_${freq.id}`;setCart(c=>{const e=c.find(i=>i.key===key);return e?c.map(i=>i.key===key?{...i,qty:i.qty+1}:i):[...c,{key,id:p.id,sub:true,freq:freq.id,freqLabel:freq.sub,size:SUBSCRIPTION.size,name:`${p.name} · Abonnement`,price,qty:1,accent:p.accent,icon:p.icon}]});note(`Abonnement ${p.name} ajouté ✓`)}
  const addShop=it=>{const key=`${it.kind}_${it.id}`;setCart(c=>{const e=c.find(i=>i.key===key);return e?c.map(i=>i.key===key?{...i,qty:i.qty+1}:i):[...c,{key,id:it.id,kind:it.kind,size:it.material||(it.kind==='mug'?'Mug':'Pièce'),name:it.name,price:it.price,qty:1,accent:it.accent,icon:it.icon}]});note(`${it.name} ajouté ✓`)}
  const chg=(key,d)=>setCart(c=>c.map(i=>i.key===key?{...i,qty:i.qty+d}:i).filter(i=>i.qty>0))
  const count=cart.reduce((s,i)=>s+i.qty,0), sub=cart.reduce((s,i)=>s+i.price*i.qty,0)
  const fee=sub>=DELIVERY.freeOver||sub===0?0:DELIVERY.fee, total=sub+fee
  const best=PRODUCTS.find(p=>p.best)
  const featured=productById(FEATURED.id)
  const cartIcon=i=>i.sub?<div className="relative shrink-0"><ProductImg p={i} size={46} radius={12}/><span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full grid place-items-center text-white border-2 border-cream" style={{background:'#E8962B'}}><Repeat size={11}/></span></div>:<ProductImg p={i} size={46} radius={12}/>

  const q=query.trim().toLowerCase()
  const list=PRODUCTS.filter(p=>(filter==='all'||p.cat===filter)&&(!q||p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)||p.profile.toLowerCase().includes(q)))

  return (<div className="bg-ambient min-h-screen">
    <header className="sticky top-0 z-30 backdrop-blur bg-cream/80 border-b border-line">
      <div className="mx-auto w-[92vw] max-w-[1120px] flex items-center justify-between py-3">
        <a href="#" className="flex items-center gap-2"><KogiaMark size={34}/><div><div className="serif font-extrabold leading-none text-lg">Kogia Coffee</div><div className="text-[10px] text-muted">par Kogia Business</div></div></a>
        <nav className="hidden md:flex gap-5 text-sm text-muted font-medium"><a href="#produits" className="hover:text-caramel">Nos cafés</a><a href="#mugs" className="hover:text-caramel">Mugs</a><a href="#accessoires" className="hover:text-caramel">Accessoires</a><a href="#abonnement" className="hover:text-caramel">Abonnement</a><a href="#coffrets" className="hover:text-caramel">Coffrets</a><a href="#/suivi" className="hover:text-caramel">Suivi</a></nav>
        <button onClick={()=>setOpen(true)} className="relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white" style={{background:'#E8962B'}}><ShoppingBag size={16}/> Panier{count>0&&<span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 grid place-items-center rounded-full text-[11px] bg-ink text-white">{count}</span>}</button>
      </div>
    </header>

    {/* Bandeau promo */}
    <div className="text-white text-center text-[13px] font-semibold py-2 px-3" style={{background:'linear-gradient(90deg,#D07E1A,#E8962B)'}}>
      <Sparkles size={13} className="inline -mt-0.5 mr-1"/> Livraison <b>gratuite</b> dès {DELIVERY.freeOver} {CUR} · Pack Découverte 3 mélanges à {BUNDLE.price} {CUR} <span className="opacity-70">(au lieu de {BUNDLE.oldPrice})</span>
    </div>

    <section className="mx-auto w-[92vw] max-w-[1120px] grid md:grid-cols-2 gap-10 items-center pt-14 pb-12">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:.5}}>
        <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full" style={{background:'#F6EAE0',color:'#E8962B'}}>ⵣ Café amazigh · de Djerba à Carthage 🇹🇳</div>
        <h1 className="serif text-5xl md:text-6xl font-extrabold leading-[1.05] mt-4">Le café <span style={{color:'#E8962B'}}>amazigh</span>,<br/>de Djerba à Carthage.</h1>
        <p className="text-lg text-muted mt-4 max-w-[46ch]">Onze recettes 100% locales, en poudre, par sachet — des épices choisies pour le goût <b className="text-ink">et</b> le bien-être. <b className="text-ink">Paiement à la livraison</b> · gratuite dès {DELIVERY.freeOver} {CUR}.</p>
        <div className="flex items-center gap-4 mt-5 text-sm"><span className="flex items-center gap-1.5"><Stars value={4.8} size={16}/> <b>4,8</b><span className="text-muted">/5 · 800+ avis</span></span><span className="text-muted flex items-center gap-1.5"><Coffee size={15} style={{color:'#E8962B'}}/> Torréfié à Djerba</span></div>
        <div className="flex gap-3 mt-7 flex-wrap"><a href="#produits" className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white shadow-lg shadow-caramel/20 hover:-translate-y-0.5 transition" style={{background:'#E8962B'}}>Voir nos cafés <ArrowRight size={17}/></a><a href="#abonnement" className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold bg-white border border-line hover:border-caramel transition"><Repeat size={16}/> S'abonner −10%</a></div>
      </motion.div>
      <motion.div initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:.5,delay:.1}} whileHover={{y:-4}} className="card p-8 flex flex-col items-center text-center cursor-pointer hover:shadow-2xl transition" style={{background:'linear-gradient(160deg,#fff,#F6EAE0)'}} onClick={()=>setDetail(best)}>
        <span className="self-start text-[11px] font-bold px-2.5 py-1 rounded-full text-white" style={{background:best.accent}}>★ Best-seller</span>
        <motion.div whileHover={{rotate:-2,scale:1.03}} transition={{type:'spring',stiffness:200}}><ProductImg p={best} size={170} radius={24}/></motion.div>
        <div className="serif text-2xl font-bold mt-4">{best.name}</div><div className="text-muted text-sm">{best.ar} · {best.profile}</div>
        <div className="flex items-center gap-1.5 mt-1 text-sm"><Stars value={best.rating} size={14}/> <b>{best.rating.toFixed(1)}</b> <span className="text-muted">({best.reviews})</span></div>
        <button onClick={e=>{e.stopPropagation();add(best,'250g')}} className="mt-3 inline-flex items-center gap-1.5 text-white text-sm font-bold px-4 py-2 rounded-full hover:scale-105 transition" style={{background:'#E8962B'}}><Plus size={15}/> Ajouter · {best.prices['250g']} {CUR}</button>
      </motion.div>
    </section>

    {/* Café du mois */}
    <section className="mx-auto w-[92vw] max-w-[1120px] pb-4">
      <motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="card overflow-hidden grid sm:grid-cols-[auto_1fr_auto] items-center gap-5 p-5 sm:p-6" style={{background:'linear-gradient(135deg,#fff,#F6EAE0)'}}>
        <div className="relative shrink-0 mx-auto sm:mx-0"><ProductImg p={featured} size={92} radius={18}/><span className="absolute -top-2 -left-2 w-8 h-8 rounded-full grid place-items-center text-white shadow" style={{background:'#E8962B'}}><Crown size={16}/></span></div>
        <div className="text-center sm:text-left">
          <div className="text-[11px] font-bold uppercase tracking-widest" style={{color:'#E8962B'}}>Café du mois · {FEATURED.month}</div>
          <h3 className="serif text-2xl font-extrabold mt-0.5">{featured.name}</h3>
          <p className="text-sm text-muted mt-1 max-w-[60ch]">{FEATURED.pitch}</p>
        </div>
        <button onClick={()=>setDetail(featured)} className="shrink-0 inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 font-semibold text-white whitespace-nowrap mx-auto" style={{background:'#E8962B'}}>Découvrir <ArrowRight size={16}/></button>
      </motion.div>
    </section>

    <div className="border-y border-line bg-white"><div className="mx-auto w-[92vw] max-w-[1120px] flex flex-wrap gap-x-8 gap-y-2 justify-around py-3.5 text-sm text-muted">
      <span className="flex items-center gap-2"><Wallet size={16} style={{color:'#E8962B'}}/> Paiement à la livraison</span>
      <span className="flex items-center gap-2"><Truck size={16} style={{color:'#E8962B'}}/> Livraison 24 gouvernorats</span>
      <span className="flex items-center gap-2"><ShieldCheck size={16} style={{color:'#E8962B'}}/> Gratuite dès {DELIVERY.freeOver} {CUR}</span>
      <span className="flex items-center gap-2"><Coffee size={16} style={{color:'#E8962B'}}/> Torréfié à Djerba</span>
    </div></div>

    <section id="produits" className="mx-auto w-[92vw] max-w-[1120px] py-16">
      <div className="text-center max-w-[60ch] mx-auto mb-7"><div className="text-xs font-bold uppercase tracking-widest" style={{color:'#E8962B'}}>Notre carte</div><h2 className="serif text-4xl font-extrabold mt-2">Trouvez votre mélange</h2><p className="text-muted mt-2">Du plus doux au plus corsé. Choisissez votre format.</p></div>

      {/* Recherche + filtre par profil */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-8">
        <div className="relative w-full sm:max-w-[280px]">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"/>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Rechercher un mélange…" className="w-full rounded-full border border-line bg-white pl-10 pr-4 py-2.5 text-sm"/>
        </div>
        <div className="flex gap-1.5 flex-wrap justify-center">
          <Chip active={filter==='all'} onClick={()=>setFilter('all')}>Tous</Chip>
          {PROFILS.map(pr=><Chip key={pr.id} active={filter===pr.id} onClick={()=>setFilter(pr.id)}>{pr.emoji} {pr.label}</Chip>)}
        </div>
      </div>

      {list.length===0
        ? <div className="card p-10 text-center text-muted">Aucun mélange ne correspond. <button onClick={()=>{setQuery('');setFilter('all')}} className="underline" style={{color:'#E8962B'}}>Réinitialiser</button></div>
        : <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{list.map(p=><ProductCard key={p.id} p={p} onAdd={add} onOpen={()=>setDetail(p)}/>)}</div>}
    </section>

    {/* Pack Découverte */}
    <section id="pack" className="mx-auto w-[92vw] max-w-[1120px] pb-16">
      <div className="card overflow-hidden grid md:grid-cols-[1fr_1.1fr]" style={{background:'linear-gradient(135deg,#13183A,#4a362a)'}}>
        <div className="p-8 md:p-10 text-white">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full" style={{background:'#E8962B'}}><Sparkles size={13}/> Offre pack</span>
          <h2 className="serif text-3xl md:text-4xl font-extrabold mt-3">{BUNDLE.name}</h2>
          <div className="text-sm text-white/60 serif">{BUNDLE.ar}</div>
          <p className="text-white/75 mt-3 max-w-[46ch] text-sm">{BUNDLE.desc}</p>
          <div className="flex items-end gap-3 mt-5"><div className="serif text-4xl font-extrabold" style={{color:'#E8B98C'}}>{BUNDLE.price} {CUR}</div><div className="text-white/50 line-through mb-1">{BUNDLE.oldPrice} {CUR}</div><span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/15 mb-1.5">−{BUNDLE.oldPrice-BUNDLE.price} {CUR}</span></div>
          <button onClick={addBundle} className="inline-flex items-center gap-2 rounded-full px-6 py-3 mt-5 font-semibold text-white" style={{background:'#E8962B'}}><Plus size={16}/> Ajouter le pack</button>
        </div>
        <div className="flex items-center justify-center gap-2 p-6 md:p-10" style={{background:'radial-gradient(420px 300px at 60% 30%,rgba(181,103,58,.35),transparent)'}}>
          {BUNDLE.items.map((id,i)=>{const p=productById(id);return <div key={id} className="rounded-2xl overflow-hidden shadow-lg" style={{transform:`translateY(${i===1?'-14px':'10px'}) rotate(${i*4-4}deg)`}}><ProductImg p={p} size={118} radius={16}/></div>})}
        </div>
      </div>
    </section>

    {/* Abonnement café */}
    <section id="abonnement" className="bg-white border-y border-line py-16"><div className="mx-auto w-[92vw] max-w-[1120px]">
      <div className="text-center max-w-[62ch] mx-auto mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{color:'#E8962B'}}><Repeat size={14}/> Abonnement café</div>
        <h2 className="serif text-4xl font-extrabold mt-2">Ne soyez jamais à court de café</h2>
        <p className="text-muted mt-2">Recevez votre mélange préféré à la fréquence de votre choix, <b className="text-ink">−10% à vie</b> et livraison toujours offerte. Sans engagement, paiement à la livraison.</p>
      </div>
      <div className="grid md:grid-cols-[1fr_1.1fr] gap-6 items-center">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          {SUBSCRIPTION.perks.map(t=>(<div key={t} className="flex items-center gap-2 text-sm card px-4 py-3"><span className="w-7 h-7 rounded-full grid place-items-center text-white shrink-0" style={{background:'#E8962B'}}><Check size={15}/></span>{t}</div>))}
        </div>
        <SubscriptionBuilder onSub={addSub}/>
      </div>
    </div></section>

    {/* Coffrets cadeaux */}
    <section id="coffrets" className="mx-auto w-[92vw] max-w-[1120px] py-16">
      <div className="text-center max-w-[60ch] mx-auto mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{color:'#E8962B'}}><Gift size={14}/> Coffrets cadeaux</div>
        <h2 className="serif text-4xl font-extrabold mt-2">À offrir, prêt en un clic</h2>
        <p className="text-muted mt-2">Des coffrets composés à la main, dans un bel écrin Kogia avec carte personnalisée. Livrés où vous voulez.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">{GIFTS.map(g=><GiftCard key={g.id} g={g} onAdd={addGift}/>)}</div>
    </section>

    {/* Avis clients */}
    <section id="avis" className="bg-white border-y border-line py-16"><div className="mx-auto w-[92vw] max-w-[1120px]">
      <div className="text-center max-w-[60ch] mx-auto mb-8">
        <div className="text-xs font-bold uppercase tracking-widest" style={{color:'#E8962B'}}>Ils nous font confiance</div>
        <h2 className="serif text-4xl font-extrabold mt-2">Avis de nos clients</h2>
        <div className="flex items-center justify-center gap-2 mt-3 text-sm"><Stars value={4.8} size={18}/><b>4,8</b><span className="text-muted">/5 sur 800+ commandes livrées</span></div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{REVIEWS.map((r,i)=>(
        <motion.div key={i} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:i*.05}} className="card p-5 flex flex-col">
          <Quote size={22} style={{color:'#E0C3AC'}}/>
          <p className="text-sm mt-2 flex-1">« {r.quote} »</p>
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-line">
            <div><div className="font-bold text-sm">{r.name}</div><div className="text-xs text-muted">{r.gov} · {r.blend}</div></div>
            <Stars value={r.stars} size={13}/>
          </div>
        </motion.div>))}</div>
    </div></section>

    <section id="qualite" className="bg-white border-y border-line py-16"><div className="mx-auto w-[92vw] max-w-[1120px]">
      <div className="text-center mb-8"><div className="text-xs font-bold uppercase tracking-widest" style={{color:'#E8962B'}}>Notre promesse</div><h2 className="serif text-4xl font-extrabold mt-2">Du grain à votre tasse</h2></div>
      <div className="grid md:grid-cols-3 gap-5">{[[<Coffee/>,'Torréfié frais','Chaque mélange est torréfié et moulu à la commande, jamais en avance.'],[<Leaf/>,'Recettes authentiques','Des recettes traditionnelles, listées au gramme près — pas de secret.'],[<Truck/>,'Livré chez vous','Commandez en ligne, recevez à domicile et payez à la livraison.']].map(([ic,t,d],i)=>(<div key={i} className="card p-6"><div className="w-12 h-12 rounded-xl grid place-items-center mb-3" style={{background:'#F6EAE0',color:'#E8962B'}}>{ic}</div><h3 className="serif text-xl font-bold">{t}</h3><p className="text-muted text-sm mt-1">{d}</p></div>))}</div>
    </div></section>

    <section id="livraison" className="mx-auto w-[92vw] max-w-[1120px] py-16">
      <div className="card p-8 md:p-10 grid md:grid-cols-[1.2fr_.8fr] gap-6 items-center" style={{background:'linear-gradient(135deg,#fff,#F6EAE0)'}}>
        <div><div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full mb-3" style={{background:'#E8962B',color:'#fff'}}><Wallet size={13}/> Paiement à la livraison</div>
          <h2 className="serif text-3xl font-extrabold">Vous payez à la réception</h2>
          <p className="text-muted mt-2 max-w-[48ch]">Pas de paiement en ligne. Commandez, et réglez en espèces au livreur. Livraison {DELIVERY.fee} {CUR} dans les 24 gouvernorats sous 2 à 4 jours — <b className="text-ink">gratuite dès {DELIVERY.freeOver} {CUR}</b>.</p>
          <a href="#produits" className="inline-flex items-center gap-2 rounded-full px-6 py-3 mt-5 font-semibold text-white" style={{background:'#E8962B'}}>Commander maintenant <ArrowRight size={17}/></a></div>
        <div className="grid place-items-center"><KogiaMark size={120}/></div>
      </div>
    </section>

    {/* Tasses & Mugs */}
    <section id="mugs" className="bg-white border-t border-line py-16"><div className="mx-auto w-[92vw] max-w-[1120px]">
      <div className="text-center max-w-[62ch] mx-auto mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{color:'#E8962B'}}><CupSoda size={14}/> Tasses & Mugs</div>
        <h2 className="serif text-4xl font-extrabold mt-2">Le mug Kogia, fait main</h2>
        <p className="text-muted mt-2">Des tasses en céramique émaillées à la main, à l'effigie de la baleine Kogia. Chaque pièce est unique.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{MUGS.map(m=><ShopCard key={m.id} it={m} onAdd={addShop}/>)}</div>
    </div></section>

    {/* Accessoires artisanaux */}
    <section id="accessoires" className="mx-auto w-[92vw] max-w-[1120px] py-16">
      <div className="text-center max-w-[62ch] mx-auto mb-8">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{color:'#E8962B'}}><Hand size={14}/> Accessoires artisanaux</div>
        <h2 className="serif text-4xl font-extrabold mt-2">L'art du café, fait main</h2>
        <p className="text-muted mt-2">Dallah en cuivre, finjans, bois d'olivier de Djerba… des objets authentiques, façonnés par des artisans tunisiens.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{ACCESSORIES.map(a=><ShopCard key={a.id} it={a} onAdd={addShop}/>)}</div>
    </section>

    {/* Newsletter */}
    <section className="mx-auto w-[92vw] max-w-[1120px] py-16">
      <div className="card overflow-hidden grid md:grid-cols-[1.1fr_.9fr] gap-6 items-center p-8 md:p-10" style={{background:'linear-gradient(135deg,#13183A,#4a362a)'}}>
        <div className="text-white">
          <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full" style={{background:'#E8962B'}}><Mail size={13}/> Newsletter</div>
          <h2 className="serif text-3xl font-extrabold mt-3">Recettes, offres & nouveaux mélanges</h2>
          <p className="text-white/70 mt-2 text-sm max-w-[44ch]">Inscrivez-vous et recevez <b className="text-white">un code de bienvenue −10%</b> ainsi que nos conseils de préparation à la tunisienne.</p>
        </div>
        <NewsletterForm/>
      </div>
    </section>

    <footer className="bg-ink text-white/75 py-12"><div className="mx-auto w-[92vw] max-w-[1120px] flex flex-wrap justify-between gap-6">
      <div className="max-w-[280px]"><div className="flex items-center gap-2 mb-1"><KogiaMark size={28} c1="#E8B98C" c2="#C0743C"/><span className="serif font-extrabold text-white text-lg">Kogia Coffee</span></div><p className="text-sm">Café traditionnel tunisien, torréfié & moulu frais. Une marque de Kogia Business.</p></div>
      <div><h4 className="serif text-white font-bold mb-2">Boutique</h4><a href="#produits" className="block text-sm py-0.5 hover:text-white">Nos cafés</a><a href="#abonnement" className="block text-sm py-0.5 hover:text-white">Abonnement</a><a href="#coffrets" className="block text-sm py-0.5 hover:text-white">Coffrets cadeaux</a><a href="#avis" className="block text-sm py-0.5 hover:text-white">Avis clients</a></div>
      <div><h4 className="serif text-white font-bold mb-2">Aide</h4><a href="#/suivi" className="block text-sm py-0.5 hover:text-white">Suivre ma commande</a><a href="#livraison" className="block text-sm py-0.5 hover:text-white">Livraison & paiement</a><a href="#/admin" className="block text-sm py-0.5 hover:text-white">Espace gérant</a></div>
      <div><h4 className="serif text-white font-bold mb-2">Contact</h4><span className="block text-sm py-0.5">Djerba, Tunisie 🇹🇳</span><span className="block text-sm py-0.5">+216 — — —</span></div>
    </div><div className="mx-auto w-[92vw] max-w-[1120px] border-t border-white/10 mt-8 pt-4 text-xs flex justify-between flex-wrap gap-2"><span>© 2026 Kogia Coffee · Kogia Group</span><span className="flex items-center gap-3"><a href={import.meta.env.BASE_URL+'photos/CREDITS.txt'} target="_blank" rel="noreferrer" className="hover:text-white underline-offset-2 hover:underline">Crédits photos & musique</a> · Paiement à la livraison</span></div></footer>

    {/* Détail produit */}
    <AnimatePresence>{detail&&<ProductDetail p={detail} onClose={()=>setDetail(null)} onAdd={add}/>}</AnimatePresence>

    {/* Panier */}
    <div onClick={()=>setOpen(false)} className={`fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm transition ${open?'opacity-100':'opacity-0 pointer-events-none'}`}/>
    <aside className={`fixed top-0 right-0 h-full w-[min(420px,92vw)] z-50 bg-cream border-l border-line flex flex-col transition-transform duration-300 ${open?'translate-x-0':'translate-x-full'}`}>
      <div className="flex items-center justify-between px-6 py-5 border-b border-line"><h3 className="serif text-2xl font-bold">Votre panier</h3><button onClick={()=>setOpen(false)} className="text-muted"><X/></button></div>
      <div className="flex-1 overflow-y-auto thin px-6 py-5 flex flex-col gap-4">
        {cart.length===0? <div className="text-center text-muted mt-12">Votre panier est vide.<br/>Choisissez un café ☕</div>
          : cart.map(i=>(<div key={i.key} className="flex gap-3 items-center">{cartIcon(i)}
            <div className="flex-1"><b className="text-sm">{i.name}</b><div className="text-xs text-muted">{i.size} · {i.price} {CUR}{i.sub&&<span className="ml-1 font-semibold" style={{color:'#E8962B'}}>· {i.freqLabel} −10%</span>}</div>
              <div className="flex items-center gap-2 mt-1"><button onClick={()=>chg(i.key,-1)} className="w-6 h-6 rounded-md border border-line grid place-items-center"><Minus size={13}/></button><span className="text-sm">{i.qty}</span><button onClick={()=>chg(i.key,1)} className="w-6 h-6 rounded-md border border-line grid place-items-center"><Plus size={13}/></button></div></div>
            <div className="serif font-bold" style={{color:'#E8962B'}}>{i.price*i.qty} {CUR}</div></div>))}
      </div>
      <div className="border-t border-line px-6 py-5">
        {count>0&&<div className="text-sm space-y-1 mb-3"><div className="flex justify-between text-muted"><span>Sous-total</span><span>{sub} {CUR}</span></div>
          <div className="flex justify-between text-muted"><span>Livraison</span><span>{fee===0?'Gratuite':fee+' '+CUR}</span></div>
          {fee>0&&<div className="text-[11px]" style={{color:'#E8962B'}}>Ajoutez {DELIVERY.freeOver-sub} {CUR} pour la livraison gratuite</div>}</div>}
        <div className="flex justify-between mb-3 text-lg"><span className="font-semibold">Total</span><b className="serif text-2xl" style={{color:'#E8962B'}}>{total} {CUR}</b></div>
        <button onClick={()=>{if(!count)return note('Panier vide');setOpen(false);nav('/checkout')}} className="w-full rounded-full py-3 font-semibold text-white" style={{background:'#E8962B'}}>Commander · paiement à la livraison</button></div>
    </aside>
    {/* Barre panier mobile collante */}
    <AnimatePresence>{count>0&&!open&&<motion.button initial={{y:80,opacity:0}} animate={{y:0,opacity:1}} exit={{y:80,opacity:0}} onClick={()=>setOpen(true)} className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-[55] w-[92vw] max-w-[460px] flex items-center justify-between rounded-full px-5 py-3.5 text-white shadow-2xl" style={{background:'#E8962B'}}>
      <span className="flex items-center gap-2 font-semibold"><span className="w-6 h-6 grid place-items-center rounded-full bg-white/25 text-xs">{count}</span> Voir le panier</span>
      <span className="serif font-extrabold text-lg">{total} {CUR}</span>
    </motion.button>}</AnimatePresence>

    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-full bg-ink text-white text-sm font-semibold transition-all ${toastMsg?'translate-y-0 opacity-100':'translate-y-24 opacity-0'}`}>{toastMsg}</div>
  </div>)
}

function Chip({active,onClick,children}){
  return <button onClick={onClick} className={`text-sm font-semibold px-4 py-2 rounded-full border transition ${active?'text-white':'text-muted border-line bg-white hover:border-caramel'}`} style={active?{background:'#E8962B',borderColor:'#E8962B'}:{}}>{children}</button>
}

function ProductCard({p,onAdd,onOpen}){
  const [size,setSize]=useState('250g')
  return (<motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="card overflow-hidden flex flex-col hover:shadow-xl transition">
    <button onClick={onOpen} className="aspect-[5/3] relative overflow-hidden text-left group">
      <img src={p.img} alt={p.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition duration-500"/>
      <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full text-white shadow-sm" style={{background:p.accent}}>{p.best?'★ Best-seller':p.premium?'Premium':p.tag}</span>
      <span className="absolute bottom-3 right-3 text-[11px] font-semibold px-2 py-1 rounded-full bg-white/90 backdrop-blur flex items-center gap-1" style={{color:'#7a5a18'}}><Star size={11} fill="#E8A93B" stroke="#E8A93B"/> {p.rating.toFixed(1)}</span>
    </button>
    <div className="p-5 flex flex-col gap-1 flex-1">
      <div className="text-[12px] font-bold tracking-wide" style={{color:p.accent}}>{p.amazigh}</div>
      <button onClick={onOpen} className="text-left"><h3 className="serif text-xl font-bold leading-tight hover:underline">{p.name}</h3></button>
      <div className="text-sm text-muted">{p.profile} · ☕ {p.caf}</div>
      {p.health&&<div className="text-[11px] font-semibold inline-flex items-start gap-1 mt-0.5" style={{color:'#6F8C3A'}}><Leaf size={12} className="mt-0.5 shrink-0"/> {p.health}</div>}
      <div className="flex items-center gap-2 mt-0.5"><Stars value={p.rating} size={13}/><span className="text-xs text-muted">{p.rating.toFixed(1)} · {p.reviews} avis</span></div>
      <p className="text-xs text-muted mt-1 line-clamp-2">{p.desc}</p>
      <div className="flex gap-1.5 mt-3">{SIZES.map(s=><button key={s} onClick={()=>setSize(s)} className={`flex-1 rounded-lg py-1.5 text-xs font-semibold border ${size===s?'text-white':'text-muted border-line'}`} style={size===s?{background:'#13183A',borderColor:'#13183A'}:{}}>{s}</button>)}</div>
      <div className="flex items-center justify-between mt-auto pt-3"><div className="serif text-xl font-bold">{p.prices[size]} <span className="text-xs text-muted">{CUR}</span></div>
        <button onClick={()=>onAdd(p,size)} className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white" style={{background:p.accent}}><Plus size={15}/> Ajouter</button></div>
    </div>
  </motion.div>)
}

function ProductDetail({p,onClose,onAdd}){
  const [size,setSize]=useState('250g'); const [qty,setQty]=useState(1)
  useEffect(()=>{const h=e=>e.key==='Escape'&&onClose();window.addEventListener('keydown',h);document.body.style.overflow='hidden';return()=>{window.removeEventListener('keydown',h);document.body.style.overflow=''}},[onClose])
  return (<>
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={onClose} className="fixed inset-0 z-[70] bg-ink/50 backdrop-blur-sm"/>
    <motion.div initial={{opacity:0,y:30,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:.98}} className="fixed inset-0 z-[71] grid place-items-center p-4 pointer-events-none">
      <div className="card overflow-hidden w-full max-w-[860px] max-h-[92vh] overflow-y-auto thin pointer-events-auto grid md:grid-cols-2">
        <div className="relative min-h-[220px]">
          <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover"/>
          <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full text-white shadow-sm" style={{background:p.accent}}>{p.best?'★ Best-seller':p.premium?'Premium':p.tag}</span>
        </div>
        <div className="p-6 md:p-7 relative">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 grid place-items-center rounded-full bg-cream text-muted hover:text-ink"><X size={18}/></button>
          <div className="text-sm font-bold tracking-wide" style={{color:p.accent}}>{p.amazigh}</div>
          <h2 className="serif text-3xl font-extrabold leading-tight">{p.name}</h2>
          <div className="text-sm text-muted italic mt-0.5">{p.meaning} · {p.ar}</div>
          <div className="flex items-center gap-2 mt-1.5"><Stars value={p.rating} size={15}/><span className="text-sm"><b>{p.rating.toFixed(1)}</b> <span className="text-muted">· {p.reviews} avis</span></span></div>
          <p className="text-sm text-muted mt-3">{p.desc}</p>

          {p.health&&<div className="mt-3 rounded-xl p-3 text-sm flex items-start gap-2" style={{background:'#EEF3E6',color:'#4f6b2a'}}><Leaf size={16} className="mt-0.5 shrink-0"/><div><b>Bienfait —</b> {p.health}</div></div>}
          {p.pairing&&<div className="mt-2 rounded-xl p-3 text-sm flex items-start gap-2" style={{background:'#F6EAE0',color:'#8C5A33'}}><Sparkles size={16} className="mt-0.5 shrink-0"/><div><b>L'accord —</b> {p.pairing}</div></div>}

          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm">
            <div><div className="text-[11px] uppercase tracking-wide text-muted font-semibold">Profil</div><div className="font-semibold">{p.profile}</div></div>
            <div><div className="text-[11px] uppercase tracking-wide text-muted font-semibold">Torréfaction</div><div className="font-semibold">{p.roast}</div></div>
            <div><div className="text-[11px] uppercase tracking-wide text-muted font-semibold">Caféine</div><div className="font-semibold">☕ {p.caf}</div></div>
            <div><div className="text-[11px] uppercase tracking-wide text-muted font-semibold">Intensité</div><Intensity value={p.intensity}/></div>
          </div>

          <div className="mt-4"><div className="text-[11px] uppercase tracking-wide text-muted font-semibold mb-1.5">Ingrédients</div>
            <div className="flex flex-wrap gap-1.5">{p.ingredients.map(g=><span key={g} className="text-xs px-2.5 py-1 rounded-full" style={{background:'#F6EAE0',color:'#8C5A33'}}>{g}</span>)}</div></div>

          <div className="mt-5"><div className="text-[11px] uppercase tracking-wide text-muted font-semibold mb-1.5">Format</div>
            <div className="flex gap-2">{SIZES.map(s=><button key={s} onClick={()=>setSize(s)} className={`flex-1 rounded-xl py-2 text-sm font-semibold border ${size===s?'text-white':'text-muted border-line'}`} style={size===s?{background:'#13183A',borderColor:'#13183A'}:{}}>{s}<div className="text-[11px] font-normal opacity-80">{p.prices[s]} {CUR}</div></button>)}</div></div>

          <div className="flex items-center justify-between mt-5">
            <div className="flex items-center gap-3"><span className="text-[11px] uppercase tracking-wide text-muted font-semibold">Quantité</span>
              <div className="flex items-center gap-2"><button onClick={()=>setQty(q=>Math.max(1,q-1))} className="w-8 h-8 rounded-lg border border-line grid place-items-center"><Minus size={14}/></button><span className="w-6 text-center font-semibold">{qty}</span><button onClick={()=>setQty(q=>q+1)} className="w-8 h-8 rounded-lg border border-line grid place-items-center"><Plus size={14}/></button></div></div>
            <div className="serif text-2xl font-extrabold" style={{color:'#E8962B'}}>{p.prices[size]*qty} {CUR}</div>
          </div>

          <button onClick={()=>{onAdd(p,size,qty);onClose()}} className="w-full rounded-full py-3.5 mt-5 font-semibold text-white inline-flex items-center justify-center gap-2" style={{background:'#E8962B'}}><Plus size={17}/> Ajouter au panier</button>
        </div>
      </div>
    </motion.div>
  </>)
}

function SubscriptionBuilder({onSub}){
  const [pid,setPid]=useState(PRODUCTS[0].id); const [freq,setFreq]=useState(SUBSCRIPTION.freqs[1].id)
  const p=productById(pid); const f=SUBSCRIPTION.freqs.find(x=>x.id===freq)
  const full=p.prices[SUBSCRIPTION.size]; const price=Math.round(full*(1-SUBSCRIPTION.discount))
  return (<motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="card p-6">
    <div className="flex items-center gap-3"><ProductImg p={p} size={56} radius={14}/><div><div className="serif text-lg font-bold">{p.name}</div><div className="text-xs text-muted">{p.profile} · {SUBSCRIPTION.size}</div></div></div>
    <div className="mt-4"><div className="text-[11px] uppercase tracking-wide text-muted font-semibold mb-1.5">Mélange</div>
      <select value={pid} onChange={e=>setPid(e.target.value)} className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm">{PRODUCTS.map(x=><option key={x.id} value={x.id}>{x.name}</option>)}</select></div>
    <div className="mt-3"><div className="text-[11px] uppercase tracking-wide text-muted font-semibold mb-1.5">Fréquence de livraison</div>
      <div className="grid grid-cols-3 gap-1.5">{SUBSCRIPTION.freqs.map(x=>(<button key={x.id} onClick={()=>setFreq(x.id)} className={`rounded-xl py-2 text-xs font-semibold border leading-tight ${freq===x.id?'text-white':'text-muted border-line'}`} style={freq===x.id?{background:'#13183A',borderColor:'#13183A'}:{}}>{x.sub}<div className="text-[10px] font-normal opacity-80">/{x.every}</div></button>))}</div></div>
    <div className="flex items-end justify-between mt-5"><div><div className="text-xs text-muted line-through">{full} {CUR}</div><div className="serif text-2xl font-extrabold" style={{color:'#E8962B'}}>{price} {CUR} <span className="text-xs font-semibold text-muted">/ {f.sub.toLowerCase()}</span></div></div><span className="text-[11px] font-bold px-2 py-1 rounded-full" style={{background:'#F6EAE0',color:'#E8962B'}}>−10%</span></div>
    <button onClick={()=>onSub(p,f)} className="w-full rounded-full py-3 mt-4 font-semibold text-white inline-flex items-center justify-center gap-2" style={{background:'#E8962B'}}><Repeat size={16}/> M'abonner · paiement à la livraison</button>
  </motion.div>)
}

function GiftCard({g,onAdd}){
  return (<motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="card overflow-hidden flex flex-col">
    <div className="relative p-6 flex items-center justify-center gap-2" style={{background:'linear-gradient(135deg,#13183A,#4a362a)'}}>
      <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full text-white" style={{background:g.accent}}>{g.badge}</span>
      <span className="absolute top-3 right-3 text-white/80"><Gift size={20}/></span>
      {g.items.map((id,i)=>{const p=productById(id);return <div key={id} className="rounded-xl overflow-hidden shadow-lg" style={{transform:`translateY(${i%2?'-10px':'8px'}) rotate(${i*3-4}deg)`,marginLeft:i?-14:0}}><ProductImg p={p} size={84} radius={12}/></div>})}
    </div>
    <div className="p-5 flex flex-col flex-1">
      <div className="serif text-lg" style={{color:g.accent}}>{g.ar}</div>
      <h3 className="serif text-xl font-bold">{g.name}</h3>
      <p className="text-sm text-muted mt-1">{g.desc}</p>
      <ul className="mt-3 space-y-1.5">{g.includes.map(x=>(<li key={x} className="flex items-start gap-2 text-sm"><Check size={15} className="mt-0.5 shrink-0" style={{color:g.accent}}/>{x}</li>))}</ul>
      <div className="flex items-center justify-between mt-auto pt-4">
        <div className="flex items-end gap-2"><div className="serif text-2xl font-extrabold" style={{color:'#E8962B'}}>{g.price} {CUR}</div><div className="text-sm text-muted line-through mb-0.5">{g.oldPrice} {CUR}</div></div>
        <button onClick={()=>onAdd(g)} className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white" style={{background:g.accent}}><Plus size={15}/> Offrir</button>
      </div>
    </div>
  </motion.div>)
}

function ShopCard({it,onAdd}){
  return (<motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="card overflow-hidden flex flex-col hover:shadow-xl transition">
    <div className="aspect-[5/3] relative overflow-hidden">
      <img src={it.img} alt={it.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover"/>
      <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full text-white shadow-sm" style={{background:it.accent}}>{it.badge}</span>
      <span className="absolute bottom-3 right-3 text-[11px] font-semibold px-2 py-1 rounded-full bg-white/90 flex items-center gap-1" style={{color:'#7a5a18'}}><Hand size={11}/> Fait main</span>
    </div>
    <div className="p-5 flex flex-col gap-1 flex-1">
      <div className="serif text-lg" style={{color:it.accent}}>{it.ar}</div>
      <h3 className="serif text-xl font-bold leading-tight">{it.name}</h3>
      <div className="text-xs text-muted">{it.material}</div>
      <p className="text-sm text-muted mt-1 line-clamp-2">{it.desc}</p>
      <div className="flex items-center justify-between mt-auto pt-3">
        <div className="serif text-xl font-bold">{it.price} <span className="text-xs text-muted">{CUR}</span></div>
        <button onClick={()=>onAdd(it)} className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white" style={{background:it.accent}}><Plus size={15}/> Ajouter</button>
      </div>
    </div>
  </motion.div>)
}

function NewsletterForm(){
  const [email,setEmail]=useState(''); const [done,setDone]=useState(false)
  const submit=e=>{e.preventDefault();const v=email.trim();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))return toast.error('E-mail invalide');const fresh=addNewsletter(v);toast.success(fresh?'Inscription confirmée · code BIENVENUE10 🎉':'Vous êtes déjà inscrit ✓');setDone(true)}
  if(done) return (<div className="card p-6 text-center bg-white"><div className="w-12 h-12 rounded-full grid place-items-center text-white mx-auto" style={{background:'#E8962B'}}><Check size={24}/></div><div className="serif text-lg font-bold mt-2">Merci !</div><p className="text-sm text-muted mt-1">Utilisez le code <b style={{color:'#E8962B'}}>BIENVENUE10</b> à la caisse pour −10%.</p></div>)
  return (<form onSubmit={submit} className="card p-5 bg-white">
    <label className="text-xs font-semibold text-muted">Votre e-mail</label>
    <div className="flex gap-2 mt-1.5"><input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="vous@exemple.tn" className="flex-1 rounded-full border border-line bg-white px-4 py-3 text-sm"/><button type="submit" className="rounded-full px-5 py-3 font-semibold text-white whitespace-nowrap" style={{background:'#E8962B'}}>S'inscrire</button></div>
    <p className="text-[11px] text-muted mt-2">Pas de spam — un e-mail par mois maximum. Désinscription en un clic.</p>
  </form>)
}
