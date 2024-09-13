export const CoinList = (currency) =>
  `http://localhost:8085/crypto/coingecko/api/v1/coins?currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`

export const SingleCoin = (id) =>
  `http://localhost:8085/crypto/coingecko/api/v1/coin/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `http://localhost:8085/crypto/coingecko/api/v1/coin/${id}/market_chart?currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `http://localhost:8085/crypto/coingecko/api/v1/coins?currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;