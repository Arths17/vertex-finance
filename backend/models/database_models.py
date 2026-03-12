"""
SQLAlchemy database models for Vertex Trading Platform
"""

from sqlalchemy import Column, Integer, String, Float, DateTime, Boolean, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.database import Base


class User(Base):
    """User model for authentication and profile"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(100), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    strategies = relationship("Strategy", back_populates="author")
    backtests = relationship("Backtest", back_populates="user")
    trades = relationship("Trade", back_populates="user")
    alerts = relationship("Alert", back_populates="user")


class Strategy(Base):
    """Model for storing trading strategies"""
    __tablename__ = "strategies"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String(255), nullable=False)
    description = Column(Text)
    code = Column(Text, nullable=False)  # Python strategy code
    symbol = Column(String(10), nullable=False)
    status = Column(String(50), default="draft")  # draft, active, archived
    parameters = Column(JSON, default={})  # Strategy parameters as JSON
    is_public = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    author = relationship("User", back_populates="strategies")
    backtests = relationship("Backtest", back_populates="strategy")


class Backtest(Base):
    """Model for backtest results"""
    __tablename__ = "backtests"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    strategy_id = Column(Integer, ForeignKey("strategies.id"), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    
    # Performance metrics
    total_return = Column(Float)  # Total percentage return
    sharpe_ratio = Column(Float)  # Risk-adjusted return
    max_drawdown = Column(Float)  # Maximum underwater percentage
    win_rate = Column(Float)  # Percentage of winning trades
    profit_factor = Column(Float)  # Gross profit / Gross loss
    trade_count = Column(Integer)  # Total number of trades
    
    # Additional metrics
    starting_capital = Column(Float)
    ending_capital = Column(Float)
    equity_curve = Column(JSON)  # Series of equity values over time
    trades_data = Column(JSON)  # Individual trade records
    
    status = Column(String(50), default="completed")  # completed, running, error
    error_message = Column(Text)  # If status is error
    
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime)

    # Relationships
    user = relationship("User", back_populates="backtests")
    strategy = relationship("Strategy", back_populates="backtests")


class Trade(Base):
    """Model for trade history"""
    __tablename__ = "trades"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    symbol = Column(String(10), nullable=False)
    side = Column(String(10), nullable=False)  # buy or sell
    quantity = Column(Float, nullable=False)
    entry_price = Column(Float, nullable=False)
    exit_price = Column(Float)
    entry_time = Column(DateTime, default=datetime.utcnow)
    exit_time = Column(DateTime)
    status = Column(String(50), default="open")  # open, closed, cancelled
    profit_loss = Column(Float)  # P&L amount
    profit_loss_pct = Column(Float)  # P&L percentage
    trade_type = Column(String(50))  # paper, live, backtest
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="trades")


class Alert(Base):
    """Model for price alerts"""
    __tablename__ = "alerts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    symbol = Column(String(10), nullable=False)
    alert_type = Column(String(50), nullable=False)  # price_above, price_below
    target_price = Column(Float, nullable=False)
    is_active = Column(Boolean, default=True)
    triggered = Column(Boolean, default=False)
    triggered_at = Column(DateTime)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    user = relationship("User", back_populates="alerts")
