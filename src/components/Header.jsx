import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const Header = () => {
const { totalItems, setIsCartOpen } = useCart();

return (
    <header className="main-header">
    <div className="left-header-group">
        <nav className="nav-links">
        <Link to="/">home</Link>
        <Link to="/blog">blog</Link>
        <Link to="/store">store</Link>
        <Link to="/contact">contact</Link>
        <Link to="/profile">Profile</Link>
        </nav>

        <NavLink to="/login" className="login-btn">Login</NavLink>
        <div 
        className="cart-btn" 
        style={{ cursor: 'pointer' }} 
        onClick={() => setIsCartOpen(true)}
        >
        <span id="cartCounter">{totalItems}</span> 🛒
        </div>
    </div>

    <div className="center-title">ChokoNeko | شوكونيكو - فضاء الذكريات</div>

    <div className="right-logo">
        <div className="logo-box"></div>
    </div>
    </header>
);
};