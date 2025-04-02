"use client";
import React, { useState, useRef, useEffect } from "react";
import styles from "./Mypage.module.css";

const Mypage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  // 로그인된 사용자 정보 (백엔드 API 연동 시 이 부분을 API 응답으로 대체)
  const [userInfo, setUserInfo] = useState({
    name: "김민주",
    email: "minju@naver.com",
    phone: "010-4534-7643",
    userType: "임대인",
  });

  const fileInputRef = useRef(null);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 저장 로직 예시
    console.log("비밀번호 저장:", password);
    alert("정보가 저장되었습니다.");
  };

  return (
    <>
      <main className={styles.container}>
        {/* 화살표 */}
        <button className={styles.backButton}>
          <svg
            width="27"
            height="24"
            viewBox="0 0 27 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.backArrow}
          >
            <path
              d="M10.125 19L2.25 12L10.125 5L11.7 6.4L6.55312 11H24.75V13H6.55312L11.7281 17.6L10.125 19Z"
              fill="black"
            ></path>
          </svg>
        </button>

        <h1 className={styles.pageTitle}>MY PAGE</h1>

        {/* 프로필 이미지 */}
        <section className={styles.profileSection}>
          <div
            className={styles.profileIconWrapper}
            onClick={handleImageClick}
            style={{ cursor: "pointer" }}
          >
            {profileImage ? (
              <img
                src={profileImage}
                alt="프로필 이미지"
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
              />
            ) : (
              <svg width="150" height="163" viewBox="0 0 150 163" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="70.5" cy="72" rx="66.5" ry="66" fill="white"></ellipse>
                <path d="M70.5 72C65.3438 72 60.9..." fill="#C0C0C0" />
              </svg>
            )}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
        </section>

        {/* role */}
        <p className={styles.userType}>{userInfo.userType}</p>

        <form className={styles.formContainer} onSubmit={handleSubmit}>
          {/* 이메일 */}
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>이메일 *</label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                id="email"
                value={userInfo.email}
                disabled
                className={styles.formInput}
              />
            </div>
          </div>

          {/* 비밀번호 */}
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>비밀번호 *</label>
            <div className={styles.inputWrapper}>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="영문, 숫자 조합 8~16자"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.formInput}
              />
            </div>
          </div>

          {/* 비밀번호 확인 */}
          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.formLabel}>비밀번호 확인 *</label>
            <div className={styles.inputWrapper}>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                placeholder="비밀번호를 한번 더 입력 해주세요."
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.formInput}
              />
            </div>
          </div>

          {/* 이름 */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>이름 *</label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="name"
                value={userInfo.name}
                disabled
                className={styles.formInput}
              />
            </div>
          </div>

          {/* 전화번호 */}
          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.formLabel}>휴대폰 번호 *</label>
            <div className={styles.inputWrapper}>
              <input
                type="tel"
                id="phone"
                value={userInfo.phone}
                disabled
                className={styles.formInput}
              />
            </div>
          </div>

          {/* 버튼 */}
          <button type="submit" className={styles.submitButton}>수정</button>
        </form>
      </main>
    </>
  );
};

export default Mypage;