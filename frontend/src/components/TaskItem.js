import React from 'react';

function TaskItem({ task, onToggleComplete, onDelete }) {
  return (
    <li className={task.completed ? 'completed' : ''}>
      <div className="task-details">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id, !task.completed)}
        />
        <span>{task.title}</span>
      </div>
      <button className="delete-btn" onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
}

export default TaskItem;
