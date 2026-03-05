# 🚀 VERTEX AI - Complete Setup & Run Guide

**This guide will get you up and running in 5-10 minutes. Follow every step exactly as written.**

---

## 📋 Prerequisites

Before starting, make sure you have installed:
- **Python 3.9+** - Check: `python --version`
- **Node.js 16+** - Check: `node --version`
- **npm 8+** - Check: `npm --version`
- **Git** - Check: `git --version`

If any are missing, install them from:
- Python: https://www.python.org/downloads/
- Node.js: https://nodejs.org/

---

## Part 1: Backend Setup (5 minutes)

### Step 1.1: Navigate to Backend Directory
```bash
cd /Users/atharvranjan/vertexaifinance/backend
```

### Step 1.2: Create Virtual Environment
```bash
python3 -m venv venv
```

### Step 1.3: Activate Virtual Environment

**On macOS/Linux:**
```bash
source venv/bin/activate
```

**On Windows (PowerShell):**
```bash
venv\Scripts\Activate.ps1
```

**On Windows (Command Prompt):**
```bash
venv\Scripts\activate.bat
```

You should see `(venv)` appear at the start of your terminal line.

### Step 1.4: Install Python Dependencies
```bash
pip install -r requirements.txt
```

This will take 1-2 minutes. Wait for it to complete.

### Step 1.5: Set Up Environment File
```bash
cp config.py .env
```

Or manually create a `.env` file in `/backend/` with these values:
```
GEMINI_API_KEY=your_key_here
ALPACA_API_KEY=your_alpaca_key
ALPACA_SECRET_KEY=your_alpaca_secret
ALPACA_BASE_URL=https://paper-api.alpaca.markets
DATABASE_URL=sqlite:///vertex.db
```

**If you don't have keys yet, you can use placeholder values for now** - the API will still work with mock data.

### Step 1.6: Start Backend Server
```bash
python main.py
```

**Expected Output:**
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```

✅ Backend is running! Keep this terminal open.

---

## Part 2: Frontend Setup (5 minutes)

### Step 2.1: Open New Terminal Window

**Important:** Keep the backend terminal running. Open a brand new terminal/tab.

### Step 2.2: Navigate to Frontend Directory
```bash
cd /Users/atharvranjan/vertexaifinance/frontend
```

### Step 2.3: Install Node Dependencies
```bash
npm install
```

This will take 2-3 minutes. You'll see a lot of output - that's normal.

### Step 2.4: Start Frontend Dev Server
```bash
npm run dev
```

**Expected Output:**
```
  VITE v5.0.8  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

✅ Frontend is running!

---

## Part 3: Open in Browser

### Step 3.1: Open Your Browser

Go to **one** of these URLs:

**Option A (Recommended):** http://localhost:5173/

**Option B:** http://127.0.0.1:5173/

You should see the VERTEX landing page with:
- Hero section with "The market doesn't wait"
- Features section
- Pricing section
- Beautiful gradient design

### Step 3.2: Navigate to Dashboard

Click "Launch Terminal" or go to: **http://localhost:5173/dashboard**

You should see:
- Portfolio stats cards
- Watchlist with assets
- Strategy cards
- Modern dark theme with blue/cyan gradients

### Step 3.3: Test the Terminal

Go to: **http://localhost:5173/terminal**

You should see:
- AI Chat on the left
- Chart in the middle
- Code editor on the right

Try typing a message in the AI chat (it will make a request to the backend).

---

## 🐛 Troubleshooting

### Issue: Backend won't start

**Error:** `ModuleNotFoundError: No module named 'fastapi'`

**Solution:**
```bash
# Make sure you're in /backend directory
cd /Users/atharvranjan/vertexaifinance/backend
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
python main.py
```

---

### Issue: Can't connect to backend from frontend

**Error:** Network errors in browser console

**Solution:**
1. Make sure backend is running on `http://localhost:8000`
2. Check backend terminal shows `Uvicorn running on http://127.0.0.1:8000`
3. Try accessing `http://localhost:8000/docs` in browser - should show Swagger UI

---

### Issue: Frontend won't start

**Error:** `command not found: npm`

**Solution:**
```bash
# Install Node.js from https://nodejs.org/
node --version  # Should be 16+
npm --version   # Should be 8+

# Then try again:
cd /Users/atharvranjan/vertexaifinance/frontend
npm install
npm run dev
```

---

### Issue: Port already in use

**Error:** `Address already in use` or `EADDRINUSE`

**Solution for Backend (8000):**
```bash
# Kill the process on port 8000
lsof -ti:8000 | xargs kill -9

# Then restart
python main.py
```

**Solution for Frontend (5173):**
```bash
# Kill the process on port 5173
lsof -ti:5173 | xargs kill -9

# Then restart
npm run dev
```

---

### Issue: Page shows blank or "Cannot GET /"

**Solution:**
1. Make sure you're at `http://localhost:5173/` (port 5173, not 8000)
2. Check browser console (F12) for errors
3. Restart frontend: `npm run dev`

---

## ✅ Success Checklist

- [ ] Terminal 1: Backend running on port 8000
- [ ] Terminal 2: Frontend running on port 5173
- [ ] Browser shows VERTEX landing page
- [ ] Can navigate to /dashboard
- [ ] Can navigate to /terminal
- [ ] Can navigate to /explore
- [ ] Dashboard loads with stats and watchlist
- [ ] AI chat accepts input (even if backend request fails)

---

## 🎯 Quick Commands Reference

### To Stop Everything

**Backend terminal:** Press `CTRL+C`

**Frontend terminal:** Press `CTRL+C`

### To Restart Everything

**Terminal 1 (Backend):**
```bash
cd /Users/atharvranjan/vertexaifinance/backend
source venv/bin/activate
python main.py
```

**Terminal 2 (Frontend):**
```bash
cd /Users/atharvranjan/vertexaifinance/frontend
npm run dev
```

### To Clean and Reinstall Everything

**Backend:**
```bash
cd /Users/atharvranjan/vertexaifinance/backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

**Frontend:**
```bash
cd /Users/atharvranjan/vertexaifinance/frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 🌐 Access Points

Once everything is running:

| Page | URL | Description |
|------|-----|-------------|
| Landing Page | http://localhost:5173/ | Marketing site |
| Dashboard | http://localhost:5173/dashboard | Portfolio overview |
| AI Terminal | http://localhost:5173/terminal | Chat & trading |
| Explore | http://localhost:5173/explore | Strategy discovery |
| API Docs | http://localhost:8000/docs | Backend API documentation |
| Health Check | http://localhost:8000/api/health | Backend status |

---

## 📞 Still Having Issues?

Check these in order:

1. **Both terminals open?** ✅ Backend + Frontend
2. **Correct directories?** ✅ `/backend` and `/frontend`
3. **Virtual env activated?** ✅ See `(venv)` in terminal
4. **No port conflicts?** ✅ 8000 and 5173 are free
5. **Python 3.9+?** ✅ `python --version`
6. **Node 16+?** ✅ `node --version`
7. **Dependencies installed?** ✅ `pip install -r requirements.txt` and `npm install`

---

## 🎉 Ready to Go!

Once you've followed all steps above, your site will be 100% working at:

**🌐 http://localhost:5173/**

Enjoy your VERTEX AI trading platform! 🚀

