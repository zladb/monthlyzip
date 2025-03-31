import React from "react";
import { Link } from "react-router-dom";
import styles from "./PaymentList.module.css";

const PaymentCard = ({ month, year, date, amount, status }) => {
  return (
    <Link to={`/tenant/payment-detail/${year}/${month}`} className={styles.link}>
      <article className={styles.paymentCard}>
        <div className={styles.paymentDetails}>
          <h3 className={styles.paymentPeriod}>
            {year}년 {month}월
          </h3>
          <div className={styles.statusContainer}>
            <span className={styles.statusLabel}>상태</span>
            <span
              className={
                status === "완납" ? styles.statusPaid : styles.statusUnpaid
              }
            >
              {status}
            </span>
          </div>
        </div>
        <div className={styles.paymentInfo}>
          <time className={styles.paymentDate}>
            {date ? date: "-"}</time>
          <div className={styles.amountContainer}>
            <span className={styles.amountLabel}>금액</span>
            <span className={styles.amountValue}>{amount}</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PaymentCard;
