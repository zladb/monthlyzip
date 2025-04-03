import React from "react";
import styles from "./HomeCard.module.css";

function HomeCard({ icon, label, value, unit }) {
  return (
    <section className={styles.container}>
      <article className={styles.card}>
        <header className={styles.header}>
          <img src={icon} alt={label} className={styles.icon} />
          <h2 className={styles.title}>{label}</h2>
        </header>
        <div className={styles.amountWrapper}>
          <p className={styles.amount}>{value}</p>
          <span className={styles.unit}>{unit}</span>
        </div>
      </article>
    </section>
  );
}

export default HomeCard; 