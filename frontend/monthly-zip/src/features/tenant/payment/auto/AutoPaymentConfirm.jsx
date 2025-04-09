import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AutoPaymentConfirm.module.css";

function Header() {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/tenant/auto-payment-register');
    };
    
    return (
      <header className={styles.headerContainer}>
        <img
            src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/7a31437be2e255491b409270ea87dc20bf8f242b?placeholderIfAbsent=true"
            alt="Registration icon"
            className={styles.titleIcon}
            onClick={handleClick}
          />
  
        <h1 className={styles.title}>자동이체 등록</h1>
      </header>
    );
  }


// Transfer details component with recipient and amount
const TransferDetails = ({ landlordName, toAccount }) => {
  const [amount, setAmount] = useState("");

  useEffect(() => {
    const storedAmount = localStorage.getItem("autoPaymentAmount");
    if (storedAmount) {
      // 천 단위 콤마 추가
      const formatted = Number(storedAmount).toLocaleString();
      setAmount(formatted);
    }
  }, []);

  return (
    <>
      <p className={styles.accountNumber}>{toAccount}</p>
      <h2 className={styles.recipientName}>{landlordName} 님께</h2>
      <h3 className={styles.transferAmount}>
      {amount} <span className={styles.regularWeight}>원 자동이체를</span>
        <br />
        <span className={styles.regularWeight}>등록하시겠습니까?</span>
      </h3>
    </>
  );
};

// Account information component
const AccountInformation = ({ fromAccount }) => {
  return (
    <section className={styles.accountInfoRow}>
      <p className={styles.accountInfoLabel}>출금계좌</p>
      <p className={styles.accountInfoValue}>{fromAccount}</p>
    </section>
  );
};

// Transfer schedule component with frequency, period, and display names
const TransferSchedule = ({ landlordName, tenantName }) => {
  const [frequency, setFrequency] = useState("");
  const [period, setPeriod] = useState("");

  useEffect(() => {
    const storedFrequency = localStorage.getItem("autoPaymentFrequency");
    const storedPeriod = localStorage.getItem("autoPaymentPeriod");

    if (storedFrequency) setFrequency(`매월/${storedFrequency}일`);
    if (storedPeriod) setPeriod(storedPeriod);

  }, []);



  return (
    <section className={styles.scheduleContainer}>
      <div className={styles.scheduleLabels}>
        <p>자동이체주기</p>
        <p className={styles.periodLabel}>자동이체기간</p>
        <p className={styles.recipientDisplayLabel}>받는 분</p>
        <p className={styles.myDisplayLabel}>보내는 분</p>
      </div>
      <div className={styles.scheduleValues}>
        <p className={styles.frequencyValue}>{frequency}</p>
        <p className={styles.periodValue}>{period}</p>
        <div className={styles.displayNamesContainer}>
          <p>{landlordName}</p>
          <p className={styles.myDisplayValue}>{tenantName}</p>
        </div>
      </div>
    </section>
  );
};

// Main component that combines all the smaller components
function AutoPaymentConfirm() {
  const navigate = useNavigate();
  
  const [landlordName, setLandlordName] = useState("");
  const [tenantName, setTenantName] = useState("");

  const [contractId, setContractId] = useState(null);
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");

  useEffect(() => {
    const fetchAndTransfer = async () => {
      const token = localStorage.getItem("accessToken");
  
      try {
        const response = await axios.get("/api/transfers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const result = response.data.result;
        setLandlordName(result.landlordName);
        setTenantName(result.tenantName);
      } catch (error) {
        console.error("계좌 정보 조회 실패:", error);
      }
    };
  
    fetchAndTransfer(); 
  }, []);
  

  useEffect(() => {
    const fetchAutoTransfer = async () => {
      try {
        const token = localStorage.getItem("accessToken");
  
        const getResponse = await axios.get("/api/autotransfers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("자동이체 GET 응답:", getResponse.data);
  
        if (getResponse.data.success) {
          const data = getResponse.data.result;
          
          setContractId(data.contractId);
          setFromAccount(data.fromAccount);
          setToAccount(data.toAccount);
  
        }
      } catch (error) {
        console.error("계좌 정보 조회 실패:", error);
      }
    };
  
    fetchAutoTransfer(); // 마운트 시 조회만
  }, []);
          

  const handleConfirm = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const toDateFormat = (str) => str?.replace(/\./g, "-");

      const amountRaw = localStorage.getItem("autoPaymentAmount");
      const amount = amountRaw ? Number(amountRaw) : 0;
  
      const paymentDay = Number(localStorage.getItem("autoPaymentFrequency"));
      
      const rawStart = localStorage.getItem("autoPaymentPeriodStart");
      const rawEnd = localStorage.getItem("autoPaymentPeriodEnd");

      const startMonth = toDateFormat(rawStart) + "-01"; // "2025-04-01"
      const endMonth = toDateFormat(rawEnd) + "-01";     // "2025-10-01"

      const postBody = {
        contractId,
        fromAccount,
        toAccount,
        amount,
        paymentDay,
        startMonth,
        endMonth
      };

      console.log("자동이체 등록 요청 body:", postBody);
      const postResponse = await axios.post("/api/autotransfers", postBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("자동이체 등록 요청: ", postResponse.data);
      if (postResponse.data.success) {
        alert("자동이체 등록이 완료되었습니다!");
        localStorage.setItem("isAutoPaymentActive", "true");
        navigate("/tenant/payment-main");
      } else {
        console.log("자동이체 등록에 실패했습니다.");
      }
    } catch (error) {
      console.error("자동이체 등록 오류:", error);
    }
  };
  

  return (
    <main className={styles.container}>
      <Header />
      <div className={styles.contentWrapper}>
        <TransferDetails landlordName={landlordName} toAccount={toAccount} />
        <hr className={styles.divider} />
        <AccountInformation fromAccount={fromAccount} />
        <TransferSchedule landlordName={landlordName} tenantName={tenantName} />
        <hr className={styles.bottomDivider} />
      </div>
      <button type="button" className={styles.nextButton} onClick={handleConfirm}>
        확인
     </button>
    </main>
  );
}

export default AutoPaymentConfirm;
