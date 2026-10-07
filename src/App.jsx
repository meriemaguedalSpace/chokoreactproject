import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import './App.css';
import { Header } from './components/Header';
import { CartDrawer } from './components/CartDrawer';
import { ProductModal } from './components/ProductModal';
import Store from './pages/Store';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div dir="rtl" style={{ minHeight: '100vh', backgroundColor: '#2d1b22', color: '#fff' }}>
          <Header />
          <CartDrawer />
          <ProductModal />
          
          <Routes>
            <Route path="/" element={<Store />} />
            <Route path="/store" element={<Store />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}