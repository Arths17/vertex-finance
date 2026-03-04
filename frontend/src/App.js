import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import api from './services/api';

function Navigation() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav style={{ padding: '1rem 2rem', background: '#121212', borderBottom: '1px solid #333' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00FF88', margin: 0 }}>⚡ VERTEX</h1>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/dashboard" style={{ color: isActive('/dashboard') || isActive('/') ? '#00FF88' : '#888', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>
              Dashboard
            </Link>
            <Link to="/terminal" style={{ color: isActive('/terminal') ? '#00FF88' : '#888', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>
              AI Terminal
            </Link>
            <Link to="/backtest" style={{ color: isActive('/backtest') ? '#00FF88' : '#888', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>
              Backtest
            </Link>
            <Link to="/alerts" style={{ color: isActive('/alerts') ? '#00FF88' : '#888', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>
              Alerts
            </Link>
            <Link to="/brokers" style={{ color: isActive('/brokers') ? '#00FF88' : '#888', textDecoration: 'none', transition: 'color 0.2s', fontSize: '0.95rem' }}>
              Brokers
            </Link>
          </div>
        </div>
        <div style={{ fontSize: '0.7rem', color: '#666', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Powered by Gemini AI
        </div>
      </div>
    </nav>
  );
}

// Dashboard Component
function Dashboard() {
  const [watchlist, setWatchlist] = useState([]);
  const [strategies, setStrategies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [watchlistData, strategiesData] = await Promise.all([
          api.getLiveWatchlist(),
          api.getAllStrategies()
        ]);
        setWatchlist(watchlistData.watchlist || []);
        setStrategies(strategiesData.strategies || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
    // Refresh every 10 seconds
    const interval = setInterval(fetchDashboardData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleStrategy = async (strategyId, currentStatus) => {
    try {
      const result = await api.toggleStrategy(strategyId);
      if (result.success) {
        setStrategies(strategies.map(s => 
          s.id === strategyId ? result.strategy : s
        ));
      }
    } catch (error) {
      console.error('Error toggling strategy:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', color: '#00FF88', textAlign: 'center' }}>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', color: 'white' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00FF88', marginBottom: '0.5rem' }}>Dashboard</h2>
        <p style={{ color: '#888', fontSize: '0.9rem' }}>Overview of your portfolio and active strategies</p>
      </div>
      
      {/* Portfolio Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Portfolio Value', value: '$125,450.34', change: '+2.8%' },
          { label: '24h P&L', value: '+$2,340.12', change: '+1.9%' },
          { label: 'Win Rate', value: '68%', change: '+3%' },
          { label: 'Active Strategies', value: strategies.filter(s => s.status === 'Active').length.toString(), change: 'Running' },
        ].map((stat, idx) => (
          <div key={idx} style={{ background: '#121212', padding: '1.5rem', borderRadius: '8px', border: '1px solid #222' }}>
            <p style={{ color: '#888', fontSize: '0.75rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{stat.label}</p>
            <p style={{ color: 'white', fontSize: '1.8rem', fontWeight: 'bold', marginBottom: '0.3rem' }}>{stat.value}</p>
            <p style={{ color: '#00FF88', fontSize: '0.85rem' }}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Watchlist */}
      <div style={{ background: '#121212', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem', border: '1px solid #222' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#00FF88', marginBottom: '1rem' }}>⭐ Live Watchlist</h3>
        <table style={{ width: '100%', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #333', color: '#888' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem' }}>Symbol</th>
              <th style={{ textAlign: 'right', padding: '0.75rem' }}>Price</th>
              <th style={{ textAlign: 'right', padding: '0.75rem' }}>Change</th>
              <th style={{ textAlign: 'right', padding: '0.75rem' }}>Volume</th>
              <th style={{ textAlign: 'right', padding: '0.75rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((asset, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #1a1a1a' }}>
                <td style={{ padding: '1rem 0.75rem', fontWeight: 'bold' }}>{asset.symbol}</td>
                <td style={{ textAlign: 'right', padding: '1rem 0.75rem' }}>${asset.price.toLocaleString()}</td>
                <td style={{ textAlign: 'right', padding: '1rem 0.75rem', color: asset.change >= 0 ? '#00FF88' : '#FF3B30', fontWeight: 'bold' }}>
                  {asset.change > 0 ? '+' : ''}{asset.change}%
                </td>
                <td style={{ textAlign: 'right', padding: '1rem 0.75rem', color: '#888' }}>{asset.volume}</td>
                <td style={{ textAlign: 'right', padding: '1rem 0.75rem' }}>
                  <button style={{ background: 'transparent', border: '1px solid #00FF88', color: '#00FF88', padding: '0.3rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}>
                    Analyze
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Active Strategies */}
      <div style={{ background: '#121212', borderRadius: '8px', padding: '1.5rem', border: '1px solid #222' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#00FF88', marginBottom: '1rem' }}>🤖 Strategies</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {strategies.map((strategy) => (
            <div key={strategy.id} style={{ background: '#0A0A0A', padding: '1rem', borderRadius: '6px', border: '1px solid #1a1a1a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ fontWeight: 'bold', marginBottom: '0.3rem' }}>{strategy.name}</p>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>
                  {strategy.trades} trades • {strategy.winRate} win rate
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: '#00FF88', fontWeight: 'bold', fontSize: '1.2rem' }}>{strategy.return}</p>
                  <p style={{ fontSize: '0.75rem', color: strategy.status === 'Active' ? '#00FF88' : '#888' }}>
                    {strategy.status}
                  </p>
                </div>
                <button 
                  onClick={() => handleToggleStrategy(strategy.id, strategy.status)}
                  style={{ background: strategy.status === 'Active' ? '#FF3B30' : '#00FF88', color: '#0A0A0A', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}
                >
                  {strategy.status === 'Active' ? 'Pause' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// AI Terminal Component  
function Terminal() {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: '👋 Hi! I\'m Vertex AI powered by Google Gemini 2.5-flash.\n\nI can help you with:\n• Strategy building ("Create an RSI oversold strategy")\n• Technical analysis ("Analyze AAPL chart")\n• Market research ("Why is Bitcoin up today?")\n• Stock insights ("Tell me about Tesla")\n\nWhat would you like to explore?' 
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setInput('');
    setIsLoading(true);

    try {
      const conversationHistory = currentMessages.map(msg => ({ 
        role: msg.role, 
        content: msg.content 
      }));
      
      const response = await api.chatWithAI(input, conversationHistory);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: '❌ Connection error. Make sure the backend is running:\n\n```\nsource .venv/bin/activate\ncd backend\nuvicorn main:app --reload --port 8000\n```' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    "Analyze AAPL",
    "Create RSI strategy",
    "Market news today",
    "Best crypto to buy",
  ];

  return (
    <div style={{ height: 'calc(100vh - 60px)', display: 'flex', maxWidth: '1400px', margin: '0 auto', padding: '1rem', gap: '1rem' }}>
      {/* AI Chat */}
      <div style={{ flex: 2, background: '#121212', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', border: '1px solid #222' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #222' }}>
          <div>
            <h3 style={{ color: '#00FF88', fontSize: '1.25rem', margin: 0 }}>🤖 Vertex AI</h3>
            <p style={{ color: '#666', fontSize: '0.75rem', margin: '0.3rem 0 0 0' }}>Powered by Gemini 2.5-flash</p>
          </div>
          <button 
            style={{ background: 'transparent', border: '1px solid #333', color: '#888', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
            onClick={() => setMessages([messages[0]])}
          >
            Clear Chat
          </button>
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ marginBottom: '1rem', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '85%',
                padding: '1rem 1.25rem',
                borderRadius: msg.role === 'user' ? '12px 12px 0 12px' : '12px 12px 12px 0',
                background: msg.role === 'user' ? 'linear-gradient(135deg, #00FF88 0%, #00CC6F 100%)' : '#1a1a1a',
                color: msg.role === 'user' ? '#0A0A0A' : 'white',
                boxShadow: msg.role === 'user' ? '0 2px 8px rgba(0,255,136,0.2)' : 'none',
              }}>
                <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ padding: '1rem 1.25rem', borderRadius: '12px 12px 12px 0', background: '#1a1a1a', color: '#00FF88' }}>
                <p style={{ margin: 0 }}>⚡ Thinking...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => setInput(prompt)}
              style={{
                background: '#1a1a1a',
                border: '1px solid #333',
                color: '#888',
                padding: '0.4rem 0.8rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.75rem',
                transition: 'all 0.2s',
              }}
              onMouseOver={(e) => {
                e.target.style.borderColor = '#00FF88';
                e.target.style.color = '#00FF88';
              }}
              onMouseOut={(e) => {
                e.target.style.borderColor = '#333';
                e.target.style.color = '#888';
              }}
            >
              {prompt}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about markets, strategies, or stocks..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '0.9rem 1.2rem',
              background: '#0A0A0A',
              border: '1px solid #333',
              borderRadius: '8px',
              color: 'white',
              outline: 'none',
              fontSize: '0.9rem',
            }}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            style={{
              padding: '0.9rem 2rem',
              background: isLoading || !input.trim() ? '#333' : 'linear-gradient(135deg, #00FF88 0%, #00CC6F 100%)',
              color: isLoading || !input.trim() ? '#666' : '#0A0A0A',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.2s',
            }}
          >
            {isLoading ? '...' : 'Send'}
          </button>
        </div>
      </div>

      {/* Info Panel */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ background: '#121212', borderRadius: '8px', padding: '1.5rem', border: '1px solid #222' }}>
          <h3 style={{ color: '#00FF88', fontSize: '1.1rem', marginBottom: '1rem' }}>📊 Market Pulse</h3>
          <div style={{ fontSize: '0.85rem', color: '#ccc', lineHeight: '1.8' }}>
            <p style={{ marginBottom: '0.7rem' }}><span style={{ color: '#888' }}>•</span> S&P 500: <span style={{ color: '#00FF88' }}>+0.8%</span></p>
            <p style={{ marginBottom: '0.7rem' }}><span style={{ color: '#888' }}>•</span> NASDAQ: <span style={{ color: '#00FF88' }}>+1.2%</span></p>
            <p style={{ marginBottom: '0.7rem' }}><span style={{ color: '#888' }}>•</span> BTC: <span style={{ color: '#00FF88' }}>+2.5%</span></p>
            <p style={{ marginBottom: '0.7rem' }}><span style={{ color: '#888' }}>•</span> VIX: <span style={{ color: '#FF3B30' }}>-5.3%</span></p>
          </div>
        </div>

        <div style={{ background: '#121212', borderRadius: '8px', padding: '1.5rem', border: '1px solid #222' }}>
          <h3 style={{ color: '#00FF88', fontSize: '1.1rem', marginBottom: '1rem' }}>💡 AI Capabilities</h3>
          <div style={{ fontSize: '0.8rem', color: '#888', lineHeight: '1.9' }}>
            <p style={{ marginBottom: '0.6rem' }}>✓ Strategy generation from text</p>
            <p style={{ marginBottom: '0.6rem' }}>✓ Technical analysis & alerts</p>
            <p style={{ marginBottom: '0.6rem' }}>✓ Market research & insights</p>
            <p style={{ marginBottom: '0.6rem' }}>✓ Backtesting simulations</p>
            <p style={{ marginBottom: '0.6rem' }}>✓ Portfolio optimization</p>
          </div>
        </div>

        <div style={{ background: '#121212', borderRadius: '8px', padding: '1.5rem', border: '1px solid #222', flex: 1 }}>
          <h3 style={{ color: '#00FF88', fontSize: '1.1rem', marginBottom: '1rem' }}>📈 Chart</h3>
          <div style={{ background: '#0A0A0A', borderRadius: '6px', height: 'calc(100% - 2rem)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontSize: '0.85rem' }}>
            TradingView Chart
          </div>
        </div>
      </div>
    </div>
  );
}

// Backtest Component
function Backtest() {
  const [strategyInput, setStrategyInput] = useState('');
  const [timeframe, setTimeframe] = useState('1 year');
  const [initialCapital, setInitialCapital] = useState('10000');
  const [backtestResults, setBacktestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  
  const runBacktest = async () => {
    if (!strategyInput.trim()) {
      alert('Please describe your strategy first');
      return;
    }

    setIsRunning(true);
    try {
      const result = await api.runBacktest(
        strategyInput,
        timeframe,
        parseFloat(initialCapital),
        'SPY'
      );
      
      if (result.success) {
        setBacktestResults(result.results);
      }
    } catch (error) {
      console.error('Backtest error:', error);
      alert('Error running backtest. Please try again.');
    } finally {
      setIsRunning(false);
    }
  };

  const saveStrategy = async () => {
    if (!backtestResults) return;
    
    try {
      const name = prompt('Enter strategy name:');
      if (!name) return;
      
      const result = await api.saveStrategy(name, strategyInput);
      if (result.success) {
        alert(`Strategy "${name}" saved successfully!`);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Error saving strategy');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', color: 'white' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00FF88', marginBottom: '0.5rem' }}>🧪 Strategy Backtest</h2>
        <p style={{ color: '#888', fontSize: '0.9rem' }}>Test your strategies against historical data</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Strategy Builder */}
        <div style={{ background: '#121212', borderRadius: '8px', padding: '1.5rem', border: '1px solid #222' }}>
          <h3 style={{ color: '#00FF88', marginBottom: '1rem' }}>🤖 Build Strategy</h3>
          <textarea
            value={strategyInput}
            onChange={(e) => setStrategyInput(e.target.value)}
            placeholder="Describe your strategy in plain English...&#10;&#10;Example:&#10;'Buy when RSI is below 30 and MACD crosses above signal line. Sell when RSI is above 70 or 5% profit target is hit.'"
            style={{
              width: '100%',
              minHeight: '200px',
              background: '#0A0A0A',
              border: '1px solid #333',
              borderRadius: '6px',
              padding: '1rem',
              color: 'white',
              fontSize: '0.9rem',
              resize: 'vertical',
              marginBottom: '1rem',
              lineHeight: '1.6',
            }}
          />
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#888', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Timeframe</label>
            <select 
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              style={{ width: '100%', padding: '0.7rem', background: '#0A0A0A', border: '1px solid #333', borderRadius: '6px', color: 'white', fontSize: '0.9rem' }}
            >
              <option>1 year</option>
              <option>2 years</option>
              <option>5 years</option>
              <option>10 years</option>
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#888', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Initial Capital</label>
            <input 
              type="text" 
              value={`$${initialCapital}`}
              onChange={(e) => setInitialCapital(e.target.value.replace('$', '').replace(/,/g, ''))}
              style={{ width: '100%', padding: '0.7rem', background: '#0A0A0A', border: '1px solid #333', borderRadius: '6px', color: 'white', fontSize: '0.9rem' }} 
            />
          </div>

          <button
            onClick={runBacktest}
            disabled={isRunning || !strategyInput.trim()}
            style={{
              width: '100%',
              padding: '0.9rem',
              background: isRunning || !strategyInput.trim() ? '#333' : 'linear-gradient(135deg, #00FF88 0%, #00CC6F 100%)',
              color: isRunning || !strategyInput.trim() ? '#666' : '#0A0A0A',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: isRunning || !strategyInput.trim() ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
            }}
          >
            {isRunning ? '⚡ Running Backtest...' : 'Run Backtest'}
          </button>
        </div>

        {/* Results */}
        <div style={{ background: '#121212', borderRadius: '8px', padding: '1.5rem', border: '1px solid #222' }}>
          <h3 style={{ color: '#00FF88', marginBottom: '1rem' }}>📊 Results</h3>
          
          {backtestResults ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                {['totalReturn', 'sharpeRatio', 'maxDrawdown', 'winRate', 'trades', 'profitFactor'].map((key) => (
                  <div key={key} style={{ background: '#0A0A0A', padding: '1rem', borderRadius: '6px' }}>
                    <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '0.3rem', textTransform: 'capitalize' }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </p>
                    <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: String(backtestResults[key]).includes('-') ? '#FF3B30' : '#00FF88' }}>
                      {backtestResults[key]}
                    </p>
                  </div>
                ))}
              </div>

              <div style={{ background: '#0A0A0A', height: '250px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', marginBottom: '1rem' }}>
                Equity Curve Graph
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={saveStrategy}
                  style={{ flex: 1, padding: '0.7rem', background: '#00FF88', color: '#0A0A0A', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Save Strategy
                </button>
                <button style={{ flex: 1, padding: '0.7rem', background: 'transparent', color: '#00FF88', border: '1px solid #00FF88', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                  Deploy Live
                </button>
              </div>
            </>
          ) : (
            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
              <p>Run a backtest to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Alerts Component
function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [symbol, setSymbol] = useState('');
  const [condition, setCondition] = useState('Price crosses above');
  const [value, setValue] = useState('');

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const result = await api.getAlerts();
      setAlerts(result.alerts || []);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const handleCreateAlert = async () => {
    if (!symbol || !value) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const result = await api.createAlert(symbol, condition, value);
      if (result.success) {
        await fetchAlerts();
        // Clear form
        setSymbol('');
        setValue('');
        alert('Alert created successfully!');
      }
    } catch (error) {
      console.error('Error creating alert:', error);
      alert('Error creating alert');
    }
  };

  const handleDeleteAlert = async (alertId) => {
    try {
      await api.deleteAlert(alertId);
      setAlerts(alerts.filter(a => a.id !== alertId));
    } catch (error) {
      console.error('Error deleting alert:', error);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', color: 'white' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00FF88', marginBottom: '0.5rem' }}>🔔 Alerts & Signals</h2>
        <p style={{ color: '#888', fontSize: '0.9rem' }}>Set up automated alerts for price, indicators, and patterns</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ background: '#121212', borderRadius: '8px', padding: '1.5rem', border: '1px solid #222' }}>
          <h3 style={{ color: '#00FF88', marginBottom: '1rem' }}>Create Alert</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#888', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Symbol</label>
            <input 
              type="text" 
              placeholder="AAPL" 
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              style={{ width: '100%', padding: '0.7rem', background: '#0A0A0A', border: '1px solid #333', borderRadius: '6px', color: 'white', fontSize: '0.9rem' }} 
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#888', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Condition</label>
            <select 
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              style={{ width: '100%', padding: '0.7rem', background: '#0A0A0A', border: '1px solid #333', borderRadius: '6px', color: 'white', fontSize: '0.9rem' }}
            >
              <option>Price crosses above</option>
              <option>Price crosses below</option>
              <option>RSI above</option>
              <option>RSI below</option>
              <option>MACD crossover</option>
              <option>Volume spike</option>
            </select>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', color: '#888', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Value</label>
            <input 
              type="text" 
              placeholder="185.00" 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ width: '100%', padding: '0.7rem', background: '#0A0A0A', border: '1px solid #333', borderRadius: '6px', color: 'white', fontSize: '0.9rem' }} 
            />
          </div>

          <button 
            onClick={handleCreateAlert}
            style={{ width: '100%', padding: '0.9rem', background: 'linear-gradient(135deg, #00FF88 0%, #00CC6F 100%)', color: '#0A0A0A', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
          >
            Create Alert
          </button>
        </div>

        <div style={{ background: '#121212', borderRadius: '8px', padding: '1.5rem', border: '1px solid #222' }}>
          <h3 style={{ color: '#00FF88', marginBottom: '1rem' }}>Active Alerts</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {alerts.length === 0 ? (
              <div style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
                No alerts yet. Create one to get started!
              </div>
            ) : (
              alerts.map((alert) => (
                <div key={alert.id} style={{ background: '#0A0A0A', padding: '1rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontWeight: 'bold', marginBottom: '0.2rem' }}>{alert.symbol}</p>
                    <p style={{ fontSize: '0.85rem', color: '#888' }}>{alert.condition}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      padding: '0.3rem 0.7rem', 
                      borderRadius: '4px', 
                      background: alert.status === 'Active' ? '#00FF8820' : '#FF3B3020',
                      color: alert.status === 'Active' ? '#00FF88' : '#FF3B30'
                    }}>
                      {alert.status}
                    </span>
                    <button 
                      onClick={() => handleDeleteAlert(alert.id)}
                      style={{ background: 'transparent', border: '1px solid #FF3B30', color: '#FF3B30', padding: '0.3rem 0.7rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Brokers Component
function Brokers() {
  const brokers = [
    { name: 'Alpaca', status: 'Connected', type: 'Paper Trading', free: true },
    { name: 'Interactive Brokers', status: 'Not Connected', type: 'Live Trading', free: false },
    { name: 'TD Ameritrade', status: 'Not Connected', type: 'Live Trading', free: false },
    { name: 'Coinbase', status: 'Not Connected', type: 'Crypto', free: true },
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto', color: 'white' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00FF88', marginBottom: '0.5rem' }}>🔌 Broker Connections</h2>
        <p style={{ color: '#888', fontSize: '0.9rem' }}>Connect your brokerage accounts to deploy strategies</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        {brokers.map((broker, idx) => (
          <div key={idx} style={{ background: '#121212', borderRadius: '8px', padding: '1.5rem', border: '1px solid #222' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '0.3rem' }}>{broker.name}</h3>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>
                  {broker.type} {broker.free && '• Free'}
                </p>
              </div>
              <span style={{ 
                fontSize: '0.75rem', 
                padding: '0.3rem 0.7rem', 
                borderRadius: '4px', 
                background: broker.status === 'Connected' ? '#00FF8820' : '#88888820',
                color: broker.status === 'Connected' ? '#00FF88' : '#888'
              }}>
                {broker.status}
              </span>
            </div>

            <button style={{
              width: '100%',
              padding: '0.8rem',
              background: broker.status === 'Connected' ? 'transparent' : 'linear-gradient(135deg, #00FF88 0%, #00CC6F 100%)',
              color: broker.status === 'Connected' ? '#FF3B30' : '#0A0A0A',
              border: broker.status === 'Connected' ? '1px solid #FF3B30' : 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}>
              {broker.status === 'Connected' ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '2rem', background: '#121212', borderRadius: '8px', padding: '1.5rem', border: '1px solid #222' }}>
        <h3 style={{ color: '#00FF88', marginBottom: '1rem' }}>⚙️ Alpaca Configuration</h3>
        <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1rem' }}>
          Currently using Alpaca Paper Trading (free sandbox environment)
        </p>
        
        <div style={{ fontSize: '0.85rem', color: '#ccc', lineHeight: '1.8' }}>
          <p style={{ marginBottom: '0.5rem' }}>• API Key: ************3456</p>
          <p style={{ marginBottom: '0.5rem' }}>• Environment: Paper Trading</p>
          <p style={{ marginBottom: '0.5rem' }}>• Status: Active</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div style={{ background: '#0A0A0A', minHeight: '100vh', fontFamily: 'monospace' }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/terminal" element={<Terminal />} />
          <Route path="/backtest" element={<Backtest />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/brokers" element={<Brokers />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
