import { Box, CssBaseline } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SideNavBar from "./components/SideNavBar";
import HomePage from "./HomePage";
import ListDarumaPage from "./ListDarumaPage";
import './App.css';

function App(){
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <SideNavBar />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/list" element={<ListDarumaPage />} />
        </Routes>
      </Box>
    </Router>
  )
}

export default App;