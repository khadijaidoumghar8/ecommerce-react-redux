import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import './index.css';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';




function App() {
  return (
    <Router>
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0f0f1a',
      }}>
        <Navbar />
        <div style={{ paddingTop: '70px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;