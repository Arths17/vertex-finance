import React from 'react';

export function WatchlistRow({ asset }) {
  const changeColor = asset.change >= 0 ? 'text-green-400' : 'text-red-400';

  return (
    <tr className="border-b border-gray-800 hover:bg-slate-800/50 transition-colors">
      <td className="px-4 py-4 font-bold text-white">{asset.symbol}</td>
      <td className="text-right px-4 py-4 text-white">${asset.price.toFixed(2)}</td>
      <td className={`text-right px-4 py-4 font-semibold ${changeColor}`}>
        {asset.change > 0 ? '▲' : '▼'} {Math.abs(asset.change).toFixed(2)}%
      </td>
      <td className="text-right px-4 py-4">
        <button className="text-blue-400 hover:text-blue-300 transition-colors font-semibold">
          Trade
        </button>
      </td>
    </tr>
  );
}
