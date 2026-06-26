import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadOrders, updateOrder } from '../store.js'
import { CUR } from '../data.js'
import { Package, Wallet, Clock, ArrowLeft, TrendingUp, Repeat, Crown } from 'lucide-react'
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
const NEXT={'En attente':'Confirmée','Confirmée':'En livraison','En livraison':'Livrée','Livrée':'Livrée'}
const COL={'En attente':'#E59A12','Confirmée':'#36C5F0','En livraison':'#7C3AED','Livrée':'#10B981'}
const STATUSES=['En attente','Confirmée','En livraison','Livrée']
export default function Orders(){
  const nav=useNavigate(); const [auth,setAuth]=useState(sessionStorage.getItem('kc_admin')==='1'); const [pw,setPw]=useState(''); const [,f]=useState(0)
  if(!auth) return (<div className="bg-ambient min-h-screen grid place-items-center p-6"><div className="card p-8 max-w-sm w-full text-center">
    <div className="text-4xl mb-2">☕</div><h2 className="serif text-xl font-bold">Espace gérant</h2><p className="text-muted text-sm mb-4">Kogia Coffee — commandes</p>
    <input type="password" value={pw} onChange={e=>setPw(e.target.value)} onKeyDown={e=>e.key==='Enter'&&(pw==='kogia'?(sessionStorage.setItem('kc_admin','1'),setAuth(true)):null)} placeholder="Code" className="w-full text-center tracking-widest rounded-xl border border-line px-3 py-3 mb-3"/>
    <button onClick={()=>pw==='kogia'?(sessionStorage.setItem('kc_admin','1'),setAuth(true)):alert('Code incorrect')} className="w-full rounded-full py-3 font-semibold text-white" style={{background:'#B5673A'}}>Entrer</button>
    <div className="text-xs text-muted mt-3">Code démo : <b>kogia</b> · <a href="#/" className="underline">boutique</a></div></div></div>)

  const orders=loadOrders()
  const rev=orders.reduce((s,o)=>s+o.total,0)
  const pend=orders.filter(o=>o.status!=='Livrée').length
  const subs=orders.filter(o=>o.type==='Abonnement').length
  const aov=orders.length?Math.round(rev/orders.length):0

  // Commandes par statut (camembert)
  const byStatus=STATUSES.map(s=>({name:s,value:orders.filter(o=>o.status===s).length})).filter(d=>d.value>0)

  // Top mélanges (barres) — par unités vendues
  const tally={}
  orders.forEach(o=>o.items.forEach(i=>{const n=i.name.replace(' · Abonnement','');tally[n]=(tally[n]||0)+i.qty}))
  const topBlends=Object.entries(tally).map(([name,qty])=>({name,qty})).sort((a,b)=>b.qty-a.qty).slice(0,5)
  const topName=topBlends[0]?.name

  return (<div className="bg-ambient min-h-screen"><div className="mx-auto w-[92vw] max-w-[1000px] py-8">
    <button onClick={()=>nav('/')} className="inline-flex items-center gap-1.5 text-sm text-muted mb-4"><ArrowLeft size={16}/> Boutique</button>
    <h1 className="serif text-3xl font-extrabold mb-5">Tableau de bord</h1>

    {/* KPI */}
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">{[
      [<Package/>,'Commandes',orders.length],
      [<Wallet/>,'Chiffre (DT)',rev],
      [<TrendingUp/>,'Panier moyen',aov+' DT'],
      [<Repeat/>,'Abonnements',subs],
      [<Clock/>,'En cours',pend],
    ].map(([ic,l,v],i)=>(
      <div key={i} className="card p-4 flex items-center gap-3"><span className="w-11 h-11 rounded-xl grid place-items-center shrink-0" style={{background:'#F6EAE0',color:'#B5673A'}}>{ic}</span><div className="min-w-0"><div className="serif text-2xl font-extrabold truncate">{v}</div><div className="text-xs text-muted">{l}</div></div></div>))}</div>

    {/* Graphiques */}
    {orders.length>0&&<div className="grid md:grid-cols-2 gap-3 mb-6">
      <div className="card p-5">
        <h3 className="serif font-bold mb-1">Top mélanges</h3>
        <p className="text-xs text-muted mb-3">Unités vendues (toutes commandes)</p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={topBlends} layout="vertical" margin={{left:10,right:20}}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#EEE6DE"/>
            <XAxis type="number" allowDecimals={false} tick={{fontSize:11,fill:'#8B7B6E'}}/>
            <YAxis type="category" dataKey="name" width={120} tick={{fontSize:11,fill:'#2A211B'}}/>
            <Tooltip cursor={{fill:'#F6EAE0'}} contentStyle={{borderRadius:12,border:'1px solid #EEE6DE',fontSize:12}}/>
            <Bar dataKey="qty" name="Unités" fill="#B5673A" radius={[0,6,6,0]}/>
          </BarChart>
        </ResponsiveContainer>
        {topName&&<div className="text-xs text-muted mt-2 flex items-center gap-1.5"><Crown size={13} style={{color:'#B5673A'}}/> Meilleure vente : <b className="text-ink">{topName}</b></div>}
      </div>
      <div className="card p-5">
        <h3 className="serif font-bold mb-1">Commandes par statut</h3>
        <p className="text-xs text-muted mb-3">Répartition du carnet</p>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={byStatus} dataKey="value" nameKey="name" innerRadius={48} outerRadius={80} paddingAngle={3}>
              {byStatus.map(d=><Cell key={d.name} fill={COL[d.name]}/>)}
            </Pie>
            <Tooltip contentStyle={{borderRadius:12,border:'1px solid #EEE6DE',fontSize:12}}/>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center text-xs mt-1">{byStatus.map(d=>(<span key={d.name} className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full" style={{background:COL[d.name]}}/>{d.name} · {d.value}</span>))}</div>
      </div>
    </div>}

    <h2 className="serif text-xl font-bold mb-3">Commandes</h2>
    {orders.length===0? <div className="card p-10 text-center text-muted">Aucune commande pour le moment.</div>
     : <div className="space-y-3">{orders.map(o=>(<div key={o.id} className="card p-4">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div><div className="font-bold flex items-center gap-2">{o.id} <span className="text-xs font-bold px-2 py-0.5 rounded-full text-white" style={{background:COL[o.status]}}>{o.status}</span>{o.type==='Abonnement'&&<span className="text-[11px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1" style={{background:'#F6EAE0',color:'#B5673A'}}><Repeat size={10}/> Abonnement</span>}</div>
            <div className="text-sm text-muted">{o.customer.name} · {o.customer.phone} · {o.customer.city}, {o.customer.gov}</div>
            <div className="text-xs text-muted">{o.customer.address}{o.customer.notes&&` · 📝 ${o.customer.notes}`}</div>
            <div className="text-xs text-muted mt-1">{o.items.map(i=>`${i.name} ×${i.qty} (${i.size})`).join(' · ')}{o.promoCode&&<span style={{color:'#10B981'}}> · 🏷️ {o.promoCode} −{o.discount} {CUR}</span>}</div></div>
          <div className="text-right"><div className="serif text-xl font-bold" style={{color:'#B5673A'}}>{o.total} {CUR}</div><div className="text-[11px] text-muted">{o.payment}</div>
            {o.status!=='Livrée'&&<button onClick={()=>{updateOrder(o.id,x=>x.status=NEXT[x.status]);f(n=>n+1)}} className="mt-2 text-xs font-semibold px-3 py-1.5 rounded-full text-white" style={{background:'#2A211B'}}>→ {NEXT[o.status]}</button>}</div>
        </div></div>))}</div>}
  </div></div>)
}
