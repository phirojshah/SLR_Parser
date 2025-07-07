import React from 'react';
import { BookOpen, FileText } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold">Final Project Compiler</h1>
          </div>
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span className="text-sm">Documentation</span>
          </div>
        </div>
      </div>
    </header>
  );
};