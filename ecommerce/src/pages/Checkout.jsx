import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Wallet, Truck, ShieldCheck, CalendarCheck } from 'lucide-react'
import { loadCart, saveCart, addOrder } from '../store.js'
import { GOUVERNORATS, CITIES, CUR, DELIVERY, PRODUCTS } from '../data.js'
import { ProductImg } from '../marks.jsx'
import toast from 'react-hot-toast'
const etaDate=()=> new Date(Date.now()+3*86400000).toLocaleDateString('fr-FR',{weekday:'long',day:'numeric',month:'long'})
export default function Checkout(){
  const nav=useNavigate(); const cart=loadCart()
  const [f,setF]=useState({name:'',phone:'',gov:'Tunis',city:'Tunis',address:'',notes:''})
  const sub=cart.reduce((s,i)=>s+i.price*i.qty,0); const fee=sub>=DELIVERY.freeOver?0:DELIVERY.fee; const total=sub+fee
  if(cart.length===0) return <Empty nav={nav}/>
  const setGov=g=>setF({...f,gov:g,city:(CITIES[g]||[g])[0]})
  const submit=()=>{
    if(!f.name.trim()||!f.phone.trim()||!f.address.trim()) return toast.error('Veuillez remplir nom, téléphone et adresse')
    if(!/^[+\d][\d\s]{6,}$/.test(f.phone.trim())) return toast.error('Numéro de téléphone invalide')
    const id='CMD-'+Date.now().toString().slice(-6)
    addOrder({id,at:Date.now(),customer:f,items:cart,subtotal:sub,deliveryFee:fee,total,eta:etaDate(),payment:'Paiement à la livraison',status:'En attente'})
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
          <L label="Gouvernorat *"><S value={f.gov} onChange={e=>setGov(e.target.value)}>{GOUVERNORATS.map(g=><option key={g}>{g}</option>)}</S></L>
          <L label="Ville / Délégation *"><S value={f.city} onChange={e=>setF({...f,city:e.target.value})}>{(CITIES[f.gov]||[f.gov]).map(c=><option key={c}>{c}</option>)}</S></L>
          <div className="sm:col-span-2"><L label="Adresse complète *"><I value={f.address} onChange={e=>setF({...f,address:e.target.value})} placeholder="Rue, immeuble, code postal…"/></L></div>
          <div className="sm:col-span-2"><L label="Notes (optionnel)"><textarea value={f.notes} onChange={e=>setF({...f,notes:e.target.value})} className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm h-20" placeholder="Instructions de livraison…"/></L></div>
        </div>
        <button onClick={submit} className="w-full rounded-full py-3.5 mt-5 font-semibold text-white" style={{background:'#B5673A'}}>Confirmer · {total} {CUR} à la livraison</button>
        <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-muted"><span className="flex items-center gap-1"><ShieldCheck size={12}/> Sans paiement en ligne</span><span className="flex items-center gap-1"><Truck size={12}/> 24 gouvernorats</span></div>
      </div>
      <div className="card p-6 h-fit">
        <h3 className="serif text-lg font-bold mb-3">Votre commande</h3>
        <div className="space-y-3">{cart.map(i=>{const p=PRODUCTS.find(x=>x.id===i.id);return(<div key={i.key} className="flex items-center gap-2 text-sm"><ProductImg p={p} size={36} radius={10}/><span className="flex-1 text-muted">{i.name} <b className="text-ink">×{i.qty}</b> <span className="text-xs">({i.size})</span></span><span className="font-semibold">{i.price*i.qty} {CUR}</span></div>)})}</div>
        <div className="border-t border-line mt-3 pt-3 space-y-1 text-sm">
          <div className="flex justify-between text-muted"><span>Sous-total</span><span>{sub} {CUR}</span></div>
          <div className="flex justify-between text-muted"><span>Livraison</span><span>{fee===0?'Gratuite ✓':fee+' '+CUR}</span></div>
          <div className="flex justify-between pt-1"><span className="font-semibold">Total</span><b className="serif text-xl" style={{color:'#B5673A'}}>{total} {CUR}</b></div>
        </div>
        <div className="text-xs text-muted mt-3 flex items-center gap-1.5 bg-cream rounded-lg p-2"><CalendarCheck size={13}/> Livraison estimée : <b className="text-ink">{etaDate()}</b></div>
      </div>
    </div>
  </div></div>)
}
const L=({label,children})=><label className="block"><span className="text-xs font-semibold text-muted">{label}</span><div className="mt-1">{children}</div></label>
const I=p=><input {...p} className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm"/>
const S=p=><select {...p} className="w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm">{p.children}</select>
const Empty=({nav})=><div className="min-h-screen grid place-items-center"><div className="text-center"><div className="text-5xl mb-3">🛒</div><p className="text-muted mb-4">Votre panier est vide.</p><button onClick={()=>nav('/')} className="rounded-full px-6 py-3 font-semibold text-white" style={{background:'#B5673A'}}>Retour à la boutique</button></div></div>
