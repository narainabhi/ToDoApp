import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';

import * as api from './services/api';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await api.getTasks();
        setTasks(response.data);
      } catch (err) {
        setError('Failed to fetch tasks. Is the backend server running?');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleAddTask = async (taskData) => {
    try {
      const response = await api.createTask(taskData);
      setTasks([...tasks, response.data]);
    } catch (err) {
      Alert.alert('Error', 'Failed to add task.');
      console.error(err);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      const updatedTaskData = { ...taskToUpdate, completed };

      const response = await api.updateTask(id, updatedTaskData);
      setTasks(tasks.map(task => (task.id === id ? response.data : task)));
    } catch (err) {
      Alert.alert('Error', 'Failed to update task.');
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await api.deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      Alert.alert('Error', 'Failed to delete task.');
      console.error(err);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    }
    if (error) {
      return <Text style={styles.errorText}>{error}</Text>;
    }
    return (
      <TaskList
        tasks={tasks}
        onToggleComplete={handleToggleComplete}
        onDelete={handleDeleteTask}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>To-Do List</Text>
      </View>
      <AddTaskForm onAddTask={handleAddTask} />
      <View style={styles.listContainer}>
        {renderContent()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default App;
