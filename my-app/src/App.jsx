import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavbarComponent from "./components/NavbarComponent"; // Import Navbar
import TaskList from "./screens/TaskList";
import TaskAdd from "./screens/TaskAdd";
import Dashboard from "./screens/Dashboard";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <NavbarComponent isAuthenticated={isAuthenticated} onLogin={handleLogin} onLogout={handleLogout} />
      
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskList tasks={tasks} onDelete={handleDeleteTask} />} />
          <Route path="/add" element={<TaskAdd onAdd={handleAddTask} />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
