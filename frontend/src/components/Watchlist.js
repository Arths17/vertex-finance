import React from 'react';
import { WatchlistRow } from './WatchlistRow';

export function Watchlist({ assets = [] }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700 bg-slate-900/50">
            <th className="text-left px-4 py-4 text-gray-400 font-semibold">SYMBOL</th>
            <th className="text-right px-4 py-4 text-gray-400 font-semibold">PRICE</th>
            <th className="text-right px-4 py-4 text-gray-400 font-semibold">CHANGE</th>
            <th className="text-right px-4 py-4 text-gray-400 font-semibold">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {assets.length > 0 ? (
            assets.map((asset, idx) => (
              <WatchlistRow key={idx} asset={asset} />
            ))
          ) : (
            <tr>
              <td colSpan="4" className="px-4 py-8 text-center text-gray-400">
                No assets in watchlist
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
