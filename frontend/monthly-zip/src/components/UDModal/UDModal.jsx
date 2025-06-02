import React, { useEffect, useState } from 'react';
import styles from './UDModal.module.css';
import editIcon from '../../assets/icons/edit.svg';
import deleteIcon from '../../assets/icons/delete.svg';

const UDModal = ({ onClose, onUpdate, onDelete, buttonPosition }) => {
  const [modalStyle, setModalStyle] = useState({});

  useEffect(() => {
    if (buttonPosition) {
      const { top, right } = buttonPosition;
      setModalStyle({
        position: 'fixed',
        top: `${top + 40}px`,
        right: `${window.innerWidth - right + 8}px`,
      });
    }
  }, [buttonPosition]);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div 
        className={styles.modalContent} 
        style={modalStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.modalButton} onClick={onUpdate}>
          <img src={editIcon} alt="수정" className={styles.buttonIcon} />
          수정하기
        </button>
        <div className={styles.divider}></div>
        <button className={styles.modalButton} onClick={onDelete}>
          <img src={deleteIcon} alt="삭제" className={styles.buttonIcon} />
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default UDModal;
