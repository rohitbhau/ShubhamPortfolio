import React from "react";
import { Link } from "react-router-dom";
import "./dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="text-3xl font-bold text-blue-600">Task Management Dashboard</h1>
        <p className="mt-2 text-gray-700">Manage your tasks efficiently.</p>

        <div className="mt-5 flex gap-4">
          <Link to="/tasks" className="btn btn-blue">
            View Tasks
          </Link>
          <Link to="/tasks/add" className="btn btn-green">
            Add New Task
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
