"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./TenantMgmt.module.css";
import { useNavigate } from "react-router-dom";

function TenantMgmt() {
  const navigate = useNavigate();
  
  const [buildings, setBuildings] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(""); 
  const [buildingMap, setBuildingMap] = useState({}); 
  const [tenants, setTenants] = useState([]);

  // 건물 정보 불러오기
useEffect(() => {
  const token = localStorage.getItem("accessToken");

  axios.get("/api/buildings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,  // 쿠키 기반 인증 사용 시 필요
  })
    .then(res => {
      const buildings = res.data.result;
      setBuildings(buildings);

      const map = {};
      buildings.forEach(b => {
        map[b.buildingName] = b.id;
      });
      setBuildingMap(map);

      const firstBuilding = buildings[0];
      if (firstBuilding) {
        setSelectedBuilding(firstBuilding.buildingName);
        fetchTenants(firstBuilding.id, token); // ⬅ 토큰 전달
      }
    })
    .catch(err => {
      console.error("건물 목록 불러오기 실패:", err);
    });
}, []);


//임차인 정보 
const fetchTenants = (buildingId, tokenParam = null) => {
  const token = tokenParam || localStorage.getItem("accessToken");

  axios.get(`/api/tenants?buildingId=${buildingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  })
    .then(res => {
      setTenants(res.data.result);
    })
    .catch(err => {
      console.error("임차인 목록 불러오기 실패:", err);
    });
};

// 3. 건물 클릭 시 임차인 정보 불러오기 (토큰 넘기기)
const handleBuildingClick = (buildingName) => {
  setSelectedBuilding(buildingName);
  const buildingId = buildingMap[buildingName];
  if (buildingId) {
    fetchTenants(buildingId);
  }
};
  return (
    <section className={styles.container}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/ec3637c49e111e793c356889858c828968d2bbb9?placeholderIfAbsent=true"
        alt="Tenant Management Icon"
        className={styles.headerIcon}
        onClick={() => navigate("/landlord")}
        style={{ cursor: "pointer" }}
      />
      <h1 className={styles.title}>임차인 관리</h1>

      {/* 건물 선택 네비게이션 */}
      <nav className={styles.buildingSelector}>
        {buildings.map((building) => (
          <div key={building.id} className={styles.buildingWrapper}>
            <button
              className={`${styles.buildingName} ${selectedBuilding === building.buildingName ? styles.active : ""}`}
              onClick={() => handleBuildingClick(building.buildingName)}
            >
              {building.buildingName}
            </button>
            {selectedBuilding === building.buildingName && <div className={styles.selectedIndicator} />}
          </div>
        ))}
      </nav>

      <hr className={styles.divider} />

      {/* 검색 바 (기능은 나중에 붙일 수 있어요) */}
      <div className={styles.searchBar}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/9d7cb21c14ecb41e80b2d11119158049bd13fac1?placeholderIfAbsent=true"
          alt="Search Icon"
          className={styles.searchIcon}
        />
        <input type="text" placeholder="건물 검색" className={styles.searchInput} />
      </div>

      {/* 임차인 목록 */}
      <div className={styles.tenantList}>
        {tenants.map((tenant) => (
            <article
            key={tenant.roomId}
            className={styles.tenantCard}
            onClick={() => navigate(`/landlord/tenant-mgmt-detail/${tenant.roomId}`)} 
            style={{ cursor: "pointer" }}  // 포인터 표시
          >
            <div className={styles.tenantInfo}>
              <h2 className={styles.roomNumber}>{tenant.roomNumber}</h2>
              <h3 className={styles.tenantName}>{tenant.tenantName}</h3>
              <p className={styles.rentInfo}>월세: {tenant.monthlyRent / 10000}</p>
              <p className={styles.contractInfo}>계약 기간: {tenant.contractEnd.split("T")[0]}</p>
            </div>
            <p className={styles.latePaymentInfo}>
              {/* 연체 횟수:{" "}
              <span className={styles.latePaymentHighlight}>
                {tenant.latePaymentCount ?? 0}
              </span> */}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default TenantMgmt;
