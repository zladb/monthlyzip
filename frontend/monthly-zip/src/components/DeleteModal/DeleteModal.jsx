import React from 'react';
import styles from './DeleteModal.module.css';

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.title}>정말로 삭제하시겠습니까?</h2>
        <p className={styles.description}>삭제된 데이터는 복구할 수 없습니다.</p>
        <div className={styles.buttonContainer}>
          <button className={styles.cancelButton} onClick={onClose}>
            닫기
          </button>
          <button className={styles.deleteButton} onClick={onConfirm}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal; 