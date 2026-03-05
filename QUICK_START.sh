#!/bin/bash

# VERTEX AI - Automated Setup Script
# This script will set up and run the entire project automatically
# Usage: bash QUICK_START.sh

echo "🚀 VERTEX AI - Automated Setup Starting..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${BLUE}📋 Checking prerequisites...${NC}"

if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 not found. Please install Python 3.9+${NC}"
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js 16+${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found. Please install Node.js${NC}"
    exit 1
fi

PYTHON_VERSION=$(python3 --version | awk '{print $2}')
NODE_VERSION=$(node --version | sed 's/v//')

echo -e "${GREEN}✓ Python $PYTHON_VERSION${NC}"
echo -e "${GREEN}✓ Node $NODE_VERSION${NC}"
echo ""

# Setup Backend
echo -e "${BLUE}🔧 Setting up Backend...${NC}"

cd "$(dirname "$0")/backend"

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing dependencies..."
pip install -q -r requirements.txt

echo -e "${GREEN}✓ Backend setup complete${NC}"
echo ""

# Setup Frontend
echo -e "${BLUE}🔧 Setting up Frontend...${NC}"

cd "../frontend"

if [ ! -d "node_modules" ]; then
    echo "Installing npm dependencies..."
    npm install -q
fi

echo -e "${GREEN}✓ Frontend setup complete${NC}"
echo ""

# Done
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo -e "${YELLOW}📝 Next steps:${NC}"
echo ""
echo "1. Open TWO terminal windows"
echo ""
echo "   Terminal 1 (Backend):"
echo "   $ cd /Users/atharvranjan/vertexaifinance/backend"
echo "   $ source venv/bin/activate"
echo "   $ python main.py"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   $ cd /Users/atharvranjan/vertexaifinance/frontend"
echo "   $ npm run dev"
echo ""
echo "2. Open browser to: http://localhost:5173/"
echo ""
echo -e "${GREEN}🎉 That's it! Your VERTEX AI is ready to go!${NC}"
