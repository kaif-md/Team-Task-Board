// src/components/CreateTaskForm.jsx
import { useState } from "react";
import { createTask } from "../services/api";
import { Form, Button, Card, Row, Col } from "react-bootstrap";

const CreateTaskForm = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MEDIUM",
    assigneeId: "",
    status: "BACKLOG",
    dueDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        assigneeId: Number(formData.assigneeId),
      };
      await createTask(payload);
      alert("✅ Task created successfully!");
      setFormData({
        title: "",
        description: "",
        priority: "MEDIUM",
        assigneeId: "",
        status: "BACKLOG",
        dueDate: "",
      });
      if (onTaskCreated) onTaskCreated();
    } catch (err) {
      console.error("❌ Error creating task:", err);
      alert("Failed to create task");
    }
  };

  return (
    <Card className="mb-4 shadow-lg border-0">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">➕ Create New Task</h5>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          {/* Title & Assignee in same row */}
          <Row>
            <Col md={8}>
              <Form.Group className="mb-3" controlId="formTitle">
                <Form.Label>Task Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter task title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formAssignee">
                <Form.Label>Assignee ID</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="User ID"
                  name="assigneeId"
                  value={formData.assigneeId}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter task details..."
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Priority, Status, Due Date in one row */}
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formPriority">
                <Form.Label>Priority</Form.Label>
                <Form.Select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="BACKLOG">Backlog</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="REVIEW">Review</option>
                  <option value="DONE">Done</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="formDueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="datetime-local"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <Button type="submit" variant="success" size="lg">
              ✅ Create Task
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreateTaskForm;
