import React from 'react';
import { render, screen } from '@testing-library/react';
import TaskList from './TaskList';

// Mock the TaskItem component to isolate the TaskList component's logic
jest.mock('./TaskItem', () => (props) => (
  <li data-testid="task-item">
    {props.task.title}
  </li>
));

describe('TaskList', () => {
  const mockTasks = [
    { id: 1, title: 'First Task', completed: false },
    { id: 2, title: 'Second Task', completed: true },
  ];

  it('renders a list of tasks', () => {
    render(<TaskList tasks={mockTasks} />);

    const taskItems = screen.getAllByTestId('task-item');
    expect(taskItems).toHaveLength(2);
    expect(screen.getByText('First Task')).toBeInTheDocument();
    expect(screen.getByText('Second Task')).toBeInTheDocument();
  });

  it('renders nothing when the tasks list is empty', () => {
    const { container } = render(<TaskList tasks={[]} />);

    // queryAllByTestId returns an empty array if no elements are found
    const taskItems = screen.queryAllByTestId('task-item');
    expect(taskItems).toHaveLength(0);

    // The component should render an empty `ul`
    const list = container.querySelector('.task-list');
    expect(list).toBeInTheDocument();
    expect(list.children.length).toBe(0);
  });
});
