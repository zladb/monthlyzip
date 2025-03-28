import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    navigate('/login'); // 'login' 경로로 이동
  };

  // Sign up 버튼
  const handleSubmit = (event) => {
    event.preventDefault();
    // 여기서 DB에 데이터를 저장하는 코드가 필요
    navigate('/login'); 
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
      />

      {/* 비밀번호 */}
      <label className={styles.div3}>비밀번호 *</label>
      <div className={styles.div4}>
        <input
          type={showPassword1 ? "text" : "password"} // 상태에 따라 변경
          placeholder="영문, 숫자 조합 8~16자"
          className={styles.css816}
        />
        <img
          src={
            showPassword1
              ? "https://cdn.builder.io/api/v1/image/assets/TEMP/b453452f4563ac178e576b99a93d99178e3a67c8"
              : "https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/8a3df590d957665a027395978a418cf820c137b4?placeholderIfAbsent=true"
          }
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
        />
        <img
          src={
            showPassword2
              ? "https://cdn.builder.io/api/v1/image/assets/TEMP/b453452f4563ac178e576b99a93d99178e3a67c8"
              : "https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/8a3df590d957665a027395978a418cf820c137b4?placeholderIfAbsent=true"
          }
          className={styles.img3}
          alt="Toggle password visibility"
          onClick={togglePasswordVisibility2} // 개별 토글 함수 사용
          style={{ cursor: "pointer" }}
        />
      </div>



      {/* 이름*/}
      <label className={styles.div8}>이름 * </label>
      <input type="text" placeholder="예) 홍길동" className={styles.div9} />

      {/* 전화번호 */}
      <label className={styles.div10}>휴대폰 번호 * </label>
      <input
        type="tel"
        placeholder="예) 010-1234-3482"
        className={styles.css01012343482}
      />

      {/* role 선택 */}
      <label className={styles.div11}>필수 선택 * </label>
      <div className={styles.div12}>
        <div className={styles.div13}>
          <label htmlFor="landlord">임대인</label>
          <input
            type="radio"
            id="landlord"
            name="userType"
            className={styles.div14}
          />
        </div>
        <div className={styles.div15}>
          <label htmlFor="tenant">임차인</label>
          <input
            type="radio"
            id="tenant"
            name="userType"
            className={styles.div16}
          />
        </div>
      </div>

      {/* 돟의 */}
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
