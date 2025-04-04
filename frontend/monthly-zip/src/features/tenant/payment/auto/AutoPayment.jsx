import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./AutoPayment.module.css";


function AutoPayment() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  
  useEffect(() => {
    const checked = localStorage.getItem("isChecked") === "true";
    setIsChecked(checked);
  }, []);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    const newValue = !isChecked;
    setIsChecked(newValue);
    localStorage.setItem("isChecked", newValue.toString());
  };

  const handleClick = () => {
    navigate('/tenant/auto-payment-agreement');
  };

  return (
    <main className={styles.container}>
      <Header />
      <section className={styles.agreementSection}>
        <article className={styles.agreementHeader}>
          <div className={styles.agreementTitleWrapper}>
            <span 
              className={styles.customCheckbox}
              onClick={(e) => {
                e.stopPropagation(); 
                handleCheckboxChange();
              }}
            >{isChecked ? "☑" : "☐"}
            </span>
            <h2 className={styles.agreementTitle}>자동이체 등록 동의서</h2>
          </div>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/7dc526fd4de66a26d88fee5410918e4a35957459?placeholderIfAbsent=true"
            alt="Expand icon"
            className={styles.expandIcon}
            onClick={handleClick}
          />
      </article>
        <AgreementInfo />
        <ConfirmButton isChecked={isChecked} />
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/7a31437be2e255491b409270ea87dc20bf8f242b?placeholderIfAbsent=true"
          alt="Registration icon"
          className={styles.titleIcon}
        />
        <span className={styles.titleText}>자동이체 등록</span>
      </h1>
      <div className={styles.instructions}>
        <p className={styles.instructionPrimary}>자동이체를 등록하시려면 </p>
        <p className={styles.instructionSecondary}>아래 내용을 읽고 동의해주세요.</p>
     </div>
    </header>
  );
}


function AgreementInfo() {
  return (
    <p className={styles.agreementInfo}>
      자동이체 수수료는 무료입니다.
      <br />
      당행/적금 자동이체는 휴일에도 출금 처리 됩니다.
      <br />
      자동이체 등록/변경/해지 신청은 당일 처리가 불가합니다.
    </p>
  );
}

function ConfirmButton({ isChecked }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/tenant/auto-payment-register');
  }

  return (
    <button 
      className={`${isChecked ? styles.confirmButton : styles.inactiveConfirmButton}`}
      onClick={handleClick}
      disabled={!isChecked}
    >
      다음
    </button>
  );
}

export default AutoPayment;
