/* ============================================================
   Kogia Coffee — storefront logic (v2)
   Visuals come from blendArt()/blendThumb() in data.js (SVG, no photos).
   ============================================================ */
const SIZES = ["250g","500g","1kg"];
let cart = JSON.parse(localStorage.getItem("kogia_cart") || "[]");
const selectedSize = {};

function meterRow(label,val){
  let bars=""; for(let i=1;i<=5;i++) bars+=`<i class="${i<=val?'on':''}"></i>`;
  return `<div class="meter-row"><span class="label">${label}</span><span class="bars">${bars}</span></div>`;
}

/* ---- hero + story art (generated) ---- */
function renderFeatureArt(){
  const hero = PRODUCTS.find(p=>p.bestseller) || PRODUCTS[0];
  const heroEl = document.getElementById("heroArt");
  if(heroEl) heroEl.insertAdjacentHTML("afterbegin", blendArt(hero, 560));
  const story = PRODUCTS.find(p=>p.id==="khaleeji") || PRODUCTS[2];
  const storyEl = document.getElementById("storyArt");
  if(storyEl) storyEl.innerHTML = blendArt(story, 460);
}

/* ---- product cards ---- */
function renderProducts(){
  const grid=document.getElementById("productGrid");
  grid.innerHTML = PRODUCTS.map(p=>{
    selectedSize[p.id]=selectedSize[p.id]||"250g";
    const tagClass=p.premium?"card-tag gold":"card-tag";
    const tagText=p.bestseller?"★ Bestseller":p.tag;
    const sizeBtns=SIZES.map(s=>`<button class="${selectedSize[p.id]===s?'active':''}" onclick="pickSize('${p.id}','${s}')">${s}</button>`).join("");
    return `
    <article class="card reveal">
      <div class="card-art">${blendArt(p,300)}<span class="${tagClass}">${tagText}</span></div>
      <div class="card-body">
        <div class="ar">${p.arabic}</div>
        <h3>${p.name}</h3>
        <div class="profile">${p.profile} · ${p.roast}</div>
        <div class="meter">
          ${meterRow("Body",p.meter.body)}${meterRow("Spice",p.meter.spice)}
          ${meterRow("Sweet",p.meter.sweet)}${meterRow("Aroma",p.meter.aroma)}
        </div>
        <div class="sizes" id="sizes-${p.id}">${sizeBtns}</div>
        <div class="card-foot">
          <div class="price" id="price-${p.id}">${p.prices[selectedSize[p.id]]} <small>${CURRENCY}</small></div>
          <button class="btn btn-primary" onclick="addToCart('${p.id}')">Add</button>
        </div>
      </div>
    </article>`;
  }).join("");
  observeReveals();
}

function pickSize(id,size){
  selectedSize[id]=size;
  const p=PRODUCTS.find(x=>x.id===id);
  document.getElementById(`price-${id}`).innerHTML=`${p.prices[size]} <small>${CURRENCY}</small>`;
  document.querySelectorAll(`#sizes-${id} button`).forEach(b=>b.classList.toggle("active",b.textContent===size));
}

/* ---- cart ---- */
function addToCart(id){
  const size=selectedSize[id]||"250g", key=`${id}_${size}`;
  const ex=cart.find(c=>c.key===key);
  if(ex) ex.qty++;
  else{ const p=PRODUCTS.find(x=>x.id===id); cart.push({key,id,size,name:p.name,price:p.prices[size],qty:1}); }
  saveCart(); renderCart(); toast(`Added ${PRODUCTS.find(x=>x.id===id).name} (${size})`);
}
function changeQty(key,d){
  const it=cart.find(c=>c.key===key); if(!it) return;
  it.qty+=d; if(it.qty<=0) cart=cart.filter(c=>c.key!==key);
  saveCart(); renderCart();
}
function saveCart(){
  localStorage.setItem("kogia_cart",JSON.stringify(cart));
  document.getElementById("cartCount").textContent=cart.reduce((s,c)=>s+c.qty,0);
}
function cartTotal(){ return cart.reduce((s,c)=>s+c.price*c.qty,0); }
function renderCart(){
  const box=document.getElementById("cartItems");
  if(!cart.length) box.innerHTML=`<div class="cart-empty">Your bag is empty.<br>Go taste a blend ☕</div>`;
  else box.innerHTML=cart.map(c=>{
    const p=PRODUCTS.find(x=>x.id===c.id);
    return `<div class="cart-item">${blendThumb(p)}
      <div class="ci-main"><b>${c.name}</b><br><span>${c.size} · ${c.price} ${CURRENCY}</span>
        <div class="qty"><button onclick="changeQty('${c.key}',-1)">−</button><span>${c.qty}</span><button onclick="changeQty('${c.key}',1)">+</button></div>
      </div>
      <div style="font-family:var(--serif);font-weight:700;color:var(--gold)">${c.price*c.qty} ${CURRENCY}</div>
    </div>`;
  }).join("");
  document.getElementById("cartTotal").textContent=`${cartTotal()} ${CURRENCY}`;
  saveCart();
}
function openCart(){ document.getElementById("drawer").classList.add("open"); document.getElementById("overlay").classList.add("open"); }
function closeCart(){ document.getElementById("drawer").classList.remove("open"); document.getElementById("overlay").classList.remove("open"); }
function checkout(){
  if(!cart.length){ toast("Your bag is empty"); return; }
  toast(`Order placed — ${cartTotal()} ${CURRENCY}. Shukran! 🤎`);
  cart=[]; saveCart(); renderCart(); closeCart();
}

/* ---- toast ---- */
let toastTimer;
function toast(msg){
  const t=document.getElementById("toast"); t.textContent=msg; t.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>t.classList.remove("show"),2200);
}

/* ---- scroll reveal ---- */
let io;
function observeReveals(){
  io=io||new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  },{threshold:.12});
  document.querySelectorAll(".reveal:not(.in)").forEach(el=>io.observe(el));
}

/* ---- init ---- */
renderFeatureArt();
renderProducts();
renderCart();
observeReveals();
