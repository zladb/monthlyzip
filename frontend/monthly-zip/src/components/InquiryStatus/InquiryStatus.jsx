import React, { useMemo } from 'react';
import styles from './InquiryStatus.module.css';


const InquiryStatus = ({ status }) => {
  const statusStyles = useMemo(() => {
    const getStyles = (currentStatus) => {
      switch (currentStatus) {
        case "접수대기":
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
        case "처리중":
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
        case "처리완료":
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
        <span className={`${styles.text1} ${statusStyles.text1}`}>접수 대기</span>
        <span className={`${styles.text2} ${statusStyles.text2}`}>처리중</span>
        <span className={`${styles.text3} ${statusStyles.text3}`}>처리 완료</span>
      </div>
    </div>
  );
};

export default React.memo(InquiryStatus);