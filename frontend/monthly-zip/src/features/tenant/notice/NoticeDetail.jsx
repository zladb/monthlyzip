import React from "react";
import { useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
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

function NoticeContent({ title, content }) {
  return (
    <article className={styles.contentCard}>
      <div className={styles.titleRow}>
        <span className={styles.titleLabel}>제목: </span>
        <h2 className={styles.titleText}>{title}</h2>
      </div>
      <hr className={styles.divider} />
      <h3 className={styles.contentLabel}>내용</h3>
      <p className={styles.contentText}>{content}</p>
    </article>
  );
}

function NoticeDetail() {
  const { noticeId } = useParams();
  const [notice, setNotice] = useState(null);
  
  useEffect(() => {
    const fetchNotice = () => {
      axios.get(`/api/notices/${noticeId}`, { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
  
          if (response.data.success) {
            setNotice(response.data.result);
          } else {
            console.error("공지사항 상세를 가져오지 못했습니다:", response.data.message);
          }
        })
        .catch((error) => console.error("공지사항 상세를 가져오는 중 오류 발생:", error));
    };
    
    fetchNotice();
  }, []);

  if (!notice) return <p>공지사항을 불러오는 중입니다...</p>;

  return (
    <section className={styles.container}>
      <NoticeDetailHeader />
      <NoticeContent title={notice.title} content={notice.content} />
    </section>
  );
}

export default NoticeDetail;