import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TaskAdd = ({ onAdd }) => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignDate: null,
    completionDate: null,
    startTime: null,
    endTime: null,
    allocatedPerson: "",
    type: "",
  });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleDateChange = (field, date) => {
    setTask({ ...task, [field]: date });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title || !task.description || !task.assignDate || !task.completionDate || !task.startTime || !task.endTime || !task.allocatedPerson || !task.type) return;
    onAdd(task);
    setTask({
      title: "",
      description: "",
      assignDate: null,
      completionDate: null,
      startTime: null,
      endTime: null,
      allocatedPerson: "",
      type: "",
    });
  };

  return (
    <div className="container mt-4">
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

        {/* Allocated Person */}
        <Form.Group className="mb-3">
          <Form.Label>Allocated Person</Form.Label>
          <Form.Control
            type="text"
            name="allocatedPerson"
            value={task.allocatedPerson}
            onChange={handleChange}
            placeholder="Enter person's name"
            required
          />
        </Form.Group>

        {/* Task Type */}
        <Form.Group className="mb-3">
          <Form.Label>Task Type</Form.Label>
          <Form.Select name="type" value={task.type} onChange={handleChange} required>
            <option value="">Select Task Type</option>
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
            <option value="Design">Design</option>
          </Form.Select>
        </Form.Group>

        {/* Assign Date */}
        <Form.Group className="mb-3">
          <Form.Label>Assign Date</Form.Label>
          <DatePicker
            selected={task.assignDate}
            onChange={(date) => handleDateChange("assignDate", date)}
            className="form-control"
            placeholderText="Select Assign Date"
            dateFormat="yyyy-MM-dd"
            required
          />
        </Form.Group>

        {/* Completion Date */}
        <Form.Group className="mb-3">
          <Form.Label>Completion Date</Form.Label>
          <DatePicker
            selected={task.completionDate}
            onChange={(date) => handleDateChange("completionDate", date)}
            className="form-control"
            placeholderText="Select Completion Date"
            dateFormat="yyyy-MM-dd"
            required
          />
        </Form.Group>

        {/* Time Duration (From - To) */}
        <div className="d-flex gap-3">
          <Form.Group className="mb-3 w-50">
            <Form.Label>Start Time</Form.Label>
            <DatePicker
              selected={task.startTime}
              onChange={(time) => handleDateChange("startTime", time)}
              className="form-control"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Start Time"
              dateFormat="h:mm aa"
              placeholderText="Select Start Time"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 w-50">
            <Form.Label>End Time</Form.Label>
            <DatePicker
              selected={task.endTime}
              onChange={(time) => handleDateChange("endTime", time)}
              className="form-control"
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="End Time"
              dateFormat="h:mm aa"
              placeholderText="Select End Time"
              required
            />
          </Form.Group>
        </div>

        {/* Submit Button */}
        <Button type="submit" variant="primary" className="w-100">
          Add Task
        </Button>
      </Form>
    </div>
  );
};

export default TaskAdd;
