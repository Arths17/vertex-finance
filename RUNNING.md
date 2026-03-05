# 🚀 Running Vertex Trading Platform

This guide shows you how to run the complete Vertex platform locally.

## Prerequisites

- **Python 3.9+** (get from [python.org](https://www.python.org/downloads/))
- **Node.js 16+** (get from [nodejs.org](https://nodejs.org/))
- **Git** (if not already installed)

---

## Quick Start (2 Terminals)

### Terminal 1: Start Backend API
```bash
# From the project root directory
bash start_backend.sh

# Or manually:
cd backend
python3 -m pip install -r ../requirements.txt
python3 main.py
```

The API will start on `http://localhost:8000`

### Terminal 2: Start Frontend
```bash
# From the project root directory (in a NEW terminal)
bash start_frontend.sh

# Or manually:
cd frontend
npm install
npm run dev
```

The frontend will start on `http://localhost:5173`

---

## Testing the API

Once both servers are running, test the auth endpoint:

```bash
# Register a new user
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "username": "testuser",
    "password": "password123",
    "full_name": "Test User"
  }'

# Expected response:
# {"access_token": "...", "refresh_token": "...", "user": {...}}
```

Then visit http://localhost:5173/ and test the signup form!

---

## Environment Variables (.env)

Create a `.env` file in the `backend/` directory:

```
ENVIRONMENT=development
SECRET_KEY=your-secret-key-here-change-in-production

# Alpaca API (optional - for real market data)
ALPACA_API_KEY=pk_xxxxx
ALPACA_SECRET_KEY=sk_xxxxx

# Gemini AI (optional - for AI features)
GEMINI_API_KEY=AIzaXXXXXXXXXXXXXXXXXXXXXXXX

# Database
DATABASE_URL=sqlite:///vertex.db

# Redis (optional - requires Redis server running)
REDIS_URL=redis://localhost:6379/0
```

---

## Database

The database is automatically initialized when the backend starts. It creates a SQLite file at `backend/vertex.db`.

To reset the database:
```bash
cd backend
rm vertex.db
python3 main.py  # Recreates the database
```

---

## API Documentation

Once the backend is running, view interactive API docs:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## Available API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login with email/password  
- `GET /api/auth/me` - Get current user profile

### Strategies
- `POST /api/strategies` - Create new strategy
- `GET /api/strategies` - List your strategies
- `GET /api/strategies/{id}` - Get strategy details
- `PUT /api/strategies/{id}` - Update strategy
- `DELETE /api/strategies/{id}` - Delete strategy

### Backtests
- `POST /api/backtests` - Run backtest
- `GET /api/backtests` - List your backtests
- `GET /api/backtests/{id}` - Get backtest results
- `DELETE /api/backtests/{id}` - Delete backtest

---

## Troubleshooting

### "Address already in use" error
The port is already in use. Either:
- Kill the existing process: `lsof -ti:8000 | xargs kill -9`
- Use a different port: Modify in code

### "ModuleNotFoundError: No module named 'fastapi'"
Install dependencies:
```bash
cd backend
python3 -m pip install -r ../requirements.txt
```

### "npm: command not found"
Install Node.js from [nodejs.org](https://nodejs.org/)

### Database errors
Reset the database:
```bash
cd backend
rm vertex.db
python3 main.py
```

---

## Next Steps

1. ✅ **Register an account** at http://localhost:5173
2. ✅ **Create a trading strategy** in the Strategy Manager
3. ✅ **Run backtests** on your strategies
4. ✅ **View results** in the Dashboard
5. ✅ **Deploy to production** when ready

---

## Production Deployment

For production, see [DEPLOYMENT.md](./DEPLOYMENT.md) (coming soon)
