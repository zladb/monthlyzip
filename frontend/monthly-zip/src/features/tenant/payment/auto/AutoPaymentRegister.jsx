import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./AutoPaymentRegister.module.css";
import wheelStyles from "./WheelPicker.module.css";

function Header() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/tenant/auto-payment');
  }
  return (
    <header className={styles.headerContainer}>
      <img
          src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/7a31437be2e255491b409270ea87dc20bf8f242b?placeholderIfAbsent=true"
          alt="Registration icon"
          className={styles.titleIcon}
          onClick={handleClick}
        />

      <h1 className={styles.title}>자동이체 등록</h1>
    </header>
  );
}
function AccountSection({ title, accountNumber }) {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>{title}</h2>
    
      <div className={styles.accountNumberContainer}>
        <p className={styles.accountNumberLabel}>{accountNumber}</p>
        <div className={styles.divider} />
      </div>
    </section>
  );
}


function AmountSection({ amount, setAmount }) {

  useEffect(() => {
    const stored = localStorage.getItem("autoPaymentAmount");
    if (stored) setAmount(stored);
  }, [setAmount]);

  const handleChange = (e) => {
    const value = e.target.value;
    // 숫자만 허용 + 앞에 0이 오는 건 막음 (단, 빈 값은 허용)
    if (/^\d*$/.test(value)) {
      if (value === "" || !/^0\d+/.test(value)) {
        setAmount(value);
        localStorage.setItem("autoPaymentAmount", value); 
      }
    }
  }
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>금액</h2>
      <div className={styles.amountInputContainer}>
        <div className={styles.amountInputHeader}>
          <input
            type="number"
            className={styles.amountInput}
            placeholder="숫자만 입력"
            step="10000" // 10000씩 증가하도록 설정
            onChange={handleChange}
            value={amount}
          />
          <p className={styles.currencyLabel}>원</p>
        </div>
        <div className={styles.divider} />
      </div>
    </section>
  );
}

function FrequencyModal({ onClose, onSelect, initialDay }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const listRef = useRef(null);
  
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const index = days.indexOf(initialDay ?? 10); // 기본값은 10일
    return index !== -1 ? index : 9;
  });

  const itemHeight = 40;

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = selectedIndex * itemHeight;
    }
  }, [selectedIndex]);

  // 스크롤 멈췄을 때 가장 가까운 항목으로 정렬
  let scrollTimeout = useRef(null);

  const handleScroll = () => {
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

    scrollTimeout.current = setTimeout(() => {
      const scrollTop = listRef.current.scrollTop;
      const index = Math.round(scrollTop / itemHeight);

      // 부드럽게 중앙 정렬
      listRef.current.scrollTo({
        top: index * itemHeight,
        behavior: "smooth",
      });

      setSelectedIndex(index);
    }, 100); // 100ms 동안 멈췄을 때 정렬
  };

  const handleConfirm = () => {
    const selectedDay = days[selectedIndex];
    onSelect(selectedDay);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>이체일 선택</h3>
          <div className={styles.modalCloseButton} onClick={onClose}>
            <span className={styles.modalCloseIcon}>×</span>
          </div>
        </div>

        <p className={styles.modalSubtitle}>이체일을 선택해 주세요</p>
        <p className={styles.modalText}>
          선택한 날짜가 해당 월에 없을 경우, 말일에 자동이체가 진행됩니다.
        </p>

        <div className={wheelStyles.wheelWrapper}>
          <div className={wheelStyles.wheelOverlay} />
          <ul
            ref={listRef}
            className={wheelStyles.wheelList}
            onScroll={handleScroll}
          >
            {days.map((day, idx) => (
              <li
                key={day}
                className={`${wheelStyles.wheelItem} ${
                  idx === selectedIndex ? wheelStyles.wheelItemSelected : ""
                }`}
              >
                {day}일
              </li>
            ))}
          </ul>
        </div>

        <button className={styles.modalConfirmButton} onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  );
}

function FrequencySection({ day, onClick }) {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>이체 주기</h2>
      <div className={styles.frequencySelector}>
        <div className={styles.frequencyHeader}>
          <p className={styles.frequencyType}>매월</p>
          <div className={styles.daySelector}>
            <p className={styles.dayValue}>{day}일</p>
            <button 
              type="button"
              className={styles.dropdownButton} 
              onClick={onClick}
            >
              <img
                src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/7a31437be2e255491b409270ea87dc20bf8f242b?placeholderIfAbsent=true"
                alt="Registration icon"
                className={styles.dropdownIcon}
              />
            </button>
          </div>
        </div>
        <div className={styles.divider} />
      </div>
    </section>
  );
}



function PeriodModal({ onClose, onSelect, initialPeriod  }) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const yearRef = useRef(null);
  const monthRef = useRef(null);

  const [selectedYearIndex, setSelectedYearIndex] = useState(() => {
    if (!initialPeriod) return 0;
    const [yearStr] = initialPeriod.split(".");
    return years.findIndex((y) => y === Number(yearStr));
  });

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(() => {
    if (!initialPeriod) return 0;
    const [, monthStr] = initialPeriod.split(".");
    return Number(monthStr) - 1; // month 1~12 → index 0~11
  });

  const itemHeight = 40;
  let yearTimeout = useRef(null);
  let monthTimeout = useRef(null);

  useEffect(() => {
    if (yearRef.current) yearRef.current.scrollTop = selectedYearIndex * itemHeight;
    if (monthRef.current) monthRef.current.scrollTop = selectedMonthIndex * itemHeight;
  }, [selectedYearIndex, selectedMonthIndex]);

  const handleScroll = (type) => {
    if (type === "year") {
      if (yearTimeout.current) clearTimeout(yearTimeout.current);
      yearTimeout.current = setTimeout(() => {
        const index = Math.round(yearRef.current.scrollTop / itemHeight);
        yearRef.current.scrollTo({ top: index * itemHeight, behavior: "smooth" });
        setSelectedYearIndex(index);
      }, 100);
    } else {
      if (monthTimeout.current) clearTimeout(monthTimeout.current);
      monthTimeout.current = setTimeout(() => {
        const index = Math.round(monthRef.current.scrollTop / itemHeight);
        monthRef.current.scrollTo({ top: index * itemHeight, behavior: "smooth" });
        setSelectedMonthIndex(index);
      }, 100);
    }
  };

  const handleConfirm = () => {
    const selectedYear = years[selectedYearIndex];
    const selectedMonth = months[selectedMonthIndex];
    onSelect(`${selectedYear}.${String(selectedMonth).padStart(2, "0")}`);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3 className={styles.modalTitle}>자동이체기간</h3>
          <div className={styles.modalCloseButton} onClick={onClose}>
            <span className={styles.modalCloseIcon}>×</span>
          </div>
        </div>

        <div className={wheelStyles.wheelWrapperContainer}>
          {/* 년도 휠 */}
          <div className={wheelStyles.wheelWrapper}>
            <div className={wheelStyles.wheelOverlay} />
            <ul
              ref={yearRef}
              className={wheelStyles.wheelList}
              onScroll={() => handleScroll("year")}
            >
              {years.map((year, idx) => (
                <li
                  key={year}
                  className={`${wheelStyles.wheelItem} ${
                    idx === selectedYearIndex ? wheelStyles.wheelItemSelected : ""
                  }`}
                >
                  {year}년
                </li>
              ))}
            </ul>
          </div>

          {/* 월 휠 */}
          <div className={wheelStyles.wheelWrapper}>
            <div className={wheelStyles.wheelOverlay} />
            <ul
              ref={monthRef}
              className={wheelStyles.wheelList}
              onScroll={() => handleScroll("month")}
            >
              {months.map((month, idx) => (
                <li
                  key={month}
                  className={`${wheelStyles.wheelItem} ${
                    idx === selectedMonthIndex ? wheelStyles.wheelItemSelected : ""
                  }`}
                >
                  {month}월
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button className={styles.modalConfirmButton} onClick={handleConfirm}>
          확인
        </button>
      </div>
    </div>
  );
}


function PeriodSection({ start, end, onClickStart, onClickEnd }) {
  return (
    <section className={styles.sectionContainer}>
      <h2 className={styles.sectionTitle}>자동이체기간</h2>
      <div className={styles.periodContainer}>
        <div className={styles.periodStartContainer}>
          <p className={styles.periodValue}>{start}</p>
          <button type="button" className={styles.dropdownButton} onClick={onClickStart}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/7a31437be2e255491b409270ea87dc20bf8f242b?placeholderIfAbsent=true"
              alt="달력"
              className={styles.dropdownIcon}
            />
          </button>
        </div>

        <div className={styles.periodEndContainer}>
          <p className={styles.periodValue}>{end}</p>
          <button type="button" className={styles.dropdownButton} onClick={onClickEnd}>
            <img
              src="https://cdn.builder.io/api/v1/image/assets/94f9b1b367134d27b681c8187a3426ca/7a31437be2e255491b409270ea87dc20bf8f242b?placeholderIfAbsent=true"
              alt="달력"
              className={styles.dropdownIcon}
            />
          </button>
        </div>
      </div>
      <div className={styles.divider} />
    </section>
  );
}

const getDefaultPeriods = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const nextMonth = month === 12 ? 1 : month + 1;
  const nextYear = month === 12 ? year + 1 : year;

  const start = `${year}.${String(month).padStart(2, "0")}`;
  const end = `${nextYear}.${String(nextMonth).padStart(2, "0")}`;
  return { start, end };
};

function AutoPaymentRegister() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);
  const [isStartModalOpen, setIsStartModalOpen] = useState(false);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  
  const [selectedDay, setSelectedDay] = useState(10); // 초기값 10일

  const { start: defaultStart, end: defaultEnd } = getDefaultPeriods();

  const [startPeriod, setStartPeriod] = useState(defaultStart);
  const [endPeriod, setEndPeriod] = useState(defaultEnd);

  useEffect(() => {
    const savedDay = localStorage.getItem("autoPaymentFrequency");
    const savedStart = localStorage.getItem("autoPaymentPeriodStart");
    const savedEnd = localStorage.getItem("autoPaymentPeriodEnd");
  
    if (savedDay) {
      setSelectedDay(Number(savedDay));
    } else {
      localStorage.setItem("autoPaymentFrequency", selectedDay); // 기본값도 저장
    }
  
    if (savedStart) {
      setStartPeriod(savedStart);
    } else {
      localStorage.setItem("autoPaymentPeriodStart", defaultStart);
    }
  
    if (savedEnd) {
      setEndPeriod(savedEnd);
    } else {
      localStorage.setItem("autoPaymentPeriodEnd", defaultEnd);
    }

    localStorage.setItem(
      "autoPaymentPeriod",
      `${savedStart ?? defaultStart} ~ ${savedEnd ?? defaultEnd}`
    );
  }, []);
  
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem("accessToken");
  
        const response = await axios.get("/api/autotransfers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log("자동이체 응답: ", response.data);
        if (response.data.success) {
          const data = response.data.result;
  
          setFromAccount(data.fromAccount);
          setToAccount(data.toAccount);
        } else {
          console.error("계좌 정보를 불러오지 못했습니다:", response.data.message);
        }
      } catch (error) {
        console.error("계좌 정보 조회 실패:", error);
      }
    };
  
    fetchAccounts();
  }, []);
  

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    localStorage.setItem("autoPaymentFrequency", day); 
    setIsDayModalOpen(false);
  };
  
  const handleClick = () => {
    if (!amount || Number(amount) === 0) {
      alert("금액을 입력해 주세요");
      return; // 다음 화면 이동 막음
    }
  
    navigate('/tenant/auto-payment-confirm');
  };

  return (
    <div className={styles.container}>
        <div className={styles.formContainer}>
            <Header />

            <form className={styles.formContent}>
            <AccountSection
              title="출금계좌"
              accountNumber={fromAccount}
            />

            <AccountSection
              title="입금계좌"
              accountNumber={toAccount}
            />

            <AmountSection amount={amount} setAmount={setAmount}/>

            <FrequencySection 
              day={selectedDay} 
              onClick={() => setIsDayModalOpen(true)} 
            />
            <PeriodSection
              start={startPeriod}
              end={endPeriod}
              onClickStart={() => setIsStartModalOpen(true)}
              onClickEnd={() => setIsEndModalOpen(true)}
            />
            </form>

            {isDayModalOpen && (
              <FrequencyModal 
                onClose={() => setIsDayModalOpen(false)} 
                onSelect={handleDaySelect} 
                initialDay={selectedDay}
              />
            )}

            {/* 시작일 모달 */}
           {isStartModalOpen && (
              <PeriodModal
                onClose={() => setIsStartModalOpen(false)}
                initialPeriod={startPeriod}
                onSelect={(period) => {
                  setStartPeriod(period);

                  // 시작일 기준으로 종료일을 한 달 뒤로 설정
                  const [year, month] = period.split('.').map(Number);
                  let newMonth = month + 1;
                  let newYear = year;

                  if (newMonth > 12) {
                    newMonth = 1;
                    newYear += 1;
                  }

                  const newEndPeriod = `${newYear}.${String(newMonth).padStart(2, '0')}`;
                  setEndPeriod(newEndPeriod);

                  localStorage.setItem("autoPaymentPeriodStart", period);
                  localStorage.setItem("autoPaymentPeriodEnd", newEndPeriod);
                  localStorage.setItem("autoPaymentPeriod", `${period} ~ ${newEndPeriod}`);
                 
                  setIsStartModalOpen(false);
                }}
              />
            )}

            {/* 종료일 모달 */}
            {isEndModalOpen && (
              <PeriodModal
                onClose={() => setIsEndModalOpen(false)}
                initialPeriod={endPeriod} 
                onSelect={(period) => {
                  setEndPeriod(period);

                  const start = localStorage.getItem("autoPaymentPeriodStart") || startPeriod;
                  localStorage.setItem("autoPaymentPeriodEnd", period);
                  localStorage.setItem("autoPaymentPeriod", `${start} ~ ${period}`);

                  setIsEndModalOpen(false);
                }}
              />
            )}

            <button 
              className={styles.nextButton}
              onClick={handleClick}
            >
                다음
            </button>
        </div>
    </div>
  );
}

export default AutoPaymentRegister;
