import React from "react";
import "./App.css";

function App() {
  const balance = 125000;
  const transactions = [
    { name: "CU Store", amount: -4500 },
    { name: "Salary", amount: 250000 },
    { name: "Bus Card", amount: -1450 },
  ];

  return (
    <div className="app">
      <h1>🇰🇷 Korean Pay</h1>

      <div className="card">
        <p>My Balance</p>
        <h2>₩{balance.toLocaleString()}</h2>
      </div>

      <div className="buttons">
        <button>📷 QR Pay</button>
        <button>💸 Send Money</button>
      </div>

      <h3>Transactions</h3>
      {transactions.map((t, i) => (
        <div className="tx" key={i}>
          <span>{t.name}</span>
          <b>{t.amount > 0 ? "+" : ""}₩{t.amount.toLocaleString()}</b>
        </div>
      ))}
    </div>
  );
}

export default App;