// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "../services/api";
import CreateTaskForm from "../components/CreateTaskForm";
import KanbanBoard from "../components/KanbanBoard";
import { Modal, Button, Form, Container, Spinner, Row, Col } from "react-bootstrap";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error("❌ Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(id);
        fetchTasks();
      } catch (err) {
        console.error("❌ Error deleting task:", err);
      }
    }
  };

  // Edit
  const handleEditClick = (task) => {
    setCurrentTask({ ...task });
    setShowEditModal(true);
  };

  const handleEditSave = async () => {
    try {
      await updateTask(currentTask.id, {
        title: currentTask.title,
        description: currentTask.description,
        priority: currentTask.priority,
        assigneeId: currentTask.assignee?.id || null,
        status: currentTask.status,
        dueDate: currentTask.dueDate,
      });
      setShowEditModal(false);
      fetchTasks();
    } catch (err) {
      console.error("❌ Error updating task:", err);
    }
  };

  // Drag & Drop
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const { draggableId, destination, source } = result;

    if (destination.droppableId !== source.droppableId) {
      try {
        await updateTask(draggableId, { status: destination.droppableId });
        fetchTasks();
      } catch (err) {
        console.error("❌ Error updating status:", err);
      }
    }
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">📋 Dashboard (Kanban)</h2>
        </Col>
      </Row>

      {/* Create Task Form */}
      <Row className="mb-4">
        <Col>
          <CreateTaskForm onTaskCreated={fetchTasks} />
        </Col>
      </Row>

      {/* Tasks Board */}
      <Row>
        <Col>
          {loading ? (
            <div className="text-center my-4">
              <Spinner animation="border" role="status" variant="primary" />
              <p className="mt-2">Loading tasks...</p>
            </div>
          ) : (
            <KanbanBoard
              tasks={tasks}
              onDragEnd={handleDragEnd}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          )}
        </Col>
      </Row>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentTask && (
            <Form>
              {/* Title */}
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={currentTask.title}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, title: e.target.value })
                  }
                />
              </Form.Group>

              {/* Description */}
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={currentTask.description}
                  onChange={(e) =>
                    setCurrentTask({
                      ...currentTask,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>

              {/* Status */}
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={currentTask.status}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, status: e.target.value })
                  }
                >
                  <option value="BACKLOG">Backlog</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="REVIEW">Review</option>
                  <option value="DONE">Done</option>
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DashboardPage;
