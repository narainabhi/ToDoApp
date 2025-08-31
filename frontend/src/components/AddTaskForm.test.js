import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddTaskForm from './AddTaskForm';

describe('AddTaskForm', () => {
  it('renders the form and allows a user to add a task', () => {
    // Mock the onAddTask function
    const handleAddTask = jest.fn();

    render(<AddTaskForm onAddTask={handleAddTask} />);

    // Find the input field and the button
    const inputElement = screen.getByPlaceholderText(/add a new task/i);
    const buttonElement = screen.getByRole('button', { name: /add task/i });

    // Simulate user typing into the input field
    fireEvent.change(inputElement, { target: { value: 'New Test Task' } });
    expect(inputElement.value).toBe('New Test Task');

    // Simulate user clicking the add button
    fireEvent.click(buttonElement);

    // Expect the onAddTask function to have been called with the correct data
    expect(handleAddTask).toHaveBeenCalledWith({
      title: 'New Test Task',
      completed: false,
    });

    // Expect the input field to be cleared after submission
    expect(inputElement.value).toBe('');
  });

  it('does not call onAddTask if the input is empty', () => {
    const handleAddTask = jest.fn();
    // Mock window.alert
    window.alert = jest.fn();

    render(<AddTaskForm onAddTask={handleAddTask} />);

    const buttonElement = screen.getByRole('button', { name: /add task/i });

    // Click the button with an empty input
    fireEvent.click(buttonElement);

    // Expect onAddTask NOT to be called
    expect(handleAddTask).not.toHaveBeenCalled();
    // Expect alert to be called
    expect(window.alert).toHaveBeenCalledWith('Please enter a task title.');
  });
});
