import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 처리 로직
  };

  return (
    <div className="login-container">
      <div className="orange-section">
        <div className="logo-text">
          월간 . <br />
          <span className="logo-zip">ZIP</span>
        </div>
      </div>
      
      <div className="form-section">
        <div className="form-card">
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
            <button 
              type="submit"
              className="submit-button"
            >
              LOGIN
            </button>
          </form>
          <div className="link-container">
            <Link to="/signup" className="link-text">
              SIGNUP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
