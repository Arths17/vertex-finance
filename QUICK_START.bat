@echo off
REM VERTEX AI - Automated Setup Script for Windows
REM This script will set up and run the entire project automatically

echo.
echo ========================================
echo   VERTEX AI - Automated Setup
echo ========================================
echo.

REM Check Python
python --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Python not found. Please install Python 3.9+
    pause
    exit /b 1
)

REM Check Node
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js not found. Please install Node.js 16+
    pause
    exit /b 1
)

echo [OK] Python found
echo [OK] Node.js found
echo.

REM Setup Backend
echo Setting up Backend...
cd backend

if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

echo Activating virtual environment...
call venv\Scripts\activate.bat

echo Installing dependencies...
pip install -q -r requirements.txt

echo.
echo Backend setup complete!
echo.

REM Setup Frontend
cd ..\frontend
echo Setting up Frontend...

if not exist "node_modules" (
    echo Installing npm dependencies...
    call npm install -q
)

echo Frontend setup complete!
echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo.
echo 1. Open Command Prompt or PowerShell
echo.
echo [Terminal 1 - Backend]
echo    cd backend
echo    venv\Scripts\activate.bat
echo    python main.py
echo.
echo [Terminal 2 - Frontend]
echo    cd frontend
echo    npm run dev
echo.
echo 2. Open browser to: http://localhost:5173/
echo.
echo That's it! Your VERTEX AI is ready to go!
echo.
pause
