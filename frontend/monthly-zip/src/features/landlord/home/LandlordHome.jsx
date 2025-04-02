import React, { useState } from "react";
import styles from "./LandlordHome.module.css";
import Navbar from "../navbar/Navbar";
import Sidebar from "../sidebar/Sidebar";
import StatusCard from '../../../components/HomeCard/HomeCard';
import moneyIcon from '../../../assets/icons/income.svg';
import roomIcon from '../../../assets/icons/rent.svg';
import unpaidIcon from '../../../assets/icons/edit.svg';
import menuIcon from '../../../assets/icons/sidebar.svg';

const LandlordHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const statusCards = [
    {
      icon: moneyIcon,
      label: '이번달 수입',
      value: '250',
      unit: '만원'
    },
    {
      icon: roomIcon,
      label: '임대 중인 방',
      value: '5',
      unit: '개'
    },
    {
      icon: unpaidIcon,
      label: '미납 현황',
      value: '2',
      unit: '건'
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <button 
            className={styles.menuButton}
            onClick={() => setIsSidebarOpen(true)}
          >
            <img src={menuIcon} alt="메뉴" />
          </button>
          <h1 className={styles.title}>홍길동 님의 임대 관리 현황</h1>
        </div>
      </div>
      
      <div className={styles.content}>
        {statusCards.map((card, index) => (
          <StatusCard
            key={index}
            icon={card.icon}
            label={card.label}
            value={card.value}
            unit={card.unit}
          />
        ))}
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Navbar />
    </div>
  );
};

export default LandlordHome;