import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AnimatePresence } from "framer-motion";
import theme from "./theme/theme";
import { UserProvider } from "./context/UserContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LessonPage from "./pages/LessonPage";
import Profile from "./pages/Profile";
import LessonsRepository from "./pages/LessonsRepository";
import Box from "@mui/material/Box";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Router>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navigation />
            <Box sx={{ flexGrow: 1 }}>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/lesson/:id" element={<LessonPage />} />
                  <Route path="/lessons" element={<LessonsRepository />} />
                </Routes>
              </AnimatePresence>
            </Box>
            <Footer />
          </Box>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
