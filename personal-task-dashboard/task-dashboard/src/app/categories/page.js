// app/categories/page.js
import Link from 'next/link';
import { getAllCategories } from '../../lib/categories';
import { getAllTasks } from '../../lib/tasks';
import CategoryCard from '../../components/CategoryCard';

export const metadata = {
  title: 'Categories',
  description: 'Organize your tasks by categories. View all task categories and their associated tasks.'
};

// Enable static generation for this page
export const dynamic = 'force-static';

export default function CategoriesPage() {
  const categories = getAllCategories();
  const tasks = getAllTasks();
  
  // Calculate category statistics
  const categoryStats = categories.map(category => {
    const categoryTasks = tasks.filter(task => task.categoryId === category.id);
    const completedTasks = categoryTasks.filter(task => task.status === 'completed');
    const pendingTasks = categoryTasks.filter(task => task.status === 'pending');
    const inProgressTasks = categoryTasks.filter(task => task.status === 'in-progress');
    
    return {
      ...category,
      totalTasks: categoryTasks.length,
      completedTasks: completedTasks.length,
      pendingTasks: pendingTasks.length,
      inProgressTasks: inProgressTasks.length,
      completionRate: categoryTasks.length > 0 
        ? Math.round((completedTasks.length / categoryTasks.length) * 100) 
        : 0
    };
  });
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Categories</h1>
        <p className="text-gray-600">
          Organize your tasks by categories to stay focused and productive. 
          Currently managing {categories.length} categories with {tasks.length} total tasks.
        </p>
      </div>
      
      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{categories.length}</div>
            <div className="text-sm text-blue-800">Total Categories</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {categoryStats.reduce((sum, cat) => sum + cat.completedTasks, 0)}
            </div>
            <div className="text-sm text-green-800">Completed Tasks</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">
              {categoryStats.reduce((sum, cat) => sum + cat.pendingTasks + cat.inProgressTasks, 0)}
            </div>
            <div className="text-sm text-yellow-800">Active Tasks</div>
          </div>
        </div>
      </div>
      
      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryStats.map(category => (
          <div key={category.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="p-6">
              {/* Category Header */}
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center text-white text-xl mr-4`}>
                  {category.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.description}</p>
                </div>
              </div>
              
              {/* Task Statistics */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Total Tasks:</span>
                  <span className="font-medium text-gray-900">{category.totalTasks}</span>
                </div>
                
                {category.totalTasks > 0 && (
                  <>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Completed:</span>
                      <span className="font-medium text-green-600">{category.completedTasks}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">In Progress:</span>
                      <span className="font-medium text-blue-600">{category.inProgressTasks}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Pending:</span>
                      <span className="font-medium text-yellow-600">{category.pendingTasks}</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between items-center text-sm mb-1">
                        <span className="text-gray-600">Progress:</span>
                        <span className="font-medium text-gray-900">{category.completionRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${category.completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/tasks?category=${category.id}`}
                  className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm text-center hover:bg-gray-200 transition-colors"
                >
                  View Tasks
                </Link>
                <Link
                  href={`/tasks/add?category=${category.id}`}
                  className="flex-1 bg-blue-500 text-white px-3 py-2 rounded text-sm text-center hover:bg-blue-600 transition-colors"
                >
                  Add Task
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Category Tips */}
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-900 mb-3">📁 Category Best Practices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-800">
          <div>
            <h4 className="font-medium mb-2">🎯 Focus Areas</h4>
            <ul className="space-y-1 text-sm">
              <li>• Work: Professional projects and deadlines</li>
              <li>• Personal: Life goals and personal development</li>
              <li>• Health: Wellness and fitness activities</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">⚡ Productivity Tips</h4>
            <ul className="space-y-1 text-sm">
              <li>• Use categories to batch similar tasks</li>
              <li>• Review each category's progress weekly</li>
              <li>• Balance tasks across different life areas</li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            href="/tasks?status=pending"
            className="bg-yellow-500 text-white p-4 rounded-lg hover:bg-yellow-600 transition-colors text-center"
          >
            <div className="text-2xl mb-2">⏳</div>
            <div className="font-medium">Pending Tasks</div>
          </Link>
          
          <Link
            href="/"
            className="bg-gray-500 text-white p-4 rounded-lg hover:bg-gray-600 transition-colors text-center"
          >
            <div className="text-2xl mb-2">📊</div>
            <div className="font-medium">Dashboard</div>
          </Link>
        </div>
      </div>
    </div>
  );
}