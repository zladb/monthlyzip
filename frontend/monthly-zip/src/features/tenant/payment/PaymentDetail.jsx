import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./PaymentDetail.module.css";

function PaymentDetail() {
  const { paymentId } = useParams();
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    const fetchPayment = () => {
      axios.get(`/api/payments/${paymentId}`, { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {

          if (response.data.success) {
            setPayment(response.data.result);
          } else {
            console.error("월세 납부 상세를 가져오지 못했습니다:", response.data.message);
          }
        })
        .catch((error) => console.error("월세 납부 상세를 가져오는 중 오류 발생:", error));
    };
    
    fetchPayment();
  }, []);


  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <main className={styles.container}>
        <Header title="상세 내역" />
        {payment ? (
          <PaymentCard payment={payment} />
        ) : (
          <p className={styles.noData}>해당 월의 납부 내역이 없습니다.</p>
        )}
      </main>
    </>
  );
}

function PaymentCard({ payment }) {
  const dueDate = new Date(payment.dueDate);
  const prevMonthDate = new Date(dueDate.setMonth(dueDate.getMonth() - 1));
  const displayYear = prevMonthDate.getFullYear();
  const displayMonth = prevMonthDate.getMonth() + 1; // 0부터 시작하므로 +1 필요

  const navigate = useNavigate();

  const handleDepositDeduction = () => {
    axios.post(
      "/api/payments/deposit-deduction",
      { paymentId: payment.paymentId }, // API가 요구하는 body
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => {
      console.log("서버 응답:", response.data);

      if (response.data.success) {
        alert("보증금에서 차감되었습니다.");
        window.location.reload();
      } else {
        console.log("보증금 차감 처리 실패: " + response.data.message);
      }
    })
    .catch((error) => {
      console.error("보증금 차감 중 오류 발생:", error);
    });
  };
  

  const handleClick = () => {
    navigate("/tenant/direct-payment");
  };


  return (
    <section className={styles.paymentCard}>
      <h2 className={styles.paymentTitle}>
        {displayYear}년 {displayMonth}월 월세 납부 내역
      </h2>

      <PaymentRow label="주소" value={payment.address} />
      <PaymentRow label="임대인 이름" value={payment.landlordName} />
      <PaymentRow label="임대인 계좌" value={payment.landlordAccount} />
      {payment.paymentStatus !== "미납" && (
        <PaymentRow
          label="날짜"
          value={new Date(payment.paymentDate).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
      )}

      <div className={styles.divider} />

      <div className={styles.totalSection}>
        <h3 className={styles.totalLabel}>
          {payment.paymentStatus === "미납" ? "미납금액" : "결제 금액"}
        </h3>
        <p className={styles.totalAmount}>{Number(payment.amount).toLocaleString()}원</p>
      </div>

      {/* 미납 상태에서 버튼 */}
      {payment.paymentStatus === "미납" && (
        <div className={styles.buttonContainer}>
          <button className={styles.actionButton} onClick={handleDepositDeduction}>보증금 차감</button>
          <button className={styles.actionButton} onClick={handleClick}>즉시 결제</button>
        </div>
      )}
    </section>
  );
}
function Header({ title }) {
  return (
    <header className={styles.header}>
      <div>
        <BackArrowIcon />
      </div>
      <h1 className={styles.headerTitle}>{title}</h1>
    </header>
  );
}

function BackArrowIcon() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/tenant/payment-list");
  };

  return (
    <div
      onClick={handleClick}
      dangerouslySetInnerHTML={{
        __html:
          '<svg id="86:8851" layer-name="arrow_back_ios_24dp_5F6368_FILL0_wght400_GRAD0_opsz24 1" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" class="back-arrow" style="width: 28px; height: 28px; cursor: pointer"> <g clip-path="url(#clip0_86_8851)"> <path d="M12.4167 26.2679L0.75 14.6012L12.4167 2.93457L14.4875 5.0054L4.89167 14.6012L14.4875 24.1971L12.4167 26.2679Z" fill="black"></path> </g> <defs> <clipPath id="clip0_86_8851"> <rect width="28" height="28" fill="white" transform="translate(0.75 0.601562)"></rect> </clipPath> </defs> </svg>',
      }}
    />
  );
}

function PaymentRow({ label, value }) {
  return (
    <div className={styles.paymentRow}>
      <dt className={styles.rowLabel}>{label}</dt>
      <dd className={styles.rowValue}>{value}</dd>
    </div>
  );
}

export default PaymentDetail;
