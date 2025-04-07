import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import styles from "./InquiryRegister.module.css";
import { useNavigate, useParams } from "react-router-dom";

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
        aria-label="사진 업로드"
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

function InquiryUpdate() {
  const [title, setTitle] = useState("");  // 제목
  const [content, setContent] = useState("");  // 내용
  const [selectedCategory, setSelectedCategory] = useState("")  // 선택된 카테고리
  const [imageFile, setImageFile] = useState(null); // 이미지 파일 상태 추가
  const [existingImageUrl, setExistingImageUrl] = useState("");

  const { inquiryId } = useParams();
  const navigate = useNavigate();

  // 기존 문의내용 불러오기
  useEffect(() => {
    const fetchInquiry = async () => {
      const token = localStorage.getItem("accessToken");

      try {
        const res = await axios.get(`/api/inquiries/${inquiryId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data.result;
        setTitle(data.title);
        setContent(data.content);
        setSelectedCategory(data.inquiryType);
        setExistingImageUrl(data.imageUrl || "");

      } catch (error) {
        console.log("문의 불러오기 실패:", error);
      }
    };
    fetchInquiry();
  }, [inquiryId]);

  // 문의 수정 제출하기
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("카테고리:", selectedCategory); 

    if (!selectedCategory || !title.trim() || !content.trim()) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const dto = { title, content, inquiryType: selectedCategory };
    const formData = new FormData();
    formData.append("data", new Blob([JSON.stringify(dto)], { type: "application/json" }));
    if (imageFile) formData.append("image", imageFile);

    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.patch(`/api/inquiries/${inquiryId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        alert("수정이 완료되었습니다.");
        navigate(`/tenant/inquiry-detail/${inquiryId}`);
      } else {
        console.log("수정 실패:", res.data.message);
      }
    } catch (error) {
      console.log("수정 중 오류:", error);
    }
  };

  // 이미지 업로드 핸들러
  const handleImageUpload = (file) => {
    setImageFile(file);
    setExistingImageUrl("");
  };

  const handleClick = () => {
    navigate(`/tenant/inquiry-detail/${inquiryId}`);
  };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/ded613580379a234172cc8f8602361131b73faf9?placeholderIfAbsent=true"
          alt="Inquiry icon"
          className={styles.icon}
          onClick={handleClick}
        />
        <h1 className={styles.title}>문의 수정</h1>
      </header>

      <section className={styles.contentWrapper}>
        {/* 카테고리 */}
        <div className={styles.categorySection}>
          <div className={styles.categoryNav}>
            {["수리요청", "납부관리", "계약관리"].map((label) => (
              <CategoryButton
                key={label}
                label={label}
                isSelected={selectedCategory === label}
                onClick={setSelectedCategory}
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
                onClick={setSelectedCategory}
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

        {/* 기존 이미지 표시 */}
        {existingImageUrl && !imageFile && (
          <img
            src={existingImageUrl}
            alt="기존 이미지"
            style={{ width: "200px", margin: "15px", objectFit: "cover" }}
          />
        )}
      </section>

      <footer className={styles.footer}>
        <ActionButton
          label="취소"
          className={styles.cancelButton}
          variant="secondary"
          onClick={handleClick}
        />
        <ActionButton
          label="수정하기"
          className={styles.submitButton}
          variant="primary"
          onClick={handleSubmit}
        />
      </footer>
    </main>
  );
}
export default InquiryUpdate;
