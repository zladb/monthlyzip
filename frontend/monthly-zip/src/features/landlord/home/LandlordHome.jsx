import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './LandlordHome.module.css';
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import HomeCard from '../../../components/HomeCard/HomeCard';
import InquiryCard from '../../../components/InquiryCard/InquiryCard';
import moneyIcon from '../../../assets/icons/income.svg';
import roomIcon from '../../../assets/icons/rent.svg';
import unpaidIcon from '../../../assets/icons/edit.svg';
import menuIcon from '../../../assets/icons/sidebar.svg';
import arrowIcon from '../../../assets/icons/arrow_front.svg';
import Loader from "../../../loader/Loader";

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
function DashboardCards({ monthlySummary }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const totalPages = 3;
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
          label="이번 달 수입"
          value={monthlySummary.currentMonthIncome.toLocaleString()}
          unit="원"
        />
        <HomeCard
          icon={roomIcon}
          label="임대중인 방"
          value={monthlySummary.occupiedRooms}
          unit="개"
        />
        <HomeCard
          icon={unpaidIcon}
          label="미납자 수"
          value={monthlySummary.paymentOverdue}
          unit="명"
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

// InquiryList Component
function InquiryList({ inquiries, onInquiryClick }) {
  const navigate = useNavigate();

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
      {inquiries.length > 0 ? (
        inquiries.map((inquiry) => (
          <InquiryCard
            key={inquiry.inquiryId}
            id={inquiry.inquiryId}
            type={inquiry.type}
            title={inquiry.title}
            date={inquiry.createdAt}
            status={inquiry.status}
            onClick={() => onInquiryClick(inquiry.inquiryId)}
            roomInfo={inquiry.roomInfo}
          />
        ))
      ) : (
        <div className={styles.emptyState}>
          <p>아직 문의가 없습니다.</p>
        </div>
      )}
    </section>
  );
}

// Main LandlordHome Component
function LandlordHome() {
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
          if (!response.data.result || !response.data.result.landlordInfo) {
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

  const handleInquiryClick = (inquiryId) => {
    console.log('클릭한 문의 ID:', inquiryId);
    if (inquiryId) {
      navigate(`/landlord/inquiry/${inquiryId}`);
    } else {
      console.error('문의 ID가 없습니다.');
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>에러가 발생했습니다: {error}</div>;
  if (!dashboardData) return <div>데이터를 찾을 수 없습니다.</div>;

  return (
    <div className={styles.container}>
      <Header userName={dashboardData.landlordInfo.name} onMenuClick={() => setIsSidebarOpen(true)} />
      <div className={styles.content}>
        <DashboardCards monthlySummary={dashboardData.monthlySummary} />
        <InquiryList 
          inquiries={dashboardData.recentInquiries} 
          onInquiryClick={handleInquiryClick}
        />
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Navbar />
    </div>
  );
}

export default LandlordHome;
