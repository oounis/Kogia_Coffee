import { HashRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Store from './pages/Store.jsx'
import Checkout from './pages/Checkout.jsx'
import Confirm from './pages/Confirm.jsx'
import Orders from './pages/Orders.jsx'
export default function App(){
  return (<HashRouter>
    <Toaster position="top-right" toastOptions={{style:{borderRadius:'12px',fontSize:'14px'}}}/>
    <Routes>
      <Route path="/" element={<Store/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/confirmation/:id" element={<Confirm/>}/>
      <Route path="/admin" element={<Orders/>}/>
    </Routes>
  </HashRouter>)
}
