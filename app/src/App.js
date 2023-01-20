import { Box, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideNavBar from "./components/SideNavBar";
import HomePage from "./pages/home/HomePage";
import ListDarumaPage from "./pages/list/ListDarumaPage";
import CreationPage from "./pages/creation/CreationPage";
import withSplashScreen from "./components/splashScreen/withSplashScreen";
import "./App.css";
import { supabase } from "./lib/api";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "./store/slice/AuthSlice";
import LoginPage from "./pages/authentication/LoginPage";
import ProfilPage from "./pages/profil/ProfilPage";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getSession() {
      const session = await supabase.auth.getSession();
      const currentUser = session.data?.session?.user;
      dispatch(setUser(currentUser ?? null));
    }
    getSession();
    const res = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user;
      dispatch(setUser(currentUser ?? null));
    });

    return () => {
      res.data.subscription.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <SideNavBar />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/list' element={<ListDarumaPage />} />
          <Route exact path='/create' element={<CreationPage />} />
          <Route exact path='/login' element={<LoginPage />} />
          <Route exact path='/profil' element={<ProfilPage />} />
        </Routes>
      </Box>
    </Router>
  );
}

export default withSplashScreen(App);
