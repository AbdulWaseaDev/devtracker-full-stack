import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./Components/Main";
import Header from "./Components/Header";
// import Home from './Pages/Home';
import Blog from "./Pages/Blog";
import Profile from "./Pages/Profile";
import Track from "./Pages/Track.jsx";
import Footer from "./Components/Footer";
import HomeMain from "./Pages/HomeMain.jsx";
import BlogPost from "./Pages/BlogPost.jsx";

const NavScrollExample = () => {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/home" element={<HomeMain />} />
        <Route path="/blog/:user?" element={<Blog />} />
        <Route path="/blog/:user?/:slug?" element={<BlogPost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/track" element={<Track />} />
      </Routes>

      <Footer />
    </Router>
  );
};

export default NavScrollExample;
