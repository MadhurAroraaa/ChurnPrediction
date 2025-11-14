# 🚀 Quick Start Guide

## The Error You're Seeing

`ERR_CONNECTION_REFUSED` means your **backend server is not running**.

## ✅ Fix: Start the Backend

### Step 1: Open a Terminal

### Step 2: Navigate to Backend and Start Server

```bash
cd /Users/madhurarora/Desktop/ChurnPrediction_Project/backend
python3.10 -m uvicorn main:app --reload
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
✅ Model artifacts loaded successfully
INFO:     Application startup complete.
```

### Step 3: Verify Backend is Running

Open in browser: **http://localhost:8000/health**

You should see:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "scaler_loaded": true
}
```

### Step 4: Keep Backend Running

**Keep this terminal window open!** The backend must stay running.

### Step 5: Start Frontend (New Terminal)

Open a **NEW terminal window** and run:

```bash
cd /Users/madhurarora/Desktop/ChurnPrediction_Project/frontend
npm run dev
```

## 🎯 You Need TWO Terminal Windows

1. **Terminal 1:** Backend server (uvicorn)
2. **Terminal 2:** Frontend dev server (npm run dev)

Both must run simultaneously!

## 📋 Quick Commands

**Start Backend:**
```bash
cd backend
python3.10 -m uvicorn main:app --reload
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

**Test Backend:**
```bash
curl http://localhost:8000/health
```

## ✅ Success Indicators

- Backend: `Uvicorn running on http://127.0.0.1:8000`
- Frontend: `Local: http://localhost:5173`
- No more `ERR_CONNECTION_REFUSED` errors!

