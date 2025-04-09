import React, { useState } from "react";
import styles from "./Building.module.css";
import buildingIcon from '../../../assets/icons/building.svg';
import addIcon from '../../../assets/icons/add.svg';
import Navbar from "../navbar/Navbar";
import UDModal from "../../../components/UDModal/UDModal";

// Header Component
const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.title}>세대 목록</h1>
      <div className={styles.buildingRegister}>
        <img src={buildingIcon} alt="Building icon" />
        <span>건물 등록</span>
      </div>
    </header>
  );
};

// Unit Row Component
const UnitRow = ({ unitName, status, isLast }) => {
  const isVacant = status === "공실";

  return (
    <>
      <div className={styles.unitRow}>
        <h3 className={styles.unitName}>{unitName}</h3>
        <span className={isVacant ? styles.vacantStatus : styles.occupiedStatus}>
          {status}
        </span>
      </div>
      {!isLast && <div className={styles.thinDivider} />}
    </>
  );
};

// Register Unit Button Component
const RegisterUnitButton = () => {
  return (
    <button className={styles.registerUnitButton}>
      <img
        src={addIcon}
        alt="Add unit icon"
        className={styles.registerUnitIcon}
      />
      <span>세대 등록</span>
    </button>
  );
};

// Dot Indicator Component
const DotIndicator = () => {
  return (
    <nav className={styles.dotIndicator}>
      <div className={styles.dot} aria-label="Page 1" />
      <div className={styles.dot} aria-label="Page 2" />
      <div className={styles.dot} aria-label="Page 3" />
    </nav>
  );
};

// Page Indicator Component
const PageIndicator = ({ totalPages, currentPage }) => {
  return (
    <div className={styles.pageIndicator}>
      {[...Array(totalPages)].map((_, index) => (
        <div 
          key={index}
          className={`${styles.indicator} ${currentPage === index ? styles.active : ''}`}
          aria-label={`Page ${index + 1}`}
        />
      ))}
    </div>
  );
};

// Building Card Component
const BuildingCard = () => {
  const [showModal, setShowModal] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(null);

  const handleMenuClick = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    setButtonPosition({
      top: rect.top,
      right: rect.right,
    });
    setShowModal(true);
  };

  const handleUpdate = () => {
    setShowModal(false);
    // 수정 로직 구현
  };

  const handleDelete = () => {
    setShowModal(false);
    // 삭제 로직 구현
  };

  const units = [
    { name: "101동 101호", status: "공실" },
    { name: "101동 102호", status: "입주" },
    { name: "101동 103호", status: "입주" },
    { name: "101동 201호", status: "입주" },
    { name: "101동 202호", status: "공실" },
  ];

  return (
    <>
      <section className={styles.buildingCard}>
        <div className={styles.buildingHeader}>
          <h2>유로빌</h2>
          <button className={styles.menuButton} onClick={handleMenuClick}>⋮</button>
        </div>
        <div className={styles.divider} />

        {units.map((unit, index) => (
          <UnitRow 
            key={index} 
            unitName={unit.name} 
            status={unit.status}
            isLast={index === units.length - 1}
          />
        ))}

        <button className={styles.registerUnitButton}>
          + 세대 등록
        </button>
      </section>
      {showModal && (
        <UDModal
          onClose={() => setShowModal(false)}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          buttonPosition={buttonPosition}
        />
      )}
    </>
  );
};

// Main Building Component
function Building() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3; // 예시로 3개의 건물이 있다고 가정

  return (
    <div className={styles.container}>
      <div className={styles.building}>
        <Header />
        <BuildingCard />
        <PageIndicator totalPages={totalPages} currentPage={currentPage} />
      </div>
      <Navbar />
    </div>
  );
}

export default Building;
