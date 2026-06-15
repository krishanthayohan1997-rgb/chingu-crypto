import {
  FaHome,
  FaCalendarAlt,
  FaChartBar,
  FaHistory,
  FaCog
} from "react-icons/fa";

import {
  MdWork,
  MdNightlight,
  MdCelebration
} from "react-icons/md";

import { BiTime } from "react-icons/bi";
import { useEffect, useState } from "react";
import "./App.css";
import logo from "./assets/korea-salary-tracker..jpeg";
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function App() {
  const [page, setPage] = useState("home");
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(5);
  const [selectedDay, setSelectedDay] = useState(1);

  const [hourlyRate, setHourlyRate] = useState(10430);
  const [regular, setRegular] = useState(8);
  const [ot, setOt] = useState(0);
  const [night, setNight] = useState(0);
  const [holiday, setHoliday] = useState(0);

  const [records, setRecords] = useState(() => {
    const saved = localStorage.getItem("korea-salary-records");
    return saved ? JSON.parse(saved) : {};
  });

  const monthKey = `${year}-${month}`;
  const monthRecords = records[monthKey] || {};
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  useEffect(() => {
    localStorage.setItem("korea-salary-records", JSON.stringify(records));
  }, [records]);

  const regularPay = regular * hourlyRate;
  const otPay = ot * hourlyRate * 1.5;
  const nightPay = night * hourlyRate * 0.5;
  const holidayPay = holiday * hourlyRate * 1.5;
  const daySalary = regularPay + otPay + nightPay + holidayPay;

  const totals = Object.values(monthRecords).reduce(
    (sum, d) => {
      sum.regular += d.regular || 0;
      sum.ot += d.ot || 0;
      sum.night += d.night || 0;
      sum.holiday += d.holiday || 0;
      return sum;
    },
    { regular: 0, ot: 0, night: 0, holiday: 0 }
  );

  const grossSalary =
    totals.regular * hourlyRate +
    totals.ot * hourlyRate * 1.5 +
    totals.night * hourlyRate * 0.5 +
    totals.holiday * hourlyRate * 1.5;

  const deductions = grossSalary * 0.08;
  const netSalary = grossSalary - deductions;

  function money(v) {
    return Math.round(v).toLocaleString();
  }

  function selectDay(day) {
    setSelectedDay(day);
    const saved = monthRecords[day];

    if (saved) {
      setRegular(saved.regular);
      setOt(saved.ot);
      setNight(saved.night);
      setHoliday(saved.holiday);
    } else {
      setRegular(8);
      setOt(0);
      setNight(0);
      setHoliday(0);
    }
  }

  function saveDay() {
    const newRecords = {
      ...records,
      [monthKey]: {
        ...monthRecords,
        [selectedDay]: { regular, ot, night, holiday },
      },
    };
    setRecords(newRecords);
  }

  function deleteDay() {
    const copy = { ...monthRecords };
    delete copy[selectedDay];

    setRecords({
      ...records,
      [monthKey]: copy,
    });

    setRegular(8);
    setOt(0);
    setNight(0);
    setHoliday(0);
  }

 function Home() {
  return (
    <div className="home">
<div className="app-header">
  <img src={logo} alt="logo" className="app-logo" />
  <h2>Korea Salary Tracker</h2>
</div>
      <div className="top-card">
        <select>
          <option>June 2026</option>
        </select>

        <input
          type="number"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(Number(e.target.value))}
        />
      </div>

      <div className="section-card">
        <div className="title-row">
          <h3>Selected Day</h3>
          <span className="work-day">Work Day</span>
        </div>

        <p>June 11, 2026 (Wed)</p>
      </div>

      <div className="hours-grid">
        <div className="hour-box">
          <h4>Regular</h4>
          <p>8.0 h</p>
        </div>

        <div className="hour-box">
          <h4>OT</h4>
          <p>2.5 h</p>
        </div>

        <div className="hour-box">
          <h4>Night</h4>
          <p>1.5 h</p>
        </div>

        <div className="hour-box">
          <h4>Holiday</h4>
          <p>0.0 h</p>
        </div>
      </div>

      <div className="salary-card">
        <span>Day Salary</span>
        <h2>₩ {money(daySalary)}</h2>
      </div>

      <button className="save-btn">
        Save
      </button>

    </div>
  );
}<div className="monthly-card">
  <h3>June 2026 Summary</h3>

  <div className="summary-hours">
    <div><b>Regular</b><span>176 h</span></div>
    <div><b>OT</b><span>42.5 h</span></div>
    <div><b>Night</b><span>28.5 h</span></div>
    <div><b>Holiday</b><span>8 h</span></div>
  </div>

  <div className="money-row">
    <span>Gross Salary</span>
    <b>₩ 3,150,360</b>
  </div>

  <div className="money-row">
    <span>Deductions</span>
    <b>₩ 257,180</b>
  </div>

  <div className="money-row net">
    <span>Net Salary</span>
    <b>₩ 2,893,180</b>
  </div>
</div>

  function Calendar() {
    return (
      <div className="card">
        <h2>{months[month]} {year}</h2>

        <div className="weekdays">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span>
          <span>Thu</span><span>Fri</span><span>Sat</span>
        </div>

        <div className="days">
          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
            <button
              key={day}
              onClick={() => selectDay(day)}
              className={
                day === selectedDay
                  ? "day active"
                  : monthRecords[day]
                  ? "day saved"
                  : [7, 14, 21, 28].includes(day)
                  ? "day sunday"
                  : "day"
              }
            >
              {day}
            </button>
          ))}
        </div>
      </div>
    );
  }<div className="card">
  <h2>Selected Day: {selectedDay}</h2>

  <div className="grid-4">
    <div className="input-box">
      <label>Regular</label>
      <input
        type="number"
        value={regular}
        onChange={(e) => setRegular(Number(e.target.value))}
      />
    </div>

    <div className="input-box">
      <label>OT</label>
      <input
        type="number"
        value={ot}
        onChange={(e) => setOt(Number(e.target.value))}
      />
    </div>

    <div className="input-box">
      <label>Night</label>
      <input
        type="number"
        value={night}
        onChange={(e) => setNight(Number(e.target.value))}
      />
    </div>

    <div className="input-box">
      <label>Holiday</label>
      <input
        type="number"
        value={holiday}
        onChange={(e) => setHoliday(Number(e.target.value))}
      />
    </div>
  </div>

  <div className="salary-line">
    <span>Day Salary</span>
    <b>₩ {money(daySalary)}</b>
  </div>

  <button className="save-btn" onClick={saveDay}>
    Save Day
  </button>
</div>

  function DailyEntry() {
    return (
      <div className="card">
        <h2>Selected Day: {selectedDay}</h2>

        <div className="grid-4">
          <InputBox title="Regular" value={regular} setValue={setRegular} />
          <InputBox title="OT" value={ot} setValue={setOt} />
          <InputBox title="Night" value={night} setValue={setNight} />
          <InputBox title="Holiday" value={holiday} setValue={setHoliday} />
        </div>

        <div className="salary-line">
          <span>Day Salary</span>
          <b>₩ {money(daySalary)}</b>
        </div>

        <button className="save-btn" onClick={saveDay}>Save Day</button>
        <button className="delete-btn" onClick={deleteDay}>Delete Day</button>
      </div>
    );
  }

  function InputBox({ title, value, setValue }) {
    return (
      <div className="input-box">
        <label>{title}</label>
        <input
          type="number"
          step="0.5"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
        />
        <small>h</small>
      </div>
    );
  }

  function Summary() {
    return (
      <div className="card">
        <h2>{months[month]} {year} Summary</h2>

        <div className="mini-grid">
          <div><b>Regular</b><span>{totals.regular} h</span></div>
          <div><b>OT</b><span>{totals.ot} h</span></div>
          <div><b>Night</b><span>{totals.night} h</span></div>
          <div><b>Holiday</b><span>{totals.holiday} h</span></div>
        </div>

        <div className="summary-row"><span>Gross Salary</span><b>₩ {money(grossSalary)}</b></div>
        <div className="summary-row"><span>Estimated Deductions</span><b>₩ {money(deductions)}</b></div>
        <div className="net-row"><span>Net Salary</span><b>₩ {money(netSalary)}</b></div>
      </div>
    );
  }
function Reports() {
  const totalHours =
    totals.regular + totals.ot + totals.night + totals.holiday;

  return (
    <div className="card">
      <h2>Reports & Analytics</h2>

      <div className="mini-grid">
        <div>
          <b>Total Hours</b>
          <span>{totalHours} h</span>
        </div>

        <div>
          <b>Regular</b>
          <span>{totals.regular} h</span>
        </div>

        <div>
          <b>OT</b>
          <span>{totals.ot} h</span>
        </div>

        <div>
          <b>Night</b>
          <span>{totals.night} h</span>
        </div>
      </div>

      <div className="summary-row">
        <span>Gross Salary</span>
        <b>₩ {money(grossSalary)}</b>
      </div>

      <div className="summary-row">
        <span>Estimated Deductions</span>
        <b>₩ {money(deductions)}</b>
      </div>

      <div className="net-row">
        <span>Net Salary</span>
        <b>₩ {money(netSalary)}</b>
      </div>
    </div>
  );
}

  function History() {
  return (
    <div className="card">
      <h2>History</h2>

      {Object.keys(records).length === 0 ? (
        <p>No saved records yet.</p>
      ) : (
        Object.keys(records).map((month) => (
          <div className="history-row" key={month}>
            <span>{month}</span>
            <b>{Object.keys(records[month]).length} Days</b>
          </div>
        ))
      )}
    </div>
  );
}

 function Settings() {
  return (
    <div className="card">
      <h2>Settings</h2>

      <div className="summary-row">
        <span>Hourly Rate</span>
        <b>₩ {money(hourlyRate)}</b>
      </div>

      <div className="summary-row">
        <span>Currency</span>
        <b>KRW ₩</b>
      </div>

      <button
        className="delete-btn"
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Reset All Data
      </button>
    </div>
  );
}

  return (
    <div className="phone">
      <header>
        <h1>Korea Salary Tracker</h1>
      </header>

      <main>
        {page === "home" && <Home />}
        {page === "calendar" && (
  <div>
    <Calendar />
    <DailyEntry />
    <Summary />
  </div>
)}
        {page === "reports" && <Reports />}
        {page === "history" && <History />}
        {page === "settings" && <Settings />}
      </main>

     <button onClick={() => setPage("home")}>
  <FaHome />
  <br />
  Home
</button>

<button onClick={() => setPage("calendar")}>
  <FaCalendarAlt />
  <br />
  Calendar
</button>

<button onClick={() => setPage("reports")}>
  <FaChartBar />
  <br />
  Reports
</button>

<button onClick={() => setPage("history")}>
  <FaHistory />
  <br />
  History
</button>

<button onClick={() => setPage("settings")}>
  <FaCog />
  <br />
  Settings
</button> 
    </div>
  );
}

export default App;