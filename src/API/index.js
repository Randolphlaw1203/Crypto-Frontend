import axios from 'axios';

export const CoinList = (currency) => {
  return axios.get(`http://localhost:8085/crypto/coingecko/api/v1/coins?currency=${currency}`)
    .then(response => response.data);
}

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
