import React from 'react';
import { useCart } from '../context/CartContext';

const spacetoonProducts = [
{ name: " Rimy & Mateo sticker", price: " 350 DA", img: "assets/products/rimy & mateo.png" },
{ name: 'Hunter x hunter sticker', price: " 150 DA", img: "assets/products/hunter x hunter.png" },
{ name: 'نجمة الطبخ sticker', price: " 300 DA", img: "assets/products/cooking idol.png" },
{ name: 'نجمة الطبخ poster', price: " 700 DA", img: "assets/products/poster.png" },
{ name: 'نجمة الطبخ photocard', price: " 300 DA", img: "assets/products/photocard.png" },
{ name: 'Doramon sticker ', price: " 150 DA", img: "assets/products/doramon.png" },
{ name: 'Emily sticker', price: " 200 DA", img: "assets/products/emily.png" },
{ name: 'ايروكا sticker', price: " 200 DA", img: "assets/products/eroka.png" },
{ name: 'katties sticker', price: " 200DA", img: "assets/products/katties.png" },
{ name: 'البؤساء : كوزيت & ايبونينsticker', price: " 200 DA", img: "assets/products/cosette n ebonin.png" },
{ name: 'البؤساء : ازيلماsticker', price: " 150 DA", img: "assets/products/azelma.png" },
{ name: 'Strawberry shortcake sticker', price: " 200 DA", img: "assets/products/shortcake.png" },
{ name: 'مغامرات نغم sticker', price: " 200 DA", img: "assets/products/nagham.png" },
{ name: 'عهد الاصدقاء sticker', price: "200 DA", img: "assets/products/romeo.png" },
{ name: 'سالي sticker', price: " 200 DA", img: "assets/products/sally.png" },
{ name: 'sandy bell sticker', price: " 150 DA", img: "assets/products/sandybel.png" },
{ name: 'بائعة الكبريت sticker', price: " 150 DA", img: "assets/products/meskina.png" },
{ name: 'محققوا الحيوانات sticker sheet', price: " 350 DA", img: "assets/products/animal.png" },
{ name: 'دروبي مع دوريمي sticker sheet', price: " 350 DA", img: "assets/products/dorobi.png" },
{ name: 'Jewelpet twinkle Rinko & Akari sticker sheet', price: " 350 DA", img: "assets/products/pink.png" },
{ name: 'Jewelpet twinkle Aoi & Sara sticker sheet', price: " 350 DA", img: "assets/products/blue.png" },
{ name: 'Jewelpet twinkle Minami & Miria sticker sheet', price: " 350 DA", img: "assets/products/green.png" },
{ name: 'Detective Conan sticker sheet', price: " 350 DA", img: "assets/products/conan.png" },  
{ name: 'Inyusha sticker sheet', price: " 250 DA", img: "assets/products/inyusha.png" },
{ name: 'ينبوع الاحلام sticker sheet', price: " 250 DA", img: "assets/products/red.png" },
{ name: 'دريلاند sticker sheet', price: " 250 DA", img: "assets/products/dryland.png" },
{ name: 'همتارو sticker sheet', price: " 250 DA", img: "assets/products/hamtaro.png" },
{ name: 'BookMark Dryland: Dafina & Milo', price: "300 DA", img: "assets/products/Dafina & Milo.png" },
{ name: 'BookMark: Jewelpet Twinkle season 1', price: "300 DA", img: "assets/products/jewelpet friends.png" }
];

const disneyProducts = [
{ name: "Miraculous Adrienette sticker", price: "200 DA", img: "assets/products/miraculous.png" },
{ name: "Miraculous Chatnoir sticker ", price: "200 DA", img: "assets/products/chatnoir.png" }
];

const nickelodeonProducts = [
{ name: "Sam & Cat", price: "300 DA", img: "assets/products/samandcat.png" }
];

const ALL_PRODUCTS = [...spacetoonProducts, ...disneyProducts, ...nickelodeonProducts];

export default function Store() {
const { addToCart, setActiveProduct, setIsModalOpen } = useCart();

return (
    <main className="store-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
    <section style={{ marginTop: '20px' }}>
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '30px' }}>
        جميع المنتجات 🛒
        </h2>

        <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {ALL_PRODUCTS.map((product, index) => (
            <div key={index} className="product-card" style={{ border: '1px solid #444', borderRadius: '12px', padding: '15px', background: 'rgba(255, 255, 255, 0.05)', textAlign: 'center' }}>
            <img 
                src={product.img} 
                alt={product.name} 
                style={{ width: '100%', height: '180px', objectFit: 'contain', borderRadius: '8px' }} 
            />
            <h3 style={{ margin: '15px 0 5px', fontSize: '1rem' }}>{product.name}</h3>
            <p style={{ color: '#ffb7c5', fontWeight: 'bold', fontSize: '1.1rem' }}>{product.price}</p>
            
            <div style={{ display: 'flex', gap: '10px', marginTop: '15px', justifyContent: 'center' }}>
                <button 
                type="button" 
                className="modal-btn btn-cart"
                onClick={() => addToCart(product)}
                >
                السلة 🛒
                </button>
                <button 
                type="button" 
                className="modal-btn btn-buy"
                onClick={() => {
                    setActiveProduct(product);
                    setIsModalOpen(true);
                }}
                >
                شراء ⚡
                </button>
            </div>
            </div>
        ))}
        </div>
    </section>
    </main>
);
}