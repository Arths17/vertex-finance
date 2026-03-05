import React, { useState } from 'react';

export function CodeEditor() {
  const [code, setCode] = useState(`# Define your strategy logic
def on_bar(data):
    rsi = calculate_rsi(data)
    
    if rsi < 30:
        return 'BUY'
    elif rsi > 70:
        return 'SELL'
    return 'HOLD'`);

  return (
    <div className="w-full h-full flex flex-col rounded-lg overflow-hidden">
      <div className="px-4 py-3 bg-slate-900 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Code</p>
          <div className="flex gap-2">
            <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors">Save</button>
            <button className="text-xs text-gray-400 hover:text-gray-200 transition-colors">Format</button>
          </div>
        </div>
      </div>
      <div className="flex-1 bg-slate-950 overflow-hidden">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-full bg-transparent text-cyan-400 outline-none resize-none p-4 font-mono text-sm leading-relaxed"
          spellCheck="false"
          placeholder="Write your strategy code here..."
        />
      </div>
    </div>
  );
}
