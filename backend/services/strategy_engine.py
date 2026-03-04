"""
Strategy Engine Service
Handles strategy analysis and code generation from natural language prompts using Gemini AI
"""

from typing import Tuple
from .market_data import get_latest_price, get_historical_data
from .gemini_ai import analyze_with_ai, generate_strategy_code

async def analyze_market_prompt(prompt: str, symbol: str) -> Tuple[str, str]:
    """
    Analyze a market prompt and generate strategy code using Gemini AI
    
    Args:
        prompt: User's natural language query
        symbol: Stock symbol to analyze
    
    Returns:
        Tuple of (analysis_text, python_code_snippet)
    """
    try:
        # Fetch latest price and historical data
        try:
            price = await get_latest_price(symbol)
            history = await get_historical_data(symbol, timeframe="15m", limit=50)
        except:
            # If market data fails, still allow AI analysis
            price = None
            history = None
        
        # Use Gemini AI for analysis
        result = await analyze_with_ai(symbol, prompt, price, history)
        
        if result.get("success"):
            return result.get("analysis", ""), result.get("code_snippet", "")
        else:
            # Fallback to basic analysis if AI fails
            return await _fallback_analysis(symbol, prompt, price), _generate_default_strategy()
    
    except Exception as e:
        return f"Error analyzing {symbol}: {str(e)}", _generate_default_strategy()

async def _fallback_analysis(symbol: str, prompt: str, price: float = None) -> str:
    """Fallback analysis when AI is unavailable"""
    analysis = f"Analysis for {symbol}"
    if price:
        analysis += f"\nCurrent Price: ${price:.2f}"
    analysis += f"\n\nQuery: {prompt}\n\nPlease configure Gemini API for detailed AI-powered analysis."
    return analysis

async def _analyze_rsi(symbol: str, price: float, history: list) -> str:
    """Calculate and analyze RSI"""
    # Placeholder RSI calculation
    rsi = 45.0  # Mock value
    
    if rsi < 30:
        signal = "OVERSOLD - potential BUY signal"
    elif rsi > 70:
        signal = "OVERBOUGHT - potential SELL signal"
    else:
        signal = "NEUTRAL momentum"
    
    return f"{symbol} @ ${price:.2f}\nRSI (14): {rsi:.1f} ({signal})"

async def _analyze_momentum(symbol: str, price: float, history: list) -> str:
    """Analyze momentum indicators"""
    # Placeholder momentum analysis
    return f"{symbol} @ ${price:.2f}\nMomentum analysis: Positive trend detected. Price acceleration confirms bullish setup."

async def _analyze_mean_reversion(symbol: str, price: float, history: list) -> str:
    """Analyze mean reversion setup"""
    # Placeholder mean reversion analysis
    return f"{symbol} @ ${price:.2f}\nPrice deviation from 20-day MA: +2.5%. Mean reversion signal: Entry opportunity."

def _generate_rsi_strategy() -> str:
    """Generate RSI-based strategy code"""
    return """def rsi_strategy(data, period=14):
    '''RSI Oversold/Overbought Strategy'''
    deltas = data['close'].diff()
    seed = deltas[:period+1]
    up = seed[seed >= 0].sum() / period
    down = -seed[seed < 0].sum() / period
    rs = up / down
    rsi = 100 - 100 / (1 + rs)
    
    if rsi < 30:
        return "BUY"  # Oversold
    elif rsi > 70:
        return "SELL"  # Overbought
    else:
        return "HOLD"
"""

def _generate_momentum_strategy() -> str:
    """Generate momentum-based strategy code"""
    return """def momentum_strategy(data, period=20):
    '''Momentum Following Strategy'''
    momentum = data['close'].diff(period)
    
    if momentum.iloc[-1] > 0:
        return "BUY"   # Positive momentum
    elif momentum.iloc[-1] < 0:
        return "SELL"  # Negative momentum
    else:
        return "HOLD"
"""

def _generate_mean_reversion_strategy() -> str:
    """Generate mean reversion strategy code"""
    return """def mean_reversion_strategy(data, period=20):
    '''Mean Reversion Strategy'''
    sma = data['close'].rolling(window=period).mean()
    std = data['close'].rolling(window=period).std()
    
    upper_band = sma + (std * 2)
    lower_band = sma - (std * 2)
    
    current_price = data['close'].iloc[-1]
    
    if current_price < lower_band.iloc[-1]:
        return "BUY"   # Below lower band
    elif current_price > upper_band.iloc[-1]:
        return "SELL"  # Above upper band
    else:
        return "HOLD"
"""

def _generate_default_strategy() -> str:
    """Generate a basic template strategy"""
    return """def custom_strategy(data):
    '''Custom Strategy Template'''
    # Define your entry signals here
    if data['close'].iloc[-1] > data['close'].iloc[-2]:
        return "BUY"
    else:
        return "SELL"
"""
