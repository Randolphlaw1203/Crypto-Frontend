import {
  Box,
  Container,
  createTheme,
  MenuItem,
  Select,
  ThemeProvider,
  Typography
} from "@mui/material";
import { styled } from "@mui/system";
import SideMenu from "../../Components/SideMenu";
import Navbar from "../../Components/Navbar";
import { CryptoState } from "../../Components/CryptoContext";
import Carousel from "./Carousel";

const StyledTypography = styled(Typography)({
  flex: 1,
  color: "gold",
  fontFamily: "Montserrat",
  fontWeight: "bold",
});

const themeMode = 'light';
console.log('Coinpagemode:' + themeMode)
const mtheme = createTheme({
  palette: {
    mode: themeMode,
  }
});

function CoinGecko() {
  const { currency, setCurrency } = CryptoState();
  console.log(currency)

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
          }}
          >
            <StyledTypography variant="h4">CoinGecko</StyledTypography>
            <ThemeProvider theme={mtheme}>
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
                <MenuItem value="CNY">CNY</MenuItem>
              </Select>
            </ThemeProvider>
          </Box>
          <Container>
            <Carousel />
          </Container>
        </Box>
      </Box>
    </div>
  );
}

export default CoinGecko;