import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ requiredType }) => {
  const location = useLocation();
  // 로컬 스토리지에서 액세스 토큰과 사용자 유형을 가져옵니다.
  const isAuthenticated = !!localStorage.getItem('accessToken');
  const userType = localStorage.getItem('userType');

  // 1. 로그인 여부 확인
  if (!isAuthenticated) {
    // 로그아웃 상태이면 로그인 페이지로 리디렉션 (원래 요청했던 경로를 state로 전달)
    return <Navigate to="/user/login" state={{ from: location }} replace />;
  }

  // 2. 특정 사용자 유형이 필요한 경우 확인
  if (requiredType && userType !== requiredType) {
    // 사용자 유형이 일치하지 않으면 접근 권한 없음 페이지 또는 홈으로 리디렉션 (예: 홈으로)
    // 여기서는 간단히 로그인 페이지로 보내지만, 별도의 권한 없음 페이지를 만들 수 있습니다.
    alert(`접근 권한이 없습니다. (${requiredType} 전용 메뉴)`);
    // 이전 페이지로 돌려보내거나, 역할에 맞는 기본 페이지로 보낼 수 있습니다.
    // 예: 임차인이 임대인 메뉴 접근 시 /tenant 로, 임대인이 임차인 메뉴 접근 시 /landlord 로
    const fallbackPath = userType === '임대인' ? '/landlord' : userType === '임차인' ? '/tenant' : '/user/login';
    return <Navigate to={fallbackPath} replace />;
  }

  // 모든 조건을 통과하면 자식 컴포넌트(Outlet) 렌더링
  return <Outlet />;
};

export default ProtectedRoute; 