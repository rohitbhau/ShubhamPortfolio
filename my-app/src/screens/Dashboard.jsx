import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom"; // Import navigate hook

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = ({ tasks }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const navigate = useNavigate(); // Initialize navigate
  const user = JSON.parse(localStorage.getItem("user")); // Get logged-in user info

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formattedDateTime = currentDateTime.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const totalTasks = tasks.length;

  const statusCount = tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    { Pending: 0, "In Progress": 0, Completed: 0 }
  );

  const statusChartData = Object.keys(statusCount).map((status, index) => ({
    name: status,
    value: statusCount[status],
    color: COLORS[index % COLORS.length],
  }));

  const taskTypeCount = tasks.reduce((acc, task) => {
    acc[task.taskType] = (acc[task.taskType] || 0) + 1;
    return acc;
  }, {});

  const taskTypeChartData = Object.keys(taskTypeCount).map((key, index) => ({
    name: key,
    value: taskTypeCount[key],
    color: COLORS[index % COLORS.length],
  }));

  const roleCount = tasks.reduce((acc, task) => {
    acc[task.role] = (acc[task.role] || 0) + 1;
    return acc;
  }, { Frontend: 0, Backend: 0, Design: 0, Testing: 0, "Not Allocated": 0 });

  const roleChartData = Object.keys(roleCount).map((role, index) => ({
    name: role,
    value: roleCount[role],
    color: COLORS[index % COLORS.length],
  }));

  const percentage = (count) =>
    totalTasks > 0 ? ((count / totalTasks) * 100).toFixed(1) : 0;

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear the user data from localStorage
    navigate("/"); // Redirect to login page
  };

  return (
    <Container fluid className="mt-4">
      {/* Dashboard Header with Date and Time */}
      <Row className="mb-4 align-items-center">
        <Col xs={6}>
          <h2 className="text-primary">Dashboard</h2>
        </Col>
        <Col xs={6} className="text-end">
          <h5 className="text-muted">{formattedDateTime}</h5>
        </Col>
      </Row>

      {/* User Info and Logout Button */}
      <Row className="mb-4">
        <Col xs={12} className="text-end">
          {user && (
            <div>
              <span className="me-3">{user.email}</span>
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </div>
          )}
        </Col>
      </Row>

      {/* Summary Cards */}
      <Row className="mb-4 d-flex justify-content-center">
        <Col md={3} sm={6} xs={12} className="mb-3">
          <Card className="shadow-lg p-3 text-center">
            <h6 className="text-muted">Total Tasks</h6>
            <h2 className="text-success fw-bold">{totalTasks}</h2>
            <span className="text-primary">Assign to Team</span>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12} className="mb-3">
          <Card className="shadow-lg p-3 text-center">
            <h6 className="text-muted">Completed</h6>
            <h2 className="text-primary fw-bold">{statusCount.Completed}</h2>
            <span className="text-primary">{percentage(statusCount.Completed)}%</span>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12} className="mb-3">
          <Card className="shadow-lg p-3 text-center">
            <h6 className="text-muted">In Progress</h6>
            <h2 className="text-warning fw-bold">{statusCount["In Progress"]}</h2>
            <span className="text-warning">{percentage(statusCount["In Progress"])}%</span>
          </Card>
        </Col>
        <Col md={3} sm={6} xs={12} className="mb-3">
          <Card className="shadow-lg p-3 text-center">
            <h6 className="text-muted">Pending</h6>
            <h2 className="text-danger fw-bold">{statusCount.Pending}</h2>
            <span className="text-danger">{percentage(statusCount.Pending)}%</span>
          </Card>
        </Col>
      </Row>

      {/* Pie Charts */}
      <Row className="d-flex justify-content-center">
        <Col md={4} className="mb-3">
          <Card className="shadow-lg p-3 text-center">
            <h5>Task Type Distribution</h5>
            <PieChart width={300} height={300}>
              <Pie data={taskTypeChartData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {taskTypeChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="shadow-lg p-3 text-center">
            <h5>Task Status Distribution</h5>
            <PieChart width={300} height={300}>
              <Pie data={statusChartData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {statusChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </Col>

        <Col md={4} className="mb-3">
          <Card className="shadow-lg p-3 text-center">
            <h5>Role Distribution</h5>
            <PieChart width={300} height={300}>
              <Pie data={roleChartData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {roleChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
