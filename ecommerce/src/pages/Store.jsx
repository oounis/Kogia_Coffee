import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag, Plus, Minus, X, Coffee, Truck, Leaf, ArrowRight, Wallet, ShieldCheck, Star } from 'lucide-react'
import { PRODUCTS, SIZES, CUR, DELIVERY } from '../data.js'
import { KogiaMark, BlendMark } from '../marks.jsx'
import { loadCart, saveCart } from '../store.js'

export default function Store(){
  const nav=useNavigate()
  const [cart,setCart]=useState(loadCart); const [open,setOpen]=useState(false); const [toast,setToast]=useState('')
  useEffect(()=>saveCart(cart),[cart])
  const note=m=>{setToast(m);clearTimeout(window.__t);window.__t=setTimeout(()=>setToast(''),1800)}
  const add=(p,size)=>{const key=`${p.id}_${size}`;setCart(c=>{const e=c.find(i=>i.key===key);return e?c.map(i=>i.key===key?{...i,qty:i.qty+1}:i):[...c,{key,id:p.id,size,name:p.name,price:p.prices[size],qty:1}]});note(`${p.name} (${size}) ajouté ✓`)}
  const chg=(key,d)=>setCart(c=>c.map(i=>i.key===key?{...i,qty:i.qty+d}:i).filter(i=>i.qty>0))
  const count=cart.reduce((s,i)=>s+i.qty,0), sub=cart.reduce((s,i)=>s+i.price*i.qty,0)
  const fee=sub>=DELIVERY.freeOver||sub===0?0:DELIVERY.fee, total=sub+fee
  const best=PRODUCTS.find(p=>p.best)

  return (<div className="bg-ambient min-h-screen">
    <header className="sticky top-0 z-30 backdrop-blur bg-cream/80 border-b border-line">
      <div className="mx-auto w-[92vw] max-w-[1120px] flex items-center justify-between py-3">
        <a href="#" className="flex items-center gap-2"><KogiaMark size={34}/><div><div className="serif font-extrabold leading-none text-lg">Kogia Coffee</div><div className="text-[10px] text-muted">par Kogia Business</div></div></a>
        <nav className="hidden md:flex gap-7 text-sm text-muted font-medium"><a href="#produits" className="hover:text-caramel">Nos cafés</a><a href="#qualite" className="hover:text-caramel">Qualité</a><a href="#livraison" className="hover:text-caramel">Livraison</a></nav>
        <button onClick={()=>setOpen(true)} className="relative inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white" style={{background:'#B5673A'}}><ShoppingBag size={16}/> Panier{count>0&&<span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 grid place-items-center rounded-full text-[11px] bg-ink text-white">{count}</span>}</button>
      </div>
    </header>

    <section className="mx-auto w-[92vw] max-w-[1120px] grid md:grid-cols-2 gap-10 items-center py-16">
      <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
        <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full" style={{background:'#F6EAE0',color:'#B5673A'}}>☕ Torréfié & moulu frais · Tunisie 🇹🇳</div>
        <h1 className="serif text-5xl md:text-6xl font-extrabold leading-[1.05] mt-4">Le café tunisien,<br/>livré chez <span style={{color:'#B5673A'}}>vous</span>.</h1>
        <p className="text-lg text-muted mt-4 max-w-[44ch]">Six mélanges traditionnels, en poudre, par sachet. <b className="text-ink">Paiement à la livraison</b> · livraison gratuite dès {DELIVERY.freeOver} {CUR}.</p>
        <div className="flex gap-3 mt-7 flex-wrap"><a href="#produits" className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold text-white" style={{background:'#B5673A'}}>Voir nos cafés <ArrowRight size={17}/></a><a href="#livraison" className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold bg-white border border-line">Livraison & paiement</a></div>
      </motion.div>
      <motion.div initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} className="card p-8 flex flex-col items-center text-center" style={{background:'linear-gradient(160deg,#fff,#F6EAE0)'}}>
        <BlendMark p={best} size={150}/>
        <div className="serif text-2xl font-bold mt-4">{best.name}</div><div className="text-muted text-sm">{best.ar} · {best.profile}</div>
        <button onClick={()=>add(best,'250g')} className="mt-3 inline-flex items-center gap-1.5 text-white text-sm font-bold px-4 py-2 rounded-full" style={{background:'#B5673A'}}><Plus size={15}/> Ajouter · {best.prices['250g']} {CUR}</button>
      </motion.div>
    </section>

    <div className="border-y border-line bg-white"><div className="mx-auto w-[92vw] max-w-[1120px] flex flex-wrap gap-x-8 gap-y-2 justify-around py-3.5 text-sm text-muted">
      <span className="flex items-center gap-2"><Wallet size={16} style={{color:'#B5673A'}}/> Paiement à la livraison</span>
      <span className="flex items-center gap-2"><Truck size={16} style={{color:'#B5673A'}}/> Livraison 24 gouvernorats</span>
      <span className="flex items-center gap-2"><ShieldCheck size={16} style={{color:'#B5673A'}}/> Gratuite dès {DELIVERY.freeOver} {CUR}</span>
      <span className="flex items-center gap-2"><Coffee size={16} style={{color:'#B5673A'}}/> Torréfié à Djerba</span>
    </div></div>

    <section id="produits" className="mx-auto w-[92vw] max-w-[1120px] py-16">
      <div className="text-center max-w-[60ch] mx-auto mb-10"><div className="text-xs font-bold uppercase tracking-widest" style={{color:'#B5673A'}}>Notre carte</div><h2 className="serif text-4xl font-extrabold mt-2">Trouvez votre mélange</h2><p className="text-muted mt-2">Du plus léger au plus corsé. Choisissez votre format.</p></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{PRODUCTS.map(p=><ProductCard key={p.id} p={p} onAdd={add}/>)}</div>
    </section>

    <section id="qualite" className="bg-white border-y border-line py-16"><div className="mx-auto w-[92vw] max-w-[1120px]">
      <div className="text-center mb-8"><div className="text-xs font-bold uppercase tracking-widest" style={{color:'#B5673A'}}>Notre promesse</div><h2 className="serif text-4xl font-extrabold mt-2">Du grain à votre tasse</h2></div>
      <div className="grid md:grid-cols-3 gap-5">{[[<Coffee/>,'Torréfié frais','Chaque mélange est torréfié et moulu à la commande, jamais en avance.'],[<Leaf/>,'Recettes authentiques','Des recettes traditionnelles, listées au gramme près — pas de secret.'],[<Truck/>,'Livré chez vous','Commandez en ligne, recevez à domicile et payez à la livraison.']].map(([ic,t,d],i)=>(<div key={i} className="card p-6"><div className="w-12 h-12 rounded-xl grid place-items-center mb-3" style={{background:'#F6EAE0',color:'#B5673A'}}>{ic}</div><h3 className="serif text-xl font-bold">{t}</h3><p className="text-muted text-sm mt-1">{d}</p></div>))}</div>
    </div></section>

    <section id="livraison" className="mx-auto w-[92vw] max-w-[1120px] py-16">
      <div className="card p-8 md:p-10 grid md:grid-cols-[1.2fr_.8fr] gap-6 items-center" style={{background:'linear-gradient(135deg,#fff,#F6EAE0)'}}>
        <div><div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full mb-3" style={{background:'#B5673A',color:'#fff'}}><Wallet size={13}/> Paiement à la livraison</div>
          <h2 className="serif text-3xl font-extrabold">Vous payez à la réception</h2>
          <p className="text-muted mt-2 max-w-[48ch]">Pas de paiement en ligne. Commandez, et réglez en espèces au livreur. Livraison {DELIVERY.fee} {CUR} dans les 24 gouvernorats sous 2 à 4 jours — <b className="text-ink">gratuite dès {DELIVERY.freeOver} {CUR}</b>.</p>
          <a href="#produits" className="inline-flex items-center gap-2 rounded-full px-6 py-3 mt-5 font-semibold text-white" style={{background:'#B5673A'}}>Commander maintenant <ArrowRight size={17}/></a></div>
        <div className="grid place-items-center"><KogiaMark size={120}/></div>
      </div>
    </section>

    <footer className="bg-ink text-white/75 py-12"><div className="mx-auto w-[92vw] max-w-[1120px] flex flex-wrap justify-between gap-6">
      <div className="max-w-[280px]"><div className="flex items-center gap-2 mb-1"><KogiaMark size={28} c1="#E8B98C" c2="#C0743C"/><span className="serif font-extrabold text-white text-lg">Kogia Coffee</span></div><p className="text-sm">Café traditionnel tunisien, torréfié & moulu frais. Une marque de Kogia Business.</p></div>
      <div><h4 className="serif text-white font-bold mb-2">Boutique</h4><a href="#produits" className="block text-sm py-0.5 hover:text-white">Nos cafés</a><a href="#livraison" className="block text-sm py-0.5 hover:text-white">Livraison</a></div>
      <div><h4 className="serif text-white font-bold mb-2">Contact</h4><span className="block text-sm py-0.5">Djerba, Tunisie 🇹🇳</span><span className="block text-sm py-0.5">+216 — — —</span><a href="#/admin" className="block text-sm py-0.5 hover:text-white">Espace gérant</a></div>
    </div><div className="mx-auto w-[92vw] max-w-[1120px] border-t border-white/10 mt-8 pt-4 text-xs flex justify-between flex-wrap gap-2"><span>© 2026 Kogia Coffee · Kogia Group</span><span>Paiement à la livraison · Conçu en Tunisie</span></div></footer>

    <div onClick={()=>setOpen(false)} className={`fixed inset-0 z-40 bg-ink/40 backdrop-blur-sm transition ${open?'opacity-100':'opacity-0 pointer-events-none'}`}/>
    <aside className={`fixed top-0 right-0 h-full w-[min(420px,92vw)] z-50 bg-cream border-l border-line flex flex-col transition-transform duration-300 ${open?'translate-x-0':'translate-x-full'}`}>
      <div className="flex items-center justify-between px-6 py-5 border-b border-line"><h3 className="serif text-2xl font-bold">Votre panier</h3><button onClick={()=>setOpen(false)} className="text-muted"><X/></button></div>
      <div className="flex-1 overflow-y-auto thin px-6 py-5 flex flex-col gap-4">
        {cart.length===0? <div className="text-center text-muted mt-12">Votre panier est vide.<br/>Choisissez un café ☕</div>
          : cart.map(i=>{const p=PRODUCTS.find(x=>x.id===i.id);return(<div key={i.key} className="flex gap-3 items-center"><BlendMark p={p} size={46}/>
            <div className="flex-1"><b className="text-sm">{i.name}</b><div className="text-xs text-muted">{i.size} · {i.price} {CUR}</div>
              <div className="flex items-center gap-2 mt-1"><button onClick={()=>chg(i.key,-1)} className="w-6 h-6 rounded-md border border-line grid place-items-center"><Minus size={13}/></button><span className="text-sm">{i.qty}</span><button onClick={()=>chg(i.key,1)} className="w-6 h-6 rounded-md border border-line grid place-items-center"><Plus size={13}/></button></div></div>
            <div className="serif font-bold" style={{color:'#B5673A'}}>{i.price*i.qty} {CUR}</div></div>)})}
      </div>
      <div className="border-t border-line px-6 py-5">
        {count>0&&<div className="text-sm space-y-1 mb-3"><div className="flex justify-between text-muted"><span>Sous-total</span><span>{sub} {CUR}</span></div>
          <div className="flex justify-between text-muted"><span>Livraison</span><span>{fee===0?'Gratuite':fee+' '+CUR}</span></div>
          {fee>0&&<div className="text-[11px]" style={{color:'#B5673A'}}>Ajoutez {DELIVERY.freeOver-sub} {CUR} pour la livraison gratuite</div>}</div>}
        <div className="flex justify-between mb-3 text-lg"><span className="font-semibold">Total</span><b className="serif text-2xl" style={{color:'#B5673A'}}>{total} {CUR}</b></div>
        <button onClick={()=>{if(!count)return note('Panier vide');setOpen(false);nav('/checkout')}} className="w-full rounded-full py-3 font-semibold text-white" style={{background:'#B5673A'}}>Commander · paiement à la livraison</button></div>
    </aside>
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full bg-ink text-white text-sm font-semibold transition-all ${toast?'translate-y-0 opacity-100':'translate-y-24 opacity-0'}`}>{toast}</div>
  </div>)
}

function ProductCard({p,onAdd}){
  const [size,setSize]=useState('250g')
  return (<motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="card overflow-hidden flex flex-col hover:shadow-xl transition">
    <div className="aspect-[5/3] grid place-items-center relative" style={{background:`linear-gradient(140deg,#FBF8F4,${p.accent}22)`}}><BlendMark p={p} size={108}/>
      <span className="absolute top-3 left-3 text-[11px] font-bold px-2.5 py-1 rounded-full text-white" style={{background:p.accent}}>{p.best?'★ Best-seller':p.premium?'Premium':p.tag}</span></div>
    <div className="p-5 flex flex-col gap-1 flex-1">
      <div className="serif text-lg" style={{color:p.accent}}>{p.ar}</div>
      <h3 className="serif text-xl font-bold leading-tight">{p.name}</h3>
      <div className="text-sm text-muted">{p.profile} · {p.roast}</div>
      <p className="text-xs text-muted mt-1 line-clamp-2">{p.desc}</p>
      <div className="flex gap-1.5 mt-3">{SIZES.map(s=><button key={s} onClick={()=>setSize(s)} className={`flex-1 rounded-lg py-1.5 text-xs font-semibold border ${size===s?'text-white':'text-muted border-line'}`} style={size===s?{background:'#2A211B',borderColor:'#2A211B'}:{}}>{s}</button>)}</div>
      <div className="flex items-center justify-between mt-auto pt-3"><div className="serif text-xl font-bold">{p.prices[size]} <span className="text-xs text-muted">{CUR}</span></div>
        <button onClick={()=>onAdd(p,size)} className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-white" style={{background:p.accent}}><Plus size={15}/> Ajouter</button></div>
    </div>
  </motion.div>)
}
