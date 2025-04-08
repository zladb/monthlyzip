import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./NoticeDetail.module.css";
import arrowIcon from "../../../assets/icons/arrow_back.svg";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";

// Back button component
const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/landlord/notice");
  };

  return (
    <div className={styles.backButton} onClick={handleBack}>
      <img src={arrowIcon} alt="Back to notice list" width="28" height="28" style={{ display: 'block' }} />
    </div>
  );
};

// Notification header component
const NotificationHeader = () => (
  <header className={styles.header}>
    <BackButton />
  </header>
);

// Notification content component
const NotificationContent = ({ notice }) => {
  const formattedDate = notice?.createdAt
    ? new Date(notice.createdAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }).replace(/\. /g, '.').slice(0, -1)
    : '';

  return (
    <section className={styles.contentContainer}>
      <h1 className={styles.title}>{notice?.title}</h1>
      <time className={styles.date}>{formattedDate}</time>
      <hr className={styles.divider} />
      <article className={styles.content}>{notice?.content}</article>
    </section>
  );
};

// Action buttons component
const NotificationActions = ({ onEdit, onDelete }) => (
  <footer className={styles.actionContainer}>
    <button className={styles.deleteButton} onClick={onDelete}>삭제</button>
    <button className={styles.editButton} onClick={onEdit}>수정</button>
  </footer>
);

// Main component
function NoticeDetail() {
  const { noticeId } = useParams();
  const [notice, setNotice] = useState(null);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      try {
        const response = await axios.get(`/api/notices/${noticeId}`);
        if (response.data.success) {
          setNotice(response.data.result);
        }
      } catch (error) {
        if (error.response?.status === 404) {
          setError("해당 공지사항이 존재하지 않습니다.");
          setTimeout(() => {
            navigate("/landlord/notice");
          }, 1500);
        } else {
          setError("공지사항을 불러오는데 실패했습니다.");
        }
      }
    };

    fetchNoticeDetail();
  }, [noticeId, navigate]);

  const handleEdit = () => {
    navigate(`/landlord/notice-update/${noticeId}`);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`/api/notices/${noticeId}`);
      navigate("/landlord/notice");
    } catch (error) {
      console.error("공지사항 삭제 실패:", error);
      // 에러 처리 로직 추가 가능
    }
    setIsDeleteModalOpen(false);
  };

  if (error) {
    return (
      <main className={styles.container}>
        <NotificationHeader />
        <div className={styles.errorMessage}>{error}</div>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <NotificationHeader />
      <NotificationContent notice={notice} />
      <NotificationActions onEdit={handleEdit} onDelete={handleDelete} />
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </main>
  );
}

export default NoticeDetail;
