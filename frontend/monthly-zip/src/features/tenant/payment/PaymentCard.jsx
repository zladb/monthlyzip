import React from "react";
import styles from "./PaymentList.module.css";

const PaymentCard = ({ month, year, status, date, amount }) => {
  return (
    <article className={styles.paymentCard}>
      <div className={styles.paymentDetails}>
        <h3 className={styles.paymentPeriod}>
          {year}년 {month}월
        </h3>
        <div className={styles.statusContainer}>
          <span className={styles.statusLabel}>상태</span>
          <span className={styles.statusPaid}>완납</span>
        </div>
      </div>
      <div className={styles.paymentInfo}>
        <time className={styles.paymentDate}>{date}</time>
        <div className={styles.amountContainer}>
          <span className={styles.amountLabel}>금액</span>
          <span className={styles.amountValue}>{amount}</span>
        </div>
      </div>
    </article>
  );
};

export default PaymentCard;
