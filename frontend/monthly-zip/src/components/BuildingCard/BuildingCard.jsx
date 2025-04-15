import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './BuildingCard.module.css';
import UDModal from '../UDModal/UDModal';
import AddIcon from '../../assets/icons/add.svg';

function BuildingCard({ buildingId, buildingName, onDelete }) {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [roomContracts, setRoomContracts] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, [buildingId]);

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get(`/api/rooms?propertyId=${buildingId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.success) {
        console.log('세대 목록 응답:', response.data.result);
        setRooms(response.data.result);
        // 각 세대별 계약 정보 조회
        fetchContractsForRooms(response.data.result);
      }
      setLoading(false);
    } catch (error) {
      setError('세대 목록을 불러오는데 실패했습니다.');
      setLoading(false);
    }
  };

  const fetchContractsForRooms = async (roomsList) => {
    try {
      const token = localStorage.getItem('accessToken');
      const contracts = {};
      
      for (const room of roomsList) {
        console.log('계약 정보 조회 중인 세대:', room);
        const response = await axios.get(`/api/contracts?roomId=${room.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        console.log(`세대 ${room.id}의 계약 정보:`, response.data);
        
        if (response.data.success && response.data.result.length > 0) {
          // 해당 세대의 계약 정보만 필터링
          const roomContracts = response.data.result.filter(contract => contract.roomId === room.id);
          if (roomContracts.length > 0) {
            // 가장 최근 계약 정보 사용
            const latestContract = roomContracts[0];
            contracts[room.id] = latestContract;
          }
        }
      }
      
      console.log('모든 세대의 계약 정보:', contracts);
      setRoomContracts(contracts);
    } catch (error) {
      console.error('계약 정보를 불러오는데 실패했습니다:', error);
    }
  };

  const isRoomOccupied = (roomId) => {
    const contract = roomContracts[roomId];
    console.log(`세대 ${roomId}의 입주 여부 확인:`, contract);
    return contract && contract.isActiveLandlord === true && contract.isActiveTenant === true;
  };

  const handleRoomClick = (roomId) => {
    navigate(`/landlord/building/${roomId}`);
  };

  const handleBuildingUpdate = () => {
    navigate(`/landlord/building-update/${buildingId}`);
    setIsModalOpen(false);
  };

  const handleBuildingDelete = () => {
    onDelete(buildingId);
    setIsModalOpen(false);
  };

  const handleRoomCreate = () => {
    navigate(`/landlord/building/room-create`, { state: { propertyId: buildingId } });
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles.buildingCard}>
      <header className={styles.buildingHeader}>
        <h2>{buildingName}</h2>
        <button
          className={styles.menuButton}
          onClick={() => setIsModalOpen(true)}
          aria-label="메뉴 열기"
        >
          ⋮
        </button>
        {isModalOpen && (
          <UDModal
            onUpdate={handleBuildingUpdate}
            onDelete={handleBuildingDelete}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </header>

      <div className={styles.unitsContainer}>
        {rooms.length === 0 ? (
          <div className={styles.noUnits}>
            <p className={styles.noUnitsText}>등록된 세대가 없습니다</p>
            <p className={styles.noUnitsSubText}>세대를 등록해주세요</p>
          </div>
        ) : (
          rooms.map((room, index) => {
            const isOccupied = isRoomOccupied(room.id);
            console.log(`세대 ${room.id} 렌더링:`, { room, isOccupied });
            return (
              <React.Fragment key={room.id}>
                <div
                  className={styles.unitRow}
                  onClick={() => handleRoomClick(room.id)}
                >
                  <h3 className={styles.unitName}>{room.detailAddress}</h3>
                  <span className={isOccupied ? styles.occupiedStatus : styles.vacantStatus}>
                    {isOccupied ? '입주' : '공실'}
                  </span>
                </div>
                {index < rooms.length - 1 && <hr className={styles.thinDivider} />}
              </React.Fragment>
            );
          })
        )}
      </div>

      <button
        className={styles.roomCreateButton}
        onClick={handleRoomCreate}
      >
        <img src={AddIcon} alt="add" className={styles.footerIcon} />
        <span>세대 등록</span>
      </button>
    </div>
  );
}

export default BuildingCard;
