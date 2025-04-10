import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Building.module.css";
import buildingIcon from '../../../assets/icons/building.svg';
import Navbar from "../navbar/Navbar";
import BuildingCard from "../../../components/BuildingCard/BuildingCard";

// Header Component
const Header = ({ onBuildingRegister }) => (
  <header className={styles.headerContainer}>
    <h1 className={styles.title}>세대 목록</h1>
    <button 
      className={styles.buildingRegister} 
      onClick={onBuildingRegister}
      type="button"
    >
      <img src={buildingIcon} alt="Building icon" />
      <span>건물 등록</span>
    </button>
  </header>
);

// Page Indicator Component
const PageIndicator = ({ totalPages, currentPage, onPageChange }) => (
  <div className={styles.pageIndicator}>
    {[...Array(totalPages)].map((_, index) => (
      <button 
        key={index}
        className={`${styles.indicator} ${currentPage === index ? styles.active : ''}`}
        aria-label={`Page ${index + 1}`}
        onClick={() => onPageChange(index)}
      />
    ))}
  </div>
);

// Building Cards Container Component
const BuildingCardsContainer = ({ buildings, onBuildingClick, onRoomCreate, onBuildingUpdate, onBuildingDelete, currentPage, setCurrentPage }) => {
  const containerRef = useRef(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentPage < buildings.length - 1) {
      setCurrentPage(prev => prev + 1);
    }
    if (isRightSwipe && currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const transitionStyle = {
    transform: `translateX(-${currentPage * 100}%)`,
    transition: 'transform 0.3s ease-out'
  };

  if (buildings.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p>등록된 건물이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div 
        className={styles.cardsContainer}
        ref={containerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className={styles.cardsWrapper} style={transitionStyle}>
          {buildings.map((building) => (
            <div key={building.id} className={styles.cardSlide}>
              <BuildingCard
                buildingId={building.id}
                buildingName={building.buildingName}
                onDelete={onBuildingDelete}
                currentPage={currentPage}
              />
            </div>
          ))}
        </div>
      </div>
      {buildings.length > 0 && (
        <PageIndicator 
          totalPages={buildings.length} 
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </>
  );
};

// Main Building Component
function Building() {
  const navigate = useNavigate();
  const [buildings, setBuildings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    try {
      const response = await axios.get('/api/buildings');
      if (response.data.success) {
        setBuildings(response.data.result);
      }
      setIsLoading(false);
    } catch (error) {
      setError('건물 목록을 불러오는데 실패했습니다.');
      setIsLoading(false);
    }
  };

  const handleBuildingDelete = async (buildingId) => {
    try {
      const response = await axios.delete(`/api/building/${buildingId}`);
      if (response.data.success) {
        await fetchBuildings();
      }
    } catch (error) {
      console.error('건물 삭제에 실패했습니다.', error);
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.building}>
        <Header onBuildingRegister={() => navigate('/landlord/building-create')} />
        <BuildingCardsContainer
          buildings={buildings}
          onBuildingDelete={handleBuildingDelete}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <Navbar />
    </div>
  );
}

export default Building;
