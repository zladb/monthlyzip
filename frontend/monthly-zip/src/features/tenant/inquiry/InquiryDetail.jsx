import React from "react";
import styles from "./InquiryDetail.module.css";

function Header() {
    return (
      <header className={styles.header}>
        <button className={styles.backButton} aria-label="Go back">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/25d70d2ae1d505a00de79131420e62c022c3e093?placeholderIfAbsent=true"
            className={styles.backButtonIcon}
            alt="Back"
          />
        </button>
      </header>
    );
  }
  
  function ImageSection() {
    return (
      <section className={styles.imageSection}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/b13be7f7a19c5fc699da582d0a32dfa0601709ea?placeholderIfAbsent=true"
          className={styles.icon}
          alt="Inquiry icon"
        />
      </section>
    );
  }

function PaginationDots() {
  return (
    <nav className={styles.paginationDots} aria-label="Page navigation">
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.activeDot} aria-current="page" />
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.dot} aria-hidden="true" />
    </nav>
  );
}
function InquiryContent() {
    return (
      <article className={styles.contentContainer}>
        <hr className={styles.divider} />
        <h1 className={styles.title}>전등 고장</h1>
        <h2 className={styles.requestType}>수리 요청</h2>
        <hr className={styles.divider} />
        <p className={styles.description}>
          안녕하세요, 베란다 쪽 전등이 나가서 불이 안들어와요.
          <br />
          저는 오후 2시 이후에는 집에 있을 수 있으니
          <br />
          그때 수리팀 오시면 감사하겠습니다.
          <br />
          감사합니다!
        </p>
        <hr className={styles.divider} />
      </article>
    );
  }
  function StatusIndicators() {
    return (
      <section className={styles.statusContainer}>
        <div className={styles.statusItem}>
          <div className={styles.activeStatusDot} />
          <div className={styles.statusText}>접수 대기</div>
        </div>
        <div className={styles.statusItem}>
          <div className={styles.inactiveStatusDot} />
          <div className={styles.statusText}>처리중</div>
        </div>
        <div className={styles.statusItem}>
          <div className={styles.inactiveStatusDot} />
          <div className={styles.statusText}>처리 완료</div>
        </div>
      </section>
    );
  }
  

  function Footer() {
    return (
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.statusText}>처리 완료</div>
          <div className={styles.homeIndicator} />
        </div>
      </footer>
    );
  }
  
function InquiryDetail() {
  return (
    <div className={styles.container}>
      <Header />
      <ImageSection />
      <PaginationDots />
      <main className={styles.mainContent}>
        <InquiryContent />
        <StatusIndicators />
      </main>
      <Footer />
    </div>
  );
}

export default InquiryDetail;
