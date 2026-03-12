"""
Paper Trading Service
Simulates trades using Alpaca Paper Trading API
"""

from typing import Dict, List
import aiohttp
from backend.config import ALPACA_API_KEY, ALPACA_SECRET_KEY, ALPACA_BASE_URL
from datetime import datetime

async def execute_paper_trade(symbol: str, quantity: float, side: str) -> Dict:
    """
    Execute a paper trade order on Alpaca
    
    Args:
        symbol: Stock symbol
        quantity: Number of shares
        side: "buy" or "sell"
    
    Returns:
        Order confirmation details
    """
    try:
        headers = {
            "APCA-API-KEY-ID": ALPACA_API_KEY,
            "APCA-API-SECRET-KEY": ALPACA_SECRET_KEY,
        }
        
        payload = {
            "symbol": symbol,
            "qty": quantity,
            "side": side,
            "type": "market",
            "time_in_force": "day"
        }
        
        url = f"{ALPACA_BASE_URL}/v2/orders"
        
        async with aiohttp.ClientSession() as session:
            async with session.post(url, headers=headers, json=payload) as response:
                if response.status in [200, 201]:
                    order = await response.json()
                    return {
                        "order_id": order.get('id'),
                        "symbol": order.get('symbol'),
                        "qty": order.get('qty'),
                        "side": order.get('side'),
                        "filled_at": order.get('filled_at'),
                        "status": order.get('status')
                    }
                else:
                    error = await response.text()
                    raise Exception(f"Order failed: {error}")
    except Exception as e:
        raise Exception(f"Failed to execute trade: {str(e)}")

async def get_portfolio() -> List[Dict]:
    """
    Get current portfolio positions
    
    Returns:
        List of open positions
    """
    try:
        headers = {
            "APCA-API-KEY-ID": ALPACA_API_KEY,
            "APCA-API-SECRET-KEY": ALPACA_SECRET_KEY,
        }
        
        url = f"{ALPACA_BASE_URL}/v2/positions"
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                if response.status == 200:
                    positions_data = await response.json()
                    positions = []
                    
                    for pos in positions_data:
                        positions.append({
                            "symbol": pos.get('symbol'),
                            "qty": float(pos.get('qty')),
                            "avg_fill_price": float(pos.get('avg_fill_price')),
                            "current_price": float(pos.get('current_price')),
                            "market_value": float(pos.get('market_value')),
                            "unrealized_pl": float(pos.get('unrealized_pl')),
                            "unrealized_plpc": float(pos.get('unrealized_plpc')),
                            "side": pos.get('side')
                        })
                    
                    return positions
                else:
                    raise Exception(f"Failed to fetch positions: {response.status}")
    except Exception as e:
        raise Exception(f"Failed to get portfolio: {str(e)}")

async def get_account_info() -> Dict:
    """
    Get account information from Alpaca
    
    Returns:
        Account details including cash, buying power, etc.
    """
    try:
        headers = {
            "APCA-API-KEY-ID": ALPACA_API_KEY,
            "APCA-API-SECRET-KEY": ALPACA_SECRET_KEY,
        }
        
        url = f"{ALPACA_BASE_URL}/v2/account"
        
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                if response.status == 200:
                    account = await response.json()
                    return {
                        "equity": float(account.get('equity')),
                        "cash": float(account.get('cash')),
                        "buying_power": float(account.get('buying_power')),
                        "portfolio_value": float(account.get('portfolio_value')),
                        "multiplier": int(account.get('multiplier')),
                        "status": account.get('status')
                    }
                else:
                    raise Exception(f"Failed to fetch account: {response.status}")
    except Exception as e:
        raise Exception(f"Failed to get account info: {str(e)}")

async def cancel_order(order_id: str) -> Dict:
    """
    Cancel an open order
    
    Args:
        order_id: Order ID to cancel
    
    Returns:
        Cancellation confirmation
    """
    try:
        headers = {
            "APCA-API-KEY-ID": ALPACA_API_KEY,
            "APCA-API-SECRET-KEY": ALPACA_SECRET_KEY,
        }
        
        url = f"{ALPACA_BASE_URL}/v2/orders/{order_id}"
        
        async with aiohttp.ClientSession() as session:
            async with session.delete(url, headers=headers) as response:
                if response.status == 204:
                    return {"success": True, "message": "Order cancelled"}
                else:
                    raise Exception(f"Failed to cancel order: {response.status}")
    except Exception as e:
        raise Exception(f"Failed to cancel order: {str(e)}")
