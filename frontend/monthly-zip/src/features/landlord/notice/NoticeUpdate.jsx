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
        const response = await axios.get(`/api/notices/${noticeId}`);
        if (response.data.success) {
          const { title, content } = response.data.result;
          setTitle(title);
          setContent(content);
        }
      } catch (error) {
        console.error("공지사항을 불러오는데 실패했습니다:", error);
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
    try {
      await axios.patch(`/api/notices/${noticeId}`, {
        title,
        content
      });
      navigate(`/landlord/notice/${noticeId}`);
    } catch (error) {
      console.error("공지사항 수정에 실패했습니다:", error);
      // 에러 처리 로직 추가 가능
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
