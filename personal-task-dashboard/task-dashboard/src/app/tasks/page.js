// app/tasks/page.js
import Link from 'next/link';
import { getAllTasks, getTasksByCategory, getTasksByStatus } from '../../lib/tasks';
import { getAllCategories, getCategoryName } from '../../lib/categories';
import TaskCard from '../../components/TaskCard';

export const metadata = {
  title: 'All Tasks',
  description: 'View and manage all your tasks with filtering and sorting options'
};

// This enables Server-Side Rendering
export const dynamic = 'force-dynamic';

export default function TasksPage({ searchParams }) {
  const { category, status, filter } = searchParams || {};
  
  let tasks = getAllTasks();
  const categories = getAllCategories();
  
  // Apply filters
  if (category) {
    tasks = getTasksByCategory(parseInt(category));
  }
  
  if (status) {
    tasks = getTasksByStatus(status);
  }
  
  if (filter === 'overdue') {
    const today = new Date().toISOString().split('T')[0];
    tasks = tasks.filter(task => 
      task.status !== 'completed' && task.dueDate < today
    );
  }
  
  // Sort tasks by due date (earliest first)
  tasks = tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  
  const getPageTitle = () => {
    if (category) return `${getCategoryName(parseInt(category))} Tasks`;
    if (status) return `${status.charAt(0).toUpperCase() + status.slice(1)} Tasks`;
    if (filter === 'overdue') return 'Overdue Tasks';
    return 'All Tasks';
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{getPageTitle()}</h1>
            <p className="text-gray-600">
              {tasks.length} task{tasks.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <Link
            href="/tasks/add"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            ➕ Add Task
          </Link>
        </div>
      </div>
      
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/tasks"
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              !category && !status && !filter
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Tasks
          </Link>
          
          {/* Status Filters */}
          {['pending', 'in-progress', 'completed'].map(s => (
            <Link
              key={s}
              href={`/tasks?status=${s}`}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                status === s
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Link>
          ))}
          
          {/* Category Filters */}
          {categories.map(cat => (
            <Link
              key={cat.id}
              href={`/tasks?category=${cat.id}`}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                category === cat.id.toString()
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
          
          {/* Special Filters */}
          <Link
            href="/tasks?filter=overdue"
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              filter === 'overdue'
                ? 'bg-red-500 text-white'
                : 'bg-red-100 text-red-700 hover:bg-red-200'
            }`}
          >
            ⚠️ Overdue
          </Link>
        </div>
      </div>
      
      {/* Tasks Grid */}
      {tasks.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks found</h3>
          <p className="text-gray-600 mb-6">
            {category || status || filter 
              ? 'No tasks match the current filter. Try a different filter or create a new task.'
              : 'You haven\'t created any tasks yet. Create your first task to get started!'
            }
          </p>
          <Link
            href="/tasks/add"
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            Create Your First Task
          </Link>
        </div>
      )}
    </div>
  );
}