import React, { useEffect, useState } from "react";
import styles from "./Contract.module.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import BackIcon from "../../../../assets/icons/arrow_back.svg";
import axios from "axios";
import CodeModal from "./CodeModal/CodeModal";
import Loader from "../../../../loader/Loader";

function Contract() {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams();
  const [contractData, setContractData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`/api/contracts?roomId=${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success && response.data.result.length > 0) {
          // roomId에 해당하는 계약만 필터링
          const contractForRoom = response.data.result.find(contract => contract.roomId === parseInt(roomId));
          console.log('조회된 계약 정보:', {
            roomId: contractForRoom?.roomId,
            roomDetailedAddress: contractForRoom?.roomDetailedAddress,
            buildingName: contractForRoom?.buildingName,
            isActiveLandlord: contractForRoom?.isActiveLandlord,
            isActiveTenant: contractForRoom?.isActiveTenant
          });
          
          if (contractForRoom) {
            setContractData(contractForRoom);
          } else {
            setError('해당 방의 계약 정보가 없습니다.');
          }
        } else {
          setError('해당 방의 계약 정보가 없습니다.');
        }
      } catch (error) {
        console.error('계약 정보 조회 에러:', error.response || error);
        setError(error.response?.data?.message || '계약 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      fetchContractData();
    } else {
      setError('방 정보가 없습니다.');
      setLoading(false);
    }
  }, [roomId]);

  const handleCodeButtonClick = async () => {
    try {
      console.log('계약 ID:', contractData.contractId);
      
      const response = await axios.post(`/api/contracts/${contractData.contractId}/invite`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        // API 응답에서 코드를 가져옵니다
        const inviteCode = response.data.result.code;
        
        // 만료 시간을 10분으로 설정
        const expireTime = new Date();
        expireTime.setMinutes(expireTime.getMinutes() + 10);
        
        setModalData({
          code: inviteCode,
          expireTime: expireTime.toISOString()
        });
        setShowCodeModal(true);
      }
    } catch (error) {
      console.error('초대 코드 발행 오류:', error);
      
      if (error.response) {
        const { status, data } = error.response;
        console.error('서버 응답:', data);
        
        if (status === 404) {
          alert('해당 임대차 계약이 존재하지 않습니다.');
        } else if (status === 400) {
          alert('올바르지 않은 요청입니다.');
        } else if (status === 500) {
          alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
        } else {
          alert(`초대 코드 발행에 실패했습니다. (${status})`);
        }
      } else if (error.request) {
        console.error('요청 오류:', error.request);
        alert('서버와의 통신에 실패했습니다. 네트워크 연결을 확인해주세요.');
      } else {
        console.error('오류 메시지:', error.message);
        alert(`오류가 발생했습니다: ${error.message}`);
      }
    }
  };

  const handleCloseModal = () => {
    setShowCodeModal(false);
    setModalData(null);
  };

  if (loading) {
    return <Loader />;
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
      <ActionButtons 
        isActiveLandlord={contractData.isActiveLandlord}
        isActiveTenant={contractData.isActiveTenant}
        onCodeButtonClick={handleCodeButtonClick}
      />
      {showCodeModal && modalData && (
        <CodeModal 
          contractCode={modalData.code}
          expireTime={modalData.expireTime}
          onClose={handleCloseModal}
        />
      )}
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

function ActionButtons({ isActiveLandlord, isActiveTenant, onCodeButtonClick }) {
  console.log('ActionButtons props:', { isActiveLandlord, isActiveTenant, type: typeof isActiveTenant });
  
  // isActiveTenant 값이 문자열 '0'인 경우도 처리
  const isTenantActive = isActiveTenant !== 0 && isActiveTenant !== '0' && isActiveTenant !== null && isActiveTenant !== undefined;
  
  return (
    <div className={styles.buttonContainer}>
      <button 
        className={styles.cancelButton} 
        disabled={!isActiveLandlord || !isTenantActive}
        style={{ 
          opacity: (isActiveLandlord && isTenantActive) ? 1 : 0.5,
          cursor: (isActiveLandlord && isTenantActive) ? 'pointer' : 'not-allowed'
        }}
      >
        해지 요청
      </button>
      <button 
        className={styles.codeButton}
        disabled={isActiveTenant}
        onClick={onCodeButtonClick}
        style={{ 
          opacity: !isActiveTenant ? 1 : 0.5,
          cursor: !isActiveTenant ? 'pointer' : 'not-allowed'
        }}
      >
        코드 발행
      </button>
    </div>
  );
}

export default Contract;
