import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./NoticeUpdate.module.css";
import arrowIcon from "../../../assets/icons/arrow_back.svg";

// Back arrow icon component
const BackArrowIcon = () => (
  <img src={arrowIcon} alt="Back to notice detail" width="28" height="28" style={{ display: 'block' }} />
);

// Header component with back button and title
const NoticeEditHeader = ({ onBackClick }) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <button
          className={styles.backButton}
          onClick={onBackClick}
          aria-label="Go back"
        >
          <BackArrowIcon />
        </button>
        <h1 className={styles.headerTitle}>공지사항 수정</h1>
      </div>
    </header>
  );
};

// Form component with title and content fields
const NoticeEditForm = ({ title, content, onTitleChange, onContentChange }) => {
  return (
    <form className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.label}>제목</label>
        <input
          type="text"
          className={styles.titleInput}
          value={title}
          onChange={onTitleChange}
          placeholder="제목을 입력하세요"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>내용</label>
        <textarea
          className={styles.contentTextarea}
          value={content}
          onChange={onContentChange}
          placeholder="내용을 입력하세요"
        />
      </div>
    </form>
  );
};

// Action buttons component
const NoticeEditActions = ({ onCancel, onComplete }) => {
  return (
    <footer className={styles.actionButtons}>
      <button className={styles.cancelButton} onClick={onCancel}>
        취소
      </button>
      <button className={styles.completeButton} onClick={onComplete}>
        완료
      </button>
    </footer>
  );
};

// Main component
function NoticeUpdate() {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(
          `https://j12d109.p.ssafy.io/api/notices/${noticeId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (response.data.success) {
          const { title, content } = response.data.result;
          setTitle(title);
          setContent(content);
        }
      } catch (error) {
        console.error("공지사항을 불러오는데 실패했습니다:", error);
        if (error.response?.status === 404) {
          alert('존재하지 않는 공지사항입니다.');
        } else {
          alert('공지사항을 불러오는데 실패했습니다.');
        }
        navigate("/landlord/notice");
      }
    };

    fetchNoticeDetail();
  }, [noticeId, navigate]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleBackClick = () => {
    navigate(`/landlord/notice/${noticeId}`);
  };

  const handleCancel = () => {
    navigate(`/landlord/notice/${noticeId}`);
  };

  const handleComplete = async () => {
    if (!title.trim() || !content.trim()) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    try {
      const token = localStorage.getItem('accessToken');
      const requestData = {
        title: title.trim(),
        content: content.trim()
      };

      console.log('Request payload:', requestData);

      const response = await axios.patch(
        `https://j12d109.p.ssafy.io/api/notices/${noticeId}`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        navigate(`/landlord/notice/${noticeId}`);
      }
    } catch (error) {
      console.error("공지사항 수정에 실패했습니다:", error);
      if (error.response?.status === 400) {
        alert(error.response.data.message || '입력값을 확인해주세요.');
      } else if (error.response?.status === 403) {
        alert('수정 권한이 없습니다.');
      } else if (error.response?.status === 500) {
        console.error('Server response:', error.response.data);
        alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
      } else {
        alert('공지사항 수정에 실패했습니다.');
      }
    }
  };

  return (
    <main className={styles.container}>
      <NoticeEditHeader onBackClick={handleBackClick} />
      <NoticeEditForm
        title={title}
        content={content}
        onTitleChange={handleTitleChange}
        onContentChange={handleContentChange}
      />
      <NoticeEditActions onCancel={handleCancel} onComplete={handleComplete} />
    </main>
  );
}

export default NoticeUpdate;
