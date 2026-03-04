"""
Gemini AI Service
Handles AI-powered conversational market analysis using Google's Gemini
"""

from google import genai
from google.genai import types
import os
from typing import Dict, List
import json

# Get API key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")

# Configure Gemini client
if GEMINI_API_KEY:
    client = genai.Client(api_key=GEMINI_API_KEY)
    print("Gemini AI configured successfully")
else:
    print("WARNING: No Gemini API key found. Set GEMINI_API_KEY or GOOGLE_API_KEY environment variable.")
    client = None

# System prompt for financial analysis
SYSTEM_PROMPT = """You are Vertex AI, an expert financial analyst and quantitative trading assistant. 
You help traders analyze markets, generate trading strategies, and provide actionable insights.

Your capabilities:
- Market analysis and technical indicators (RSI, MACD, Moving Averages, etc.)
- Strategy generation with Python code
- Risk assessment and portfolio recommendations
- Real-time market insights
- Chart pattern recognition

When analyzing stocks:
1. Provide clear, actionable insights
2. Use technical analysis terminology
3. Generate Python code for strategies when relevant
4. Be concise but thorough
5. Focus on risk-adjusted returns

Always maintain a professional, institutional-grade tone."""

async def chat_with_ai(user_message: str, conversation_history: List[Dict] = None, 
                      symbol: str = None, market_data: Dict = None) -> Dict:
    """
    Chat with Gemini AI for financial analysis
    
    Args:
        user_message: User's question or prompt
        conversation_history: Previous messages for context
        symbol: Stock symbol being discussed (optional)
        market_data: Current market data for context (optional)
    
    Returns:
        Dict with AI response and metadata
    """
    try:
        if not client:
            return {
                "response": "AI service is not configured. Please set GEMINI_API_KEY.",
                "success": False,
                "error": "No API key"
            }
        
        # Build context
        context = SYSTEM_PROMPT
        
        if symbol:
            context += f"\n\nCurrent context: Analyzing {symbol}"
        
        if market_data:
            context += f"\nMarket Data: {json.dumps(market_data, indent=2)}"
        
        # Build conversation
        full_prompt = f"{context}\n\nUser: {user_message}\n\nVertex AI:"
        
        # Generate response using new API
        response = client.models.generate_content(
            model='models/gemini-2.5-flash',
            contents=full_prompt
        )
        
        return {
            "response": response.text,
            "success": True,
            "model": "models/gemini-2.5-flash"
        }
    
    except Exception as e:
        return {
            "response": f"I apologize, but I encountered an error: {str(e)}",
            "success": False,
            "error": str(e)
        }

async def analyze_with_ai(symbol: str, prompt: str, price: float = None, 
                         historical_data: List = None) -> Dict:
    """
    Perform detailed market analysis using Gemini AI
    
    Args:
        symbol: Stock symbol to analyze
        prompt: Analysis request
        price: Current price
        historical_data: Historical price data
    
    Returns:
        Dict with analysis, code snippet, and insights
    """
    try:
        if not client:
            return {
                "analysis": "AI service not configured",
                "code_snippet": "",
                "success": False
            }
        
        # Build comprehensive context
        analysis_prompt = f"""Analyze {symbol} based on this request: "{prompt}"

Current Price: ${price if price else 'N/A'}

Provide:
1. Market Analysis - Key technical indicators and signals
2. Trading Strategy - Specific entry/exit criteria
3. Python Code - Generate a backtestable strategy function
4. Risk Assessment - Potential risks and position sizing

Format your response as:
**Analysis:**
[Your analysis here]

**Strategy:**
[Strategy details]

**Code:**
```python
[Python strategy code]
```

**Risk:**
[Risk assessment]
"""
        
        response = client.models.generate_content(
            model='models/gemini-2.5-flash',
            contents=analysis_prompt
        )
        
        # Parse response to extract code
        response_text = response.text
        code_snippet = ""
        
        # Extract code between ```python and ```
        if "```python" in response_text:
            start = response_text.find("```python") + 9
            end = response_text.find("```", start)
            if end != -1:
                code_snippet = response_text[start:end].strip()
        
        return {
            "analysis": response_text,
            "code_snippet": code_snippet,
            "symbol": symbol,
            "success": True
        }
    
    except Exception as e:
        return {
            "analysis": f"Error performing analysis: {str(e)}",
            "code_snippet": "",
            "symbol": symbol,
            "success": False,
            "error": str(e)
        }

async def generate_strategy_code(strategy_description: str, symbol: str = "AAPL") -> str:
    """
    Generate Python trading strategy code based on description
    
    Args:
        strategy_description: Description of the trading strategy
        symbol: Stock symbol (default AAPL)
    
    Returns:
        Python code as string
    """
    try:
        if not client:
            return "# AI service not configured\ndef strategy(data):\n    return 'HOLD'"
        
        prompt = f"""Generate a complete Python trading strategy function for: {strategy_description}

Requirements:
- Function should be named 'strategy(data)'
- Input: pandas DataFrame with OHLCV data
- Output: 'BUY', 'SELL', or 'HOLD'
- Use pandas_ta for technical indicators
- Include clear comments
- Symbol: {symbol}

Provide only the Python code, no explanations."""

        response = client.models.generate_content(
            model='models/gemini-2.5-flash',
            contents=prompt
        )
        code = response.text
        
        # Clean up code
        if "```python" in code:
            start = code.find("```python") + 9
            end = code.find("```", start)
            if end != -1:
                code = code[start:end].strip()
        
        return code
    
    except Exception as e:
        return f"# Error generating strategy: {str(e)}\ndef strategy(data):\n    return 'HOLD'"

async def get_market_insights(symbols: List[str]) -> Dict:
    """
    Get AI-powered market insights for multiple symbols
    
    Args:
        symbols: List of stock symbols
    
    Returns:
        Dict with insights for each symbol
    """
    try:
        if not client:
            return {
                "insights": "AI service not configured",
                "success": False
            }
        
        prompt = f"""Provide brief market insights for these stocks: {', '.join(symbols)}

For each stock, provide:
- Current sentiment (Bullish/Bearish/Neutral)
- Key technical level
- One-line recommendation

Keep each insight to 2-3 sentences maximum."""

        response = client.models.generate_content(
            model='models/gemini-2.5-flash',
            contents=prompt
        )
        
        return {
            "insights": response.text,
            "symbols": symbols,
            "success": True
        }
    
    except Exception as e:
        return {
            "insights": f"Error getting insights: {str(e)}",
            "symbols": symbols,
            "success": False
        }
