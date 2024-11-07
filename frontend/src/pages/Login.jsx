import React, { useState } from "react";
import styles from './style.module.css'
import 'boxicons';

import googleImg from '../assets/images/google-color-svgrepo-com.svg';
import otpImg from '../assets/images/transaction-password-otp-verification-code-security-svgrepo-com.svg';

function Login({setShowLogin, setShowSignup}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.token) {
                localStorage.setItem('token', data.token); // Fixed method name
                alert("Login Successful");
            } else {
                alert("Login failed: " + (data.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Login failed: " + error.message);
        }
    };

    return (
        <div className={styles.wrapper}>
          <div className={styles['form-wrapper']}>
            <form onSubmit={handleLogin}>
              <a href="../index.html">
                <img id={styles['login-signup-page-brand-logo-id']} src="" alt="G" />
              </a>
              <h1>Login</h1>
    
              <div className={`${styles['input-box']} ${styles['username-div']} ${styles['form-box']}`}>
                <input 
                    type="email" 
                    placeholder="Email" //(to add mob ph too) 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <box-icon type='solid' name='user'></box-icon>
              </div>
    
              <div className={`${styles['input-box']} ${styles['password-div']} ${styles['form-box']}`}>
                <input 
                    type="password"
                    placeholder="Password"    
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <box-icon name='lock-alt' type='solid' ></box-icon>
              </div>
    
              <div className={`${styles['remember-forgot']} ${styles['form-box']} `}>
                <label htmlFor="remember-me" className={styles['custom-checkbox-label']}>
                  <input type="checkbox" id="remember-me" className={styles['custom-checkbox']} />
                  <span className={styles['checkbox-text']}>Remember me</span>
                </label>
                <a href="#">Forgot password?</a>
              </div>
    
              <button type="submit" className={styles.btn} id={styles['login-btn']}>Login</button>
    
              <div className={`${styles['register-link']} ${styles['form-box']}`}>
                <p>Don't have an account?</p>
                <a href="#" onClick={()=> { setShowSignup(true); setShowLogin(false);} }>Register</a>
              </div>
    
              <div className={`${styles['login-using']} ${styles['form-box']}`}>
                <p>Or Login With</p>
                <a href="#"><img src={googleImg} alt="Google" height="30px" /></a>
                <a href="#"><img src={otpImg} alt="OTP" height="30px" /></a>
              </div>
            </form>
          </div>
        </div>
      ); 
}

export default Login;
