"use client"; 
import React, { useState, useRef, useEffect } from "react";
import styles from "./Mypage.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    userType: "",
  });

  const [passwordVisible] = useState(false);
  const [confirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null); // 서버 전송용
  const [previewImage, setPreviewImage] = useState(null); // UI 표시용

  const fileInputRef = useRef(null);

  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const res = await axios.get("/api/members/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data.result;

        setUserInfo({
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
          userType: user.userType,
        });

        setPreviewImage(user.profileImageUrl || null);
      } catch (err) {
        console.error("사용자 정보 불러오기 실패:", err);
      }
    };

    fetchUserInfo();
  }, []);

  // 프로필 이미지 변경 처리
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file); // 서버 전송용
      const previewURL = URL.createObjectURL(file); // 브라우저 미리보기용
      setPreviewImage(previewURL); // ✅ 렌더링용 미리보기 상태 설정
    }
  };

  // 저장 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");

    try {
      // 비밀번호 변경
      if (password || confirmPassword) {
        if (password !== confirmPassword) {
          alert("비밀번호가 일치하지 않습니다.");
          return;
        }

        await axios.patch(
          "/api/members/password",
          { password, confirmPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("비밀번호가 성공적으로 변경되었습니다.");
        setPassword("");
        setConfirmPassword("");
      }

      // 프로필 이미지 변경
      if (profileImage && profileImage instanceof File) {
        const formData = new FormData();
        formData.append("profileImage", profileImage);
        
        await axios.patch("/api/members/profile-image", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        alert("프로필 이미지가 변경되었습니다.");
      }

      if (!(password || confirmPassword || profileImage)) {
        alert("변경할 정보가 없습니다.");
      }
    } catch (error) {
      console.error("정보 변경 실패:", error);
      console.log("서버 응답:", error.response?.data);
      alert("정보 변경 중 오류가 발생했습니다: " + (error.response?.data?.message || "알 수 없는 에러"));
    }
  };
  console.log("업로드된 이미지:", profileImage);
  console.log("미리보기:", previewImage);


//화살표
  const handleBackClick = () => {
    if (userInfo.userType === "임대인") {
      navigate("/landlord");
    } else if (userInfo.userType === "임차인") {
      navigate("/tenant");
    } else {
      navigate("/"); 
    }
  };

  return (
    <>
      <main className={styles.container}>
        {/* 화살표 */}
      <button className={styles.backButton} onClick={handleBackClick}>
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
          <div className={styles.profileWrapper}>
            <div
              className={styles.profileIconWrapper}
              onClick={handleImageClick}
            >
            <img
              src={profileImage || "/프로필 이미지.png"}
              alt="프로필 이미지"
              className={styles.profileImage}
            />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
            <div className={styles.plusIcon}>+</div>
            <div className={styles.plusIcon} onClick={handleImageClick}>+</div>
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
                id="phoneNumber"
                value={userInfo.phoneNumber}
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

