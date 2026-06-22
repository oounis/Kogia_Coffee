/* ============================================================
   Kogia Coffee — Owner Dashboard logic
   Expenses persist in localStorage; seeded from data.js on first run.
   (Demo gate only — NOT real security. Add a real backend before
    putting the owner side on the public internet.)
   ============================================================ */

/* ---- login gate ---- */
const PASS = "kogia";
function login(){
  const v = document.getElementById("pass").value.trim().toLowerCase();
  if(v===PASS){
    sessionStorage.setItem("kogia_auth","1");
    showDash();
  } else { toast("Wrong passcode"); }
}
function logout(){ sessionStorage.removeItem("kogia_auth"); location.reload(); }
function showDash(){
  document.getElementById("gate").style.display="none";
  document.getElementById("shell").style.display="flex";
  init();
}

/* ---- data store ---- */
function loadExpenses(){
  const s = localStorage.getItem("kogia_expenses");
  if(s) return JSON.parse(s);
  localStorage.setItem("kogia_expenses", JSON.stringify(SEED_EXPENSES));
  return [...SEED_EXPENSES];
}
function saveExpenses(arr){ localStorage.setItem("kogia_expenses", JSON.stringify(arr)); }
let expenses = [];

const catOf = code => EXPENSE_CATEGORIES.find(c=>c.code===code) || {label:code,color:"#888"};
const fmt = n => n.toLocaleString("en-US");

/* ---- KPIs ---- */
function renderKPIs(){
  const totalExp = expenses.reduce((s,e)=>s+e.amount,0);
  const totalSales = SEED_SALES.reduce((s,e)=>s+e.amount,0);
  const net = totalSales - totalExp;
  const month = "2026-06";
  const monthExp = expenses.filter(e=>e.date.startsWith(month)).reduce((s,e)=>s+e.amount,0);

  const kpis = [
    { label:"Total expenses", val:`${fmt(totalExp)} DT`, sub:`${expenses.length} entries`, cls:"" },
    { label:"Total sales", val:`${fmt(totalSales)} DT`, sub:"recorded", cls:"pos" },
    { label:"Net", val:`${net<0?'−':''}${fmt(Math.abs(net))} DT`, sub: net<0?"investment phase":"in profit", cls: net<0?"neg":"pos" },
    { label:"This month", val:`${fmt(monthExp)} DT`, sub:"June 2026 spend", cls:"" }
  ];
  document.getElementById("kpis").innerHTML = kpis.map(k=>`
    <div class="kpi">
      <div class="k-label">${k.label}</div>
      <div class="k-val ${k.cls}">${k.val}</div>
      <div class="k-sub">${k.sub}</div>
    </div>`).join("");
}

/* ---- category bars ---- */
function renderCatBars(){
  const totals = {};
  expenses.forEach(e=> totals[e.category]=(totals[e.category]||0)+e.amount);
  const grand = Object.values(totals).reduce((a,b)=>a+b,0) || 1;
  const rows = EXPENSE_CATEGORIES
    .map(c=>({ ...c, amount: totals[c.code]||0 }))
    .filter(c=>c.amount>0)
    .sort((a,b)=>b.amount-a.amount);
  document.getElementById("expTotalLabel").textContent = `${fmt(grand)} DT total`;
  document.getElementById("catBars").innerHTML = rows.map(c=>{
    const pct = Math.round(c.amount/grand*100);
    return `<div class="catbar">
      <div class="cb-top"><b>${c.label}</b><span>${fmt(c.amount)} DT · ${pct}%</span></div>
      <div class="track"><div class="fill" style="width:${pct}%;background:${c.color}"></div></div>
    </div>`;
  }).join("");
}

/* ---- expense table ---- */
function renderExpTable(){
  const sorted = [...expenses].sort((a,b)=>b.date.localeCompare(a.date));
  document.getElementById("expCount").textContent = `${expenses.length} entries`;
  document.getElementById("expBody").innerHTML = sorted.map(e=>{
    const c = catOf(e.category);
    return `<tr>
      <td>${e.date}</td>
      <td>${e.desc}</td>
      <td><span class="pill" style="background:${c.color}">${c.label}</span></td>
      <td class="amt">${fmt(e.amount)} DT</td>
      <td><button class="del" title="Delete" onclick="delExpense('${e.date}','${encodeURIComponent(e.desc)}',${e.amount})">🗑</button></td>
    </tr>`;
  }).join("");
}

/* ---- sales table ---- */
function renderSales(){
  document.getElementById("salesBody").innerHTML = SEED_SALES
    .slice().sort((a,b)=>b.date.localeCompare(a.date))
    .map(s=>`<tr><td>${s.date}</td><td>${s.item} <span class="muted">×${s.qty}</span></td><td class="amt">${fmt(s.amount)} DT</td></tr>`).join("");
}

/* ---- add / delete ---- */
function addExpense(ev){
  ev.preventDefault();
  const exp = {
    date: document.getElementById("f-date").value,
    desc: document.getElementById("f-desc").value.trim(),
    category: document.getElementById("f-cat").value,
    amount: Number(document.getElementById("f-amt").value)
  };
  if(!exp.date || !exp.desc || !exp.amount){ toast("Fill all fields"); return; }
  expenses.push(exp);
  saveExpenses(expenses);
  renderAll();
  ev.target.reset();
  setDefaultDate();
  toast(`Added: ${exp.desc} (${fmt(exp.amount)} DT)`);
}
function delExpense(date,descEnc,amount){
  const desc = decodeURIComponent(descEnc);
  const i = expenses.findIndex(e=>e.date===date && e.desc===desc && e.amount===amount);
  if(i>-1){ expenses.splice(i,1); saveExpenses(expenses); renderAll(); toast("Expense deleted"); }
}

/* ---- helpers ---- */
function fillCategorySelect(){
  document.getElementById("f-cat").innerHTML = EXPENSE_CATEGORIES
    .map(c=>`<option value="${c.code}">${c.label}</option>`).join("");
}
function setDefaultDate(){ document.getElementById("f-date").value = "2026-06-22"; }

let toastTimer;
function toast(msg){
  const t=document.getElementById("toast");
  t.textContent=msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove("show"),2200);
}

function renderAll(){ renderKPIs(); renderCatBars(); renderExpTable(); renderSales(); }
function init(){
  expenses = loadExpenses();
  fillCategorySelect();
  setDefaultDate();
  renderAll();
}

/* auto-enter if already authed this session */
if(sessionStorage.getItem("kogia_auth")==="1"){ showDash(); }
