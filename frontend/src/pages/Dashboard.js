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
    <div className="w-full min-h-screen bg-vertex-bg text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-vertex-green">Dashboard</h1>
        <button className="bg-vertex-green text-vertex-bg px-4 py-2 rounded font-bold hover:opacity-80">
          + Add Widget
        </button>
      </div>

      {/* Watchlist */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-vertex-green mb-4">Watchlist</h2>
        <div className="bg-vertex-card rounded-lg overflow-hidden">
          <Watchlist assets={watchlist} />
        </div>
      </section>

      {/* Saved Strategies */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-vertex-green mb-4">Saved Strategies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedStrategies.map((strategy) => (
            <StrategyCard key={strategy.id} strategy={strategy} />
          ))}
        </div>
      </section>

      {/* Deployed Strategies */}
      <section>
        <h2 className="text-xl font-bold text-vertex-green mb-4">Deployed Strategies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {deployedStrategies.map((strategy) => (
            <StrategyCard key={strategy.id} strategy={strategy} deployed={true} />
          ))}
        </div>
      </section>
    </div>
  );
}
