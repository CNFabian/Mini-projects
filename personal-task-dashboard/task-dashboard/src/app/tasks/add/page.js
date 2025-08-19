// app/tasks/add/page.js
'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import TaskForm from '../../../components/TaskForm';
import { createTask } from '../../../lib/tasks';

export default function AddTaskPage() {
  const router = useRouter();
  
  const handleSubmit = (taskData) => {
    try {
      const newTask = createTask(taskData);
      console.log('Task created:', newTask);
      
      // Redirect to the new task's detail page
      router.push(`/tasks/${newTask.id}`);
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again.');
    }
  };
  
  const handleCancel = () => {
    router.push('/tasks');
  };
  
  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <Link href="/" className="hover:text-blue-600">Dashboard</Link>
        <span>/</span>
        <Link href="/tasks" className="hover:text-blue-600">Tasks</Link>
        <span>/</span>
        <span className="text-gray-900">Add Task</span>
      </div>
      
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Task</h1>
        <p className="text-gray-600">Add a new task to organize your work and boost productivity.</p>
      </div>
      
      {/* Task Form */}
      <TaskForm 
        onSubmit={handleSubmit} 
        onCancel={handleCancel} 
      />
      
      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Tips for Better Task Management</h3>
        <ul className="space-y-2 text-blue-800">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Be specific with your task titles and descriptions</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Set realistic due dates to avoid overcommitment</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Use appropriate priority levels to focus on what matters most</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Choose the right category to keep tasks organized</span>
          </li>
        </ul>
      </div>
    </div>
  );
}