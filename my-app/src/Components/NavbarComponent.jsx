import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

const NavbarComponent = ({ isAuthenticated, onLogin, onLogout }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="w-100">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">Task Manager</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
          <Nav.Link as={Link} to="/tasks">Task List</Nav.Link>
          <Nav.Link as={Link} to="/add">Add Task</Nav.Link>
          <Nav.Link as={Link} to="/team">My Team</Nav.Link> {/* Added My Team */}
          {isAuthenticated ? (
            <Button variant="danger" onClick={onLogout} className="ms-3">
              Logout
            </Button>
          ) : (
            <Button variant="success" onClick={onLogin} className="ms-3">
              Login
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
