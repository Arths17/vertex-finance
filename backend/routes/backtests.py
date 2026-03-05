"""
Backtesting endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query, BackgroundTasks
from sqlalchemy.orm import Session
from database import get_db
from models.database_models import Backtest, Strategy, User
from schemas import BacktestCreate, BacktestResponse, BacktestDetailResponse
from auth import get_current_user, TokenData
from datetime import datetime
import json

router = APIRouter(prefix="/api/backtests", tags=["backtests"])


@router.post("", response_model=BacktestResponse)
async def create_backtest(
    backtest_data: BacktestCreate,
    background_tasks: BackgroundTasks,
    current_user: TokenData = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create and start a backtest"""
    # Verify strategy exists and belongs to user
    strategy = db.query(Strategy).filter(
        Strategy.id == backtest_data.strategy_id,
        Strategy.user_id == current_user.user_id
    ).first()
    
    if not strategy:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Strategy not found"
        )
    
    # Create backtest record
    new_backtest = Backtest(
        user_id=current_user.user_id,
        strategy_id=backtest_data.strategy_id,
        start_date=backtest_data.start_date,
        end_date=backtest_data.end_date,
        starting_capital=backtest_data.starting_capital,
        status="running"
    )
    
    db.add(new_backtest)
    db.commit()
    db.refresh(new_backtest)
    
    #Add task to run backtest in background
    background_tasks.add_task(
        run_backtest_task,
        backtest_id=new_backtest.id,
        strategy_code=strategy.code,
        symbol=strategy.symbol,
        start_date=backtest_data.start_date,
        end_date=backtest_data.end_date,
        starting_capital=backtest_data.starting_capital
    )
    
    return BacktestResponse.from_orm(new_backtest)


@router.get("", response_model=list[BacktestResponse])
async def list_backtests(
    current_user: TokenData = Depends(get_current_user),
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """List user's backtests"""
    backtests = db.query(Backtest).filter(
        Backtest.user_id == current_user.user_id
    ).order_by(Backtest.created_at.desc()).offset(skip).limit(limit).all()
    
    return [BacktestResponse.from_orm(b) for b in backtests]


@router.get("/{backtest_id}", response_model=BacktestDetailResponse)
async def get_backtest(
    backtest_id: int,
    current_user: TokenData = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get backtest details"""
    backtest = db.query(Backtest).filter(
        Backtest.id == backtest_id,
        Backtest.user_id == current_user.user_id
    ).first()
    
    if not backtest:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Backtest not found"
        )
    
    return BacktestDetailResponse.from_orm(backtest)


@router.delete("/{backtest_id}")
async def delete_backtest(
    backtest_id: int,
    current_user: TokenData = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete backtest"""
    backtest = db.query(Backtest).filter(
        Backtest.id == backtest_id,
        Backtest.user_id == current_user.user_id
    ).first()
    
    if not backtest:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Backtest not found"
        )
    
    db.delete(backtest)
    db.commit()
    
    return {"message": "Backtest deleted successfully"}


async def run_backtest_task(
    backtest_id: int,
    strategy_code: str,
    symbol: str,
    start_date,
    end_date,
    starting_capital: float
):
    """Run backtest in background"""
    try:
        from database import SessionLocal
        db = SessionLocal()
        
        # TODO: Implement actual backtesting logic
        # For now, return mock results
        
        # Simulate backtest completion
        backtest = db.query(Backtest).filter(Backtest.id == backtest_id).first()
        if backtest:
            backtest.status = "completed"
            backtest.completed_at = datetime.utcnow()
            backtest.starting_capital = starting_capital
            backtest.ending_capital = starting_capital * 1.15  # Mock 15% return
            backtest.total_return = 0.15
            backtest.sharpe_ratio = 1.2
            backtest.max_drawdown = -0.08
            backtest.win_rate = 0.65
            backtest.profit_factor = 1.8
            backtest.trade_count = 25
            
            # Mock equity curve
            equity_values = []
            current_value = starting_capital
            for i in range(100):
                change = (i * 0.0015) - 0.0005
                current_value *= (1 + change)
                equity_values.append(current_value)
            
            backtest.equity_curve = {"values": equity_values}
            backtest.trades_data = {
                "trades": [
                    {"entry": 100, "exit": 105, "profit": 5},
                    {"entry": 105, "exit": 103, "profit": -2}
                ]
            }
            
            db.commit()
        db.close()
    except Exception as e:
        from database import SessionLocal
        db = SessionLocal()
        backtest = db.query(Backtest).filter(Backtest.id == backtest_id).first()
        if backtest:
            backtest.status = "error"
            backtest.error_message = str(e)
            db.commit()
        db.close()
