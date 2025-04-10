import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';
import Login from './features/user/login/Login';
import Signup from './features/user/signup/Signup';
import Mypage from './features/user/myPage/Mypage';

import TenantMgmt from './features/landlord/tenantMgmt/TenantMgmt';
import TenantMgmtDetail from './features/landlord/tenantMgmt/TenantMgmtDetail';
import LandlordHome from './features/landlord/home/LandlordHome';
import Building from './features/landlord/building/Building';
import BuildingCreate from './features/landlord/building/BuildingCreate';
import BuildingUpdate from './features/landlord/building/BuildingUpdate';
import RoomCreate from './features/landlord/building/room/RoomCreate';
import Inquiry from './features/landlord/inquiry/Inquiry';
import LandlordInquiryDetail from './features/landlord/inquiry/InquiryDetail'
import Notice from './features/landlord/notice/Notice';
import LandlordNoticeDetail from './features/landlord/notice/NoticeDetail';
import NoticeUpdate from './features/landlord/notice/NoticeUpdate';
import NoticeCreate from './features/landlord/notice/NoticeCreate';
import NotificationPage from './features/landlord/notification/NotificationPage';

import TenantHome from './features/tenant/home/TenantHome';
import PaymentList from './features/tenant/payment/PaymentList';
import PaymentDetail from './features/tenant/payment/PaymentDetail';
import PaymentMain from './features/tenant/payment/PaymentMain';
import NoticeList from './features/tenant/notice/NoticeList';
import ContractInformation from './features/tenant/contract/ContractInformation';
import AutoPaymentAgreement from './features/tenant/payment/auto/AutoPaymentAgreement';
import AutoPayment from './features/tenant/payment/auto/AutoPayment';
import NoticeDetail from './features/tenant/notice/NoticeDetail';
import InquiryRegister from './features/tenant/inquiry/InquiryRegister';
import InquiryList from './features/tenant/inquiry/InquiryList';
import InquiryDetail from './features/tenant/inquiry/InquiryDetail';
import AutoPaymentRegister from './features/tenant/payment/auto/AutoPaymentRegister';
import DirectPayment from './features/tenant/payment/direct/DirectPayment';
import PaymentReview from './features/tenant/payment/direct/PaymentReview';
import PaymentPassword from './features/tenant/payment/direct/PaymentPassword';
import PaymentConfirm from './features/tenant/payment/direct/PaymentConfirm';
import AutoPaymentConfirm from './features/tenant/payment/auto/AutoPaymentConfirm';
import InquiryUpdate from './features/tenant/inquiry/InquiryUpdate';

function App() {

  return (
    <Router>
      <Routes>
        {/* 공개 라우트 - 로그인하지 않은 사용자도 접근 가능 */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* 로그인한 모든 사용자가 접근 가능한 라우트 */}
        <Route element={<ProtectedRoute />}>
          <Route path="/mypage" element={<Mypage />} />
        </Route>
        
        {/* 임대인 전용 라우트 */}
        <Route element={<ProtectedRoute requiredType="임대인" />}>
          <Route path="/landlord" element={<LandlordHome />} />
          <Route path="/landlord/building" element={<Building />} />
          <Route path="/landlord/building-create" element={<BuildingCreate />} />
          <Route path="/landlord/building-update/:buildingId" element={<BuildingUpdate />} />
          <Route path="/landlord/room-create" element={<RoomCreate />} />

          <Route path="/landlord/tenant-mgmt" element={<TenantMgmt />} />  
          <Route path="/landlord/tenant-mgmt-detail" element={<TenantMgmtDetail />} />
          <Route path="/landlord/tenant-mgmt-detail/:id" element={<TenantMgmtDetail />} />
          <Route path="/landlord/notification" element={<NotificationPage />} />

          <Route path="/landlord/inquiry" element={<Inquiry />} />
          <Route path="/landlord/inquiry/:inquiryId" element={<LandlordInquiryDetail />} />

          <Route path="/landlord/notice" element={<Notice />} />
          <Route path="/landlord/notice/:noticeId" element={<LandlordNoticeDetail />} />
          <Route path="/landlord/notice-update/:noticeId" element={<NoticeUpdate />} />
          <Route path="/landlord/notice-create" element={<NoticeCreate />} />
        </Route>

        {/* 임차인 전용 라우트 */}
        <Route element={<ProtectedRoute requiredType="임차인" />}>
          <Route path="/tenant" element={<TenantHome />} />
          <Route path="/tenant/payment-list" element={<PaymentList />} /> 
          <Route path="/tenant/payment-detail/:paymentId" element={<PaymentDetail />} />
          <Route path="/tenant/payment-main" element={<PaymentMain />} />

          <Route path="/tenant/direct-payment" element={<DirectPayment />} />
          <Route path="/tenant/direct-payment-review" element={<PaymentReview />} />
          <Route path="/tenant/direct-payment-password" element={<PaymentPassword />} />
          <Route path="/tenant/direct-payment-confirm" element={<PaymentConfirm />} /> 

          <Route path="/tenant/auto-payment" element={<AutoPayment />} />
          <Route path="/tenant/auto-payment-agreement" element={<AutoPaymentAgreement />} /> 
          <Route path="/tenant/auto-payment-register" element={<AutoPaymentRegister/>} /> 
          <Route path="/tenant/auto-payment-confirm" element={<AutoPaymentConfirm/>} /> 
          
          <Route path="/tenant/contract" element={<ContractInformation />} />
          <Route path="/tenant/notice-list" element={<NoticeList />} />
          <Route path="/tenant/notice-detail/:noticeId" element={<NoticeDetail />} />
          <Route path="/tenant/inquiry-register" element={<InquiryRegister />} />
          <Route path="/tenant/inquiry-list" element={<InquiryList />} />
          <Route path="/tenant/inquiry-detail/:inquiryId" element={<InquiryDetail />} />
          <Route path="/tenant/inquiry-update/:inquiryId" element={<InquiryUpdate />} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
