import { Route, Routes } from "react-router-dom";
import CoinGecko from "../../Pages/CoinGecko";
import Finnhub from "../../Pages/Finnhub";
import CoinPage from "../../Pages/CoinGecko/CoinPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CoinGecko />}></Route>
      <Route path="/coins/:id" element={<CoinPage />}></Route>
      <Route path="/finnhub" element={<Finnhub />}></Route>
    </Routes>
  )
} export default AppRoutes;