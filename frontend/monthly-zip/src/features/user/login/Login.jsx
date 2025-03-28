"use client";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate(); 

  // 화살표 버튼 클릭 시 '/Signup' 경로로 이동
  const handleRedirect = () => {
    navigate('/signup'); // 'signup' 경로로 이동
  };
  return (
    <main className={styles.container}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/fe2b536100be2f0e64c77f2c2b58ceaf39370a6c"
        alt="Monthly ZIP Logo"
        className={styles.logo}
      />

      <div className={styles.inputWrapper}>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          aria-label="Email input"
        />
      </div>

      <div className={styles.inputWrapper}>
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          aria-label="Password input"
        />
      </div>

      <button className={styles.loginButton}>LOGIN</button>

      <footer className={styles.signupContainer}>
        <p className={styles.signupText}>계정이 없으신가요?</p>
        <span className={styles.signupLink} onClick={handleRedirect}>SIGNUP</span>
      </footer>
    </main>
  );
}

export default Login;
