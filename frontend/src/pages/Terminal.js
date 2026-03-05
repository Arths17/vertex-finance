import React, { useState, useEffect } from 'react';
import { VertexChart } from '../components/VertexChart';
import { CodeEditor } from '../components/CodeEditor';
import { VertexAI } from '../components/VertexAI';

export default function Terminal() {
  const [selectedSymbol, setSelectedSymbol] = useState('GOOG');
  const [mode, setMode] = useState('analysis'); // analysis or strategy

  return (
    <div className="w-full min-h-screen bg-black text-white pt-20">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4 bg-slate-900/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">AI Terminal</h1>
            <p className="text-gray-400 text-sm mt-1">Real-time market analysis and strategy building</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setMode('analysis')} className={`px-4 py-2 rounded-lg transition-all ${mode === 'analysis' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300'}`}>
              Analysis
            </button>
            <button onClick={() => setMode('strategy')} className={`px-4 py-2 rounded-lg transition-all ${mode === 'strategy' ? 'bg-blue-500 text-white' : 'bg-gray-800 text-gray-300'}`}>
              Strategy Build
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 gap-6 h-[calc(100vh-200px)]">
            {/* Left: AI Chat */}
            <div className="col-span-1 bg-slate-900/50 rounded-xl border border-gray-800 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-800">
                <h2 className="font-bold text-white flex items-center gap-2">
                  <span className="text-xl">🤖</span>
                  Astral AI
                </h2>
                <p className="text-xs text-gray-400 mt-1">Ask me anything about the market</p>
              </div>
              <div className="flex-1 overflow-y-auto">
                <VertexAI symbol={selectedSymbol} />
              </div>
            </div>

            {/* Center: Chart */}
            <div className="col-span-1 bg-slate-900/50 rounded-xl border border-gray-800 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm mb-1">Chart</p>
                    <input
                      type="text"
                      value={selectedSymbol}
                      onChange={(e) => setSelectedSymbol(e.target.value.toUpperCase())}
                      className="bg-gray-800 border border-gray-700 px-3 py-2 rounded text-white font-bold focus:outline-none focus:border-blue-500"
                      placeholder="Symbol"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                <VertexChart symbol={selectedSymbol} />
              </div>
            </div>

            {/* Right: Code Panel */}
            <div className="col-span-1 bg-slate-900/50 rounded-xl border border-gray-800 overflow-hidden flex flex-col">
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center gap-2">
                  <span className="text-lg">💻</span>
                  <h3 className="font-bold text-white">Code Editor</h3>
                </div>
                <p className="text-xs text-gray-400 mt-1">Write strategy rules</p>
              </div>
              <div className="flex-1 overflow-y-auto">
                <CodeEditor />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
