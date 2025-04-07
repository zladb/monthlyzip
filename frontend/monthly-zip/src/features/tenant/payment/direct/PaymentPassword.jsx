import React, { useState, useEffect } from "react";
import styles from "./PaymentPassword.module.css";
import ResetIcon from "../../../../assets/icons/Arrow-Back-Right.png"

// 도트와 숫자 표시를 함께 지원
const PasswordDots = ({ length = 4, filledCount = 0, visibleIndex = null, password = "" }) => {
    return (
      <div className={styles.passwordDotsContainer}>
        {Array.from({ length }).map((_, index) => {
          const isFilled = index < filledCount;
          const showNumber = index === visibleIndex;
          return (
            <div key={index} className={styles.passwordDotWrapper}>
              {showNumber && password[index] ? (
                <span className={styles.passwordChar}>{password[index]}</span>
              ) : (
                <div className={`${styles.passwordDot} ${isFilled ? styles.filled : ""}`} />
              )}
            </div>
          );
        })}
      </div>
    );
  };
  
  const KeypadButton = ({ children, onClick }) => {
    return (
      <button
        className={styles.keypadButtonContainer}
        onClick={onClick}
        aria-label={
          children === "delete"
            ? "Delete"
            : children === "reset"
            ? "Reset"
            : `Number ${children}`
        }
      >
        {children === "delete" ? (
          <img
            src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/afc9f8b354cdef5dd8a9f4f615a15267c4ff200d?placeholderIfAbsent=true"
            alt="Backspace"
            className={styles.backspaceIcon}
          />
        ) : children === "reset" ? (
          <img
            src={ResetIcon}
            alt="Reset"
            className={styles.resetIcon}
          />
        ) : (
          <span className={styles.keypadNumber}>{children}</span>
        )}
      </button>
    );
  };
  
  const NumericKeypad = ({ onKeyPress, numberOrder }) => {
    // 0~9가 무작위로 섞여 있음
    const firstNine = numberOrder.slice(0, 9); // 숫자 9개
    const lastNumber = numberOrder[9];         // 마지막 숫자 (0~9 중 하나)
  
    const keypadLayout = [
      ...firstNine,     // 상단 3줄
      "reset",          // 왼쪽 아래
      lastNumber,       // 가운데 아래
      "delete",         // 오른쪽 아래
    ];
  
    return (
      <div className={styles.keypadGrid}>
        {keypadLayout.map((key, index) => (
          <KeypadButton key={index} onClick={() => onKeyPress(key)}>
            {key}
          </KeypadButton>
        ))}
      </div>
    );
  };
  

function PaymentPassword() {
    const initialNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    
    // shuffle
    const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

    const [numberOrder, setNumberOrder] = useState(() => shuffle(initialNumbers));
    const [password, setPassword] = useState("");
    const [visibleIndex, setVisibleIndex] = useState(null);
  
  
    // 0.7초 후 숫자 → 도트 전환
    useEffect(() => {
      if (visibleIndex === null) return;
  
      const timer = setTimeout(() => setVisibleIndex(null), 700);
      return () => clearTimeout(timer);
    }, [visibleIndex]);
  
    const handleKeyPress = (key) => {
      if (key === "delete") {
        setPassword((prev) => prev.slice(0, -1));
        setVisibleIndex(null);
      } else if (key === "reset") {
        setNumberOrder(shuffle(initialNumbers)); // 숫자만 섞기
        setVisibleIndex(null);
      } else if (password.length < 4) {
        const newPassword = password + key;
        setPassword(newPassword);
        setVisibleIndex(newPassword.length - 1);
      }
    };
  
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>비밀번호 입력</h1>

      <PasswordDots
        length={4}
        filledCount={password.length}
        visibleIndex={visibleIndex}
        password={password}
      />

      <NumericKeypad onKeyPress={handleKeyPress} numberOrder={numberOrder} />
    </main>
  );
}

export default PaymentPassword;
