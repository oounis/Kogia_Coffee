import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle2, Wallet, MapPin, CalendarCheck, MessageCircle, Repeat, PackageSearch } from 'lucide-react'
import { loadOrders } from '../store.js'
import { CUR, WHATSAPP } from '../data.js'
import { ProductImg } from '../marks.jsx'
export default function Confirm(){
  const {id}=useParams(); const nav=useNavigate(); const o=loadOrders().find(x=>x.id===id)
  if(!o) return <div className="min-h-screen grid place-items-center text-muted">Commande introuvable.</div>
  // Résumé WhatsApp pré-rempli (français)
  const lines=o.items.map(i=>`• ${i.name} ×${i.qty} (${i.size})${i.sub?' ↻ '+i.freqLabel:''} — ${i.price*i.qty} ${CUR}`).join('\n')
  const promoLine=o.discount>0?`\nRemise (${o.promoCode}) : −${o.discount} ${CUR}`:''
  const msg=`Bonjour Kogia Coffee ☕\nJe confirme ma commande *${o.id}* :\n${lines}${promoLine}\n\nLivraison : ${o.deliveryFee===0?'Gratuite':o.deliveryFee+' '+CUR}\n*Total à payer à la livraison : ${o.total} ${CUR}*\n\nNom : ${o.customer.name}\nTéléphone : ${o.customer.phone}\nAdresse : ${o.customer.address}, ${o.customer.city}, ${o.customer.gov}${o.customer.notes?`\nNotes : ${o.customer.notes}`:''}`
  const waLink=`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`
  return (<div className="bg-ambient min-h-screen grid place-items-center p-6"><div className="card p-8 max-w-[560px] w-full text-center pop">
    <div className="w-16 h-16 rounded-full grid place-items-center text-white mx-auto" style={{background:'#B5673A'}}><CheckCircle2 size={32}/></div>
    <h1 className="serif text-2xl font-extrabold mt-4">Merci pour votre commande !</h1>
    <p className="text-muted mt-1">Commande <b className="text-ink">{o.id}</b> confirmée. Nous vous appellerons pour la livraison.</p>
    <div className="rounded-2xl p-4 mt-5 text-left" style={{background:'#F6EAE0'}}>
      <div className="flex items-center gap-2 font-semibold" style={{color:'#B5673A'}}><Wallet size={16}/> Vous paierez {o.total} {CUR} en espèces à la livraison</div>
      <div className="text-sm text-muted mt-2 flex items-start gap-2"><MapPin size={15} className="mt-0.5"/> {o.customer.name} · {o.customer.phone}</div>
      <div className="text-sm text-muted ml-6">{o.customer.address}, {o.customer.city}, {o.customer.gov}</div>
      {o.eta&&<div className="text-sm text-muted mt-2 flex items-center gap-2"><CalendarCheck size={15}/> Livraison estimée : <b className="text-ink">{o.eta}</b></div>}
    </div>
    {o.type==='Abonnement'&&<div className="mt-4 text-left text-sm flex items-start gap-2 rounded-xl p-3" style={{background:'#F6EAE0',color:'#8C5A33'}}><Repeat size={15} className="mt-0.5 shrink-0"/> Votre <b>abonnement</b> est actif. Vous serez livré automatiquement à la fréquence choisie, et payez à chaque livraison. Annulable à tout moment.</div>}
    <div className="mt-4 text-left text-sm space-y-2">{o.items.map(i=>(<div key={i.key} className="flex items-center gap-2"><ProductImg p={i} size={30} radius={9}/><span className="flex-1 text-muted">{i.name} ×{i.qty} ({i.size})</span><span>{i.price*i.qty} {CUR}</span></div>))}
      {o.discount>0&&<div className="flex justify-between pt-1 border-t border-line/60" style={{color:'#10B981'}}><span>Remise ({o.promoCode})</span><span>−{o.discount} {CUR}</span></div>}
      <div className={`flex justify-between text-muted ${o.discount>0?'':'pt-1 border-t border-line/60'}`}><span>Livraison</span><span>{o.deliveryFee===0?'Gratuite':o.deliveryFee+' '+CUR}</span></div></div>

    <a href={waLink} target="_blank" rel="noopener noreferrer" className="w-full rounded-full py-3 mt-6 font-semibold text-white inline-flex items-center justify-center gap-2" style={{background:'#25D366'}}><MessageCircle size={18}/> Confirmer via WhatsApp</a>
    <p className="text-[11px] text-muted mt-2">Recevez un suivi instantané — votre commande est déjà enregistrée.</p>
    <div className="flex gap-2 mt-3"><button onClick={()=>nav('/suivi')} className="flex-1 rounded-full py-3 font-semibold inline-flex items-center justify-center gap-2 bg-white border border-line"><PackageSearch size={16}/> Suivre</button><button onClick={()=>nav('/')} className="flex-1 rounded-full py-3 font-semibold text-white" style={{background:'#B5673A'}}>Boutique</button></div>
  </div></div>)
}
