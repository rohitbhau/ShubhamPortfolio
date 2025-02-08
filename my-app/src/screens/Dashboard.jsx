import React from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = ({ tasks }) => {
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

  return (
    <Container fluid className="mt-4">
      <h2 className="text-primary mb-4">Dashboard</h2>

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
