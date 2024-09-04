import { Box, Typography } from "@mui/material";
import SideMenu from "../../Components/SideMenu";
import Navbar from "../../Components/Navbar";

function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <Box height={40} />
      <Box sx={{ display: 'flex' }}>
        <SideMenu></SideMenu>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4">Home</Typography>
        </Box>
      </Box>
    </div>
  )

} export default Home;