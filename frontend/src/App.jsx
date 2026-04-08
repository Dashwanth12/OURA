import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Admin from './pages/Admin/Admin'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Browse from './pages/Browse'
import Categories from './pages/Categories'
import TrendingPage from './pages/TrendingPage'
import ProductDetail from './pages/ProductDetail'
import NotFound from './components/NotFound'
import Checkout from './pages/Checkout'
import AdminAddProduct from './pages/Admin/AdminAddProduct';
import Login from './pages/Login'

const App = () => {
  return(
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route exact path='/home' element={<Home />} />
      <Route exact path='/cart' element={<Cart />} />
      <Route exact path='/browse' element={<Browse />} />
      <Route exact path='/category/:categoryId' element={<Categories />} />
      <Route exact path='/trending' element={<TrendingPage />} />
      <Route exact path='/product/:id' element={<ProductDetail />} />
      <Route exact path='*' element={<NotFound />} />
      <Route path="/admin/add-product" element={<AdminAddProduct />} />
      <Route exact path='/checkout' element={<Checkout />} />
      <Route exact path='/admin' element={<Admin />} />
    </Routes>
    </BrowserRouter>
  )
  
}
export default App