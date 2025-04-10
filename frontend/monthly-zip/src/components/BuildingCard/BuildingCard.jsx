import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "./BuildingCard.module.css";
import MenuIcon from '../../assets/icons/menu.svg';
import AddIcon from '../../assets/icons/add.svg';
import UDModal from '../../components/UDModal/UDModal';
import DeleteModal from '../../components/DeleteModal/DeleteModal';

// Building Header Component
const BuildingHeader = ({ buildingId, buildingName, onDelete }) => {
  const navigate = useNavigate();
  const [isUDModalOpen, setIsUDModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleMenuClick = (event) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setModalPosition({
      top: buttonRect.bottom + window.scrollY,
      right: window.innerWidth - buttonRect.right,
    });
    setIsUDModalOpen(true);
  };

  const handleUpdate = () => {
    setIsUDModalOpen(false);
    navigate(`/landlord/building-update/${buildingId}`);
  };

  const handleDeleteClick = () => {
    setIsUDModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`/api/building/${buildingId}`);
      if (response.data.success) {
        onDelete(buildingId);
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to delete building:', error);
    }
  };

  return (
    <header className={styles.buildingHeader}>
      <h2>{buildingName}</h2>
      <button className={styles.menuButton} onClick={handleMenuClick}>
        <img src={MenuIcon} alt="menu" className={styles.headerIcon} />
      </button>
      {isUDModalOpen && (
        <div 
          className={styles.modalPosition} 
          style={{ 
            position: 'absolute',
            top: modalPosition.top,
            right: modalPosition.right 
          }}
        >
          <UDModal
            onUpdate={handleUpdate}
            onDelete={handleDeleteClick}
            onClose={() => setIsUDModalOpen(false)}
          />
        </div>
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          message="건물을 삭제하시겠습니까?"
          subMessage="건물을 삭제하면 복구할 수 없습니다."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}
    </header>
  );
};

// Unit Row Component
const UnitRow = ({ unitName, status }) => {
  const isVacant = status === "공실";

  return (
    <section className={styles.unitRow}>
      <h2 className={styles.unitName}>{unitName}</h2>
      <p className={isVacant ? styles.vacantStatus : styles.occupiedStatus}>
        {status}
      </p>
    </section>
  );
};

// Divider Component
const Divider = () => {
  return <hr className={styles.divider} />;
};

// Registration Footer Component
const RegistrationFooter = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/landlord/room-create');
  };

  return (
    <button className={styles.registrationFooter} onClick={handleClick}>
      <img src={AddIcon} alt="add" className={styles.footerIcon} />
      <span>세대 등록</span>
    </button>
  );
};

// Main BuildingCard Component
const BuildingCard = ({ buildingId, buildingName, onDelete, currentPage }) => {
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });
  const menuButtonRef = useRef(null);
  const cardRef = useRef(null);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
  }, [currentPage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target) &&
          menuButtonRef.current && !menuButtonRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`/api/rooms?propertyId=${buildingId}`);
        if (response.data.success) {
          setRooms(response.data.result);
        }
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      }
    };

    fetchRooms();
  }, [buildingId]);

  const handleMenuClick = (event) => {
    event.stopPropagation();
    const buttonRect = menuButtonRef.current.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();
    
    setModalPosition({
      top: buttonRect.height,
      right: cardRect.right - buttonRect.right
    });
    setIsModalOpen(prev => !prev);
  };

  const handleUpdate = () => {
    setIsModalOpen(false);
    navigate(`/landlord/building-update/${buildingId}`);
  };

  const handleDeleteClick = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`/api/building/${buildingId}`);
      if (response.data.success) {
        onDelete(buildingId);
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error('Failed to delete building:', error);
    }
  };

  const handleRoomCreate = () => {
    navigate('/landlord/room-create', { state: { propertyId: buildingId } });
  };

  return (
    <div className={styles.buildingCard} ref={cardRef}>
      <div className={styles.buildingHeader}>
        <h2>{buildingName}</h2>
        <div className={styles.menuContainer}>
          <button 
            ref={menuButtonRef}
            className={styles.menuButton} 
            onClick={handleMenuClick}
          >
            <img src={MenuIcon} alt="menu" className={styles.headerIcon} />
          </button>
          {isModalOpen && (
            <>
              <div 
                className={styles.cardOverlay} 
                onClick={() => setIsModalOpen(false)}
              />
              <div 
                ref={modalRef}
                className={styles.modalPosition} 
                style={{ 
                  top: modalPosition.top,
                  right: modalPosition.right
                }}
              >
                <UDModal
                  onUpdate={handleUpdate}
                  onDelete={handleDeleteClick}
                  onClose={() => setIsModalOpen(false)}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {rooms.length > 0 ? (
        <>
          {rooms.map((room, index) => (
            <React.Fragment key={room.id}>
              <div className={styles.unitRow}>
                <span className={styles.unitName}>{room.detailAddress}</span>
                <span className={room.isOccupied ? styles.occupiedStatus : styles.vacantStatus}>
                  {room.isOccupied ? '입주' : '공실'}
                </span>
              </div>
              {index < rooms.length - 1 && <div className={styles.divider} />}
            </React.Fragment>
          ))}
        </>
      ) : (
        <div className={styles.noUnits}>
          <span>등록된 세대가 없습니다</span>
        </div>
      )}

      {isDeleteModalOpen && (
        <DeleteModal
          message="건물을 삭제하시겠습니까?"
          subMessage="건물을 삭제하면 복구할 수 없습니다."
          onConfirm={handleDeleteConfirm}
          onCancel={() => setIsDeleteModalOpen(false)}
        />
      )}

      <button 
        className={styles.registrationFooter}
        onClick={handleRoomCreate}
      >
        <img src={AddIcon} alt="add" className={styles.footerIcon} />
        <span>세대 등록</span>
      </button>
    </div>
  );
};

export default BuildingCard;
