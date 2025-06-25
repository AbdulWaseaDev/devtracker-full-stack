// import React from 'react';

import "./Dashboard.css";

import { FaUsers, FaDollarSign, FaChartLine } from "react-icons/fa";

const Dashboard = () => {
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
