import React from "react";
import CountUp from "react-countup";
import styles from "./HomeCard.module.css";

function HomeCard({ icon, label, value, unit }) {
  const isIncome = label === "이번 달 수입";
  const numericValue = typeof value === 'string' ? parseInt(value.replace(/,/g, '')) : value;

  return (
    <section className={styles.container}>
      <article className={styles.card}>
        <header className={styles.header}>
          <img src={icon} alt={label} className={styles.icon} />
          <h2 className={styles.title}>{label}</h2>
        </header>
        <div className={styles.amountWrapper}>
          {isIncome ? (
            <>
              <p className={styles.amount}>
                <CountUp
                  end={numericValue}
                  duration={2}
                  separator=","
                  decimal="."
                  useEasing={true}
                />
              </p>
              <span className={styles.unit}>{unit}</span>
            </>
          ) : (
            <>
              <p className={styles.amount}>{value.toLocaleString()}</p>
              <span className={styles.unit}>{unit}</span>
            </>
          )}
        </div>
      </article>
    </section>
  );
}

export default HomeCard; 