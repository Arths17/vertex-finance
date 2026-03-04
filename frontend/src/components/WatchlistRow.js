import React from 'react';

export function WatchlistRow({ asset }) {
  const changeColor = asset.change >= 0 ? 'text-vertex-green' : 'text-vertex-red';

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-900 transition">
      <td className="p-3 font-bold">{asset.symbol}</td>
      <td className="text-right p-3">${asset.price.toFixed(2)}</td>
      <td className={`text-right p-3 ${changeColor}`}>
        {asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%
      </td>
      <td className="text-right p-3">
        <button className="text-vertex-green hover:text-vertex-green opacity-70 hover:opacity-100">
          View
        </button>
      </td>
    </tr>
  );
}
