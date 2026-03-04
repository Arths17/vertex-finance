import React, { useState } from 'react';
import { StrategyCard } from '../components/StrategyCard';

export default function Explore() {
  const [strategies] = useState([
    {
      id: 1,
      name: 'Monthly Rebalance',
      author: 'QuantTrader',
      return: '12.5%',
      sharpe: 1.2,
      winRate: 65,
      description: 'Rebalance portfolio monthly based on market conditions',
    },
    {
      id: 2,
      name: 'Volatility Minimization',
      author: 'RiskManager',
      return: '8.3%',
      sharpe: 1.8,
      winRate: 58,
      description: 'Uses VIX levels to adjust position sizing',
    },
    {
      id: 3,
      name: 'Momentum Trading',
      author: 'TrendFollower',
      return: '18.7%',
      sharpe: 0.9,
      winRate: 52,
      description: 'Capitalize on price momentum with technical indicators',
    },
    {
      id: 4,
      name: 'Mean Reversion',
      author: 'ValueHunter',
      return: '11.2%',
      sharpe: 1.5,
      winRate: 68,
      description: 'Trade when prices deviate significantly from moving average',
    },
    {
      id: 5,
      name: 'Dividend Growth',
      author: 'IncomeStrategy',
      return: '9.1%',
      sharpe: 1.3,
      winRate: 71,
      description: 'Focus on dividend-yielding stocks with growth potential',
    },
    {
      id: 6,
      name: 'Tech Sector Rotation',
      author: 'SectorAnalyst',
      return: '15.3%',
      sharpe: 1.1,
      winRate: 54,
      description: 'Rotate between tech stocks based on earnings cycles',
    },
  ]);

  return (
    <div className="w-full min-h-screen bg-vertex-bg text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-vertex-green mb-2">Explore Strategies</h1>
        <p className="text-gray-400">Discover and learn from community-built trading strategies</p>
      </div>

      {/* Filter/Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search strategies..."
          className="w-full bg-vertex-card border border-gray-700 px-4 py-2 rounded text-white placeholder-gray-500 focus:outline-none focus:border-vertex-green"
        />
      </div>

      {/* Strategy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strategies.map((strategy) => (
          <div key={strategy.id} className="bg-vertex-card rounded-lg p-4 hover:border-vertex-green border border-gray-700 transition">
            <h3 className="text-lg font-bold text-vertex-green mb-2">{strategy.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{strategy.description}</p>
            <p className="text-xs text-gray-500 mb-4">by {strategy.author}</p>

            <div className="grid grid-cols-3 gap-2 text-center mb-4">
              <div className="bg-gray-900 p-2 rounded">
                <p className="text-xs text-gray-500">Return</p>
                <p className="text-vertex-green font-bold">{strategy.return}</p>
              </div>
              <div className="bg-gray-900 p-2 rounded">
                <p className="text-xs text-gray-500">Sharpe</p>
                <p className="text-vertex-green font-bold">{strategy.sharpe}</p>
              </div>
              <div className="bg-gray-900 p-2 rounded">
                <p className="text-xs text-gray-500">Win Rate</p>
                <p className="text-vertex-green font-bold">{strategy.winRate}%</p>
              </div>
            </div>

            <button className="w-full bg-vertex-green text-vertex-bg font-bold py-2 rounded hover:opacity-80 transition">
              View Strategy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
