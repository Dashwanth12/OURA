import React from 'react';
import Navbar from '../../components/Navbar';
import { useCart } from '../../context/cartContext';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function Cart() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const navigate = useNavigate();

    return (
        <div className='cart-page'>
            <Navbar />
            <div className='cart-container'>
                <header className='cart-header'>
                    <h2 className='cart-head'>YOUR BAG <span>({cart.length} ITEMS)</span></h2>
                </header>

                {cart.length === 0 ? (
                    <div className="empty-cart-view">
                        <ShoppingBag size={40} color="#ccc" />
                        <h2>Your bag is empty</h2>
                        <button onClick={() => navigate('/browse')} className="continue-shopping-btn">
                            CONTINUE SHOPPING
                        </button>
                    </div>
                ) : (
                    <div className="cart-content-grid">
                        <div className="cart-items-column">
                            {cart.map((item) => (
                                <div key={item.product_id} className="cart-product-row">
                                    <img className="cart-product-image" src={item.image_url} alt={item.name} />
                                    <div className="cart-product-info">
                                        <div className="info-header">
                                            <h3 className="product-name">{item.name}</h3>
                                            <p className="product-price">₹{item.price.toLocaleString('en-IN')}</p>
                                        </div>
                                        <div className="info-footer">
                                            <div className="qty-picker">
                                                <button
                                                    className="qty-btn"
                                                    onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus size={14} strokeWidth={3} />
                                                </button>

                                                <span className="qty-num">{item.quantity}</span>

                                                <button
                                                    className="qty-btn"
                                                    onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                                                >
                                                    <Plus size={14} strokeWidth={3} />
                                                </button>
                                            </div>
                                            <button className="remove-trash-btn" onClick={() => removeFromCart(item.product_id)}><Trash2 size={18} /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <aside className="cart-sidebar">
                            <div className="order-summary-box">
                                <h3>Summary</h3>
                                <div className="summary-item"><span>Subtotal</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
                                <div className="summary-item"><span>Shipping</span><span className="shipping-free">FREE</span></div>
                                <div className="total-divider"></div>
                                <div className="summary-item final-total"><span>Total</span><span>₹{cartTotal.toLocaleString('en-IN')}</span></div>
                                <button className="checkout-main-btn" onClick={() => navigate('/checkout')}>PROCEED TO CHECKOUT <ArrowRight size={18} /></button>
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
