"use client";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  // 상태를 관리하여 입력된 이메일과 비밀번호 저장
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // 로그인 요청 함수
  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      console.log("로그인 성공:", response.data);
      // 로그인 성공 후 리디렉션
      navigate("/dashboard"); // 대시보드나 다른 경로로 리디렉션
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 화살표 
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
          value={email}  // 상태로 연결
          onChange={(e) => setEmail(e.target.value)}  // 입력값 업데이트
        />
      </div>

      <div className={styles.inputWrapper}>
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          aria-label="Password input"
          value={password}  // 상태로 연결
          onChange={(e) => setPassword(e.target.value)}  // 입력값 업데이트
        />
      </div>

      <button className={styles.loginButton} onClick={handleLogin}>
        LOGIN
      </button>

      <footer className={styles.signupContainer}>
        <p className={styles.signupText}>계정이 없으신가요?</p>
        <span className={styles.signupLink} onClick={handleRedirect}>SIGNUP</span>
      </footer>
    </main>
  );
}

export default Login;
