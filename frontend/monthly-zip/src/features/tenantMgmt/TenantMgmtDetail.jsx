"use client";
import React from "react";
import styles from "./TenantMgmtDetail.module.css";

// TenantInfo component inlined
const TenantInfo = () => {
  return (
    <section>
      <h2 className={styles.sectionTitle}>임차인 정보</h2>
      <div className={styles.infoCard}>
        <p className={styles.tenantName}>이름 : 이서연</p>
        <p className={styles.birthDate}>생년 월일 : 1992-06-27</p>
        <p className={styles.phoneNumber}>전화 번호: 010-1023-4035</p>
        <p className={styles.accountNumber}>계좌번호: 농협 356-138252-1924</p>
      </div>
    </section>
  );
};

// ContractInfo component inlined
const ContractInfo = () => {
  return (
    <section>
      <h2 className={styles.contractTitle}>계약 정보</h2>
      <div className={styles.contractCard}>
        <p>보증금: 416/500</p>
        <p className={styles.monthlyRent}>월세 : 42</p>
        <p className={styles.contractPeriod}>계약 기간 : 24.08.03~25.08.03</p>
        <p className={styles.overdueCount}>
          연체 횟수: <span className={styles.redText}>2</span>
        </p>
      </div>
    </section>
  );
};

// PaymentHistory component inlined
const PaymentHistory = () => {
  return (
    <section>
      <h2 className={styles.historyTitle}>납부 내역</h2>
      <div className={styles.historyCard}>
        <div className={styles.historyContent}>
          <div className={styles.historyRow}>
            <div className={styles.dateColumn}>
              <h3 className={styles.columnHeader}>날짜</h3>
              <p className={styles.dateEntry1}>2025-03-20</p>
              <p className={styles.dateEntry2}>2025-02-20</p>
            </div>
            <div>
              <h3 className={styles.amountHeader}>금액</h3>
              <div className={styles.amountColumn}>
                <p>42</p>
                <p className={styles.amountEntry}>42</p>
              </div>
            </div>
          </div>
          <div className={styles.paymentRow}>
            <p>2025-01-10</p>
            <p>42</p>
          </div>
          <div className={styles.paymentRow2}>
            <p>2024-12-10</p>
            <p>42</p>
          </div>
          <div className={styles.paymentRow3}>
            <p>2024-11-10</p>
            <p>42</p>
          </div>
          <div className={styles.paymentRow4}>
            <p>2024-10-10</p>
            <p>42</p>
          </div>
        </div>
        <div className={styles.statusColumn}>
          <h3 className={styles.statusHeader}>상태</h3>
          <div className={styles.depositDeduction}>보증금 차감</div>
          <div className={styles.depositDeduction2}>보증금 차감</div>
          <div className={styles.paymentComplete}>납부완료</div>
          <div className={styles.paymentComplete2}>납부완료</div>
          <div className={styles.paymentComplete3}>납부완료</div>
          <div className={styles.paymentComplete4}>납부완료</div>
        </div>
      </div>
    </section>
  );
};

// OverdueHistory component inlined
const OverdueHistory = () => {
  return (
    <section>
      <h2 className={styles.overdueTitle}>연체 내역</h2>
      <div className={styles.overdueCard}>
        <div className={styles.overdueContent}>
          <div className={styles.overdueRow}>
            <div className={styles.overdueDateColumn}>
              <h3 className={styles.overdueDateHeader}>날짜</h3>
              <p className={styles.overdueDate}>2025-03-10</p>
            </div>
            <div className={styles.overdueAmountColumn}>
              <h3 className={styles.overdueAmountHeader}>금액</h3>
              <p className={styles.overdueAmount}>42</p>
            </div>
          </div>
          <div className={styles.overdueRow2}>
            <p>2025-02-10</p>
            <p>42</p>
          </div>
        </div>
        <div className={styles.overdueStatusColumn}>
          <h3 className={styles.overdueStatusHeader}>상태</h3>
          <div className={styles.overdueStatus}>연 체</div>
          <div className={styles.overdueStatus2}>연 체</div>
        </div>
      </div>
    </section>
  );
};

// Main InputDesign component
function TenantMgmtDetail() {
  return (
    <article className={styles.container}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/ec3637c49e111e793c356889858c828968d2bbb9?placeholderIfAbsent=true"
        alt="Tenant logo"
        className={styles.logo}
      />
      <h1 className={styles.roomNumber}>102 호</h1>

      <TenantInfo />
      <ContractInfo />
      <PaymentHistory />
      <OverdueHistory />
    </article>
  );
}

export default TenantMgmtDetail;
