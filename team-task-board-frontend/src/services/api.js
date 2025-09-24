// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080", // backend URL (adjust if needed)
});

// Attach token automatically if available
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ------------------ Auth APIs ------------------
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/signup", data);

// ------------------ Task APIs ------------------
export const getTasks = () => API.get("/tasks");
export const createTask = (data) => API.post("/tasks", data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
