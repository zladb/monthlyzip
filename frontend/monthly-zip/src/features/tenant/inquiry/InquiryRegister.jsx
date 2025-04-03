import React, { useState, useRef } from "react";
import axios from "axios";
import styles from "./InquiryRegister.module.css";
import { useNavigate } from "react-router-dom";

function CategoryButton({ label, isSelected, onClick, className, wrapperClassName }) {
  return (
    <div className={wrapperClassName || ""}>
      <button
        className={`${className} ${isSelected ? styles.selected : ""}`} 
        onClick={() => onClick(label)}
      >
        {label}
      </button>
    </div>
  );
}

function InputField({
  label,
  labelClassName,
  inputClassName,
  multiline = false,
  value,
  onChange,
}) {
  return (
    <>
      <label className={labelClassName}>{label}</label>
      {multiline ? (
        <textarea className={inputClassName} value={value} onChange={onChange}/>
      ) : (
        <input type="text" className={inputClassName} value={value} onChange={onChange}/>
      )}
    </>
  );
}

function PhotoUpload({ labelClassName, uploadAreaClassName, onUpload }) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // 미리보기 URL 생성
      setImage(URL.createObjectURL(file));
      onUpload(file);
    }
  };

  return (
    <>
      <label className={labelClassName}>사진</label>
      <button
        className={uploadAreaClassName}
        onClick={() => fileInputRef.current.click()}
        aria-label="Upload photo"
      >
        +
      </button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {imagePreview && (
        <img
          src={imagePreview}
          alt="미리보기"
          style={{ width: "200px", margin: "15px", objectFit: "cover" }}
        />
      )}
    </>
  );
}


function ActionButton({ label, className, variant = "primary", onClick }) {
  return (
    <button
      className={className}
      onClick={onClick}
      type={variant === "primary" ? "submit" : "button"}
    >
      {label}
    </button>
  );
}

function InquiryRegister() {
  const [title, setTitle] = useState("");  // 제목
  const [content, setContent] = useState("");  // 내용
  const [selectedCategory, setSelectedCategory] = useState("")  // 선택된 카테고리
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태 추가
  
  const navigate = useNavigate();

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleImageUpload = (file) => {
    setImageFile(file);
    console.log("업로드된 파일:", file);
  };

  const handleSubmit = () => {
    if(!selectedCategory) {
      alert("문의 유형을 선택해주세요!");
      return;
    }
    
    if (!title.trim()) {
      alert("제목을 입력해주세요!");
      return;
    }

    if (!content.trim()) {
      alert("내용을 입력해주세요!");
      return;
    }

    const requestData = { title, content, inquiryType: selectedCategory, image: imageFile };
    console.log("서버로 전송할 데이터: ", requestData);
    
    axios.post("/api/inquiries", requestData, {
      headers: { "Content-Type": "application/json" }
    })
    .then((response) => console.log("서버 응답:", response.data))
    .catch((error) => console.error("에러 발생:", error));
    };

    const handleClick = () => {
      navigate('/tenant/inquiry-list');
    }
  return (
    <main className={styles.container}>
      <header className={styles.header}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/ded613580379a234172cc8f8602361131b73faf9?placeholderIfAbsent=true"
            alt="Inquiry icon"
            className={styles.icon}
            onClick={handleClick}
          />
          <h1 className={styles.title}>문의하기</h1>
        </header>
        <section className={styles.contentWrapper}>
          <div className={styles.categorySection}>
            <div className={styles.categoryNav}>
              {["수리 요청", "납 부", "계 약"].map((label) => (
                <CategoryButton
                  key={label}
                  label={label}
                  isSelected={selectedCategory === label}
                  onClick={handleCategorySelect}
                  className={styles.categoryButton}
                />
              ))}
            </div>
            <div className={styles.secondaryCategoryNav}>
              {["생활 민원", "기 타"].map((label) => (
                <CategoryButton
                  key={label}
                  label={label}
                  isSelected={selectedCategory === label}
                  onClick={handleCategorySelect}
                  className={styles.categoryButton}
                />
              ))}
            </div>
          </div>
            
            <InputField
                label="제목"
                labelClassName={styles.inputLabel}
                inputClassName={styles.inputField}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <InputField
                label="내용"
                labelClassName={styles.inputLabel}
                inputClassName={styles.textareaField}
                multiline
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <PhotoUpload
                labelClassName={styles.uploadLabel}
                uploadAreaClassName={styles.uploadArea}
                onUpload={handleImageUpload}
            />
      </section>

      <footer className={styles.footer}>
        <ActionButton
          label="취소"
          className={styles.cancelButton}
          variant="secondary"
        />
        <ActionButton
          label="작성하기"
          className={styles.submitButton}
          variant="primary"
          onClick={handleSubmit}
        />
      </footer>
    </main>
  );
}

export default InquiryRegister;
