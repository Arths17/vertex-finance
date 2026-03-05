import React from 'react';

export function StrategyCard({ strategy, deployed = false }) {
  return (
    <div className="group card-base p-6 hover:border-blue-500/50">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{strategy.name}</h3>
        {deployed && (
          <span className="badge-success">Active</span>
        )}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 gap-2 mb-6 pb-6 border-b border-gray-700">
        <div className="bg-slate-900 p-3 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-xs mb-1">Return</p>
          <p className="text-green-400 font-bold text-lg">{strategy.return}</p>
        </div>
        <div className="bg-slate-900 p-3 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-xs mb-1">Sharpe</p>
          <p className="text-cyan-400 font-bold text-lg">{strategy.sharpe}</p>
        </div>
        <div className="bg-slate-900 p-3 rounded-lg border border-gray-700">
          <p className="text-gray-400 text-xs mb-1">Win Rate</p>
          <p className="text-purple-400 font-bold text-lg">{strategy.winRate}%</p>
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all group-hover:scale-105">
        {deployed ? 'Manage Strategy' : 'Deploy Now'}
      </button>
    </div>
  );
}
