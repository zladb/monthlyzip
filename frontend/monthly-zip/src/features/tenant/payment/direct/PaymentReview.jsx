import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PaymentReview.module.css";


function PageHeader() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/tenant/direct-payment');
  };

  return (
    <nav className={styles.header}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/14b2d58de9eee0aec5b6348021c475e9d06eb9b1?placeholderIfAbsent=true"
        className={styles.backIcon}
        alt="Back"
        onClick={handleClick}
      />
      <h1 className={styles.pageTitle}>월세 결제</h1>
    </nav>
  );
}

// Bank account indicator
function BankAccount() {
  return (
      <p className={styles.accountDisplay}>110-123-456789</p>
  );
}

// Transfer details section
function TransferDetails() {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const storedAmount = localStorage.getItem("paymentAmount");
    if (storedAmount) {
      setAmount(Number(storedAmount));
    }
  }, []);

  const formattedAmount = amount.toLocaleString("ko-KR");

  return (
    <>
      <h2 className={styles.recipientTitle}>홍길동 님께</h2>
      <h3 className={styles.amountText}>
        {formattedAmount}  <span style={{ fontWeight: 500 }}>원 을 이체합니다.</span>
      </h3>
    </>
  );
}

// Account information section
function AccountInformation() {
  return (
    <>
      <hr className={styles.dividerTop} />
      <section className={styles.accountSection}>
        <label className={styles.accountLabel}>출금계좌</label>
        <p className={styles.accountNumber}>123456-78-901234</p>
      </section>
      <section className={styles.recipientSection}>
        <div className={styles.recipientLabelRow}>
          <label>받는 분 통장 표시</label>
          <label className={styles.rightAlignedLabel}>내 통장 표시</label>
        </div>
        <div className={styles.recipientValueRow}>
          <p>홍길동</p>
          <p className={styles.rightAlignedName}>김철수</p>
        </div>
      </section>
      <hr className={styles.dividerBottom} />
    </>
  );
}

// Main component
function PaymentReview() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/tenant/direct-payment-password');
  };
  
  return (
    <article className={styles.container}>
      <PageHeader />
      <div className={styles.content}>
        <BankAccount />
        <TransferDetails />
        <AccountInformation />
      </div>
      <button 
        className={styles.nextButton}
        onClick={handleClick}
      >
          다음
      </button>
    </article>
  );
}

export default PaymentReview;
