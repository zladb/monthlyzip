import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./RoomUpdate.module.css";
import arrow_back from "../../../../assets/icons/arrow_back.svg";

// Back button component
const BackButton = ({ onClick }) => (
  <div onClick={onClick} style={{ cursor: 'pointer' }}>
    <img src={arrow_back} alt="back" />
  </div>
);

// KakaoMap component
const KakaoMap = ({ address }) => {
  useEffect(() => {
    if (!address) return;

    const loadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 3,
        };
        const map = new window.kakao.maps.Map(container, options);

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.addressSearch(address, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
            const marker = new window.kakao.maps.Marker({
              map: map,
              position: coords,
            });

            map.setCenter(coords);
          }
        });
      });
    };

    if (window.kakao && window.kakao.maps) {
      loadKakaoMap();
    } else {
      const script = document.createElement("script");
      script.async = true;
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
      script.onload = () => loadKakaoMap();
      document.head.appendChild(script);
    }
  }, [address]);

  return <div id="map" className={styles.map}></div>;
};

function RoomUpdate() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [buildingData, setBuildingData] = useState(null);
  const [roomData, setRoomData] = useState({
    detailAddress: "",
    area: 0,
    isOccupied: false
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const headers = {
          Authorization: `Bearer ${token}`
        };

        // 방 정보 조회
        const roomResponse = await axios.get(`/api/rooms/${roomId}`, { headers });
        
        if (roomResponse.data.success) {
          const { detailAddress, area, isOccupied, buildingId } = roomResponse.data.result;
          setRoomData({ detailAddress, area, isOccupied });
          
          // 건물 정보 조회
          const buildingResponse = await axios.get(
            `/api/buildings/${buildingId}`,
            { headers }
          );
          
          if (buildingResponse.data.success) {
            setBuildingData(buildingResponse.data.result);
          }
        }
      } catch (error) {
        setError(error.response?.data?.message || '정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roomId]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.patch(
        `/api/rooms/${roomId}`,
        roomData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        navigate(-1);
      }
    } catch (error) {
      setError(error.response?.data?.message || '수정에 실패했습니다.');
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <BackButton onClick={() => navigate(-1)} />
        <h1 className={styles.title}>세대 수정</h1>
      </header>

      <section className={styles.content}>
        <article className={styles.propertyCard}>
          <KakaoMap address={buildingData?.address} />
          <div className={styles.propertyDetails}>
            <address className={styles.propertyAddress}>
              {buildingData?.address}
            </address>
            <h2 className={styles.propertyName}>{buildingData?.buildingName}</h2>
          </div>
        </article>

        <div className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <h3 className={styles.inputLabel}>상세 주소</h3>
            <input
              type="text"
              className={styles.input}
              placeholder="ex. 101동 101호"
              value={roomData.detailAddress}
              onChange={(e) => setRoomData({ ...roomData, detailAddress: e.target.value })}
            />
          </div>
          <div className={styles.inputGroup}>
            <h3 className={styles.inputLabel}>평수</h3>
            <div className={styles.areaInputWrapper}>
              <input
                type="number"
                className={styles.areaInput}
                value={roomData.area}
                onChange={(e) => setRoomData({ ...roomData, area: Number(e.target.value) })}
              />
              <span className={styles.unit}>m²</span>
            </div>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <button onClick={handleCancel} className={styles.cancelButton}>
          취소
        </button>
        <button onClick={handleSubmit} className={styles.completeButton}>
          완료
        </button>
      </footer>
    </main>
  );
}

export default RoomUpdate;
