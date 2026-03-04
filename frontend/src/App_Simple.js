import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import api from './services/api';

function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav style={{ padding: '1rem', background: '#121212', borderBottom: '1px solid #333' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#00FF88' }}>VERTEX</h1>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <Link to="/dashboard" style={{ color: isActive('/dashboard') || isActive('/') ? '#00FF88' : '#888', textDecoration: 'none', transition: 'color 0.2s' }}>
              Dashboard
            </Link>
            <Link to="/terminal" style={{ color: isActive('/terminal') ? '#00FF88' : '#888', textDecoration: 'none', transition: 'color 0.2s' }}>
              Terminal
            </Link>
            <Link to="/explore" style={{ color: isActive('/explore') ? '#00FF88' : '#888', textDecoration: 'none', transition: 'color 0.2s' }}>
              Explore
            </Link>
          </div>
        </div>
        <div style={{ fontSize: '0.75rem', color: '#666' }}>
          AI-Powered Trading Terminal
        </div>
      </div>
    </nav>
  );
}

function Dashboard() {
  const watchlist = [
    { symbol: 'BTC', price: 42500, change: 2.5 },
    { symbol: 'ETH', price: 2300, change: 1.8 },
    { symbol: 'GOOG', price: 142.50, change: 0.5 },
    { symbol: 'AAPL', price: 182.63, change: -0.3 },
  ];

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00FF88', marginBottom: '1rem' }}>Dashboard</h2>
      </div>
      
      <div style={{ background: '#121212', borderRadius: '8px', padding: '1.5rem', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#00FF88', marginBottom: '1rem' }}>Watchlist</h3>
        <table style={{ width: '100%', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #333', color: '#00FF88' }}>
              <th style={{ textAlign: 'left', padding: '0.75rem' }}>Symbol</th>
              <th style={{ textAlign: 'right', padding: '0.75rem' }}>Price</th>
              <th style={{ textAlign: 'right', padding: '0.75rem' }}>Change %</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((asset, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #1a1a1a' }}>
                <td style={{ padding: '0.75rem', fontWeight: 'bold' }}>{asset.symbol}</td>
                <td style={{ textAlign: 'right', padding: '0.75rem' }}>${asset.price.toFixed(2)}</td>
                <td style={{ textAlign: 'right', padding: '0.75rem', color: asset.change >= 0 ? '#00FF88' : '#FF3B30' }}>
                  {asset.change > 0 ? '+' : ''}{asset.change.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div style={{ background: '#121212', borderRadius: '8px', padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#00FF88', marginBottom: '1rem' }}>Quick Stats</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div style={{ background: '#0A0A0A', padding: '1rem', borderRadius: '6px' }}>
            <p style={{ color: '#888', fontSize: '0.875rem' }}>Portfolio Value</p>
            <p style={{ color: '#00FF88', fontSize: '1.5rem', fontWeight: 'bold' }}>$125,450</p>
          </div>
          <div style={{ background: '#0A0A0A', padding: '1rem', borderRadius: '6px' }}>
            <p style={{ color: '#888', fontSize: '0.875rem' }}>24h P&L</p>
            <p style={{ color: '#00FF88', fontSize: '1.5rem', fontWeight: 'bold' }}>+$2,340</p>
          </div>
          <div style={{ background: '#0A0A0A', padding: '1rem', borderRadius: '6px' }}>
            <p style={{ color: '#888', fontSize: '0.875rem' }}>Win Rate</p>
            <p style={{ color: '#00FF88', fontSize: '1.5rem', fontWeight: 'bold' }}>68%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Terminal() {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hi! I\'m Vertex AI, powered by Google Gemini. Ask me anything about markets, strategies, or portfolio analysis.' 
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
      const conversationHistory = currentMessages
        .filter(msg => msg.role !== 'assistant' || msg.content !== 'Thinking...')
        .map(msg => ({ role: msg.role, content: msg.content }));
      
      const response = await api.chatWithAI(input, conversationHistory);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please make sure the backend is running on port 8000.' 
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

  return (
    <div style={{ height: 'calc(100vh - 60px)', padding: '1rem', display: 'flex', gap: '1rem' }}>
      {/* AI Chat */}
      <div style={{ flex: 1, background: '#121212', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: '#00FF88', fontSize: '1.25rem', marginBottom: '1rem' }}>Vertex AI</h3>
        
        <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem' }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ marginBottom: '1rem', display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '80%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: msg.role === 'user' ? '#00FF88' : '#1a1a1a',
                color: msg.role === 'user' ? '#0A0A0A' : 'white',
              }}>
                <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem' }}>
              <div style={{ padding: '0.75rem 1rem', borderRadius: '8px', background: '#1a1a1a', color: '#00FF88' }}>
                <p style={{ margin: 0 }}>Thinking...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about markets, strategies, or analysis..."
            disabled={isLoading}
            style={{
              flex: 1,
              padding: '0.75rem',
              background: '#0A0A0A',
              border: '1px solid #333',
              borderRadius: '6px',
              color: 'white',
              outline: 'none',
            }}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            style={{
              padding: '0.75rem 1.5rem',
              background: '#00FF88',
              color: '#0A0A0A',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: isLoading || !input.trim() ? 'not-allowed' : 'pointer',
              opacity: isLoading || !input.trim() ? 0.5 : 1,
            }}
          >
            Send
          </button>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div style={{ flex: 1, background: '#121212', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: '#00FF88', fontSize: '1.25rem', marginBottom: '1rem' }}>Market Chart</h3>
        <div style={{ flex: 1, background: '#0A0A0A', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>
          <p>Chart visualization (TradingView or Lightweight Charts)</p>
        </div>
      </div>
    </div>
  );
}

function Explore() {
  const strategies = [
    { id: 1, name: 'Monthly Rebalance', return: '12.5%', sharpe: 1.2, winRate: 65 },
    { id: 2, name: 'Volatility Minimization', return: '8.3%', sharpe: 1.8, winRate: 58 },
    { id: 3, name: 'Momentum Trading', return: '18.7%', sharpe: 0.9, winRate: 52 },
    { id: 4, name: 'Mean Reversion', return: '11.2%', sharpe: 1.5, winRate: 68 },
  ];

  return (
    <div style={{ padding: '2rem', color: 'white' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00FF88', marginBottom: '2rem' }}>Explore Strategies</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {strategies.map((strategy) => (
          <div key={strategy.id} style={{ background: '#121212', border: '1px solid #333', borderRadius: '8px', padding: '1.5rem' }}>
            <h3 style={{ color: '#00FF88', fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>{strategy.name}</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ background: '#0A0A0A', padding: '0.5rem', borderRadius: '4px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', color: '#888', margin: 0 }}>Return</p>
                <p style={{ color: '#00FF88', fontWeight: 'bold', margin: '0.25rem 0 0 0' }}>{strategy.return}</p>
              </div>
              <div style={{ background: '#0A0A0A', padding: '0.5rem', borderRadius: '4px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', color: '#888', margin: 0 }}>Sharpe</p>
                <p style={{ color: '#00FF88', fontWeight: 'bold', margin: '0.25rem 0 0 0' }}>{strategy.sharpe}</p>
              </div>
              <div style={{ background: '#0A0A0A', padding: '0.5rem', borderRadius: '4px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', color: '#888', margin: 0 }}>Win Rate</p>
                <p style={{ color: '#00FF88', fontWeight: 'bold', margin: '0.25rem 0 0 0' }}>{strategy.winRate}%</p>
              </div>
            </div>
            
            <button style={{
              width: '100%',
              padding: '0.5rem',
              background: '#00FF88',
              color: '#0A0A0A',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '0.875rem',
            }}>
              View Details
            </button>
          </div>
        ))}
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
          <Route path="/terminal" element={<Terminal />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
