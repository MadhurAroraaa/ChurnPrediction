# Deployment Guide

## Backend Deployment (Render)

### URL
https://churnprediction-rsrs.onrender.com

### Configuration
1. **Build Command**: (Leave empty or use `pip install -r requirements.txt`)
2. **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
3. **Environment**: Python 3.10
4. **Root Directory**: `backend/`

### Required Files
Ensure these files are in the `backend/` directory:
- `model.pkl` - Trained ML model
- `scaler.pkl` - Feature scaler
- `feature_names.json` - Feature names
- `main.py` - FastAPI application
- `requirements.txt` - Dependencies

### Environment Variables
No environment variables required for backend.

### Health Check
Test backend: https://churnprediction-rsrs.onrender.com/health

---

## Frontend Deployment (Vercel)

### URL
https://churn-prediction-madhur.vercel.app

### Configuration

#### Option 1: Using Vercel Dashboard
1. Go to Project Settings → Environment Variables
2. Add:
   - **Name**: `VITE_BACKEND_URL`
   - **Value**: `https://churnprediction-rsrs.onrender.com`
   - **Environment**: Production, Preview, Development

#### Option 2: Using vercel.json
The `vercel.json` file is already configured with the backend URL.

### Build Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Environment Variables Required
```
VITE_BACKEND_URL=https://churnprediction-rsrs.onrender.com
```

### Troubleshooting

#### Issue: Frontend can't connect to backend
- **Solution**: Verify `VITE_BACKEND_URL` is set in Vercel dashboard
- **Check**: Open browser console, look for API errors
- **Test**: Visit backend health endpoint directly

#### Issue: CORS errors
- **Solution**: Backend CORS is configured for Vercel domain
- **Check**: Verify backend is running and accessible

#### Issue: Render backend sleeping
- **Solution**: Render free tier sleeps after inactivity
- **First request**: May take 30-60 seconds to wake up
- **Workaround**: Use Render paid tier or keep-alive service

---

## Testing Deployment

### 1. Test Backend
```bash
curl https://churnprediction-rsrs.onrender.com/health
```

Expected response:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "scaler_loaded": true
}
```

### 2. Test Frontend
1. Visit: https://churn-prediction-madhur.vercel.app
2. Open browser console (F12)
3. Check for any errors
4. Try making a prediction

### 3. Test API Connection
In browser console:
```javascript
fetch('https://churnprediction-rsrs.onrender.com/health')
  .then(r => r.json())
  .then(console.log)
```

---

## Notes

- Render free tier may have cold starts (30-60s delay)
- Vercel automatically handles environment variables from `vercel.json`
- Both services support automatic deployments from Git
- Monitor Render logs for startup issues
- Monitor Vercel logs for build errors

