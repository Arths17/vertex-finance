# ⚡ VERTEX AI - Quick Reference Cheat Sheet

## 🏃 Start in 30 Seconds

```bash
# Terminal 1 - Backend
cd backend && source venv/bin/activate && python main.py

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

**Then open:** http://localhost:5173/

---

## 📋 First Time Setup

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate    # macOS/Linux
venv\Scripts\activate.bat   # Windows
pip install -r requirements.txt
python main.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

---

## 🐛 Common Issues & Fixes

### Port Already in Use
```bash
# Kill port 8000 (backend)
lsof -ti:8000 | xargs kill -9

# Kill port 5173 (frontend)
lsof -ti:5173 | xargs kill -9
```

### Missing Dependencies
```bash
# Backend
source venv/bin/activate
pip install -r requirements.txt

# Frontend
npm install
```

### Virtual Env Issues
```bash
# Reset backend
cd backend
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Frontend Issues
```bash
# Reset frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

## 🌐 URLs When Running

| Name | URL |
|------|-----|
| **Home** | http://localhost:5173/ |
| **Dashboard** | http://localhost:5173/dashboard |
| **Terminal** | http://localhost:5173/terminal |
| **Explore** | http://localhost:5173/explore |
| **API Docs** | http://localhost:8000/docs |
| **Health Check** | http://localhost:8000/api/health |

---

## 📂 Project Folders

```
/backend        → FastAPI server (port 8000)
/frontend       → React app (port 5173)
```

---

## ✅ Testing It Works

1. Backend terminal should show:
   ```
   INFO:     Uvicorn running on http://127.0.0.1:8000
   ```

2. Frontend terminal should show:
   ```
   ➜  Local: http://localhost:5173/
   ```

3. Browser at http://localhost:5173/ shows landing page ✓

4. Can navigate to all pages (Dashboard, Terminal, Explore) ✓

---

## 🎯 Common Commands

```bash
# Stop backend
# Press CTRL+C in backend terminal

# Stop frontend
# Press CTRL+C in frontend terminal

# Reinstall everything
# See "Reset" section above

# Check Python version
python --version

# Check Node version
node --version

# Activate venv (macOS/Linux)
source venv/bin/activate

# Deactivate venv
deactivate
```

---

## 📞 Need Help?

1. **Quick Start:** Read [START_HERE.md](START_HERE.md)
2. **Detailed Guide:** Read [SETUP_GUIDE.md](SETUP_GUIDE.md)
3. **Stuck?** Check the Troubleshooting section in SETUP_GUIDE.md

---

## ✨ Tips

- Always keep backend running while using frontend
- Open backend and frontend in separate terminals
- Use virtual environment to avoid dependency conflicts
- Clear browser cache if seeing old pages
- Check console (F12) for errors

---

**Happy trading! 🚀**
