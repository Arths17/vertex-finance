import React from 'react';
import { WatchlistRow } from './WatchlistRow';

export function Watchlist({ assets = [] }) {
  return (
    <div className="w-full">
      <table className="w-full text-sm font-mono">
        <thead>
          <tr className="border-b border-gray-700 text-vertex-green">
            <th className="text-left p-3">Symbol</th>
            <th className="text-right p-3">Price</th>
            <th className="text-right p-3">Change %</th>
            <th className="text-right p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, idx) => (
            <WatchlistRow key={idx} asset={asset} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
