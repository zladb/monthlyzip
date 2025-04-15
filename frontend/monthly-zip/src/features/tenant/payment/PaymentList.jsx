import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./PaymentList.module.css";
import PaymentCard from "./PaymentCard";


const PaymentList = () => {
  const [activeTab, setActiveTab] = useState("payment"); // 'payment' 또는 'unpaid'
  const [payments, setPayments] = useState([]); // 전체 납부 리스트

  const navigate = useNavigate();
  const location = useLocation();

  // URL 파라미터(tab)에 따라 초기 탭 설정
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get("tab");

    if (tabParam === "unpaid") {
      setActiveTab("unpaid");
    } else {
      setActiveTab("payment");
    }
  }, [location.search]);

  useEffect(() => {
    const fetchPayments = () => {
      axios.get("/api/payments", { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
  
          if (response.data.success) {
            setPayments(response.data.result);
          } else {
            console.error("납부 목록을 가져오지 못했습니다:", response.data.message);
          }
        })
        .catch((error) => console.error("납부 목록을 가져오는 중 오류 발생:", error));
    };
    
    fetchPayments();
  }, []);

  
  const unpaidData = payments.filter(payment => payment.paymentStatus === "미납");

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/3c6666561bc2cc8fbdaeee68de9dd7517f2bcfc7?placeholderIfAbsent=true"
          className={styles.headerIcon}
          alt=""
          onClick = {() => navigate("/tenant/payment-main")} 
        />
        <h2 className={styles.headerTitle}>월세 납부 내역</h2>
      </header>

      <nav className={styles.tabNavigation}>
        <button
          className={`${styles.tabButton} ${activeTab === "payment" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("payment")}
        >
          전체 내역
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
        {(activeTab === "payment" ? payments : unpaidData).map((payment, index) => {
          const dueDate = new Date(payment.dueDate);
          const prevMonthDate = new Date(dueDate.setMonth(dueDate.getMonth() - 1));
          const displayYear = prevMonthDate.getFullYear();
          const displayMonth = prevMonthDate.getMonth() + 1; // 0-based index라 +1 필요

          return (
            <PaymentCard
              key={index}
              paymentId={payment.paymentId}
              month={displayMonth}
              year={displayYear}
              status={payment.paymentStatus}
              date={payment.paymentStatus === "미납" ? "-" : payment.paymentDate}
              amount={payment.amount}
            />
          );
        })}
      </div>
    </section>
  );
};

export default PaymentList;
