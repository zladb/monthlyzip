import React from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./AutoPaymentAgreement.module.css";

function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/tenant/auto-payment');
  };

  return (
    <header className={styles.header}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/2ed3d66e41cbcb4b7053951fee7de8a7cbb7c02c?placeholderIfAbsent=true"
        className={styles.headerIcon}
        alt="자동이체 아이콘"
        onClick={handleClick}
      />
      <h1 className={styles.headerTitle}>자동이체 등록</h1>
    </header>
  );
}

function ConsentForm({ isChecked, onCheckboxChange }) {
  return (
    <section className={styles.formSection}>
      <h2 className={styles.formTitle}>자동이체 등록 동의서</h2>
      <p className={styles.formIntro}>
        본인은 아래의 내용에 동의하며, 자동이체를 신청합니다.
      </p>

      <h2 className={styles.formTitle}>자동이체 출금 동의서</h2>
      <div className={styles.termsContainer}>
        <p className={styles.termsParagraph}>
          1. 본인은 신청한 계좌에서 지정된 금액이 자동 출금되는 것에 동의합니다.
          <br />
          2. 자동이체를 위한 금융정보가 금융기관 및 해당 기관에 제공될 수 있음에
          동의합니다.
          <br />
          3. 계좌 잔액 부족으로 인해 출금이 실패할 경우 이에 따른 불이익이 발생할
          수 있음을 확인합니다.
          <br />
          4. 자동이체 신청 및 해지는 신청인의 요청에 따라 앱에서 직접 처리될 수
          있음을 이해합니다.
          <br />
          5. 자동이체 해지 요청 시, 해지 신청 후 마지막 출금일까지 정상 처리될 수
          있음을 확인합니다.
        </p>
      </div>

      <p className={styles.instructionText}>
        [동의] 버튼을 눌러 자동이체를 신청하세요.
      </p>
    </section>
  );
}

function AutoPaymentAgreement() {
  const navigate = useNavigate();

  const handleAgreeClick = () => {
    navigate('/tenant/auto-payment');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <ConsentForm
          // isChecked={isChecked}
          // onCheckboxChange={handleCheckboxChange}
        />
      </div>
      <button 
        className={styles.confirmButton} 
        onClick={handleAgreeClick}>동의</button>
    </div>
  );
}

export default AutoPaymentAgreement;
