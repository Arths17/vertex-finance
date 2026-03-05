"""
Configuration module for Vertex backend
Handles environment variables and API keys
"""

import os
from dotenv import load_dotenv

load_dotenv()

# Environment
ENVIRONMENT = os.getenv("ENVIRONMENT", "development")

# Alpaca Markets API
ALPACA_API_KEY = os.getenv("ALPACA_API_KEY_ID", "CKMWITMUEMUTQNXDDMY5D532S5")
ALPACA_SECRET_KEY = os.getenv("ALPACA_API_SECRET_KEY", "5sKLYEh124rQbidhrBhdE8mzBGnTfCfFtZnKR1MjK4jk")
ALPACA_BASE_URL = os.getenv("APCA_API_BASE_URL", "https://broker-api.sandbox.alpaca.markets")

# Gemini AI API (for AI-powered analysis)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyCWF12m_HYjfp8g8OrkHVnNia4rs2Xpzmo")

# Database
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///vertex.db")

# Redis (for caching & websockets)
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")

# Authentication & Security
SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key-change-in-production-12345")
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7"))

# Logging
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")