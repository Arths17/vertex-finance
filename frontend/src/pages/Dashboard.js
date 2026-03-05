import React, { useState, useEffect } from 'react';
import { Watchlist } from '../components/Watchlist';
import { StrategyCard } from '../components/StrategyCard';

export default function Dashboard() {
  const [watchlist, setWatchlist] = useState([
    { symbol: 'BTC', price: 42500, change: 2.5 },
    { symbol: 'ETH', price: 2300, change: 1.8 },
    { symbol: 'GOOG', price: 142.50, change: 0.5 },
  ]);

  const [savedStrategies, setSavedStrategies] = useState([
    { id: 1, name: 'Monthly Rebalance', return: '12.5%', sharpe: 1.2, winRate: 65 },
    { id: 2, name: 'Volatility Minimization', return: '8.3%', sharpe: 1.8, winRate: 58 },
  ]);

  const [deployedStrategies, setDeployedStrategies] = useState([
    { id: 1, name: 'RSI Oversold', status: 'Active', return: '5.2%', winRate: 72 },
  ]);

  return (
    <div className="w-full min-h-screen bg-black text-white pt-20 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Dashboard</h1>
            <p className="text-gray-400 mt-2">Monitor your portfolio and strategies</p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all">
            + New Strategy
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Portfolio Value', value: '$125,450', change: '+2.8%', positive: true },
            { label: 'Total P&L', value: '+$8,340', change: '+6.2%', positive: true },
            { label: 'Active Strategies', value: '7', change: '3 New', positive: true },
            { label: 'Win Rate', value: '68.5%', change: '+5.1%', positive: true },
          ].map((stat, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-gray-800 bg-slate-900/50 hover:bg-slate-800/50 transition-all">
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
              <p className={`text-sm ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Watchlist */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">Watchlist</h2>
            <p className="text-gray-400 text-sm mt-1">Real-time market data</p>
          </div>
          <div className="bg-slate-900/50 rounded-xl border border-gray-800 overflow-hidden">
            <Watchlist assets={watchlist} />
          </div>
        </section>

        {/* Saved Strategies */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">Saved Strategies</h2>
            <p className="text-gray-400 text-sm mt-1">Backtested and ready to deploy</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedStrategies.map((strategy) => (
              <StrategyCard key={strategy.id} strategy={strategy} />
            ))}
          </div>
        </section>

        {/* Deployed Strategies */}
        <section className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white">Active Strategies</h2>
            <p className="text-gray-400 text-sm mt-1">Currently trading</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deployedStrategies.map((strategy) => (
              <StrategyCard key={strategy.id} strategy={strategy} deployed={true} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
