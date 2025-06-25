import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Main from "./Components/Main.jsx";
import Header from "./Components/Header.jsx";
import Blog from "./Pages/Blog.jsx";
import Profile from "./Pages/Profile.jsx";
import Track from "./Pages/Track.jsx";
import Footer from "./Components/Footer.js";
import HomeMain from "./Pages/HomeMain.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Navbar from "./Components/Navbar.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import Register from "./Pages/Register.jsx";
import Users from "./Pages/Users.jsx";
import ManageUserPage from "./Pages/ManageUserPage.jsx";
import LoginForm from "./Components/LoginForm.jsx";

const AppContent = () => {
  const location = useLocation();

  // Hide Header and Footer ONLY on exact "/dashboard"
  const hideHeaderFooter = location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {hideHeaderFooter && <Sidebar />}

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<HomeMain />} />
        <Route path="/blog/:user?" element={<Blog />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/track" element={<Track />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/navbar" element={<Navbar />} />
        <Route path="/dashboard/user/register" element={<Register />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/manageuserpage" element={<ManageUserPage />} />
        <Route path="/dashboard/login" element={<LoginForm />} />
      </Routes>

      {!hideHeaderFooter && <Footer />}
    </>
  );
};

const NavScrollExample = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default NavScrollExample;
