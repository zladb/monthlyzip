// ContractCreate.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ContractCreate.module.css";
import BackIcon from "../../../../assets/icons/arrow_back.svg";
import axios from "axios";

function ContractHeader({ title, onBack }) {
  return (
    <header className={styles.div3}>
      <button onClick={onBack} aria-label="Go back">
        <img src={BackIcon} alt="뒤로가기" width="28" height="28" />
      </button>
      <h1 className={styles.div4}>{title}</h1>
    </header>
  );
}

function ContractCreate() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    lesseeName: "",
    monthlyRent: "",
    deposit: "",
    bankAccount: "",
    paymentDay: ""
  });

  const [roomInfo, setRoomInfo] = useState({
    address: "",
    roomNumber: "",
    lessorName: ""
  });

  useEffect(() => {
    const fetchRoomAndBuildingInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const roomRes = await axios.get(`/api/rooms/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!roomRes.data.success) {
          console.error("방 정보 조회 실패", roomRes.data.message);
          return;
        }

        const room = roomRes.data.result;

        const buildingRes = await axios.get(`/api/buildings/${room.buildingId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!buildingRes.data.success) {
          console.error("건물 정보 조회 실패", buildingRes.data.message);
          return;
        }

        const building = buildingRes.data.result;

        setRoomInfo({
          address: building.address,
          roomNumber: room.detailAddress,
          lessorName: building.ownerName
        });
      } catch (error) {
        console.error("정보 요청 오류", error);
      }
    };

    if (roomId) {
      fetchRoomAndBuildingInfo();
    }
  }, [roomId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // 납부일은 1~31 사이의 숫자만 입력 가능
    if (name === 'paymentDay') {
      const numValue = parseInt(value);
      if (numValue < 1 || numValue > 31) {
        return; // 유효하지 않은 값은 무시
      }
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBack = () => {
    navigate(`/landlord/building/${roomId}`);
  };

  const handleCancel = () => {
    navigate(`/landlord/building/${roomId}`);
  };

  const handleNext = () => {
    // 모든 필드가 필수 입력인지 확인
    const requiredFields = ['startDate', 'endDate', 'lesseeName', 'monthlyRent', 'deposit', 'bankAccount', 'paymentDay'];
    const emptyFields = requiredFields.filter(field => !formData[field]);
    
    if (emptyFields.length > 0) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    
    // 시작 날짜가 종료 날짜보다 늦은지 확인
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    
    if (startDate > endDate) {
      alert('시작 날짜는 종료 날짜보다 늦을 수 없습니다.');
      return;
    }
    
    if (!roomId || isNaN(roomId)) {
      alert("유효한 방 ID가 아닙니다.");
      return;
    }
  
    // 데이터 전달 전에 roomId 확인
    console.log("방 ID 확인:", roomId);  // 방 ID 확인
  
    navigate(`/landlord/building/${roomId}/contract-confirm`, {
      state: {
        formData,
        roomInfo: { ...roomInfo, roomId: Number(roomId) }  
      }
    });
  };

  return (
    <main className={styles.div}>
      <section className={styles.div2}>
        <ContractHeader title="계약 발행" onBack={handleBack} />
        <section className={styles.div5}>
          <h2 className={styles.div6}>주소</h2>
          <p className={styles.div7}>{roomInfo.address}</p>
          <p className={styles.div8}>{roomInfo.roomNumber}</p>
        </section>
        <hr className={styles.div9} />
        <section className={styles.div10}>
          <h2 className={styles.div11}>계약 기간</h2>
          <div className={styles.div12}>
            <input
              type="date"
              name="startDate"
              className={styles.div13}
              value={formData.startDate}
              onChange={handleChange}
              placeholder="시작일"
              required
              max={formData.endDate || undefined}
            />
            <span className={styles.span}>~</span>
            <input
              type="date"
              name="endDate"
              className={styles.div14}
              value={formData.endDate}
              onChange={handleChange}
              placeholder="종료일"
              required
              min={formData.startDate || undefined}
            />
          </div>
        </section>
        <hr className={styles.div15} />
        <div className={styles.div16}>
          <h2 className={styles.div17}>임대인</h2>
          <p className={styles.div18}>{roomInfo.lessorName}</p>
        </div>
        <hr className={styles.div19} />
        <div className={styles.div20}>
          <h2 className={styles.div21}>임차인</h2>
          <input
            type="text"
            name="lesseeName"
            className={styles.div22}
            value={formData.lesseeName}
            onChange={handleChange}
            placeholder="이름 입력"
            required
          />
        </div>
        <hr className={styles.div23} />
        <div className={styles.div24}>
          <h2 className={styles.div25}>월세</h2>
          <input
            type="text"
            name="monthlyRent"
            className={styles.div26}
            value={formData.monthlyRent}
            onChange={handleChange}
            placeholder="금액 입력"
            required
          />
          <span className={styles.div27}>원</span>
        </div>
        <div className={styles.div28}>
          <h2 className={styles.div29}>보증금</h2>
          <input
            type="text"
            name="deposit"
            className={styles.div30}
            value={formData.deposit}
            onChange={handleChange}
            placeholder="금액 입력"
            required
          />
          <span className={styles.div31}>원</span>
        </div>
        <hr className={styles.div32} />
        <section className={styles.div33}>
          <h2 className={styles.div34}>납부 계좌</h2>
          <input
            type="text"
            name="bankAccount"
            className={styles.div35}
            value={formData.bankAccount}
            onChange={handleChange}
            placeholder="계좌번호 입력"
            required
          />
        </section>
        <hr className={styles.div36} />
        <div className={styles.div37}>
          <h2 className={styles.div38}>월세 납부일</h2>
          <span className={styles.div39}>매달</span>
          <input
            type="number"
            name="paymentDay"
            className={styles.div40}
            value={formData.paymentDay}
            onChange={handleChange}
            min="1"
            max="31"
            placeholder="일"
            required
          />
          <span className={styles.div41}>일</span>
        </div>
      </section>

      <footer className={styles.div42}>
        <button className={styles.div43} onClick={handleCancel}>취소</button>
        <button className={styles.div44} onClick={handleNext}>다음</button>
      </footer>
    </main>
  );
}

export default ContractCreate;
