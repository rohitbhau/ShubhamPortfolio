import React, { useState } from "react";
import { Table, Button, Form, Pagination } from "react-bootstrap";

const TaskList = ({ tasks, onDelete, onUpdateStatus, onUpdateEndDate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5; // Number of tasks per page

  // Filter tasks based on search term, type, status, and role
  const filteredTasks = tasks.filter((task) => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType ? task.taskType === filterType : true) &&
    (filterStatus ? task.status === filterStatus : true) &&
    (filterRole ? task.role === filterRole : true)
  );

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  return (
    <div className="container mt-4">
      <h2 className="text-primary mb-3">Task List</h2>

      {/* Search & Filters */}
      <div className="d-flex mb-3 gap-3">
        <Form.Control
          type="text"
          placeholder="Search by Task Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-50"
        />
        <Form.Select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-25">
          <option value="">All Task Types</option>
          <option value="Development">Development</option>
          <option value="Testing">Testing</option>
          <option value="Design">Design</option>
        </Form.Select>
        <Form.Select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-25">
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </Form.Select>
        <Form.Select value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="w-25">
          <option value="">All Roles</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Testing">Testing</option>
          <option value="Design">Design</option>
        </Form.Select>
      </div>

      {/* Table */}
      {filteredTasks.length === 0 ? (
        <p className="text-muted">No tasks found.</p>
      ) : (
        <>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="bg-dark text-white">
              <tr>
                <th>#</th>
                <th>Task Name</th>
                <th>Allocated Person</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Target Completion Date</th>
                <th>Remark</th>
                <th>Type</th>
                <th>Role</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTasks.map((task, index) => {
                const remark =
                  task.endDate && task.targetCompletionDate
                    ? task.endDate === task.targetCompletionDate
                      ? <span className="text-success">Good</span>
                      : <span className="text-danger">Needs Improvement</span>
                    : "N/A";

                return (
                  <tr key={index}>
                    <td>{indexOfFirstTask + index + 1}</td> {/* Task Numbering */}
                    <td>{task.title}</td>
                    <td>{task.allocatedPerson || "Not Assigned"}</td>
                    <td>{task.startDate || "N/A"}</td>
                    <td>
                      {task.status === "Completed" ? (
                        <Form.Control
                          type="date"
                          value={task.endDate || ""}
                          onChange={(e) => onUpdateEndDate(index, e.target.value)}
                        />
                      ) : (
                        task.endDate || "N/A"
                      )}
                    </td>
                    <td>{task.targetCompletionDate || "N/A"}</td>
                    <td>{remark}</td>
                    <td>{task.taskType || "General"}</td>
                    <td>{task.role || "Not Specified"}</td>
                    <td>
                      <Form.Select
                        value={task.status}
                        onChange={(e) => onUpdateStatus(index, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </Form.Select>
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => onDelete(index)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          {/* Pagination */}
          <Pagination>
            <Pagination.Prev
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </>
      )}
    </div>
  );
};

export default TaskList;