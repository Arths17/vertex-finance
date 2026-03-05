// Frontend API Service
// This module handles all HTTP requests to the FastAPI backend

const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('access_token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

const makeRequest = async (url, options = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: getAuthHeaders()
  });
  
  if (response.status === 401) {
    // Token expired, clear and redirect to login
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.location.hash = '/#/login';
  }
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || `API Error: ${response.status}`);
  }
  
  return response.json();
};

export const api = {
  // ============ AUTH ============
  login: async (email, password) => {
    return makeRequest(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  register: async (email, username, password, full_name) => {
    return makeRequest(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({ email, username, password, full_name })
    });
  },

  getCurrentUser: async () => {
    return makeRequest(`${API_BASE_URL}/auth/me`, {
      method: 'GET'
    });
  },

  // ============ STRATEGIES ============
  createStrategy: async (strategyData) => {
    return makeRequest(`${API_BASE_URL}/strategies`, {
      method: 'POST',
      body: JSON.stringify(strategyData)
    });
  },

  getStrategies: async (skip = 0, limit = 10) => {
    return makeRequest(`${API_BASE_URL}/strategies?skip=${skip}&limit=${limit}`, {
      method: 'GET'
    });
  },

  getPublicStrategies: async (skip = 0, limit = 10) => {
    return makeRequest(`${API_BASE_URL}/strategies/public?skip=${skip}&limit=${limit}`, {
      method: 'GET'
    });
  },

  getStrategy: async (strategyId) => {
    return makeRequest(`${API_BASE_URL}/strategies/${strategyId}`, {
      method: 'GET'
    });
  },

  updateStrategy: async (strategyId, strategyData) => {
    return makeRequest(`${API_BASE_URL}/strategies/${strategyId}`, {
      method: 'PUT',
      body: JSON.stringify(strategyData)
    });
  },

  deleteStrategy: async (strategyId) => {
    return makeRequest(`${API_BASE_URL}/strategies/${strategyId}`, {
      method: 'DELETE'
    });
  },

  cloneStrategy: async (strategyId) => {
    return makeRequest(`${API_BASE_URL}/strategies/${strategyId}/clone`, {
      method: 'GET'
    });
  },

  // ============ BACKTESTS ============
  createBacktest: async (backtestData) => {
    return makeRequest(`${API_BASE_URL}/backtests`, {
      method: 'POST',
      body: JSON.stringify(backtestData)
    });
  },

  getBacktests: async (skip = 0, limit = 10) => {
    return makeRequest(`${API_BASE_URL}/backtests?skip=${skip}&limit=${limit}`, {
      method: 'GET'
    });
  },

  getBacktest: async (backtestId) => {
    return makeRequest(`${API_BASE_URL}/backtests/${backtestId}`, {
      method: 'GET'
    });
  },

  deleteBacktest: async (backtestId) => {
    return makeRequest(`${API_BASE_URL}/backtests/${backtestId}`, {
      method: 'DELETE'
    });
  },

  // ============ AI CHAT (existing) ============
  chatWithAI: async (message, conversationHistory = []) => {
    const response = await fetch(`${API_BASE_URL}/ai/chat`, {
      method: 'POST',
      headers: getAuthHeaders(),
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
      headers: getAuthHeaders(),
      body: JSON.stringify({ symbols }),
    });
    return response.json();
  },

  // ============ TERMINAL (existing) ============
  analyzeMarket: async (prompt, symbol) => {
    const response = await fetch(`${API_BASE_URL}/terminal/analyze`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ prompt, symbol }),
    });
    return response.json();
  },
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
