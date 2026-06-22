const PASS="kogia";
function login(){ const v=document.getElementById("pass").value.trim().toLowerCase();
  if(v===PASS){ sessionStorage.setItem("kogia_auth","1"); showDash(); } else toast("Wrong passcode"); }
function logout(){ sessionStorage.removeItem("kogia_auth"); location.reload(); }
function showDash(){ document.getElementById("gate").style.display="none"; document.getElementById("shell").style.display="flex"; init(); }
function loadExpenses(){ const s=localStorage.getItem("kogia_expenses"); if(s) return JSON.parse(s);
  localStorage.setItem("kogia_expenses",JSON.stringify(SEED_EXPENSES)); return [...SEED_EXPENSES]; }
function saveExpenses(a){ localStorage.setItem("kogia_expenses",JSON.stringify(a)); }
let expenses=[]; const catOf=c=>EXPENSE_CATEGORIES.find(x=>x.code===c)||{label:c,color:"#888"};
const fmt=n=>n.toLocaleString("en-US");
function renderKPIs(){ const te=expenses.reduce((s,e)=>s+e.amount,0), ts=SEED_SALES.reduce((s,e)=>s+e.amount,0), net=ts-te;
  const me=expenses.filter(e=>e.date.startsWith("2026-06")).reduce((s,e)=>s+e.amount,0);
  const k=[{l:"Total expenses",v:fmt(te)+" DT",s:expenses.length+" entries",c:""},{l:"Total sales",v:fmt(ts)+" DT",s:"recorded",c:"pos"},
    {l:"Net",v:(net<0?"−":"")+fmt(Math.abs(net))+" DT",s:net<0?"investment phase":"in profit",c:net<0?"neg":"pos"},{l:"This month",v:fmt(me)+" DT",s:"June 2026 spend",c:""}];
  document.getElementById("kpis").innerHTML=k.map(x=>`<div class="kpi"><div class="k-label">${x.l}</div><div class="k-val ${x.c}">${x.v}</div><div class="k-sub">${x.s}</div></div>`).join(""); }
function renderCatBars(){ const t={}; expenses.forEach(e=>t[e.category]=(t[e.category]||0)+e.amount);
  const g=Object.values(t).reduce((a,b)=>a+b,0)||1;
  const rows=EXPENSE_CATEGORIES.map(c=>({...c,amount:t[c.code]||0})).filter(c=>c.amount>0).sort((a,b)=>b.amount-a.amount);
  document.getElementById("expTotalLabel").textContent=fmt(g)+" DT total";
  document.getElementById("catBars").innerHTML=rows.map(c=>{const p=Math.round(c.amount/g*100);
    return `<div class="catbar"><div class="cb-top"><b>${c.label}</b><span>${fmt(c.amount)} DT · ${p}%</span></div><div class="track"><div class="fill" style="width:${p}%;background:${c.color}"></div></div></div>`;}).join(""); }
function renderExpTable(){ const s=[...expenses].sort((a,b)=>b.date.localeCompare(a.date));
  document.getElementById("expCount").textContent=expenses.length+" entries";
  document.getElementById("expBody").innerHTML=s.map(e=>{const c=catOf(e.category);
    return `<tr><td>${e.date}</td><td>${e.desc}</td><td><span class="pill" style="background:${c.color}">${c.label}</span></td><td class="amt">${fmt(e.amount)} DT</td><td><button class="del" onclick="delExpense('${e.date}','${encodeURIComponent(e.desc)}',${e.amount})">🗑</button></td></tr>`;}).join(""); }
function renderSales(){ document.getElementById("salesBody").innerHTML=SEED_SALES.slice().sort((a,b)=>b.date.localeCompare(a.date))
    .map(s=>`<tr><td>${s.date}</td><td>${s.item} <span style="color:var(--mute)">×${s.qty}</span></td><td class="amt">${fmt(s.amount)} DT</td></tr>`).join(""); }
function addExpense(ev){ ev.preventDefault();
  const e={date:document.getElementById("f-date").value,desc:document.getElementById("f-desc").value.trim(),category:document.getElementById("f-cat").value,amount:Number(document.getElementById("f-amt").value)};
  if(!e.date||!e.desc||!e.amount){toast("Fill all fields");return;} expenses.push(e); saveExpenses(expenses); renderAll(); ev.target.reset(); setDefaultDate(); toast(`Added: ${e.desc} (${fmt(e.amount)} DT)`); }
function delExpense(d,de,a){ const desc=decodeURIComponent(de); const i=expenses.findIndex(e=>e.date===d&&e.desc===desc&&e.amount===a);
  if(i>-1){expenses.splice(i,1);saveExpenses(expenses);renderAll();toast("Expense deleted");} }
function fillCategorySelect(){ document.getElementById("f-cat").innerHTML=EXPENSE_CATEGORIES.map(c=>`<option value="${c.code}">${c.label}</option>`).join(""); }
function setDefaultDate(){ document.getElementById("f-date").value="2026-06-22"; }
let tt; function toast(m){ const t=document.getElementById("toast"); t.textContent=m; t.style.transform="translateX(-50%) translateY(0)"; clearTimeout(tt); tt=setTimeout(()=>t.style.transform="translateX(-50%) translateY(160%)",2200); }
function renderAll(){ renderKPIs(); renderCatBars(); renderExpTable(); renderSales(); }
function init(){ expenses=loadExpenses(); fillCategorySelect(); setDefaultDate(); renderAll(); }
if(sessionStorage.getItem("kogia_auth")==="1") showDash();
