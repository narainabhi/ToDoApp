# Full-Stack To-Do List Application

## Project Description

This project is a complete To-Do List application built with a modern full-stack architecture. It features a reactive frontend built with React.js and a robust backend API powered by Python and FastAPI. The entire application is containerized with Docker, allowing for easy setup and deployment.

This repository contains not only the source code but also the complete design and requirements documentation, including:
- [Software Requirements Specification (SRS.md)](SRS.md)
- [Conceptual Design (CONCEPTUAL_DESIGN.md)](CONCEPTUAL_DESIGN.md)
- [Technical Design (TECHNICAL_DESIGN.md)](TECHNICAL_DESIGN.md)

## Features

- **Create, Read, Update, Delete (CRUD) Tasks:** Full support for managing tasks.
- **Mark as Complete:** Tasks can be marked as complete or incomplete.
- **Persistent Storage:** Tasks are saved in an SQLite database via the backend API.
- **Reactive UI:** The frontend, built with React, updates in real-time without needing to refresh the page.
- **Containerized:** The entire application (frontend and backend) runs in Docker containers, managed by Docker Compose.
- **Fully Tested:** Includes comprehensive unit and integration tests for both the backend and frontend.

## Tech Stack

- **Backend:** Python with [FastAPI](https://fastapi.tiangolo.com/)
- **Frontend:** JavaScript with [React.js](https://reactjs.org/)
- **Database:** SQLite
- **Containerization:** Docker and Docker Compose
- **Testing:** `pytest` (backend), `React Testing Library` (frontend)

---

## Local Setup and Running the Application

To run this project locally, you will need [Docker](https://www.docker.com/get-started) and Docker Compose installed.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```
2.  **Build and run the containers:**
    Run the following command from the root directory of the project:
    ```bash
    docker-compose up --build
    ```
3.  **Access the application:**
    - The **frontend** will be available at `http://localhost:3000`.
    - The **backend API documentation** (Swagger UI) will be available at `http://localhost:8000/docs`.

---

## Running Tests Locally

This project includes unit and integration tests for both the backend and frontend.

### Backend (FastAPI)

The backend tests use `pytest`.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Create a virtual environment and activate it:**
    ```bash
    python -m venv venv
    source venv/bin/activate
    # On Windows, use `venv\Scripts\activate`
    ```
3.  **Install dependencies, including development dependencies:**
    ```bash
    pip install -r requirements.txt
    pip install -r requirements-dev.txt
    ```
4.  **Run the tests:**
    ```bash
    pytest
    ```

### Frontend (React)

The frontend tests use Jest and React Testing Library.

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the tests:**
    ```bash
    npm test
    ```
    This will launch the test runner in interactive watch mode. To run the tests once and exit (for CI/CD), use `npm test -- --watchAll=false`.
