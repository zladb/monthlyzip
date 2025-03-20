import React from 'react';
import './TenantMain.css';

const TenantMain = () => {

  // 예제 데이터 (테스트)
  const tenantData = {
    user_type: "임차인",
    tenant_info: {
      name: "김철수",
      profile_image_url: "https://picsum.photos/200"
    },
    next_payment: {
      payment_date: "2025년 4월 5일",
      amount: 500000,
      payment_overdue: 1
    },
    inquiries: [
      {
        inquiry_id: 123,
        type: "수리요청",
        title: "301호 수도 고장",
        created_at: "3시간 전",
        is_read: true
      },
      {
        inquiry_id: 122,
        type: "납부확인",
        title: "301호 12월 월세 미납금 입금",
        created_at: "11시간 전",
        is_read: false
      }
    ]
  };

  const { tenant_info, next_payment, inquiries } = tenantData;
  
  return (
    <div className="tenant-main-container">
          {/* 사용자 정보 */}
          <div className="tenant-info">
            <img 
              src={tenant_info.profile_image_url} 
              alt={`${tenant_info.name}의 프로필 이미지`} 
              className="profile-image"
            />
            <div>
              <h1 className="tenant-name">{tenant_info.name}의 임차 정보</h1>
  
            </div>
          </div>
          
          {/* 월세 정보 */}
          <div className="payment-info-container">
            <div className="payment-info-card">
              <h2>다음 월세 납부 정보</h2>
              <p>{next_payment.payment_date}</p>
              <p>{next_payment.amount.toLocaleString()}원</p>
            </div>

            <div className="payment-info-card">
              <h2>문의하기</h2>
            </div>

            {next_payment.payment_overdue > 0 && (
              <div className="payment-info-card">
                <h2>미납 현황</h2>
                <p className="overdue">{next_payment.payment_overdue}회</p>
              </div>
            )}
          </div>

          {/* 문의 내역 */}
          <div className="inquiry-list">
            <h2>문의 내역</h2>
            {inquiries.map((inquiry) => (
              <div 
                key={inquiry.inquiry_id} 
                className={`inquiry-item ${inquiry.is_read ? 'read' : 'unread'}`}
              >
                <h3>{inquiry.title}</h3>
                <p>{inquiry.created_at} - {inquiry.type}</p>
              </div>
            ))}
          </div>
        </div>
  );
};

export default TenantMain;
