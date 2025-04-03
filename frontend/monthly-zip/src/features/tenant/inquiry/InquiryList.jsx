import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./InquiryList.module.css";
import registerIcon from '../../../assets/icons/inquiryregister.png';

function InquiryHeader({ title }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/tenant/inquiry-register');
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.pageTitle}>{title}</h1>
      <img 
        src={registerIcon} 
        alt="qaregister" 
        className={styles.icon} 
        onClick={handleClick}
      />
    </header>
  );
}

function CategoryFilter({ selectedCategory, onFilterChange }) {
  const categories = ["전체", "납부관리", "수리요청", "생활민원", "계약연장", "기타"];

  return (
    <nav className={styles.filterContainer}>
      {categories.map((category, index) => (
        <button 
          key={index} 
          className={`${styles.filterItem} ${selectedCategory === category ? styles.active : ""}`}
          onClick={() => onFilterChange(category === "전체" ? "" : category)}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}

function InquiryItem({ inquiryId, category, categoryColor, title, date, status }) {
  
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate(`/tenant/inquiry-detail/${inquiryId}`);
  };
  
  return (
    <article className={styles.inquiryCard} onClick={handleClick}>
      <div className={styles.categoryLabel} style={{ backgroundColor: categoryColor }}>
        {category}
      </div>
      <div className={styles.contentContainer}>
        <h2 className={styles.title}>{title}</h2>
        <time className={styles.date}>{date}</time>
      </div>
      <span className={styles.status}>{status}</span>
    </article>
  );
}

function InquiryList() {
  const [inquiries, setInquiries] = useState([]);  // 전체 문의 리스트
  const [selectedCategory, setSelectedCategory] = useState("");  // 선택된 카테고리
  const [filteredInquiries, setFilteredInquiries] = useState([]);  // 필터링된 리스트

  useEffect(() => {
    fetchInquiries();
  }, []);

  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredInquiries(inquiries);
    } else {
      setFilteredInquiries(inquiries.filter(item => item.inquiryType === selectedCategory));
    }
  }, [selectedCategory, inquiries]);

  const fetchInquiries = () => {
    axios.get("/api/inquiries", { 
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => {

        if (response.data.success) {
          setInquiries(response.data.result);
          setFilteredInquiries(response.data.result);  // 처음에는 전체 데이터 표시
        } else {
          console.error("문의 목록을 가져오지 못했습니다:", response.data.message);
        }
      })
      .catch((error) => console.error("문의 목록을 가져오는 중 오류 발생:", error));
  };

  const getCategoryColor = (category) => {
    console.log("Category:", category);
    const colors = {
      "수리요청": "#07f",
      "계약연장": "#ff1d86",
      "생활민원": "#16d03b",
      "납부관리": "#ff7e3e",
      "기타": "#999",
    };
    return colors[category] || "#ccc";
  };

  return (
    <>
      <main className={styles.container}>
        <InquiryHeader title="문의 내역" />
        <CategoryFilter selectedCategory={selectedCategory} onFilterChange={setSelectedCategory} />
        <section className={styles.inquiryList}>
          {filteredInquiries.map((item) => (
            <InquiryItem
              inquiryId={item.inquiryId}
              category={item.inquiryType}
              categoryColor={getCategoryColor(item.inquiryType)}
              
              title={item.title}
              date={new Date(item.createdAt).toLocaleString()}
              status={item.status}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default InquiryList;
