import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle2, Wallet, MapPin } from 'lucide-react'
import { loadOrders } from '../store.js'
import { CUR as C } from '../data.js'
export default function Confirm(){
  const {id}=useParams(); const nav=useNavigate(); const o=loadOrders().find(x=>x.id===id)
  if(!o) return <div className="min-h-screen grid place-items-center text-muted">Commande introuvable.</div>
  return (<div className="bg-ambient min-h-screen grid place-items-center p-6"><div className="card p-8 max-w-[560px] w-full text-center pop">
    <div className="w-16 h-16 rounded-full grid place-items-center text-white mx-auto" style={{background:'#B5673A'}}><CheckCircle2 size={32}/></div>
    <h1 className="serif text-2xl font-extrabold mt-4">Merci pour votre commande !</h1>
    <p className="text-muted mt-1">Commande <b className="text-ink">{o.id}</b> confirmée. Nous vous appelons pour la livraison.</p>
    <div className="rounded-2xl p-4 mt-5 text-left" style={{background:'#F6EAE0'}}>
      <div className="flex items-center gap-2 font-semibold" style={{color:'#B5673A'}}><Wallet size={16}/> Vous paierez {o.total} {C} en espèces à la livraison</div>
      <div className="text-sm text-muted mt-2 flex items-start gap-2"><MapPin size={15} className="mt-0.5"/> {o.customer.name} · {o.customer.phone}<br/></div>
      <div className="text-sm text-muted ml-6">{o.customer.address}, {o.customer.gov}</div>
    </div>
    <div className="mt-4 text-left text-sm space-y-1">{o.items.map(i=><div key={i.key} className="flex justify-between"><span className="text-muted">{i.name} ×{i.qty} ({i.size})</span><span>{i.price*i.qty} {C}</span></div>)}</div>
    <button onClick={()=>nav('/')} className="w-full rounded-full py-3 mt-6 font-semibold text-white" style={{background:'#B5673A'}}>Retour à la boutique</button>
  </div></div>)
}
