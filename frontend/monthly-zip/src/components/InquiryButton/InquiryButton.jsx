import React from 'react';
import styles from './InquiryButton.module.css';

const InquiryButton = ({ status, onClick }) => {
  const isWaiting = status === "접수대기";

  return (
    <button 
      className={styles.button}
      onClick={onClick}
      disabled={!isWaiting}
    >
      {isWaiting ? '접수' : '접수 완료'}
    </button>
  );
};

export default React.memo(InquiryButton);
