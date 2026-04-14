import React from 'react'
import { useNavigate } from 'react-router-dom'
import Banner from '../../components/Banner'
import Navbar from '../../components/Navbar'
import { ArrowRight } from 'lucide-react'
import Footer from '../../components/Footer'
import Shoe from '../../assets/shoe.jpg'
import camera from '../../assets/camera.jpg'
import pot from '../../assets/pot.jpg'
import './index.css'

function Browse(){
    const categories = [
        {
            id: 'books',
            name: 'Books',
            image: 'https://images.unsplash.com/photo-1763368230669-3a2e97368032?auto=format&fit=crop&w=800&q=80',
        },
        {
            id: 'electronics',
            name: 'Electronics',
            image: camera,
        },

        {
            id: 'decor',
            name: 'Decor',
            image: pot
        },

        {
            id: 'shoes',
            name: 'Shoes',
            image: Shoe
        }
    ];

    const navigate = useNavigate()

    return (
        <>
        <Navbar />
            
        <div className='browse-page'>
                <div className='banner-page-card'>
                    <Banner />
                </div>
            <section className="categories-section">
                <div className="section-header">
                    <h3 className="section-title">Shop by Category</h3>
                </div>

                <div className="category-grid">
                    {categories.map((category) => (
                        <div key={category.name} className="category-item-card">
                            <div className="category-image-wrapper">
                                <img
                                    src={category.image}
                                    onClick={() => navigate(`/category/${category.id}`)}
                                    alt={category.name}
                                    className="category-img"
                                />
                            </div>
                            <div className="category-footer">
                                <h4 className="category-name">{category.name}</h4>
                                <ArrowRight className="category-arrow" size={18} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
        <Footer />
        </>
    )
}
export default Browse
