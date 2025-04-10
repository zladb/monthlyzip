import React, { useEffect, useState } from "react";
import styles from "./Contract.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import BackIcon from "../../../../assets/icons/arrow_back.svg";
import axios from "axios";

function Contract() {
  const navigate = useNavigate();
  const location = useLocation();
  const roomId = location.state?.roomId;
  const [contractData, setContractData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`/api/contracts?roomId=${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setContractData(response.data.result[0]); // 첫 번째 계약 정보를 사용
        }
      } catch (error) {
        setError(error.response?.data?.message || '계약 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchContractData();
    }
  }, [roomId]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!contractData) {
    return <div>계약 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <main className={styles.container}>
      <Header title="계약 정보" roomId={roomId} />
      <ContractDetails contract={contractData} />
      <ActionButtons isActiveLandlord={contractData.isActiveLandlord} />
    </main>
  );
}

function Header({ title, roomId }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/landlord/building/${roomId}`);
  };

  return (
    <header className={styles.header}>
      <button className={styles.backButton} onClick={handleBack} aria-label="Go back">
        <img src={BackIcon} alt="뒤로가기" width="28" height="28" />
      </button>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}

function ContractDetails({ contract }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
  };

  const formatAmountToKorean = (amount) => {
    if (amount >= 100000000) {
      const billion = Math.floor(amount / 100000000);
      const million = Math.floor((amount % 100000000) / 10000);
      if (million > 0) {
        return `${billion}억 ${million}만`;
      }
      return `${billion}억`;
    } else if (amount >= 10000) {
      const million = Math.floor(amount / 10000);
      return `${million}만`;
    }
    return `${amount}`;
  };

  return (
    <section className={styles.detailsContainer}>
      <section className={styles.addressSection}>
        <h2 className={styles.sectionTitle}>주소</h2>
        <p className={styles.addressMain}>{contract.buildingAddress}</p>
        <p className={styles.addressUnit}>{contract.roomDetailedAddress}</p>
      </section>

      <section className={styles.periodSection}>
        <h2 className={styles.sectionTitle}>계약 기간</h2>
        <p className={styles.periodValue}>{formatDate(contract.startDate)} ~ {formatDate(contract.endDate)}</p>
      </section>

      <div className={styles.peopleSection}>
        <div className={styles.personContainer}>
          <h2 className={styles.personLabel}>임대인</h2>
          <p className={styles.personName}>{contract.landlordName}</p>
        </div>
        <div className={styles.personContainer}>
          <h2 className={styles.personLabel}>임차인</h2>
          <p className={styles.personName}>{contract.tenantName || '-'}</p>
        </div>
      </div>

      <section className={styles.paymentSection}>
        <div className={styles.paymentRow}>
          <h2 className={styles.paymentLabel}>월세</h2>
          <div className={styles.paymentValue}>
            <span className={styles.amountValue}>{formatAmountToKorean(contract.monthlyRent)}</span>
            <span className={styles.amountUnit}>원</span>
          </div>
        </div>
        <div className={styles.paymentRow}>
          <h2 className={styles.paymentLabel}>보증금</h2>
          <div className={styles.paymentValue}>
            <span className={styles.amountValue}>{formatAmountToKorean(contract.deposit)}</span>
            <span className={styles.amountUnit}>원</span>
          </div>
        </div>
      </section>

      <section className={styles.accountSection}>
        <h2 className={styles.sectionTitle}>납부 계좌</h2>
        <p className={styles.accountNumber}>{contract.bankAccount}</p>
      </section>

      <section className={styles.dateSection}>
        <div className={styles.dateContainer}>
          <h2 className={styles.dateLabel}>월세 납부일</h2>
          <div className={styles.dateValue}>
            <span className={styles.datePrefix}>매달</span>
            <span className={styles.dateDay}>{contract.paymentDay}</span>
            <span className={styles.dateSuffix}>일</span>
          </div>
        </div>
      </section>
    </section>
  );
}

function ActionButtons({ isActiveLandlord }) {
  return (
    <div className={styles.buttonContainer}>
      <button 
        className={styles.cancelButton} 
        disabled={!isActiveLandlord}
        style={{ opacity: isActiveLandlord ? 1 : 0.5 }}
      >
        해지 요청
      </button>
      <button className={styles.codeButton}>코드 발행</button>
    </div>
  );
}

export default Contract;
