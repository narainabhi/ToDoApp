import React, { useState, useEffect } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import * as api from './services/api';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tasks from the backend when the component mounts
    const fetchTasks = async () => {
      try {
        const response = await api.getTasks();
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks. Is the backend running?');
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      const response = await api.createTask(taskData);
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError('Failed to add task.');
      console.error(err);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      const updatedTask = { ...taskToUpdate, completed };

      const response = await api.updateTask(id, updatedTask);
      setTasks(tasks.map(task => (task.id === id ? response.data : task)));
    } catch (err) {
      setError('Failed to update task.');
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      setError('Failed to delete task.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
        <p>Built with React & FastAPI</p>
      </header>
      {error && <p className="error">{error}</p>}
      <div className="task-container">
        <AddTaskForm onAddTask={handleAddTask} />
        <TaskList
          tasks={tasks}
          onToggleComplete={handleToggleComplete}
          onDelete={handleDeleteTask}
        />
      </div>
    </div>
  );
}

export default App;
