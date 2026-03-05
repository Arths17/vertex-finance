#!/bin/bash

# VERTEX AI - Installation Verification Script
# This script checks if everything is installed and configured correctly

echo ""
echo "=========================================="
echo "   VERTEX AI - Verification Script"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

passed=0
failed=0

# Function to check command
check_command() {
    local name=$1
    local command=$2
    
    if command -v $command &> /dev/null; then
        version=$($command --version 2>&1 | head -n1)
        echo -e "${GREEN}✓${NC} $name: $version"
        ((passed++))
        return 0
    else
        echo -e "${RED}✗${NC} $name: Not installed"
        ((failed++))
        return 1
    fi
}

# Function to check directory/file
check_file() {
    local name=$1
    local path=$2
    
    if [ -e "$path" ]; then
        echo -e "${GREEN}✓${NC} $name exists"
        ((passed++))
        return 0
    else
        echo -e "${RED}✗${NC} $name missing: $path"
        ((failed++))
        return 1
    fi
}

# Function to check port
check_port() {
    local name=$1
    local port=$2
    
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${GREEN}✓${NC} Port $port ($name) is available"
        ((passed++))
        return 0
    else
        echo -e "${YELLOW}⚠${NC}  Port $port ($name) is not in use (OK if not running yet)"
        return 1
    fi
}

echo -e "${BLUE}1. Checking System Prerequisites${NC}"
echo ""

check_command "Python" "python3"
check_command "Node.js" "node"
check_command "npm" "npm"
check_command "Git" "git"

echo ""
echo -e "${BLUE}2. Checking Project Files${NC}"
echo ""

check_file "Backend folder" "./backend"
check_file "Frontend folder" "./frontend"
check_file "SETUP_GUIDE" "./SETUP_GUIDE.md"
check_file "START_HERE" "./START_HERE.md"
check_file "CHEATSHEET" "./CHEATSHEET.md"
check_file "requirements.txt" "./backend/requirements.txt"
check_file "package.json" "./frontend/package.json"

echo ""
echo -e "${BLUE}3. Checking Backend Setup${NC}"
echo ""

if [ -d "backend/venv" ]; then
    echo -e "${GREEN}✓${NC} Virtual environment exists"
    ((passed++))
else
    echo -e "${YELLOW}⚠${NC}  Virtual environment not found (needs setup)"
fi

if [ -f "backend/requirements.txt" ]; then
    echo -e "${GREEN}✓${NC} requirements.txt found"
    ((passed++))
else
    echo -e "${RED}✗${NC} requirements.txt missing"
    ((failed++))
fi

echo ""
echo -e "${BLUE}4. Checking Frontend Setup${NC}"
echo ""

if [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}✓${NC} node_modules exists (npm dependencies installed)"
    ((passed++))
else
    echo -e "${YELLOW}⚠${NC}  node_modules not found (run: npm install)"
fi

if [ -f "frontend/package.json" ]; then
    echo -e "${GREEN}✓${NC} package.json found"
    ((passed++))
else
    echo -e "${RED}✗${NC} package.json missing"
    ((failed++))
fi

echo ""
echo -e "${BLUE}5. Checking Ports${NC}"
echo ""

check_port "Backend" 8000
check_port "Frontend" 5173

echo ""
echo "=========================================="
echo "   Verification Results"
echo "=========================================="
echo ""
echo -e "${GREEN}Passed: $passed${NC}"
echo -e "${RED}Failed: $failed${NC}"
echo ""

if [ $failed -eq 0 ]; then
    echo -e "${GREEN}✅ All checks passed! Ready to run.${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Terminal 1: cd backend && source venv/bin/activate && python main.py"
    echo "  2. Terminal 2: cd frontend && npm run dev"
    echo "  3. Open: http://localhost:5173/"
    echo ""
    exit 0
else
    echo -e "${YELLOW}⚠️  Some items need attention. Check above for details.${NC}"
    echo ""
    echo "To fix:"
    echo "  1. Read START_HERE.md for quick setup"
    echo "  2. Read SETUP_GUIDE.md for detailed instructions"
    echo ""
    exit 1
fi
