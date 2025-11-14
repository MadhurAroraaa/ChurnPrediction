# Deployment Troubleshooting Guide

## Current Deployment Status

- **Backend:** https://churnprediction-rsrs.onrender.com
- **Frontend:** https://churn-prediction-madhur.vercel.app
- **Environment Variable:** `VITE_BACKEND_URL` already set in Vercel ✅

## Common Issues and Solutions

### Issue 1: Backend Not Responding (Render Free Tier)

**Symptoms:**
- `ERR_CONNECTION_REFUSED`
- `Network Error`
- Long loading times

**Cause:** Render free tier services sleep after 15 minutes of inactivity

**Solutions:**
1. **First Request:** Wait 30-60 seconds for backend to wake up
2. **Keep-Alive:** Set up a cron job or service to ping backend every 10 minutes
3. **Upgrade:** Use Render paid tier ($7/month) for always-on service

**Test Backend:**
```bash
curl https://churnprediction-rsrs.onrender.com/health
```

### Issue 2: CORS Errors

**Symptoms:**
- `Access to fetch blocked by CORS policy`
- `No 'Access-Control-Allow-Origin' header`

**Solutions:**
1. **Verify CORS Configuration:**
   - Backend allows: `https://churn-prediction-madhur.vercel.app`
   - Check backend logs for CORS errors

2. **Add Preview URLs:**
   - If using Vercel preview deployments, add the preview URL to backend CORS
   - Or set `ALLOWED_ORIGINS` environment variable in Render

3. **Check Browser Console:**
   - Look for exact error message
   - Verify the origin making the request

### Issue 3: Environment Variable Not Working

**Symptoms:**
- Frontend still uses localhost backend
- API calls go to wrong URL

**Solutions:**
1. **Verify in Vercel:**
   - Go to Project Settings → Environment Variables
   - Ensure `VITE_BACKEND_URL` is set for Production, Preview, and Development
   - Value should be: `https://churnprediction-rsrs.onrender.com`

2. **Redeploy:**
   - After setting env var, trigger new deployment
   - Or push a commit to trigger auto-deployment

3. **Check Build Logs:**
   - Verify environment variable is available during build
   - Check Vercel build logs for errors

### Issue 4: Model Files Not Found

**Symptoms:**
- Backend returns 500 error
- "Model not loaded" error
- Backend health check shows `model_loaded: false`

**Solutions:**
1. **Verify Files in Repository:**
   - Ensure `model.pkl`, `scaler.pkl`, `feature_names.json` are in `backend/` folder
   - Files should be committed to Git

2. **Check Render Logs:**
   - Look for "Error loading artifacts" messages
   - Verify file paths are correct

3. **Re-upload Files:**
   - If files are missing, run `train_and_save_model.py` locally
   - Commit and push the generated files

### Issue 5: API Timeout

**Symptoms:**
- Request takes too long
- Timeout errors

**Solutions:**
1. **Increase Timeout:**
   - Frontend already has 30-second timeout
   - Backend might be slow on first request (cold start)

2. **Optimize Backend:**
   - Consider caching predictions
   - Optimize model loading

## Quick Diagnostic Steps

### Step 1: Test Backend Directly
```bash
curl https://churnprediction-rsrs.onrender.com/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "scaler_loaded": true
}
```

### Step 2: Test from Browser Console
On your frontend page, open console (F12) and run:
```javascript
fetch('https://churnprediction-rsrs.onrender.com/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

### Step 3: Check Network Tab
1. Open browser DevTools → Network tab
2. Try making a prediction
3. Look for the `/predict` request
4. Check:
   - Request URL (should be Render backend)
   - Status code
   - Response/error message

### Step 4: Verify Environment Variable
In browser console on frontend:
```javascript
console.log(import.meta.env.VITE_BACKEND_URL)
```

Should show: `https://churnprediction-rsrs.onrender.com`

## Render-Specific Issues

### Cold Start Delay
- **First request:** 30-60 seconds
- **Subsequent requests:** Normal speed
- **Solution:** Keep-alive service or paid tier

### Build Failures
- Check Render build logs
- Verify Python version (3.10)
- Ensure all dependencies install correctly

### Port Configuration
- Render uses `$PORT` environment variable
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Verify in Render service settings

## Vercel-Specific Issues

### Build Failures
- Check Vercel build logs
- Verify Node.js version
- Ensure `npm install` completes successfully

### Environment Variables
- Must be set in Vercel dashboard
- Apply to: Production, Preview, Development
- Redeploy after setting

### Preview Deployments
- Each PR gets unique URL
- May need to add preview URL to backend CORS
- Or use `ALLOWED_ORIGINS` in Render

## Still Not Working?

1. **Check Backend Logs:**
   - Render dashboard → Logs
   - Look for startup errors
   - Check for model loading issues

2. **Check Frontend Logs:**
   - Vercel dashboard → Deployments → View Function Logs
   - Browser console errors

3. **Verify URLs:**
   - Backend: https://churnprediction-rsrs.onrender.com/health
   - Frontend: https://churn-prediction-madhur.vercel.app

4. **Test Locally:**
   - Run backend locally: `uvicorn main:app --reload`
   - Run frontend locally: `npm run dev`
   - If local works, issue is deployment-specific

## Quick Fixes Applied

✅ Frontend API URL fallback added
✅ Backend CORS updated for Vercel
✅ Error handling improved
✅ Timeout configuration added

