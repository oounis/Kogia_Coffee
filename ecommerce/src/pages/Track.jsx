import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, PackageSearch, Search, Wallet, MapPin, CalendarCheck, Repeat } from 'lucide-react'
import { loadOrders } from '../store.js'
import { CUR } from '../data.js'
const STEPS=['En attente','Confirmée','En livraison','Livrée']
const COL={'En attente':'#E59A12','Confirmée':'#36C5F0','En livraison':'#7C3AED','Livrée':'#10B981'}
export default function Track(){
  const nav=useNavigate(); const [q,setQ]=useState(''); const [order,setOrder]=useState(null); const [err,setErr]=useState('')
  const find=()=>{
    const v=q.trim().toUpperCase(); if(!v){setErr('Saisissez votre numéro de commande');return}
    const o=loadOrders().find(x=>x.id.toUpperCase()===v||x.id.toUpperCase()==='CMD-'+v.replace(/^CMD-/,''))
    if(!o){setOrder(null);setErr('Aucune commande trouvée avec ce numéro sur cet appareil.')}else{setErr('');setOrder(o)}
  }
  const stepIdx=order?STEPS.indexOf(order.status):-1
  return (<div className="bg-ambient min-h-screen"><div className="mx-auto w-[92vw] max-w-[680px] py-8">
    <button onClick={()=>nav('/')} className="inline-flex items-center gap-1.5 text-sm text-muted mb-5"><ArrowLeft size={16}/> Retour à la boutique</button>
    <div className="text-center mb-6"><div className="w-14 h-14 rounded-2xl grid place-items-center text-white mx-auto" style={{background:'#E8962B'}}><PackageSearch size={26}/></div>
      <h1 className="serif text-3xl font-extrabold mt-3">Suivre ma commande</h1>
      <p className="text-muted text-sm mt-1">Saisissez votre numéro de commande (ex : CMD-123456) pour voir son statut.</p></div>
    <div className="card p-5">
      <div className="flex gap-2"><div className="relative flex-1"><Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"/><input value={q} onChange={e=>{setQ(e.target.value);setErr('')}} onKeyDown={e=>e.key==='Enter'&&find()} placeholder="CMD-123456" className="w-full rounded-full border border-line bg-white pl-10 pr-4 py-3 text-sm uppercase"/></div>
        <button onClick={find} className="rounded-full px-5 py-3 font-semibold text-white" style={{background:'#E8962B'}}>Suivre</button></div>
      {err&&<div className="text-sm text-center mt-3" style={{color:'#C0533A'}}>{err}</div>}
    </div>

    {order&&<div className="card p-6 mt-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div><div className="font-bold flex items-center gap-2">{order.id} {order.type==='Abonnement'&&<span className="text-[11px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1" style={{background:'#F6EAE0',color:'#E8962B'}}><Repeat size={11}/> Abonnement</span>}</div><div className="text-xs text-muted">{new Date(order.at).toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'})}</div></div>
        <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{background:COL[order.status]}}>{order.status}</span>
      </div>

      {/* Frise de progression */}
      <div className="flex items-center mt-6 mb-2">{STEPS.map((s,i)=>(<div key={s} className="flex-1 flex items-center last:flex-none">
        <div className="flex flex-col items-center"><div className="w-8 h-8 rounded-full grid place-items-center text-white text-xs font-bold" style={{background:i<=stepIdx?'#E8962B':'#E5DCD2'}}>{i+1}</div><div className="text-[10px] mt-1 text-center w-16 leading-tight" style={{color:i<=stepIdx?'#13183A':'#8B7B6E'}}>{s}</div></div>
        {i<STEPS.length-1&&<div className="flex-1 h-1 rounded-full mx-1 -mt-4" style={{background:i<stepIdx?'#E8962B':'#E5DCD2'}}/>}
      </div>))}</div>

      <div className="rounded-2xl p-4 mt-4 text-sm" style={{background:'#F6EAE0'}}>
        <div className="flex items-center gap-2 font-semibold" style={{color:'#E8962B'}}><Wallet size={16}/> {order.status==='Livrée'?'Commande livrée et réglée':`${order.total} ${CUR} à payer à la livraison`}</div>
        <div className="text-muted mt-2 flex items-start gap-2"><MapPin size={15} className="mt-0.5"/> {order.customer.name} · {order.customer.city}, {order.customer.gov}</div>
        {order.eta&&order.status!=='Livrée'&&<div className="text-muted mt-1 flex items-center gap-2"><CalendarCheck size={15}/> Livraison estimée : <b className="text-ink">{order.eta}</b></div>}
      </div>
      <div className="mt-4 text-sm space-y-1">{order.items.map(i=>(<div key={i.key} className="flex justify-between text-muted"><span>{i.name} ×{i.qty} ({i.size})</span><span>{i.price*i.qty} {CUR}</span></div>))}</div>
    </div>}
  </div></div>)
}
