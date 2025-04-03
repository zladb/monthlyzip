import React from "react";
import styles from "./InquiryCard.module.css";

function InquiryCard({ type, title, date, status, onClick }) {
  const getTypeText = (type) => {
    switch (type) {
      case "수리 요청":
        return { type: "REPAIR", text: "수리 요청" };
      case "납부 관리":
        return { type: "PAYMENT", text: "납부 관리" };
      case "생활 민원":
        return { type: "LIFE", text: "생활 민원" };
      case "계약 연장":
        return { type: "CONTRACT", text: "계약 연장" };
      case "기타":
        return { type: "OTHER", text: "기타" };
      default:
        return { type: "OTHER", text: "기타" };
    }
  };

  const { type: cardType, text: typeText } = getTypeText(type);

  return (
    <article className={styles.card} data-type={cardType} onClick={onClick}>
      <div className={styles.type}>
        {typeText}
      </div>
      <h3 className={styles.title}>
        {title}
      </h3>
      <div className={styles.meta}>
        <time className={styles.date}>
          {date}
        </time>
        <span className={styles.status}>
          {status}
        </span>
      </div>
    </article>
  );
}

export default InquiryCard;
