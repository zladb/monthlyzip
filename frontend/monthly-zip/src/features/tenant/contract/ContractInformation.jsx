import React, { useState } from "react";
import styles from "./ContractInformation.module.css";


const AddressCard = () => {
  return (
    <section className={styles.addressCard}>
      <h2 className={styles.addressLabel}>주소</h2>
      <div className={styles.addressDetails}>
        <p className={styles.buildingName}>(반포동, 반포자이아파트)</p>
        <p className={styles.streetAddress}>서울특별시 서초구 신반포로 270</p>
        <p className={styles.unitNumber}>122호 1801호</p>
      </div>
    </section>
  );
};

const ContractParties = () => {
  return (
    <section className={styles.partiesCard}>
      <div className={styles.partyRow}>
        <h3 className={styles.partyLabel}>임대인</h3>
        <p className={styles.partyName}>김민주</p>
      </div>
      <div className={styles.tenantRow}>
        <h3 className={styles.partyLabel}>임차인</h3>
        <p className={styles.partyName}>이지현</p>
      </div>
    </section>
  );
};

const ContractPeriod = () => {
  return (
    <section className={styles.infoCard}>
      <h3 className={styles.infoLabel}>계약 기간</h3>
      <p className={styles.periodInfo}>2024.01.01 ~ 2026.01.01</p>
    </section>
  );
};

const PaymentAccount = () => {
  return (
    <section className={styles.accountCard}>
      <h3 className={styles.infoLabel}>납부 계좌</h3>
      <p className={styles.accountInfo}>토스뱅크 1002-123-456789</p>
    </section>
  );
};

const PaymentDetails = () => {
  return (
    <section className={styles.paymentCard}>
      <h3 className={styles.depositLabel}>보증금</h3>
      <p className={styles.depositAmount}>1,000,000,000</p>
      <h3 className={styles.rentLabel}>월세</h3>
      <p className={styles.rentAmount}>10,000,000</p>
    </section>
  );
};

const PaymentDate = () => {
  return (
    <section className={styles.dateCard}>
      <h3 className={styles.infoLabel}>월세 납부 일</h3>
      <p className={styles.dateInfo}>매달 10 일</p>
    </section>
  );
};

const TerminationButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);  // 계약 해지 모달 열기
  const [isTerminated, setIsTerminated] = useState(false);  // 계약 해지 상태
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false); // 계약 해지 취소 모달 열기

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);   

  const openCancelModal = () => setIsCancelModalOpen(true); 
  const closeCancelModal = () => setIsCancelModalOpen(false);

  const handleTerminate = () => {
    setIsTerminated(true);
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
  return (
    <main className={styles.container}>
      <div className={styles.contentWrapper}>
        <header>
          <h1 className={styles.contractTitle}>계약 정보</h1>
        </header>

        <AddressCard />
        <ContractParties />
        <ContractPeriod />
        <PaymentAccount />
        <PaymentDetails />
        <PaymentDate />
        <TerminationButton />
      </div>

      {/* <NavigationBar /> */}
    </main>
  );
}

export default ContractInformation;
