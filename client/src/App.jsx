import React from 'react'
import { ShowProduct } from './component/product/ShowProduct'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ProductDetails } from './component/product/ProductDetails'
import { Header } from './component/Header'
import { SearchProduct } from './component/product/SearchProduct'
import { Register } from './component/user/Register'
import { Login } from './component/user/Login'
import { ToastContainer,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cart } from './component/Cart'
import { Address,} from './component/Address'
import { Checkout } from './component/Checkout'
import { OrderConfirmation } from './component/OrderConfirmation'
import { Profile } from './component/user/Profile'


export const App = () => {
  
  return (
    <>
    <Router>
      <Header/>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ShowProduct/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/order-confirmation" element={<OrderConfirmation/>}/>
        <Route path="/address" element={<Address/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/product/search/:term" element={<SearchProduct/>}/>
      </Routes>
    </Router>
    </>
  )
}
