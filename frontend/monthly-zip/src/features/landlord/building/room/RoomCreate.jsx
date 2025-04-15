import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./RoomCreate.module.css";
import arrowBackIcon from '../../../../assets/icons/arrow_back.svg';

function RoomCreate() {
  const navigate = useNavigate();
  const location = useLocation();
  const propertyId = location.state?.propertyId;
  const [rooms, setRooms] = useState([{ detailAddress: "", area: 30 }]);
  const [buildingName, setBuildingName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBuildingInfo();
  }, []);

  const fetchBuildingInfo = async () => {
    try {
      if (!propertyId) {
        navigate(-1);
        return;
      }

      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`/api/buildings/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setBuildingName(response.data.result.buildingName);
      }
      setIsLoading(false);
    } catch (error) {
      setError('건물 정보를 불러오는데 실패했습니다.');
      setIsLoading(false);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAreaChange = (index, newArea) => {
    const updatedRooms = [...rooms];
    const area = Math.max(1, Math.floor(Number(newArea)));
    updatedRooms[index] = { ...updatedRooms[index], area };
    setRooms(updatedRooms);
  };

  const handleAddressChange = (index, detailAddress) => {
    const updatedRooms = [...rooms];
    updatedRooms[index] = { ...updatedRooms[index], detailAddress };
    setRooms(updatedRooms);
  };

  const addRoom = () => {
    setRooms([...rooms, { detailAddress: "", area: 30 }]);
  };

  const deleteRoom = (index) => {
    if (rooms.length > 1) {
      const updatedRooms = rooms.filter((_, i) => i !== index);
      setRooms(updatedRooms);
    }
  };

  const handleComplete = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const requestData = {
        propertyId: propertyId,
        rooms: rooms.map(room => ({
          detailAddress: room.detailAddress,
          area: room.area
        }))
      };

      const response = await axios.post('/api/rooms', requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.data.success) {
        navigate(-1);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
      } else if (error.response?.status === 409) {
        alert(error.response.data.message);
      } else {
        alert('세대 등록에 실패했습니다.');
      }
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <main className={styles.div}>
      <div className={styles.div2}>
        <header className={styles.div3}>
          <img 
            src={arrowBackIcon} 
            alt="뒤로 가기" 
            className={styles.img} 
            onClick={handleBackClick}
          />
          <h1 className={styles.div4}>세대 등록</h1>
        </header>

        <div className={styles.div5}>
          <div className={styles.buildingInfo}>
            <label className={styles.div6}>건물</label>
            <div className={styles.buildingName}>{buildingName}</div>
          </div>

          {rooms.map((room, index) => (
            <section key={index} className={styles.div8}>
              <div>
                <div className={styles.addressHeader}>
                  <label className={styles.div9}>상세 주소</label>
                  {rooms.length > 1 && (
                    <button
                      className={styles.deleteButton}
                      onClick={() => deleteRoom(index)}
                      aria-label="세대 정보 삭제"
                    />
                  )}
                </div>
                <input
                  type="text"
                  placeholder="ex. 101동 101호"
                  className={styles.ex101101}
                  value={room.detailAddress}
                  onChange={(e) => handleAddressChange(index, e.target.value)}
                />
              </div>
              <div className={styles.div10}>
                <label className={styles.div11}>평수</label>
                <div className={styles.div12}>
                  <div className={styles.div13}>
                    <input
                      type="number"
                      min="1"
                      value={room.area}
                      onChange={(e) => handleAreaChange(index, e.target.value)}
                      className={styles.div14}
                    />
                  </div>
                  <span className={styles.div15}>㎡</span>
                </div>
              </div>
            </section>
          ))}

          <button className={styles.div16} onClick={addRoom}>
            <span className={styles.div17}>세대 추가 입력</span>
          </button>
        </div>
      </div>

      <section className={styles.button2}>
        <button className={styles.div18} onClick={handleBackClick}>
          취소
        </button>
        <button 
          className={styles.div19} 
          onClick={handleComplete}
          disabled={rooms.some(room => !room.detailAddress)}
        >
          완료
        </button>
      </section>
    </main>
  );
}

export default RoomCreate;
