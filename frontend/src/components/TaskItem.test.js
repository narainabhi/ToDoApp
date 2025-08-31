import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskItem from './TaskItem';

describe('TaskItem', () => {
  const mockTask = {
    id: 1,
    title: 'A sample task',
    completed: false,
  };

  it('renders the task title', () => {
    render(<TaskItem task={mockTask} />);
    expect(screen.getByText('A sample task')).toBeInTheDocument();
  });

  it('calls onToggleComplete when the checkbox is clicked', () => {
    const handleToggleComplete = jest.fn();
    render(
      <TaskItem
        task={mockTask}
        onToggleComplete={handleToggleComplete}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(handleToggleComplete).toHaveBeenCalledWith(1, true);
  });

  it('calls onDelete when the delete button is clicked', () => {
    const handleDelete = jest.fn();
    render(
      <TaskItem
        task={mockTask}
        onDelete={handleDelete}
      />
    );

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(handleDelete).toHaveBeenCalledWith(1);
  });

  it('applies the "completed" class when the task is completed', () => {
    const completedTask = { ...mockTask, completed: true };
    const { container } = render(<TaskItem task={completedTask} />);

    // The `li` element is the first child of the container div provided by render
    expect(container.firstChild).toHaveClass('completed');
  });
});
