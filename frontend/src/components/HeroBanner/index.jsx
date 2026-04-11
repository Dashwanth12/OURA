import React, {useState, useEffect} from "react";
import "./index.css";
import { ArrowRight, Store } from "lucide-react";
import photo from '../../assets/a.jpg'
import sh from '../../assets/d.jpg'
import {useNavigate} from 'react-router-dom'
import {supabase} from '../../supabaseClient'
import Laptop from '../../assets/laptop.jpg'
import Book from '../../assets/book2.png'
import sofa from '../../assets/sofa.png'

const productImages = [
    {
        title: "Books",
        url: Book
    },
    {
        title: "Electronics",
        url: Laptop,
    },
    {
        title: "Shoes",
        url: photo,
    },
    {
        title: "Accessories",
        url: sofa,
    },
];


function HeroBanner() {

    const navigate = useNavigate()
    const [userName, setUserName] = useState('')

    useEffect(() => {
        const getUserName = async () => {

            const {data : {user}} = await supabase.auth.getUser()

                if (user) {
                    const rawName = user.user_metadata?.display_name || user.email.split('@')[0];                  
                    const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
                    setUserName(formattedName);
            }
        }
        getUserName()
    },[])

    return (
        <div className="hero">
            <div className="hero-blob hero-blob-right">
            </div>
            <div className="hero-blob hero-blob-left"></div>

            <div className="hero-container">
                <div className="hero-badge-v2">
                    <span className="badge-prefix">{userName ? `Welcome, ${userName}` : "Welcome"}</span>
                </div>

                <div className="hero-grid">
                    <div className="hero-left">
                        <h1>
                            Discover.
                            <br />
                            <span>Explore.</span>
                            <br />
                            Elevate.
                        </h1>

                        <p>
                            Find premium electronics, curated books, and exquisite home decor
                            all in one place. Oura brings quality products.
                        </p>

                        <button className="hero-btn" onClick={() => navigate('/browse')}>
                            Browse Collections
                            <ArrowRight size={16} />
                        </button>
                    </div>

                    <div className="hero-images">
                        {productImages.map((img, index) => (
                            <div
                                key={index}
                                className={`image-card ${index % 2 === 0 ? "up" : "down"
                                    }`}
                            >
                                <img src={img.url} alt={img.alt} />
                            </div>
                        ))}
                    </div>
                </div>
                
            </div>
        </div>
    );
}

export default HeroBanner;