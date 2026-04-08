import React from "react";
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import {Link} from 'react-router-dom'
import "./index.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-grid">

                    <div className="footer-col">
                        <h3 className="footer-title">STORE</h3>
                        <p className="footer-text">
                            Your destination for premium quality products and exceptional service.
                        </p>

                        <div className="social-icons">
                            <a href="#"><Facebook /></a>
                            <a href="#"><Instagram /></a>
                            <a href="#"><Twitter /></a>
                            <a href="#"><Youtube /></a>
                        </div>
                    </div>


                    <div className="footer-col">
                        <h4 className="footer-subtitle">Shop</h4>
                        <ul>
                            <li>Best Sellers</li>
                            <li>Sale</li>
                            <li>Trending</li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-subtitle">Customer Service</h4>
                        <ul>
                            <li>Contact Us</li>
                            <li>Shipping Info</li>
                            <li>Returns</li>
                            <li>FAQ</li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h4 className="footer-subtitle">Newsletter</h4>
                        <p className="footer-text">
                            Subscribe to get special offers and updates.
                        </p>

                        <div className="newsletter">
                            <input type="email" placeholder="Your email" />
                            <button>Subscribe</button>
                        </div>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 OURA. All rights reserved.</p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;