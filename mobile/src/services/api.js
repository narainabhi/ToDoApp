import axios from 'axios';

// NOTE: When running on a physical device or Android emulator,
// 'localhost' will not work. You need to use the IP address of the machine
// running the backend server. For the Android emulator, you can use '10.0.2.2'.
// For a physical device, find your computer's local network IP (e.g., 192.168.1.100).
// For the iOS simulator, 'localhost' should work fine.
const API_URL = 'http://localhost:8000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTasks = () => {
  return apiClient.get('/tasks/');
};

export const createTask = (task) => {
  return apiClient.post('/tasks/', task);
};

export const updateTask = (id, task) => {
  return apiClient.put(`/tasks/${id}`, task);
};

export const deleteTask = (id) => {
  return apiClient.delete(`/tasks/${id}`);
};
