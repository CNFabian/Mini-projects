// src/app/layout.js
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    template: '%s | Task Dashboard',
    default: 'Task Dashboard - Manage Your Tasks Efficiently'
  },
  description: 'A personal task management dashboard built with Next.js, React, and Tailwind CSS. Organize your tasks, track progress, and boost productivity.',
  keywords: ['task management', 'productivity', 'todo', 'dashboard', 'Next.js'],
  authors: [{ name: 'Task Dashboard' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {children}
        </main>
      </body>
    </html>
  );
}