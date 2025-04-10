import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./Room.module.css";
import arrow_back from "../../../../assets/icons/arrow_back.svg";
import Loader from "../../../../loader/Loader";

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
          } else {
            console.log('Geocoding failed:', status); // 주소 검색 실패 시 상태 확인
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

  return (
    <div id="map" className={styles.map} style={{ width: '100%', height: '248px' }}></div>
  );
};

// Property card component
const PropertyCard = ({ roomData, buildingData }) => {
  console.log('Building Address:', buildingData?.address); // 주소 확인용 로그

  return (
    <article className={styles.propertyCard}>
      <KakaoMap address={buildingData?.address} />
      <div className={styles.propertyDetails}>
        <address className={styles.propertyAddress}>
          {buildingData?.address}
        </address>
        <h2 className={styles.propertyName}>{buildingData?.buildingName}</h2>
        <h3 className={styles.propertyUnit}>{roomData.detailAddress}</h3>
        <div className={styles.sizeAndButton}>
          <p className={styles.propertySize}>{roomData.area}㎡</p>
          <div className={styles.buttonContainer}>
            <ActionButton isOccupied={roomData.isOccupied}>
              {roomData.isOccupied ? '입주' : '공실'}
            </ActionButton>
          </div>
        </div>
      </div>
    </article>
  );
};

// Action button component
const ActionButton = ({ isOccupied, children }) => (
  <button 
    className={`${styles.actionButton} ${isOccupied ? styles.occupied : ''}`}
  >
    {children}
  </button>
);

// Management buttons component
const ManagementButtons = ({ onEdit, onDelete }) => (
  <div className={styles.managementButtons}>
    <button onClick={onEdit} className={styles.editButton}>수정</button>
    <button onClick={onDelete} className={styles.deleteButton}>삭제</button>
  </div>
);

// Notice message component
const NoticeMessage = () => (
  <p className={styles.noticeMessage}>
    ※ 입주중인 세대는 수정/삭제가 불가능합니다.
  </p>
);

// Contract button component
const ContractButton = ({ isActiveLandlord, onClick }) => (
  <button className={styles.contractButton} onClick={onClick}>
    {isActiveLandlord ? '계약 조회' : '계약 등록'}
  </button>
);

function Room() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const [roomData, setRoomData] = useState(null);
  const [buildingData, setBuildingData] = useState(null);
  const [contractData, setContractData] = useState(null);
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
          setRoomData(roomResponse.data.result);
          
          // 건물 정보 조회
          const buildingResponse = await axios.get(
            `/api/buildings/${roomResponse.data.result.buildingId}`,
            { headers }
          );
          
          if (buildingResponse.data.success) {
            setBuildingData(buildingResponse.data.result);
          }

          // 계약 정보 조회
          const contractResponse = await axios.get(`/api/contracts?roomId=${roomId}`, { headers });
          
          if (contractResponse.data.success && contractResponse.data.result.length > 0) {
            setContractData(contractResponse.data.result[0]); // 가장 최근 계약 정보 사용
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

  const handleEdit = () => {
    navigate(`/landlord/building/room-update/${roomId}`);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm('정말로 이 세대를 삭제하시겠습니까?');
    
    if (isConfirmed) {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.delete(`/api/rooms/${roomId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          alert('세대가 성공적으로 삭제되었습니다.');
          navigate(-1);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          alert('해당 세대를 찾을 수 없습니다.');
        } else {
          alert('세대 삭제에 실패했습니다.');
        }
      }
    }
  };

  const handleContractClick = () => {
    if (contractData?.isActiveLandlord) {
      navigate(`/landlord/building/${roomId}/contract`, { state: { roomId } });
    } else {
      navigate(`/landlord/building/${roomId}/contract-create`, { state: { roomId } });
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!roomData || !buildingData) {
    return <div className={styles.error}>정보를 찾을 수 없습니다.</div>;
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <BackButton onClick={() => navigate("/landlord/building")} />
        <h1 className={styles.title}>세대 정보</h1>
      </header>

      <section className={styles.content}>
        <PropertyCard roomData={roomData} buildingData={buildingData} />
        {!roomData.isOccupied && (
          <ManagementButtons 
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        {roomData.isOccupied && <NoticeMessage />}
      </section>

      <footer className={styles.footer}>
        <ContractButton 
          isActiveLandlord={contractData?.isActiveLandlord || false}
          onClick={handleContractClick}
        />
      </footer>
    </main>
  );
}

export default Room;
