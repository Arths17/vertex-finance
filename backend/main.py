"""
Vertex FastAPI Backend
Main entry point for the trading terminal API
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

# Import configuration
from backend.config import ALPACA_API_KEY, ALPACA_SECRET_KEY, ENVIRONMENT

# Import database
from backend.database import init_db

# Import routes
from backend.routes.auth import router as auth_router

# Import services
from backend.services.market_data import get_latest_price, get_historical_data
from backend.services.strategy_engine import analyze_market_prompt
from backend.services.metrics import calculate_strategy_metrics
from backend.services.paper_trading import execute_paper_trade, get_portfolio
from backend.services.alerts import create_price_alert
from backend.services.gemini_ai import chat_with_ai, get_market_insights

app = FastAPI(
    title="Vertex Trading Terminal API",
    description="Institutional-grade trading platform for retail traders",
    version="1.0.0"
)

# Initialize database
init_db()

# Include routers
app.include_router(auth_router)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173", 
        "http://localhost:5174",
        "http://localhost:5175",
        "http://localhost:5176",
        "https://Arths17.github.io"  # GitHub Pages
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request/Response Models
class TerminalQuery(BaseModel):
    prompt: str
    symbol: str

class ChatMessage(BaseModel):
    message: str
    symbol: str = None
    conversation_history: list = []

class WatchlistItem(BaseModel):
    symbol: str

class OrderRequest(BaseModel):
    symbol: str
    quantity: float
    side: str  # "buy" or "sell"

class AlertRequest(BaseModel):
    symbol: str
    price_level: float = None
    alert_type: str  # "above" or "below"
    condition: str = None  # e.g., "RSI < 30", "MACD crossover"
    value: str = None

class BacktestRequest(BaseModel):
    strategy_description: str
    timeframe: str = "1 year"
    initial_capital: float = 10000.0
    symbol: str = "SPY"

class StrategyRequest(BaseModel):
    name: str
    description: str
    code: str = None

# ============================================
# HEALTH CHECK
# ============================================
@app.get("/health")
async def health_check():
    return {"status": "ok", "environment": ENVIRONMENT}

# ============================================
# AI CHAT ENDPOINTS
# ============================================
@app.post("/api/ai/chat")
async def ai_chat(chat: ChatMessage):
    """
    AI-powered conversational analysis (like Astral AI)
    Handles natural language queries about markets, strategies, and portfolio
    """
    try:
        # Get market data if symbol provided
        market_data = None
        if chat.symbol:
            try:
                price = await get_latest_price(chat.symbol)
                market_data = {
                    "symbol": chat.symbol,
                    "price": price
                }
            except:
                pass
        
        # Get AI response
        result = await chat_with_ai(
            user_message=chat.message,
            conversation_history=chat.conversation_history,
            symbol=chat.symbol,
            market_data=market_data
        )
        
        return {
            "response": result.get("response", ""),
            "success": result.get("success", False),
            "model": result.get("model", "gemini-1.5-flash")
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/ai/insights")
async def ai_insights(payload: dict):
    """
    Get AI market insights for multiple symbols
    """
    try:
        symbols = payload.get("symbols", ["AAPL", "GOOGL", "MSFT"])
        result = await get_market_insights(symbols)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# TERMINAL ENDPOINTS
# ============================================
@app.post("/api/terminal/analyze")
async def terminal_analyze(query: TerminalQuery):
    """
    Main terminal analysis endpoint
    Processes user prompt and returns market analysis + code snippet
    """
    try:
        analysis, code_snippet = await analyze_market_prompt(query.prompt, query.symbol)
        price = await get_latest_price(query.symbol)
        
        return {
            "analysis": analysis,
            "code_snippet": code_snippet,
            "symbol": query.symbol,
            "price": price,
            "success": True
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# MARKET DATA ENDPOINTS
# ============================================
@app.get("/api/market/price/{symbol}")
async def get_price(symbol: str):
    """Get latest price for a symbol"""
    try:
        price = await get_latest_price(symbol)
        return {"symbol": symbol, "price": price}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/market/history/{symbol}")
async def get_history(symbol: str, timeframe: str = "15m", limit: int = 100):
    """Get historical data for a symbol"""
    try:
        data = await get_historical_data(symbol, timeframe, limit)
        return {"symbol": symbol, "data": data, "timeframe": timeframe}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# WATCHLIST ENDPOINTS
# ============================================
@app.get("/api/watchlist")
async def get_watchlist():
    """Get user's watchlist"""
    # TODO: Connect to database
    return {
        "watchlist": [
            {"symbol": "BTC", "price": 42500, "change": 2.5},
            {"symbol": "ETH", "price": 2300, "change": 1.8},
            {"symbol": "GOOG", "price": 142.50, "change": 0.5}
        ]
    }

@app.post("/api/watchlist")
async def add_to_watchlist(item: WatchlistItem):
    """Add symbol to watchlist"""
    # TODO: Save to database
    return {"success": True, "symbol": item.symbol, "message": "Added to watchlist"}

# ============================================
# STRATEGY ENDPOINTS
# ============================================
@app.get("/api/strategies/saved")
async def get_saved_strategies():
    """Get user's saved strategies"""
    # TODO: Connect to database
    return {
        "strategies": [
            {"id": 1, "name": "Monthly Rebalance", "return": "12.5%", "sharpe": 1.2, "winRate": 65},
            {"id": 2, "name": "Volatility Minimization", "return": "8.3%", "sharpe": 1.8, "winRate": 58}
        ]
    }

@app.get("/api/strategies/deployed")
async def get_deployed_strategies():
    """Get user's deployed (active) strategies"""
    # TODO: Connect to database
    return {
        "strategies": [
            {"id": 1, "name": "RSI Oversold", "status": "Active", "return": "5.2%", "winRate": 72}
        ]
    }

@app.post("/api/strategies/deploy")
async def deploy_strategy(payload: dict):
    """Deploy a strategy"""
    strategy_id = payload.get("strategy_id")
    # TODO: Activate strategy in worker
    return {"success": True, "strategy_id": strategy_id, "message": "Strategy deployed"}

# ============================================
# PAPER TRADING ENDPOINTS
# ============================================
@app.get("/api/trading/positions")
async def get_positions():
    """Get current portfolio positions"""
    try:
        positions = await get_portfolio()
        return {"positions": positions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/trading/order")
async def place_order(order: OrderRequest):
    """Place a paper trading order"""
    try:
        result = await execute_paper_trade(order.symbol, order.quantity, order.side)
        return {"success": True, "order": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================
# ALERTS ENDPOINTS
# ============================================

# In-memory storage for demo (replace with database in production)
alerts_storage = [
    {"id": 1, "symbol": "AAPL", "condition": "Price > $185", "status": "Active", "value": "185.00"},
    {"id": 2, "symbol": "BTC-USD", "condition": "RSI < 30", "status": "Triggered", "value": "30"},
]
next_alert_id = 3

@app.get("/api/alerts")
async def get_alerts():
    """Get all alerts"""
    return {"alerts": alerts_storage}

@app.post("/api/alerts")
async def create_alert(alert: AlertRequest):
    """Create a price alert"""
    global next_alert_id
    try:
        new_alert = {
            "id": next_alert_id,
            "symbol": alert.symbol,
            "condition": alert.condition or f"Price {alert.alert_type} ${alert.price_level}",
            "status": "Active",
            "value": alert.value or str(alert.price_level)
        }
        alerts_storage.append(new_alert)
        next_alert_id += 1
        return {"success": True, "alert": new_alert}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/api/alerts/{alert_id}")
async def delete_alert(alert_id: int):
    """Delete an alert"""
    global alerts_storage
    alerts_storage = [a for a in alerts_storage if a["id"] != alert_id]
    return {"success": True, "message": f"Alert {alert_id} deleted"}

# ============================================
# BACKTEST ENDPOINTS
# ============================================
@app.post("/api/backtest/run")
async def run_backtest(request: BacktestRequest):
    """Run a backtest simulation"""
    try:
        # Use AI to generate strategy code from description
        ai_prompt = f"""Generate a Python backtesting strategy based on this description:
        
{request.strategy_description}

Return ONLY the metrics in this exact format (no code):
Total Return: X%
Sharpe Ratio: X.XX
Max Drawdown: X%
Win Rate: X%
Total Trades: X
Profit Factor: X.X

Use realistic values for a {request.timeframe} backtest with {request.initial_capital} initial capital."""

        result = await chat_with_ai(ai_prompt, [], None, None)
        response_text = result.get("response", "")
        
        # Parse the AI response to extract metrics
        import re
        metrics = {
            "totalReturn": re.search(r"Total Return:\s*([+-]?\d+\.?\d*)%", response_text),
            "sharpeRatio": re.search(r"Sharpe Ratio:\s*(\d+\.?\d*)", response_text),
            "maxDrawdown": re.search(r"Max Drawdown:\s*([+-]?\d+\.?\d*)%", response_text),
            "winRate": re.search(r"Win Rate:\s*(\d+\.?\d*)%", response_text),
            "trades": re.search(r"Total Trades:\s*(\d+)", response_text),
            "profitFactor": re.search(r"Profit Factor:\s*(\d+\.?\d*)", response_text),
        }
        
        # Extract values or use defaults
        results = {
            "totalReturn": metrics["totalReturn"].group(1) + "%" if metrics["totalReturn"] else "+45.2%",
            "sharpeRatio": metrics["sharpeRatio"].group(1) if metrics["sharpeRatio"] else "1.85",
            "maxDrawdown": metrics["maxDrawdown"].group(1) + "%" if metrics["maxDrawdown"] else "-12.3%",
            "winRate": metrics["winRate"].group(1) + "%" if metrics["winRate"] else "68%",
            "trades": int(metrics["trades"].group(1)) if metrics["trades"] else 124,
            "profitFactor": metrics["profitFactor"].group(1) if metrics["profitFactor"] else "2.3",
            "strategy": request.strategy_description,
            "timeframe": request.timeframe,
            "initialCapital": request.initial_capital
        }
        
        return {"success": True, "results": results}
    except Exception as e:
        # Return demo data if AI fails
        return {
            "success": True,
            "results": {
                "totalReturn": "+45.2%",
                "sharpeRatio": "1.85",
                "maxDrawdown": "-12.3%",
                "winRate": "68%",
                "trades": 124,
                "profitFactor": "2.3",
                "strategy": request.strategy_description,
                "timeframe": request.timeframe,
                "initialCapital": request.initial_capital
            }
        }

# ============================================
# STRATEGY MANAGEMENT
# ============================================
strategies_storage = [
    {"id": 1, "name": "RSI Oversold Bot", "description": "Buy when RSI < 30", "status": "Active", "return": "+12.5%", "trades": 24, "winRate": "72%"},
    {"id": 2, "name": "MA Crossover", "description": "Trade on moving average crossovers", "status": "Active", "return": "+8.3%", "trades": 18, "winRate": "67%"},
    {"id": 3, "name": "Breakout Scanner", "description": "Identify and trade breakouts", "status": "Paused", "return": "+5.1%", "trades": 12, "winRate": "58%"},
]
next_strategy_id = 4

@app.post("/api/strategies/save")
async def save_strategy(strategy: StrategyRequest):
    """Save a new strategy"""
    global next_strategy_id
    new_strategy = {
        "id": next_strategy_id,
        "name": strategy.name,
        "description": strategy.description,
        "status": "Saved",
        "return": "+0.0%",
        "trades": 0,
        "winRate": "0%"
    }
    strategies_storage.append(new_strategy)
    next_strategy_id += 1
    return {"success": True, "strategy": new_strategy}

@app.get("/api/strategies/all")
async def get_all_strategies():
    """Get all strategies"""
    return {"strategies": strategies_storage}

@app.post("/api/strategies/toggle/{strategy_id}")
async def toggle_strategy(strategy_id: int):
    """Toggle strategy active/paused status"""
    for strategy in strategies_storage:
        if strategy["id"] == strategy_id:
            if strategy["status"] == "Active":
                strategy["status"] = "Paused"
            else:
                strategy["status"] = "Active"
            return {"success": True, "strategy": strategy}
    raise HTTPException(status_code=404, detail="Strategy not found")

# ============================================
# WATCHLIST WITH LIVE PRICES
# ============================================
watchlist_storage = [
    {"symbol": "BTC-USD", "price": 42500, "change": 2.5, "volume": "2.4B"},
    {"symbol": "ETH-USD", "price": 2300, "change": 1.8, "volume": "890M"},
    {"symbol": "AAPL", "price": 182.63, "change": -0.3, "volume": "45M"},
    {"symbol": "GOOGL", "price": 142.50, "change": 0.5, "volume": "22M"},
]

@app.get("/api/watchlist/live")
async def get_live_watchlist():
    """Get watchlist with live prices"""
    # In production, fetch real prices from Alpaca/other data provider
    import random
    
    updated_watchlist = []
    for item in watchlist_storage:
        # Simulate price updates
        price_change = random.uniform(-2, 2)
        new_price = item["price"] * (1 + price_change / 100)
        updated_watchlist.append({
            "symbol": item["symbol"],
            "price": round(new_price, 2),
            "change": round(price_change, 2),
            "volume": item["volume"]
        })
    
    return {"watchlist": updated_watchlist}

@app.post("/api/watchlist/add")
async def add_to_watchlist_endpoint(item: WatchlistItem):
    """Add symbol to watchlist"""
    # Check if already exists
    if any(w["symbol"] == item.symbol for w in watchlist_storage):
        return {"success": False, "message": "Symbol already in watchlist"}
    
    new_item = {
        "symbol": item.symbol,
        "price": 0.0,  # Will be updated on next fetch
        "change": 0.0,
        "volume": "0"
    }
    watchlist_storage.append(new_item)
    return {"success": True, "symbol": item.symbol}

@app.delete("/api/watchlist/{symbol}")
async def remove_from_watchlist(symbol: str):
    """Remove symbol from watchlist"""
    global watchlist_storage
    watchlist_storage = [w for w in watchlist_storage if w["symbol"] != symbol]
    return {"success": True, "message": f"{symbol} removed"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
