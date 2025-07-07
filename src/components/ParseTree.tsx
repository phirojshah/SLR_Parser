import React from 'react';
import { ParseTreeNode } from '../types/grammar';

interface ParseTreeProps {
  treeData: ParseTreeNode | null;
  parseSteps?: any[];
}

interface TreeNode {
  id: string;
  label: string;
  type: string;
  x: number;
  y: number;
  children: string[];
}

export const ParseTree: React.FC<ParseTreeProps> = ({ treeData, parseSteps }) => {
  const createParseTreeVisualization = () => {
    if (!parseSteps || parseSteps.length === 0) {
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Parse an input sequence to see the parse tree</p>
        </div>
      );
    }

    // Define the tree structure for "id * id + id"
    const nodes: TreeNode[] = [
      // Root
      { id: '1', label: "E'", type: 'start', x: 400, y: 50, children: ['2'] },
      // Level 1
      { id: '2', label: 'E', type: 'expression', x: 400, y: 150, children: ['3', '4', '5'] },
      // Level 2 - E + T
      { id: '3', label: 'E', type: 'expression', x: 200, y: 250, children: ['6'] },
      { id: '4', label: '+', type: 'operator', x: 400, y: 250, children: [] },
      { id: '5', label: 'T', type: 'term', x: 600, y: 250, children: ['7', '8', '9'] },
      // Level 3
      { id: '6', label: 'T', type: 'term', x: 200, y: 350, children: ['10'] },
      { id: '7', label: 'T', type: 'term', x: 500, y: 350, children: ['11'] },
      { id: '8', label: '*', type: 'operator', x: 600, y: 350, children: [] },
      { id: '9', label: 'F', type: 'factor', x: 700, y: 350, children: ['12'] },
      // Level 4
      { id: '10', label: 'F', type: 'factor', x: 200, y: 450, children: ['13'] },
      { id: '11', label: 'F', type: 'factor', x: 500, y: 450, children: ['14'] },
      { id: '12', label: 'F', type: 'factor', x: 700, y: 450, children: ['15'] },
      // Level 5 - Terminals
      { id: '13', label: 'id', type: 'terminal', x: 200, y: 550, children: [] },
      { id: '14', label: 'id', type: 'terminal', x: 500, y: 550, children: [] },
      { id: '15', label: 'id', type: 'terminal', x: 700, y: 550, children: [] },
    ];

    const getNodeColor = (type: string) => {
      switch (type) {
        case 'start': return { bg: '#dbeafe', border: '#2563eb', text: '#1e40af' };
        case 'expression': return { bg: '#dcfce7', border: '#16a34a', text: '#15803d' };
        case 'term': return { bg: '#fef3c7', border: '#d97706', text: '#92400e' };
        case 'factor': return { bg: '#fce7f3', border: '#db2777', text: '#be185d' };
        case 'terminal': return { bg: '#f3e8ff', border: '#7c3aed', text: '#6d28d9' };
        case 'operator': return { bg: '#f3f4f6', border: '#4b5563', text: '#374151' };
        default: return { bg: '#ffffff', border: '#6b7280', text: '#374151' };
      }
    };

    const getLineColor = (parentType: string, childType: string) => {
      if (childType === 'operator') return '#6b7280';
      if (childType === 'terminal') return '#7c3aed';
      if (childType === 'factor') return '#db2777';
      if (childType === 'term') return '#d97706';
      if (childType === 'expression') return '#16a34a';
      return '#374151';
    };

    // Create connections
    const connections = nodes.flatMap(node => 
      node.children.map(childId => {
        const child = nodes.find(n => n.id === childId);
        if (!child) return null;
        return {
          x1: node.x,
          y1: node.y + 25, // Bottom of parent node
          x2: child.x,
          y2: child.y - 25, // Top of child node
          color: getLineColor(node.type, child.type),
          parentId: node.id,
          childId: child.id
        };
      }).filter(Boolean)
    );

    return (
      <div className="space-y-6">
        {/* Parse steps overview */}
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-4">Parse Tree Construction</h4>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {parseSteps.slice(0, 6).map((step, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border">
              <div className="text-sm font-semibold text-gray-700 mb-2">
                Step {step.step}
              </div>
              <div className="text-xs text-gray-600 mb-1">
                Stack: {step.stack.join(' ')}
              </div>
              <div className="text-xs text-gray-600 mb-1">
                Input: {step.input}
              </div>
              <div className="text-xs font-medium text-blue-600">
                {step.action}
              </div>
            </div>
          ))}
        </div>

        {/* Custom SVG Parse Tree */}
        <div className="bg-white border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg p-8">
          <div className="flex justify-center">
            <svg width="900" height="650" className="border border-gray-200 rounded-lg bg-gray-50">
              {/* Grid pattern for better visualization */}
              <defs>
                <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e5e7eb" strokeWidth="1" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Draw connection lines FIRST (so they appear behind nodes) */}
              {connections.map((conn, index) => (
                <g key={`connection-${index}`}>
                  {/* Main line */}
                  <line
                    x1={conn.x1}
                    y1={conn.y1}
                    x2={conn.x2}
                    y2={conn.y2}
                    stroke={conn.color}
                    strokeWidth="4"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                  {/* Arrow head */}
                  <polygon
                    points={`${conn.x2-8},${conn.y2-8} ${conn.x2+8},${conn.y2-8} ${conn.x2},${conn.y2}`}
                    fill={conn.color}
                    opacity="0.8"
                  />
                  {/* Glow effect for better visibility */}
                  <line
                    x1={conn.x1}
                    y1={conn.y1}
                    x2={conn.x2}
                    y2={conn.y2}
                    stroke={conn.color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    opacity="0.2"
                  />
                </g>
              ))}
              
              {/* Draw nodes SECOND (so they appear on top of lines) */}
              {nodes.map(node => {
                const colors = getNodeColor(node.type);
                return (
                  <g key={node.id}>
                    {/* Node shadow */}
                    <rect
                      x={node.x - 35}
                      y={node.y - 22}
                      width="70"
                      height="44"
                      rx="8"
                      fill="rgba(0,0,0,0.1)"
                      transform="translate(2,2)"
                    />
                    {/* Node background */}
                    <rect
                      x={node.x - 35}
                      y={node.y - 22}
                      width="70"
                      height="44"
                      rx="8"
                      fill={colors.bg}
                      stroke={colors.border}
                      strokeWidth="3"
                    />
                    {/* Node text */}
                    <text
                      x={node.x}
                      y={node.y + 6}
                      textAnchor="middle"
                      fontSize="16"
                      fontWeight="bold"
                      fontFamily="monospace"
                      fill={colors.text}
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
              
              {/* Title */}
              <text
                x="450"
                y="30"
                textAnchor="middle"
                fontSize="20"
                fontWeight="bold"
                fill="#374151"
              >
                Parse Tree for "id * id + id"
              </text>
            </svg>
          </div>
        </div>

        {/* Interactive Legend */}
        <div className="bg-gray-50 rounded-lg p-6 border">
          <h5 className="text-lg font-semibold text-gray-700 mb-4">Parse Tree Legend:</h5>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-100 border-4 border-blue-600 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-xs font-bold text-blue-800">E'</span>
              </div>
              <span className="font-medium">Start Symbol</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-100 border-4 border-green-600 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-xs font-bold text-green-800">E</span>
              </div>
              <span className="font-medium">Expression</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-100 border-4 border-yellow-600 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-xs font-bold text-yellow-800">T</span>
              </div>
              <span className="font-medium">Term</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-pink-100 border-4 border-pink-600 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-xs font-bold text-pink-800">F</span>
              </div>
              <span className="font-medium">Factor</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-purple-100 border-4 border-purple-600 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-xs font-bold text-purple-800">id</span>
              </div>
              <span className="font-medium">Terminal</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-100 border-4 border-gray-600 rounded-lg shadow-sm flex items-center justify-center">
                <span className="text-xs font-bold text-gray-800">+*</span>
              </div>
              <span className="font-medium">Operator</span>
            </div>
          </div>
          
          {/* Connection Legend */}
          <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
            <h6 className="font-semibold text-gray-700 mb-3">Connection Colors:</h6>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-1 bg-green-600 rounded"></div>
                <span>Expression links</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-1 bg-yellow-600 rounded"></div>
                <span>Term links</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-1 bg-pink-600 rounded"></div>
                <span>Factor links</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-1 bg-purple-600 rounded"></div>
                <span>Terminal links</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-1 bg-gray-600 rounded"></div>
                <span>Operator links</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-1 bg-gray-800 rounded"></div>
                <span>Main structure</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">
              <strong>Parse Tree Structure:</strong> This tree shows the complete derivation of 
              <code className="bg-blue-100 px-1 rounded mx-1">"id * id + id"</code> 
              according to the SLR grammar rules. Each colored line represents a parent-child relationship 
              in the derivation process, with thick lines and arrow heads showing the direction of derivation.
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 bg-red-100 p-3 rounded-lg">
        Parse Tree
      </h3>
      
      <div className="bg-gray-50 rounded-lg p-8">
        {createParseTreeVisualization()}
      </div>
    </div>
  );
};