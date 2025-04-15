"use client";
import React, { useState } from "react";
import styles from "./Notification.module.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// 화살표
function BackArrow() {
  const navigate = useNavigate(); 
  return (
    <button aria-label="Go back" onClick={() => navigate("/landlord")}>
      <svg

        width="27"
        height="24"
        viewBox="0 0 27 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="arrow-icon"
      >
        <path
          d="M10.125 19L2.25 12L10.125 5L11.7 6.4L6.55312 11H24.75V13H6.55312L11.7281 17.6L10.125 19Z"
          fill="black"
        />
      </svg>
    </button>
  );
}

// BellIcon Component
function BellIcon() {
  return (
    <div style={{ marginRight: "12px" }}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="bell-icon"
      >
        <path
          d="M3.33366 15.8327V14.166H5.00033V8.33268C5.00033 7.87435 5.05935 7.42296 5.17741 6.97852C5.29546 6.53407 5.47255 6.11046 5.70866 5.70768L6.95866 6.95768C6.86144 7.1799 6.78852 7.4056 6.73991 7.63477C6.6913 7.86393 6.66699 8.09657 6.66699 8.33268V14.166H11.8337L1.16699 3.49935L2.33366 2.33268L17.667 17.666L16.5003 18.8327L13.4587 15.8327H3.33366ZM15.0003 12.6243L13.3337 10.9577V8.33268C13.3337 7.41602 13.0073 6.63129 12.3545 5.97852C11.7017 5.32574 10.917 4.99935 10.0003 4.99935C9.63921 4.99935 9.29199 5.0549 8.95866 5.16602C8.62533 5.27713 8.31977 5.44379 8.04199 5.66602L6.83366 4.45768C7.11144 4.23546 7.41005 4.04102 7.72949 3.87435C8.04894 3.70768 8.38921 3.58268 8.75033 3.49935V2.91602C8.75033 2.56879 8.87185 2.27365 9.11491 2.0306C9.35796 1.78754 9.6531 1.66602 10.0003 1.66602C10.3475 1.66602 10.6427 1.78754 10.8857 2.0306C11.1288 2.27365 11.2503 2.56879 11.2503 2.91602V3.49935C12.3614 3.77713 13.2642 4.36393 13.9587 5.25977C14.6531 6.1556 15.0003 7.1799 15.0003 8.33268V12.6243ZM10.0003 18.3327C9.54199 18.3327 9.14963 18.1695 8.82324 17.8431C8.49685 17.5167 8.33366 17.1243 8.33366 16.666H11.667C11.667 17.1243 11.5038 17.5167 11.1774 17.8431C10.851 18.1695 10.4587 18.3327 10.0003 18.3327Z"
          fill="#5F6368"
        />
      </svg>
    </div>
  );
}

// 안내문
function NotificationInfo() {
  return (
    <section className={styles.div4}>
      <h3 className={styles.div5}>
        임대료(관리비) 고지서 (매월 납부일 자동 발송)
      </h3>
      <p className={styles.div6}>
        <span className={styles.span}>발송을 원하지 않으면</span>
        <span>아래 자동 발송 설정에서</span>
      </p>
      <p className={styles.div7}>
        <BellIcon />
        <span>스위치를 꺼주세요.</span>
      </p>
      <hr className={styles.div8} />
      <div className={styles.div9}>
        <h3 className={styles.div10}>미납 고지서 (자동발송 아님)</h3>
        <p className={styles.div11}>
          <span>임대료 미납 시</span>
          <span className={styles.span}>미납 고지서 보기/발송</span>
          <span>을 눌러</span>
        </p>
        <p className={styles.div12}>미납 고지서를 보낼수 있습니다.</p>
      </div>
    </section>
  );
}


// 자동발송
function SettingsSection() {
  const [rooms, setRooms] = useState([
    { id: 1, name: "101호", enabled: true },
    { id: 2, name: "102호", enabled: true },
    { id: 3, name: "103호", enabled: true },
    { id: 4, name: "104호", enabled: true },
    { id: 5, name: "201호", enabled: true },
    { id: 6, name: "202호", enabled: true },
  ]);

  const [allEnabled, setAllEnabled] = useState(true);

  const toggleAll = () => {
    const newState = !allEnabled;
    setAllEnabled(newState);
    setRooms(rooms.map((room) => ({ ...room, enabled: newState })));
  };

  const toggleRoom = (id) => {
    const updatedRooms = rooms.map((room) =>
      room.id === id ? { ...room, enabled: !room.enabled } : room
    );
    setRooms(updatedRooms);
    setAllEnabled(updatedRooms.every((room) => room.enabled));
  };

  return (
    <section className={styles.div17}>
      {/* 건물명 + 전체 토글 */}
      <div className={styles.div18}>
        <h3 className={styles.div19}>푸른숲빌라</h3>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="allToggle"
            checked={allEnabled}
            onChange={toggleAll}
          />
          <label className="form-check-label" htmlFor="allToggle">
            전체
          </label>
        </div>
      </div>

      {/* 개별 호실 토글 */}
      <div>
        {rooms.map((room) => (
          <div key={room.id} className={styles.roomRow}>
            <span className={styles.roomName}>{room.name}</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={room.enabled}
                onChange={() => toggleRoom(room.id)}
              />
              <span className={styles.slider}>{room.enabled ? "ON" : "OFF"}</span>
            </label>
          </div>  
        // </div>
        ))}
      </div>
    </section>
  );
}


function NotificationPage() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <main className={styles.div}>
        <header className={styles.div2}>
          <BackArrow />
        </header>
        <h1 className={styles.div3}>고지서</h1>
        <NotificationInfo />
        <section className={styles.div13}>
          <div className={styles.div14}>
            <h2 className={styles.div15}>자동발송 설정</h2>
            <button className={styles.div16}>고지서 예시 보기 &gt;</button>
          </div>
          <SettingsSection />
        </section>
      </main>
    </>
  );
}

export default NotificationPage;
