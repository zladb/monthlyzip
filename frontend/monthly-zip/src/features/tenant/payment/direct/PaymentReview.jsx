import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./PaymentReview.module.css";


function PageHeader() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/tenant/direct-payment');
  };

  return (
    <nav className={styles.header}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/14b2d58de9eee0aec5b6348021c475e9d06eb9b1?placeholderIfAbsent=true"
        className={styles.backIcon}
        alt="Back"
        onClick={handleClick}
      />
      <h1 className={styles.pageTitle}>월세 결제</h1>
    </nav>
  );
}

// Bank account indicator
function BankAccount({ landlordAccount }) {
  return (
      <p className={styles.accountDisplay}>{landlordAccount}</p>
  );
}

// Transfer details section
function TransferDetails({ landlordName }) {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const storedAmount = localStorage.getItem("paymentAmount");
    if (storedAmount) {
      setAmount(Number(storedAmount));
    }
  }, []);

  const formattedAmount = amount.toLocaleString("ko-KR");

  return (
    <>
      <h2 className={styles.recipientTitle}>{landlordName} 님께</h2>
      <h3 className={styles.amountText}>
        {formattedAmount}  <span style={{ fontWeight: 500 }}>원 을 이체합니다.</span>
      </h3>
    </>
  );
}

// Account information section
function AccountInformation({ tenantAccount, tenantName, landlordName }) {
  return (
    <>
      <hr className={styles.dividerTop} />
      <section className={styles.accountSection}>
        <label className={styles.accountLabel}>출금계좌</label>
        <p className={styles.accountNumber}>{tenantAccount}</p>
      </section>
      <section className={styles.recipientSection}>
        <div className={styles.recipientLabelRow}>
          <label>받는 분</label>
          <label className={styles.rightAlignedLabel}>보내는 분</label>
        </div>
        <div className={styles.recipientValueRow}>
          <p>{landlordName}</p>
          <p className={styles.rightAlignedName}>{tenantName}</p>
        </div>
      </section>
      <hr className={styles.dividerBottom} />
    </>
  );
}

// Main component
function PaymentReview() {
  const navigate = useNavigate();

  const [landlordAccount, setLandlordAccount] = useState("");
  const [landlordName, setLandlordName] = useState("");
  const [tenantAccount, setTenantAccount] = useState("");
  const [tenantName, setTenantName] = useState("");

  useEffect(() => {
    const fetchTransferData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("/api/transfers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
          console.log(response.data.result);
          const result = response.data.result;
          setLandlordAccount(result.landlordAccount);
          setLandlordName(result.landlordName);
          setTenantAccount(result.tenantAccount);
          setTenantName(result.tenantName);

      } catch (error) {
        console.error("API 호출 오류:", error);
      }
    };

    fetchTransferData();
  }, []);

  const handleClick = () => {
    navigate('/tenant/direct-payment-password');
  };
  
  return (
    <article className={styles.container}>
      <PageHeader />
      <div className={styles.content}>
        <BankAccount landlordAccount={landlordAccount}/>
        <TransferDetails landlordName={landlordName}/>
        <AccountInformation 
          tenantAccount={tenantAccount}
          tenantName={tenantName}
          landlordName={landlordName}
        />
      </div>
      <button 
        className={styles.nextButton}
        onClick={handleClick}
      >
          다음
      </button>
    </article>
  );
}

export default PaymentReview;
