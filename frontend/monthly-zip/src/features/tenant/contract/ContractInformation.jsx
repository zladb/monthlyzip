import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./ContractInformation.module.css";
import Navbar from "../navbar/Navbar"


const AddressCard = ({ contract }) => {
  return (
    <section className={styles.addressCard}>
      <h2 className={styles.addressLabel}>주소</h2>
      <div className={styles.addressDetails}>
        <p className={styles.buildingName}>{contract.buildingAddress}</p>
        <p className={styles.streetAddress}>{contract.buildingName}</p>
        <p className={styles.unitNumber}>{contract.roomDetailedAddress}</p>
      </div>
    </section>
  );
};

const ContractParties = ({ contract }) => {
  return (
    <section className={styles.partiesCard}>
      <div className={styles.partyRow}>
        <h3 className={styles.partyLabel}>임대인</h3>
        <p className={styles.partyName}>{contract.landlordName}</p>
      </div>
      <div className={styles.tenantRow}>
        <h3 className={styles.partyLabel}>임차인</h3>
        <p className={styles.partyName}>{contract.tenantName}</p>
      </div>
    </section>
  );
};

const ContractPeriod = ({ contract }) => {
  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("ko-KR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <section className={styles.infoCard}>
      <h3 className={styles.infoLabel}>계약 기간</h3>
      <p className={styles.periodInfo}>
        {formatDate(contract.startDate)}
        <br />~ {formatDate(contract.endDate)}
      </p>
    </section>
  );
};


const PaymentAccount = ({ contract }) => {
  return (
    <section className={styles.accountCard}>
      <h3 className={styles.infoLabel}>납부 계좌</h3>
      <p className={styles.accountInfo}>{contract.bankAccount}</p>
    </section>
  );
};

const PaymentDetails = ({ contract }) => {
  return (
    <section className={styles.paymentCard}>
      <h3 className={styles.depositLabel}>보증금</h3>
      <p className={styles.depositAmount}>
        {(contract?.deposit ?? 0).toLocaleString()} 원
      </p>
      <h3 className={styles.rentLabel}>월세</h3>
      <p className={styles.rentAmount}>
        {(contract?.monthlyRent ?? 0).toLocaleString()} 원
      </p>
    </section>
  );
};

const PaymentDate = ({ contract }) => {
  return (
    <section className={styles.dateCard}>
      <h3 className={styles.infoLabel}>월세 납부 일</h3>
      <p className={styles.dateInfo}>매달 {contract.paymentDay} 일</p>
    </section>
  );
};

const TerminationButton = ({ contract }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);  // 계약 해지 모달 열기
  const [isTerminated, setIsTerminated] = useState(false);  // 계약 해지 상태
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // 계약 해지 취소 모달 열기

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);   

  const openCancelModal = () => setIsCancelModalOpen(true); 
  const closeCancelModal = () => setIsCancelModalOpen(false);

  const handleTerminate = async () => {
    setIsTerminated(true);

    if (!contract?.contractId) {
      console.log("계약 ID가 없습니다.");
      return;
    }
  
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.log("인증 정보가 없습니다. 다시 로그인해주세요.");
        return;
      }
  
      const response = await axios.delete(`/api/contracts/${contract.contractId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.data.isSuccess) {
        console.log("임대 계약이 해지되었습니다.");
        setIsTerminated(true);
      } else {
        console.log("해지 실패:", response.data.message);
      }
    } catch (error) {
      console.error("계약 해지 요청 실패:", error);
    }
  
    closeModal();
  };

  const handleCancelTermination = () => {
    setIsTerminated(false); // 해지 취소
    closeCancelModal(); // 해지 취소 모달 닫기
  };

  return (
    <>
      <button 
        className={isTerminated ? `${styles.terminationButton} ${styles.terminatedButton}` : styles.terminationButton} 
        onClick={isTerminated ? openCancelModal : openModal} // 해지 상태에 따라 모달 열기
        >
        {isTerminated ? "해지 취소" : "계약 해지 요청"}
      </button>

      {/* 계약 해지 요청 모달 */}
      {isModalOpen && (
        <div className={styles.modalBackdrop} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>계약 해지 요청 하시겠습니까?</h2>
            <p>계약 해지는 임대인과 임차인 모두 요청해야 완료됩니다.</p>
            <div className={styles.modalButtonContainer}>
              <button className={styles.modalCancelButton} onClick={closeModal}>취소</button>
              <button className={styles.modalTerminateButton} onClick={handleTerminate}> 해지하기</button>
            </div>
          </div>
        </div>
      )}

        {/* 해지 취소 모달 */}
        {isCancelModalOpen && (
        <div className={styles.modalBackdrop} onClick={closeCancelModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>계약 해지 취소 하시겠습니까?</h2>
            <p>계약 해지 요청을 취소하고, 이전 상태로 복구하시겠습니까?</p>
            <div className={styles.modalButtonContainer}>
              <button className={styles.modalCancelButton} onClick={closeCancelModal}>취소</button>
              <button className={styles.modalTerminateButton} onClick={handleCancelTermination}>확인</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

function ContractInformation() {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const fetchContract = async () => {
      const token = localStorage.getItem("accessToken");
  
      if (!token) {
        console.log("인증 정보가 없습니다. 다시 로그인해주세요.");
        return;
      }

      try {
        const response = await axios.get("/api/contracts", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("계약 정보 조회 성공:", response.data);
        setContract(response.data.result[0]);
      } catch (error) {
        console.log("계약 정보를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchContract();
  }, []);



  if (!contract) return;


  return (
    <main className={styles.container}>
      <div className={styles.contentWrapper}>
        <header>
          <h1 className={styles.contractTitle}>계약 정보</h1>
        </header>

        <AddressCard contract={contract} />
        <ContractParties contract={contract} />
        <ContractPeriod contract={contract} />
        <PaymentAccount contract={contract} />
        <PaymentDetails contract={contract} />
        <PaymentDate contract={contract} />
        <TerminationButton contract={contract} />
      </div>
      <Navbar />
    </main>
  );
}

export default ContractInformation;
