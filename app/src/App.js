import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideNavBar from "./components/SideNavBar";
import HomePage from "./HomePage";
import ListDarumaPage from "./ListDarumaPage";
import CreationPage from "./CreationPage";
import withSplashScreen from "./components/splashScreen/withSplashScreen";
import "./App.css";

function App() {
  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <SideNavBar />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/list' element={<ListDarumaPage />} />
          <Route exact path='/create' element={<CreationPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default withSplashScreen(App);
