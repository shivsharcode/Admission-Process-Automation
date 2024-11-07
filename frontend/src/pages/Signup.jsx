import React, { useState, useEffect } from "react";
import googleImg from '../assets/images/google-color-svgrepo-com.svg';
import 'boxicons';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'

import styles from './style.module.css';


function SignUp({ setShowLogin, setShowSignup }) {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

// password Validation

  const [isPasswordFocused, setIsPasswordFocused] = useState(false);


  const [hasEightChars, setHasEightChars] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false) ;
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  const passwordValidation = (value)=>{
    setHasEightChars( value.length >= 8 );
    setHasLowerCase( /[a-z]/.test(value));
    setHasUpperCase(/[A-Z]/.test(value));
    setHasNumber(/\d/.test(value));
    setHasSpecialChar(/[@$!%*?&]/.test(value));
  }

  const handlePasswordChange = (e)=>{
    const value = e.target.value ;
    setPassword(value);
    passwordValidation(value) ;
  }




  const handleSignup = async (e) => {
    e.preventDefault();

    // password Validation
    if (!hasEightChars || !hasLowerCase || !hasUpperCase || !hasNumber || !hasSpecialChar) {
      alert("Password does not meet all the conditions.");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, mobileNumber, email, password })
      });

      const data = await response.json();

      if (response.ok && data.message === 'User registered successfully') {
        alert('Signup successful');
      } else {
        alert('Signup failed: ' + (data.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Signup failed: ' + error.message);
    }

  }



  return (
    <div className={styles["wrapper"]}>
      <div className={styles["form-wrapper"]}>
        <form onSubmit={handleSignup}>
          
            <img id="login-signup-page-brand-logo-id" src="path/to/logo.png" alt="G" />  {/* Replace with valid logo */}
          <h1>Sign Up</h1>

          {/* NAME */}
          <div className={` ${styles["input-box"]} ${styles["name-div"]} ${styles["form-box"]} `}>
            <input
              type="text"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-z\s]*$/.test(value)) {
                  setName(value);}
                else {
                  alert("Names cannot contain numbers or special characters.");}
              }
              }
            />
            <box-icon type='solid' name='user-circle'></box-icon>
          </div>

          {/* PHONE NUMBER */}
          <div className={` ${styles["input-box"]} ${styles["phoneNumber-div"]} ${styles["form-box"]} `}>
            <PhoneInput
              country={'in'}
              value={mobileNumber}
              onChange={setMobileNumber}
              inputProps={{
                required: true,
              }}
              containerStyle={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                borderRadius: '2.5rem',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                border: 'none',
                outline: 'none',
                paddingLeft: '1rem',
                fontSize: '1rem',
                padding: '0'
              }}
              inputStyle={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                borderRadius: '2.5rem',
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                border: 'none',
                outline: 'none',
                fontSize: '1rem'
              }}
              buttonStyle={{
                borderTopLeftRadius: '50%',
                borderBottomLeftRadius: '50%',
                //width: '70px',
                margin: '0',
                background: 'transparent',
                padding: '0',
              }}
              className={styles["phone-input"]}
            />


            <box-icon type='solid' name='phone'></box-icon>
          </div>

          {/* EMAIL */}
          <div className={`${styles["input-box"]} ${styles["email-div"]} ${styles["form-box"]} `}>


            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <box-icon name='envelope' type='solid' ></box-icon>
          </div>

          {/* PASSWORD */}
          <div className={`${styles["input-box"]} ${styles["password-div"]} ${styles["form-box"]} `}>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              // onChange={(e) => setPassword(e.target.value)}
              onChange ={ handlePasswordChange}
              onFocus={()=> setIsPasswordFocused(true)}
              onBlur={()=> setIsPasswordFocused(false)}
            />
            <box-icon name='lock-alt' type='solid' ></box-icon>
          </div>

          {isPasswordFocused && (  <div className={styles["password-change"]}>
            <ul>
              {!hasEightChars && <li>Password length should be atleast 8 characters</li>}
              {!hasLowerCase && <li>Atleast one lowercase letter </li> }
              {!hasUpperCase && <li>Atleast one UPPERCASE letter</li>}
              {!hasNumber && <li>Atleast one number</li>}
              {!hasSpecialChar && <li>Atleast one special character</li>}
            </ul>

          </div>
          )}

          {/* AGREE WITH TERMS N CONDITION */}
          <div className={styles["agree-with-policy-div"]}>
            <label htmlFor="agree-permission" className={styles["custom-checkbox-label"]}>
              <input type="checkbox" className={styles["custom-checkbox"]} id="agree-permission" required />
              <span className={styles["checkbox-text"]}>I agree with ABES </span>
            </label>
            <pre> </pre>
            <a href="/terms" target="_blank" rel="noopener noreferrer">T&C</a><pre>,</pre>
            <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a><pre>&</pre>
            <a href="/cookies" target="_blank" rel="noopener noreferrer">Cookie Policy</a>
          </div>

          {/* REGISTER BUTTON */}
          <button type="submit" className={styles["btn"]} id="signup-btn">Register</button>

          {/* LOGIN */}
          <div className={`${styles["register-link"]} ${styles["form-box"]} `}>
            <p>Already have an account?</p>
            <a href="" onClick={() => { setShowLogin(true); setShowSignup(false); }}>Login</a>
          </div>

          {/* REGISTER USING */}
          <div className={`${styles["login-using"]} ${styles["form-box"]} `}>
            <p>Or Register With</p>
            <a href="http://localhost:4000/auth/google"><img src={googleImg} alt="Google" height="30px" /></a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
