import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./InquiryDetail.module.css";
import arrowBack from "../../../assets/icons/arrow_back.svg";
import InquiryStatus from "../../../components/InquiryStatus/InquiryStatus";
import InquiryButton from "../../../components/InquiryButton/InquiryButton";
import defaultProfile from "../../../assets/images/default_profile.png";


// Status indicator dots component
const StatusIndicator = ({ currentIndex, totalImages }) => {
  return (
    <div className={styles.statusIndicator}>
      {Array.from({ length: totalImages }).map((_, index) => (
        <div
          key={index}
          className={index === currentIndex ? styles.activeDot : styles.inactiveDot}
        />
      ))}
    </div>
  );
};

// Header component with image and back button
const Header = ({ images }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleBackClick = () => {
    navigate("/landlord/inquiry");
  };

  const handleImageClick = () => {
    if (images?.length > 1) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <header className={images?.length > 0 ? styles.header : styles.headerNoImage}>
      <div className={styles.backButtonContainer}>
        <img 
          src={arrowBack} 
          alt="뒤로 가기" 
          onClick={handleBackClick}
          style={{ cursor: 'pointer' }}
        />
      </div>
      {images?.length > 0 ? (
        <>
          <div className={styles.imageContainer}>
            <img 
              src={images[currentImageIndex]} 
              alt={`문의 이미지 ${currentImageIndex + 1}`} 
              className={styles.inquiryImage}
              onClick={handleImageClick}
              style={{ cursor: images?.length > 1 ? 'pointer' : 'default' }}
            />
          </div>
          <StatusIndicator 
            currentIndex={currentImageIndex} 
            totalImages={images.length} 
          />
        </>
      ) : null}
    </header>
  );
};

// User info component with avatar and name
const UserInfo = ({ tenantName, buildingName, roomNumber, tenantProfileUrl }) => {
  return (
    <section className={styles.userInfoSection}>
      <img 
        src={tenantProfileUrl || defaultProfile} 
        alt="사용자 프로필" 
        className={styles.userAvatar} 
      />
      <div className={styles.userDetails}>
        <h2 className={styles.userName}>{tenantName}</h2>
        <p className={styles.userLocation}>{`${buildingName} ${roomNumber}`}</p>
      </div>
    </section>
  );
};

// Request details component
const RequestDetails = ({ title, inquiryType, content, status }) => {
  return (
    <article className={styles.requestDetails}>
      <h1 className={styles.requestTitle}>{title}</h1>
      <p className={styles.requestType}>{inquiryType}</p>
      <hr className={styles.divider} />
      <p className={styles.requestDescription}>{content}</p>
      <hr className={styles.divider} />
      <div className={styles.progressTrackerContainer}>
        <InquiryStatus status={status} />
      </div>
    </article>
  );
};

// Main component that combines all the parts
function InquiryDetail() {
  const { inquiryId } = useParams();
  const [inquiryData, setInquiryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleInquiryAction = async () => {
    try {
      if (inquiryData.status !== "접수대기") return;
  
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('인증 토큰이 없습니다.');

  
      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify({ status: "처리중" })], {
          type: "application/json", // 👈 이게 핵심!
        })
      );
  
      console.log("보내는 데이터:", formData.get("data"));
  
      const response = await axios({
        method: 'patch',
        url: `/api/inquiries/${inquiryId}`,
        data: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        
        }
      });
  
      if (response.data.success) {
        await fetchInquiryData();
      }
    } catch (err) {
      console.error('API 요청 에러:', err);
      setError('문의 상태 변경 중 오류가 발생했습니다.');
    }
  };


  const fetchInquiryData = useCallback(async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('인증 토큰이 없습니다.');
      }

      const response = await axios.get(`/api/inquiries/${inquiryId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        }
      });
      
      if (response.data.success) {
        const imageUrls = response.data.result.imageUrl 
          ? Array.isArray(response.data.result.imageUrl) 
            ? response.data.result.imageUrl.map(url => `https://j12d109.p.ssafy.io${url}`)
            : [`https://j12d109.p.ssafy.io${response.data.result.imageUrl}`]
          : [];
        
        setInquiryData({
          ...response.data.result,
          imageUrl: imageUrls,
          status: response.data.result.status
        });
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      console.error('API 요청 에러:', err);
      if (err.response?.status === 404) {
        setError('문의 내역을 찾을 수 없습니다.');
      } else {
        setError(err.response?.data?.message || '데이터를 불러오는 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  }, [inquiryId]);

  useEffect(() => {
    fetchInquiryData();
  }, [fetchInquiryData]);

  if (error) return <div>에러가 발생했습니다: {error}</div>;
  if (!inquiryData) return <div>데이터를 찾을 수 없습니다.</div>;

  return (
    <main className={styles.container}>
      <Header images={inquiryData.imageUrl} />
      <div className={styles.contentContainer}>
        <UserInfo 
          tenantName={inquiryData.tenantName}
          buildingName={inquiryData.buildingName}
          roomNumber={inquiryData.roomNumber}
          tenantProfileUrl={inquiryData.tenantProfileUrl}
        />
        <hr className={styles.divider} />
        <RequestDetails 
          title={inquiryData.title}
          inquiryType={inquiryData.inquiryType}
          content={inquiryData.content}
          status={inquiryData.status}
        />
      </div>
      <div className={styles.buttonContainer}>
        <InquiryButton 
          status={inquiryData.status}
          onClick={handleInquiryAction}
        />
      </div>
    </main>
  );
}

export default InquiryDetail;