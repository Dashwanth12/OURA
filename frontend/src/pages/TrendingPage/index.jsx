import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import { ArrowLeft } from 'lucide-react';
import './index.css';

const TrendingPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrending = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/all?isFeatured=true`);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                }
            } catch (err) {
                console.error("Error fetching trending products:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrending();
    }, []);

    return (
        <div className="category-page">
            <Navbar />
            <main className="category-container">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} /> Back
                </button>

                <header className="category-header">
                    <h1 className="category-title"> Trending Now</h1>
                    <p className="category-subtitle">
                        A curated selection of our most sought-after pieces.
                    </p>
                </header>

                {loading ? (
                    <div className="loader">OURA...</div>
                ) : (
                    <div className="category-grid">
                        {products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default TrendingPage;