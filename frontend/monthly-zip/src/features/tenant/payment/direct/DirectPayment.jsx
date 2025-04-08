import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./DirectPayment.module.css";

function PaymentHeader({ userName, accountNumber }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/tenant/payment-main');
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.paymentTitle}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/ba303b10f42913d041ae593ce99d7d2a9f515610?placeholderIfAbsent=true"
          alt="Payment icon"
          className={styles.icon}
          onClick={handleClick}
        />
        <span className={styles.titleText}>월세 결제</span>
      </h1>
      <div className={styles.userInfoWrapper}>
        <strong className={styles.userName}>{userName}</strong>
        <span className={styles.userSuffix}>님</span>
      </div>
      <p className={styles.accountNumber}>{accountNumber}</p>
    </header>
  );
}

function AmountDisplay({ amount, availableBalance }) {
  const formattedAmount = amount.toLocaleString("ko-KR");
  const formattedBalance = availableBalance.toLocaleString("ko-KR");

  return (
    <div className={styles.amountDisplayContainer}>
      <h2 className={styles.amount}>{formattedAmount}원</h2>
    </div>
  );
}

function QuickAmountButtons({ onSelect }) {
  const amounts = [
    { label: "전액", className: styles.quickAll },
    { label: "100만", className: styles.quick100 },
    { label: "10만", className: styles.quick10 },
    { label: "5만", className: styles.quick5 },
    { label: "1만", className: styles.quick1 },
  ];

  return (
    <div className={styles.quickAmountContainer}>
      {amounts.map((amount, index) => (
        <button
          key={index}
          className={amount.className}
          onClick={() => onSelect(amount.label)}
        >
          {amount.label}
        </button>
      ))}
    </div>
  );
}
function NumericKeypad({ onKeyPress }) {
    return (
      <div className={styles.keypadWrapper}>
        <div className={styles.keypadRow}>
          <button className={styles.key} onClick={() => onKeyPress("1")}>1</button>
          <button className={styles.key} onClick={() => onKeyPress("2")}>2</button>
          <button className={styles.key} onClick={() => onKeyPress("3")}>3</button>
        </div>
        <div className={styles.keypadRow}>
          <button className={styles.key} onClick={() => onKeyPress("4")}>4</button>
          <button className={styles.key} onClick={() => onKeyPress("5")}>5</button>
          <button className={styles.key} onClick={() => onKeyPress("6")}>6</button>
        </div>
        <div className={styles.keypadRow}>
          <button className={styles.key} onClick={() => onKeyPress("7")}>7</button>
          <button className={styles.key} onClick={() => onKeyPress("8")}>8</button>
          <button className={styles.key} onClick={() => onKeyPress("9")}>9</button>
        </div>
        <div className={styles.keypadRow}>
          <button className={styles.key} onClick={() => onKeyPress("00")}>00</button>
          <button className={styles.key} onClick={() => onKeyPress("0")}>0</button>
          <button className={styles.key} onClick={() => onKeyPress("backspace")}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/afc9f8b354cdef5dd8a9f4f615a15267c4ff200d?placeholderIfAbsent=true"
              alt="Backspace"
              className={styles.backspaceIcon}
            />
          </button>
        </div>
      </div>
    );
  }
  

function DirectPayment() {
  const navigate = useNavigate();

  const [amount, setAmount] = useState(0);
  const [availableBalance] = useState(1500000);

  const handleQuickAmountSelect = (value) => {
    switch (value) {
      case "전액":
        setAmount(availableBalance);
        break;
      case "100만":
        setAmount(1000000);
        break;
      case "10만":
        setAmount(100000);
        break;
      case "5만":
        setAmount(50000);
        break;
      case "1만":
        setAmount(10000);
        break;
      default:
        break;
    }
  };

  const handleNumericInput = (value) => {
    if (value === "backspace") {
      setAmount(Math.floor(amount / 10));
    } else if (value === "00") {
      setAmount(amount * 100);
    } else {
      if (amount < 10000000) {
        setAmount(amount * 10 + parseInt(value));
      }
    }
  };

  const handleConfirm = () => {
    console.log(`Payment confirmed: ${amount}원`);
    localStorage.setItem("paymentAmount", amount.toString());
    navigate("/tenant/direct-payment-review");
  };

  return (
    <section className={styles.paymentSection}>
      <PaymentHeader
        userName="홍길동"
        accountNumber="신한 110123456789"
      />

      <AmountDisplay
        amount={amount}
        availableBalance={availableBalance}
      />

      <QuickAmountButtons onSelect={handleQuickAmountSelect} />

      <NumericKeypad onKeyPress={handleNumericInput} />

      <button className={styles.confirmButton} onClick={handleConfirm}>
        확인
      </button>
    </section>
  );
}

export default DirectPayment;
