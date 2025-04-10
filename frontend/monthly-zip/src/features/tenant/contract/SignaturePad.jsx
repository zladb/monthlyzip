import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from "./SignaturePad.module.css";

const SignaturePad = ({ onSignatureEnd }) => {
  const sigRef = useRef();

  const handleClear = () => sigRef.current.clear();
  const handleEnd = () => {
    const dataUrl = sigRef.current.toDataURL();
    onSignatureEnd(dataUrl); // 부모 컴포넌트로 서명 전달
  };

  return (
    <div className={styles.signatureContainer}>
      <h4 className={styles.signatureTitle}>서명</h4>
      <SignatureCanvas
        ref={sigRef}
        canvasProps={{ className: styles.signatureCanvas }}
        onEnd={handleEnd}
      />
      <button className={styles.clearButton} onClick={handleClear}>
        지우기
      </button>
    </div>
  );
};

export default SignaturePad;
