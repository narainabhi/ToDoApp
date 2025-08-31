import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
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
