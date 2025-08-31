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
