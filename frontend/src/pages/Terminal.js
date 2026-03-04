import React, { useState, useEffect } from 'react';
import { VertexChart } from '../components/VertexChart';
import { CodeEditor } from '../components/CodeEditor';
import { VertexAI } from '../components/VertexAI';

export default function Terminal() {
  const [selectedSymbol, setSelectedSymbol] = useState('GOOG');

  return (
    <div className="w-full h-screen bg-vertex-bg text-white p-4">
      <div className="grid grid-cols-2 gap-4 h-full">
        {/* Left: Vertex AI Chat */}
        <div className="bg-vertex-card rounded-lg p-4 overflow-y-auto">
          <VertexAI symbol={selectedSymbol} />
        </div>

        {/* Right: Chart */}
        <div className="bg-vertex-card rounded-lg p-4 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-vertex-green">${selectedSymbol}</h2>
            <input
              type="text"
              value={selectedSymbol}
              onChange={(e) => setSelectedSymbol(e.target.value.toUpperCase())}
              className="bg-gray-800 border border-vertex-green px-2 py-1 rounded text-white"
              placeholder="Symbol"
            />
          </div>
          <div className="flex-1">
            <VertexChart symbol={selectedSymbol} />
          </div>
        </div>
      </div>

      {/* Bottom: Code Panel */}
      <div className="mt-4 bg-vertex-card rounded-lg p-4">
        <h3 className="text-vertex-green font-bold mb-2">CODE</h3>
        <CodeEditor />
      </div>
    </div>
  );
}
