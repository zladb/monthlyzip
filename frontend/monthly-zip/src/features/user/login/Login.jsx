"use client";
import * as React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 임포트
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동을 처리합니다.

  // 화살표 버튼 클릭 시 '/Signup' 경로로 이동
  const handleRedirect = () => {
    navigate('/signup'); // 'signup' 경로로 이동
  };

  return (
    <main className={styles.div}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e570c2a8b9686b1cdd86e579d1dc9522bb44cbd"
        alt="Monthly ZIP Logo"
        className={styles.logo}
      />
      <form>
        <div className={styles.div2}>
          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            aria-label="Email"
            required
          />
        </div>
        <div className={styles.div3}>
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            aria-label="Password"
            required
          />
        </div>
        <button type="submit" className={styles.div4}>
          LOGIN
        </button>
      </form>
      <footer className={styles.div5}>
        <p className={styles.div6}>계정이 없으신가요?</p>
        <button className={styles.div7} onClick={handleRedirect}>SIGNUP</button> {/* 버튼 클릭 시 handleRedirect 호출 */}
      </footer>
    </main>
  );
}

export default Login;
