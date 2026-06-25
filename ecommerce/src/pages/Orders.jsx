import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadOrders, updateOrder } from '../store.js'
import { CUR } from '../data.js'
import { Package, Wallet, Clock, ArrowLeft } from 'lucide-react'
const NEXT={'En attente':'Confirmée','Confirmée':'En livraison','En livraison':'Livrée','Livrée':'Livrée'}
const COL={'En attente':'#E59A12','Confirmée':'#36C5F0','En livraison':'#7C3AED','Livrée':'#10B981'}
export default function Orders(){
  const nav=useNavigate(); const [auth,setAuth]=useState(sessionStorage.getItem('kc_admin')==='1'); const [pw,setPw]=useState(''); const [,f]=useState(0)
  if(!auth) return (<div className="bg-ambient min-h-screen grid place-items-center p-6"><div className="card p-8 max-w-sm w-full text-center">
    <div className="text-4xl mb-2">☕</div><h2 className="serif text-xl font-bold">Espace gérant</h2><p className="text-muted text-sm mb-4">Kogia Coffee — commandes</p>
    <input type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==='Enter'&&(pw==='kogia'?(sessionStorage.setItem('kc_admin','1'),setAuth(true)):null)} placeholder="Code" className="w-full text-center tracking-widest rounded-xl border border-line px-3 py-3 mb-3"/>
    <button onClick={()=>pw==='kogia'?(sessionStorage.setItem('kc_admin','1'),setAuth(true)):alert('Code incorrect')} className="w-full rounded-full py-3 font-semibold text-white" style={{background:'#B5673A'}}>Entrer</button>
    <div className="text-xs text-muted mt-3">Code démo : <b>kogia</b> · <a href="#/" className="underline">boutique</a></div></div></div>)
  const orders=loadOrders(); const rev=orders.reduce((s,o)=>s+o.total,0); const pend=orders.filter(o=>o.status!=='Livrée').length
  return (<div className="bg-ambient min-h-screen"><div className="mx-auto w-[92vw] max-w-[1000px] py-8">
    <button onClick={()=>nav('/')} className="inline-flex items-center gap-1.5 text-sm text-muted mb-4"><ArrowLeft size={16}/> Boutique</button>
    <h1 className="serif text-3xl font-extrabold mb-5">Commandes</h1>
    <div className="grid grid-cols-3 gap-3 mb-6">{[[<Package/>,'Commandes',orders.length],[<Wallet/>,'Chiffre (DT)',rev],[<Clock/>,'En cours',pend]].map(([ic,l,v],i)=>(
      <div key={i} className="card p-4 flex items-center gap-3"><span className="w-11 h-11 rounded-xl grid place-items-center" style={{background:'#F6EAE0',color:'#B5673A'}}>{ic}</span><div><div className="serif text-2xl font-extrabold">{v}</div><div className="text-xs text-muted">{l}</div></div></div>))}</div>
    {orders.length===0? <div className="card p-10 text-center text-muted">Aucune commande pour le moment.</div>
     : <div className="space-y-3">{orders.map(o=>(<div key={o.id} className="card p-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div><div className="font-bold flex items-center gap-2">{o.id} <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{background:COL[o.status]}}>{o.status}</span></div>
            <div className="text-sm text-muted">{o.customer.name} · {o.customer.phone} · {o.customer.city}, {o.customer.gov}</div>
            <div className="text-xs text-muted">{o.customer.address}{o.customer.notes&&` · 📝 ${o.customer.notes}`}</div>
            <div className="text-xs text-muted mt-1">{o.items.map(i=>`${i.name} ×${i.qty} (${i.size})`).join(' · ')}</div></div>
          <div className="text-right"><div className="serif text-xl font-bold" style={{color:'#B5673A'}}>{o.total} {CUR}</div><div className="text-[11px] text-muted">{o.payment}</div>
            {o.status!=='Livrée'&&<button onClick={()=>{updateOrder(o.id,x=>x.status=NEXT[x.status]);f(n=>n+1)}} className="mt-2 text-xs font-semibold px-3 py-1.5 rounded-full text-white" style={{background:'#2A211B'}}>→ {NEXT[o.status]}</button>}</div>
        </div></div>))}</div>}
  </div></div>)
}
