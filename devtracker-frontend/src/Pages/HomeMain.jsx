import React from "react";
// import Blog from './Blog';      // Adjust path if needed
import Track from "./Track"; // Adjust path if needed
import Home from "./Home";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const HomeMain = () => (
  <div>
    <Header />
    <Home />
    <Track />
    <Footer />
  </div>
);

export default HomeMain;
