import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import homeIcon from '../../../assets/icons/home.svg';
import buildingIcon from '../../../assets/icons/building.svg';
import tenantIcon from '../../../assets/icons/tenantMgmt.svg';
import repairIcon from '../../../assets/icons/inquiry.svg';
import noticeIcon from '../../../assets/icons/notice.svg';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { icon: homeIcon, label: '홈', path: '/landlord' },
    { icon: buildingIcon, label: '세대 관리', path: '/landlord/building' },
    { icon: tenantIcon, label: '임차인 관리', path: '/landlord/tenant-mgmt' },
    { icon: repairIcon, label: '문의', path: '/landlord/inquiry' },
    { icon: noticeIcon, label: '공지사항', path: '/landlord/notice' },
  ];

  return (
    <nav className={styles.navbar}>
      {navItems.map((item, index) => (
        <Link
          key={index}
          to={item.path}
          className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
        >
          <div className={styles.iconWrapper}>
            <img src={item.icon} alt={item.label} className={styles.icon} />
          </div>
          <span className={styles.label}>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;