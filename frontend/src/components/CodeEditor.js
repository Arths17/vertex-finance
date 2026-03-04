import React, { useState } from 'react';

export function CodeEditor() {
  const [code, setCode] = useState(`def strategy(data):
    if data['rsi'] < 30:
        return 'BUY'
    elif data['rsi'] > 70:
        return 'SELL'
    return 'HOLD'`);

  return (
    <div className="w-full h-32 bg-gray-900 rounded border border-gray-700 p-3 font-mono text-sm">
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-full bg-transparent text-vertex-green outline-none resize-none"
        spellCheck="false"
      />
    </div>
  );
}
