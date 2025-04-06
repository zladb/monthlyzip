"use client";
import React, { useState } from "react";
import styles from "./Inquiry.module.css";
import InquiryCard from "../../../components/InquiryCard/InquiryCard";
import Navbar from "../navbar/Navbar";

// InquiryHeader Component
const InquiryHeader = () => (
  <div className={styles.div2}>
    <h1 className={styles.div3}>문의 내역</h1>
  </div>
);

// StatusFlow Component
const StatusItem = ({ number, label, isActive, showDot, onClick }) => (
  <div className={styles.statusWrapper} onClick={onClick}>
    <div className={isActive ? styles.statusCircleActive : styles.statusCircleInactive}>
      {number}
      {showDot && <div className={styles.statusDot} />}
    </div>
    <div className={isActive ? styles.statusLabelActive : styles.statusLabel}>
      {label}
    </div>
  </div>
);

const StatusFlow = () => {
  const [activeStatus, setActiveStatus] = useState("");
  
  const statuses = [
    { label: "접수 대기", number: "5" },
    { label: "처리중", number: "5" },
    { label: "처리 완료", number: "5" }
  ];

  return (
    <div className={styles.div4}>
      {statuses.map((status, index) => (
        <StatusItem
          key={status.label}
          number={status.number}
          label={status.label}
          isActive={activeStatus === status.label}
          showDot={index !== statuses.length - 1}
          onClick={() => setActiveStatus(activeStatus === status.label ? "" : status.label)}
        />
      ))}
    </div>
  );
};

// BuildingFilter Component
const BuildingFilter = () => {
  const [activeBuilding, setActiveBuilding] = useState("전체");
  
  const buildings = ["전체", "유로빌", "아름빌"];

  return (
    <nav className={styles.div16}>
      {buildings.map((building) => (
        <button
          key={building}
          className={activeBuilding === building ? styles.filterButtonActive : styles.filterButton}
          onClick={() => setActiveBuilding(building)}
        >
          {building}
        </button>
      ))}
    </nav>
  );
};

// Main Inquiry Component
function Inquiry() {
  return (
    <main className={styles.pwa}>
      <section className={styles.div}>
        <InquiryHeader />
        <StatusFlow />
      </section>
      <section className={styles.div15}>
        <BuildingFilter />
        <InquiryCard
          type="생활민원"
          title="층간 소음 신고"
          date="2025-03-24 18:20"
          status="처리중"
        />
        <InquiryCard
          type="계약연장"
          title="계약 연장 신청"
          date="2025-03-11 11:20"
          status="처리중"
        />
        <InquiryCard
          type="수리요청"
          title="전등 고장"
          date="2025-03-21 01:39"
          status="처리중"
        />
        <InquiryCard
          type="납부관리"
          title="3월 월세 미납금"
          date="2025-03-23 13:46"
          status="처리중"
        />
        <InquiryCard
          type="기타"
          title="반려견 입양 문의"
          date="2025-03-24 18:20"
          status="처리중"
        />
      </section>
      <Navbar />
    </main>
  );
}

export default Inquiry;
