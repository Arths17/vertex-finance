"""
Strategy Data Models
Pydantic models for strategy-related data validation and serialization
"""

from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

class StrategyStatus(str, Enum):
    DRAFT = "draft"
    SAVED = "saved"
    DEPLOYED = "deployed"
    PAUSED = "paused"
    COMPLETED = "completed"

class StrategyMetrics(BaseModel):
    """Strategy performance metrics"""
    total_return: float = Field(..., description="Total return percentage")
    sharpe_ratio: float = Field(..., description="Sharpe ratio")
    win_rate: float = Field(..., description="Win rate percentage")
    max_drawdown: float = Field(..., description="Maximum drawdown percentage")
    total_trades: int = Field(..., description="Total number of trades")
    average_win: float = Field(default=0, description="Average winning trade")
    average_loss: float = Field(default=0, description="Average losing trade")

class Strategy(BaseModel):
    """Strategy model"""
    id: Optional[str] = None
    name: str = Field(..., min_length=1, max_length=100)
    description: Optional[str] = None
    code: str = Field(..., description="Python strategy code")
    status: StrategyStatus = StrategyStatus.DRAFT
    metrics: Optional[StrategyMetrics] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    deployed_at: Optional[datetime] = None
    
    class Config:
        use_enum_values = True

class StrategyBacktest(BaseModel):
    """Backtest configuration and results"""
    strategy_id: str
    symbol: str
    start_date: str = Field(..., description="YYYY-MM-DD format")
    end_date: str = Field(..., description="YYYY-MM-DD format")
    initial_capital: float = Field(default=10000, description="Initial capital in USD")
    trades: List[dict] = Field(default_factory=list)
    metrics: Optional[StrategyMetrics] = None
    
    class Config:
        use_enum_values = True

class StrategyParameter(BaseModel):
    """Strategy parameter for optimization"""
    name: str
    type: str = Field(..., description="'int', 'float', or 'bool'")
    min_value: Optional[float] = None
    max_value: Optional[float] = None
    default_value: float
