import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavbarComponent from "./components/NavbarComponent"; 
import TaskList from "./screens/TaskList";
import TaskAdd from "./screens/TaskAdd";
import Dashboard from "./screens/Dashboard"; 
import "./App.css";
import MyTeam from "./components/MyTeam";


const App = () => {
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, status: "Pending" }]); // Default status: Pending
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleUpdateStatus = (index, newStatus) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <Router>
      <NavbarComponent />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Dashboard tasks={tasks} />} /> 
          <Route path="/tasks" element={<TaskList tasks={tasks} onDelete={handleDeleteTask} onUpdateStatus={handleUpdateStatus} />} />
          <Route path="/add" element={<TaskAdd onAdd={handleAddTask} />} />
          <Route path="/team" element={<MyTeam />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
