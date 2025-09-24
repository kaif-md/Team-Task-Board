// src/components/CreateTaskForm.jsx
import { useState } from "react";
import { createTask } from "../services/api";

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
        assigneeId: Number(formData.assigneeId), // ensure number
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
      if (onTaskCreated) onTaskCreated(); // refresh tasks in parent
    } catch (err) {
      console.error("❌ Error creating task:", err);
      alert("Failed to create task");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded bg-white shadow">
      <h3 className="text-lg font-bold mb-2">Create New Task</h3>

      <div className="mb-2">
        <label className="block">Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-2">
        <label className="block">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
          rows="3"
        />
      </div>

      <div className="mb-2">
        <label className="block">Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block">Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="BACKLOG">BACKLOG</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="REVIEW">REVIEW</option>
          <option value="DONE">DONE</option>
        </select>
      </div>

      <div className="mb-2">
        <label className="block">Assignee ID</label>
        <input
          type="number"
          name="assigneeId"
          value={formData.assigneeId}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>

      <div className="mb-2">
        <label className="block">Due Date</label>
        <input
          type="datetime-local"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-red text-black px-4 py-2 rounded"
      >
        Create Task
      </button>
    </form>
  );
};

export default CreateTaskForm;
