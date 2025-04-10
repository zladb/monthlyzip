import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./BuildingCreate.module.css";
import arrowBackIcon from '../../../assets/icons/arrow_back.svg';
import searchIcon from '../../../assets/icons/search.svg';

function BuildingRegistrationHeader() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/landlord/building');
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
        <h1 className={styles.headerTitle}>건물 등록</h1>
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
        style={{ opacity: isValid ? 1 : 0.5 }}
      >
        완료
      </button>
    </div>
  );
}

function BuildingCreate() {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCancel = () => {
    navigate(-1);
  };

  const handleComplete = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem('accessToken');
      
      const requestData = {
        address: address,
        buildingName: buildingName
      };

      console.log('Request Data:', requestData);

      const response = await axios.post('/api/buildings', requestData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response.data);

      if (response.data.success) {
        navigate('/landlord/building');
      } else {
        alert('건물 등록에 실패했습니다.');
      }
    } catch (error) {
      console.error('Building registration error:', error);
      console.error('Error response:', error.response?.data);
      
      if (error.response?.status === 401) {
        alert('로그인이 필요한 서비스입니다.');
        navigate('/login');
      } else if (error.response?.status === 500) {
        alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        alert('건물 등록 중 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isValid = address && buildingName.trim().length > 0 && !isLoading;

  return (
    <main className={styles.mainContainer}>
      <div className={styles.contentWrapper}>
        <BuildingRegistrationHeader />
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

export default BuildingCreate;
