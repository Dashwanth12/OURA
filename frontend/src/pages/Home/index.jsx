import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import HeroBanner from '../../components/HeroBanner';
import FeaturedSection from '../../components/FeaturedSlider';
import Footer from '../../components/Footer';
import whyImg from '../../assets/decor.jpg';
import './index.css';

function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    const reasons = [
        {
            title: "Curated Selection",
            desc: "Every object is hand-selected for its design and functional integrity."
        },
        {
            title: "Fast Delivery",
            desc: "Seamless logistics ensuring your essentials arrive within 48 hours."
        },
        {
            title: "Premium Quality",
            desc: "We partner with brands that prioritize longevity over trends."
        },
        {
            title: "Secure Checkout",
            desc: "Your data and transactions are protected by industry-leading encryption."
        },
        {
            title: "handles Payment At Ease.",
            desc: "Paying can be done in your Ways."
        }
    ];

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                setLoading(true);
                const url = `${import.meta.env.VITE_API_BASE_URL}/api/products/all?isFeatured=true`;
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                }
            } catch (err) {
                console.log('Failed to Fetch products', err);
            } finally {
                setLoading(false);
            }
        };
        fetchInventory();
    }, []);

    return (
        <div className='home-page'>
            <Navbar />

            <header className='hero-section'>
                <HeroBanner />
            </header>

            <main className='home-content-wrapper'>

                <section className='why-oura-section'>
                    <div className='why-grid'>
                        <div className='why-image-side'>
                            <img src={whyImg} alt="OURA Aesthetic" />
                            <div className='why-image-caption'>Collection 01 / Image 04</div>
                        </div>

                        <div className='why-text-side'>
                            <span className='section-mini-tag'>The OURA Advantage</span>
                            <h2 className='section-main-title'>Why Choose <i>Us.</i></h2>

                            <div className='reasons-grid'>
                                {reasons.map((item, index) => (
                                    <div key={index} className='reason-item'>
                                        <span className='reason-num'>0{index + 1}</span>
                                        <div className='reason-content'>
                                            <h4>{item.title}</h4>
                                            <p>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {loading ? (
                    <div className='loader-container'>
                        <div className='pulse-loader'></div>
                        <p>OURA...</p>
                    </div>
                ) : (
                    <section className='featured-showcase'>
                        <div className='section-header-simple'>
                            <h3 className='simple-label'>Featured Arrivals</h3>
                            <div className='label-line'></div>
                        </div>

                        {products.length > 0 ? (
                            <FeaturedSection products={products} />
                        ) : (
                            <div className='coming-soon-box'>
                                <h2>The next drop is arriving shortly.</h2>
                            </div>
                        )}
                    </section>
                )}
            </main>

            <Footer />
        </div>
    );
}

export default Home;