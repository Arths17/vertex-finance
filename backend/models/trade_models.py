"""
Trade Data Models
Pydantic models for trade and order-related data
"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum

class OrderSide(str, Enum):
    BUY = "buy"
    SELL = "sell"

class OrderType(str, Enum):
    MARKET = "market"
    LIMIT = "limit"
    STOP = "stop"
    STOP_LIMIT = "stop_limit"

class OrderStatus(str, Enum):
    PENDING = "pending"
    FILLED = "filled"
    PARTIALLY_FILLED = "partially_filled"
    CANCELLED = "cancelled"
    REJECTED = "rejected"

class Order(BaseModel):
    """Order model"""
    id: Optional[str] = None
    symbol: str = Field(..., min_length=1, max_length=10)
    qty: float = Field(..., gt=0, description="Quantity in shares")
    side: OrderSide
    type: OrderType = OrderType.MARKET
    limit_price: Optional[float] = None
    stop_price: Optional[float] = None
    status: OrderStatus = OrderStatus.PENDING
    filled_qty: float = Field(default=0)
    filled_avg_price: Optional[float] = None
    created_at: Optional[datetime] = None
    filled_at: Optional[datetime] = None
    
    class Config:
        use_enum_values = True

class Trade(BaseModel):
    """Executed trade record"""
    id: Optional[str] = None
    symbol: str
    entry_price: float = Field(..., gt=0)
    exit_price: Optional[float] = None
    quantity: float = Field(..., gt=0)
    side: OrderSide
    entry_time: datetime
    exit_time: Optional[datetime] = None
    profit_loss: Optional[float] = None
    profit_loss_pct: Optional[float] = None
    strategy_id: Optional[str] = None
    
    class Config:
        use_enum_values = True

class Position(BaseModel):
    """Current position model"""
    symbol: str
    qty: float = Field(..., description="Current quantity")
    avg_fill_price: float = Field(..., description="Average entry price")
    current_price: float
    market_value: float = Field(..., description="Current market value")
    unrealized_pl: float = Field(..., description="Unrealized profit/loss")
    unrealized_plpc: float = Field(..., description="Unrealized PL percentage")
    side: OrderSide

class Watchlist(BaseModel):
    """Watchlist model"""
    symbol: str = Field(..., min_length=1, max_length=10)
    price: Optional[float] = None
    change_pct: Optional[float] = None
    added_at: Optional[datetime] = None
