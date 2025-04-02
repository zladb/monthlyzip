"use client";
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import Logo from "../../../assets/icons/monthlyZip.png";
import alarmIcon from "../../../assets/icons/notification.svg";
import profileIcon from "../../../assets/icons/mypage.svg";
import logoutIcon from "../../../assets/icons/logout.svg";
import withdrawIcon from "../../../assets/icons/quit.svg";

// SidebarHeader component for the top section with logo
const SidebarHeader = () => {
  return (
    <header className={styles.header}>
      <img
        src={Logo}
        alt="Monthly ZIP"
        className={styles.logo}
      />
    </header>
  );
};

// SidebarNavigation component for the middle section with menu items
const SidebarNavigation = ({ navigate, onClose }) => {
  const handleLogout = () => {
    // TODO: 로그아웃 로직 구현
    console.log('로그아웃');
    onClose();
  };

  const handleWithdraw = () => {
    // TODO: 회원 탈퇴 로직 구현
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      console.log('회원 탈퇴');
      onClose();
    }
  };

  const menuItems = [
    {
      icon: alarmIcon,
      label: '알림 발송 설정',
      onClick: () => {
        navigate('/landlord/alarm-setting');
        onClose();
      }
    },
    {
      icon: profileIcon,
      label: '마이페이지',
      onClick: () => {
        navigate('/landlord/mypage');
        onClose();
      }
    },
    {
      icon: logoutIcon,
      label: '로그아웃',
      onClick: handleLogout
    },
    {
      icon: withdrawIcon,
      label: '회원 탈퇴',
      onClick: handleWithdraw,
      className: styles.withdraw
    }
  ];

  return (
    <nav className={styles.navigation}>
      {menuItems.map((item, index) => (
        <button
          key={index}
          className={`${styles.menuItem} ${item.className || ''}`}
          onClick={() => {
            item.onClick();
            onClose();
          }}
        >
          <img src={item.icon} alt={item.label} className={styles.menuIcon} />
          <span className={styles.menuLabel}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

// Main Sidebar component
const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className={styles.backdrop}
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <SidebarHeader />
        <SidebarNavigation navigate={navigate} onClose={onClose} />
      </div>
    </>
  );
};

export default Sidebar;
