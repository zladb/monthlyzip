import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './features/user/login/Login';
import Signup from './features/user/signup/Signup';
import TenantMgmt from './features/tenantMgmt/TenantMgmt';
import TenantMgmtDetail from './features/tenantMgmt/TenantMgmtDetail';
import PaymentList from './features/tenant/payment/PaymentList';
import PaymentDetail from './features/tenant/payment/PaymentDetail';
import LandlordMypage from './features/myPage/admin/LandlordMypage';
import TenantMypage from './features/myPage/user/TenantMypage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>홈 페이지</h1>} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/payment-list" element={<PaymentList />} /> 
        <Route path="/payment-detail" element={<PaymentDetail />} />
        <Route path="/tenantMgmt" element={<TenantMgmt />} />  
        <Route path="/tenantMgmtDetail" element={<TenantMgmtDetail />} />
        <Route path="/landlord/mypage" element={<LandlordMypage />} />
        <Route path="/tenant/mypage" element={<TenantMypage />} />
       

      </Routes>
    </Router>
  );
}

export default App;
