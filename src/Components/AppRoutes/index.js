import { Route, Routes } from "react-router-dom";
import CoinGecko from "../../Pages/CoinGecko";
import Home from "../../Pages/Home";
import Finnhub from "../../Pages/Finnhub";
import CoinPage from "../../Pages/CoinGecko/CoinPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/coingecko" element={<CoinGecko />}></Route>
      <Route path="/coins/:id" element={<CoinPage />}></Route>
      <Route path="/finnhub" element={<Finnhub />}></Route>
    </Routes>
  )
} export default AppRoutes;