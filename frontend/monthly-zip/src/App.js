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
import PaymentMain from './features/tenant/payment/PaymentMain';
import NoticeList from './features/tenant/notice/NoticeList';
import ContractInformation from './features/tenant/contract/ContractInformation';
import AutoPaymentAgreement from './features/tenant/payment/auto/AutoPaymentAgreement';
import AutoPayment from './features/tenant/payment/auto/AutoPayment';
import NoticeDetail from './features/tenant/notice/NoticeDetail';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>홈 페이지</h1>} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tenant/payment-list" element={<PaymentList />} /> 
        <Route path="/tenant/payment-detail/:year/:month" element={<PaymentDetail />} />
        <Route path="/tenant/payment-main" element={<PaymentMain />} />
        <Route path="/tenant/auto-payment" element={<AutoPayment />} />
        <Route path="/tenant/auto-payment-agreement" element={<AutoPaymentAgreement />} /> 
        <Route path="/tenant/contract" element={<ContractInformation />} />
        <Route path="/tenant/notice-list" element={<NoticeList />} />
        {/* <Route path="/tenant/notice-detail/:noticeId" element={<NoticeDetail />} /> */}
        <Route path="/tenant/notice-detail" element={<NoticeDetail />} />
        
        <Route path="/landlord/tenant-mgmt" element={<TenantMgmt />} />  {/* 임차인 관리  MyPage*/}
        <Route path="/landlord/tenant-mgmt-detail" element={<TenantMgmtDetail />} />  {/* 임차인 관리 상세세 MyPage*/}
        <Route path="/landlord/mypage" element={<LandlordMypage />} />    {/* 임대인 MyPage*/}
        <Route path="/tenant/mypage" element={<TenantMypage />} />        {/* 임차인인 MyPage*/}


      </Routes>
    </Router>
  );
}

export default App;
