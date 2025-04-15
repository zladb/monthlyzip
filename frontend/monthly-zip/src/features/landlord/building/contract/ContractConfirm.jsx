import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ContractConfirm.module.css";

// Divider 컴포넌트
function Divider() {
  return <hr className={styles.divider} />;
}

// 금액을 한글로 변환하는 함수
function formatAmountToKorean(amount) {
  if (!amount) return '0원';
  
  const numAmount = Number(amount);
  
  if (numAmount >= 100000000) {
    const billion = Math.floor(numAmount / 100000000);
    const million = Math.floor((numAmount % 100000000) / 10000);
    if (million > 0) {
      return `${billion}억 ${million}만원`;
    }
    return `${billion}억원`;
  } else if (numAmount >= 10000) {
    const million = Math.floor(numAmount / 10000);
    return `${million}만원`;
  }
  return `${numAmount}원`;
}

// ContractSection 컴포넌트
function ContractSection({ title, content, value, isKeyValue = false }) {
  if (isKeyValue) {
    return (
      <section className={styles.section}>
        <div className={styles.keyValueContainer}>
          <h2 className={styles.sectionTitle}>{title}</h2>
          <p className={styles.sectionValue}>{value}</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.sectionContent}>{content}</div>
    </section>
  );
}

// BottomNavigation 컴포넌트
function BottomNavigation({ cancelText, confirmText, onCancel, onConfirm }) {
  return (
    <footer className={styles.navigation}>
      <button className={styles.cancelButton} onClick={onCancel}>
        {cancelText}
      </button>
      <button className={styles.confirmButton} onClick={onConfirm}>
        {confirmText}
      </button>
    </footer>
  );
}

// Main ContractConfirmation 컴포넌트
function ContractConfirm() {
  const { state } = useLocation(); // ContractCreate에서 전달된 데이터 받기
  const navigate = useNavigate();

  const { formData, roomInfo } = state;

  const handleConfirm = async () => {
    const token = localStorage.getItem("accessToken");

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    // 날짜가 유효하지 않으면 알림을 띄우고 처리 중단
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      alert("유효한 날짜를 입력해주세요.");
      return;
    }

    const startDateISO = startDate.toISOString();
    const endDateISO = endDate.toISOString();

    // paymentDay 값이 1~31 범위 내인지 확인
    const paymentDay = formData.paymentDay >= 1 && formData.paymentDay <= 31 ? formData.paymentDay : 1;

    const payload = {
      roomId: Number(roomInfo.roomId),
      startDate: startDateISO,
      endDate: endDateISO,
      monthlyRent: Number(formData.monthlyRent),
      deposit: Number(formData.deposit),
      paymentDay,
      bankAccount: formData.bankAccount
    };
    
console.log("보내는 payload:", payload); 

    try {
      const response = await axios.post("/api/contracts", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (response.data.success) {
        console.log("계약 생성 성공:", response.data);
        // 계약 생성 성공 후, 원래 건물 페이지로 이동
        navigate(`/landlord/building/${roomInfo.roomId}`);
      } else {
        console.error("계약 생성 실패:", response.data.message);
      }
    } catch (err) {
      console.error("API 요청 에러:", err);
      alert("계약 생성 중 오류가 발생했습니다.");
    }
  };

//취소 버튼
  const handleCancel = () => {
    navigate(`/landlord/building/${roomInfo.roomId}/contract-create`);
  };

  return (
    <main className={styles.container}>
      <header>
        <h1 className={styles.title}>계약내용 확인</h1>
        <p className={styles.warning}>
          ※계약 정보는 추후 수정할 수 없습니다. 입력하신 정보가 정확한지 다시 한 번 확인해주세요.
        </p>
      </header>

      <section className={styles.contractDetails}>
        <ContractSection
          title="주소"
          content={
            <>
              <p className={styles.addressLine}>{roomInfo.address}</p>
              <p className={styles.addressLine}>
                <strong>{roomInfo.roomNumber}</strong>
              </p>
            </>
          }
        />

        <Divider />

        <ContractSection title="계약 기간" value={`${formData.startDate} ~ ${formData.endDate}`} isKeyValue={true} />
        <Divider />
        <ContractSection title="임대인" value={roomInfo.lessorName} isKeyValue={true} />
        <ContractSection title="임차인" value={formData.lesseeName} isKeyValue={true} />
        <Divider />
        <ContractSection title="월세" value={formatAmountToKorean(formData.monthlyRent)} isKeyValue={true} />
        <ContractSection title="보증금" value={formatAmountToKorean(formData.deposit)} isKeyValue={true} />
        <Divider />
        <ContractSection title="납부 계좌" content={formData.bankAccount} />
        <Divider />
        <ContractSection title="월세 납부일" value={`매달 ${formData.paymentDay}일`} isKeyValue={true} />
      </section>

      <BottomNavigation
        cancelText="취소"
        confirmText="완료"
        onCancel={handleCancel} 
        onConfirm={handleConfirm} // 계약 생성 처리
      />
    </main>
  );
}

export default ContractConfirm;
