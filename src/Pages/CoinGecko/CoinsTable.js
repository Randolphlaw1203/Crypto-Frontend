import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CoinList } from '../../API';
import { CryptoState } from './CryptoContext';
import {
  Container,
  LinearProgress,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { numberWithCommas } from './Carousel';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: 'white',
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  fontFamily: "Montserrat",
}));

const StyledPagination = styled(Pagination)({
  "& .MuiPaginationItem-root": {
    color: 'gold',
  },
});

function CoinsTable() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { currency, symbol } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <Container style={{ textAlign: "center" }}>
      <Typography
        variant="h4"
        style={{ margin: 18, fontFamily: "Montserrat" }}
      >
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        label="Search For a Crypto Currency.."
        variant="outlined"
        style={{ marginBottom: 20, width: "100%" }}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
      />

      <TableContainer>
        {loading ? (
          <LinearProgress style={{ backgroundColor: "gold" }} />
        ) : (
          <Table>
            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                    }}
                    key={head}
                    align={head === "Coin" ? "left" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row.priceChangePercentage24h > 0;
                  return (
                    <StyledTableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          gap: 15,
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="50"
                          style={{ marginBottom: 10 }}
                        />
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          <span
                            style={{
                              color: 'black',
                              textTransform: "uppercase",
                              fontSize: 22,
                            }}
                          >
                            {row.symbol}
                          </span>
                          <span
                            style={{
                              color: 'black',
                            }}
                          >
                            {row.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: 'black',
                        }}
                      >
                        {symbol}{" "}
                        {numberWithCommas(row.currentPrice.toFixed(2))}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.priceChangePercentage24h.toFixed(2)}%
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: 'black',
                        }}
                      >
                        {symbol}{" "}
                        {numberWithCommas(
                          row.marketCap.toString().slice(0, -6)
                        )}
                        M
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <StyledPagination
        count={(handleSearch()?.length / 10)}
        style={{
          padding: 20,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 200);
        }}
      >
      </StyledPagination>
    </Container >
  );
}

export default CoinsTable;