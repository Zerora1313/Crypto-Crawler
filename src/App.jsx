import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "./pages/Home";
import { CoinDetail } from "./pages/CoinDetail";

function App() {
  return (
    <BrowserRouter>
    {/* is project me 2 pages h isiliye react se 2 routes bna diye h  */}
    {/* jis route pe janege wo page render ho jajega */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coin/:id" element={<CoinDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;