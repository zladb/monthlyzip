"use client";
import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "./Inquiry.module.css";
import InquiryCard from "../../../components/InquiryCard/InquiryCard";
import Navbar from "../navbar/Navbar";

// InquiryHeader Component
const InquiryHeader = () => (
  <div className={styles.div2}>
    <h1 className={styles.div3}>문의 내역</h1>
  </div>
);

// StatusFlow Component
const StatusItem = ({ number, label, isActive, showDot, onClick }) => (
  <div className={styles.statusWrapper} onClick={onClick}>
    <div className={isActive ? styles.statusCircleActive : styles.statusCircleInactive}>
      {number}
      {showDot && <div className={styles.statusDot} />}
    </div>
    <div className={isActive ? styles.statusLabelActive : styles.statusLabel}>
      {label}
    </div>
  </div>
);

const StatusFlow = ({ activeStatus, setActiveStatus, statusCounts }) => {
  const statuses = [
    { label: "접수 대기", key: "접수대기" },
    { label: "처리중", key: "처리중" },
    { label: "처리 완료", key: "처리완료" }
  ];

  return (
    <div className={styles.div4}>
      {statuses.map((status, index) => (
        <StatusItem
          key={status.label}
          number={statusCounts[status.key] || 0}
          label={status.label}
          isActive={activeStatus === status.key}
          showDot={index !== statuses.length - 1}
          onClick={() => setActiveStatus(activeStatus === status.key ? "" : status.key)}
        />
      ))}
    </div>
  );
};

// BuildingFilter Component
const BuildingFilter = ({ activeBuilding, setActiveBuilding, buildings }) => {
  return (
    <nav className={styles.div16}>
      <button
        key="building-all"
        className={activeBuilding === "전체" ? styles.filterButtonActive : styles.filterButton}
        onClick={() => setActiveBuilding("전체")}
      >
        전체
      </button>
      {buildings.map((building, index) => (
        <button
          key={`building-${building.id}`}
          className={activeBuilding === building.id ? styles.filterButtonActive : styles.filterButton}
          onClick={() => setActiveBuilding(building.id)}
        >
          {building.buildingName}
        </button>
      ))}
    </nav>
  );
};

// Main Inquiry Component
function Inquiry() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStatus, setActiveStatus] = useState("");
  const [activeBuilding, setActiveBuilding] = useState("전체");
  const [statusCounts, setStatusCounts] = useState({});
  const [buildings, setBuildings] = useState([]);
  const [allInquiries, setAllInquiries] = useState([]);

  // 건물 목록 fetch 함수
  const fetchBuildings = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('/api/buildings', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        const buildingsData = response.data.result;
        setBuildings(buildingsData);
      }
    } catch (err) {
      console.error('건물 목록 조회 에러:', err);
    }
  };

  // 문의 데이터 fetch 함수
  const fetchInquiries = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      
      // 전체 문의 데이터를 가져오기 위해 status 필터 없이 요청
      const response = await axios.get('/api/inquiries', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.data.success) {
        const allInquiriesData = response.data.result;
        setAllInquiries(allInquiriesData);
        
        // 전체 데이터에서 상태별 카운트 계산
        const counts = allInquiriesData.reduce((acc, inquiry) => {
          acc[inquiry.status] = (acc[inquiry.status] || 0) + 1;
          return acc;
        }, {});
        setStatusCounts(counts);

        // 선택된 상태와 건물에 따라 필터링
        let filteredData = allInquiriesData;
        
        if (activeStatus) {
          filteredData = filteredData.filter(inquiry => inquiry.status === activeStatus);
        }
        
        if (activeBuilding !== "전체") {
          filteredData = filteredData.filter(inquiry => inquiry.contractId === activeBuilding);
        }
        
        setInquiries(filteredData);
      }
    } catch (err) {
      console.error('API 요청 에러:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [activeStatus, activeBuilding]);

  // 초기 데이터 로드
  useEffect(() => {
    fetchBuildings();
  }, []);

  // 필터 변경시 데이터 새로고침
  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러가 발생했습니다: {error}</div>;

  return (
    <main className={styles.pwa}>
      <section className={styles.div}>
        <InquiryHeader />
        <StatusFlow 
          activeStatus={activeStatus} 
          setActiveStatus={setActiveStatus}
          statusCounts={statusCounts}
        />
      </section>
      <section className={styles.div15}>
        <BuildingFilter 
          activeBuilding={activeBuilding}
          setActiveBuilding={setActiveBuilding}
          buildings={buildings}
        />
        {inquiries.map((inquiry) => (
          <InquiryCard
            key={inquiry.inquiryId}
            id={inquiry.inquiryId}
            type={inquiry.inquiryType}
            title={inquiry.title}
            date={inquiry.createdAt}
            status={inquiry.status}
          />
        ))}
      </section>
      <Navbar />
    </main>
  );
}

export default Inquiry;
