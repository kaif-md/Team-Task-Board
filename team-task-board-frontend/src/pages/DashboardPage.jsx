// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import { getTasks, updateTask, deleteTask } from "../services/api";
import CreateTaskForm from "../components/CreateTaskForm";
import KanbanBoard from "../components/KanbanBoard";
import { Modal, Button, Form } from "react-bootstrap";

const DashboardPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal for editing
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

  // Handle delete
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

  // Handle edit
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

  // Handle drag & drop
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
    <div className="p-4">
      <h2 className="mb-4">📋 Dashboard (Kanban)</h2>

      <CreateTaskForm onTaskCreated={fetchTasks} />

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <KanbanBoard
          tasks={tasks}
          onDragEnd={handleDragEnd}
          onEdit={handleEditClick}
          onDelete={handleDelete}
        />
      )}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentTask && (
            <Form>
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

              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={currentTask.status}
                  onChange={(e) =>
                    setCurrentTask({ ...currentTask, status: e.target.value })
                  }
                >
                  <option value="BACKLOG">BACKLOG</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="REVIEW">REVIEW</option>
                  <option value="DONE">DONE</option>
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
    </div>
  );
};

export default DashboardPage;
