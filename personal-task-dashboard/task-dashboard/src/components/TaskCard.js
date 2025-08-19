// src/components/TaskCard.js
import Link from 'next/link';
import { getCategoryName } from '@/lib/categories';

export default function TaskCard({ task, showActions = true }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-blue-600 bg-blue-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };
  
  const isOverdue = () => {
    const today = new Date().toISOString().split('T')[0];
    return task.status !== 'completed' && task.dueDate < today;
  };
  
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
      isOverdue() ? 'border-red-500' : 'border-gray-200'
    } hover:shadow-lg transition-shadow`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <Link 
            href={`/tasks/${task.id}`}
            className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
          >
            {task.title}
          </Link>
          <p className="text-gray-600 mt-1 text-sm">{task.description}</p>
        </div>
        
        {isOverdue() && (
          <span className="text-red-500 text-sm font-medium bg-red-100 px-2 py-1 rounded">
            Overdue
          </span>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
          {task.priority} priority
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
          {task.status}
        </span>
        <span className="px-2 py-1 rounded-full text-xs font-medium text-blue-600 bg-blue-100">
          {getCategoryName(task.categoryId)}
        </span>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>Due: {task.dueDate}</span>
        {task.completedAt && (
          <span>Completed: {task.completedAt}</span>
        )}
      </div>
      
      {showActions && (
        <div className="mt-4 flex gap-2">
          <Link
            href={`/tasks/${task.id}`}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors"
          >
            View Details
          </Link>
          <button className="bg-gray-500 text-white px-3 py-1 rounded text-sm hover:bg-gray-600 transition-colors">
            Edit
          </button>
        </div>
      )}
    </div>
  );
}