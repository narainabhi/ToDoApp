import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function TaskItem({ task, onToggleComplete, onDelete }) {
  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.taskDetails}
        onPress={() => onToggleComplete(task.id, !task.completed)}
      >
        <Text style={styles.checkbox}>
          {task.completed ? '[x]' : '[ ]'}
        </Text>
        <Text style={[styles.title, task.completed && styles.completedTitle]}>
          {task.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(task.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    marginRight: 15,
    fontSize: 18,
  },
  title: {
    fontSize: 16,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  deleteButton: {
    backgroundColor: '#ef5350',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 12,
  },
});

export default TaskItem;
