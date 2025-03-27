"use client";
import React, { useState } from "react";
import styles from "./TenantMgmt.module.css";

function TenantMgmt() {
  const [selectedBuilding, setSelectedBuilding] = useState("유로빌");

  const allTenants = {
    유로빌: [
      { room: "101", name: "김민호", rent: 55, contractEndDate: "2025-06-23", latePaymentCount: 0 },
      { room: "102", name: "이서연", rent: 42, contractEndDate: "2025-08-03", latePaymentCount: 2 },
      { room: "103", name: "이지현", rent: 45, contractEndDate: "2025-10-01", latePaymentCount: 0 },
      { room: "104", name: "김유진", rent: 52, contractEndDate: "2025-05-25", latePaymentCount: 0 },
    ],
    아름빌: [
      { room: "201", name: "박지훈", rent: 48, contractEndDate: "2025-07-12", latePaymentCount: 1 },
      { room: "202", name: "정수연", rent: 50, contractEndDate: "2025-09-15", latePaymentCount: 0 },
      { room: "203", name: "최민석", rent: 46, contractEndDate: "2025-11-20", latePaymentCount: 3 },
    ],
  };

  return (
    <section className={styles.container}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/ec3637c49e111e793c356889858c828968d2bbb9?placeholderIfAbsent=true"
        alt="Tenant Management Icon"
        className={styles.headerIcon}
      />
      <h1 className={styles.title}>임차인 관리</h1>

      {/* 건물 선택 네비게이션 */}
      <nav className={styles.buildingSelector}>
        {["유로빌", "아름빌"].map((building) => (
          <div key={building} className={styles.buildingWrapper}>
            <button
              className={`${styles.buildingName} ${selectedBuilding === building ? styles.active : ""}`}
              onClick={() => setSelectedBuilding(building)}
            >
              {building}
            </button>
            {selectedBuilding === building && <div className={styles.selectedIndicator} />}
          </div>
        ))}
      </nav>

      <hr className={styles.divider} />

      {/* 검색 바 */}
      <div className={styles.searchBar}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/9d7cb21c14ecb41e80b2d11119158049bd13fac1?placeholderIfAbsent=true"
          alt="Search Icon"
          className={styles.searchIcon}
        />
        <input type="text" placeholder="건물 검색" className={styles.searchInput} />
      </div>

      {/* 선택된 건물의 임차인 목록 */}
      <div className={styles.tenantList}>
        {allTenants[selectedBuilding].map((tenant, index) => (
          <article key={index} className={styles.tenantCard}>
            <div className={styles.tenantInfo}>
              <h2 className={styles.roomNumber}>{tenant.room} 호</h2>
              <h3 className={styles.tenantName}>{tenant.name}</h3>
              <p className={styles.rentInfo}>월세: {tenant.rent}</p>
              <p className={styles.contractInfo}>계약 기간: {tenant.contractEndDate}</p>
            </div>
            <p className={styles.latePaymentInfo}>
              연체 횟수:{" "}
              {tenant.latePaymentCount > 0 ? (
                <span className={styles.latePaymentHighlight}>{tenant.latePaymentCount}</span>
              ) : (
                tenant.latePaymentCount
              )}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TenantMgmt;
