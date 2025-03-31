import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./PaymentDetail.module.css";

// 납부 목록 샘플 데이터 (같은 데이터 사용)
const paymentData = [
  {
    month: "3",
    year: "2025",
    status: "완납",
    date: "2025.03.05",
    amount: "500,000원",
    type: "자동이체",
    address: "서울시 강남구 테헤란로 123, 201호",
    landlord: "홍길동",
    landlordAccount: "국민은행 123-4567-8901",
    period: "2025.03.05 ~ 2025.04.04",
  },
  {
    month: "2",
    year: "2025",
    status: "완납",
    date: "2025.02.03",
    amount: "500,000원",
    type: "자동이체",
    address: "서울시 강남구 테헤란로 123, 201호",
    landlord: "홍길동",
    landlordAccount: "국민은행 123-4567-8901",
    period: "2025.02.05 ~ 2025.03.04",
  },
  {
    month: "12",
    year: "2024",
    status: "미납",
    date: null,
    amount: "500,000원",
    type: "직접결제",
    address: "서울시 강남구 테헤란로 123, 201호",
    landlord: "홍길동",
    landlordAccount: "국민은행 123-4567-8901",
    period: "2024.12.05 ~ 2025.01.04",
  },
];

function PaymentDetail() {
  const { year, month } = useParams(); // URL에서 year, month 가져오기
  
  
  // 해당 월의 납부 내역 찾기
  const paymentInfo = paymentData.find(
    (item) => item.year === year && item.month === month
  );

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <main className={styles.container}>
        <Header title="상세 내역" />
        {paymentInfo ? (
          <PaymentCard payment={paymentInfo} />
        ) : (
          <p className={styles.noData}>해당 월의 납부 내역이 없습니다.</p>
        )}
      </main>
    </>
  );
}

function PaymentCard({ payment }) {
  return (
    <section className={styles.paymentCard}>
      <h2 className={styles.paymentTitle}>
        {payment.year}년 {payment.month}월 월세 납부 내역
      </h2>

      <PaymentRow label="유형" value={payment.type} />
      <PaymentRow label="주소" value={payment.address} />
      <PaymentRow label="임대인 이름" value={payment.landlord} />
      <PaymentRow label="임대인 계좌" value={payment.landlordAccount} />
      <PaymentRow label="날짜" value={payment.date} />
      <PaymentRow label="기간" value={payment.period} />

      <div className={styles.divider} />

      <div className={styles.totalSection}>
        <h3 className={styles.totalLabel}>
          {payment.status === "미납" ? "미납금액" : "결제 금액"}
        </h3>
        <p className={styles.totalAmount}>{payment.amount}</p>
      </div>

      {/* 미납 상태에서 버튼 */}
      {payment.status === "미납" && (
        <div className={styles.buttonContainer}>
          <button className={styles.actionButton}>보증금 차감</button>
          <button className={styles.actionButton}>기한 연장</button>
          <button className={styles.actionButton}>즉시 결제</button>
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
