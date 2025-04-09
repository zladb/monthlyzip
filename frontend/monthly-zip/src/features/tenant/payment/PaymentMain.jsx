import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./PaymentMain.module.css";
import Navbar from "../navbar/Navbar"


function PaymentOptionCard({ imageUrl, title, extraPadding = false, onClick }) {
    return (
      <article
        className={`${styles.card} ${extraPadding ? styles.extraPadding : ""}`}
        onClick={onClick}
        style={{ cursor: 'pointer' }} // 사용자에게 클릭 가능한 UI로 보이게
      >
        <img src={imageUrl} alt="" className={styles.cardIcon} />
        <h3 className={styles.cardTitle}>{title}</h3>
      </article>
    );
  }

function AutoPaymentSection({ isAutoPaymentActive, setIsAutoPaymentActive }) {
    const navigate = useNavigate();

    const handleToggleAutoPayment = () => {
      const newValue = !isAutoPaymentActive;
      setIsAutoPaymentActive(newValue);
      localStorage.setItem("isAutoPaymentActive", newValue.toString());
  
      if (newValue) {
        navigate("/tenant/auto-payment");
      }
    };


    return (
      <section className={styles.autoPaymentContainer}>
        <h3 className={styles.autoPaymentTitle}>자동이체</h3>
        <div className={styles.autoPaymentInfo}>

          {/* {isAutoPaymentActive && (
          <div className={styles.registrationInfo}>
            <p>자동이체가 등록되었습니다. <br />매월 10일에 결제됩니다.</p>
            <p>자동이체가 등록되었습니다.</p>
            </div>
        )} */}
        
          <div className={styles.toggleContainer}>
          <span className={styles.toggleLabel}>
            {isAutoPaymentActive ? "자동이체 등록됨" : "자동이체 미등록"}
          </span>
          <button 
            className={`${styles.toggleButton} ${isAutoPaymentActive ? styles.active : ''}`}
            onClick={handleToggleAutoPayment}
            aria-pressed={isAutoPaymentActive}
          >
            <span className={styles.toggleSlider}></span>
            <span className={styles.srOnly}>
              {isAutoPaymentActive ? "자동이체 해지하기" : "자동이체 등록하기"}
            </span>
          </button>
        </div>
      
        </div>
      </section>
    );
  }

function PaymentHistorySection() {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get("/api/payments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        });
  
        if (response.data.success) {
          const allPayments = response.data.result;
  
          const sorted = allPayments
            .filter(item => item.paymentDate) // 납부된 항목만
            .sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate))
            .slice(0, 3)
            .map((item) => {
              const dueDate = new Date(item.dueDate);
              dueDate.setMonth(dueDate.getMonth() - 1); // -1개월 처리
              const monthStr = `${dueDate.getFullYear()}. ${String(dueDate.getMonth() + 1).padStart(2, "0")}`;
              return {
                month: monthStr,
                amount: `${item.amount.toLocaleString()}원`,
              };
            });
  
          setPaymentHistory(sorted);
        } else {
          console.error("납부 목록을 가져오지 못했습니다:", response.data.message);
        }
      } catch (error) {
        console.error("납부 목록을 가져오는 중 오류 발생:", error);
      }
    };
  
    fetchPayments();
  }, []);
  

  return (
    <section className={styles.historyContainer}>
       <div className={styles.headerWrapper}>
          <h3 className={styles.historyTitle}>월세 납부 내역</h3>
          <div className={styles.viewMoreWrapper}>
            <button className={styles.viewMoreButton}
              onClick={() => navigate("/tenant/payment-list")}>
              더보기
              <img
              src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/0a1e9defef0f30d1edc82acadcd32f09633c3170?placeholderIfAbsent=true"
              alt="더보기"
              className={styles.viewMoreIcon}
            />
           </button>
          </div>
        </div>
    
        <div className={styles.historyList}>
            {paymentHistory.map((payment, index) => (
            <div key={index} className={styles.paymentItem}>
                <p className={styles.historyMonth}>{payment.month}</p>
                <p className={styles.historyAmount}>{payment.amount}</p>
            </div>
            ))}
        </div>
      
    </section>
  );
}

  function PaymentMain() {
    const navigate = useNavigate();
    const [tenantName, setTenantName] = useState("");

    const [isAutoPaymentActive, setIsAutoPaymentActive] = useState(false);
   
    useEffect(() => {
      const fetchTenantName = async () => {
        try {
          const token = localStorage.getItem("accessToken");
          const response = await axios.get("/api/dashboard", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.data.success && response.data.result?.tenantInfo?.name) {
            setTenantName(response.data.result.tenantInfo.name);
          } else {
            console.error("임차인 이름을 불러오지 못했습니다.");
          }
        } catch (error) {
          console.error("임차인 정보 조회 오류:", error);
        }
      };
  
      const savedStatus = localStorage.getItem("isAutoPaymentActive");
      setIsAutoPaymentActive(savedStatus === "true");

      fetchTenantName();
    }, []);

    return (
      <main className={styles.container}>
        <section className={styles.contentWrapper}>
          <h1 className={styles.pageTitle}>월세 납부</h1>
  
          <header className={styles.userHeader}>
            <h2 className={styles.userName}>{tenantName || "임차인"}</h2>
            <p className={styles.userDescription}>님의 월세 납부 현황</p>
          </header>
  
          <div className={styles.paymentOptions}>
            <PaymentOptionCard
              imageUrl="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/1d1c2a1f74cb7c82151ae1c726c5045019acfdac?placeholderIfAbsent=true"
              title="이번 달 월세 납부"
              onClick={() => navigate("/tenant/direct-payment")}
            />
            <PaymentOptionCard
              imageUrl="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/2601cdfa66be04ee9aebfd0f34ae191aa29c1d3d?placeholderIfAbsent=true"
              title="미납 월세 납부"
              extraPadding
              onClick={() => navigate("/tenant/payment-list?tab=unpaid")}
            />
          </div>
  
          <AutoPaymentSection   
            isAutoPaymentActive={isAutoPaymentActive} 
            setIsAutoPaymentActive={setIsAutoPaymentActive} 
          />

          <PaymentHistorySection />
        </section>
        <Navbar />
      </main>
    );                                                                                                              
  }
  

export default PaymentMain;
