import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import './App.css';
import Loader from './loader/Loader'; // 로딩 컴포넌트

// 사용자 관련
import Login from './features/user/login/Login';
import Signup from './features/user/signup/Signup';
import Mypage from './features/user/myPage/Mypage';

// 임대인
import TenantMgmt from './features/landlord/tenantMgmt/TenantMgmt';
import TenantMgmtDetail from './features/landlord/tenantMgmt/TenantMgmtDetail';
import LandlordHome from './features/landlord/home/LandlordHome';
import Inquiry from './features/landlord/inquiry/Inquiry';
import LandlordInquiryDetail from './features/landlord/inquiry/InquiryDetail';
import Notice from './features/landlord/notice/Notice';
import LandlordNoticeDetail from './features/landlord/notice/NoticeDetail';
import NoticeUpdate from './features/landlord/notice/NoticeUpdate';
import NoticeCreate from './features/landlord/notice/NoticeCreate';
import NotificationPage from './features/landlord/notification/NotificationPage';

// 임차인
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

// ✨ 로딩 상태 & 라우트 감지 처리
function AppRoutes() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // 라우트가 변경되면 로딩 표시
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 최소 로딩 시간 설정 (실제 API 연동 시 조정 가능)

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {loading && <Loader />}

      <Routes>
        {/* 공통 */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<Mypage />} />

        {/* 임대인 */}
        <Route path="/landlord" element={<LandlordHome />} />
        <Route path="/landlord/alarm-setting" element={<div>알림 발송 설정 페이지</div>} />
        <Route path="/landlord/building" element={<div>세대 관리 메인 페이지</div>} />
        <Route path="/landlord/tenant-mgmt" element={<TenantMgmt />} />
        <Route path="/landlord/tenant-mgmt-detail" element={<TenantMgmtDetail />} />
        <Route path="/landlord/tenant-mgmt-detail/:id" element={<TenantMgmtDetail />} />
        <Route path="/landlord/inquiry" element={<Inquiry />} />
        <Route path="/landlord/inquiry/:inquiryId" element={<LandlordInquiryDetail />} />
        <Route path="/landlord/notice" element={<Notice />} />
        <Route path="/landlord/notice/:noticeId" element={<LandlordNoticeDetail />} />
        <Route path="/landlord/notice-update/:noticeId" element={<NoticeUpdate />} />
        <Route path="/landlord/notice-create" element={<NoticeCreate />} />
        <Route path="/landlord/notification" element={<NotificationPage />} />

        {/* 임차인 */}
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
        <Route path="/tenant/auto-payment-register" element={<AutoPaymentRegister />} />
        <Route path="/tenant/auto-payment-confirm" element={<AutoPaymentConfirm />} />
        <Route path="/tenant/contract" element={<ContractInformation />} />
        <Route path="/tenant/notice-list" element={<NoticeList />} />
        <Route path="/tenant/notice-detail/:noticeId" element={<NoticeDetail />} />
        <Route path="/tenant/inquiry-register" element={<InquiryRegister />} />
        <Route path="/tenant/inquiry-list" element={<InquiryList />} />
        <Route path="/tenant/inquiry-detail/:inquiryId" element={<InquiryDetail />} />
        <Route path="/tenant/inquiry-update/:inquiryId" element={<InquiryUpdate />} />
      </Routes>
    </>
  );
}

// 최상위 App 구성
function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
