import React from 'react';
import { FirstFollowSet } from '../types/grammar';

interface FirstFollowTableProps {
  firstFollowSets: FirstFollowSet[];
}

export const FirstFollowTable: React.FC<FirstFollowTableProps> = ({ firstFollowSets }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 bg-red-100 p-3 rounded-lg">
        Table First / Follow
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-3 text-left font-semibold">Non-terminal</th>
              <th className="border border-gray-300 p-3 text-left font-semibold">FIRST</th>
              <th className="border border-gray-300 p-3 text-left font-semibold">FOLLOW</th>
            </tr>
          </thead>
          <tbody>
            {firstFollowSets.map((set, index) => (
              <tr key={set.nonTerminal} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border border-gray-300 p-3 font-semibold">{set.nonTerminal}</td>
                <td className="border border-gray-300 p-3 font-mono">
                  {'{' + set.first.join(', ') + '}'}
                </td>
                <td className="border border-gray-300 p-3 font-mono">
                  {'{' + set.follow.join(', ') + '}'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};