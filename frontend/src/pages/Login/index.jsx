import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(0);
    const [popup, setPopup] = useState({ show: false, message: '', type: '' });
    const [greeting, setGreeting] = useState('')

    const navigate = useNavigate();

    
    const triggerPopup = (message, type = 'success') => {
        setPopup({ show: true, message, type });
        setTimeout(() => setPopup({ show: false, message: '', type: '' }), 4000);
    };

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    useEffect(() => {
        const time = new Date().getHours()

        if (time < 12) setGreeting('Good Morning!')
            else if (time < 17) setGreeting('Good Afternoon!')
        else setGreeting('Good Evening.')
    },[])

    const handleSendOtp = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);

        const { error } = await supabase.auth.signInWithOtp({ email });

        if (error) {
            triggerPopup(error.message, 'error');
        } else {
            setIsOtpSent(true);
            setTimer(30);
            triggerPopup("✨ OTP sent to your email!");
        }
        setLoading(false);
    };

    
    const handleVerifyOtp = async (e) => {
        e.preventDefault()
        setLoading(true)
        const {data, error} = await supabase.auth.verifyOtp({
            email,
            token: otp,
            type: 'email'
        })
        if (error){
            triggerPopup('Invalid OTP or expired. Please try again.', 'error')
            setLoading(false)
        }else if (data.session){
            triggerPopup('Login Successfull! Redriecting...')

            const loggedEmail = data.session.user.email

            setTimeout(() => {
                if (loggedEmail === 'snarasimhawines@gmail.com'){
                    navigate('/admin')
                }else{
                    navigate('/home')
                }
            }, 1500)
        }
    }

    return (
        <div className="login-wrapper">
            {popup.show && (
                <div className={`oura-popup ${popup.type}`}>
                    {popup.message}
                </div>
            )}

            <div className="login-visual-side">
                <div className="visual-overlay">
                    <h1 className="visual-logo">OURA</h1>
                    <p>Your everyday, upgraded.</p>
                </div>
            </div>

            <div className="login-form-side">
                <div className="form-content">
                    <h2 className='greeting'>{isOtpSent ? '' : greeting}</h2>
                    <h2 className="form-title">{isOtpSent ? "Verify Identity" : ''}</h2>
                    <p className="form-subtitle">
                        {isOtpSent ? `Enter the 6-digit code sent to ${email}` : "Enter your details to access your account"}
                    </p>

                    {!isOtpSent ? (
                        <form onSubmit={handleSendOtp} className="main-form">
                            <div className="input-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? "Processing..." : "Continue with Email"}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleVerifyOtp} className="main-form">
                            <div className="input-group">
                                <label>6-Digit OTP</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    placeholder="000000"
                                    maxLength="6"
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? "Verifying..." : "Login to OURA"}
                            </button>

                            <div className="otp-footer">
                                {timer > 0 ? (
                                    <p className="timer-text">Resend code in <b>{timer}s</b></p>
                                ) : (
                                    <button type="button" onClick={handleSendOtp} className="resend-btn">
                                        Resend OTP
                                    </button>
                                )}
                                <button type="button" onClick={() => setIsOtpSent(false)} className="back-link">
                                    Change Email
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;