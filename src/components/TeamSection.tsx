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
            <img
              src="/sushilnepal1.png" // Make sure this is the correct public path in your app
              alt="Sushil Nepal"
              className="w-32 h-32 rounded-full object-cover shadow-lg"
            />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-2xl font-bold text-gray-800 mb-2">Mr. Sushil Nepal</h4>
            <p className="text-lg text-blue-600 font-semibold mb-4">Project Supervisor</p>
            <p className="text-gray-600 mb-4">
              Asst. Professor of Computer Science specializing in Compiler Design and Programming Languages. 
              Expert in formal language theory, parsing algorithms, and syntax analysis.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
              <div className="flex items-center justify-center md:justify-start">
                <Mail className="w-4 h-4 mr-2" />
                <span>sushilnepal@ku.edu.np</span>
              </div>

              <div className="flex items-center justify-center md:justify-start">
                <MapPin className="w-4 h-4 mr-2" />
                <span>Department of Computer Science & Engineering</span>
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