import React from 'react';

export function StrategyCard({ strategy, deployed = false }) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded p-4 hover:border-vertex-green transition">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-vertex-green font-bold text-lg">{strategy.name}</h3>
        {deployed && (
          <span className="text-xs bg-vertex-green text-vertex-bg px-2 py-1 rounded font-bold">
            Active
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
        <div className="bg-vertex-bg p-2 rounded">
          <p className="text-gray-500 text-xs">Return</p>
          <p className="text-vertex-green font-bold">{strategy.return}</p>
        </div>
        <div className="bg-vertex-bg p-2 rounded">
          <p className="text-gray-500 text-xs">Sharpe</p>
          <p className="text-vertex-green font-bold">{strategy.sharpe}</p>
        </div>
        <div className="bg-vertex-bg p-2 rounded">
          <p className="text-gray-500 text-xs">Win Rate</p>
          <p className="text-vertex-green font-bold">{strategy.winRate}%</p>
        </div>
      </div>

      <button className="w-full bg-vertex-green text-vertex-bg font-bold py-2 rounded hover:opacity-80 transition text-sm">
        {deployed ? 'Manage' : 'Deploy'}
      </button>
    </div>
  );
}
