import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  // Placeholder for fetching tasks from the API
  useEffect(() => {
    // In a real app, you'd fetch tasks from http://localhost:8000/api/tasks/
    const dummyTasks = [
      { id: 1, title: 'Set up project structure', completed: true },
      { id: 2, title: 'Create frontend scaffold', completed: true },
      { id: 3, title: 'Create backend scaffold', completed: true },
      { id: 4, title: 'Connect frontend to backend', completed: false },
    ];
    setTasks(dummyTasks);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>To-Do List</h1>
      </header>
      <div className="task-container">
        {/* In a real app, this would be a form for adding tasks */}
        <div className="task-form">
          <input type="text" placeholder="Add a new task..." />
          <button>Add Task</button>
        </div>
        {/* In a real app, this would be a TaskList component */}
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              {task.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
