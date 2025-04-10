import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './TenantHome.module.css';
import Navbar from "../navbar/Navbar";
import Sidebar from "../../tenant/sidebar/Sidebar";
import HomeCard from '../../../components/HomeCard/HomeCard';
import moneyIcon from '../../../assets/icons/income.svg';
import roomIcon from '../../../assets/icons/rent.svg';
import menuIcon from '../../../assets/icons/sidebar.svg';
import arrowIcon from '../../../assets/icons/arrow_front.svg';

const Header = ({ onMenuClick, userName }) => {
  return (
    <header className={styles.header}>
      <img
        src={menuIcon}
        className={styles.headerIcon}
        alt="사이드바"
        onClick={onMenuClick}
      />
      <div className={styles.userInfoWrapper}>
        <h1 className={styles.userName}>{userName}</h1>
        <p className={styles.userTitle}>님의 임차 관리 현황</p>
      </div>
    </header>
  );
};

// DashboardCards Component
function DashboardCards({ monthlySummary }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const totalPages = 2;
  const cardWidth = 100 / totalPages; // 각 카드의 너비를 퍼센트로 계산

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
        style={{ transform: `translateX(-${currentPage * cardWidth}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <HomeCard
          icon={moneyIcon}
          label="다음 월세 납부일"
          value={monthlySummary.paymentDate.toLocaleString()}
        />
        <HomeCard
          icon={roomIcon}
          label="월세 연체 금액"
          value={monthlySummary.amount}
          unit="원"
        />
      </div>
      <div className={styles.pageIndicator}>
        {[...Array(totalPages)].map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === currentPage ? styles.active : ''}`}
            onClick={() => setCurrentPage(index)}
          />
        ))}
      </div>
    </div>
  );
}

function NoticeCard({ title, date, onClick}) {

  if (!date) return null; // date가 없을 경우 안전 처리

  const isNew = (() => {
    const now = new Date();
    const created = new Date(date);
    const diff = (now - created) / (1000 * 60 * 60 * 24); // 일 단위 차이
    return diff < 3;
  })();

  const timeStyle = date.includes("-")
    ? styles.noticeTimestamp
    : styles.noticeTimeAgo;

  return (
    <article className={styles.noticeCard} onClick={onClick}>
      <div className={styles.noticeCardHeader}>
        <h4 className={styles.noticeCardTitle}>{title}</h4>
        {isNew && <span className={styles.noticeBadge}>new</span>}
      </div>
      <time className={timeStyle}>{date}</time>
    </article>
  );
}

function NoticeList({ notices, onClick }) {
  const navigate = useNavigate();

  return (
    <section className={styles.notificationContainer}>
      <div className={styles.notificationHeader}>
        <h2 className={styles.notificationTitle}>공지사항</h2>
        <button className={styles.viewMoreButton} onClick={() => navigate('/tenant/notice-list')}>
          <span className={styles.viewMoreText}>더보기</span>
          <img
            src={arrowIcon}
            className={styles.viewMoreIcon}
            alt="더보기 아이콘"
          />
        </button>
      </div>
      {notices.length > 0 ? (
        notices.map((notice) => (
          <NoticeCard
            key={notice.noticeId}
            id={notice.noticeId}
            title={notice.title}
            date={notice.createdAt}
            onClick={() => onClick(notice.noticeId)}
          />
        ))
      ) : (
        <div className={styles.emptyState}>
          <p>등록된 공지사항이 없습니다.</p>
        </div>
      )}
    </section>
  );
}

function TenantHome() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('/api/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          console.log('대시보드 데이터:', response.data.result);
          // 데이터 유효성 검사
          if (!response.data.result || !response.data.result.tenantInfo) {
            throw new Error('유효하지 않은 데이터입니다.');
          }
          setDashboardData(response.data.result);
        } else {
          throw new Error(response.data.message);
        }
      } catch (err) {
        console.error('대시보드 데이터 로딩 에러:', err);
        if (err.response?.status === 401) {
          navigate('/login');
          return;
        }
        setError(err.response?.data?.message || '데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleClick = (noticeId) => {
    console.log('클릭한 공지사항 ID:', noticeId);
    if (noticeId) {
      navigate(`/tenant/notice-detail/${noticeId}`);
    } else {
      console.error('공지사항 ID가 없습니다.');
    }
  };

  if (loading) return;
  if (error) return <div>에러가 발생했습니다: {error}</div>;
  if (!dashboardData) return <div>데이터를 찾을 수 없습니다.</div>;

  return (
    <div className={styles.container}>
      <Header userName={dashboardData.tenantInfo.name} onMenuClick={() => setIsSidebarOpen(true)} />
      <div className={styles.content}>
        <DashboardCards monthlySummary={dashboardData.nextPayment} />
        <NoticeList
          notices={dashboardData.notices || []}
          onClick={handleClick}
        />
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Navbar />
    </div>
  );
}

export default TenantHome;
