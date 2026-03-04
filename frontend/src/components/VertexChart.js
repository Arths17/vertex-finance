import React, { useEffect, useRef } from 'react';

export function VertexChart({ symbol = 'GOOG' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // This is a placeholder for Lightweight Charts integration
    // In production, install: npm install lightweight-charts
    // and implement the actual chart rendering here
    if (containerRef.current) {
      // Chart will be initialized here
      containerRef.current.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #888;">
          <p>Chart for ${symbol} (15M candlesticks)</p>
        </div>
      `;
    }
  }, [symbol]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-gray-900 rounded border border-gray-700"
      style={{ minHeight: '300px' }}
    />
  );
}
