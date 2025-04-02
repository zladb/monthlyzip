import React from "react";
import styles from "./PWA.module.css";

function InquiryCard({ type, title, date, status, variant }) {
  const getCardClassName = () => {
    const baseClass = styles.inquiryCard;
    switch (variant) {
      case "green":
        return `${baseClass} ${ styles.inquiryCardGreen}`;
      case "pink":
        return `${baseClass} ${styles.inquiryCardPink}`;
      case "blue":
        return `${baseClass} ${styles.inquiryCardBlue}`;
      default:
        return baseClass;
    }
  };

  const getTypeClassName = () => {
    const baseClass = styles.inquiryType;
    switch (variant) {
      case "green":
        return `${baseClass} ${styles.inquiryTypeGreen}`;
      case "pink":
        return `${baseClass} ${styles.inquiryTypePink}`;
      case "blue":
        return `${baseClass} ${styles.inquiryTypeBlue}`;
      default:
        return baseClass;
    }
  };

  const getMetaClassName = () => {
    const baseClass = styles.inquiryMeta;
    switch (variant) {
      case "green":
        return `${baseClass} ${styles.inquiryMetaGreen}`;
      case "pink":
        return `${baseClass} ${styles.inquiryMetaPink}`;
      case "blue":
        return `${baseClass} ${styles.inquiryMetaBlue}`;
      default:
        return baseClass;
    }
  };

  const getStatusClassName = () => {
    const baseClass = styles.inquiryStatus;
    switch (variant) {
      case "green":
        return `${baseClass} ${styles.inquiryStatusGreen}`;
      case "pink":
        return `${baseClass} ${styles.inquiryStatusPink}`;
      case "blue":
        return `${baseClass} ${styles.inquiryStatusBlue}`;
      default:
        return baseClass;
    }
  };

  return (
    <article className={getCardClassName()}>
      <div className={getTypeClassName()}>
        {type}
      </div>
      <h3 className={styles.inquiryTitle}>
        {title}
      </h3>
      <div className={getMetaClassName()}>
        <time className={styles.inquiryDate}>
          {date}
        </time>
        <span className={getStatusClassName()}>
          {status}
        </span>
      </div>
    </article>
  );
}

export default InquiryCard;
