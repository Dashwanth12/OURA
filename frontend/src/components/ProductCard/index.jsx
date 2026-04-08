import React, { useState, useMemo } from 'react';
import { Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function ProductCard({ product }) {
    const navigate = useNavigate();


    const {
        _id,
        name,
        price,
        originalPrice,
        imageUrl,
        averageRating = 4.5,
        ratingsCount = 0,
        category = "Electronics"
    } = product;

    const [liked, setLiked] = useState(false);

    const discount = useMemo(() => {
        const p = Number(price);
        const op = Number(originalPrice);

        if (op > p && op > 0) {
            return Math.round(((op - p) / op) * 100);
        }
        return 0;
    }, [price, originalPrice]);

    


    return (
        <div className="oura-compact-card" onClick={() => navigate(`/product/${_id}`)}>

            <div className="compact-image-wrapper">

                {discount > 0 && (
                    <div className="compact-discount-tag">
                        {discount}% OFF
                    </div>
                )}

                <button
                    className="compact-wishlist"
                    onClick={(e) => {
                        e.stopPropagation();
                        setLiked(!liked);
                    }}
                >
                    <Heart size={18} fill={liked ? "#333" : "none"} color={liked ? "#333" : "#aba6a6"} />
                </button>

                <div className="compact-img-bg">
                    <img src={imageUrl || "/placeholder.png"} alt={name} className="compact-img" />
                </div>
            </div>

            <div className="compact-info">

                <div className="compact-header-row">
                    <h3 className="compact-title">{name}</h3>
                    <span className="compact-badge">{category}</span>
                </div>

                <div className="compact-stats">
                    <div className="compact-stars">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={12}
                                fill={i < Math.floor(averageRating) ? "#666" : "none"}
                                color={i < Math.floor(averageRating) ? "#666" : "#D1D5DB"}
                            />
                        ))}
                    </div>
                    <span className="compact-reviews">
                        ({ratingsCount.toLocaleString()})
                    </span>
                </div>

                <div className="compact-price-row">
                    <span className="compact-now">
                        ₹{Number(price || 0).toLocaleString('en-IN')}
                    </span>

                    {Number(originalPrice) > Number(price) && (
                        <span className="compact-was">
                            ₹{Number(originalPrice).toLocaleString('en-IN')}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductCard;