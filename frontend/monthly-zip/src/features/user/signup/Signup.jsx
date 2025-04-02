import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import React from "react";
import styles from './Signup.module.css';

function Signup() {
  const navigate = useNavigate();
  
  // 체크박스 상태 관리
  const [agreeAll, setAgreeAll] = useState(false);
  const [termsOfService, setTermsOfService] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [locationTerms, setLocationTerms] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);

  // 이메일, 비밀번호 등 입력값
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [memberType, setMemberType] = useState("");

  // "모두 동의" 체크박스를 클릭하면 나머지 체크박스들이 자동으로 선택되도록 처리
  const handleAgreeAllChange = (event) => {
    const isChecked = event.target.checked;
    setAgreeAll(isChecked);
    setTermsOfService(isChecked);
    setPrivacyPolicy(isChecked);
    setLocationTerms(isChecked);
    setMarketingConsent(isChecked);
  };

  // 화살표 버튼
  const handleRedirect = () => {
    navigate('/login'); 
  };

  // Sign up 버튼
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formattedMemberType = memberType === "임대인" || memberType === "임차인" ? memberType : "";

//     // 입력값을 서버로 보냄
//     axios
//       .post("/api/auth/signup", {
//         email,
//         password,
//         confirmPassword,
//         name,
//         phoneNumber,
//         memberType: formattedMemberType,  // 서버에서 기대하는 값 그대로 전송
//       }, {
//         headers: {
//           'Content-Type': 'application/json', // 올바른 헤더 설정
//         }
//       })
      
      
//       .then((response) => {
//         console.log("회원가입 성공:", response.data);
//         navigate("/login");
//       })
//       .catch((error) => {
//         console.error("회원가입 실패:", error);
//         if (error.response) {
//           console.error("서버 응답:", error.response.data);
//           console.error("서버 상태 코드:", error.response.status);
//         } else if (error.request) {
//           console.error("요청이 서버로 전송되었지만 응답을 받지 못함");
//         } else {
//           console.error("요청 설정에서 오류 발생:", error.message);
//         }
//         alert("회원가입에 실패했습니다. 다시 시도해주세요.");
//       });
// };

const handleSubmit = (event) => {
  event.preventDefault();

  // 🔹 영어 -> 한글 변환을 위한 매핑 객체
  const memberTypeMapping = {
    landlord: "임대인",
    tenant: "임차인"
  };

  const requestData = {
    email,
    password,
    confirmPassword,
    name,
    phoneNumber,
    memberType: memberTypeMapping[memberType] || memberType // 변환된 한글 값 적용
  };

  console.log("보내는 데이터:", JSON.stringify(requestData, null, 2));

  axios
    .post("/api/auth/signup", requestData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log("회원가입 성공:", response.data);
      navigate("/login");
    })
    .catch((error) => {
      console.error("회원가입 실패:", error);
      if (error.response) {
        console.error("서버 응답:", error.response.data);
        console.error("서버 상태 코드:", error.response.status);
      } else if (error.request) {
        console.error("요청이 서버로 전송되었지만 응답을 받지 못함");
      } else {
        console.error("요청 설정에서 오류 발생:", error.message);
      }
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    });
};

  const [showPassword1, setShowPassword1] = useState(false); 
  const [showPassword2, setShowPassword2] = useState(false); 

  // 비밀번호 보이기/숨기기 토글 함수
  const togglePasswordVisibility1 = () => {
    setShowPassword1((prev) => !prev); // 'setShowPassword1' 사용
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2((prev) => !prev);
  };

  return (
    <form className={styles.div} onSubmit={handleSubmit}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/ec3637c49e111e793c356889858c828968d2bbb9?placeholderIfAbsent=true"
        className={styles.img}
        alt="Logo"
        onClick={handleRedirect} 
      />
      <h1 className={styles.signup}>SIGNUP</h1>

      {/* 이메일 */}
      <label className={styles.div2}>이메일 * </label>
      <input
        type="email"
        placeholder="예) abc@gmail.com"
        className={styles.abcgmailcom}
        value={email}
        onChange={(e) => setEmail(e.target.value)} // 이메일 상태 관리
      />

      {/* 비밀번호 */}
      <label className={styles.div3}>비밀번호 *</label>
      <div className={styles.div4}>
        <input
          type={showPassword1 ? "text" : "password"} // 상태에 따라 변경
          placeholder="영문, 숫자 조합 8~16자"
          className={styles.css816}
          value={password}
          onChange={(e) => setPassword(e.target.value)} // 비밀번호 상태 관리
        />
        <img
          src={showPassword1 ? "https://cdn.builder.io/api/v1/image/assets/TEMP/b453452f4563ac178e576b99a93d99178e3a67c8" : "https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/8a3df590d957665a027395978a418cf820c137b4?placeholderIfAbsent=true"}
          className={styles.img2}
          alt="Toggle password visibility"
          onClick={togglePasswordVisibility1} // 개별 토글 함수 사용
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* 비밀번호 확인 */}
      <label className={styles.div5}>비밀번호 확인 *</label>
      <div className={styles.div6}>
        <input
          type={showPassword2 ? "text" : "password"} // 상태에 따라 변경
          placeholder="비밀번호를 한번 더 입력 해주세요."
          className={styles.div7}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} // 비밀번호 확인 상태 관리
        />
        <img
          src={showPassword2 ? "https://cdn.builder.io/api/v1/image/assets/TEMP/b453452f4563ac178e576b99a93d99178e3a67c8" : "https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/8a3df590d957665a027395978a418cf820c137b4?placeholderIfAbsent=true"}
          className={styles.img3}
          alt="Toggle password visibility"
          onClick={togglePasswordVisibility2} // 개별 토글 함수 사용
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* 이름*/}
      <label className={styles.div8}>이름 * </label>
      <input
        type="text"
        placeholder="예) 홍길동"
        className={styles.div9}
        value={name}
        onChange={(e) => setName(e.target.value)} // 이름 상태 관리
      />

      {/* 전화번호 */}
      <label className={styles.div10}>휴대폰 번호 * </label>
      <input
        type="tel"
        placeholder="예) 010-1234-3482"
        className={styles.css01012343482}
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)} // 전화번호 상태 관리
      />

      {/* role 선택 */}
      <label className={styles.div11}>필수 선택 * </label>
      <div className={styles.div12}>
        <div className={styles.div13}>
          <label htmlFor="landlord">임대인</label>
          <input
            type="radio"
            id="landlord"
            name="memberType"
            className={styles.div14}
            value="landlord"
            onChange={(e) => setMemberType(e.target.value)} 
          />
        </div>
        <div className={styles.div15}>
          <label htmlFor="tenant">임차인</label>
          <input
            type="radio"
            id="tenant"
            name="memberType"
            className={styles.div16}
            value="tenant"
            onChange={(e) => setMemberType(e.target.value)} 
          />
        </div>
      </div>

      {/* 약관 동의 */}
      <div className={styles.div17}>
        <input
          type="checkbox"
          className={styles.div18}
          id="agreeAll"
          checked={agreeAll}
          onChange={handleAgreeAllChange}
        />
        <label htmlFor="agreeAll" className={styles.div19}>
          아래 약관에 모두 동의 합니다.
        </label>
      </div>

      <div className={styles.div20}>
        <input
          type="checkbox"
          className={styles.div21}
          id="termsOfService"
          checked={termsOfService}
          onChange={() => setTermsOfService(!termsOfService)}
        />
        <label htmlFor="termsOfService" className={styles.div22}>
          이용약관 필수동의{" "}
          <span
            style={{
              textDecoration: "underline",
              color: "rgba(118,118,118,1)",
            }}
          >
            자세히 보기
          </span>
        </label>
      </div>

      <div className={styles.div23}>
        <input
          type="checkbox"
          className={styles.div24}
          id="privacyPolicy"
          checked={privacyPolicy}
          onChange={() => setPrivacyPolicy(!privacyPolicy)}
        />
        <label htmlFor="privacyPolicy" className={styles.div25}>
          개인정보 처리방침 필수 동의{" "}
          <span
            style={{
              textDecoration: "underline",
              color: "rgba(118,118,118,1)",
            }}
          >
            자세히 보기
          </span>
        </label>
      </div>

      <div className={styles.div26}>
        <input
          type="checkbox"
          className={styles.div27}
          id="locationTerms"
          checked={locationTerms}
          onChange={() => setLocationTerms(!locationTerms)}
        />
        <label htmlFor="locationTerms" className={styles.div28}>
          위치정보 이용 약관 동의{" "}
          <span
            style={{
              textDecoration: "underline",
              color: "rgba(118,118,118,1)",
            }}
          >
            자세히 보기
          </span>
        </label>
      </div>

      <div className={styles.div29}>
        <input
          type="checkbox"
          className={styles.div30}
          id="marketingConsent"
          checked={marketingConsent}
          onChange={() => setMarketingConsent(!marketingConsent)}
        />
        <label htmlFor="marketingConsent" className={styles.div31}>
          마케팅 정보 수신 선택 동의{" "}
          <span
            style={{
              textDecoration: "underline",
              color: "rgba(118,118,118,1)",
            }}
          >
            자세히 보기
          </span>
        </label>
      </div>

      {/* Signup Button */}
      <button type="submit" className={styles.signup2}>
        SIGNUP
      </button>
    </form>
  );
}

export default Signup;
