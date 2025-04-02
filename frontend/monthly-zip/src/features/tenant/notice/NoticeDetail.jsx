import React from "react";
// import { useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
import styles from "./NoticeDetail.module.css";

function NoticeDetailHeader() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/tenant/notice-list");
  };

  return (
    <header className={styles.headerContainer}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/b0fda4c87ef4488ff7962e087d875284f1646cb8?placeholderIfAbsent=true"
        className={styles.headerIcon}
        alt="Notice icon"
        onClick={handleClick}
      />
      <h1 className={styles.headerTitle}>공지사항 상세</h1>
    </header>
  );
}

// function NoticeContent({ title, content }) {
//   return (
//     <article className={styles.contentCard}>
//       <div className={styles.titleRow}>
//         <span className={styles.titleLabel}>제목: </span>
//         <h2 className={styles.titleText}>{title}</h2>
//       </div>
//       <hr className={styles.divider} />
//       <h3 className={styles.contentLabel}>내용</h3>
//       <p className={styles.contentText}>{content}</p>
//     </article>
//   );
// }

function NoticeContent() {
  return (
    <article className={styles.contentCard}>
      <div className={styles.titleRow}>
        <span className={styles.titleLabel}>제목: </span>
        <h2 className={styles.titleText}>정기 청소 및 쓰레기 배출 일정</h2>
      </div>
      <hr className={styles.divider} />
      <h3 className={styles.contentLabel}>내용</h3>
      <p className={styles.contentText}>
        안녕하세요, 입주민 여러분. 쾌적한 주거 환경을 유지하기 위해 정기 청소 및
        쓰레기 배출 일정을 안내드립니다.
        <br />
        <br />
        <br />✅ 정기 청소 일정
        <br />
        청소일: 매주 [요일]
        <br />
        청소 시간: [시간]
        <br />
        청소 구역: 공용 복도, 계단, 엘리베이터, 주차장 등<br />※ 원활한 청소를
        위해 해당 시간에는 이동에 유의해 주세요.
        <br />
        <br />
        <br />
        🗑️ 쓰레기 배출 일정 및 방법
        <br />
        배출 가능 요일: [요일]
        <br />
        배출 시간: [시간]
        <br />
        배출 장소: [지정된 장소]
        <br />
        <br />
        <br />✅ 분리배출 준수사항
        <br />
        일반 쓰레기, 음식물 쓰레기, 재활용품을 구분하여 배출해 주세요.
        <br />
        대형 폐기물은 사전 신고 후 배출해 주세요.
        <br />
        <br />
        쾌적한 생활 공간을 위해 입주자 여러분의 협조 부탁드립니다. 감사합니다.
        😊
      </p>
    </article>
  );
}

// function NoticeDetail() {
//   const { noticeId } = useParams();
//   const [notice, setNotice] = useState(null);
  
//   useEffect(() => {
//     axios.get(`/api/notices/${noticeId}`)
//       .then(response => setNotice(response.data.result))
//       .catch(err => console.error("공지사항을 불러오는 중 오류 발생", err));
//   }, [noticeId]);

//   if (!notice) return <p>공지사항을 불러오는 중입니다...</p>;

//   return (
//     <section className={styles.container}>
//       <NoticeDetailHeader />
//       <NoticeContent title={notice.title} content={notice.content} />
//     </section>
//   );
// }

// export default NoticeDetail;


function NoticeDetail() {
  return (
    <section className={styles.container}>
      <NoticeDetailHeader />
      <NoticeContent />
    </section>
  );
}

export default NoticeDetail;
