import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// TOKEN REQUEST
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// AUTHENTICATION API
export const registerUser = (userData) => API.post("/userRoutes/register", userData);
export const loginUser = (userData) => API.post("/userRoutes/login", userData);

// TASK API
export const fetchTasks = () => API.get("/tasks");
export const createTask = (taskData) => API.post("/tasks", taskData);
export const updateTask = (id, taskData) => API.put(`/tasks/${id}`, taskData);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
