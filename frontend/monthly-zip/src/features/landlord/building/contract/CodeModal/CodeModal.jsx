import React, { useState, useEffect } from "react";
import styles from "./CodeModal.module.css";

function ContractInfoRow({ label, value, onClick, copied }) {
  return (
    <div className={styles.infoRow}>
      <p className={styles.infoLabel}>{label}</p>
      {onClick ? (
        <div className={styles.codeWrapper}>
          <p className={`${styles.infoValue} ${styles.clickable}`} onClick={onClick}>
            {value}
          </p>
          {copied && <span className={styles.copiedText}>복사됨</span>}
        </div>
      ) : (
        <p className={styles.infoValue}>{value}</p>
      )}
    </div>
  );
}

function formatRemainingTime(expireTime) {
  const now = new Date();
  const expire = new Date(expireTime);
  const diff = expire - now;
  
  if (diff <= 0) return "만료됨";
  
  const minutes = Math.floor(diff / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function ContractCard({ contractCode, expireTime, onClose }) {
  const [remainingTime, setRemainingTime] = useState(formatRemainingTime(expireTime));
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = formatRemainingTime(expireTime);
      setRemainingTime(timeLeft);
      
      if (timeLeft === "만료됨") {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expireTime]);

  const handleCodeClick = async () => {
    try {
      await navigator.clipboard.writeText(contractCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2초 후 복사 표시 제거
    } catch (err) {
      console.error('클립보드 복사 실패:', err);
    }
  };

  return (
    <section className={styles.cardContainer}>
      <div className={styles.cardContent}>
        <ContractInfoRow 
          label="계약 코드" 
          value={contractCode} 
          onClick={handleCodeClick}
          copied={copied}
        />
        <ContractInfoRow label="유효시간" value={remainingTime} />
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.confirmButton} onClick={onClose}>
          확인
        </button>
      </div>
    </section>
  );
}

function CodeModal({ contractCode, expireTime, onClose }) {
  return (
    <div className={styles.pageContainer}>
      <ContractCard
        contractCode={contractCode}
        expireTime={expireTime}
        onClose={onClose}
      />
    </div>
  );
}

export default CodeModal;