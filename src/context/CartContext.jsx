import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('chokoCart');
    return saved ? JSON.parse(saved) : [];
});

const [isCartOpen, setIsCartOpen] = useState(false);
const [activeProduct, setActiveProduct] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);

useEffect(() => {
    localStorage.setItem('chokoCart', JSON.stringify(cart));
}, [cart]);

const parsePrice = (priceInput) => {
    if (!priceInput) return 0;
    const cleaned = priceInput.toString().replace(/[^0-9]/g, '');
    return cleaned ? parseInt(cleaned, 10) : 0;
};

const addToCart = (product, quantity = 1) => {
    const numericPrice = product.numericPrice || parsePrice(product.price);
    setCart((prevCart) => {
const existing = prevCart.find((item) => item.name.trim() === product.name.trim());
if (existing) {
        return prevCart.map((item) =>
item.name.trim() === product.name.trim()
            ? { ...item, qty: item.qty + quantity }
            : item
        );
}
return [
        ...prevCart,
        {
name: product.name.trim(),
price: `${numericPrice} DA`,
numericPrice,
img: product.img || '',
qty: quantity,
isJewelry: product.isJewelry || false,
detailsHTML: product.detailsHTML || ''
        }
    ];
    });
    setIsCartOpen(true);
};

const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
};

const clearCart = () => setCart([]);

const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.numericPrice * item.qty, 0);

return (
    <CartContext.Provider value={{
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    activeProduct,
    setActiveProduct,
    isModalOpen,
    setIsModalOpen,
    totalItems,
    totalPrice,
    parsePrice
    }}>
{children}
    </CartContext.Provider>
);
};

export const useCart = () => useContext(CartContext);