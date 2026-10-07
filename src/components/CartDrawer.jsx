import React from 'react';
import { useCart } from '../context/CartContext';

export const CartDrawer = () => {
const { cart, isCartOpen, setIsCartOpen, removeFromCart, totalPrice, setIsModalOpen, setActiveProduct } = useCart();

if (!isCartOpen) return null;

const handleCheckoutClick = () => {
    if (cart.length === 0) {
    alert("سلتك فارغة! قم بإضافة منتجات أولاً ♡");
    return;
    }
    setIsCartOpen(false);
    setActiveProduct({
    name: cart.map(i => `${i.name} (x${i.qty})`).join(" + "),
    price: `${totalPrice} DA`,
    img: cart[0]?.img || ""
    });
    setIsModalOpen(true);
};

return (
    <div className="cart-drawer-overlay active-cart" onClick={() => setIsCartOpen(false)}>
    <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
        <h3>سلة التسوق 🛒</h3>
        <button type="button" className="cart-close-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>

        <div className="cart-items-container">
        {cart.length === 0 ? (
            <p className="empty-cart-msg">السلة فارغة حالياً 🌸</p>
        ) : (
            cart.map((item, index) => (
            <div key={index} className="cart-item-row">
                {item.isJewelry ? (
                <div className="cart-item-info" style={{ width: '85%' }}>
                    <div className="cart-item-title" style={{ fontWeight: 'bold', color: '#ffb7c5' }}>✨ {item.name}</div>
                    <div className="cart-item-price">{item.qty}x {item.numericPrice}DA</div>
                    <div className="jewelry-details-preview" dangerouslySetInnerHTML={{ __html: item.detailsHTML }} />
                </div>
                ) : (
                <>
                    <img src={item.img} alt={item.name} />
                    <div className="cart-item-info">
                    <div className="cart-item-title">{item.name}</div>
                    <div className="cart-item-price">{item.numericPrice}DA × {item.qty}</div>
                    </div>
                </>
                )}
                <button type="button" className="cart-item-remove" onClick={() => removeFromCart(index)}>&times;</button>
            </div>
            ))
        )}
        </div>

        <div className="cart-drawer-footer">
        <div className="cart-total-box">
            <span>المجموع الكلي:</span>
            <span>{totalPrice} DA</span>
        </div>
        <button type="button" className="modal-btn btn-buy" style={{ width: '100%' }} onClick={handleCheckoutClick}>
            إتمام الطلب ⚡
        </button>
        </div>
    </div>
    </div>
);
};