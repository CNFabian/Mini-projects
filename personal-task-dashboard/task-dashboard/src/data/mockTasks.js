// src/data/mockTasks.js
export const tasks = [
  {
    id: 1,
    title: 'Complete project proposal',
    description: 'Write and submit the Q4 project proposal for the new client',
    categoryId: 1,
    status: 'pending',
    priority: 'high',
    dueDate: '2025-08-25',
    createdAt: '2025-08-15',
    completedAt: null
  },
  {
    id: 2,
    title: 'Morning workout routine',
    description: '30-minute cardio and strength training',
    categoryId: 3,
    status: 'completed',
    priority: 'medium',
    dueDate: '2025-08-19',
    createdAt: '2025-08-18',
    completedAt: '2025-08-19'
  },
  {
    id: 3,
    title: 'Learn Next.js fundamentals',
    description: 'Complete the Next.js tutorial and build a practice project',
    categoryId: 4,
    status: 'in-progress',
    priority: 'high',
    dueDate: '2025-08-30',
    createdAt: '2025-08-10',
    completedAt: null
  },
  {
    id: 4,
    title: 'Buy groceries',
    description: 'Weekly grocery shopping - milk, bread, fruits, vegetables',
    categoryId: 5,
    status: 'pending',
    priority: 'low',
    dueDate: '2025-08-20',
    createdAt: '2025-08-19',
    completedAt: null
  },
  {
    id: 5,
    title: 'Plan weekend trip',
    description: 'Research and book accommodation for the mountain hiking trip',
    categoryId: 2,
    status: 'pending',
    priority: 'medium',
    dueDate: '2025-08-22',
    createdAt: '2025-08-17',
    completedAt: null
  },
  {
    id: 6,
    title: 'Code review meeting',
    description: 'Review pull requests and discuss implementation with team',
    categoryId: 1,
    status: 'completed',
    priority: 'high',
    dueDate: '2025-08-18',
    createdAt: '2025-08-16',
    completedAt: '2025-08-18'
  }
];