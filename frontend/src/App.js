import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Terminal from './pages/Terminal';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Signup from './pages/Signup';
import api from './services/api';

function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/#/';
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all ${isHome ? 'bg-transparent' : 'bg-black/80 backdrop-blur-md border-b border-gray-800'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              ⚡ VERTEX
            </div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            {!isHome && isAuthenticated && (
              <>
                <Link to="/dashboard" className={`transition-all ${isActive('/dashboard') ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}>
                  Dashboard
                </Link>
                <Link to="/terminal" className={`transition-all ${isActive('/terminal') ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}>
                  Terminal
                </Link>
                <Link to="/explore" className={`transition-all ${isActive('/explore') ? 'text-blue-400' : 'text-gray-300 hover:text-white'}`}>
                  Explore
                </Link>
              </>
            )}
          </div>

          {/* CTA */}
          {isHome && !isAuthenticated && (
            <div className="hidden md:flex gap-4">
              <Link to="/login" className="px-6 py-2 text-white hover:text-blue-400 transition-all">Sign In</Link>
              <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all">
                Get Started
              </Link>
            </div>
          )}

          {/* User Menu */}
          {isAuthenticated && (
            <div className="hidden md:flex gap-4 items-center">
              <span className="text-gray-300 text-sm">Welcome, {user?.username}</span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-gray-300 hover:text-white transition-all"
              >
                Logout
              </button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            {!isHome && isAuthenticated && (
              <>
                <Link to="/dashboard" className="block text-gray-300 hover:text-blue-400">Dashboard</Link>
                <Link to="/terminal" className="block text-gray-300 hover:text-blue-400">Terminal</Link>
                <Link to="/explore" className="block text-gray-300 hover:text-blue-400">Explore</Link>
                <button onClick={handleLogout} className="block text-gray-300 hover:text-blue-400">Logout</button>
              </>
            )}
            {isHome && !isAuthenticated && (
              <>
                <Link to="/login" className="block text-gray-300 hover:text-blue-400">Sign In</Link>
                <Link to="/signup" className="block px-4 py-2 bg-blue-500 text-white rounded-lg text-center">Get Started</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/terminal" element={<Terminal />} />
          <Route path="/explore" element={<Explore />} />
        </Routes>
      </div>
    </Router>
  );
}
