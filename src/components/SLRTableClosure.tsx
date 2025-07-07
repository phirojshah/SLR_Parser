import React from 'react';
import { State } from '../types/grammar';

interface SLRTableClosureProps {
  states: State[];
}

export const SLRTableClosure: React.FC<SLRTableClosureProps> = ({ states }) => {
  const formatItem = (item: any) => {
    const rightPart = [...item.production.right];
    rightPart.splice(item.dotPosition, 0, '•');
    return `{${item.production.left} -> ${rightPart.join(' ')}}`;
  };

  const formatItems = (items: any[]) => {
    return items.map(item => formatItem(item)).join(', ');
  };

  const getGotoLabel = (stateId: number, states: State[]) => {
    if (stateId === 0) return '-';
    
    // Find which state and symbol led to this state
    for (const state of states) {
      for (const [symbol, targetId] of state.goto.entries()) {
        if (targetId === stateId) {
          return `goto(${state.id}, ${symbol})`;
        }
      }
    }
    return '-';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 bg-red-100 p-3 rounded-lg">
        SLR States and Closures
      </h3>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 p-3 text-left font-semibold">State</th>
              <th className="border border-gray-300 p-3 text-left font-semibold">GOTO</th>
              <th className="border border-gray-300 p-3 text-left font-semibold">Canonical Items</th>
              <th className="border border-gray-300 p-3 text-left font-semibold">Closure</th>
            </tr>
          </thead>
          <tbody>
            {states.map((state, index) => (
              <tr key={state.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="border border-gray-300 p-3 text-center font-semibold">
                  {state.id}
                </td>
                <td className="border border-gray-300 p-3">
                  {getGotoLabel(state.id, states)}
                </td>
                <td className="border border-gray-300 p-3 font-mono text-sm">
                  {formatItems(state.items)}
                </td>
                <td className="border border-gray-300 p-3 font-mono text-sm">
                  {formatItems(state.closure)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};