import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
import os
import sys

# Add the project root to the Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.main import app, get_db
from app.database import Base

# --- Test Database Setup ---
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# --- Test Dependency Override ---
def override_get_db():
    """
    A dependency override to use the in-memory database for tests.
    """
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

# Apply the override to the FastAPI app
app.dependency_overrides[get_db] = override_get_db

# --- Test Client ---
client = TestClient(app)

# --- Pytest Fixture to Set Up and Tear Down DB ---
@pytest.fixture(autouse=True)
def setup_and_teardown_db():
    """
    Fixture to create and drop database tables for each test function.
    """
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

# --- API Tests ---

def test_read_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the To-Do List API"}

def test_create_task():
    response = client.post(
        "/api/tasks/",
        json={"title": "Test Task", "description": "Test Description"},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Test Task"
    assert data["description"] == "Test Description"
    assert "id" in data

def test_read_tasks():
    # Create a task first
    client.post("/api/tasks/", json={"title": "Test Task 1"})
    client.post("/api/tasks/", json={"title": "Test Task 2"})

    response = client.get("/api/tasks/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) == 2
    assert data[0]["title"] == "Test Task 1"
    assert data[1]["title"] == "Test Task 2"

def test_read_single_task():
    # Create a task
    create_response = client.post("/api/tasks/", json={"title": "A Specific Task"})
    task_id = create_response.json()["id"]

    # Read the task
    response = client.get(f"/api/tasks/{task_id}")
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "A Specific Task"
    assert data["id"] == task_id

def test_read_nonexistent_task():
    response = client.get("/api/tasks/999")
    assert response.status_code == 404
    assert response.json() == {"detail": "Task not found"}

def test_update_task():
    # Create a task
    create_response = client.post("/api/tasks/", json={"title": "Original Title"})
    task_id = create_response.json()["id"]

    # Update the task
    update_response = client.put(
        f"/api/tasks/{task_id}",
        json={"title": "Updated Title", "completed": True},
    )
    assert update_response.status_code == 200
    data = update_response.json()
    assert data["title"] == "Updated Title"
    assert data["completed"] is True

def test_delete_task():
    # Create a task
    create_response = client.post("/api/tasks/", json={"title": "Task to be deleted"})
    task_id = create_response.json()["id"]

    # Delete the task
    delete_response = client.delete(f"/api/tasks/{task_id}")
    assert delete_response.status_code == 200

    # Verify it's gone
    get_response = client.get(f"/api/tasks/{task_id}")
    assert get_response.status_code == 404
