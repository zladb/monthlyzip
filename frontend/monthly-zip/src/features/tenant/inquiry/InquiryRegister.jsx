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
      const previewURL = URL.createObjectURL(file);
      setImage(file);
      setImagePreview(previewURL);
      onUpload(file);
    }
  };

  const handlePreviewImageClick = () => {
    setImage(null);
    setImagePreview(null);
    fileInputRef.current.value = null;
    onUpload(null);
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
          alt="미리보기, 클릭 시 삭제"
          onClick={handlePreviewImageClick}
          title="이미지를 클릭하면 삭제됩니다."
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
    setSelectedCategory(prev => prev === category ? "" : category);
  };

  const handleImageUpload = (file) => {
    setImageFile(file);
    console.log("업로드된 파일:", file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
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

    const dto = {
      title,
      content,
      inquiryType: selectedCategory
    };
    
    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(dto)], { type: "application/json" }));
    
    if (imageFile) {
      formData.append("image", imageFile);
    }
    
    console.log("전송할 데이터:", formData); // FormData 객체 확인

    
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.log("인증 정보가 없습니다. 다시 로그인해주세요.");
        return;
      }

      const response = await axios.post("/api/inquiries", formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        console.log("문의 등록 성공!", response.data);
        const inquiryId = response.data.result.inquiryId; // 문의 ID 가져오기
        navigate(`/tenant/inquiry-detail/${inquiryId}`);
        
      } else {
        console.log("문의 등록 실패:", response.data.message);
      }
    } catch (error) {
      console.log("에러 발생:", error);
      console.error("문의 등록 중 오류가 발생했습니다.", error);
      console.log(error.response?.data?.message || "네트워크 오류 또는 요청 에러입니다.");

    }
  
 
  }
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
              {["수리요청", "납부", "계약"].map((label) => (
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
              {["생활민원", "기타"].map((label) => (
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
          onClick={handleClick}
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
