import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

const NavbarComponent = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">Task Manager</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto d-flex gap-3 align-items-center"> {/* Fixed spacing */}
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/tasks">Task List</Nav.Link>
            <Nav.Link as={Link} to="/add">Add Task</Nav.Link>
            <Nav.Link as={Link} to="/team">My Team</Nav.Link>
            {isAuthenticated ? (
              <Button variant="danger" onClick={onLogout}>
                Logout
              </Button>
            ) : (
              <Button variant="success" onClick={handleLogin}>
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
