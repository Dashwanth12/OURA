import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../Button'
import ProductCard from '../ProductCard';
import './index.css';

const FeaturedSlider = ({ products = [] }) => {
    const featuredItems = products.filter(item => item.isFeatured).slice(0, 6);

    if (featuredItems.length === 0) return null;

    return (
        <section className="featured-section">
            <div className="section-container">
                <div className="featured-header">
                    <div className='headers-card'>
                        <span className="subtitle">Curated Collection</span>
                        <h2 className="section-title">Trending Now</h2>
                        <Button />

                    </div>
                </div>

                <motion.div
                    className="featured-scroll-container"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    {featuredItems.map((product, index) => (
                        <motion.div
                            key={product._id}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default FeaturedSlider;