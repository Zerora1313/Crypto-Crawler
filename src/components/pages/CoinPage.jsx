import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCoinDetail, getCoinChartData } from "../../api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CoinPage = () => {
  const { id } = useParams(); // URL se id milega (e.g. bitcoin)
  const [coinData, setCoinData] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      // 1. Coin ki details lao
      const detail = await getCoinDetail(id);
      setCoinData(detail);

      // 2. Chart ka data lao
      const graphData = await getCoinChartData(id);

      // Recharts ko data object format me chahiye hota h: { date: '...', price: ... }
      const formattedData = graphData.map((item) => ({
        date: new Date(item[0]).toLocaleDateString(), // Timestamp to Date
        price: item[1],
      }));

      setChartData(formattedData);
      setLoading(false);
    };

    fetchAllData();
  }, [id]);

  if (loading) return <h2 className="loading-text">Loading Chart...</h2>;
  if (!coinData) return <h2 className="loading-text">Data not found!</h2>;

  return (
    <div className="container">
      {/* Header Section */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "30px" }}>
        <img src={coinData.image.large} alt={coinData.name} height="80" />
        <div>
          <h1 style={{ margin: 0 }}>{coinData.name} ({coinData.symbol.toUpperCase()})</h1>
          <p style={{ marginTop: "10px", fontSize: "1.2rem" }}>
            Current Price: <span style={{ color: "#3498db", fontWeight: "bold" }}>
              ${coinData.market_data.current_price.usd.toLocaleString()}
            </span>
          </p>
        </div>
      </div>

      {/* Stats Cards (Simple CSS Grid) */}
      <div className="stats-grid">
        <div className="card">
          <h3>Market Cap</h3>
          <p>${coinData.market_data.market_cap.usd.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>24h High</h3>
          <p style={{ color: "green" }}>${coinData.market_data.high_24h.usd.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>24h Low</h3>
          <p style={{ color: "red" }}>${coinData.market_data.low_24h.usd.toLocaleString()}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="chart-container">
        <h2>Price History (1 Year)</h2>
        <div style={{ width: "100%", height: 400 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="date" hide />
              <YAxis domain={["auto", "auto"]} stroke="#ccc" />
              <Tooltip
                contentStyle={{ backgroundColor: "#333", border: "none" }}
                itemStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3498db"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CoinPage;