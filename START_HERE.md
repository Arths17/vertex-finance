# 👋 START HERE

Welcome to **VERTEX AI** - your institutional-grade trading terminal.

This file gets you running in **5 minutes, guaranteed.**

---

## ⚡ Choose Your Path

### Option A: Automatic Setup (Recommended)

**macOS/Linux:**
```bash
bash QUICK_START.sh
```

**Windows:**
```bash
QUICK_START.bat
```

Then follow the on-screen instructions.

---

### Option B: Manual Setup (Step-by-Step)

Follow the **[Complete Setup Guide](./SETUP_GUIDE.md)** - it's detailed and won't fail if you follow it exactly.

---

### Option C: Quick Manual (5 minutes)

If you know what you're doing:

```bash
# Terminal 1
cd backend
python3 -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python main.py

# Terminal 2 (new window)
cd frontend
npm install
npm run dev
```

Open: **http://localhost:5173/**

---

## 🎯 What You'll See

### Landing Page
- Modern hero section with features
- Pricing tiers
- Call-to-action buttons

### Dashboard
- Portfolio overview
- Watchlist
- Active strategies
- Performance metrics

### AI Terminal  
- Chat with Astral AI
- Real-time charts
- Strategy code editor

### Explore
- Browse community strategies
- Copy proven strategies
- View performance metrics

---

## ❓ Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Python not found | Install Python 3.9+: https://python.org |
| Node not found | Install Node.js 16+: https://nodejs.org |
| Port 8000 in use | Kill: `lsof -ti:8000 \| xargs kill -9` |
| Port 5173 in use | Kill: `lsof -ti:5173 \| xargs kill -9` |
| Module not found | Run: `pip install -r requirements.txt` |
| npm errors | Run: `npm install` again |

**Still stuck?** See [SETUP_GUIDE.md](./SETUP_GUIDE.md#-troubleshooting) for detailed troubleshooting.

---

## ✅ Success = You See This

1. **Backend running**: Terminal shows `Uvicorn running on http://127.0.0.1:8000`
2. **Frontend running**: Terminal shows `Local: http://localhost:5173/`
3. **Browser shows**: VERTEX landing page with blue/cyan design
4. **Can click**: "Launch Terminal" button takes you to /terminal

---

## 🗂️ Key Files

- **SETUP_GUIDE.md** - Complete step-by-step guide (read if anything fails)
- **QUICK_START.sh** - Automated setup for macOS/Linux
- **QUICK_START.bat** - Automated setup for Windows
- **frontend/** - React app
- **backend/** - FastAPI server

---

## 🌐 Access Points Once Running

| What | URL |
|------|-----|
| Landing Page | http://localhost:5173/ |
| Dashboard | http://localhost:5173/dashboard |
| AI Terminal | http://localhost:5173/terminal |
| Strategy Explore | http://localhost:5173/explore |
| API Documentation | http://localhost:8000/docs |

---

## 🚀 You're Ready!

Pick an option above and get started. You'll be up and running in minutes.

**Questions?** Check [SETUP_GUIDE.md](./SETUP_GUIDE.md)

**Let's go!** 🎉
