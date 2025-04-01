import React from "react";
import styles from "./PaymentMain.module.css";


function PaymentOptionCard({ imageUrl, title, extraPadding = false }) {
    return (
      <article
        className={`${styles.card} ${extraPadding ? styles.extraPadding : ""}`}
      >
        <img src={imageUrl} alt="" className={styles.cardIcon} />
        <h3 className={styles.cardTitle}>{title}</h3>
      </article>
    );
  }

function AutoPaymentSection() {
    return (
      <section className={styles.autoPaymentContainer}>
        <h3 className={styles.autoPaymentTitle}>자동이체</h3>
        <div className={styles.autoPaymentInfo}>
          
          <p className={styles.infoText}>
            자동이체를 등록하면 매월 지정된 날짜에 자동 결제됩니다.{" "}
          </p>
        </div>
      </section>
    );
  }

function PaymentHistorySection() {
  const paymentHistory = [
    { month: "2025. 03", amount: "500,000원" },
    { month: "2025. 02", amount: "500,000원" },
    { month: "2025. 01", amount: "500,000원" },
  ];

  return (
    <section className={styles.historyContainer}>
       <div className={styles.headerWrapper}>
          <h3 className={styles.historyTitle}>월세 납부 내역</h3>
          <div className={styles.viewMoreWrapper}>
            <button className={styles.viewMoreButton}>
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

      {/* <div className={styles.viewMoreWrapper}>
          <button className={styles.viewMoreButton}>
            더보기
            <img
              src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/0a1e9defef0f30d1edc82acadcd32f09633c3170?placeholderIfAbsent=true"
              alt="더보기"
              className={styles.viewMoreIcon}
            />
          </button>
        </div> */}
      
    </section>
  );
}

  function PaymentMain() {
    return (
      <main className={styles.container}>
        <section className={styles.contentWrapper}>
          <h1 className={styles.pageTitle}>월세 납부</h1>
  
          <header className={styles.userHeader}>
            <h2 className={styles.userName}>김철수</h2>
            <p className={styles.userDescription}>님의 월세 납부 현황</p>
          </header>
  
          <div className={styles.paymentOptions}>
            <PaymentOptionCard
              imageUrl="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/1d1c2a1f74cb7c82151ae1c726c5045019acfdac?placeholderIfAbsent=true"
              title="이번 달 월세 납부"
            />
            <PaymentOptionCard
              imageUrl="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/2601cdfa66be04ee9aebfd0f34ae191aa29c1d3d?placeholderIfAbsent=true"
              title="미납 월세 납부"
              extraPadding
            />
          </div>
  
          <AutoPaymentSection />
          <PaymentHistorySection />
        </section>
  
        {/* <NavigationBar /> */}
      </main>
    );                                                                                                              
  }
  

export default PaymentMain;
