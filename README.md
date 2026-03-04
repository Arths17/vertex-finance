# Vertex: AI-Powered Trading Terminal

A professional-grade trading platform that bridges the gap between retail trading and institutional-grade quantitative analysis.

## Project Structure

```
vertex/
├── frontend/                          # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── App.js                    # Main router
│   │   ├── pages/
│   │   │   ├── Terminal.js           # Core trading interface
│   │   │   ├── Dashboard.js          # Portfolio overview
│   │   │   └── Explore.js            # Strategy marketplace
│   │   ├── components/
│   │   │   ├── VertexChart.js        # Chart component (Lightweight Charts)
│   │   │   ├── CodeEditor.js         # Python strategy editor
│   │   │   ├── VertexAI.js           # AI chat interface
│   │   │   ├── Watchlist.js          # Asset watchlist table
│   │   │   ├── WatchlistRow.js       # Individual watchlist row
│   │   │   └── StrategyCard.js       # Strategy card display
│   │   └── services/
│   │       └── api.js                # API client service
│   ├── package.json
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── vite.config.js                # Vite build configuration
│   └── postcss.config.js
│
└── backend/                           # FastAPI + Python
    ├── main.py                        # FastAPI entry point
    ├── config.py                      # Configuration & environment variables
    ├── services/
    │   ├── market_data.py             # Alpaca API integration
    │   ├── strategy_engine.py         # Strategy analysis & code generation
    │   ├── metrics.py                 # Performance calculation (Sharpe, Win Rate, etc)
    │   ├── paper_trading.py           # Paper trading execution
    │   └── alerts.py                  # Price alert management
    ├── models/
    │   ├── strategy_models.py         # Pydantic models for strategies
    │   └── trade_models.py            # Pydantic models for trades/orders
    ├── workers/
    │   └── alert_worker.py            # Background alert monitoring
    ├── requirements.txt               # Python dependencies
    ├── .env.example                   # Environment variables template
    └── .env                           # Actual environment variables (create from .env.example)
```

## Key Features

### Frontend
- **Terminal**: Real-time charting with TradingView's Lightweight Charts
- **Vertex AI**: Natural language interface for market analysis
- **Code Editor**: Write Python-based strategies directly in the platform
- **Dashboard**: Portfolio management and strategy overview
- **Explore**: Community strategy marketplace

### Backend
- **Market Data**: Real-time prices via Alpaca Markets API
- **Strategy Engine**: Analyze user prompts and generate trading code
- **Paper Trading**: Risk-free backtesting and simulation
- **Metrics**: Calculate Sharpe Ratio, Win Rate, Max Drawdown, etc.
- **Alerts**: Price-level notifications system
- **Background Workers**: Async alert monitoring

## Tech Stack

### Frontend
- React 18.2
- Vite 5.0
- Tailwind CSS 3.3
- React Router 6.20
- Lightweight Charts 4.1
- Framer Motion 10.16
- axios

### Backend
- FastAPI 0.104
- Uvicorn 0.24
- Pydantic 2.5
- aiohttp 3.9
- pandas 2.1
- NumPy 1.26
- Alpaca Trade API 3.2

## Design System

### Color Palette
- **Background**: #0A0A0A (Institutional Dark)
- **Card Background**: #121212
- **Accent (Gains)**: #00FF88 (Vertex Green)
- **Accent (Losses)**: #FF3B30 (Vertex Red)

### Typography
- **Code/Market Data**: JetBrains Mono, Fira Code
- **UI Text**: Inter, System UI

## Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- Alpaca Markets API keys (Paper Trading)

### Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend runs at: `http://localhost:5173`

### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your Alpaca keys
python main.py
```

Backend runs at: `http://localhost:8000`

### API Documentation
Once the backend is running, visit: `http://localhost:8000/docs`

## API Endpoints

### Terminal
- `POST /api/terminal/analyze` - Analyze market with natural language prompt

### Market Data
- `GET /api/market/price/{symbol}` - Get latest price
- `GET /api/market/history/{symbol}` - Get historical data

### Watchlist
- `GET /api/watchlist` - Get user watchlist
- `POST /api/watchlist` - Add symbol to watchlist

### Strategies
- `GET /api/strategies/saved` - Get saved strategies
- `GET /api/strategies/deployed` - Get active strategies
- `POST /api/strategies/deploy` - Deploy a strategy

### Trading
- `GET /api/trading/positions` - Get portfolio positions
- `POST /api/trading/order` - Place paper trading order

### Alerts
- `POST /api/alerts` - Create price alert
- `GET /api/alerts` - Get all alerts
- `DELETE /api/alerts/{alert_id}` - Delete alert

## Environment Variables

Create a `.env` file in the backend directory:

```env
ENVIRONMENT=development
ALPACA_API_KEY=your_key
ALPACA_SECRET_KEY=your_secret
ALPACA_BASE_URL=https://paper-api.alpaca.markets
OPENAI_API_KEY=your_openai_key
DATABASE_URL=sqlite:///vertex.db
REDIS_URL=redis://localhost:6379/0
LOG_LEVEL=INFO
```

## Development

### Code Style
- Backend: PEP 8 with 100-char line limit
- Frontend: ESLint, Prettier

```bash
# Format code
npm run format      # Frontend
black . --line-length 100  # Backend
```

## Production Deployment

### Frontend
```bash
npm run build
# Deploy dist/ folder to Vercel, Netlify, or AWS S3
```

### Backend
```bash
# Using Gunicorn + Uvicorn
gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app
```

## Contributing

1. Create a feature branch: `git checkout -b feature/feature-name`
2. Commit changes: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/feature-name`
4. Open a Pull Request

## License

MIT License - see LICENSE for details

## Support

For issues, feature requests, or questions: [GitHub Issues](https://github.com/atharvranjan/vertexaifinance)
# vertex-finance
