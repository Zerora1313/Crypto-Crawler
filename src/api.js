import axios from "axios";

const BASE_URL = "https://api.coingecko.com/api/v3";

// 1. List laane ke liye (Pehle se tha)
export const getCoinList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 20,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coin list:", error);
    return [];
  }
};

// 2. Chart Data laane ke liye (Pehle se tha)
export const getCoinChartData = async (coinId) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${coinId}/market_chart`, {
      params: {
        vs_currency: "usd",
        days: "365", // 1 saal ka chart
      },
    });
    return response.data.prices; // Ye array of [timestamp, price] return karta h
  } catch (error) {
    console.error("Error fetching chart data:", error);
    return [];
  }
};

// 3. [NEW] Single Coin ki Details laane ke liye
export const getCoinDetail = async (coinId) => {
  try {
    const response = await axios.get(`${BASE_URL}/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching coin detail:", error);
    return null;
  }
};