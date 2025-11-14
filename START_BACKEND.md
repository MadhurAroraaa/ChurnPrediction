# 🚨 START THE BACKEND SERVER

## The Problem
Your error `ERR_CONNECTION_REFUSED` means **the backend server is not running**.

## ✅ Solution: Start the Backend

### Open a Terminal and Run:

```bash
cd /Users/madhurarora/Desktop/ChurnPrediction_Project/backend
python3.10 -m uvicorn main:app --reload
```

### What You Should See:

```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
✅ Model artifacts loaded successfully
INFO:     Application startup complete.
```

### ✅ Success Check:

Open this URL in your browser: **http://localhost:8000/health**

You should see:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "scaler_loaded": true
}
```

## ⚠️ IMPORTANT

1. **Keep the terminal window open** - The backend must stay running
2. **Don't close the terminal** - If you close it, the backend stops
3. **Use a separate terminal** for the frontend

## 🎯 Two Terminal Windows Needed

**Terminal 1 (Backend):**
```bash
cd backend
python3.10 -m uvicorn main:app --reload
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

## 🔍 Quick Test

Once backend is running, test it:
```bash
curl http://localhost:8000/health
```

If you see JSON response, backend is working! ✅

## ❌ If You Still Get Errors

1. Make sure you're in the `backend` directory
2. Make sure `model.pkl`, `scaler.pkl`, and `feature_names.json` exist
3. Check for any error messages in the terminal
4. Try: `python3.10 -m pip install fastapi uvicorn` if modules not found

