import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaBell,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
  FaTachometerAlt,
} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      {/* LEFT + CENTER (merged) */}
      <div className="navbar-left">
        <Link to="/" className="logo">
          Admin Panel
        </Link>
        <input type="text" placeholder="Search..." className="search-input" />
        <Link to="/dashboard" className="nav-link">
          <FaTachometerAlt className="icon" /> Dashboard
        </Link>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        <FaBell className="icon" title="Notifications" />
        <div
          className="profile"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          ref={dropdownRef}
        >
          <FaUserCircle className="icon user-icon" />
          <span className="username">Admin</span>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <FaCog className="dropdown-icon" /> Settings
              </div>
              <div className="dropdown-item">
                <FaSignOutAlt className="dropdown-icon" /> Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
