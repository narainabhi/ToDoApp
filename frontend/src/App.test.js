import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import * as api from './services/api';

// Mock the entire API service module
jest.mock('./services/api');

const mockTasks = [
  { id: 1, title: 'Learn React Testing', completed: false },
  { id: 2, title: 'Write unit tests', completed: true },
];

describe('App', () => {
  beforeEach(() => {
    // Reset mocks before each test
    api.getTasks.mockClear();
    api.createTask.mockClear();
    api.deleteTask.mockClear();
  });

  it('fetches and displays tasks on initial render', async () => {
    // Arrange: mock the API response for getting tasks
    api.getTasks.mockResolvedValue({ data: mockTasks });

    // Act: render the App component
    render(<App />);

    // Assert: check that the tasks are displayed
    // Use findByText for async operations
    expect(await screen.findByText('Learn React Testing')).toBeInTheDocument();
    expect(screen.getByText('Write unit tests')).toBeInTheDocument();
    expect(api.getTasks).toHaveBeenCalledTimes(1);
  });

  it('allows a user to add a new task', async () => {
    // Arrange
    const newTask = { id: 3, title: 'A brand new task', completed: false };
    api.getTasks.mockResolvedValue({ data: mockTasks }); // Initial load
    api.createTask.mockResolvedValue({ data: newTask }); // Response for creation

    render(<App />);

    // Wait for initial tasks to load
    await screen.findByText('Learn React Testing');

    // Act
    const inputElement = screen.getByPlaceholderText(/add a new task/i);
    const buttonElement = screen.getByRole('button', { name: /add task/i });

    fireEvent.change(inputElement, { target: { value: 'A brand new task' } });
    fireEvent.click(buttonElement);

    // Assert
    // Use waitFor to see the new task appear in the document
    await waitFor(() => {
      expect(screen.getByText('A brand new task')).toBeInTheDocument();
    });
    expect(api.createTask).toHaveBeenCalledWith({ title: 'A brand new task', completed: false });
  });

  it('allows a user to delete a task', async () => {
    // Arrange
    api.getTasks.mockResolvedValue({ data: mockTasks });
    api.deleteTask.mockResolvedValue({}); // Mock successful deletion

    render(<App />);

    // Wait for initial tasks to load
    const taskToDeleteText = 'Learn React Testing';
    await screen.findByText(taskToDeleteText);

    // Act
    // The delete button is in the same `li` as the task text. Find it relative to the task.
    const deleteButton = screen.getAllByRole('button', { name: /delete/i })[0]; // Assuming it's the first
    fireEvent.click(deleteButton);

    // Assert
    await waitFor(() => {
      expect(screen.queryByText(taskToDeleteText)).not.toBeInTheDocument();
    });
    expect(api.deleteTask).toHaveBeenCalledWith(1); // ID of the first task
  });

  it('displays an error message if fetching tasks fails', async () => {
    // Arrange
    api.getTasks.mockRejectedValue(new Error('API is down'));

    // Act
    render(<App />);

    // Assert
    const errorElement = await screen.findByText(/failed to fetch tasks/i);
    expect(errorElement).toBeInTheDocument();
  });
});
