"use client";
import React, { useState } from "react";
import styles from "./LandlordMypage.module.css";


const LandlordMypage = () => {
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
        <div className={styles.profileIconWrapper}>
          <div
            dangerouslySetInnerHTML={{
              __html:
                "<svg id=\"352:6419\" width=\"150\" height=\"163\" viewBox=\"0 0 150 163\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\" class=\"profile-icon\" style=\"width: 100%; height: 100%\"> <g filter=\"url(#filter0_dd_352_6419)\"> <ellipse cx=\"70.5\" cy=\"72\" rx=\"66.5\" ry=\"66\" fill=\"white\"></ellipse> </g> <g clip-path=\"url(#clip0_352_6419)\"> <path d=\"M70.5 72C65.3438 72 60.9297 70.1885 57.2578 66.5656C53.5859 62.9427 51.75 58.5875 51.75 53.5C51.75 48.4125 53.5859 44.0573 57.2578 40.4344C60.9297 36.8115 65.3438 35 70.5 35C75.6562 35 80.0703 36.8115 83.7422 40.4344C87.4141 44.0573 89.25 48.4125 89.25 53.5C89.25 58.5875 87.4141 62.9427 83.7422 66.5656C80.0703 70.1885 75.6562 72 70.5 72ZM33 109V96.05C33 93.4292 33.6836 91.0203 35.0508 88.8234C36.418 86.6266 38.2344 84.95 40.5 83.7938C45.3438 81.4042 50.2656 79.612 55.2656 78.4172C60.2656 77.2224 65.3438 76.625 70.5 76.625C75.6562 76.625 80.7344 77.2224 85.7344 78.4172C90.7344 79.612 95.6562 81.4042 100.5 83.7938C102.766 84.95 104.582 86.6266 105.949 88.8234C107.316 91.0203 108 93.4292 108 96.05V109H33ZM42.375 99.75H98.625V96.05C98.625 95.2021 98.4102 94.4313 97.9805 93.7375C97.5508 93.0438 96.9844 92.5042 96.2812 92.1188C92.0625 90.0375 87.8047 88.4766 83.5078 87.4359C79.2109 86.3953 74.875 85.875 70.5 85.875C66.125 85.875 61.7891 86.3953 57.4922 87.4359C53.1953 88.4766 48.9375 90.0375 44.7188 92.1188C44.0156 92.5042 43.4492 93.0438 43.0195 93.7375C42.5898 94.4313 42.375 95.2021 42.375 96.05V99.75ZM70.5 62.75C73.0781 62.75 75.2852 61.8443 77.1211 60.0328C78.957 58.2214 79.875 56.0438 79.875 53.5C79.875 50.9563 78.957 48.7786 77.1211 46.9672C75.2852 45.1557 73.0781 44.25 70.5 44.25C67.9219 44.25 65.7148 45.1557 63.8789 46.9672C62.043 48.7786 61.125 50.9563 61.125 53.5C61.125 56.0438 62.043 58.2214 63.8789 60.0328C65.7148 61.8443 67.9219 62.75 70.5 62.75Z\" fill=\"#C0C0C0\"></path> </g> <g filter=\"url(#filter1_d_352_6419)\"> <circle cx=\"117\" cy=\"127.092\" r=\"20\" fill=\"#FE6A00\"></circle> <text fill=\"white\" xml:space=\"preserve\" style=\"white-space: pre\" font-family=\"Inter\" font-size=\"31\" letter-spacing=\"0em\"><tspan x=\"106.909\" y=\"137.273\">+</tspan></text> </g> <defs> <filter id=\"filter0_dd_352_6419\" x=\"0\" y=\"0\" width=\"141\" height=\"146\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\"> <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"></feFlood> <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"></feColorMatrix> <feOffset dy=\"-2\"></feOffset> <feGaussianBlur stdDeviation=\"2\"></feGaussianBlur> <feComposite in2=\"hardAlpha\" operator=\"out\"></feComposite> <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"></feColorMatrix> <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_352_6419\"></feBlend> <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"></feColorMatrix> <feOffset dy=\"4\"></feOffset> <feGaussianBlur stdDeviation=\"2\"></feGaussianBlur> <feComposite in2=\"hardAlpha\" operator=\"out\"></feComposite> <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"></feColorMatrix> <feBlend mode=\"normal\" in2=\"effect1_dropShadow_352_6419\" result=\"effect2_dropShadow_352_6419\"></feBlend> <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect2_dropShadow_352_6419\" result=\"shape\"></feBlend> </filter> <filter id=\"filter1_d_352_6419\" x=\"92\" y=\"104.092\" width=\"58\" height=\"58\" filterUnits=\"userSpaceOnUse\" color-interpolation-filters=\"sRGB\"> <feFlood flood-opacity=\"0\" result=\"BackgroundImageFix\"></feFlood> <feColorMatrix in=\"SourceAlpha\" type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0\" result=\"hardAlpha\"></feColorMatrix> <feOffset dx=\"4\" dy=\"6\"></feOffset> <feGaussianBlur stdDeviation=\"4.5\"></feGaussianBlur> <feComposite in2=\"hardAlpha\" operator=\"out\"></feComposite> <feColorMatrix type=\"matrix\" values=\"0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0\"></feColorMatrix> <feBlend mode=\"normal\" in2=\"BackgroundImageFix\" result=\"effect1_dropShadow_352_6419\"></feBlend> <feBlend mode=\"normal\" in=\"SourceGraphic\" in2=\"effect1_dropShadow_352_6419\" result=\"shape\"></feBlend> </filter> <clipPath id=\"clip0_352_6419\"> <rect width=\"75\" height=\"74\" fill=\"white\" transform=\"translate(33 35)\"></rect> </clipPath> </defs> </svg>",
            }}
          />
        </div>
      </section>

      {/* role */}
      <p className={styles.userType}>임대인</p>

  
        <form className={styles.formContainer}>
          
          {/* 이메일 */}
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

          {/* 비밀번호 */}
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
            </div>
          </div>

          {/* 비밀번호 확인 */}
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
            </div>
          </div>

          {/* 이름 */}
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.formLabel}>
              이름 *
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                id="name"
                value="김민주"
                disabled
                className={styles.formInput}
              />
            </div>
          </div>

          {/* 전화번호 */}
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
        
        {/* 버튼 */}
        <button type="submit" className={styles.submitButton}>
          수정
        </button>
      </main>
    </>
  );
};

export default LandlordMypage;
