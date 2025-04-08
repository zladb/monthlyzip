import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Notice.module.css";
import editIcon from "../../../assets/icons/edit.svg";
import Navbar from "../navbar/Navbar";
import axios from "axios";

function Notice() {
  return (
    <div className={styles.container}>
      <div className={styles.notice}>
        <NotificationHeader />
        <NotificationPanel />
      </div>
      <Navbar />
    </div>
  );
}

function NotificationHeader() {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate("/landlord/notice/create");
  };

  return (
    <header className={styles.div}>
      <h1 className={styles.div2}>공지사항</h1>
      <button className={styles.div3} onClick={handleCreateClick}>
        <img src={editIcon} alt="New post icon" className={styles.img} />
        <span className={styles.div4}>새로 작성</span>
      </button>
    </header>
  );
}

function NotificationPanel() {
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [notices, setNotices] = useState([]);

  const fetchNotices = async (buildingId) => {
    try {
      const url = buildingId ? `/api/notices?buildingId=${buildingId}` : '/api/notices';
      const response = await axios.get(url);
      if (response.data.success) {
        setNotices(response.data.result);
      }
    } catch (error) {
      console.error("공지사항 목록을 불러오는데 실패했습니다:", error);
    }
  };

  useEffect(() => {
    fetchNotices(selectedBuilding?.id);
  }, [selectedBuilding]);

  return (
    <main className={styles.div5}>
      <NotificationFilters selectedBuilding={selectedBuilding} setSelectedBuilding={setSelectedBuilding} />
      <NotificationList notices={notices} />
    </main>
  );
}

function NotificationFilters({ selectedBuilding, setSelectedBuilding }) {
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const response = await axios.get("/api/buildings");
        if (response.data.success || response.data.isSuccess) {
          const buildingList = response.data.result.content || response.data.result;
          setBuildings(buildingList);
        }
      } catch (error) {
        console.error("건물 목록을 불러오는데 실패했습니다:", error);
      }
    };

    fetchBuildings();
  }, []);

  return (
    <>
      <nav className={styles.div6}>
        <button
          className={`${styles.filterButton} ${!selectedBuilding ? styles.selected : ''}`}
          onClick={() => setSelectedBuilding(null)}
        >
          전체
        </button>
        {buildings.map((building) => (
          <button
            key={building.id}
            className={`${styles.filterButton} ${selectedBuilding?.id === building.id ? styles.selected : ''}`}
            onClick={() => setSelectedBuilding(building)}
          >
            {building.buildingName}
          </button>
        ))}
      </nav>
      <div className={styles.div10} />
    </>
  );
}

function NotificationList({ notices }) {
  return (
    <>
      {notices.map((notice, index) => (
        <NotificationItem
          key={notice.noticeId}
          notice={notice}
          isLast={index === notices.length - 1}
        />
      ))}
    </>
  );
}

function NotificationItem({ notice, isLast }) {
  const navigate = useNavigate();
  const formattedDate = new Date(notice.createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\. /g, '.').slice(0, -1);

  const handleClick = () => {
    navigate(`/landlord/notice/${notice.noticeId}`);
  };

  return (
    <>
      <article className={styles.noticeItem} onClick={handleClick}>
        <h2 className={styles.noticeTitle}>{notice.title}</h2>
        <time className={styles.noticeDate}>{formattedDate}</time>
      </article>
      {!isLast && <hr className={styles.noticeDivider} />}
    </>
  );
}

export default Notice;
