import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Wallet, Truck } from 'lucide-react'
import { loadCart, saveCart, addOrder } from '../store.js'
import { GOUVERNORATS, CUR } from '../data.js'
import toast from 'react-hot-toast'
export default function Checkout(){
  const nav=useNavigate(); const cart=loadCart()
  const [f,setF]=useState({name:'',phone:'',gov:'Tunis',address:'',notes:''})
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0)
  if(cart.length===0){ return <Empty nav={nav}/> }
  const submit=()=>{
    if(!f.name.trim()||!f.phone.trim()||!f.address.trim()) return toast.error('Veuillez remplir nom, téléphone et adresse')
    const id='CMD-'+Date.now().toString().slice(-6)
    addOrder({id,at:Date.now(),customer:f,items:cart,total,payment:'Paiement à la livraison',status:'En attente'})
    saveCart([]); nav(`/confirmation/${id}`)
  }
  return (<div className="bg-ambient min-h-screen"><div className="mx-auto w-[92vw] max-w-[1000px] py-8">
    <button onClick={()=>nav('/')} className="inline-flex items-center gap-1.5 text-sm text-muted mb-5"><ArrowLeft size={16}/> Retour à la boutique</button>
    <h1 className="serif text-3xl font-extrabold mb-6">Finaliser la commande</h1>
    <div className="grid md:grid-cols-[1.3fr_.7fr] gap-6">
      <div className="card p-6">
        <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full mb-4" style={{background:'#F6EAE0',color:'#B5673A'}}><Wallet size={13}/> Paiement à la livraison — aucun paiement en ligne</div>
        <div className="grid sm:grid-cols-2 gap-3">
          <L label="Nom complet *"><I value={f.name} onChange={e=>setF({...f,name:e.target.value})} placeholder="Ex : Mohamed Ben Ali"/></L>
          <L label="Téléphone *"><I value={f.phone} onChange={e=>setF({...f,phone:e.target.value})} placeholder="+216 20 000 000"/></L>
          <L label="Gouvernorat *"><select value={f.gov} onChange={e=>setF({...f,gov:e.target.value})} className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm">{GOUVERNORATS.map(g=><option key={g}>{g}</option>)}</select></L>
          <L label="Adresse complète *"><I value={f.address} onChange={e=>setF({...f,address:e.target.value})} placeholder="Rue, ville, code postal"/></L>
          <div className="sm:col-span-2"><L label="Notes (optionnel)"><textarea value={f.notes} onChange={e=>setF({...f,notes:e.target.value})} className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm h-20" placeholder="Instructions de livraison…"/></L></div>
        </div>
        <button onClick={submit} className="w-full rounded-full py-3.5 mt-5 font-semibold text-white" style={{background:'#B5673A'}}>Confirmer la commande · {total} {CUR} à la livraison</button>
      </div>
      <div className="card p-6 h-fit">
        <h3 className="serif text-lg font-bold mb-3">Votre commande</h3>
        <div className="space-y-2">{cart.map(i=>(<div key={i.key} className="flex justify-between text-sm"><span className="text-muted">{i.name} <b className="text-ink">×{i.qty}</b> <span className="text-xs">({i.size})</span></span><span className="font-semibold">{i.price*i.qty} {CUR}</span></div>))}</div>
        <div className="border-t border-line mt-3 pt-3 flex justify-between"><span className="font-semibold">Total</span><b className="serif text-xl" style={{color:'#B5673A'}}>{total} {CUR}</b></div>
        <div className="text-xs text-muted mt-3 flex items-center gap-1.5"><Truck size={13}/> Livraison 2–4 jours · 24 gouvernorats</div>
      </div>
    </div>
  </div></div>)
}
const L=({label,children})=><label className="block"><span className="text-xs font-semibold text-muted">{label}</span><div className="mt-1">{children}</div></label>
const I=p=><input {...p} className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm"/>
const Empty=({nav})=><div className="min-h-screen grid place-items-center"><div className="text-center"><div className="text-5xl mb-3">🛒</div><p className="text-muted mb-4">Votre panier est vide.</p><button onClick={()=>nav('/')} className="rounded-full px-6 py-3 font-semibold text-white" style={{background:'#B5673A'}}>Retour à la boutique</button></div></div>
