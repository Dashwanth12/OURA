import React, {useState, useEffect} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import { ArrowLeft, Search, ChevronDown } from 'lucide-react';
import ProductCard from '../../components/ProductCard'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

import './index.css'


const CategoryPage = () => {
    const {categoryId} = useParams()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [maxPrice, setMaxPrice] = useState(1000000)

     useEffect(() => {
        const fetchCategoryProducts = async () => {
            setLoading(true)
            try{
                const url = `${import.meta.env.VITE_API_BASE_URL}/api/products/all?category=${categoryId}`
                const response = await fetch (url)

                if (response.ok){
                    const data = await response.json()
                    setProducts(data)
                }
            }catch(err){
                console.log('Falied Fetching Category Products', err)
            }finally{
                setLoading(false)
            }
        }
        fetchCategoryProducts()
    },[categoryId])

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
        const matchPrice = product.price <= maxPrice
        return matchesSearch && matchPrice
    })

    return (
        <div className='category-page'>
            <Navbar />
            <main className='category-container'>
                <button className='back-btn' onClick={() => navigate(-1)}>
                <ArrowLeft size={18} /> Back
                </button>
                <header className="category-header">
                    <h1 className="category-title">{categoryId}<span className='span-count'>({products.length})</span></h1>
                    <p className="category-subtitle">
                        Discover our curated selection of premium {categoryId}.
                    </p>
                </header>

                <div className="filter-controls">
                    <div className="filter-select-group">
                        <div className="select-wrapper">
                            <select
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="price-select"
                            >
                                <option value={1000000}>All Prices</option>
                                <option value={1000}>Under ₹1,000</option>
                                <option value={5000}>Under ₹5,000</option>
                                <option value={10000}>Under ₹10,000</option>
                                <option value={25000}>Under ₹25,000</option>
                                <option value={50000}>Under ₹50,000</option>
                            </select>
                            <ChevronDown size={14} className="select-arrow" />
                        </div>
                    </div>

                    <div className='search-box'>
                        <Search size={18} className='search-icon' />
                        <input
                            type='search'
                            placeholder={`Search in ${categoryId}`}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                        />
                    </div>
                </div>
                
                {loading ? (
                    <div className="loader">Curating Collection...</div>
                ) : (
                    <div className="category-grid">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map(product => (
                                <ProductCard key={product._id} product={product} />
                            ))
                        ) : (
                            <div className="empty-state">
                                <h3 className='empty-state-head'>No matches found.</h3>
                                <p className='empty-state-para'>Try adjusting your search or price range.</p>
                                <button className='retry' onClick={() => { setSearchTerm(''); setMaxPrice(1000000); }}>Clear Filters</button>
                            </div>
                        )}
                    </div>
                )}
            </main>
            <Footer />
        </div>
    )
}
export default CategoryPage