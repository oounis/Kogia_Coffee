import { lazy, Suspense, useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Store from './pages/Store.jsx'
import AmbientPlayer from './AmbientPlayer.jsx'
// Routes secondaires chargées à la demande : allège le bundle initial de la boutique
// (Orders embarque recharts, ~jamais visité par un client).
const Checkout = lazy(() => import('./pages/Checkout.jsx'))
const Confirm = lazy(() => import('./pages/Confirm.jsx'))
const Orders = lazy(() => import('./pages/Orders.jsx'))
const Track = lazy(() => import('./pages/Track.jsx'))

function ScrollToTop(){
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function Loading(){
  return (<div className="min-h-screen grid place-items-center text-muted">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-line border-t-caramel animate-spin" style={{borderTopColor:'#B5673A'}}/>
      <span className="text-sm">Chargement…</span>
    </div>
  </div>)
}

export default function App(){
  return (<HashRouter>
    <ScrollToTop/>
    <AmbientPlayer/>
    <Toaster position="top-right" toastOptions={{style:{borderRadius:'12px',fontSize:'14px'}}}/>
    <Suspense fallback={<Loading/>}>
      <Routes>
        <Route path="/" element={<Store/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/confirmation/:id" element={<Confirm/>}/>
        <Route path="/suivi" element={<Track/>}/>
        <Route path="/admin" element={<Orders/>}/>
      </Routes>
    </Suspense>
  </HashRouter>)
}
