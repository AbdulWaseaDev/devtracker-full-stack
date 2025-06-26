import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUsers, FaDollarSign, FaChartLine } from "react-icons/fa";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/me", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/dashboard/login");
          throw new Error("Redirecting to login...");
        }
        if (!res.ok) throw new Error("Submission failed");
        return res.json();
      })
      .catch((err) => {
        console.error("Auth error:", err);
        // already redirected on error
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <span className="spinner-border"></span> Loading...
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard Overview</h2>

      <div className="dashboard-cards">
        <div className="card">
          <FaUsers className="card-icon" />
          <div>
            <h3>1,200</h3>
            <p>Users</p>
          </div>
        </div>
        <div className="card">
          <FaDollarSign className="card-icon" />
          <div>
            <h3>$25,400</h3>
            <p>Revenue</p>
          </div>
        </div>
        <div className="card">
          <FaChartLine className="card-icon" />
          <div>
            <h3>85%</h3>
            <p>Performance</p>
          </div>
        </div>
      </div>

      <div className="dashboard-graph">
        <h3>Sales Performance</h3>
        <div className="graph-placeholder">
          <p>Graph will go here</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
