import React, {useState, useEffect} from 'react';
import { Search, ShoppingCart, LogOut } from 'lucide-react';
import {supabase} from '../../supabaseClient'
import { useCart } from '../../context/cartContext';
import {Link, NavLink, useNavigate} from 'react-router-dom'
import './index.css';

function Navbar() {
    const navigate = useNavigate()
    const { cart } = useCart();
    const [searchInput, setSearchInput] = useState('')
    const [products, setProducts] = useState([])
    const [showResults, setShowResults] = useState(false)

     
    useEffect(() => {
        const searchAllProducts = async () => {
            try{
                const url = `${import.meta.env.VITE_API_BASE_URL}/api/products/all`;
                const response = await fetch (url)

                if (response.ok){
                    const data = await response.json()
                    setProducts(data)
                }
            }catch(err){
                console.log('No Products Found...', err)
            }
        }
        searchAllProducts()
    },[])

    const filteredSearchProducts = products.filter(product => {
        return product.name.toLowerCase().includes(searchInput.toLowerCase())
    }).slice(0, 5)




    const onLogout = async () => {
        const { error } = await supabase.auth.signOut()

        if (error) {
            console.log('Logout error:', error.message)
        }
        navigate('/')
    }

    return (
        <nav className='navbar'>
            <div className='nav-content'>

                <ul className='nav-links'>
                    
                    <li>
                        <NavLink to='/browse' className={({ isActive }) => isActive ? 'active-route' : 'routes' }>
                       Browse
                       </NavLink> 
                        </li>

                    <li>
                        <NavLink to ='/trending' className={({ isActive }) => isActive ? 'active-route' : 'routes' }>
                           Trending
                        </NavLink>
                    </li>
                </ul>
                <Link className='nav-logo-link' to='/home'>
                <h1 className='nav-logo'>OURA</h1>
                </Link>

                <div className='nav-actions'>
                    <div className='search-wrapper'>
                        <Search size={19} />
                        <input type="text"
                        placeholder="Search items, brands, categories."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onFocus={() => setShowResults(true)}
                        onBlur={() => setTimeout(() => setShowResults(false), 2000)}
                        />
                        {showResults && searchInput && (
                            <div className="search-dropdown">
                                {filteredSearchProducts.length > 0 ? (
                                    filteredSearchProducts.map(product => (
                                        <div
                                            key={product._id}
                                            className="search-result-item"
                                            onClick={() => navigate(`/product/${product._id}`)}
                                        >
                                            <img src={product.image} alt="" />
                                            <div>
                                                <p className="res-name">{product.name}</p>
                                                <p className="res-cat">{product.category}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="no-res">No items found</div>
                                )}
                            </div>
                        )}
                    </div>
                    <Link className='link' to='/cart'>
                    <button className='icon-pill'>
                        
                            <ShoppingCart size={23} />
                            {cart.length > 0 && <span className='badge'>{cart.length}</span>}
                    </button>
                    </Link>

                    <button onClick={onLogout} className='logout-pill'>
                        <LogOut size={16} />
                    </button>
            </div>
            </div>
        </nav>
    );
}

export default Navbar;