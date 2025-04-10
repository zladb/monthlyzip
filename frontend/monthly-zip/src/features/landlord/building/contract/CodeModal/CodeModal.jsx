import React, { useState, useEffect } from 'react';
import styles from './CodeModal.module.css';

function CodeModal({ contractCode, expireTime, onClose }) {
  const [copied, setCopied] = useState(false);
  const [remainingTime, setRemainingTime] = useState('10:00');

  useEffect(() => {
    // 초기 시간 설정
    let minutes = 10;
    let seconds = 0;
    
    // 타이머 시작
    const timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          setRemainingTime('00:00');
          return;
        }
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }
      
      // 시간 형식으로 표시 (MM:SS)
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = seconds.toString().padStart(2, '0');
      setRemainingTime(`${formattedMinutes}:${formattedSeconds}`);
    }, 1000);
    
    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, []);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(contractCode)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('클립보드 복사 실패:', err);
      });
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.cardContainer} onClick={e => e.stopPropagation()}>
        <div className={styles.cardContent}>
          <div className={styles.infoRow}>
            <p className={styles.infoLabel}>계약 코드</p>
            <div className={styles.codeWrapper}>
              <p className={`${styles.infoValue} ${styles.clickable}`} onClick={handleCopyClick}>
                {contractCode}
              </p>
              {copied && <span className={styles.copiedText}>복사됨</span>}
            </div>
          </div>
          <div className={styles.infoRow}>
            <p className={styles.infoLabel}>만료 시간</p>
            <p className={styles.infoValue}>{remainingTime}</p>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.confirmButton} onClick={onClose}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default CodeModal;