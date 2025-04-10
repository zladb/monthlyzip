import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./BuildingUpdate.module.css";
import arrowBackIcon from '../../../assets/icons/arrow_back.svg';
import searchIcon from '../../../assets/icons/search.svg';

function BuildingUpdateHeader() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header className={styles.headerContainer}>
      <div className={styles.titleWrapper}>
        <img 
          src={arrowBackIcon} 
          alt="뒤로 가기" 
          className={styles.headerIcon} 
          onClick={handleBackClick}
          style={{ cursor: 'pointer' }}
        />
        <h1 className={styles.headerTitle}>건물 수정</h1>
      </div>
    </header>
  );
}

function AddressInput({ address, onAddressChange }) {
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function(data) {
        onAddressChange(data.address);
      }
    }).open();
  };

  return (
    <div className={styles.addressInputContainer} onClick={handleAddressSearch}>
      <p className={styles.addressPlaceholder}>
        {address || "도로명 주소를 입력해주세요."}
      </p>
      <img src={searchIcon} alt="검색" className={styles.searchIcon} />
    </div>
  );
}

function BuildingNameInput({ value, onChange }) {
  return (
    <>
      <label htmlFor="buildingName" className={styles.buildingNameLabel}>
        건물 이름
      </label>
      <input
        id="buildingName"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="최대 10자 이내"
        maxLength={10}
        className={styles.buildingNameInput}
      />
    </>
  );
}

function KakaoMap({ address }) {
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const loadMap = async () => {
      try {
        if (!window.kakao || !window.kakao.maps) {
          const script = document.createElement("script");
          script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=4943e15a49deadc2845be981678e69da&libraries=services&autoload=false`;
          script.async = true;
          
          const onScriptLoad = () => {
            window.kakao.maps.load(() => {
              initializeMap();
            });
          };
          
          script.addEventListener('load', onScriptLoad);
          document.head.appendChild(script);
          
          return () => {
            script.removeEventListener('load', onScriptLoad);
            if (document.head.contains(script)) {
              document.head.removeChild(script);
            }
          };
        } else {
          initializeMap();
        }
      } catch (error) {
        console.error('Map setup error:', error);
        setMapError(true);
      }
    };

    const initializeMap = () => {
      try {
        const container = document.getElementById("map");
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 3
        };
        const map = new window.kakao.maps.Map(container, options);

        if (address) {
          const geocoder = new window.kakao.maps.services.Geocoder();
          geocoder.addressSearch(address, function(result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
              
              new window.kakao.maps.Marker({
                map: map,
                position: coords
              });

              map.setCenter(coords);
            }
          });
        }
      } catch (error) {
        console.error('Map initialization error:', error);
        setMapError(true);
      }
    };

    loadMap();
  }, [address]);

  if (mapError) {
    return (
      <div className={styles.buildingImage} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f5f5' }}>
        <p style={{ color: '#666' }}>지도를 불러올 수 없습니다</p>
      </div>
    );
  }

  return <div id="map" className={styles.buildingImage} />;
}

function ActionButtons({ onCancel, onComplete, isValid }) {
  return (
    <div className={styles.actionButtonsContainer}>
      <button className={styles.cancelButton} onClick={onCancel}>
        취소
      </button>
      <button 
        className={styles.completeButton} 
        onClick={onComplete}
        disabled={!isValid}
      >
        완료
      </button>
    </div>
  );
}

function BuildingUpdate() {
  const navigate = useNavigate();
  const { buildingId } = useParams();
  const [address, setAddress] = useState("");
  const [buildingName, setBuildingName] = useState("");

  useEffect(() => {
    // TODO: API 호출하여 기존 건물 정보 가져오기
    // 예시 데이터
    setAddress("서울특별시 강남구 테헤란로 123");
    setBuildingName("월세집 빌딩");
  }, [buildingId]);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleComplete = () => {
    // TODO: API 호출 구현
    console.log('Building update:', { buildingId, address, buildingName });
    navigate(-1);
  };

  const isValid = address && buildingName.trim().length > 0;

  return (
    <main className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        <BuildingUpdateHeader />
        <section className={styles.addressCard}>
          <KakaoMap address={address} />
          <div className={styles.formContainer}>
            <AddressInput 
              address={address} 
              onAddressChange={setAddress} 
            />
            <BuildingNameInput 
              value={buildingName}
              onChange={setBuildingName}
            />
          </div>
        </section>
      </div>
      <ActionButtons 
        onCancel={handleCancel}
        onComplete={handleComplete}
        isValid={isValid}
      />
    </main>
  );
}

export default BuildingUpdate;
