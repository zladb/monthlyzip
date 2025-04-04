import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AutoPaymentRegister.module.css";

function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/tenant/auto-payment');
  }
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

function AccountSection({ title, bankName, iconType, placeholder }) {
  const [accountNumber, setAccountNumber] = useState("");
  
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.accountSelector}>
        <div className={styles.selectorHeader}>
          <p className={styles.bankName}>{bankName}</p>
          <div className={styles.bankIconContainer}>
            <button className={styles.dropdownButton}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/7a31437be2e255491b409270ea87dc20bf8f242b?placeholderIfAbsent=true"
                alt="Registration icon"
                className={styles.dropdownIcon}
              />
            </button>
          </div>
        </div>
        <div className={styles.divider} />
      </div>
      <div className={styles.accountNumberContainer}>
        <input
          type="text"
          placeholder="계좌번호"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          className={styles.accountNumberLabel}
        />
        <div className={styles.divider} />
      </div>
    </section>
  );
}


function AmountSection() {
  const [amount, setAmount] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    // 숫자만 허용 + 앞에 0이 오는 건 막음 (단, 빈 값은 허용)
    if (/^\d*$/.test(value)) {
      if (value === "" || !/^0\d+/.test(value)) {
        setAmount(value);
      }
    }
  }
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>금액</h2>
      <div className={styles.amountInputContainer}>
        <div className={styles.amountInputHeader}>
          <input
            type="number"
            className={styles.amountInput}
            placeholder="숫자만 입력"
            step="10000" // 10000씩 증가하도록 설정
            onChange={handleChange}
            value={amount}
          />
          <p className={styles.currencyLabel}>원</p>
        </div>
        <div className={styles.divider} />
      </div>
    </section>
  );
}

function FrequencySection() {

  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>이체 주기</h2>
      <div className={styles.frequencySelector}>
        <div className={styles.frequencyHeader}>
          <p className={styles.frequencyType}>매월</p>
          <div className={styles.daySelector}>
            <p className={styles.dayValue}>5일</p>
            <button className={styles.dropdownButton}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/7a31437be2e255491b409270ea87dc20bf8f242b?placeholderIfAbsent=true"
              alt="Registration icon"
              className={styles.dropdownIcon}
            />
            </button>
          </div>
        </div>
        <div className={styles.divider} />
      </div>
    </section>
  );
}


function PeriodSection() {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>자동이체기간</h2>
      <div className={styles.periodContainer}>
        <div className={styles.periodStartContainer}>
          <p className={styles.periodValue}>2024.01</p>
          <div className={styles.divider} />
        </div>
        <div className={styles.periodEndContainer}>
          <p className={styles.periodValue}>2026.01</p>
          <div className={styles.divider} />
        </div>
      </div>
    </section>
  );
}

function AutoPaymentRegister() {
  return (
    <div className={styles.container}>
        <div className={styles.formContainer}>
            <Header />

            <form className={styles.formContent}>
            <AccountSection
                title="출금계좌"
                bankName="KB국민"
                iconType="kb"
            />

            <AccountSection
                title="받는 분"
                bankName="신한"
                iconType="shinhan"
                placeholder="계좌번호"
            />

            <AmountSection />

            <FrequencySection />

            <PeriodSection />
            </form>
            <button className={styles.nextButton}>다음</button>
        </div>
    </div>
  );
}

export default AutoPaymentRegister;
