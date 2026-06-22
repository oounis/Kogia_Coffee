import { HashRouter, Routes, Route } from 'react-router-dom'
import Storefront from './pages/Storefront.jsx'
import Owner from './pages/Owner.jsx'
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Storefront/>} />
        <Route path="/owner" element={<Owner/>} />
      </Routes>
    </HashRouter>
  )
}
