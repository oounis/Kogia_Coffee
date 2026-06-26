const CK="kogiacoffee_cart", OK="kogiacoffee_orders"
export const loadCart=()=>{try{return JSON.parse(localStorage.getItem(CK)||"[]")}catch{return[]}}
export const saveCart=c=>localStorage.setItem(CK,JSON.stringify(c))
export const loadOrders=()=>{try{return JSON.parse(localStorage.getItem(OK)||"[]")}catch{return[]}}
export const addOrder=o=>{const a=loadOrders();a.unshift(o);localStorage.setItem(OK,JSON.stringify(a));return o}
export const updateOrder=(id,fn)=>{const a=loadOrders();const o=a.find(x=>x.id===id);if(o){fn(o);localStorage.setItem(OK,JSON.stringify(a))}}
const NK="kogiacoffee_newsletter"
export const loadNewsletter=()=>{try{return JSON.parse(localStorage.getItem(NK)||"[]")}catch{return[]}}
export const addNewsletter=email=>{const a=loadNewsletter();if(a.includes(email))return false;a.push(email);localStorage.setItem(NK,JSON.stringify(a));return true}
