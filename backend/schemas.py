"""
Pydantic schemas for API requests and responses
"""

from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime


# ============ AUTH SCHEMAS ============

class UserRegister(BaseModel):
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=100)
    password: str = Field(..., min_length=8)
    full_name: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: str
    username: str
    full_name: Optional[str]
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse


# ============ STRATEGY SCHEMAS ============

class StrategyCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = None
    code: str
    symbol: str = Field(..., min_length=1, max_length=10)
    parameters: Optional[dict] = {}
    is_public: bool = False


class StrategyUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    code: Optional[str] = None
    parameters: Optional[dict] = None
    is_public: Optional[bool] = None
    status: Optional[str] = None


class StrategyResponse(BaseModel):
    id: int
    user_id: int
    name: str
    description: Optional[str]
    symbol: str
    status: str
    is_public: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class StrategyDetailResponse(StrategyResponse):
    code: str
    parameters: dict


# ============ BACKTEST SCHEMAS ============

class BacktestCreate(BaseModel):
    strategy_id: int
    start_date: datetime
    end_date: datetime
    starting_capital: float = 10000


class BacktestResponse(BaseModel):
    id: int
    user_id: int
    strategy_id: int
    start_date: datetime
    end_date: datetime
    total_return: Optional[float]
    sharpe_ratio: Optional[float]
    max_drawdown: Optional[float]
    win_rate: Optional[float]
    profit_factor: Optional[float]
    trade_count: Optional[int]
    starting_capital: float
    ending_capital: Optional[float]
    status: str
    created_at: datetime
    completed_at: Optional[datetime]

    class Config:
        from_attributes = True


class BacktestDetailResponse(BacktestResponse):
    equity_curve: Optional[dict]
    trades_data: Optional[dict]
    error_message: Optional[str]


# ============ TRADE SCHEMAS ============

class TradeCreate(BaseModel):
    symbol: str
    side: str  # buy, sell
    quantity: float
    entry_price: float
    trade_type: str = "paper"  # paper, live, backtest


class TradeResponse(BaseModel):
    id: int
    user_id: int
    symbol: str
    side: str
    quantity: float
    entry_price: float
    exit_price: Optional[float]
    entry_time: datetime
    exit_time: Optional[datetime]
    status: str
    profit_loss: Optional[float]
    profit_loss_pct: Optional[float]
    trade_type: str
    created_at: datetime

    class Config:
        from_attributes = True


# ============ ALERT SCHEMAS ============

class AlertCreate(BaseModel):
    symbol: str = Field(..., min_length=1, max_length=10)
    alert_type: str  # price_above, price_below
    target_price: float = Field(..., gt=0)


class AlertResponse(BaseModel):
    id: int
    user_id: int
    symbol: str
    alert_type: str
    target_price: float
    is_active: bool
    triggered: bool
    triggered_at: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True


# ============ DASHBOARD SCHEMAS ============

class PortfolioStats(BaseModel):
    total_capital: float
    current_value: float
    total_return: float
    total_return_pct: float
    win_rate: float
    total_trades: int
    open_trades: int
    strategy_count: int


class DashboardResponse(BaseModel):
    stats: PortfolioStats
    recent_trades: List[TradeResponse]
    active_strategies: List[StrategyResponse]
    recent_backtests: List[BacktestResponse]
