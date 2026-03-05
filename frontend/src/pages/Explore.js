import React, { useState } from 'react';
import { StrategyCard } from '../components/StrategyCard';

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState('');
  const [strategies] = useState([
    {
      id: 1,
      name: 'Monthly Rebalance',
      author: 'QuantTrader',
      return: '12.5%',
      sharpe: 1.2,
      winRate: 65,
      description: 'Rebalance portfolio monthly based on market conditions',
      views: 3142,
      copies: 1208,
    },
    {
      id: 2,
      name: 'Volatility Minimization',
      author: 'RiskManager',
      return: '8.3%',
      sharpe: 1.8,
      winRate: 58,
      description: 'Uses VIX levels to adjust position sizing',
      views: 4601,
      copies: 1872,
    },
    {
      id: 3,
      name: 'Momentum Trading',
      author: 'TrendFollower',
      return: '18.7%',
      sharpe: 0.9,
      winRate: 52,
      description: 'Capitalize on price momentum with technical indicators',
      views: 8321,
      copies: 2094,
    },
    {
      id: 4,
      name: 'Mean Reversion',
      author: 'ValueHunter',
      return: '11.2%',
      sharpe: 1.5,
      winRate: 68,
      description: 'Trade when prices deviate significantly from moving average',
      views: 2847,
      copies: 956,
    },
    {
      id: 5,
      name: 'Dividend Growth',
      author: 'IncomeStrategy',
      return: '9.1%',
      sharpe: 1.3,
      winRate: 71,
      description: 'Focus on dividend-yielding stocks with growth potential',
      views: 1943,
      copies: 743,
    },
    {
      id: 6,
      name: 'Tech Sector Rotation',
      author: 'SectorAnalyst',
      return: '15.3%',
      sharpe: 1.1,
      winRate: 54,
      description: 'Rotate between tech stocks based on earnings cycles',
      views: 5672,
      copies: 1521,
    },
  ]);

  const filteredStrategies = strategies.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-black text-white pt-20">
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-8 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2">Share & Discover</h1>
          <p className="text-gray-400">Explore community-built strategies and innovative trading models</p>
        </div>
      </div>

      <div className="px-6 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search strategies or authors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/50 border border-gray-700 px-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all"
              />
              <span className="absolute right-4 top-3 text-gray-500">🔍</span>
            </div>
          </div>

          {/* Strategy Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStrategies.map((strategy) => (
              <div key={strategy.id} className="group bg-slate-900/50 rounded-xl border border-gray-800 p-6 hover:border-blue-500/50 hover:bg-slate-800/50 transition-all">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{strategy.name}</h3>
                  <p className="text-sm text-blue-400">by {strategy.author}</p>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm mb-6 line-clamp-2">{strategy.description}</p>

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-slate-900 p-3 rounded-lg border border-gray-700">
                    <p className="text-xs text-gray-400 mb-1">Return</p>
                    <p className="text-xl font-bold text-green-400">{strategy.return}</p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-gray-700">
                    <p className="text-xs text-gray-400 mb-1">Sharpe</p>
                    <p className="text-xl font-bold text-cyan-400">{strategy.sharpe}</p>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg border border-gray-700">
                    <p className="text-xs text-gray-400 mb-1">Win Rate</p>
                    <p className="text-xl font-bold text-purple-400">{strategy.winRate}%</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-4 text-xs text-gray-400 mb-6 pb-6 border-b border-gray-700">
                  <div>
                    <p className="text-gray-500">Views</p>
                    <p className="text-white font-semibold">{strategy.views.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Copies</p>
                    <p className="text-white font-semibold">{strategy.copies.toLocaleString()}</p>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                  View & Copy Strategy
                </button>
              </div>
            ))}
          </div>

          {filteredStrategies.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-lg">No strategies found. Try a different search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
