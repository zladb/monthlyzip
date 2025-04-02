import React, { useState, useRef } from "react";
import axios from "axios";
import styles from "./InquiryRegister.module.css";

function CategoryButton({ label, className, wrapperClassName}) {
  return (
    <div className={wrapperClassName || ""}>
      <button className={className}>
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
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
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

  const handleSubmit = () => {
    const requestData = { title, content };
    console.log("서버로 전송할 데이터: ", requestData);
    
    axios.post("/api/inquiries", requestData, {
      headers: { "Content-Type": "application/json" }
    })
    .then((response) => console.log("서버 응답:", response.data))
    .catch((error) => console.error("에러 발생:", error));
    
    };

  return (
    <main className={styles.container}>
      <header className={styles.header}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/ded613580379a234172cc8f8602361131b73faf9?placeholderIfAbsent=true"
            alt="Inquiry icon"
            className={styles.icon}
          />
          <h1 className={styles.title}>문의하기</h1>
        </header>
        <section className={styles.contentWrapper}>
          <nav className={styles.categorySection}>
            <nav className={styles.categoryNav}>
                <CategoryButton
                label="수리 요청"
                className={styles.categoryButton}
                wrapperClassName={styles.categoryButtonWrapper}
                />
                <CategoryButton
                label="납 부"
                className={styles.categoryButton}
                wrapperClassName={styles.categoryButtonWrapper}
                />
                <CategoryButton
                label="계 약"
                    className={styles.categoryButton}
                    wrapperClassName={styles.categoryButtonWrapper}
                    />
                </nav>

                <nav className={styles.secondaryCategoryNav}>
                    <CategoryButton label="생활 민원" className={styles.categoryButton} />
                    <CategoryButton label="기 타" className={styles.categoryButton} />
                </nav>
            </nav>
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
