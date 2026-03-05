# 🔧 VERTEX AI - Complete Troubleshooting Guide

Having issues? This guide covers 99% of problems. Follow the exact steps.

---

## 🚨 General Checklist First

Before reading troubleshooting, verify:

- [ ] You have Python 3.9+ (`python --version`)
- [ ] You have Node 16+ (`node --version`)
- [ ] Backend is in `/backend` directory
- [ ] Frontend is in `/frontend` directory
- [ ] You're using **separate terminals** for backend and frontend
- [ ] You didn't skip any steps in [SETUP_GUIDE.md](./SETUP_GUIDE.md)

---

## Backend Issues

### ❌ "ModuleNotFoundError: No module named 'fastapi'"

**Cause:** Dependencies not installed

**Fix:**
```bash
cd backend
source venv/bin/activate  # macOS/Linux or venv\Scripts\activate on Windows
pip install -r requirements.txt
python main.py
```

---

### ❌ "python: command not found"

**Cause:** Python not installed

**Fix:**
1. Install Python from https://python.org
2. Verify: `python --version` (should be 3.9+)
3. Try `python3` instead of `python`

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 main.py
```

---

### ❌ "Address already in use" or "Port 8000 in use"

**Cause:** Another process using port 8000

**Fix for macOS/Linux:**
```bash
lsof -ti:8000 | xargs kill -9
python main.py
```

**Fix for Windows (PowerShell):**
```bash
netstat -ano | findstr :8000
taskkill /PID <PID> /F
python main.py
```

**Alternative:** Use different port
```bash
python main.py --port 8001
```

---

### ❌ "venv: command not found"

**Cause:** Python not installed properly or wrong Python version

**Fix:**
```bash
# Check Python is installed
python3 --version

# Install venv module
python3 -m venv venv

# Activate
source venv/bin/activate
```

---

### ❌ Backend starts but frontend can't connect

**Error:** Network errors in browser console, CORS errors

**Fix:**
1. Make sure backend is actually running:
   ```bash
   # In backend terminal, you should see:
   # INFO:     Uvicorn running on http://127.0.0.1:8000
   ```

2. Check backend is accessible:
   ```bash
   curl http://localhost:8000/api/health
   ```
   Should show JSON response

3. If CORS error, restart backend

4. Check frontend is pointing to correct backend:
   - Open browser DevTools (F12)
   - Check Network tab
   - Look for requests to `http://localhost:8000`

---

### ❌ ".env file not found" or "API key error"

**Cause:** Missing environment configuration

**Fix:**
```bash
cd backend
cp config.py .env
```

Or create `.env` manually with:
```
GEMINI_API_KEY=test
ALPACA_API_KEY=test
ALPACA_SECRET_KEY=test
ALPACA_BASE_URL=https://paper-api.alpaca.markets
DATABASE_URL=sqlite:///vertex.db
```

You can use test values for now - features will work with mock data.

---

### ❌ "Uvicorn not installed" or similar

**Cause:** requirements.txt not installed

**Fix:**
```bash
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

---

## Frontend Issues

### ❌ "npm: command not found"

**Cause:** Node.js not installed

**Fix:**
1. Install Node.js from https://nodejs.org
2. Verify: `node --version` (should be 16+)
3. Verify: `npm --version` (should be 8+)

```bash
cd frontend
npm install
npm run dev
```

---

### ❌ "ENOENT: no such file or directory, open 'package.json'"

**Cause:** Not in the correct directory

**Fix:**
```bash
# Make sure you're here:
cd /Users/atharvranjan/vertexaifinance/frontend
pwd  # Should show the frontend directory

# Then try again:
npm install
npm run dev
```

---

### ❌ "Port 5173 already in use"

**Cause:** Another process using port 5173

**Fix for macOS/Linux:**
```bash
lsof -ti:5173 | xargs kill -9
npm run dev
```

**Fix for Windows (PowerShell):**
```bash
netstat -ano | findstr :5173
taskkill /PID <PID> /F
npm run dev
```

---

### ❌ Page is blank or "Cannot GET /"

**Cause:** Frontend not at correct URL or not started

**Fix:**
1. Make sure you're at `http://localhost:5173/` (not 8000!)
2. Check frontend terminal shows:
   ```
   ➜  Local: http://localhost:5173/
   ```
3. If not, restart:
   ```bash
   npm run dev
   ```

---

### ❌ "npm ERR! code ERESOLVE"

**Cause:** npm dependency conflicts

**Fix:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

### ❌ "Cannot find module 'react'" or other module errors

**Cause:** Dependencies not installed

**Fix:**
```bash
cd frontend
npm install
npm run dev
```

---

### ❌ Page shows old content or won't update

**Cause:** Browser cache

**Fix:**
1. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
2. Open DevTools (F12)
3. Clear Application > Storage > Clear site data
4. Refresh page

---

## Connection Issues

### ❌ "Cannot connect to localhost:8000"

**Cause:** Backend not running

**Fix:**
1. Go to backend terminal
2. Check it shows: `Uvicorn running on http://127.0.0.1:8000`
3. If not, start it:
   ```bash
   cd backend
   source venv/bin/activate
   python main.py
   ```

---

### ❌ "Failed to fetch" on frontend

**Cause:** Backend not running or port wrong

**Fix:**
1. Start backend (see above)
2. Check frontend is pointing to correct backend URL
3. Open browser console (F12 > Console)
4. Try: `fetch('http://localhost:8000/api/health')`

---

## Installation Issues

### ❌ "venv is corrupt/broken"

**Cause:** Virtual environment corrupted

**Fix:**
```bash
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

---

### ❌ "pip install fails" or "permission denied"

**Cause:** Permissions or corrupted cache

**Fix:**
```bash
source venv/bin/activate
pip install --upgrade pip setuptools wheel
pip install -r requirements.txt
```

---

### ❌ "node_modules is corrupted"

**Cause:** npm installation issues

**Fix:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
npm run dev
```

---

## Configuration Issues

### ❌ "ModuleNotFoundError: No module named 'dotenv'"

**Cause:** Environment variables not set up

**Fix:**
```bash
source venv/bin/activate
pip install python-dotenv
python main.py
```

---

### ❌ "CORS error"

**Cause:** Backend CORS configuration

**Fix:**
Ensure backend has CORS enabled (should be by default). If error persists, restart backend:

```bash
# Kill backend (Ctrl+C in terminal)
# Restart it:
python main.py
```

---

## Performance Issues

### ⚠️ "Page loads slowly"

**Cause:** Network issues or unoptimized code

**Fix:**
1. Check backend is responding:
   ```bash
   curl http://localhost:8000/api/health
   ```

2. Clear browser cache:
   - F12 > Application > Clear site data

3. Restart both servers:
   ```bash
   # Terminal 1: Ctrl+C then python main.py
   # Terminal 2: Ctrl+C then npm run dev
   ```

---

## Verification Script

Run the verification script to check everything:

**macOS/Linux:**
```bash
bash VERIFY.sh
```

**Windows:**
Check directories manually:
- `backend/` exists?
- `frontend/` exists?
- `backend/venv/` exists?
- `frontend/node_modules/` exists?

---

## Complete Reset

If nothing works, do a complete clean install:

### Backend Reset:
```bash
cd backend
rm -rf venv
rm -rf __pycache__
rm -rf .pytest_cache
python3 -m venv venv
source venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
python main.py
```

### Frontend Reset:
```bash
cd frontend
rm -rf node_modules
rm -rf .vite
rm -rf dist
npm cache clean --force
npm install
npm run dev
```

---

## Still Stuck?

1. Check all steps in [SETUP_GUIDE.md](./SETUP_GUIDE.md)
2. Review [CHEATSHEET.md](./CHEATSHEET.md)
3. Run verification: `bash VERIFY.sh`
4. Check browser console (F12) for specific errors
5. Check backend terminal for errors

---

## Getting Help

When asking for help, provide:
1. The exact error message
2. What step you're on
3. Your OS (macOS/Linux/Windows)
4. Output of `python --version`
5. Output of `node --version`
6. Output of `npm --version`

---

## 🎉 Success Indicators

Everything works when:
- ✅ Backend terminal shows: `Uvicorn running on http://127.0.0.1:8000`
- ✅ Frontend terminal shows: `Local: http://localhost:5173/`
- ✅ Browser at `http://localhost:5173/` shows VERTEX landing page
- ✅ Can click buttons and navigate pages
- ✅ No errors in browser console (F12)
- ✅ Can navigate to Dashboard, Terminal, Explore pages

---

**Still have questions? Check [START_HERE.md](./START_HERE.md) or [SETUP_GUIDE.md](./SETUP_GUIDE.md) again.**

**You've got this! 🚀**
