import React from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';

export const TeamSection: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Supervisor Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-t-lg">
            <h3 className="text-2xl font-bold text-center">Supervisor</h3>
          </div>
          
          <div className="bg-white rounded-b-lg shadow-lg p-8">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-16 h-16 text-white" />
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-2xl font-bold text-gray-800 mb-2">Dr. Sushil Nepal</h4>
                <p className="text-lg text-blue-600 font-semibold mb-4">Project Supervisor</p>
                <p className="text-gray-600 mb-4">
                  Professor of Computer Science specializing in Compiler Design and Programming Languages. 
                  Expert in formal language theory, parsing algorithms, and syntax analysis.
                </p>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
                  <div className="flex items-center justify-center md:justify-start">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>sushil.nepal@university.edu</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>+977-1-234-5678</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>Computer Science Department</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div>
          <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 px-6 rounded-t-lg">
            <h3 className="text-2xl font-bold text-center">Team Members</h3>
          </div>
          
          <div className="bg-white rounded-b-lg shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h5 className="text-xl font-bold text-gray-800 mb-2">John Doe</h5>
                <p className="text-pink-600 font-semibold mb-2">Lead Developer</p>
                <p className="text-gray-600 text-sm mb-3">
                  Specialized in parser implementation and algorithm optimization.
                </p>
                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex items-center justify-center">
                    <Mail className="w-3 h-3 mr-1" />
                    <span>john.doe@student.edu</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span>Student ID: CS2021001</span>
                  </div>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h5 className="text-xl font-bold text-gray-800 mb-2">Jane Smith</h5>
                <p className="text-green-600 font-semibold mb-2">UI/UX Designer</p>
                <p className="text-gray-600 text-sm mb-3">
                  Focused on user interface design and visualization components.
                </p>
                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex items-center justify-center">
                    <Mail className="w-3 h-3 mr-1" />
                    <span>jane.smith@student.edu</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span>Student ID: CS2021002</span>
                  </div>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h5 className="text-xl font-bold text-gray-800 mb-2">Mike Johnson</h5>
                <p className="text-purple-600 font-semibold mb-2">Algorithm Specialist</p>
                <p className="text-gray-600 text-sm mb-3">
                  Expert in FIRST/FOLLOW sets and SLR table construction.
                </p>
                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex items-center justify-center">
                    <Mail className="w-3 h-3 mr-1" />
                    <span>mike.johnson@student.edu</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span>Student ID: CS2021003</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Information */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <h6 className="text-lg font-semibold text-gray-800 mb-2">Project Information</h6>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">Course:</span> Compiler Design
                  </div>
                  <div>
                    <span className="font-semibold">Semester:</span> Fall 2024
                  </div>
                  <div>
                    <span className="font-semibold">Project:</span> SLR Parser Implementation
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};