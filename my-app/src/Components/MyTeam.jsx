import React, { useState } from "react";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Form,
  ListGroup,
  Badge,
  Accordion,
} from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useNavigate } from "react-router-dom";

const COLORS = ["#28a745", "#ffc107", "#dc3545"]; // Green, Yellow, Red for performance

const getColor = (performance) => {
  return performance >= 80 ? COLORS[0] : performance >= 60 ? COLORS[1] : COLORS[2];
};

const MyTeam = () => {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Alice Johnson", role: "Frontend Developer", email: "alice@example.com", performance: 85, tasks: [] },
    { id: 2, name: "Bob Smith", role: "Backend Developer", email: "bob@example.com", performance: 70, tasks: [] },
    { id: 3, name: "Charlie Brown", role: "UI/UX Designer", email: "charlie@example.com", performance: 55, tasks: [] },
  ]);

  const [newMember, setNewMember] = useState({ name: "", role: "", email: "", performance: 0 });

  const handleAddMember = () => {
    if (!newMember.name || !newMember.role || !newMember.email) return;
    setTeamMembers([...teamMembers, { id: Date.now(), ...newMember, tasks: [] }]);
    setNewMember({ name: "", role: "", email: "", performance: 0 });
  };

  return (
    <Container className="mt-4">
      <h2 className="text-primary mb-4">My Team</h2>

      {/* Add Member Form */}
      <Row className="mb-4 d-flex align-items-end">
  <Col md={3}>
    <Form.Group>
      <Form.Label>Name</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter name"
        value={newMember.name}
        onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
        style={{ height: "36px" }} // Matching input height
      />
    </Form.Group>
  </Col>

  <Col md={3}>
    <Form.Group>
      <Form.Label>Role</Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter role"
        value={newMember.role}
        onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
        style={{ height: "36px" }} // Matching input height
      />
    </Form.Group>
  </Col>

  <Col md={3}>
    <Form.Group>
      <Form.Label>Email</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter email"
        value={newMember.email}
        onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
        style={{ height: "36px" }} // Matching input height
      />
    </Form.Group>
  </Col>

  {/* 🔥 Fix: Ensure button is small and aligned properly */}
  <Col md={3} className="d-flex justify-content-end align-items-end">
    <Button variant="success" size="sm" onClick={handleAddMember}>
      Add Member
    </Button>
  </Col>
</Row>



      {/* Team Members List */}
      <Row>
        {teamMembers.map((member) => (
          <Col md={4} key={member.id} className="mb-4">
            <Card className="shadow-sm p-3 text-center">
              <Card.Body>
                <h5>{member.name}</h5>
                <p className="text-muted">{member.role}</p>
                <p>
                  <a href={`mailto:${member.email}`} className="text-decoration-none">{member.email}</a>
                </p>

                {/* Performance Pie Chart */}
                <PieChart width={100} height={100}>
                  <Pie
                    data={[
                      { name: "Completed", value: member.performance },
                      { name: "Remaining", value: 100 - member.performance }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={40}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    <Cell fill={getColor(member.performance)} />
                    <Cell fill="#e9ecef" />
                  </Pie>
                  <Tooltip />
                </PieChart>
                <p className="fw-bold">{member.performance}% Performance</p>

                {/* Assign Task Button (Navigates to TaskAdd page) */}
                <Button
                  variant="primary"
                  className="mt-2"
                  onClick={() => navigate(`/assign-task/${member.id}`)}
                >
                  Assign Task
                </Button>

                {/* Task List */}
                <Accordion className="mt-3">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Tasks</Accordion.Header>
                    <Accordion.Body>
                      {member.tasks.length > 0 ? (
                        <ListGroup>
                          {member.tasks.map((task, index) => (
                            <ListGroup.Item key={index}>{task.task}</ListGroup.Item>
                          ))}
                        </ListGroup>
                      ) : (
                        <p>No tasks assigned.</p>
                      )}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyTeam;
