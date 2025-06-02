import React from "react";
import { Link } from "react-router-dom";
import styles from "./PaymentList.module.css";

const PaymentCard = ({ paymentId, month, year, date, amount, status }) => {
  const formattedDate =
    status === "미납" || !date
      ? "-"
      : new Date(date).toLocaleDateString("ko-KR", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        });
  
  return (
    <Link to={`/tenant/payment-detail/${paymentId}`} className={styles.link}>
      <article className={styles.paymentCard}>
        <div className={styles.paymentDetails}>
          <h3 className={styles.paymentPeriod}>
            {year}년 {month}월
          </h3>
          <div className={styles.statusContainer}>
            <span className={styles.statusLabel}>상태</span>
            <span
              className={
                status === "미납" ? styles.statusUnPaid : styles.statusPaid
              }
            >
              {status}
            </span>
          </div>
        </div>
        <div className={styles.paymentInfo}>
          {/* ✅ 항상 날짜 영역 표시, 미납이면 '-' */}
          <time className={styles.paymentDate}>{formattedDate}</time>

          <div className={styles.amountContainer}>
            <span className={styles.amountLabel}>금액</span>
            <span className={styles.amountValue}>{Number(amount).toLocaleString()}원</span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PaymentCard;
