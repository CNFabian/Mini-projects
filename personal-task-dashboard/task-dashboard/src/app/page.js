// app/page.js
import Link from 'next/link';
import { getAllTasks, getTaskStats } from '../lib/tasks';
import { getAllCategories } from '../lib/categories';
import TaskCard from '../components/TaskCard';

export const metadata = {
  title: 'Dashboard',
  description: 'Task management dashboard with overview of your tasks and productivity stats'
};

export default function Home() {
  const tasks = getAllTasks();
  const stats = getTaskStats();
  const categories = getAllCategories();
  
  // Get recent tasks (last 3)
  const recentTasks = tasks
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);
  
  // Get overdue tasks
  const today = new Date().toISOString().split('T')[0];
  const overdueTasks = tasks.filter(task => 
    task.status !== 'completed' && task.dueDate < today
  );
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's an overview of your tasks and productivity.</p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              📊
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              ✅
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              🔄
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              ⚠️
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue</p>
              <p className="text-2xl font-bold text-gray-900">{stats.overdue}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Overall Progress</h2>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-green-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${stats.completionRate}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {stats.completionRate}% completed ({stats.completed} of {stats.total} tasks)
        </p>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/tasks/add"
            className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition-colors text-center"
          >
            <div className="text-2xl mb-2">➕</div>
            <div className="font-medium">Add New Task</div>
          </Link>
          
          <Link
            href="/tasks"
            className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors text-center"
          >
            <div className="text-2xl mb-2">📋</div>
            <div className="font-medium">View All Tasks</div>
          </Link>
          
          <Link
            href="/categories"
            className="bg-purple-500 text-white p-4 rounded-lg hover:bg-purple-600 transition-colors text-center"
          >
            <div className="text-2xl mb-2">📁</div>
            <div className="font-medium">Manage Categories</div>
          </Link>
        </div>
      </div>
      
      {/* Recent Tasks */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Tasks</h2>
          <Link 
            href="/tasks"
            className="text-blue-500 hover:text-blue-600 text-sm font-medium"
          >
            View All →
          </Link>
        </div>
        
        {recentTasks.length > 0 ? (
          <div className="space-y-4">
            {recentTasks.map(task => (
              <TaskCard key={task.id} task={task} showActions={false} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No tasks yet. Create your first task!</p>
        )}
      </div>
      
      {/* Overdue Tasks Alert */}
      {overdueTasks.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="text-red-500 text-xl mr-3">⚠️</div>
            <h2 className="text-xl font-semibold text-red-900">Overdue Tasks</h2>
          </div>
          <p className="text-red-700 mb-4">
            You have {overdueTasks.length} overdue task{overdueTasks.length !== 1 ? 's' : ''} that need attention.
          </p>
          <Link
            href="/tasks?filter=overdue"
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            View Overdue Tasks
          </Link>
        </div>
      )}
    </div>
  );
}