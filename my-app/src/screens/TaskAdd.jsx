import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles

const TaskAdd = ({ onAdd }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignDate: null,
    completionDate: null,
    startTime: "",
    endTime: "",
    allocatedPerson: "",
    taskType: "",
    role: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.description || !task.assignDate || !task.completionDate || !task.startTime || !task.endTime || !task.allocatedPerson || !task.taskType || !task.role)
      return;
    onAdd(task);
    setTask({
      title: "",
      description: "",
      assignDate: null,
      completionDate: null,
      startTime: "",
      endTime: "",
      allocatedPerson: "",
      taskType: "",
      role: "",
      status: "Pending",
    });
  };

  return (
    <div className="task-container">
      <h2 className="text-success mb-3">Add Task</h2>
      <Form onSubmit={handleSubmit} className="p-3 shadow-sm bg-light rounded">
        {/* Task Title */}
        <Form.Group className="mb-3">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
          />
        </Form.Group>

        {/* Task Description */}
        <Form.Group className="mb-3">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={task.description}
            onChange={handleChange}
            placeholder="Enter task details"
            rows={3}
            required
          />
        </Form.Group>

        {/* Assign Date & Completion Date */}
        <div className="d-flex gap-3">
          <Form.Group className="mb-3 w-50">
            <Form.Label>Assign Date</Form.Label>
            <DatePicker
              selected={task.assignDate}
              onChange={(date) => setTask({ ...task, assignDate: date })}
              className="form-control"
              dateFormat="yyyy-MM-dd"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 w-50">
            <Form.Label>Completion Date</Form.Label>
            <DatePicker
              selected={task.completionDate}
              onChange={(date) => setTask({ ...task, completionDate: date })}
              className="form-control"
              dateFormat="yyyy-MM-dd"
              required
            />
          </Form.Group>
        </div>

        {/* Time Duration (Start Time - End Time) */}
        <div className="d-flex gap-3">
          <Form.Group className="mb-3 w-50">
            <Form.Label>Start Time</Form.Label>
            <Form.Control
              type="time"
              name="startTime"
              value={task.startTime}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 w-50">
            <Form.Label>End Time</Form.Label>
            <Form.Control
              type="time"
              name="endTime"
              value={task.endTime}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </div>

        {/* Allocated Person */}
        <Form.Group className="mb-3">
          <Form.Label>Allocated Person</Form.Label>
          <Form.Control
            type="text"
            name="allocatedPerson"
            value={task.allocatedPerson}
            onChange={handleChange}
            placeholder="Enter name"
            required
          />
        </Form.Group>

        {/* Task Type */}
        <Form.Group className="mb-3">
          <Form.Label>Task Type</Form.Label>
          <Form.Select name="taskType" value={task.taskType} onChange={handleChange} required>
            <option value="">Select Task Type</option>
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
            <option value="Design">Design</option>
            <option value="Documentation">Documentation</option>
          </Form.Select>
        </Form.Group>

        {/* Role Field */}
        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select name="role" value={task.role} onChange={handleChange} required>
            <option value="">Select Role</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Testing">Testing</option>
            <option value="Design">Design</option>
          </Form.Select>
        </Form.Group>

        {/* Submit Button */}
        <Button type="submit" variant="primary" className="w-100">
          Add Task
        </Button>
      </Form>
    </div>
  );
};

export default TaskAdd;
