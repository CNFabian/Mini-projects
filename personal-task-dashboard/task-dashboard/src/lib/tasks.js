// src/lib/tasks.js
import { tasks as initialTasks } from '@/data/mockTasks';

// Simulate database with in-memory storage
// In a real app, this would be replaced with API calls
let tasks = [...initialTasks];

// Get all tasks
export function getAllTasks() {
  return tasks;
}

// Get task by ID
export function getTaskById(id) {
  return tasks.find(task => task.id === parseInt(id));
}

// Get tasks by category
export function getTasksByCategory(categoryId) {
  return tasks.filter(task => task.categoryId === categoryId);
}

// Get tasks by status
export function getTasksByStatus(status) {
  return tasks.filter(task => task.status === status);
}

// Create new task
export function createTask(taskData) {
  const newTask = {
    id: Math.max(...tasks.map(t => t.id)) + 1,
    ...taskData,
    createdAt: new Date().toISOString().split('T')[0],
    completedAt: null
  };
  
  tasks.push(newTask);
  return newTask;
}

// Update task
export function updateTask(id, updates) {
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
  
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }
  
  // If marking as completed, set completedAt
  if (updates.status === 'completed' && tasks[taskIndex].status !== 'completed') {
    updates.completedAt = new Date().toISOString().split('T')[0];
  }
  
  // If marking as not completed, remove completedAt
  if (updates.status !== 'completed' && tasks[taskIndex].status === 'completed') {
    updates.completedAt = null;
  }
  
  tasks[taskIndex] = { ...tasks[taskIndex], ...updates };
  return tasks[taskIndex];
}

// Delete task
export function deleteTask(id) {
  const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
  
  if (taskIndex === -1) {
    throw new Error('Task not found');
  }
  
  const deletedTask = tasks[taskIndex];
  tasks.splice(taskIndex, 1);
  return deletedTask;
}

// Get task statistics
export function getTaskStats() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.status === 'completed').length;
  const pending = tasks.filter(task => task.status === 'pending').length;
  const inProgress = tasks.filter(task => task.status === 'in-progress').length;
  const overdue = tasks.filter(task => {
    const today = new Date().toISOString().split('T')[0];
    return task.status !== 'completed' && task.dueDate < today;
  }).length;
  
  return {
    total,
    completed,
    pending,
    inProgress,
    overdue,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
  };
}