import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./InquiryDetail.module.css";
import inquiryUpdate from "../../../assets/icons/inquiryUpdate.png"; 
import inquiryDelete from "../../../assets/icons/inquiryDelete.png";

import imageTest from "../../../assets/icons/imagetest.png";

function Header() {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate('/tenant/inquiry-list');
    };
    return (
      <header className={styles.header}>
        <button className={styles.backButton} aria-label="Go back">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/25d70d2ae1d505a00de79131420e62c022c3e093?placeholderIfAbsent=true"
            className={styles.backButtonIcon}
            alt="Back"
            onClick={handleClick}
          />
        </button>
      </header>
    );
  }
  
  function ImageSection({ imageUrl }) {
    if (!imageUrl) return null; // imageUrl이 없으면 컴포넌트 자체를 렌더링하지 않음

    return (
      <section className={styles.imageSection}>
        {/* <img src={imageTest} className={styles.imageSection} alt="InquiryTest" /> */}
         <img src={imageUrl} className={styles.imageSection} alt="Inquiry" />
    </section>
    );
  }

  function InquiryContent({ inquiry }) {
    const navigate = useNavigate();
  
    if (!inquiry) return null; // 데이터가 없을 경우 렌더링하지 않음

    const handleUpdateClick = (inquiryId) => {
      navigate(`/tenant/inquiry-update/${inquiryId}`, {
        state: { inquiry }, // inquiry 객체 전체 전달
      });
    };

    const handleDeleteClick = async (inquiryId) => {
      if (inquiry.status === "처리중") {
        alert("처리중인 문의는 삭제할 수 없습니다.");
        return;
      }
      
      navigate("/tenant/inquiry-list");
      if (!window.confirm("정말 삭제하시겠습니까?")) return;
  
      console.log("삭제할 ID:", inquiryId); 
      const token = localStorage.getItem("accessToken");
    
      try {
        const response = await axios.delete(`/api/inquiries/${inquiryId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const result = response.data;
    
        if (result.isSuccess) {
          console.log("문의가 삭제되었습니다.");
        } else {
          console.log(result.message || "삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("삭제 중 오류:", error);
        console.log(error.response?.data?.message || "네트워크 오류 또는 요청 에러입니다.");
      }
    };

   
    return (
      <article className={styles.contentContainer}>
        {inquiry.imageUrl && <ImageSection imageUrl={inquiry.imageUrl} />}
        
        <div className={styles.headerRow}>
          <h1 className={styles.title}>{inquiry.title}</h1>
          <div className={styles.iconGroup}>
            <button 
              className={styles.iconButton}
              onClick={() => handleUpdateClick(inquiry.inquiryId)}
            >
              <img src={inquiryUpdate} alt="수정 아이콘" />
            </button>
            <button 
              className={styles.iconButton}
              onClick={() => handleDeleteClick(inquiry.inquiryId)}
            >
              <img src={inquiryDelete} alt="삭제 아이콘" />
            </button>

          </div>
        </div>
        
        <h2 className={styles.requestType}>{inquiry.inquiryType}</h2>
        <hr className={styles.divider} />
        <p className={styles.description}>{inquiry.content}</p>
        <hr className={styles.divider} />
        <p className={styles.dateText}>{new Date(inquiry.createdAt).toLocaleString()}</p>
        <StatusIndicators status={inquiry.status} />
      </article>
    );
  }

  function StatusIndicators({ status }) {
    const statusList = ["접수대기", "처리중", "처리완료"];
    const currentStep = statusList.findIndex((item) => item === status);
  
    return (
      <section className={styles.statusContainer}>
        {/* 점과 선 */}
        <div className={styles.progressRow}>
          {statusList.map((item, index) => {
            const isActive = index <= currentStep;
            return (
              <React.Fragment key={index}>
                <div
                  className={
                    isActive ? styles.activeStatusDot : styles.inactiveStatusDot
                  }
                />
                {index < statusList.length - 1 && (
                  <div
                    className={
                      index < currentStep
                        ? styles.activeStatusLine
                        : styles.inactiveStatusLine
                    }
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
  
        {/* 텍스트 */}
        <div className={styles.labelRow}>
          {statusList.map((item, index) => {
            const isActive = index <= currentStep;
            return (
              <div
                key={index}
                className={isActive ? styles.activeStatusText : styles.statusText}
              >
                {item}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  function Footer({ status, onToggleStatus }) {
    const isComplete = status === "처리완료";
    const isInProgress = status === "처리중";
  
    return (
      <>
        {isInProgress ? (
          <button className={styles.activeButton} onClick={onToggleStatus}>
            처리완료
          </button>
        ) : (
          <button className={styles.disabledButton} disabled>
            처리완료
          </button>
        )}
      </>
    );
  }
  
  function InquiryDetail() {
    const { inquiryId } = useParams();
    const [inquiry, setInquiry] = useState(null);
  
    useEffect(() => {
      const fetchInquiry = async () => {
        const token = localStorage.getItem("accessToken");
  
        if (!token) {
          console.log("인증 정보가 없습니다. 다시 로그인해주세요.");
          return;
        }
  
        try {
          const response = await axios.get(`/api/inquiries/${inquiryId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
  
          console.log("문의 상세 조회 성공:", response.data);
          setInquiry(response.data.result);
        } catch (error) {
          console.log("문의 내용을 불러오는 데 실패했습니다:", error);
        }
      };
  
      fetchInquiry();
    }, [inquiryId]);

    const handleToggleStatus = async () => {
      if (!inquiry) return;
  
      if (inquiry.status !== "처리중") {
        return;
      }
  
      const token = localStorage.getItem("accessToken");
  
      const updatePayload = {
        status: "처리완료", 
        title: inquiry.title,
        content: inquiry.content,
      };
  
      const formData = new FormData();
      formData.append(
        "data",
        new Blob([JSON.stringify(updatePayload)], {
          type: "application/json",
        })
      );
  
      try {
        const response = await axios.patch(
          `/api/inquiries/${inquiryId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        console.log("서버 응답:", response.data);
        setInquiry(response.data.result);
        alert("처리 상태가 처리완료로 변경되었습니다.");
      } catch (error) {
        console.log("상태 변경 실패:", error);
        console.log("서버 응답 메시지:", error.response?.data?.message);
      }
    };
  
  
    if (!inquiry) return null;
  
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.mainContent}>
          <InquiryContent inquiry={inquiry} />
        </main>
        <Footer status={inquiry.status} onToggleStatus={handleToggleStatus} />
      </div>
    );
  }
  
export default InquiryDetail;
