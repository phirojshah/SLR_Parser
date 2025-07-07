import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface GrammarInputProps {
  onGrammarChange: (grammar: string) => void;
  onGenerateTables: () => void;
}

export const GrammarInput: React.FC<GrammarInputProps> = ({ onGrammarChange, onGenerateTables }) => {
  const [grammar, setGrammar] = useState(`E' -> E
E -> E + T
E -> T
T -> T * F
T -> F
F -> ( E )
F -> id`);

  const handleGrammarChange = (value: string) => {
    setGrammar(value);
    onGrammarChange(value);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">SLR Parser</h2>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-4 text-center">
          Project B: SLR Parser for Arithmetic Expressions<br />
          Target string: id*id+id$ | Empty sentence (ε) = "ε"
        </p>
        
        <div className="max-w-2xl mx-auto">
          <textarea
            value={grammar}
            onChange={(e) => handleGrammarChange(e.target.value)}
            className="w-full h-60 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none font-mono text-sm"
            placeholder="Enter your grammar rules here..."
          />
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onGenerateTables}
          className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto"
        >
          <Play className="w-5 h-5" />
          <span>Generate Syntax Tables</span>
        </button>
      </div>
    </div>
  );
};