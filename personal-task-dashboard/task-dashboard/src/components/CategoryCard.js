// src/components/CategoryCard.js
import Link from 'next/link';

export default function CategoryCard({ category }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center text-white text-xl mr-4`}>
          {category.icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
          <p className="text-gray-600 text-sm">{category.description}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <span className="font-medium text-gray-900">{category.taskCount}</span> 
          {category.taskCount === 1 ? ' task' : ' tasks'}
        </div>
        
        <Link
          href={`/tasks?category=${category.id}`}
          className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-200 transition-colors"
        >
          View Tasks
        </Link>
      </div>
    </div>
  );
}