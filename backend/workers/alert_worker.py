"""
Alert Worker
Background task for monitoring prices and triggering alerts
Runs as a separate process/service using Celery or APScheduler
"""

import asyncio
from typing import List
from services.market_data import get_latest_price
from services.alerts import check_price_alerts, send_alert_notification, get_alerts

class AlertWorker:
    """Background worker for price alert monitoring"""
    
    def __init__(self, check_interval: int = 60):
        """
        Initialize alert worker
        
        Args:
            check_interval: Seconds between price checks (default 60)
        """
        self.check_interval = check_interval
        self.running = False
    
    async def start(self):
        """Start the alert monitoring loop"""
        self.running = True
        print("Alert worker started")
        
        while self.running:
            try:
                await self._check_all_alerts()
                await asyncio.sleep(self.check_interval)
            except Exception as e:
                print(f"Error in alert worker: {str(e)}")
                await asyncio.sleep(5)  # Brief pause before retry
    
    async def stop(self):
        """Stop the alert worker"""
        self.running = False
        print("Alert worker stopped")
    
    async def _check_all_alerts(self):
        """Check all active alerts against current prices"""
        try:
            alerts = await get_alerts()
            
            # Group alerts by symbol for efficient price fetching
            symbols_to_check = set()
            for alert in alerts:
                if not alert.get('triggered'):
                    symbols_to_check.add(alert['symbol'])
            
            if not symbols_to_check:
                return
            
            # Fetch prices for all symbols
            prices = {}
            for symbol in symbols_to_check:
                try:
                    price = await get_latest_price(symbol)
                    prices[symbol] = price
                except Exception as e:
                    print(f"Error fetching price for {symbol}: {str(e)}")
            
            # Check each alert
            for alert in alerts:
                if alert['triggered']:
                    continue
                
                symbol = alert['symbol']
                if symbol not in prices:
                    continue
                
                current_price = prices[symbol]
                
                # Check if alert condition is met
                triggered_ids = await check_price_alerts(symbol, current_price)
                
                # Send notifications for triggered alerts
                for alert_id in triggered_ids:
                    message = f"Price Alert: {symbol} has moved to ${current_price:.2f}"
                    await send_alert_notification(alert_id, message)
        
        except Exception as e:
            print(f"Error checking alerts: {str(e)}")

# Usage example:
# worker = AlertWorker()
# asyncio.run(worker.start())
