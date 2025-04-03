"use client";
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';
import Logo from "../../../assets/icons/monthlyZip.png";
import alarmIcon from "../../../assets/icons/notification.svg";
import profileIcon from "../../../assets/icons/mypage.svg";
import logoutIcon from "../../../assets/icons/logout.svg";
import withdrawIcon from "../../../assets/icons/quit.svg";
import axios from "axios";



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

// 로그아웃
function LogoutSection({ onClose }) {
      const navigate = useNavigate(); 
      // 실제 로그아웃 처리
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


// 회원탈퇴
function AccountActions({ onClose }) {
  const navigate = useNavigate();

  const handleWithdraw = async () => {
    const confirmed = window.confirm("정말 탈퇴하시겠습니까?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("accessToken");

      await axios.delete("/api/members", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 로컬 스토리지 정리
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userType");

      alert("회원 탈퇴가 완료되었습니다.");
      onClose();          // 사이드바 닫기
      navigate("/login"); // 로그인 페이지로 이동
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
      alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
    }
  };
  console.log("보내는 토큰:", localStorage.getItem("accessToken"));

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
