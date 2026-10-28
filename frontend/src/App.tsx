import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import AdminProducts from './pages/AdminProducts'
import AdminOrders from './pages/AdminOrders'
import AdminInventory from './pages/AdminInventory'
import AdminCoupons from './pages/AdminCoupons'
import AdminAffiliates from './pages/AdminAffiliates'
import AdminSettings from './pages/AdminSettings'
import AffiliateRegister from './pages/AffiliateRegister'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:slug" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/inventory" element={<AdminInventory />} />
        <Route path="/admin/coupons" element={<AdminCoupons />} />
        <Route path="/admin/affiliates" element={<AdminAffiliates />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/affiliate/register" element={<AffiliateRegister />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App