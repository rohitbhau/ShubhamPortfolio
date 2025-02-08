import React, { useState } from "react";
import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";

const MyTeam = () => {
  const [teamMembers, setTeamMembers] = useState([
    { id: 1, name: "Alice Johnson", role: "Frontend Developer", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", role: "Backend Developer", email: "bob@example.com" },
    { id: 3, name: "Charlie Brown", role: "UI/UX Designer", email: "charlie@example.com" },
  ]);

  const [newMember, setNewMember] = useState({ name: "", role: "", email: "" });

  // Add a new team member
  const handleAddMember = () => {
    if (!newMember.name || !newMember.role || !newMember.email) return;
    setTeamMembers([...teamMembers, { id: Date.now(), ...newMember }]);
    setNewMember({ name: "", role: "", email: "" });
  };

  // Remove a member
  const handleRemoveMember = (id) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  return (
    <Container className="mt-4">
      <h2 className="text-primary mb-4">My Team</h2>

      {/* Add Member Form */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
          />
        </Col>
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Role"
            value={newMember.role}
            onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
          />
        </Col>
        <Col md={4}>
          <Form.Control
            type="email"
            placeholder="Email"
            value={newMember.email}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
          />
        </Col>
        <Col className="mt-2">
          <Button variant="success" onClick={handleAddMember}>
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
                <p>{member.email}</p>
                <Button
                  variant="primary"
                  href={`mailto:${member.email}`}
                  className="me-2"
                >
                  Send Mail
                </Button>
                <Button variant="danger" onClick={() => handleRemoveMember(member.id)}>
                  Remove
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MyTeam;
