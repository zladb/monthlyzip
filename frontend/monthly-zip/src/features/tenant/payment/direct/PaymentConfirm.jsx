import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./PaymentConfirm.module.css";

function PaymentHeader({ amount }) {
  return (
    <header className={styles.paymentHeader}>
      <div className={styles.logoContainer}>
        <img src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/c339878aab4d2c3a9df37a92acc72340bcbac813?placeholderIfAbsent=true" className={styles.logo} alt="Payment logo" />
        <h2 className={styles.paymentLabel}>결제 금액</h2>
      </div>
      <h1 className={styles.paymentAmount}>{amount}</h1>
    </header>
  );
}

function TransactionDetails({ landlordAccount, landlordName, tenantAccount, tenantName }) {
  return (
    <section className={styles.transactionContainer}>
      <div className={styles.transactionRow}>
        <p className={styles.transactionLabels}>입금 계좌</p>
        <p className={styles.transactionValues}>{landlordAccount}</p>
      </div>

      <div className={styles.transactionRow}>
        <p className={styles.transactionLabels}>받는 분</p>
        <p className={styles.transactionValues}>{landlordName}</p>
      </div>

      <div className={styles.transactionRow}>
        <p className={styles.transactionLabels}>출금 계좌</p>
        <p className={styles.transactionValues}>{tenantAccount}</p>
      </div>

      <div className={styles.transactionRow}>
        <p className={styles.transactionLabels}>보낸 분</p>
        <p className={styles.transactionValues}>{tenantName}</p>
      </div>

      <div className={styles.transactionRow}>
        <p className={styles.transactionLabels}>날짜</p>
        <p className={styles.transactionValues}>
          {new Date().toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </section>
  );
}


function ConfirmButton() {
  return <button className={styles.confirmButton}>확인</button>;
}

function PaymentConfirm() {
  const [paymentAmount, setPaymentAmount] = useState("");

  const [landlordAccount, setLandlordAccount] = useState("");
  const [landlordName, setLandlordName] = useState("");
  const [tenantAccount, setTenantAccount] = useState("");
  const [tenantName, setTenantName] = useState("");

  useEffect(() => {
    const fetchAndTransfer = async () => {
      const token = localStorage.getItem("accessToken");
      const amount = Number(localStorage.getItem("paymentAmount"));
  
      try {
        // 1. 먼저 GET 요청으로 필요한 계좌 정보 가져오기
        const response = await axios.get("/api/transfers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const result = response.data.result;
        setLandlordAccount(result.landlordAccount);
        setLandlordName(result.landlordName);
        setTenantAccount(result.tenantAccount);
        setTenantName(result.tenantName);
  
        // 2. 계좌 정보 모두 받아온 후 POST 요청 보내기
        const postResponse = await axios.post(
          "/api/transfers",
          {
            landlordAccount: result.landlordAccount,
            tenantAccount: result.tenantAccount,
            amount,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        console.log("POST 응답:", postResponse.data);
  
        // 성공 여부에 따라 처리
        if (postResponse.data.success) {
          console.log("이체 성공");
        } else {
          console.log("이체 실패:", postResponse.data.message);
        }
      } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
      }
    };
  
    fetchAndTransfer(); // 컴포넌트 마운트 시 자동 실행
  }, []);
  


  useEffect(() => {
    const amount = localStorage.getItem("paymentAmount");
    if (amount) {
      // 숫자 형식으로 변환한 후 콤마 찍고 "원" 붙이기
      const formatted = Number(amount).toLocaleString("ko-KR") + "원";
      setPaymentAmount(formatted);
    }
  }, []);

  return (
    <main className={styles.container}>
      <section className={styles.contentWrapper}>
      <PaymentHeader amount={paymentAmount || "0원"} />  
      <TransactionDetails
        landlordAccount={landlordAccount}
        landlordName={landlordName}
        tenantAccount={tenantAccount}
        tenantName={tenantName}
      />
      </section>
      <ConfirmButton />
    </main>
  );
}

export default PaymentConfirm;
