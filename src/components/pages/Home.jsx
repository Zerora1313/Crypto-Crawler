import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Page change krne ke liye
import { getCoinList } from "../../api";     // Humara API function

const Home = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  // Jab page load ho, tab data lao
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCoinList();
      setCoins(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <h2 className="loading-text">Loading Coins...</h2>;

  return (
    <div className="container">
      <h1>Crypto Market Today</h1>
      <table className="coin-table">
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price (USD)</th>
            <th>Change (24h)</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin) => (
            <tr key={coin.id}>
              <td>
                <Link to={`/coin/${coin.id}`} className="coin-link">
                  <img src={coin.image} alt={coin.name} width="25" />
                  <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
                </Link>
              </td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td style={{ color: coin.price_change_percentage_24h > 0 ? "green" : "red" }}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td>${coin.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;