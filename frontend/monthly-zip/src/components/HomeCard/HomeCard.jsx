import React from 'react';
import styles from './HomeCard.module.css';

const StatusCard = ({ icon, label, value, unit }) => {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <img src={icon} alt={label} className={styles.icon} />
      </div>
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <div className={styles.value}>
          {value}
          <span className={styles.unit}>{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard; 