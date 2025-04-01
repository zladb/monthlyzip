import React from "react";
import styles from "./NoticeList.module.css";

const noticeData = [
  { title: "정기 청소 및 쓰레기 배출 일정", date: "2025-03-24" },
  { title: "시설 및 설비 점검 안내", date: "2025-03-24" },
  { title: "공동 생활 수칙 및 변경 사항", date: "2025-03-24" },
  { title: "안전 및 보안 관련 공지", date: "2025-03-24" },
  { title: "관리비 및 기타 비용 안내", date: "2025-03-24" },
  { title: "주차장 이용 및 차량 등록 안내", date: "2025-03-24" },
  { title: "택배 및 우편물 수령 규칙", date: "2025-03-24" }
];

function NoticeList() {
  return (
    <main className={styles.container}>
      <section className={styles.contentWrapper}>
        <h1 className={styles.pageTitle}>공지사항</h1>
        <article className={styles.noticeBoard}>
          {noticeData.map((notice, index) => (
            <React.Fragment key={index}>
              <NoticeItem title={notice.title} date={notice.date} />
              {index < noticeData.length - 1 && <hr className={styles.divider} />}
            </React.Fragment>
          ))}
        </article>
      </section>
      {/* <NavigationBar /> */}
    </main>
  );
}

function NoticeItem({ title, date }) {
  return (
    <div className={styles.noticeItem}>
      <h2 className={styles.noticeTitle}>{title}</h2>
      <time className={styles.noticeDate}>{date}</time>
    </div>
  );
}

export default NoticeList;
