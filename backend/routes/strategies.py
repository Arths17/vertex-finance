"""
Strategy management endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from backend.database import get_db
from backend.models.database_models import Strategy, User
from backend.schemas import StrategyCreate, StrategyUpdate, StrategyResponse, StrategyDetailResponse
from backend.routes.auth import get_current_user, TokenData

router = APIRouter(prefix="/api/strategies", tags=["strategies"])


@router.post("", response_model=StrategyDetailResponse)
async def create_strategy(
    strategy_data: StrategyCreate,
    current_user: TokenData = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a new strategy"""
    new_strategy = Strategy(
        user_id=current_user.user_id,
        name=strategy_data.name,
        description=strategy_data.description,
        code=strategy_data.code,
        symbol=strategy_data.symbol,
        parameters=strategy_data.parameters,
        is_public=strategy_data.is_public
    )
    
    db.add(new_strategy)
    db.commit()
    db.refresh(new_strategy)
    
    return StrategyDetailResponse.from_orm(new_strategy)


@router.get("", response_model=list[StrategyResponse])
async def list_strategies(
    current_user: TokenData = Depends(get_current_user),
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """List user's strategies with pagination"""
    strategies = db.query(Strategy).filter(
        Strategy.user_id == current_user.user_id
    ).offset(skip).limit(limit).all()
    
    return [StrategyResponse.from_orm(s) for s in strategies]


@router.get("/public", response_model=list[StrategyResponse])
async def list_public_strategies(
    skip: int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db)
):
    """List all public strategies"""
    strategies = db.query(Strategy).filter(
        Strategy.is_public == True
    ).offset(skip).limit(limit).all()
    
    return [StrategyResponse.from_orm(s) for s in strategies]


@router.get("/{strategy_id}", response_model=StrategyDetailResponse)
async def get_strategy(
    strategy_id: int,
    current_user: TokenData = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get strategy details"""
    strategy = db.query(Strategy).filter(
        Strategy.id == strategy_id,
        Strategy.user_id == current_user.user_id
    ).first()
    
    if not strategy:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Strategy not found"
        )
    
    return StrategyDetailResponse.from_orm(strategy)


@router.put("/{strategy_id}", response_model=StrategyDetailResponse)
async def update_strategy(
    strategy_id: int,
    strategy_data: StrategyUpdate,
    current_user: TokenData = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update strategy"""
    strategy = db.query(Strategy).filter(
        Strategy.id == strategy_id,
        Strategy.user_id == current_user.user_id
    ).first()
    
    if not strategy:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Strategy not found"
        )
    
    # Update fields that are provided
    update_data = strategy_data.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(strategy, field, value)
    
    db.commit()
    db.refresh(strategy)
    
    return StrategyDetailResponse.from_orm(strategy)


@router.delete("/{strategy_id}")
async def delete_strategy(
    strategy_id: int,
    current_user: TokenData = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Delete strategy"""
    strategy = db.query(Strategy).filter(
        Strategy.id == strategy_id,
        Strategy.user_id == current_user.user_id
    ).first()
    
    if not strategy:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Strategy not found"
        )
    
    db.delete(strategy)
    db.commit()
    
    return {"message": "Strategy deleted successfully"}


@router.get("/{strategy_id}/clone", response_model=StrategyDetailResponse)
async def clone_strategy(
    strategy_id: int,
    current_user: TokenData = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Clone an existing strategy"""
    original_strategy = db.query(Strategy).filter(
        Strategy.id == strategy_id
    ).first()
    
    if not original_strategy:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Strategy not found"
        )
    
    # Create a clone
    cloned_strategy = Strategy(
        user_id=current_user.user_id,
        name=f"{original_strategy.name} (Copy)",
        description=original_strategy.description,
        code=original_strategy.code,
        symbol=original_strategy.symbol,
        parameters=original_strategy.parameters,
        is_public=False  # Clone is private by default
    )
    
    db.add(cloned_strategy)
    db.commit()
    db.refresh(cloned_strategy)
    
    return StrategyDetailResponse.from_orm(cloned_strategy)
