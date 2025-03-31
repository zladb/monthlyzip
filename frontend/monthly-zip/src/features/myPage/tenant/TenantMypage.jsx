"use client";
import React, { useState } from "react";
import styles from "./TenantMypage.module.css";


const TenantMypage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <main className={styles.container}>
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

        <section className={styles.profileSection}>
          <div className={styles.profileImageContainer}>
            <svg
              width="141"
              height="146"
              viewBox="0 0 141 146"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.profileCircle}
            >
              <g filter="url(#filter0_dd_1_5370)">
                <ellipse
                  cx="70.5"
                  cy="72"
                  rx="66.5"
                  ry="66"
                  fill="white"
                ></ellipse>
              </g>
              <defs>
                <filter
                  id="filter0_dd_1_5370"
                  x="0"
                  y="0"
                  width="141"
                  height="146"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood
                    floodOpacity="0"
                    result="BackgroundImageFix"
                  ></feFlood>
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  ></feColorMatrix>
                  <feOffset dy="-2"></feOffset>
                  <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                  <feComposite in2="hardAlpha" operator="out"></feComposite>
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  ></feColorMatrix>
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_1_5370"
                  ></feBlend>
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  ></feColorMatrix>
                  <feOffset dy="4"></feOffset>
                  <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                  <feComposite in2="hardAlpha" operator="out"></feComposite>
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  ></feColorMatrix>
                  <feBlend
                    mode="normal"
                    in2="effect1_dropShadow_1_5370"
                    result="effect2_dropShadow_1_5370"
                  ></feBlend>
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect2_dropShadow_1_5370"
                    result="shape"
                  ></feBlend>
                </filter>
              </defs>
            </svg>
          </div>

          <div className={styles.profileIconContainer}>
            <svg
              width="75"
              height="74"
              viewBox="0 0 75 74"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.profileIcon}
            >
              <g clipPath="url(#clip0_1_5371)">
                <path
                  d="M37.5 37C32.3438 37 27.9297 35.1885 24.2578 31.5656C20.5859 27.9427 18.75 23.5875 18.75 18.5C18.75 13.4125 20.5859 9.05729 24.2578 5.43438C27.9297 1.81146 32.3438 0 37.5 0C42.6562 0 47.0703 1.81146 50.7422 5.43438C54.4141 9.05729 56.25 13.4125 56.25 18.5C56.25 23.5875 54.4141 27.9427 50.7422 31.5656C47.0703 35.1885 42.6562 37 37.5 37ZM0 74V61.05C0 58.4292 0.683594 56.0203 2.05078 53.8234C3.41797 51.6266 5.23438 49.95 7.5 48.7938C12.3438 46.4042 17.2656 44.612 22.2656 43.4172C27.2656 42.2224 32.3438 41.625 37.5 41.625C42.6562 41.625 47.7344 42.2224 52.7344 43.4172C57.7344 44.612 62.6562 46.4042 67.5 48.7938C69.7656 49.95 71.582 51.6266 72.9492 53.8234C74.3164 56.0203 75 58.4292 75 61.05V74H0ZM9.375 64.75H65.625V61.05C65.625 60.2021 65.4102 59.4313 64.9805 58.7375C64.5508 58.0438 63.9844 57.5042 63.2812 57.1188C59.0625 55.0375 54.8047 53.4766 50.5078 52.4359C46.2109 51.3953 41.875 50.875 37.5 50.875C33.125 50.875 28.7891 51.3953 24.4922 52.4359C20.1953 53.4766 15.9375 55.0375 11.7188 57.1188C11.0156 57.5042 10.4492 58.0438 10.0195 58.7375C9.58984 59.4313 9.375 60.2021 9.375 61.05V64.75ZM37.5 27.75C40.0781 27.75 42.2852 26.8443 44.1211 25.0328C45.957 23.2214 46.875 21.0438 46.875 18.5C46.875 15.9563 45.957 13.7786 44.1211 11.9672C42.2852 10.1557 40.0781 9.25 37.5 9.25C34.9219 9.25 32.7148 10.1557 30.8789 11.9672C29.043 13.7786 28.125 15.9563 28.125 18.5C28.125 21.0438 29.043 23.2214 30.8789 25.0328C32.7148 26.8443 34.9219 27.75 37.5 27.75Z"
                  fill="#C0C0C0"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1_5371">
                  <rect width="75" height="74" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </div>

          <p className={styles.userType}>임차인</p>
        </section>

        <form className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.formLabel}>
              이메일 *
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                id="email"
                placeholder="User@naver.com"
                disabled
                className={styles.formInput}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>
              비밀번호 *
            </label>
            <div className={styles.inputWrapper}>
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                placeholder="영문, 숫자 조합 8~16자"
                className={styles.formInput}
              />
              {/* <button
                type="button"
                className={styles.eyeIconButton}
                onClick={togglePasswordVisibility}
                aria-label={passwordVisible ? "Hide password" : "Show password"}
              >
                <EyeIcon />
              </button> */}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.formLabel}>
              비밀번호 확인 *
            </label>
            <div className={styles.inputWrapper}>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                id="confirmPassword"
                placeholder="비밀번호를 한번 더 입력 해주세요."
                className={styles.formInput}
              />
              {/* <button
                type="button"
                className={styles.eyeIconButton}
                onClick={toggleConfirmPasswordVisibility}
                aria-label={
                  confirmPasswordVisible ? "Hide password" : "Show password"
                }
              >
                <EyeIcon />
              </button> */}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              이름 *
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="name"
                value="이지현"
                disabled
                className={styles.formInput}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone" className={styles.formLabel}>
              휴대폰 번호 *
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="tel"
                id="phone"
                value="010-4534-7643"
                disabled
                className={styles.formInput}
              />
            </div>
          </div>
        </form>

        <button type="submit" className={styles.submitButton}>
          수정
        </button>
      </main>
    </>
  );
};

export default TenantMypage;
