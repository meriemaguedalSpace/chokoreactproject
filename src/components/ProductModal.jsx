import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { useCart } from '../context/CartContext';

const EMAILJS_SERVICE_ID = "service_viigdx8";   
const EMAILJS_TEMPLATE_ID = "template_dgago0f"; 
const EMAILJS_PUBLIC_KEY = "gkh8T1JRKyHsCPqf7";   

export const ProductModal = () => {
const { activeProduct, isModalOpen, setIsModalOpen, addToCart, cart, clearCart, parsePrice } = useCart();
const [qty, setQty] = useState(1);
const [step, setStep] = useState(1);

const [formData, setFormData] = useState({
    custName: '',
    custPhone: '',
    custWilaya: '',
    custCommune: '',
    custAddress: '',
    custInstagram: '',
    custNotes: ''
});

useEffect(() => {
    if (isModalOpen) {
    setQty(1);
    setStep(1);
    }
}, [isModalOpen]);

if (!isModalOpen || !activeProduct) return null;

const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
};

const handleCheckoutSubmit = (e) => {
    e.preventDefault();

    let orderSummary = "";
    let calculatedTotal = 0;

    if (cart && cart.length > 0) {
    orderSummary = cart.map(item => {
        const itemTotal = item.numericPrice * item.qty;
        calculatedTotal += itemTotal;
        return `• ${item.name} (Qté: ${item.qty}) - ${itemTotal} DA`;
    }).join("\n");
    } else {
    orderSummary = `• ${activeProduct.name} - ${activeProduct.price}`;
    calculatedTotal = parsePrice(activeProduct.price);
    }

    const totalPrice = calculatedTotal > 0 ? `${calculatedTotal} DA` : activeProduct.price;

    const templateParams = {
    fullName: formData.custName,
    customer_name: formData.custName,
    customer_phone: formData.custPhone,
    customer_wilaya: formData.custWilaya,
    customer_commune: formData.custCommune,
    customer_address: formData.custAddress,
    customer_instagram: formData.custInstagram || "N/A",
    customer_notes: formData.custNotes || "Aucune",
    order_details: orderSummary,
    total_price: totalPrice,
    to_name: "Admin"
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
    .then(() => {
        alert(`شكراً لك ${formData.custName}! تم استلام طلبك بنجاح ✨`);
        clearCart();
        setIsModalOpen(false);
    })
    .catch((err) => {
        alert("Erreur EmailJS: " + JSON.stringify(err));
    });
};

return (
    <div className="modal-overlay active-modal" onClick={() => setIsModalOpen(false)}>
    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={() => setIsModalOpen(false)}>&times;</button>

        {step === 1 ? (
        <div id="modalProductView">
            <div className="modal-img-box">
            <img src={activeProduct.img} alt={activeProduct.name} />
            </div>
            <h3>{activeProduct.name}</h3>
            <div className="modal-price">{parsePrice(activeProduct.price)} DA</div>

            <div className="qty-control">
            <label>الكمية:</label>
            <div className="qty-btn-group">
                <button type="button" className="qty-btn" onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                <input type="text" value={qty} readOnly />
                <button type="button" className="qty-btn" onClick={() => setQty(qty + 1)}>+</button>
            </div>
            </div>

            <div className="modal-actions">
            <button 
                type="button" 
                className="modal-btn btn-cart"
                onClick={() => {
                addToCart(activeProduct, qty);
                setIsModalOpen(false);
                }}
            >
                إضافة للسلة 🛒
            </button>
            <button type="button" className="modal-btn btn-buy" onClick={() => setStep(2)}>
                شراء مباشرة ⚡
            </button>
            </div>
        </div>
        ) : (
        <form onSubmit={handleCheckoutSubmit}>
            <h4 className="form-title">معلومات التوصيل 📦</h4>
            <div className="form-grid">
            <div className="form-group full-width">
                <label>الاسم الكامل *</label>
                <input type="text" id="custName" required value={formData.custName} onChange={handleFormChange} placeholder="مثال: أمينة بن علي" />
            </div>
            <div className="form-group full-width">
                <label>رقم الهاتف *</label>
                <input type="tel" id="custPhone" required value={formData.custPhone} onChange={handleFormChange} placeholder="06XX XX XX XX" />
            </div>
            <div className="form-group">
                <label>الولاية *</label>
                <input type="text" id="custWilaya" required value={formData.custWilaya} onChange={handleFormChange} placeholder="الجزائر" />
            </div>
            <div className="form-group">
                <label>البلدية *</label>
                <input type="text" id="custCommune" required value={formData.custCommune} onChange={handleFormChange} placeholder="القبة" />
            </div>
            <div className="form-group full-width">
                <label>العنوان التفصيلي</label>
                <input type="text" id="custAddress" value={formData.custAddress} onChange={handleFormChange} placeholder="الحي، شارع..." />
            </div>
            <div className="form-group full-width">
                <label>حساب الانستغرام (اختياري)</label>
                <input type="text" id="custInstagram" value={formData.custInstagram} onChange={handleFormChange} placeholder="@username" />
            </div>
            <div className="form-group full-width">
                <label>ملاحظات إضافية</label>
                <textarea id="custNotes" rows="2" value={formData.custNotes} onChange={handleFormChange} placeholder="أي ملاحظة بخصوص الطلب..."></textarea>
            </div>
            </div>

            <div className="modal-actions">
            <button type="button" className="modal-btn btn-back-modal" onClick={() => setStep(1)}>تراجع</button>
            <button type="submit" className="modal-btn btn-submit">تأكيد الطلب ✉️</button>
            </div>
        </form>
        )}
    </div>
    </div>
);
};