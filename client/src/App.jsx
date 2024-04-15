import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./Pages/Home";
import ProductList from "./Pages/ProductList";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

const App = () => {

  const user = useSelector(state=>state.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList/>} />
        <Route path="/product/:id" element={<Product/>} />
        <Route path="/cart" element={ user ? <Cart/> : <Navigate to="/login"/> } />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/"/> : <Register />} />
      </Routes>
    </Router>
  );
};

export default App;


