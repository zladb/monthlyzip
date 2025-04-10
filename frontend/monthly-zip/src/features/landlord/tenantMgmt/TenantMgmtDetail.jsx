"use client";
import React, { useEffect, useState } from "react";
import styles from "./TenantMgmtDetail.module.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// 임차인 정보
const TenantInfo = ({ tenant }) => (
  <section>
    <h2 className={styles.sectionTitle}>임차인 정보</h2>
    <div className={styles.infoCard}>
      <p className={styles.tenantName}>이름 : {tenant.name}</p>
      <p className={styles.phoneNumber}>전화 번호: {tenant.phoneNumber}</p>
      <p className={styles.accountNumber}>계좌번호: {tenant.bankAccount}</p>
    </div>
  </section>
);

// 계약 정보
const ContractInfo = ({ contract }) => {
  const total = contract.deposit || 0;
  const remaining = contract.remainingDeposit || 0;
  const deducted = total - remaining;

  return (
    <section>
      <h2 className={styles.contractTitle}>계약 정보</h2>
      <div className={styles.contractCard}>
        <p>
          보증금: {(remaining / 10000).toLocaleString()} / {(total / 10000).toLocaleString()}만원
        </p>
        <p className={styles.monthlyRent}>
          월세 : {(contract.monthlyRent / 10000).toLocaleString()}만원
        </p>
        <p className={styles.contractPeriod}>
          계약 기간 : {contract.contractStart} ~ {contract.contractEnd}
        </p>
        <p className={styles.overdueCount}>
          연체 횟수:{" "}
          <span className={styles.redText}>
            {contract.overdueCount !== undefined ? contract.overdueCount : "-"}
          </span>
        </p>
      </div>
    </section>
  );
};

// 납부 내역
const PaymentHistory = ({ history }) => {
  const sortedHistory = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
  return (
    <section>
      <h2 className={styles.historyTitle}>납부 내역</h2>
      <div className={styles.historyCard}>
        {sortedHistory.map((entry, idx) => (
          <div key={idx} className={styles.paymentRow}>
            <p className={styles.date}>{entry.date}</p>
            <p className={styles.amount}>{(entry.amount / 10000).toLocaleString()}만원</p>
            <p
              className={`${styles.status} ${styles.paymentStatus} ${
                entry.status === "납부완료"
                  ? styles.paymentComplete
                  : entry.status === "미납"
                  ? styles.paymentUnpaid
                  : styles.depositDeduction
              }`}
            >
              {entry.status}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

// Main 컴포넌트
function TenantMgmtDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tenantData, setTenantData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const fetchData = async () => {
      try {
        const detailRes = await axios.get(`/api/tenants/${id}/detail`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        const result = detailRes.data.result;
        const today = new Date();

        // ✅ 연체 조건: 미납 + 날짜 지남
        const overdueCount = result.paymentHistory.filter((item) => {
          const dueDate = new Date(item.date);
          return item.status === "미납" && dueDate < today;
        }).length;

        const contractData = {
          ...result.contract,
          overdueCount,
          remainingDeposit: result.contract.remainingDeposit || result.contract.deposit,
          deductedAmount: result.contract.deductedAmount || 0,
        };

        setTenantData({
          roomNumber: result.roomNumber,
          tenant: result.tenant,
          contract: contractData,
          paymentHistory: result.paymentHistory,
        });
      } catch (err) {
        console.error("❌ 임차인 정보 불러오기 실패:", err);
      }
    };

    fetchData();
  }, [id]);

  // if (!tenantData) {
  //   return <p>불러오는 중...</p>;
  // }

  return (
    <article className={styles.container}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/ec3637c49e111e793c356889858c828968d2bbb9?placeholderIfAbsent=true"
        alt="Tenant logo"
        className={styles.logo}
        onClick={() => navigate("/landlord/tenant-mgmt")}
        style={{ cursor: "pointer" }}
      />
      <h1 className={styles.roomNumber}>{tenantData.roomNumber}</h1>

      <TenantInfo tenant={tenantData.tenant} />
      <ContractInfo contract={tenantData.contract} />
      <PaymentHistory history={tenantData.paymentHistory} />
    </article>
  );
}

export default TenantMgmtDetail;
