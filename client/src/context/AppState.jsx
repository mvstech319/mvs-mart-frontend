import React, { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
import { toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppState = (props) => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [cart, setCart] = useState({ items: [] });
  const [reload, setReload] = useState(false);
  const [userAddress, setUserAddress] = useState([]);

  const url ="https://mvs-mart.onrender.com";

  // ✅ Fetch Products
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${url}/product/get`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setProducts(res.data.products);
    } catch (error) {
      toast.error("Failed to fetch products!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      console.error("Error fetching products:", error.response?.data || error.message);
    }
  };

  // ✅ Fetch User Profile
  const profile = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${url}/user/profile`, {
        headers: { "Content-Type": "application/json", Auth: token },
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error) {
      console.error("Error fetching user profile:", error.response?.data || error.message);
    }
  };

  // ✅ Fetch User Cart
  const userCart = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${url}/cart/user`, {
        headers: { "Content-Type": "application/json", Auth: token },
        withCredentials: true,
      });
      setCart(res.data.cart || { items: [] });
    } catch (error) {
      console.error("Error fetching user cart:", error.response?.data || error.message);
    }
  };

  // ✅ Fetch User Address
  const getAddress = async () => {
    if (!token) {
      toast.error("You need to log in first!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    try {
      const res = await axios.get(`${url}/address/get`, {
        headers: { "Content-Type": "application/json", Auth: token },
        withCredentials: true,
      });
      setUserAddress(res.data.userAddress);
    } catch (error) {
      console.error("Error fetching address:", error.response?.data || error.message);
    }
  };

  // ✅ add User Address
  const addAddress = async (
    fullName,
    address,
    city,
    state,
    pincode,
    country,
    phoneNumber
  ) => {
    if (!token) {
      toast.error("You need to log in first!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    try {
      const res = await axios.post(`${url}/address/add`, {
        fullName,
        address,
        city,
        state,
        pincode,
        country,
        phoneNumber
      }, {
        headers: { "Content-Type": "application/json", Auth: token },
        withCredentials: true,
      });
    const result = await res;
    return result;
    } catch (error) {
      console.error("Error during Add address:", error.response?.data || error.message);
    }
  };

  // ✅ Register User
  const register = async (name, email, password) => {
    try {
      const res = await axios.post(`${url}/user/register`, { name, email, password }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      toast.success(res.data.message || "Registration successful!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      return res.data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  // ✅ Login User
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${url}/user/login`, { email, password }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setToken(res.data.token);
      setIsAuthenticated(true);
      localStorage.setItem('token', res.data.token);
      setReload(!reload);
      toast.success(res.data.message || "Login successful!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      const result=res;
      return result;
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  // ✅ Logout User
  const logout = () => {
    setUser(null);
    setToken(null);
    setCart({ items: [] });
    setUserAddress([]);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
      transition: Bounce,
    });
  };

  // ✅ Add to Cart
  const addToCart = async (productId, title, price, qty, imgSrc) => {
    if (!token) {
      toast.error("You need to log in first!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    try {
      await axios.post(`${url}/cart/add`, { productId, title, price, qty, imgSrc }, {
        headers: { "Content-Type": "application/json", Auth: token },
        withCredentials: true,
      });
      setReload(!reload);
      toast.success("Item added to cart!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Failed to add to cart!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  // ✅ Clear Cart
  const clearCart = async () => {
    if (!token) return;
    try {
      await axios.delete(`${url}/cart/clear`, {
        headers: { "Content-Type": "application/json", Auth: token },
        withCredentials: true,
      });
      setCart({ items: [] });
    } catch (error) {
      console.error("Error clearing cart:", error.response?.data || error.message);
    }
  };

  // ✅ Remove Item from Cart
  const removeCart = async (productId) => {
    if (!token) {
      toast.error("You need to log in first!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    try {
      await axios.delete(`${url}/cart/remove/${productId}`, {
        headers: { "Content-Type": "application/json", Auth: token },
        withCredentials: true,
      });
      setReload(!reload);
      toast.success("Item removed from cart!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Failed to remove item from cart!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      console.error("Error removing item from cart:", error.response?.data || error.message);
    }
  };

  // ✅ Decrease Item Quantity in Cart
  const decreaseQty = async (productId, qty) => {
    if (!token) {
      toast.error("You need to log in first!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    try {
      await axios.post(`${url}/cart/--qty`, { productId, qty }, {
        headers: { "Content-Type": "application/json", Auth: token },
        withCredentials: true,
      });
      setReload(!reload);
      toast.success("Item quantity decreased!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("Failed to decrease quantity!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      console.error("Error decreasing quantity:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (token) {
      profile();
      userCart();
      getAddress();
    } else {
      setUser(null);
      setCart({ items: [] });
      setUserAddress([]);
    }
  }, [token, reload]);

  useEffect(() => {
    fetchProduct();
  }, [reload]);

  return (
    <AppContext.Provider
      value={{
        products,
        register,
        login,
        profile,
        logout,
        user,
        token,
        isAuthenticated,
        addToCart,
        clearCart,
        removeCart,
        decreaseQty,
        userCart,
        cart,
        setCart,
        userAddress,
        addAddress,
        getAddress,
        url,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
