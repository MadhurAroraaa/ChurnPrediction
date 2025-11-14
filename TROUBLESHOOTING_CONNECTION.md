# Troubleshooting: ERR_CONNECTION_REFUSED

## 🔍 Problem
The frontend cannot connect to the backend API, showing `ERR_CONNECTION_REFUSED`.

## ✅ Solution

### Step 1: Start the Backend Server

The backend must be running before the frontend can connect to it.

**Option A: Using the start script (Recommended)**
```bash
./start_backend.sh
```

**Option B: Manual start**
```bash
cd backend
source ../venv/bin/activate  # Activate virtual environment
uvicorn main:app --reload
```

**Option C: If virtual environment is in backend folder**
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload
```

### Step 2: Verify Backend is Running

Open in browser: `http://localhost:8000/health`

You should see:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "scaler_loaded": true
}
```

### Step 3: Check Frontend is Connecting to Correct Port

Verify `frontend/src/api/api.js` has:
```javascript
const API_BASE_URL = 'http://localhost:8000';
```

### Step 4: Start Frontend (in separate terminal)

```bash
cd frontend
npm install  # If not done already
npm run dev
```

## 🔧 Common Issues

### Issue 1: Port 8000 Already in Use

**Error:** `Address already in use`

**Solution:**
```bash
# Find process using port 8000
lsof -ti:8000

# Kill it
kill -9 $(lsof -ti:8000)

# Or use different port
uvicorn main:app --reload --port 8001
```

Then update `frontend/src/api/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8001';
```

### Issue 2: Model Files Not Found

**Error:** `Model not loaded`

**Solution:**
```bash
cd backend
python train_and_save_model.py
```

This creates:
- `model.pkl`
- `scaler.pkl`
- `feature_names.json`

### Issue 3: Dependencies Not Installed

**Error:** `ModuleNotFoundError: No module named 'fastapi'`

**Solution:**
```bash
cd backend
pip install -r requirements.txt
```

### Issue 4: CORS Errors

**Error:** `CORS policy: No 'Access-Control-Allow-Origin' header`

**Solution:** Already handled in `backend/main.py`, but verify:
- Frontend URL is in CORS origins: `http://localhost:5173` or `http://localhost:3000`
- Backend is running

### Issue 5: Virtual Environment Not Activated

**Error:** Python packages not found

**Solution:**
```bash
# Activate virtual environment
source venv/bin/activate  # macOS/Linux
# OR
venv\Scripts\activate     # Windows

# Then start backend
cd backend
uvicorn main:app --reload
```

## 📋 Quick Checklist

- [ ] Backend server is running (`uvicorn main:app --reload`)
- [ ] Backend accessible at `http://localhost:8000/health`
- [ ] Model files exist (`model.pkl`, `scaler.pkl`, `feature_names.json`)
- [ ] Dependencies installed (`pip install -r requirements.txt`)
- [ ] Frontend API URL matches backend port (`http://localhost:8000`)
- [ ] Both terminals open (one for backend, one for frontend)

## 🎯 Quick Test

Test backend directly:
```bash
curl http://localhost:8000/health
```

Should return:
```json
{"status":"healthy","model_loaded":true,"scaler_loaded":true}
```

## 💡 Pro Tip

Keep two terminal windows open:
1. **Terminal 1:** Backend server (`uvicorn main:app --reload`)
2. **Terminal 2:** Frontend dev server (`npm run dev`)

Both must be running simultaneously!

