// Frontend API Service
// This module handles all HTTP requests to the FastAPI backend

const API_BASE_URL = 'http://localhost:8000/api';

export const api = {
  // AI Chat endpoints
  chatWithAI: async (message, conversationHistory = []) => {
    const response = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message, 
        conversation_history: conversationHistory 
      }),
    });
    const data = await response.json();
    return data.response;
  },

  getAIInsights: async (symbols) => {
    const response = await fetch(`${API_BASE_URL}/ai/insights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbols }),
    });
    return response.json();
  },

  // Terminal endpoints
  analyzeMarket: async (prompt, symbol) => {
    const response = await fetch(`${API_BASE_URL}/terminal/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, symbol }),
    });
    return response.json();
  },

  // Watchlist endpoints
  getWatchlist: async () => {
    const response = await fetch(`${API_BASE_URL}/watchlist`);
    return response.json();
  },

  addToWatchlist: async (symbol) => {
    const response = await fetch(`${API_BASE_URL}/watchlist`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol }),
    });
    return response.json();
  },

  // Strategy endpoints
  getSavedStrategies: async () => {
    const response = await fetch(`${API_BASE_URL}/strategies/saved`);
    return response.json();
  },

  getDeployedStrategies: async () => {
    const response = await fetch(`${API_BASE_URL}/strategies/deployed`);
    return response.json();
  },

  deployStrategy: async (strategyId) => {
    const response = await fetch(`${API_BASE_URL}/strategies/deploy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ strategy_id: strategyId }),
    });
    return response.json();
  },

  // Paper trading endpoints
  getPositions: async () => {
    const response = await fetch(`${API_BASE_URL}/trading/positions`);
    return response.json();
  },

  placeOrder: async (symbol, quantity, side) => {
    const response = await fetch(`${API_BASE_URL}/trading/order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol, quantity, side }),
    });
    return response.json();
  },

  // Backtest endpoints
  runBacktest: async (strategyDescription, timeframe, initialCapital, symbol = 'SPY') => {
    const response = await fetch(`${API_BASE_URL}/backtest/run`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        strategy_description: strategyDescription,
        timeframe,
        initial_capital: initialCapital,
        symbol
      }),
    });
    return response.json();
  },

  // Alert endpoints
  getAlerts: async () => {
    const response = await fetch(`${API_BASE_URL}/alerts`);
    return response.json();
  },

  createAlert: async (symbol, condition, value) => {
    const response = await fetch(`${API_BASE_URL}/alerts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol, condition, value }),
    });
    return response.json();
  },

  deleteAlert: async (alertId) => {
    const response = await fetch(`${API_BASE_URL}/alerts/${alertId}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Enhanced watchlist endpoints
  getLiveWatchlist: async () => {
    const response = await fetch(`${API_BASE_URL}/watchlist/live`);
    return response.json();
  },

  addToWatchlistNew: async (symbol) => {
    const response = await fetch(`${API_BASE_URL}/watchlist/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol }),
    });
    return response.json();
  },

  removeFromWatchlist: async (symbol) => {
    const response = await fetch(`${API_BASE_URL}/watchlist/${symbol}`, {
      method: 'DELETE',
    });
    return response.json();
  },

  // Enhanced strategy endpoints
  getAllStrategies: async () => {
    const response = await fetch(`${API_BASE_URL}/strategies/all`);
    return response.json();
  },

  saveStrategy: async (name, description, code = null) => {
    const response = await fetch(`${API_BASE_URL}/strategies/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, code }),
    });
    return response.json();
  },

  toggleStrategy: async (strategyId) => {
    const response = await fetch(`${API_BASE_URL}/strategies/toggle/${strategyId}`, {
      method: 'POST',
    });
    return response.json();
  },
};

export default api;
