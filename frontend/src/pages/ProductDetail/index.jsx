import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import Navbar from '../../components/Navbar';
import { useCart } from  '../../context/cartContext';
import { ArrowLeft, ShoppingBag, Heart, Star, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import './index.css';

const ProductDetail = ()   => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart(); 

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [adding, setAdding] = useState(false); // State for button feedback

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const url = `${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`;
                const response = await fetch(url);
                if (!response.ok) {
                    setProduct(null);
                    return;
                }
                const data = await response.json();
                setProduct(data);
                setActiveImage(data.imageUrl);
            } catch (err) {
                console.error("Error fetching product details:", err);
            } finally {
                setLoading(false);
            }
        };
        if (id) fetchProductData();
    }, [id]);

    const handleAddToBag = async () => {
        setAdding(true);
        try {
            await addToCart(product, quantity);
        } catch (error) {
            console.error("Failed to add to bag", error);
        } finally {
            setTimeout(() => setAdding(false), 1000);
        }
    };

    const handleImageChange = (imgUrl) => {
        setImageLoading(true);
        setActiveImage(imgUrl);
        setTimeout(() => setImageLoading(false), 300);
    };

    useEffect(() => {
        const fetchRelated = async () => {
            if (product?.category) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/products/all?category=${product.category}`);
                    const data = await response.json();
                    const filtered = data.filter(item => item._id !== product._id);
                    setRelatedProducts(filtered.slice(0, 4));
                } catch (err) {
                    console.error("Error fetching related items:", err);
                }
            }
        };
        fetchRelated();
    }, [product]);

    if (loading) return <div className="loader">OURA...</div>;
    if (!product) return <div className="not-found">Product not found.</div>;

    const hasGallery = product.gallery && product.gallery.length > 0;
    const original = product.originalPrice;
    const current = product.price;
    const discount = original > current ? Math.round(((original - current) / original) * 100) : 0;

    return (
        <div className="detail-page">
            <Navbar />
            <main className="detail-container">
                <button className="back-link" onClick={() => navigate(-1)}>
                    <ArrowLeft size={16} /> Back to Collection
                </button>

                <div className="product-layout">
                    <div className="product-visual">
                        <div className="main-image-container">
                            <img
                                src={activeImage}
                                alt={product.name}
                                className={`main-display ${imageLoading ? 'loading' : ''}`}
                            />
                        </div>

                        {hasGallery && (
                            <div className="thumbnail-grid">
                                {product.gallery.map((imgUrl, index) => (
                                    <div
                                        key={index}
                                        className={`thumb-wrapper ${activeImage === imgUrl ? 'active' : ''}`}
                                        onClick={() => handleImageChange(imgUrl)}
                                    >
                                        <img src={imgUrl} alt={`View ${index + 1}`} />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="product-info">
                        <span className="info-tag">{product.category}</span>
                        <h1 className="info-title">{product.name}</h1>

                        <div className="detail-stats">
                            <div className="detail-stars">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill={i < Math.floor(product.averageRating || 0) ? "#111" : "none"}
                                        color={i < Math.floor(product.averageRating || 0) ? "#111" : "#D1D5DB"}
                                    />
                                ))}
                            </div>
                            <span className="detail-rating-text">{product.averageRating || 0}</span>
                            <span className="detail-reviews-count">({(product.ratingsCount || 0).toLocaleString()} reviews)</span>
                        </div>

                        <div className="price-section">
                            <div className="price-main">
                                <span className="info-price">₹{current.toLocaleString('en-IN')}</span>
                                {discount > 0 && <span className="discount-badge">{discount}% OFF</span>}
                            </div>
                            {discount > 0 && <span className="original-price">M.R.P: ₹{original.toLocaleString('en-IN')}</span>}
                        </div>

                        <div className="quantity-section">
                            <label className="quantity-label">Quantity</label>
                            <div className="quantity-control">
                                <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={16} /></button>
                                <span className="qty-display">{quantity}</span>
                                <button className="qty-btn" onClick={() => setQuantity(quantity + 1)}><Plus size={16} /></button>
                            </div>
                        </div>

                        <div className="action-group">
                            {/* 4. Connect the button */}
                            <button
                                className={`add-to-cart-btn ${adding ? 'adding' : ''}`}
                                onClick={handleAddToBag}
                                disabled={adding}
                            >
                                <ShoppingBag size={18} />
                                {adding ? 'Adding...' : 'Add to Bag'}
                            </button>

                            <button className={`wishlist-icon-btn ${isWishlisted ? 'active' : ''}`} onClick={() => setIsWishlisted(!isWishlisted)}>
                                <Heart size={20} fill={isWishlisted ? "#111" : "none"} />
                            </button>
                        </div>

                        <div className="features-section">
                            <div className="feature-item"><Truck size={20} /><span>Free Delivery</span></div>
                            <div className="feature-item"><RotateCcw size={20} /><span>30 Days Return</span></div>
                            <div className="feature-item"><Shield size={20} /><span>Secure Payment</span></div>
                        </div>

                        <div className="info-desc">
                            <h3>Product Details</h3>
                            <div className="desc-text-wrapper">
                                {product.description ? product.description.split('\n').map((line, index) => (
                                    <p key={index} className="desc-line">{line}</p>
                                )) : <p>A masterfully crafted piece designed for the modern home.</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {relatedProducts.length > 0 && (
                <section className="suggestions-section">
                    <div className="suggestions-container">
                        <h2 className="suggestions-title">You May Also <i>Appreciate</i></h2>
                        <div className="suggestions-grid">
                            {relatedProducts.map((item) => (
                                <div
                                    key={item._id}
                                    className="suggestion-card"
                                    onClick={() => {
                                        navigate(`/product/${item._id}`);
                                        window.scrollTo(0, 0);
                                    }}
                                >
                                    <div className="suggestion-img-wrapper">
                                        <img src={item.imageUrl} alt={item.name} />
                                    </div>
                                    <div className="suggestion-info">
                                        <h4>{item.name}</h4>
                                        <p>₹{item.price.toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ProductDetail;