import React from 'react';
import { SLRParser } from '../utils/slrParser';

interface SLRSyntaxTableProps {
  parser?: SLRParser;
}

export const SLRSyntaxTable: React.FC<SLRSyntaxTableProps> = ({ parser }) => {
  if (!parser) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 bg-red-100 p-3 rounded-lg">
          SLR Syntax Table
        </h3>
        <p className="text-gray-600">Generate states first to view the SLR table.</p>
      </div>
    );
  }

  const states = parser.getStates();
  const slrTable = parser.getSLRTable();
  const terminals = ['id', '+', '*', '(', ')', '$'];
  const nonTerminals = ["E'", 'E', 'T', 'F'];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 bg-red-100 p-3 rounded-lg">
        SLR Syntax Table
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-2 font-semibold">State</th>
              <th colSpan={terminals.length} className="border border-gray-300 p-2 font-semibold bg-blue-50">Action</th>
              <th colSpan={nonTerminals.length} className="border border-gray-300 p-2 font-semibold bg-green-50">GoTo</th>
            </tr>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-2 font-semibold"></th>
              {terminals.map(terminal => (
                <th key={terminal} className="border border-gray-300 p-2 font-semibold">{terminal}</th>
              ))}
              {nonTerminals.map(nonTerminal => (
                <th key={nonTerminal} className="border border-gray-300 p-2 font-semibold">{nonTerminal}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {states.map((state, index) => {
              const actionMap = slrTable.get(state.id) || new Map();
              
              return (
                <tr key={state.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-300 p-2 font-semibold text-center">{state.id}</td>
                  
                  {/* Action columns */}
                  {terminals.map(terminal => (
                    <td key={terminal} className="border border-gray-300 p-2 text-center">
                      {actionMap.get(terminal) || ''}
                    </td>
                  ))}
                  
                  {/* GoTo columns */}
                  {nonTerminals.map(nonTerminal => (
                    <td key={nonTerminal} className="border border-gray-300 p-2 text-center">
                      {state.goto.get(nonTerminal) !== undefined ? state.goto.get(nonTerminal) : ''}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};