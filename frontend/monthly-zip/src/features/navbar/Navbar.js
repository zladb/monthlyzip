import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ userType }) => {

  return (
    <nav className="navbar">
      <div className="logo">
        {userType === "임대인" ? (
            <Link to="/landlord-main"><h2>월간Zip</h2></Link>
          ) : (
            <Link to="/tenant-main"><h2>월간Zip</h2></Link>
          )}
      </div>
      <ul className="navbar-links">
        {userType === "임차인" ? (
            <>
              <li><Link to="/tenant-main">집 정보</Link></li>
              <li><Link to="/payment">월세 납부</Link></li>
              <li><Link to="/contact">문의하기</Link></li>
              <li><Link to="/mypage">마이페이지</Link></li>
              <li><Link to="/logout">로그아웃</Link></li>
            </>
          ) : userType === "임대인" ? (
            <>
              <li><Link to="/landlord-main">월간Zip</Link></li>
              <li><Link to="/building">건물관리</Link></li>
              <li><Link to="/tenant">임차인관리</Link></li>
              <li><Link to="/notice">문의&공지</Link></li>
              <li><Link to="/mypage">마이페이지</Link></li>
              <li><Link to="/logout">로그아웃</Link></li>
            </>
          ) : (
            <li><Link to="/login">로그인</Link></li>
          )}
        </ul>
    </nav>
  );
}

export default Navbar;
