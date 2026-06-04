import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [prices, setPrices] = useState({});

  const aaveQty = 12;
  const compQty = 32.77;
  const aaveBuy = 89;
  const compBuy = 23;

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,aave,compound-governance-token&vs_currencies=usd")
      .then((res) => setPrices(res.data));
  }, []);

  const aaveNow = prices.aave?.usd || 0;
  const compNow = prices["compound-governance-token"]?.usd || 0;

  const aaveValue = aaveNow * aaveQty;
  const compValue = compNow * compQty;
  const portfolioValue = aaveValue + compValue;

  const invested = aaveQty * aaveBuy + compQty * compBuy;
  const totalPL = portfolioValue - invested;

  const aavePL = aaveValue - aaveQty * aaveBuy;
  const compPL = compValue - compQty * compBuy;

  const aavePercent = portfolioValue ? (aaveValue / portfolioValue) * 100 : 0;
  const compPercent = portfolioValue ? (compValue / portfolioValue) * 100 : 0;

  const marketCoins = [
    ["₿ BTC", "bitcoin"],
    ["♦ ETH", "ethereum"],
    ["◎ SOL", "solana"],
  ];

  return (
    <div style={{ background: "#111", minHeight: "100vh", color: "white", padding: "20px", textAlign: "center" }}>
      <h1>🚀 CHINGU Crypto</h1>

      <div style={{ background: "#222", padding: "20px", borderRadius: "16px", marginBottom: "20px" }}>
        <h2>💰 Portfolio</h2>
        <h1>${portfolioValue.toFixed(2)}</h1>
        <p>Invested: ${invested.toFixed(2)}</p>
        <h3 style={{ color: totalPL >= 0 ? "#00ff88" : "#ff4d4d" }}>
          Total P/L: ${totalPL.toFixed(2)}
        </h3>

        <h3>📊 Holdings</h3>

        <p>AAVE ${aaveValue.toFixed(2)}</p>
        <div style={{ background: "#333", borderRadius: "20px", overflow: "hidden" }}>
          <div style={{ width: `${aavePercent}%`, background: "#00ff88", padding: "10px" }}>
            {aavePercent.toFixed(1)}%
          </div>
        </div>

        <p>COMP ${compValue.toFixed(2)}</p>
        <div style={{ background: "#333", borderRadius: "20px", overflow: "hidden" }}>
          <div style={{ width: `${compPercent}%`, background: "#FFD700", color: "#111", padding: "10px" }}>
            {compPercent.toFixed(1)}%
          </div>
        </div>
      </div>

      <div style={{ background: "#1c1c1c", padding: "15px", borderRadius: "14px", marginBottom: "15px" }}>
        <h3>👻 AAVE Details</h3>
        <p>Qty: {aaveQty}</p>
        <p>Buy: ${aaveBuy}</p>
        <p>Now: ${aaveNow}</p>
        <h3 style={{ color: aavePL >= 0 ? "#00ff88" : "#ff4d4d" }}>P/L: ${aavePL.toFixed(2)}</h3>
      </div>

      <div style={{ background: "#1c1c1c", padding: "15px", borderRadius: "14px", marginBottom: "20px" }}>
        <h3>🏦 COMP Details</h3>
        <p>Qty: {compQty}</p>
        <p>Buy: ${compBuy}</p>
        <p>Now: ${compNow}</p>
        <h3 style={{ color: compPL >= 0 ? "#00ff88" : "#ff4d4d" }}>P/L: ${compPL.toFixed(2)}</h3>
      </div>

      <h2>📈 Market Prices</h2>

      {marketCoins.map(([symbol, id]) => (
        <div key={id} style={{ background: "#222", padding: "15px", borderRadius: "12px", marginTop: "15px" }}>
          <h3>{symbol}</h3>
          <p>${prices[id]?.usd || "Loading..."}</p>
        </div>
      ))}
    </div>
  );
}

export default App;