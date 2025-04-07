import React, { useEffect, useState } from "react";
import styles from "./PaymentConfirm.module.css";

function PaymentHeader({ amount }) {
  return (
    <header className={styles.paymentHeader}>
      <div className={styles.logoContainer}>
        <img src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/c339878aab4d2c3a9df37a92acc72340bcbac813?placeholderIfAbsent=true" className={styles.logo} alt="Payment logo" />
        <h2 className={styles.paymentLabel}>결제 금액</h2>
      </div>
      <h1 className={styles.paymentAmount}>{amount}</h1>
    </header>
  );
}

function TransactionDetails() {
  return (
    <section className={styles.transactionContainer}>
      <div className={styles.transactionRow}>
        <p className={styles.transactionLabels}>받는 계좌</p>
        <p className={styles.transactionValues}>110-123-456789</p>
      </div>

      <div className={styles.transactionRow}>
        <p className={styles.transactionLabels}>받는 분</p>
        <p className={styles.transactionValues}>홍길동</p>
      </div>

      <div className={styles.transactionRow}>
        <p className={styles.transactionLabels}>출금 계좌</p>
        <p className={styles.transactionValues}>123456-78-901234</p>
      </div>

      <div className={styles.transactionRow}>
        <p className={styles.transactionLabels}>보낸 분</p>
        <p className={styles.transactionValues}>김철수</p>
      </div>

      <div className={styles.transactionRow}>
        <p className={styles.transactionLabels}>날짜</p>
        <p className={styles.transactionValues}>2025. 03. 05 13:24</p>
      </div>
    </section>
  );
}


function ConfirmButton() {
  return <button className={styles.confirmButton}>확인</button>;
}

function PaymentConfirm() {
  const [paymentAmount, setPaymentAmount] = useState("");

  useEffect(() => {
    const amount = localStorage.getItem("paymentAmount");
    if (amount) {
      // 숫자 형식으로 변환한 후 콤마 찍고 "원" 붙이기
      const formatted = Number(amount).toLocaleString("ko-KR") + "원";
      setPaymentAmount(formatted);
    }
  }, []);

  return (
    <main className={styles.container}>
      <section className={styles.contentWrapper}>
      <PaymentHeader amount={paymentAmount || "0원"} />  
        <TransactionDetails />
      </section>
      <ConfirmButton />
    </main>
  );
}

export default PaymentConfirm;
