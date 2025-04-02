import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import Login from './features/user/login/Login';
import Signup from './features/user/signup/Signup';
import TenantMgmt from './features/landlord/tenantMgmt/TenantMgmt';
import TenantMgmtDetail from './features/landlord/tenantMgmt/TenantMgmtDetail';
import PaymentList from './features/tenant/payment/PaymentList';
import PaymentDetail from './features/tenant/payment/PaymentDetail';
import LandlordMypage from './features/landlord/myPage/LandlordMypage';
import TenantMypage from './features/myPage/tenant/TenantMypage';
import PaymentMain from './features/tenant/payment/PaymentMain';
import NoticeList from './features/tenant/notice/NoticeList';
import ContractInformation from './features/tenant/contract/ContractInformation';
import AutoPaymentAgreement from './features/tenant/payment/auto/AutoPaymentAgreement';
import AutoPayment from './features/tenant/payment/auto/AutoPayment';
import NoticeDetail from './features/tenant/notice/NoticeDetail';

import LandlordHome from './features/landlord/home/LandlordHome';

function App() {
  // const [userType, setUserType] = useState(null);
  const [userType, setUserType] = useState('임대인');

  return (
    <Router>
      <Routes>
        {/* 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* 임대인 라우트 */}
        <Route path="/landlord" element={<LandlordHome />} />
        <Route path="/landlord/alarm-setting" element={<div>알림 발송 설정 페이지</div>} />
        <Route path="/landlord/building" element={<div>세대 관리 메인 페이지</div>} />
        <Route path="/landlord/inquiry" element={<div>문의 메인 페이지</div>} />
        <Route path="/landlord/notice" element={<div>공지사항 메인 페이지</div>} />
        <Route path="/landlord/tenant-mgmt" element={<TenantMgmt />} />  
        <Route path="/landlord/tenant-mgmt-detail" element={<TenantMgmtDetail />} />
        <Route path="/landlord/mypage" element={<LandlordMypage />} />

        {/* 임차인 라우트 */}
        <Route path="/tenant/payment-list" element={<PaymentList />} /> 
        <Route path="/tenant/payment-detail/:year/:month" element={<PaymentDetail />} />
        <Route path="/tenant/payment-main" element={<PaymentMain />} />
        <Route path="/tenant/auto-payment" element={<AutoPayment />} />
        <Route path="/tenant/auto-payment-agreement" element={<AutoPaymentAgreement />} /> 
        <Route path="/tenant/contract" element={<ContractInformation />} />
        <Route path="/tenant/notice-list" element={<NoticeList />} />
        {/* <Route path="/tenant/notice-detail/:noticeId" element={<NoticeDetail />} /> */}
        <Route path="/tenant/notice-detail" element={<NoticeDetail />} />
        <Route path="/tenant/payment-list" element={<PaymentList />} /> 
        <Route path="/tenant/payment-detail/:year/:month" element={<PaymentDetail />} />
        <Route path="/tenant/mypage" element={<TenantMypage />} />


      </Routes>
    </Router>
  );
}

export default App;
