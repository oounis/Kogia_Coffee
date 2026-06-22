import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { LayoutGrid, Wallet, Receipt, Store, LogOut, Plus, Trash2, Download, TrendingUp, TrendingDown } from 'lucide-react'
import { EXPENSE_CATEGORIES, SEED_EXPENSES, SEED_SALES, CURRENCY } from '../data.js'

const fmt = (n) => n.toLocaleString('en-US')
const catOf = (c) => EXPENSE_CATEGORIES.find(x => x.code === c) || { label: c, color: '#999' }
const load = () => { const s = localStorage.getItem('kogia_expenses'); if (s) return JSON.parse(s); localStorage.setItem('kogia_expenses', JSON.stringify(SEED_EXPENSES)); return [...SEED_EXPENSES] }

/* ---------- Login gate ---------- */
function Gate({ onOk }) {
  const [v, setV] = useState(''); const [err, setErr] = useState(false)
  const submit = () => { if (v.trim().toLowerCase() === 'kogia') { sessionStorage.setItem('kogia_auth','1'); onOk() } else setErr(true) }
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-cream bg-ambient">
      <div className="bg-foam border border-latte rounded-3xl p-10 w-[min(380px,90vw)] text-center shadow-[0_30px_70px_-25px_rgba(70,46,28,.45)]">
        <div className="w-16 h-16 rounded-full grid place-items-center text-white text-2xl mx-auto mb-4 font-ar bg-gradient-to-br from-caramel to-caramel-dark">ك</div>
        <h2 className="font-serif text-2xl">Owner access</h2>
        <p className="text-mute text-sm mb-5">Kogia Coffee — private management</p>
        <input type="password" value={v} onChange={e=>{setV(e.target.value);setErr(false)}} onKeyDown={e=>e.key==='Enter'&&submit()}
          placeholder="passcode" className={`w-full text-center tracking-[.25em] rounded-xl border px-4 py-3 mb-3 bg-cream outline-none ${err?'border-clay':'border-latte focus:border-caramel'}`} />
        <button onClick={submit} className="w-full rounded-full py-3 font-semibold text-white bg-gradient-to-br from-caramel to-caramel-dark hover:-translate-y-0.5 transition">Enter dashboard</button>
        <div className="text-xs text-mute mt-4">Demo passcode: <b>kogia</b> · <Link to="/" className="text-caramel">← back to shop</Link></div>
      </div>
    </div>
  )
}

/* ---------- KPI ---------- */
function Kpi({ label, value, sub, tone }) {
  return (
    <div className="bg-foam border border-latte rounded-2xl p-5 shadow-[0_10px_30px_-22px_rgba(70,46,28,.3)]">
      <div className="text-[11px] uppercase tracking-wider font-semibold text-mute">{label}</div>
      <div className={`font-serif text-3xl font-bold mt-1 ${tone==='neg'?'text-clay':tone==='pos'?'text-sage':''}`}>{value}</div>
      <div className="text-xs text-mute mt-0.5">{sub}</div>
    </div>
  )
}

export default function Owner() {
  const [authed, setAuthed] = useState(sessionStorage.getItem('kogia_auth') === '1')
  const [expenses, setExpenses] = useState(load)
  const [form, setForm] = useState({ date: '2026-06-22', desc: '', category: 'RAW', amount: '' })
  const [active, setActive] = useState('overview')
  useEffect(() => { localStorage.setItem('kogia_expenses', JSON.stringify(expenses)) }, [expenses])

  const totalExp = expenses.reduce((s,e)=>s+e.amount,0)
  const totalSales = SEED_SALES.reduce((s,e)=>s+e.amount,0)
  const net = totalSales - totalExp

  const byCat = useMemo(() => {
    const t = {}; expenses.forEach(e => t[e.category] = (t[e.category]||0)+e.amount)
    return EXPENSE_CATEGORIES.map(c => ({ name:c.label, code:c.code, value:t[c.code]||0, color:c.color })).filter(c => c.value>0).sort((a,b)=>b.value-a.value)
  }, [expenses])
  const salesData = SEED_SALES.map(s => ({ name: s.item.length>14 ? s.item.slice(0,13)+'…' : s.item, amount: s.amount }))

  const add = (e) => { e.preventDefault(); if(!form.desc||!form.amount) return
    setExpenses(x => [...x, { ...form, amount: Number(form.amount) }]); setForm({ date:form.date, desc:'', category:form.category, amount:'' }) }
  const del = (idx) => setExpenses(x => x.filter((_,i)=>i!==idx))
  const exportCSV = () => {
    const rows = [['date','category','description','amount'], ...expenses.map(e=>[e.date,e.category,e.desc,e.amount])]
    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n')
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv],{type:'text/csv'})); a.download = 'kogia_expenses.csv'; a.click()
  }
  const go = (id) => { setActive(id); document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' }) }

  if (!authed) return <Gate onOk={() => setAuthed(true)} />

  const navItems = [['overview','Overview',<LayoutGrid size={17}/>],['expenses','Expenses',<Wallet size={17}/>],['sales','Sales',<Receipt size={17}/>]]
  const sorted = [...expenses].map((e,i)=>({...e,i})).sort((a,b)=>b.date.localeCompare(a.date))

  return (
    <div className="min-h-screen bg-cream bg-ambient flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-foam border-r border-latte sticky top-0 h-screen p-5">
        <div className="flex items-center gap-2 font-serif text-xl font-extrabold mb-8">
          <span className="w-8 h-8 rounded-full grid place-items-center text-white font-ar bg-gradient-to-br from-caramel to-caramel-dark">ك</span>Kogia<span className="text-caramel">.</span>
        </div>
        <nav className="flex flex-col gap-1">
          {navItems.map(([id,label,ic]) => (
            <button key={id} onClick={()=>go(id)} className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition text-left ${active===id?'bg-caramel/12 text-espresso':'text-mute hover:bg-sand'}`}>{ic} {label}</button>
          ))}
          <Link to="/" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-mute hover:bg-sand transition"><Store size={17}/> View storefront</Link>
        </nav>
        <button onClick={()=>{sessionStorage.removeItem('kogia_auth');setAuthed(false)}} className="mt-auto flex items-center gap-2 text-xs text-mute hover:text-clay"><LogOut size={14}/> Log out · Othman</button>
      </aside>

      <main className="flex-1 p-6 md:p-9 max-w-full">
        <div className="flex justify-between items-start flex-wrap gap-3 mb-7">
          <div><h1 className="font-serif text-3xl">Welcome back, Othman 👋</h1><p className="text-mute">Here's where the money is going — all by category.</p></div>
          <div className="flex gap-2">
            <button onClick={exportCSV} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-foam border border-latte hover:border-caramel transition"><Download size={15}/> Export CSV</button>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold bg-foam border border-latte hover:border-caramel transition"><Store size={15}/> Storefront</Link>
          </div>
        </div>

        {/* KPIs */}
        <section id="overview" className="scroll-mt-6 grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7">
          <Kpi label="Total expenses" value={`${fmt(totalExp)} ${CURRENCY}`} sub={`${expenses.length} entries`} />
          <Kpi label="Total sales" value={`${fmt(totalSales)} ${CURRENCY}`} sub="recorded" tone="pos" />
          <Kpi label="Net" value={`${net<0?'−':''}${fmt(Math.abs(net))} ${CURRENCY}`} sub={net<0?'investment phase':'in profit'} tone={net<0?'neg':'pos'} />
          <Kpi label="This month" value={`${fmt(expenses.filter(e=>e.date.startsWith('2026-06')).reduce((s,e)=>s+e.amount,0))} ${CURRENCY}`} sub="June 2026 spend" />
        </section>

        {/* Charts */}
        <section className="grid lg:grid-cols-2 gap-5 mb-7">
          <div className="bg-foam border border-latte rounded-2xl p-5">
            <h3 className="font-serif text-lg mb-3 flex items-center gap-2"><Wallet size={18} className="text-caramel"/> Expenses by category</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={byCat} dataKey="value" nameKey="name" innerRadius={55} outerRadius={92} paddingAngle={2} stroke="none">
                    {byCat.map((c,i) => <Cell key={i} fill={c.color}/>)}
                  </Pie>
                  <Tooltip formatter={(v)=>`${fmt(v)} ${CURRENCY}`} contentStyle={{ borderRadius:12, border:'1px solid #EADBC6', fontSize:13 }}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
              {byCat.map(c => <span key={c.code} className="flex items-center gap-1.5 text-xs text-coffee/80"><i className="w-2.5 h-2.5 rounded-full" style={{background:c.color}}/>{c.name} · {Math.round(c.value/totalExp*100)}%</span>)}
            </div>
          </div>
          <div className="bg-foam border border-latte rounded-2xl p-5">
            <h3 className="font-serif text-lg mb-3 flex items-center gap-2"><Receipt size={18} className="text-caramel"/> Recent sales</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData} margin={{ top:8, right:8, left:-18, bottom:0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EFE5D6" vertical={false}/>
                  <XAxis dataKey="name" tick={{ fontSize:10, fill:'#8A7B6B' }} interval={0} angle={-18} textAnchor="end" height={50}/>
                  <YAxis tick={{ fontSize:11, fill:'#8A7B6B' }}/>
                  <Tooltip formatter={(v)=>`${fmt(v)} ${CURRENCY}`} contentStyle={{ borderRadius:12, border:'1px solid #EADBC6', fontSize:13 }}/>
                  <Bar dataKey="amount" radius={[6,6,0,0]} fill="#C0743C"/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        {/* Add expense */}
        <section id="expenses" className="scroll-mt-6">
          <h3 className="font-serif text-xl mb-3">Add an expense</h3>
          <form onSubmit={add} className="bg-foam border border-latte rounded-2xl p-5 grid md:grid-cols-[150px_1fr_170px_130px_auto] gap-3 items-end mb-6">
            <label className="flex flex-col gap-1 text-xs font-semibold text-mute">Date<input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="rounded-lg border border-latte bg-cream px-3 py-2 text-sm outline-none focus:border-caramel"/></label>
            <label className="flex flex-col gap-1 text-xs font-semibold text-mute">Description<input value={form.desc} onChange={e=>setForm({...form,desc:e.target.value})} placeholder="e.g. Cardamom 5kg" className="rounded-lg border border-latte bg-cream px-3 py-2 text-sm outline-none focus:border-caramel"/></label>
            <label className="flex flex-col gap-1 text-xs font-semibold text-mute">Category<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="rounded-lg border border-latte bg-cream px-3 py-2 text-sm outline-none focus:border-caramel">{EXPENSE_CATEGORIES.map(c=><option key={c.code} value={c.code}>{c.label}</option>)}</select></label>
            <label className="flex flex-col gap-1 text-xs font-semibold text-mute">Amount ({CURRENCY})<input type="number" min="0" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} placeholder="0" className="rounded-lg border border-latte bg-cream px-3 py-2 text-sm outline-none focus:border-caramel"/></label>
            <button type="submit" className="inline-flex items-center justify-center gap-1.5 rounded-full px-5 h-[42px] font-semibold text-white bg-gradient-to-br from-caramel to-caramel-dark hover:-translate-y-0.5 transition"><Plus size={16}/> Add</button>
          </form>

          <div className="bg-foam border border-latte rounded-2xl p-5 overflow-x-auto">
            <h3 className="font-serif text-lg mb-3">All expenses <span className="text-sm text-mute font-sans">· {expenses.length} entries</span></h3>
            <table className="w-full text-sm border-collapse">
              <thead><tr className="text-left text-[11px] uppercase tracking-wide text-mute border-b border-latte">
                <th className="py-2 pr-3">Date</th><th className="py-2 pr-3">Description</th><th className="py-2 pr-3">Category</th><th className="py-2 pr-3 text-right">Amount</th><th></th></tr></thead>
              <tbody>
                {sorted.map(e => (
                  <tr key={e.i} className="border-b border-latte/70 hover:bg-sand/40">
                    <td className="py-2.5 pr-3 whitespace-nowrap">{e.date}</td>
                    <td className="py-2.5 pr-3">{e.desc}</td>
                    <td className="py-2.5 pr-3"><span className="text-[11px] font-bold text-white px-2.5 py-1 rounded-full" style={{background:catOf(e.category).color}}>{catOf(e.category).label}</span></td>
                    <td className="py-2.5 pr-3 text-right font-serif font-bold text-caramel whitespace-nowrap">{fmt(e.amount)} {CURRENCY}</td>
                    <td className="py-2.5"><button onClick={()=>del(e.i)} className="text-clay/70 hover:text-clay"><Trash2 size={15}/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Sales */}
        <section id="sales" className="scroll-mt-6 mt-6">
          <div className="bg-foam border border-latte rounded-2xl p-5 overflow-x-auto">
            <h3 className="font-serif text-lg mb-3 flex items-center gap-2">{net>=0?<TrendingUp size={18} className="text-sage"/>:<TrendingDown size={18} className="text-clay"/>} Sales log</h3>
            <table className="w-full text-sm border-collapse">
              <thead><tr className="text-left text-[11px] uppercase tracking-wide text-mute border-b border-latte"><th className="py-2 pr-3">Date</th><th className="py-2 pr-3">Item</th><th className="py-2 pr-3 text-right">Qty</th><th className="py-2 pr-3 text-right">Amount</th></tr></thead>
              <tbody>
                {[...SEED_SALES].sort((a,b)=>b.date.localeCompare(a.date)).map((s,i)=>(
                  <tr key={i} className="border-b border-latte/70 hover:bg-sand/40"><td className="py-2.5 pr-3 whitespace-nowrap">{s.date}</td><td className="py-2.5 pr-3">{s.item}</td><td className="py-2.5 pr-3 text-right">{s.qty}</td><td className="py-2.5 pr-3 text-right font-serif font-bold text-caramel">{fmt(s.amount)} {CURRENCY}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}
