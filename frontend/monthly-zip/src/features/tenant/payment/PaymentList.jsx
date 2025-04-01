import React, { useState } from "react";
import styles from "./PaymentList.module.css";
import PaymentCard from "./PaymentCard";

const PaymentList = () => {
  const [activeTab, setActiveTab] = useState("payment"); // 'payment' 또는 'unpaid'

  // 납부 목록 샘플 데이터
  const paymentData = [
    {
      month: "3",
      year: "2025",
      status: "완납",
      date: "2025.03.05",
      amount: "500,000원",
    },
    {
      month: "2",
      year: "2025",
      status: "완납",
      date: "2025.02.03",
      amount: "500,000원",
    },
    {
      month: "1",
      year: "2025",
      status: "완납",
      date: "2025.01.05",
      amount: "500,000원",
    },
    {
      month: "11",
      year: "2024",
      status: "완납",
      date: "2024.11.05",
      amount: "500,000원",
    },
    {
      month: "10",
      year: "2024",
      status: "완납",
      date: "2024.10.04",
      amount: "500,000원",
    },
    {
      month: "12",
      year: "2024",
      status: "미납", // 미납 내역 추가
      date: "2024.12.01",
      amount: "500,000원",
    },
  ];

  // 미납 내역만 필터링
  const unpaidData = paymentData.filter(payment => payment.status === "미납");

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/3c6666561bc2cc8fbdaeee68de9dd7517f2bcfc7?placeholderIfAbsent=true"
          className={styles.headerIcon}
          alt=""
        />
        <h2 className={styles.headerTitle}>월세 납부 내역</h2>
      </header>

      <nav className={styles.tabNavigation}>
        <button
          className={`${styles.tabButton} ${activeTab === "payment" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("payment")}
        >
          납부 내역
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === "unpaid" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("unpaid")}
        >
          미납 내역
        </button>
      </nav>

      <hr className={styles.divider} />

      <div className={styles.cardContainer}>
        {/* activeTab이 'payment'일 때는 납부 내역, 'unpaid'일 때는 미납 내역만 출력 */}
        {(activeTab === "payment" ? paymentData : unpaidData).map((payment, index) => (
          <PaymentCard
            key={index}
            month={payment.month}
            year={payment.year}
            status={payment.status}
            date={payment.date}
            amount={payment.amount}
          />
        ))}
      </div>
    </section>
  );
};

export default PaymentList;
