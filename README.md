# Full-Stack To-Do List Application

## Project Description

This project is a complete To-Do List application built with a modern full-stack architecture. It features a reactive web frontend, a native mobile app, and a robust backend API. The entire application is containerized with Docker, allowing for easy setup and deployment of the web services.

This repository contains not only the source code but also the complete design and requirements documentation.

## Features

- **Cross-Platform:** Access your tasks via a web browser or a native mobile app (iOS/Android).
- **Create, Read, Update, Delete (CRUD) Tasks:** Full support for managing tasks.
- **Mark as Complete:** Tasks can be marked as complete or incomplete.
- **Persistent Storage:** Tasks are saved in a central SQLite database via the backend API.
- **Reactive UI:** The web and mobile frontends update in real-time.
- **Containerized Web Services:** The backend and web frontend run in Docker containers.
- **Fully Tested:** Includes comprehensive unit and integration tests for both the backend and web frontend.

## Tech Stack

- **Backend:** Python with [FastAPI](https://fastapi.tiangolo.com/)
- **Web Frontend:** JavaScript with [React.js](https://reactjs.org/)
- **Mobile App:** [React Native](https://reactnative.dev/)
- **Database:** SQLite
- **Containerization:** Docker and Docker Compose
- **Testing:** `pytest` (backend), `React Testing Library` (frontend)

---

## Running the Web Application (Docker)

To run the web frontend and the backend API, you will need [Docker](https://www.docker.com/get-started) and Docker Compose installed.

1.  **Clone the repository and navigate to the root directory.**
2.  **Build and run the containers:**
    ```bash
    docker-compose up --build
    ```
3.  **Access the services:**
    - The **Web App** will be available at `http://localhost:3000`.
    - The **Backend API Docs** (Swagger UI) will be at `http://localhost:8000/docs`.

---

## Running the Mobile Application (React Native)

To run the mobile app, you will need a local development environment for React Native. Please follow the official React Native [environment setup guide](https://reactnative.dev/docs/environment-setup).

1.  **Ensure the backend is running** using the Docker instructions above.
2.  **Navigate to the mobile directory:**
    ```bash
    cd mobile
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```
4.  **Run on a simulator or device:**
    - **For iOS:** `npx react-native run-ios`
    - **For Android:** `npx react-native run-android`

**Note on Backend Connection:** The mobile app is configured to connect to `http://localhost:8000`. This works out-of-the-box with the iOS Simulator. For Android Emulators, you may need to change the URL in `mobile/src/services/api.js` to `http://10.0.2.2:8000`.

---

## Running Tests Locally

### Backend (FastAPI)

1.  **Navigate to the `backend` directory.**
2.  **Set up a Python virtual environment and install dependencies:**
    ```bash
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt -r requirements-dev.txt
    ```
3.  **Run tests:** `pytest`

### Web Frontend (React)

1.  **Navigate to the `frontend` directory.**
2.  **Install dependencies:** `npm install`
3.  **Run tests:** `npm test`
    (To run once for CI/CD, use `npm test -- --watchAll=false`)
