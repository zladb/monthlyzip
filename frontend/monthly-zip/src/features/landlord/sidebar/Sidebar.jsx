"use client";
import React, { navigate } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import Logo from "../../../assets/icons/monthlyZip.png";
import alarmIcon from "../../../assets/icons/notification.svg";
import profileIcon from "../../../assets/icons/mypage.svg";
import logoutIcon from "../../../assets/icons/logout.svg";
import withdrawIcon from "../../../assets/icons/quit.svg";

// NavItem Component
function NavItem({ iconSrc, iconAlt, text, onClick }) {
  return (
    <div className={styles.navItem} onClick={onClick}>
      <img src={iconSrc} alt={iconAlt} className={styles.navIcon} />
      <span className={styles.navText}>{text}</span>
    </div>
  );
}

// LogoSection Component
function LogoSection() {
  return (
    <header className={styles.logoSection}>
      <img src={Logo} alt="Monthly ZIP" className={styles.logo} />
    </header>
  );
}

// NavigationItems Component
function NavigationItems({ navigate, onClose }) {
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
        navigate('/mypage');
        onClose();
      }
    }
  ];

  return (
    <nav className={styles.navigation}>
      {menuItems.map((item, index) => (
        <NavItem
          key={index}
          iconSrc={item.icon}
          iconAlt={item.label}
          text={item.label}
          onClick={item.onClick}
        />
      ))}
    </nav>
  );
}

// LogoutSection Component
function LogoutSection({ onClose }) {
      // ✅ 실제 로그아웃 처리
      const handleLogout = () => {
        if (window.confirm("정말 로그아웃 하시겠습니까?")) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userType");
    
          navigate("/login");
          onClose();
        }
      };

  return (
    <footer className={styles.logoutSection}>
      <div className={styles.logoutContainer} onClick={handleLogout}>
        <img src={logoutIcon} alt="로그아웃" className={styles.navIcon} />
        <span className={styles.logoutText}>로그아웃</span>
      </div>
    </footer>
  );
}


// AccountActions Component
function AccountActions({ onClose }) {
  const handleWithdraw = () => {
    // TODO: 회원 탈퇴 로직 구현
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      console.log('회원 탈퇴');
      onClose();
    }
  };

  return (
    <section className={styles.withdrawSection} onClick={handleWithdraw}>
      <img src={withdrawIcon} alt="회원 탈퇴" className={styles.navIcon} />
      <span className={styles.withdrawText}>회원 탈퇴</span>
    </section>
  );
}


// Main Sidebar Component
const Sidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <>
      {isOpen && (
        <div className={styles.backdrop} onClick={onClose} />
      )}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <LogoSection />
        <NavigationItems navigate={navigate} onClose={onClose} />
        <LogoutSection onClose={onClose} />
        <AccountActions onClose={onClose} />
      </aside>
    </>
  );
};

export default Sidebar;
