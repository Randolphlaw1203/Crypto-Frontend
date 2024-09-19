import { Box, Typography, TextField, styled } from "@mui/material";
import SideMenu from "../../Components/SideMenu";
import Navbar from "../../Components/Navbar";
import { useState } from "react";

const StyledTypography = styled(Typography)({
  flex: 1,
  color: "gold",
  fontFamily: "Montserrat",
  fontWeight: "bold",
});

function Finnhub() {
  const [symbol, setSymbol] = useState('');
  const [price, setPrice] = useState(null);

  const handleInputChange = (e) => {
    setSymbol(e.target.value.toUpperCase());
  };

  const handleSubscribe = () => {
    const ws = new WebSocket('ws://localhost:8086/trades');

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      ws.send(JSON.stringify({ type: 'subscribe', symbol }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'trade') {
        setPrice(message.data[0].p);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubscribe();
    }
  };

  return (
    <div>
      <Navbar />
      <Box height={40} />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <StyledTypography variant="h4">Finnhub US Market Data</StyledTypography>
          <Box mt={3}>
            <TextField
              label="Enter symbol"
              variant="outlined"
              style={{ marginBottom: 20, marginRight: 20, width: "30%" }}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
          </Box>
          <Typography>{symbol} Price: {price !== null ? `$${price}` : 'N/A'}</Typography>
        </Box>
      </Box>
    </div>
  )
}

export default Finnhub;