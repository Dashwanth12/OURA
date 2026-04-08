import React from 'react';
import SliderComponent from "react-slick";
const Slider = SliderComponent.default ? SliderComponent.default : SliderComponent;
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; 
import book from '../../assets/book.png';
import air from '../../assets/air.png';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

const banners = [
    {
        id: 1,
        tag: 'Arriving Soon.',
        title: 'Experience',
        titleHighlight: 'Precision.',
        description: 'Nike Air Max 90.',
        subdescription: 'Built for Comfort. Just do The Work.',
        buttonText: 'Explore Shoes',
        image: air,
        gradient: 'linear-gradient(135deg, #1a1a1a 0%, #666 100%)', 
        textColor: '#ffffff',
        link: '/category/shoes'  
    },
    {
        id: 2,
        tag: 'SPECIAL OFFER 30% - 40%',
        title: 'Discover Your',
        titleHighlight: 'Next Adventure.',
        description: 'Classic Literature Collection',
        subdescription: 'Timeless Stories. Endless Imagination.',
        buttonText: 'Explore Now',
        image: book,
        gradient: 'linear-gradient(135deg, #6e3d8d 0%, #22052d 100%)', 
        textColor: '#ffffff',
        link: '/category/books' 
    },
];

const NextArrow = ({ onClick }) => (
    <button className="slick-custom-arrow next" onClick={onClick} aria-label="Next Slide"><ChevronRight /></button>
);

const PrevArrow = ({ onClick }) => (
    <button className="slick-custom-arrow prev" onClick={onClick} aria-label="Previous Slide"><ChevronLeft /></button>
);

const Banner = () => {
    const navigate = useNavigate();

    const settings = {
        dots: true,
        infinite: true,
        speed: 800, 
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        fade: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        appendDots: dots => <ul>{dots}</ul>,
        customPaging: i => <div className="custom-dot"></div>
    };

    return (
        <div className="oura-banner-wrapper">
            <Slider {...settings}>
                {banners.map((banner) => (
                    <div key={banner.id}>
                        <div className="oura-slide" style={{ background: banner.gradient }}>
                            <div className="oura-slide-container">
                                <div className="oura-text-content">
                                    <span className="oura-tag">{banner.tag}</span>
                                    <h1 className="oura-main-title">
                                        {banner.title} <br />
                                        <span className="title-light">{banner.titleHighlight}</span>
                                    </h1>
                                    <div className="description-group">
                                        <p className="oura-desc">{banner.description}</p>
                                        <p className="oura-sub-desc">{banner.subdescription}</p>
                                    </div>

                                    <div className="oura-btn-group">
                                        <button
                                            className="btn-primary"
                                            onClick={() => navigate(banner.link)}
                                        >
                                            {banner.buttonText} <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="oura-image-content">
                                    <div className="image-bg-glow"></div> 
                                    <img src={banner.image} alt={banner.title} className="hero-png" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}

export default Banner;