#!/bin/bash

# Vertex Backend Setup & Start Script

echo "🚀 Starting Vertex Backend Setup..."

# Go to backend directory
cd backend

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from .env.example..."
    cp .env.example .env
    echo "✅ .env created - Update with your API keys if needed"
fi

# Install dependencies
echo "📦 Installing Python dependencies..."
python3 -m pip install -q fastapi uvicorn sqlalchemy bcrypt pyjwt pydantic aiohttp python-dotenv

# Initialize database
echo "🗄️  Initializing database..."
python3 -c "
import sys
sys.path.insert(0, '.')
from database import init_db
init_db()
print('✅ Database tables created!')
"

# Start the server
echo "🚀 Starting FastAPI server on http://localhost:8000..."
echo ""
python3 main.py
