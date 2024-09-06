import {
  Box,
  LinearProgress,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "../../Components/Navbar";
import { CryptoState } from "./CryptoContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { SingleCoin } from "../../API";
import CoinInfo from "./CoinInfo";
import { numberWithCommas } from "./Carousel";
import SideMenu from "../../Components/SideMenu";

const StyledTypography = styled(Typography)({
  flex: 1,
  color: "gold",
  fontFamily: "Montserrat",
  fontWeight: "bold",
  cursor: "pointer",
});

const StyledContainer = styled('div')(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Sidebar = styled('div')(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
}));

const Heading = styled(Typography)({
  fontWeight: "bold",
  marginBottom: 20,
  fontFamily: "Montserrat",
});

const Description = styled(Typography)({
  width: "100%",
  fontFamily: "Montserrat",
  padding: 25,
  paddingBottom: 15,
  paddingTop: 0,
  textAlign: "justify",
});

const MarketData = styled('div')(({ theme }) => ({
  alignSelf: "start",
  padding: 25,
  paddingTop: 10,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "space-around",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
  [theme.breakpoints.down("xs")]: {
    alignItems: "start",
  },
}));

function CoinPage() {
  const { currency, setCurrency, symbol } = CryptoState();
  const navigate = useNavigate();
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div>
      <Navbar />
      <Box height={40} />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2
          }}>
            <StyledTypography
              variant="h4"
              onClick={() => navigate(`/coingecko`)}
            >
              CoinGecko
            </StyledTypography>
            <Select
              variant="outlined"
              sx={{
                width: 100,
                height: 40,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="HKD">HKD</MenuItem>
            </Select>
          </Box>
          <StyledContainer>
            <Sidebar>
              <img
                src={coin?.image.large}
                alt={coin?.name}
                height="200"
                style={{ marginBottom: 20 }}
              />
              <Heading variant="h3">
                {coin?.name}
              </Heading>
              <Description variant="subtitle1">
                {(coin?.description.en.split(". ")[0])}.
              </Description>
              <MarketData>
                <span style={{ display: "flex" }}>
                  <Heading variant="h5">
                    Rank:
                  </Heading>
                  &nbsp; &nbsp;
                  <Typography
                    variant="h5"
                    style={{
                      fontFamily: "Montserrat",
                    }}
                  >
                    {(coin?.market_cap_rank)}
                  </Typography>
                </span>
                <span style={{ display: "flex" }}>
                  <Heading variant="h5">
                    Current Price:
                  </Heading>
                  &nbsp; &nbsp;
                  <Typography
                    variant="h5"
                    style={{
                      fontFamily: "Montserrat",
                    }}
                  >
                    {symbol}{" "}
                    {numberWithCommas(
                      coin?.market_data.current_price[currency.toLowerCase()]
                    )}
                  </Typography>
                </span>
                <span style={{ display: "flex" }}>
                  <Heading variant="h5">
                    Market Cap:
                  </Heading>
                  &nbsp; &nbsp;
                  <Typography
                    variant="h5"
                    style={{
                      fontFamily: "Montserrat",
                    }}
                  >
                    {symbol}{" "}
                    {numberWithCommas(
                      coin?.market_data.market_cap[currency.toLowerCase()]
                        .toString()
                        .slice(0, -6)
                    )}
                    M
                  </Typography>
                </span>
              </MarketData>
            </Sidebar>
            <CoinInfo coin={coin} />
          </StyledContainer>
        </Box>
      </Box>
    </div>
  );
}

export default CoinPage;