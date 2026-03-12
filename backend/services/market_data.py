"""
Market Data Service
Handles real-time and historical price data from Alpaca Markets API
"""

import aiohttp
from typing import Dict, List
from backend.config import ALPACA_API_KEY, ALPACA_SECRET_KEY, ALPACA_BASE_URL

async def get_latest_price(symbol: str) -> float:
    """
    Fetch the latest price for a given symbol
    
    Args:
        symbol: Stock/crypto symbol (e.g., 'GOOG', 'BTC')
    
    Returns:
        Latest price as float
    """
    try:
        headers = {
            "APCA-API-KEY-ID": ALPACA_API_KEY,
            "APCA-API-SECRET-KEY": ALPACA_SECRET_KEY,
        }
        
        url = f"{ALPACA_BASE_URL}/v2/stocks/{symbol}/latest/quote"
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                if response.status == 200:
                    data = await response.json()
                    return data['quote']['ap']  # ask price
                else:
                    raise Exception(f"Error fetching price: {response.status}")
    except Exception as e:
        raise Exception(f"Failed to get price for {symbol}: {str(e)}")

async def get_historical_data(symbol: str, timeframe: str = "15m", limit: int = 100) -> List[Dict]:
    """
    Fetch historical OHLCV data
    
    Args:
        symbol: Stock symbol
        timeframe: Candle interval ('1m', '5m', '15m', '1h', '1d')
        limit: Number of candles to fetch
    
    Returns:
        List of OHLCV bar data
    """
    try:
        headers = {
            "APCA-API-KEY-ID": ALPACA_API_KEY,
            "APCA-API-SECRET-KEY": ALPACA_SECRET_KEY,
        }
        
        params = {
            "timeframe": timeframe,
            "limit": limit,
        }
        
        url = f"{ALPACA_BASE_URL}/v2/stocks/{symbol}/bars"
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers, params=params) as response:
                if response.status == 200:
                    data = await response.json()
                    return data.get('bars', [])
                else:
                    raise Exception(f"Error fetching bars: {response.status}")
    except Exception as e:
        raise Exception(f"Failed to get historical data for {symbol}: {str(e)}")

async def get_multiple_quotes(symbols: List[str]) -> Dict[str, float]:
    """
    Fetch prices for multiple symbols at once
    
    Args:
        symbols: List of stock symbols
    
    Returns:
        Dictionary of symbol -> price mapping
    """
    try:
        headers = {
            "APCA-API-KEY-ID": ALPACA_API_KEY,
            "APCA-API-SECRET-KEY": ALPACA_SECRET_KEY,
        }
        
        params = {
            "symbols": ",".join(symbols)
        }
        
        url = f"{ALPACA_BASE_URL}/v2/stocks/quotes"
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers, params=params) as response:
                if response.status == 200:
                    data = await response.json()
                    quotes = {}
                    for symbol, quote_data in data.get('quotes', {}).items():
                        quotes[symbol] = quote_data['ap']
                    return quotes
                else:
                    raise Exception(f"Error fetching quotes: {response.status}")
    except Exception as e:
        raise Exception(f"Failed to get quotes: {str(e)}")
