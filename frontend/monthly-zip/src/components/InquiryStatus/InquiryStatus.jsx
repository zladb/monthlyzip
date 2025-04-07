import React, { useMemo } from 'react';
import styles from './InquiryStatus.module.css';

const STATUSES = {
  WAITING: "접수대기",
  PROCESSING: "처리중",
  COMPLETED: "처리완료"
};

const InquiryStatus = ({ status }) => {
  const statusStyles = useMemo(() => {
    const getStyles = (currentStatus) => {
      switch (currentStatus) {
        case STATUSES.WAITING:
          return {
            line1: styles.lineInactive,
            line2: styles.lineInactive,
            dot1: styles.dotActive,
            dot2: styles.dotInactive,
            dot3: styles.dotInactive,
            text1: styles.textActive,
            text2: styles.textInactive,
            text3: styles.textInactive
          };
        case STATUSES.PROCESSING:
          return {
            line1: styles.lineActive,
            line2: styles.lineInactive,
            dot1: styles.dotActive,
            dot2: styles.dotActive,
            dot3: styles.dotInactive,
            text1: styles.textActive,
            text2: styles.textActive,
            text3: styles.textInactive
          };
        case STATUSES.COMPLETED:
          return {
            line1: styles.lineActive,
            line2: styles.lineActive,
            dot1: styles.dotActive,
            dot2: styles.dotActive,
            dot3: styles.dotActive,
            text1: styles.textActive,
            text2: styles.textActive,
            text3: styles.textActive
          };
        default:
          return {
            line1: styles.lineInactive,
            line2: styles.lineInactive,
            dot1: styles.dotInactive,
            dot2: styles.dotInactive,
            dot3: styles.dotInactive,
            text1: styles.textInactive,
            text2: styles.textInactive,
            text3: styles.textInactive
          };
      }
    };

    return getStyles(status);
  }, [status]);

  return (
    <div className={styles.container}>
      <div className={styles.statusLine}>
        <div className={`${styles.dot1} ${statusStyles.dot1}`} />
        <div className={`${styles.line1} ${statusStyles.line1}`} />
        <div className={`${styles.dot2} ${statusStyles.dot2}`} />
        <div className={`${styles.line2} ${statusStyles.line2}`} />
        <div className={`${styles.dot3} ${statusStyles.dot3}`} />
      </div>
      <div className={styles.statusTexts}>
        <span className={`${styles.text1} ${statusStyles.text1}`}>{STATUSES.WAITING}</span>
        <span className={`${styles.text2} ${statusStyles.text2}`}>{STATUSES.PROCESSING}</span>
        <span className={`${styles.text3} ${statusStyles.text3}`}>{STATUSES.COMPLETED}</span>
      </div>
    </div>
  );
};

export default React.memo(InquiryStatus);