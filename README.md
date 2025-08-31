# Full-Stack To-Do List Application

This project is a simple To-Do List application built with a full-stack architecture, based on the requirements and designs outlined in the accompanying markdown documents.

## Tech Stack

- **Backend:** Python with [FastAPI](https://fastapi.tiangolo.com/)
- **Frontend:** JavaScript with [React.js](https://reactjs.org/)
- **Database:** SQLite
- **Containerization:** Docker and Docker Compose

## Project Documents

- [Software Requirements Specification (SRS.md)](SRS.md)
- [Conceptual Design (CONCEPTUAL_DESIGN.md)](CONCEPTUAL_DESIGN.md)
- [Technical Design (TECHNICAL_DESIGN.md)](TECHNICAL_DESIGN.md)

## Getting Started

To run this project locally, you will need [Docker](https://www.docker.com/get-started) installed.

1. Clone the repository.
2. Navigate to the root directory.
3. Run the following command:
   ```bash
   docker-compose up --build
   ```
4. The frontend will be available at `http://localhost:3000`.
5. The backend API documentation will be available at `http://localhost:8000/docs`.

---

## Running Tests

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
    This will launch the test runner in interactive watch mode.

### CI/CD Workflows

To automate testing in a CI/CD pipeline (e.g., GitHub Actions), you would add steps to your workflow file to execute the commands above. For example:

```yaml
# Example step for backend tests
- name: Test Backend
  run: |
    cd backend
    pip install -r requirements.txt -r requirements-dev.txt
    pytest

# Example step for frontend tests
- name: Test Frontend
  run: |
    cd frontend
    npm install
    npm test -- --watchAll=false
    # Use --watchAll=false to run all tests once and exit
```
