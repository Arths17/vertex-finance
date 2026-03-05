import React, { useEffect, useRef } from 'react';

export function VertexChart({ symbol = 'GOOG' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // This is a placeholder for Lightweight Charts integration
    // In production, install: npm install lightweight-charts
    // and implement the actual chart rendering here
    if (containerRef.current) {
      containerRef.current.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #888; flex-direction: column; gap: 12px;">
          <div style="font-size: 14px; color: #aaa;">📊 ${symbol}/USD</div>
          <p style="font-size: 12px; color: #666;">15M Chart - Chart integration coming soon</p>
          <div style="font-size: 28px; font-weight: bold; color: #00ff88; text-shadow: 0 0 20px rgba(0, 255, 136, 0.3);">
            ${Math.random() > 0.5 ? '+' : '-'}${(Math.random() * 5).toFixed(2)}%
          </div>
        </div>
      `;
    }
  }, [symbol]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full rounded-lg border border-gray-800 bg-gradient-to-br from-slate-900 to-slate-950"
      style={{ minHeight: '300px' }}
    />
  );
}
