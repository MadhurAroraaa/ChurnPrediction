# Deployment Fixes Applied

## ✅ Issues Fixed

### 1. Frontend API URL Configuration
**Fixed:** Added fallback to production backend URL
- **File:** `frontend/src/api/api.js`
- **Change:** Added fallback: `const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://churnprediction-rsrs.onrender.com';`
- **Result:** Frontend will work even if environment variable is not set

### 2. Backend CORS Configuration
**Fixed:** Updated CORS to allow Vercel frontend
- **File:** `backend/main.py`
- **Change:** Added Vercel URL to allowed origins
- **Result:** Frontend can now communicate with backend

### 3. Vercel Environment Variables
**Fixed:** Created configuration file
- **File:** `vercel.json`
- **Change:** Added `VITE_BACKEND_URL` environment variable
- **Result:** Vercel will use production backend URL

## 🔧 Additional Steps Required

### For Vercel Deployment:

1. **Set Environment Variable in Vercel Dashboard:**
   - Go to: Project Settings → Environment Variables
   - Add:
     - **Name:** `VITE_BACKEND_URL`
     - **Value:** `https://churnprediction-rsrs.onrender.com`
     - **Environment:** Production, Preview, Development

2. **Redeploy Frontend:**
   - After setting environment variable, trigger a new deployment
   - Or push a commit to trigger automatic deployment

### For Render Backend:

1. **Verify Model Files:**
   - Ensure `model.pkl`, `scaler.pkl`, `feature_names.json` are in repository
   - Or upload them to Render

2. **Check Render Logs:**
   - Verify backend starts successfully
   - Check for any model loading errors

## 🧪 Testing Deployment

### Test Backend:
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

### Test Frontend:
1. Visit: https://churn-prediction-madhur.vercel.app
2. Open browser console (F12)
3. Try making a prediction
4. Check for errors

### Test API Connection:
In browser console on frontend:
```javascript
fetch('https://churnprediction-rsrs.onrender.com/health')
  .then(r => r.json())
  .then(console.log)
```

## ⚠️ Common Issues

### Issue: Render Backend Sleeping
- **Problem:** Render free tier sleeps after inactivity
- **Solution:** First request may take 30-60 seconds to wake up
- **Workaround:** Use Render paid tier or implement keep-alive

### Issue: CORS Errors
- **Problem:** Frontend can't connect to backend
- **Solution:** Verify backend CORS includes Vercel URL
- **Check:** Backend logs for CORS errors

### Issue: Environment Variable Not Set
- **Problem:** Frontend uses wrong backend URL
- **Solution:** Set `VITE_BACKEND_URL` in Vercel dashboard
- **Verify:** Check browser console for API calls

## 📝 Next Steps

1. ✅ Set `VITE_BACKEND_URL` in Vercel dashboard
2. ✅ Redeploy frontend on Vercel
3. ✅ Test both deployments
4. ✅ Verify predictions work end-to-end

