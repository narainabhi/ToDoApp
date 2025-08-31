# Technical Design Document: To-Do List Web Application

## 1. Introduction

This document provides a detailed technical design for the full-stack To-Do List web application. It expands on the conceptual design by specifying the technologies, architecture, and implementation details for the backend, frontend, and database.

## 2. System Architecture

The application will follow a classic client-server architecture:

*   **Frontend (Client):** A React.js single-page application (SPA) that runs in the user's browser. It will be responsible for rendering the user interface and making API calls to the backend.
*   **Backend (Server):** A Python-based REST API built with the FastAPI framework. It will handle business logic, data processing, and communication with the database.
*   **Database:** An SQLite database to persist task data. SQLite is chosen for its simplicity and file-based nature, which is ideal for a small-scale application.

The frontend and backend will be developed and deployed as separate services that communicate over HTTP.

## 3. Backend Design (FastAPI)

The backend will be responsible for managing tasks.

*   **Framework:** FastAPI
*   **Language:** Python 3.9+
*   **Dependencies:** `fastapi`, `uvicorn`, `sqlalchemy`, `pydantic`

### 3.1 API Endpoints

The REST API will expose the following endpoints for task management:

| Method | Endpoint              | Description                      | Request Body | Response Body             |
|--------|-----------------------|----------------------------------|--------------|---------------------------|
| `GET`    | `/api/tasks/`         | Retrieve all tasks.              | None         | `list[Task]`              |
| `POST`   | `/api/tasks/`         | Create a new task.               | `TaskCreate` | `Task`                    |
| `GET`    | `/api/tasks/{task_id}`| Retrieve a single task by ID.    | None         | `Task`                    |
| `PUT`    | `/api/tasks/{task_id}`| Update an existing task.         | `TaskUpdate` | `Task`                    |
| `DELETE` | `/api/tasks/{task_id}`| Delete a task by ID.             | None         | `{ "ok": true }`          |

### 3.2 Data Models (Pydantic)

Pydantic models will be used for data validation and serialization.

```python
from pydantic import BaseModel
from datetime import datetime

# Base model for a task's attributes
class TaskBase(BaseModel):
    title: str
    description: str | None = None
    completed: bool = False

# Model for creating a task (doesn't have an ID yet)
class TaskCreate(TaskBase):
    pass

# Model for updating a task
class TaskUpdate(TaskBase):
    pass

# Model for representing a task in the database (includes ID)
class Task(TaskBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
```

## 4. Frontend Design (React.js)

The frontend will be a responsive and interactive user interface.

*   **Library:** React.js (using Create React App or Vite for setup)
*   **Language:** JavaScript (ES6+) or TypeScript
*   **Dependencies:** `react`, `react-dom`, `axios` (for API calls)

### 4.1 UI Components

The UI will be broken down into the following reusable components:

*   **`App`:** The main component that orchestrates the application, fetches initial data, and manages the overall state.
*   **`TaskList`:** Renders a list of `TaskItem` components.
    *   **Props:** `tasks` (array), `onDelete`, `onToggle`, `onEdit`
*   **`TaskItem`:** Displays a single task with its controls (edit, delete, complete checkbox).
    *   **Props:** `task` (object), `onDelete`, `onToggle`, `onEdit`
*   **`AddTaskForm`:** A form with input fields for creating a new task.
    *   **Props:** `onAddTask` (function)
*   **`EditTaskForm`:** A form to edit an existing task, possibly shown in a modal or inline.
    *   **Props:** `task` (object), `onUpdateTask` (function)

### 4.2 State Management

*   Component-level state will be managed using React Hooks (`useState`, `useReducer`).
*   The main list of tasks will be held in the state of the top-level `App` component and passed down to children as props.

## 5. Database Design

*   **Database System:** SQLite
*   **ORM:** SQLAlchemy (asynchronous support with `asyncio`)

### 5.1 Schema

A single table named `tasks` will be created to store all the to-do items.

**`tasks` table:**
| Column Name  | Data Type          | Constraints              | Description                      |
|--------------|--------------------|--------------------------|----------------------------------|
| `id`         | `INTEGER`          | `PRIMARY KEY`, `AUTOINCREMENT` | Unique identifier for the task.  |
| `title`      | `VARCHAR(255)`     | `NOT NULL`               | The title or main text of the task.|
| `description`| `TEXT`             | `NULLABLE`               | A more detailed description.     |
| `completed`  | `BOOLEAN`          | `NOT NULL`, `DEFAULT 0`  | The completion status of the task.|
| `created_at` | `DATETIME`         | `NOT NULL`, `DEFAULT CURRENT_TIMESTAMP` | Timestamp of when the task was created.|
| `updated_at` | `DATETIME`         | `NOT NULL`, `DEFAULT CURRENT_TIMESTAMP` | Timestamp of the last update.    |


## 6. Service Interactions and Data Flow

Here is the data flow for a common user action, such as creating a new task:

1.  **User Interaction:** The user types a task title into the `AddTaskForm` component in the React app and clicks "Add".
2.  **Frontend Event:** The `AddTaskForm`'s `onSubmit` handler is triggered. It calls the `onAddTask` prop function passed down from the `App` component.
3.  **API Call:** The `App` component makes an asynchronous `POST` request to the `/api/tasks/` endpoint of the FastAPI backend, sending the new task's data in the request body.
4.  **Backend Processing:** FastAPI receives the request, validates the incoming data using the `TaskCreate` Pydantic model, and calls the corresponding service function to create the task.
5.  **Database Operation:** The service function creates a new record in the `tasks` table in the SQLite database.
6.  **Backend Response:** The backend sends a `201 Created` response back to the frontend, including the newly created task object (now with an `id` and `created_at` timestamp).
7.  **Frontend State Update:** The React app receives the response, updates its state with the new task, and re-renders the `TaskList` to display the new item.

## 7. Project Structure

A monorepo structure is not required, but the frontend and backend code should be organized in separate directories.

```
/todo-app
|
|-- /backend
|   |-- /app
|   |   |-- __init__.py
|   |   |-- main.py       # FastAPI app object and routes
|   |   |-- models.py     # SQLAlchemy models
|   |   |-- schemas.py    # Pydantic schemas
|   |   |-- crud.py       # CRUD operations
|   |-- requirements.txt
|
|-- /frontend
|   |-- /src
|   |   |-- /components
|   |   |   |-- TaskList.js
|   |   |   |-- TaskItem.js
|   |   |   |-- AddTaskForm.js
|   |   |-- App.js
|   |   |-- index.js
|   |-- package.json
|
|-- .gitignore
|-- README.md
|-- SRS.md
|-- CONCEPTUAL_DESIGN.md
|-- TECHNICAL_DESIGN.md
```
