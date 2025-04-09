import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./NoticeList.module.css";
import Navbar from "../navbar/Navbar"


function NoticeItem({ noticeId, title, date }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tenant/notice-detail/${noticeId}`);
  }

  return (
    <div className={styles.noticeItem} onClick={handleClick}>
      <h2 className={styles.noticeTitle}>{title}</h2>
      <time className={styles.noticeDate}>{new Date(date).toLocaleDateString()}</time>
    </div>
  );
}

function NoticeList() {
  const [notices, setNotices] = useState([]);  // 전체 문의 리스트

  useEffect(() => {
    const fetchNotices = () => {
      axios.get("/api/notices", { 
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
  
          if (response.data.success) {
            setNotices(response.data.result);
          } else {
            console.error("공지사항 목록을 가져오지 못했습니다:", response.data.message);
          }
        })
        .catch((error) => console.error("공지사항 목록을 가져오는 중 오류 발생:", error));
    };
    
    fetchNotices();
  }, []);
  
  return (
    <main className={styles.container}>
      <section className={styles.contentWrapper}>
        <h1 className={styles.pageTitle}>공지사항</h1>
        <article className={styles.noticeBoard}>
          {notices.length > 0 ? (
              notices.map((notice) => (
                <React.Fragment key={notice.noticeId}>
                  <NoticeItem 
                    noticeId={notice.noticeId}
                    title={notice.title} 
                    date={notice.createdAt} 

                  
                  />
                  <hr className={styles.divider} />
                </React.Fragment>
              ))
            ) : (
              <p>등록된 공지사항이 없습니다.</p>
            )}
        </article>
      </section>
      <Navbar />
    </main>
  );
}

export default NoticeList;
