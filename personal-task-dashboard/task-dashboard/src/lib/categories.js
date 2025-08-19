// lib/categories.js
import { categories as initialCategories } from '../data/mockCategories';
import { getAllTasks } from './tasks';

// Get all categories with task counts
export function getAllCategories() {
  const tasks = getAllTasks();
  
  return initialCategories.map(category => ({
    ...category,
    taskCount: tasks.filter(task => task.categoryId === category.id).length
  }));
}

// Get category by ID
export function getCategoryById(id) {
  const categories = getAllCategories();
  return categories.find(category => category.id === parseInt(id));
}

// Get category name by ID
export function getCategoryName(id) {
  const category = getCategoryById(id);
  return category ? category.name : 'Unknown';
}