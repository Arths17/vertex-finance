"""
Alerts Service
Manages price alerts and notifications for tracked assets
"""

import uuid
from typing import Dict, List
from datetime import datetime

# In-memory storage (replace with database in production)
active_alerts: Dict[str, Dict] = {}

async def create_price_alert(symbol: str, price_level: float, alert_type: str) -> str:
    """
    Create a price alert
    
    Args:
        symbol: Stock symbol to watch
        price_level: Price level to trigger alert
        alert_type: "above" or "below"
    
    Returns:
        Alert ID
    """
    try:
        alert_id = str(uuid.uuid4())
        
        alert = {
            "id": alert_id,
            "symbol": symbol,
            "price_level": price_level,
            "alert_type": alert_type,
            "created_at": datetime.utcnow().isoformat(),
            "triggered": False,
            "triggered_at": None
        }
        
        active_alerts[alert_id] = alert
        
        return alert_id
    except Exception as e:
        raise Exception(f"Failed to create alert: {str(e)}")

async def get_alerts() -> List[Dict]:
    """
    Get all active alerts
    
    Returns:
        List of alert objects
    """
    return list(active_alerts.values())

async def delete_alert(alert_id: str) -> bool:
    """
    Delete an alert
    
    Args:
        alert_id: Alert ID to delete
    
    Returns:
        Success or failure
    """
    try:
        if alert_id in active_alerts:
            del active_alerts[alert_id]
            return True
        else:
            raise Exception("Alert not found")
    except Exception as e:
        raise Exception(f"Failed to delete alert: {str(e)}")

async def check_price_alerts(symbol: str, current_price: float) -> List[str]:
    """
    Check if any alerts have been triggered for a symbol
    
    Args:
        symbol: Stock symbol
        current_price: Current market price
    
    Returns:
        List of triggered alert IDs
    """
    triggered = []
    
    for alert_id, alert in active_alerts.items():
        if alert['symbol'] != symbol or alert['triggered']:
            continue
        
        if alert['alert_type'] == 'above' and current_price >= alert['price_level']:
            alert['triggered'] = True
            alert['triggered_at'] = datetime.utcnow().isoformat()
            triggered.append(alert_id)
        
        elif alert['alert_type'] == 'below' and current_price <= alert['price_level']:
            alert['triggered'] = True
            alert['triggered_at'] = datetime.utcnow().isoformat()
            triggered.append(alert_id)
    
    return triggered

async def send_alert_notification(alert_id: str, message: str) -> bool:
    """
    Send notification for triggered alert
    This is a placeholder - integrate with email, SMS, or push notifications
    
    Args:
        alert_id: Alert ID
        message: Notification message
    
    Returns:
        Success or failure
    """
    try:
        # TODO: Implement actual notification system
        # - Email via SendGrid
        # - SMS via Twilio
        # - Push notifications via Firebase
        print(f"[ALERT] {alert_id}: {message}")
        return True
    except Exception as e:
        raise Exception(f"Failed to send notification: {str(e)}")

async def update_alert(alert_id: str, price_level: float = None, alert_type: str = None) -> Dict:
    """
    Update an existing alert
    
    Args:
        alert_id: Alert ID to update
        price_level: New price level (optional)
        alert_type: New alert type (optional)
    
    Returns:
        Updated alert object
    """
    try:
        if alert_id not in active_alerts:
            raise Exception("Alert not found")
        
        alert = active_alerts[alert_id]
        
        if price_level is not None:
            alert['price_level'] = price_level
        if alert_type is not None:
            alert['alert_type'] = alert_type
        
        return alert
    except Exception as e:
        raise Exception(f"Failed to update alert: {str(e)}")
