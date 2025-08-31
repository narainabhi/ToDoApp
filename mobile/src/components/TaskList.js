import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggleComplete, onDelete }) {
  const renderItem = ({ item }) => (
    <TaskItem
      task={item}
      onToggleComplete={onToggleComplete}
      onDelete={onDelete}
    />
  );

  return (
    <FlatList
      data={tasks}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default TaskList;
