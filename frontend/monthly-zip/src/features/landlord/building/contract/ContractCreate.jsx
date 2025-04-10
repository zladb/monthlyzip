import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ContractCreate.module.css";
import BackIcon from "../../../../assets/icons/arrow_back.svg";
import axios from "axios";

// ContractHeader Component
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

// Main ContractCreate Component
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

  //유저, 건물 정보
  const [roomInfo, setRoomInfo] = useState({
    address: "",
    roomNumber: "",
    lessorName: ""
  });
  

  useEffect(() => {
    const fetchRoomAndBuildingInfo = async () => {
      try {
        const token = localStorage.getItem("accessToken");
  
        // 1. 방 정보 요청
        const roomRes = await axios.get(`/api/rooms/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        if (!roomRes.data.success) {
          console.error("방 정보 조회 실패", roomRes.data.message);
          return;
        }
  
        const room = roomRes.data.result;
        console.log("받아온 방 데이터:", room);
  
        // 2. 건물 정보 요청
        const buildingRes = await axios.get(`/api/buildings/${room.buildingId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        if (!buildingRes.data.success) {
          console.error("건물 정보 조회 실패", buildingRes.data.message);
          return;
        }
  
        const building = buildingRes.data.result;
        console.log("건물 데이터:", building);
  
        // 3. 필요한 정보 저장
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
    setFormData(prev => ({
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

  const handleNext = async () => {
    const token = localStorage.getItem("accessToken");

    const payload = {
      roomId: Number(roomId),
      startDate: `${formData.startDate}T00:00:00`,
      endDate: `${formData.endDate}T00:00:00`,
      monthlyRent: Number(formData.monthlyRent),
      deposit: Number(formData.deposit),
      paymentDay: Number(formData.paymentDay),
      bankAccount: formData.bankAccount
    };

    console.log("보내는 payload:", payload);

    try {
      const response = await axios.post(
        "/api/contracts",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      if (response.data.success) {
        console.log("계약 생성 성공:", response.data);
        navigate(`/landlord/building/${roomId}`);
      } else {
        console.error("계약 생성 실패:", response.data.message);
      }
    } catch (err) {
      console.error("API 요청 에러:", err);
      alert("계약 생성 중 오류가 발생했습니다.");
    }
  };

  if (!roomId) {
    return <div>잘못된 접근입니다.</div>;
  }

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
            />
            <span className={styles.span}>~</span>
            <input
              type="date"
              name="endDate"
              className={styles.div14}
              value={formData.endDate}
              onChange={handleChange}
              placeholder="종료일"
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
