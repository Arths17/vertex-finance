"""
Metrics Service
Calculates performance metrics for strategies: Sharpe Ratio, Win Rate, Returns, etc.
"""

import pandas as pd
import numpy as np
from typing import Dict

def calculate_sharpe_ratio(returns: list, risk_free_rate: float = 0.02) -> float:
    """
    Calculate Sharpe Ratio
    
    Args:
        returns: List of period returns
        risk_free_rate: Annual risk-free rate (default 2%)
    
    Returns:
        Sharpe Ratio
    """
    try:
        returns = np.array(returns)
        excess_returns = returns - (risk_free_rate / 252)
        
        if np.std(excess_returns) == 0:
            return 0.0
        
        sharpe = np.mean(excess_returns) / np.std(excess_returns) * np.sqrt(252)
        return round(sharpe, 2)
    except Exception as e:
        print(f"Error calculating Sharpe ratio: {str(e)}")
        return 0.0

def calculate_win_rate(trades: list) -> float:
    """
    Calculate win rate from list of trades
    
    Args:
        trades: List of trade results (profit/loss values)
    
    Returns:
        Win rate as percentage
    """
    try:
        if not trades:
            return 0.0
        
        winning_trades = sum(1 for t in trades if t > 0)
        win_rate = (winning_trades / len(trades)) * 100
        return round(win_rate, 2)
    except Exception as e:
        print(f"Error calculating win rate: {str(e)}")
        return 0.0

def calculate_total_return(initial_balance: float, final_balance: float) -> float:
    """
    Calculate total return percentage
    
    Args:
        initial_balance: Starting account balance
        final_balance: Ending account balance
    
    Returns:
        Total return as percentage
    """
    try:
        if initial_balance == 0:
            return 0.0
        
        return_pct = ((final_balance - initial_balance) / initial_balance) * 100
        return round(return_pct, 2)
    except Exception as e:
        print(f"Error calculating return: {str(e)}")
        return 0.0

def calculate_max_drawdown(returns: list) -> float:
    """
    Calculate maximum drawdown
    
    Args:
        returns: List of period returns
    
    Returns:
        Maximum drawdown as percentage
    """
    try:
        cumulative = np.cumprod(1 + np.array(returns)) - 1
        running_max = np.maximum.accumulate(cumulative)
        drawdown = (cumulative - running_max) / (1 + running_max)
        max_dd = np.min(drawdown)
        return round(max_dd * 100, 2)
    except Exception as e:
        print(f"Error calculating max drawdown: {str(e)}")
        return 0.0

def calculate_strategy_metrics(trades: list, returns: list, initial_balance: float, 
                               final_balance: float) -> Dict:
    """
    Calculate comprehensive strategy metrics
    
    Args:
        trades: List of individual trade P&L values
        returns: List of periodic returns
        initial_balance: Starting balance
        final_balance: Ending balance
    
    Returns:
        Dictionary with all metrics
    """
    try:
        metrics = {
            "total_return": calculate_total_return(initial_balance, final_balance),
            "sharpe_ratio": calculate_sharpe_ratio(returns),
            "win_rate": calculate_win_rate(trades),
            "max_drawdown": calculate_max_drawdown(returns),
            "total_trades": len(trades),
            "winning_trades": sum(1 for t in trades if t > 0),
            "losing_trades": sum(1 for t in trades if t < 0),
            "average_win": np.mean([t for t in trades if t > 0]) if any(t > 0 for t in trades) else 0,
            "average_loss": np.mean([t for t in trades if t < 0]) if any(t < 0 for t in trades) else 0,
        }
        return metrics
    except Exception as e:
        print(f"Error calculating metrics: {str(e)}")
        return {}
