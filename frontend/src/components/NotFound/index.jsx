import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className='nf-wrapper'>
            <div className='nf-content'>
                <span className='nf-code'>404</span>
                <h1 className='nf-head'>Lost in Design??</h1>
                <p className='nf-para'>
                    The page you are looking for has been moved <br />
                    or no longer exists in our current collection.
                </p>
                <button
                    type='button'
                    className='nf-btn'
                    onClick={() => navigate('/browse')}
                >
                    Return to Browse
                </button>
            </div>
        </div>
    );
}

export default NotFound;