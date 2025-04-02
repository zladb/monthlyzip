import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./InquiryList.module.css";
// import registerIcon from 

function InquiryHeader({ title }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.pageTitle}>{title}</h1>
      {/* <img src={registerIcon} alt="register" className={styles.icon} /> */}
    </header>
  );
}

function CategoryFilter() {
  const categories = [
    "전체",
    "납부 관리",
    "수리 요청",
    "생활 민원",
    "계약 연장",
    "기타",
  ];

  return (
    <nav className={styles.filterContainer}>
      {categories.map((category, index) => (
        <button key={index} className={styles.filterItem}>
          {category}
        </button>
      ))}
    </nav>
  );
}

function InquiryItem({ category, categoryColor, title, date, status }) {
  const navigate = useNavigate();
  
  // const handleClick = () => {
  //   navigate(`/tenant/inquiry-detail/${inquiryId}`);
  // };
  return (
    <article className={styles.inquiryCard}>
      <div
        className={styles.categoryLabel}
        style={{ backgroundColor: categoryColor }}
      >
        {category}
      </div>
      <div className={styles.contentContainer}>
        <h2 className={styles.title}>{title}</h2>
        <time className={styles.date}>{date}</time>
      </div>
      <span className={styles.status}>{status}</span>
      <div className={styles.chevronContainer}>
        <div
          dangerouslySetInnerHTML={{
            __html:
              "<svg id=&quot;I111:6419;36:7131&quot; layer-name=&quot;icon / chevron left&quot; width=&quot;13&quot; height=&quot;38&quot; viewBox=&quot;0 0 13 38&quot; fill=&quot;none&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot; class=&quot;chevron&quot; style=&quot;width: 12px; height: 12px; position: absolute; right: 16px; top: 50%; transform: translateY(-50%)&quot;> <path fill-rule=&quot;evenodd&quot; clip-rule=&quot;evenodd&quot; d=&quot;M4.84289 37.9531L3.78223 36.8925L8.1269 32.5478L3.78223 28.2031L4.84289 27.1425L10.2482 32.5478L4.84289 37.9531Z&quot; fill=&quot;#333333&quot;></path> </svg>",
          }}
        />
      </div>
    </article>
  );
}


function InquiryList() {
  const inquiryItems = [
    {
      category: "수리 요청",
      categoryColor: "#07f",
      title: "전등 고장",
      date: "2025-03-24 18:20",
      status: "처리중",
    },
    {
      category: "계약 연장",
      categoryColor: "#ff1d86",
      title: "102호 계약 연장 신청",
      date: "2025-03-23 13:46",
      status: "처리중",
    },
    {
      category: "생활 민원",
      categoryColor: "#16d03b",
      title: "503호 층간 소음 신고",
      date: "2025-03-21 01:39",
      status: "처리 완료",
    },
    {
      category: "납부 관리",
      categoryColor: "#ff7e3e",
      title: "402호 3월 월세 미납금 입금",
      date: "2025-03-11 11:20",
      status: "처리 완료",
    },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Open+Sans:wght@400;700&family=Poppins:wght@700&display=swap"
        rel="stylesheet"
      />
      <main className={styles.container}>
        <InquiryHeader title="문의 내역" />
        <CategoryFilter />
        <section className={styles.inquiryList}>
          {inquiryItems.map((item, index) => (
            <InquiryItem
              key={index}
              category={item.category}
              categoryColor={item.categoryColor}
              title={item.title}
              date={item.date}
              status={item.status}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default InquiryList;
