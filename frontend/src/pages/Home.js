import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-8">
          {/* Logo/Brand */}
          <div className="inline-block">
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500">
              VERTEX
            </h1>
            <p className="text-xl text-gray-300 mt-2">Institutional quant infrastructure for traders</p>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
              The market doesn't wait.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Neither should you.</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Build strategies, backtest instantly, and deploy with confidence. Professional trading tools redesigned for independent traders.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/terminal" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-400 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-blue-500/50 transition-all transform hover:scale-105">
              Launch Terminal
            </Link>
            <button className="px-8 py-4 border-2 border-gray-500 text-white font-bold rounded-lg hover:border-blue-400 hover:text-blue-400 transition-all">
              View Docs
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-12 pb-8 border-t border-gray-700">
            <div>
              <p className="text-3xl font-bold text-blue-400">50K+</p>
              <p className="text-gray-400 text-sm">Active Traders</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cyan-400">$2.3B+</p>
              <p className="text-gray-400 text-sm">Backtested Volume</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-purple-400">24/7</p>
              <p className="text-gray-400 text-sm">Live Trading</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="text-gray-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Features() {
  const features = [
    {
      icon: '⚡',
      title: 'End-to-End Strategy Building',
      description: 'Create rule-based strategies from events, indicators, and price action. Then backtest performance and automate execution.'
    },
    {
      icon: '🔍',
      title: 'Prompt-Driven Technical Analysis',
      description: 'Request technical analysis like support, resistance, and breakouts and set alerts or trades from the results.'
    },
    {
      icon: '📊',
      title: 'Lightning-Fast Backtesting',
      description: 'Validate your strategies against historical data in seconds with institutional-grade accuracy.'
    },
    {
      icon: '🌐',
      title: 'Advanced Market Research',
      description: 'Research companies, sectors, and market movements with fast, detailed analysis powered by AI.'
    },
    {
      icon: '🤝',
      title: 'Share & Discover Strategies',
      description: 'Discover, copy, and modify profitable strategies from the community. Build on proven frameworks.'
    },
    {
      icon: '🎯',
      title: 'Real-Time Alerts & Execution',
      description: 'Deploy strategies with direct access and receive instant alerts as your models detect patterns.'
    }
  ];

  return (
    <div className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">Features</p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Everything you need<br />to trade smarter
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Vertex consolidates research, charting, and strategy building into one AI-driven platform
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {features.map((feature, idx) => (
            <div key={idx} className="group p-6 rounded-xl border border-gray-800 bg-slate-900/50 hover:bg-slate-800/50 hover:border-blue-500/50 transition-all">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Pricing() {
  const plans = [
    {
      name: 'CORE',
      price: 0,
      period: 'Forever',
      description: 'Start free and explore',
      features: ['Charting & Technicals', 'Email Alerts', 'Paper Trading', '5 Custom Indicators', '100 API Calls/Day'],
      cta: 'Start Free',
      highlight: false
    },
    {
      name: 'PREMIUM',
      price: 50,
      period: 'Month',
      description: 'Everything for serious traders',
      features: ['All Core Features', 'Unlimited Indicators', 'SMS Alerts', 'Deploy 10 Strategies', 'Broker Connections', 'Priority Support', '10K+ API Calls/Day'],
      cta: 'Upgrade Now',
      highlight: true
    },
    {
      name: 'ENTERPRISE',
      price: 'Custom',
      description: 'Institutional-grade solutions',
      features: ['All Premium Features', 'Unlimited Deployments', 'White-label Options', 'API Access', 'Dedicated Manager', 'Custom Integrations'],
      cta: 'Contact Sales',
      highlight: false
    }
  ];

  return (
    <div className="py-24 bg-gradient-to-b from-black to-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">Pricing</p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Built for every trader
          </h2>
          <p className="text-xl text-gray-400">Start free and scale when you're ready</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <div key={idx} className={`rounded-xl p-8 ${plan.highlight ? 'border-2 border-blue-500 bg-blue-500/10 transform scale-105' : 'border border-gray-800 bg-slate-900/50'}`}>
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-black text-white">{plan.price === 'Custom' ? 'Custom' : `$${plan.price}`}</span>
                {plan.price !== 'Custom' && <span className="text-gray-400 ml-2">/ {plan.period}</span>}
              </div>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              <button className={`w-full py-3 rounded-lg font-bold mb-6 transition-all ${plan.highlight ? 'bg-blue-500 text-white hover:bg-blue-600' : 'border border-gray-600 text-white hover:border-blue-400'}`}>
                {plan.cta}
              </button>
              <div className="space-y-3">
                {plan.features.map((feature, f_idx) => (
                  <div key={f_idx} className="flex items-center text-gray-300">
                    <span className="text-blue-400 mr-3">✓</span>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Brokers() {
  const brokers = ['Alpaca', 'Coinbase', 'Webull', 'Tastytrade', 'Kraken', 'E*TRADE', 'Charles Schwab', 'Tradier'];

  return (
    <div className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-blue-400 font-semibold text-sm uppercase tracking-wider mb-4">Integrations</p>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
            Trade with your<br />preferred broker
          </h2>
          <p className="text-xl text-gray-400">Seamlessly connect to major brokerages for direct execution</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brokers.map((broker, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-gray-800 bg-slate-900/50 hover:border-blue-500/50 transition-all text-center">
              <p className="font-bold text-white">{broker}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">VERTEX</h3>
            <p className="text-gray-400">Professional trading infrastructure for the modern trader.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/terminal" className="hover:text-blue-400">Terminal</Link></li>
              <li><Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link></li>
              <li><a href="#" className="hover:text-blue-400">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-400">About</a></li>
              <li><a href="#" className="hover:text-blue-400">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-blue-400">Privacy</a></li>
              <li><a href="#" className="hover:text-blue-400">Terms</a></li>
              <li><a href="#" className="hover:text-blue-400">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
          <p>© 2026 VERTEX. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-blue-400">Twitter</a>
            <a href="#" className="hover:text-blue-400">Discord</a>
            <a href="#" className="hover:text-blue-400">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="bg-black">
      <Hero />
      <Features />
      <Pricing />
      <Brokers />
      <Footer />
    </div>
  );
}
