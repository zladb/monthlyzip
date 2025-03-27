import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [userType, setUserType] = useState('individual'); 
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // 회원가입 처리 로직
  };

  return (
    <div className="signup-container">
      <div className="form-section">
        <div className="form-card">
          <div className="tab-container">
            <button 
              className={`tab-button ${userType === 'individual' ? 'active' : ''}`}
              onClick={() => setUserType('individual')}
            >
              임대인
            </button>
            <button 
              className={`tab-button ${userType === 'company' ? 'active' : ''}`}
              onClick={() => setUserType('company')}
            >
              임차인
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="input-field"
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
            />
            <input
              type="text"
              placeholder="Name"
              className="input-field"
            />
            <input
              type="tel"
              placeholder="Phone"
              className="input-field"
            />
            <button 
              type="submit"
              className="submit-button"
            >
              SIGNUP
            </button>
          </form>
          <div className="link-container">
            <span className="link-text">
              이미 계정이 있으신가요?{' '}
              <Link to="/login" className="login-link">
                LOGIN
              </Link>
            </span>
          </div> 
        </div> 
      </div> 
      
      <div className="orange-section">
        <div className="logo-text">
          월간 . <br />
          <span className="logo-zip">ZIP</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
