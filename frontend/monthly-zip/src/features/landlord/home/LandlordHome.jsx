import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import styles from "./LandlordHome.module.css";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import HomeCard from '../../../components/HomeCard/HomeCard';
import InquiryCard from '../../../components/InquiryCard/InquiryCard';
import moneyIcon from '../../../assets/icons/income.svg';
import roomIcon from '../../../assets/icons/rent.svg';
import unpaidIcon from '../../../assets/icons/edit.svg';
import menuIcon from '../../../assets/icons/sidebar.svg';
import arrowIcon from '../../../assets/icons/arrow_front.svg';

// Header Component
const Header = ({ onMenuClick, userName }) => {
  return (
    <header className={styles.header}>
      <img
        src={menuIcon}
        className={styles.headerIcon}
        alt="사이드바"
        onClick={onMenuClick}
      />
      <h1 className={styles.userName}>{userName}</h1>
      <p className={styles.userTitle}>님의 임대 관리 현황</p>
    </header>
  );
};

// DashboardCards Component
function DashboardCards() {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const totalPages = 3;

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) {
      return;
    }

    if (distance > 0 && currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
    }

    if (distance < 0 && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className={styles.dashboardContainer}>
      <div 
        className={styles.cardSlider}
        style={{ transform: `translateX(-${currentPage * 33.33}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <HomeCard
          icon={moneyIcon}
          label="이번 달 수입"
          value="250만"
          unit="원"
        />
        <HomeCard
          icon={roomIcon}
          label="임대중인 방"
          value="5"
          unit="개"
        />
        <HomeCard
          icon={unpaidIcon}
          label="미납 현황"
          value="2"
          unit="건"
        />

      </div>
      <div className={styles.pageIndicator}>
        {[...Array(totalPages)].map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === currentPage ? styles.active : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

// InquiryList Component
function InquiryList() {
  const navigate = useNavigate();
  const inquiries = [
    // 더미 데이터
    {
      id: 1,
      type: '생활민원',
      title: '층간 소음 신고',
      date: '2025-03-24 18:20',
      status: '처리중'
    },
    {
      id: 2,
      type: '납부관리',
      title: '3월 월세 미납금',
      date: '2025-03-23 13:46',
      status: '처리중'
    },
    {
      id: 3,
      type: '수리요청',
      title: '전등 고장',
      date: '2025-03-21 01:39',
      status: '처리중'
    }
  ];

  return (
    <section className={styles.notificationContainer}>
      <div className={styles.notificationHeader}>
        <h2 className={styles.notificationTitle}>최근 문의</h2>
        <button className={styles.viewMoreButton} onClick={() => navigate('/landlord/inquiry')}>
          <span className={styles.viewMoreText}>더보기</span>
          <img
            src={arrowIcon}
            className={styles.viewMoreIcon}
            alt="더보기 아이콘"
          />
        </button>
      </div>
      {inquiries.map((inquiry) => (
        <InquiryCard
          key={inquiry.id}
          type={inquiry.type}
          title={inquiry.title}
          date={inquiry.date}
          status={inquiry.status}
          onClick={() => navigate(`/landlord/inquiries/${inquiry.id}`)}
        />
      ))}
    </section>
  );
}

// Main LandlordHome Component
function LandlordHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <div className={styles.container}>
      <Header userName="홍길동" onMenuClick={() => setIsSidebarOpen(true)} />
      <div className={styles.content}>
        <DashboardCards />
        <InquiryList />
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Navbar />
    </div>
  );
}

export default LandlordHome;
