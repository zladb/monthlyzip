"use client";
import React from "react";
import styles from "./PaymentDetail.module.css";

function PaymentDetail() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <main className={styles.container}>
        <Header title="상세 내역" />
        <PaymentCard />
      </main>
    </>
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
  return (
    <div
      dangerouslySetInnerHTML={{
        __html:
          '<svg id="86:8851" layer-name="arrow_back_ios_24dp_5F6368_FILL0_wght400_GRAD0_opsz24 1" width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" class="back-arrow" style="width: 28px; height: 28px; cursor: pointer"> <g clip-path="url(#clip0_86_8851)"> <path d="M12.4167 26.2679L0.75 14.6012L12.4167 2.93457L14.4875 5.0054L4.89167 14.6012L14.4875 24.1971L12.4167 26.2679Z" fill="black"></path> </g> <defs> <clipPath id="clip0_86_8851"> <rect width="28" height="28" fill="white" transform="translate(0.75 0.601562)"></rect> </clipPath> </defs> </svg>',
      }}
    />
  );
}

function PaymentCard() {
  return (
    <section className={styles.paymentCard}>
      <h2 className={styles.paymentTitle}>2025년 3월 월세 납부 내역</h2>

      <PaymentRow label="유형" value="자동이체" />

      <PaymentRow
        label="주소"
        value={
          <>
            <span>서울시 강남구 테헤란로 123</span>
            <br />
            <span>201호</span>
          </>
        }
      />

      <PaymentRow label="임대인 이름" value="홍길동" />
      <PaymentRow label="임대인 계좌" value="국민은행 123-4567-8901" />
      <PaymentRow label="날짜" value="2025-03-05 13:24" />
      <PaymentRow label="기간" value="2025.03.05 ~ 2025.04.04" />

      <div className={styles.divider} />

      <div className={styles.totalSection}>
        <h3 className={styles.totalLabel}>결제 금액</h3>
        <p className={styles.totalAmount}>500,000 원</p>
      </div>
    </section>
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
