import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './features/user/login/Login';
import Signup from './features/user/signup/Signup';
import TenantMgmt from './features/tenantMgmt/TenantMgmt';
import TenantMgmtDetail from './features/tenantMgmt/TenantMgmtDetail';
import PaymentList from './features/tenant/payment/PaymentList';
import PaymentDetail from './features/tenant/payment/PaymentDetail';
import LandlordMypage from './features/myPage/landlord/LandlordMypage';
import TenantMypage from './features/myPage/tenant/TenantMypage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>홈 페이지</h1>} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tenant/payment-list" element={<PaymentList />} /> 
        <Route path="/tenant/payment-detail" element={<PaymentDetail />} />
        <Route path="/landlord/tenant-mgmt" element={<TenantMgmt />} />  {/* 임차인 목록 */}
        <Route path="/landlord/tenant-mgmt-detail" element={<TenantMgmtDetail />} /> {/* 임차인 관리 상세 페이지 */}
        <Route path="/landlord/mypage" element={<LandlordMypage />} />  {/* 임대인 마이 페이지 */}
        <Route path="/tenant/mypage" element={<TenantMypage />} />  {/* 임차인 마이 페이지 */}
       

      </Routes>
    </Router>
  );
}

export default App;
