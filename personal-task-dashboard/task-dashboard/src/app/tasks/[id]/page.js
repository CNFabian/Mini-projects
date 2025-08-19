// app/tasks/[id]/page.js
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getTaskById } from '../../../lib/tasks';
import { getCategoryById } from '../../../lib/categories';

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const task = getTaskById(params.id);
  
  if (!task) {
    return {
      title: 'Task Not Found'
    };
  }
  
  return {
    title: `${task.title} | Task Details`,
    description: task.description
  };
}

export default function TaskDetailPage({ params }) {
  const task = getTaskById(params.id);
  
  if (!task) {
    notFound();
  }
  
  const category = getCategoryById(task.categoryId);
  
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-100 border-green-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 border-green-200';
      case 'in-progress': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'pending': return 'text-gray-600 bg-gray-100 border-gray-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };
  
  const isOverdue = () => {
    const today = new Date().toISOString().split('T')[0];
    return task.status !== 'completed' && task.dueDate < today;
  };
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">Dashboard</Link>
        <span>/</span>
        <Link href="/tasks" className="hover:text-blue-600">Tasks</Link>
        <span>/</span>
        <span className="text-gray-900">{task.title}</span>
      </div>
      
      {/* Main Task Card */}
      <div className={`bg-white rounded-lg shadow-md border-l-4 ${
        isOverdue() ? 'border-red-500' : 'border-gray-200'
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{task.title}</h1>
              {isOverdue() && (
                <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                  ⚠️ Overdue
                </div>
              )}
            </div>
            <div className="flex space-x-3">
              <Link
                href={`/tasks/${task.id}/edit`}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
              >
                Edit Task
              </Link>
              <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors">
                Delete Task
              </button>
            </div>
          </div>
          
          {/* Status Badges */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(task.priority)}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}>
              {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${category.color.replace('bg-', 'bg-opacity-20 border-').replace('500', '300')} text-gray-700`}>
              {category.icon} {category.name}
            </span>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Description</h2>
            <p className="text-gray-700 leading-relaxed">{task.description}</p>
          </div>
        </div>
      </div>
      
      {/* Task Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📅 Dates</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-600">Created:</span>
              <p className="text-gray-900">{formatDate(task.createdAt)}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Due Date:</span>
              <p className={`font-medium ${isOverdue() ? 'text-red-600' : 'text-gray-900'}`}>
                {formatDate(task.dueDate)}
              </p>
            </div>
            {task.completedAt && (
              <div>
                <span className="text-sm font-medium text-gray-600">Completed:</span>
                <p className="text-green-600 font-medium">{formatDate(task.completedAt)}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Progress</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-600">Current Status:</span>
              <p className="text-gray-900 capitalize">{task.status.replace('-', ' ')}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Priority Level:</span>
              <p className="text-gray-900 capitalize">{task.priority}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Completion:</span>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      task.status === 'completed' ? 'bg-green-500 w-full' :
                      task.status === 'in-progress' ? 'bg-blue-500 w-1/2' :
                      'bg-gray-300 w-0'
                    }`}
                  ></div>
                </div>
                <span className="text-sm text-gray-600">
                  {task.status === 'completed' ? '100%' :
                   task.status === 'in-progress' ? '50%' : '0%'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">🏷️ Category</h3>
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center text-white text-xl`}>
              {category.icon}
            </div>
            <div>
              <p className="font-medium text-gray-900">{category.name}</p>
              <p className="text-sm text-gray-600">{category.description}</p>
            </div>
          </div>
          <Link
            href={`/tasks?category=${category.id}`}
            className="mt-4 inline-block text-blue-500 hover:text-blue-600 text-sm font-medium"
          >
            View all {category.name} tasks →
          </Link>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          {task.status !== 'completed' && (
            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
              ✅ Mark as Completed
            </button>
          )}
          {task.status === 'pending' && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
              🚀 Start Working
            </button>
          )}
          {task.status === 'completed' && (
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors">
              🔄 Reopen Task
            </button>
          )}
          <Link
            href={`/tasks/${task.id}/edit`}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
          >
            ✏️ Edit Details
          </Link>
        </div>
      </div>
    </div>
  );
}