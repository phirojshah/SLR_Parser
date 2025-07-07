import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { ParseStep } from '../types/grammar';

interface InputParserProps {
  onParse: (input: string) => ParseStep[];
}

export const InputParser: React.FC<InputParserProps> = ({ onParse }) => {
  const [input, setInput] = useState('id * id + id');
  const [parseSteps, setParseSteps] = useState<ParseStep[]>([]);

  const handleParse = () => {
    const steps = onParse(input);
    setParseSteps(steps);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 bg-red-100 p-3 rounded-lg">
          Input Sequence:
        </h3>
        
        <div className="flex space-x-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
            placeholder="Enter input sequence (e.g., id * id + id)"
          />
          <button
            onClick={handleParse}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>Display Parsing Sequence</span>
          </button>
        </div>
      </div>

      {parseSteps.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Parsing Input Sequence
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 p-3 text-left font-semibold">Step</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Stack</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Input String</th>
                  <th className="border border-gray-300 p-3 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {parseSteps.map((step, index) => (
                  <tr key={step.step} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 p-3 text-center font-semibold">{step.step}</td>
                    <td className="border border-gray-300 p-3 font-mono">{step.stack.join(' ')}</td>
                    <td className="border border-gray-300 p-3 font-mono">{step.input}</td>
                    <td className="border border-gray-300 p-3">{step.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};