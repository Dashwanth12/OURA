import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useCart } from '../../context/cartContext';
import { useNavigate } from 'react-router-dom';
import './index.css';

function Checkout() {
    const { cart, cartTotal } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        pincode: ''
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        alert("Order placed successfully! (Integration coming soon)");
    };

    return (
        <div className="checkout-page">
            <Navbar />
            <div className="checkout-container">
                <form className="checkout-form" onSubmit={handlePlaceOrder}>
                    <h2>Delivery Details</h2>
                    <input type="email" name="email" placeholder="Email Address" required onChange={handleInputChange} />
                    <div className="name-row">
                        <input type="text" name="firstName" placeholder="First Name" required onChange={handleInputChange} />
                        <input type="text" name="lastName" placeholder="Last Name" required onChange={handleInputChange} />
                    </div>
                    <input type="text" name="address" placeholder="Flat, House no., Building, Company, Apartment" required onChange={handleInputChange} />
                    <div className="name-row">
                        <input type="text" name="city" placeholder="City" required onChange={handleInputChange} />
                        <input type="text" name="pincode" placeholder="Pincode" required onChange={handleInputChange} />
                    </div>
                    <button type="submit" className="place-order-btn">PAY NOW • ₹{cartTotal.toLocaleString('en-IN')}</button>
                </form>

                <aside className="checkout-summary">
                    <h3>Order Summary</h3>
                    {cart.map((item) => (
                        <div key={item.product_id} className="summary-row">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                    ))}
                    <div className="summary-total">
                        <strong>Total</strong>
                        <strong>₹{cartTotal.toLocaleString('en-IN')}</strong>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default Checkout;