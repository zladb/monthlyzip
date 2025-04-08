import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./InquiryCard.module.css";

function InquiryCard({ id, type, title, date, status }) { 
  const navigate = useNavigate();
  const getTypeText = (type) => {
    switch (type) {
      case "수리요청":
        return { type: "REPAIR", text: "수리요청" };
      case "납부관리":
        return { type: "PAYMENT", text: "납부관리" };
      case "생활민원":
        return { type: "LIFE", text: "생활민원" };
      case "계약관리":
        return { type: "CONTRACT", text: "계약관리" };
      case "기타":
        return { type: "OTHER", text: "기타" };
      default:
        return { type: "OTHER", text: "기타" };
    }
  };
  const { type: cardType, text: typeText } = getTypeText(type);
  const handleClick = () => {
    navigate(`/landlord/inquiry/${id}`);
  };

  const formattedDate = new Date(date).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\. /g, '.').slice(0, -1);

  return (
    <article 
      className={styles.card} 
      data-type={cardType} 
      onClick={handleClick}
    >
      <div className={styles.type}>
        {typeText}
      </div>
      <h3 className={styles.title}>
        {title}
      </h3>
      <div className={styles.meta}>
        <time className={styles.date}>
          {formattedDate}
        </time>
        <span className={styles.status}>
          {status}
        </span>
      </div>
    </article>
  );
}

export default InquiryCard;
