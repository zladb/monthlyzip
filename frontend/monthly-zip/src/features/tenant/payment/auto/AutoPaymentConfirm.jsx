import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AutoPaymentConfirm.module.css";

function Header() {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/tenant/auto-payment-register');
    };
    
    return (
      <header className={styles.headerContainer}>
        <img
            src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/7a31437be2e255491b409270ea87dc20bf8f242b?placeholderIfAbsent=true"
            alt="Registration icon"
            className={styles.titleIcon}
            onClick={handleClick}
          />
  
        <h1 className={styles.title}>자동이체 등록</h1>
      </header>
    );
  }


// Transfer details component with recipient and amount
const TransferDetails = () => {
  return (
    <>
      <p className={styles.accountNumber}>신한 110-123-456789</p>
      <h2 className={styles.recipientName}>홍길동 님께</h2>
      <h3 className={styles.transferAmount}>
        500,000 <span className={styles.regularWeight}>원 자동이체를</span>
        <br />
        <span className={styles.regularWeight}>등록하시겠습니까?</span>
      </h3>
    </>
  );
};

// Account information component
const AccountInformation = () => {
  return (
    <section className={styles.accountInfoRow}>
      <p className={styles.accountInfoLabel}>출금계좌</p>
      <p className={styles.accountInfoValue}>123456-78-901234</p>
    </section>
  );
};

// Transfer schedule component with frequency, period, and display names
const TransferSchedule = () => {
  return (
    <section className={styles.scheduleContainer}>
      <div className={styles.scheduleLabels}>
        <p>자동이체주기</p>
        <p className={styles.periodLabel}>자동이체기간</p>
        <p className={styles.recipientDisplayLabel}>받는 분</p>
        <p className={styles.myDisplayLabel}>보내는 분</p>
      </div>
      <div className={styles.scheduleValues}>
        <p className={styles.frequencyValue}>매월/5일</p>
        <p className={styles.periodValue}>2024.01 ~ 2026.01</p>
        <div className={styles.displayNamesContainer}>
          <p>홍길동</p>
          <p className={styles.myDisplayValue}>김철수</p>
        </div>
      </div>
    </section>
  );
};

// Main component that combines all the smaller components
function AutoPaymentConfirm() {
  const navigate = useNavigate();

  const handleConfirm = () => {
    localStorage.setItem("isAutoPaymentActive", "true");
    navigate("/tenant/payment-main");
  };

  return (
    <main className={styles.container}>
      <Header />
      <div className={styles.contentWrapper}>
        <TransferDetails />
        <hr className={styles.divider} />
        <AccountInformation />
        <TransferSchedule />
        <hr className={styles.bottomDivider} />
      </div>
      <button type="button" className={styles.nextButton} onClick={handleConfirm}>
        확인
     </button>
    </main>
  );
}

export default AutoPaymentConfirm;
