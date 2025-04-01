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

        <Route path="/landlord/tenant-mgmt" element={<TenantMgmt />} />  
        <Route path="/landlord/tenant-mgmt-detail" element={<TenantMgmtDetail />} />
        <Route path="/landlord/mypage" element={<LandlordMypage />} />
        <Route path="/tenant/mypage" element={<TenantMypage />} />
        <Route path="/tenant/notice-list" element={<NoticeList />} />
        <Route path="/tenant/contract" element={<ContractInformation />} />


      </Routes>
    </Router>
  );
}

export default App;
