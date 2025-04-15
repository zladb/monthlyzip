"use client";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from 'jwt-decode'; 
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = async () => {
    // 입력값 검증
    if (!email || !password) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }

    try {
      console.log("로그인 요청 데이터:", { email, password });
      
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
  
      console.log("로그인 응답:", response.data); 
  
      const token = response.data.result.accessToken;
  
      localStorage.setItem("accessToken", token);
  
      const decoded = jwtDecode(token);
      console.log("디코딩 결과:", decoded);

      // 디코드된 토큰에 들어있는 memberId 확인
      localStorage.setItem("memberId", decoded.memberId);

      // 디코드된 토큰에 들어있는 email, userType 확인
      localStorage.setItem("userType", decoded.userType); 

      if (decoded.userType === "임대인") {
        navigate("/landlord");
      } else if (decoded.userType === "임차인") {
        navigate("/tenant");
      } else {
        alert("알 수 없는 사용자 유형입니다.");
      }
  
    } catch (error) {
      console.error("로그인 실패:", error);
      console.error("에러 응답:", error.response?.data);
      
      // 서버 응답에 따른 구체적인 에러 메시지 표시
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else if (error.response?.status === 401) {
        alert("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleRedirect = () => {
    navigate("/signup");
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.inputWrapper}>
        <input
          type="password"
          placeholder="Password"
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className={styles.loginButton} onClick={handleLogin}>
        LOGIN
      </button>
      <footer className={styles.signupContainer}>
        <p className={styles.signupText}>계정이 없으신가요?</p>
        <span className={styles.signupLink} onClick={handleRedirect}>
          SIGNUP
        </span>
      </footer>
    </main>
  );
}

export default Login;
