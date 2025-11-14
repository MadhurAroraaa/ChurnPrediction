# How to Test Your Deployment

## 🧪 Step-by-Step Testing Guide

### Step 1: Test Backend Health Check

**Method 1: Using Browser**
1. Open: https://churnprediction-rsrs.onrender.com/health
2. **Wait 30-60 seconds** (Render free tier may be sleeping)
3. **Expected Result:** You should see:
   ```json
   {
     "status": "healthy",
     "model_loaded": true,
     "scaler_loaded": true
   }
   ```
4. **If Error:** Backend is not running or sleeping - wait longer

**Method 2: Using Terminal**
```bash
curl https://churnprediction-rsrs.onrender.com/health
```

**Method 3: Using Browser Console**
1. Open any webpage
2. Press F12 → Console tab
3. Paste and run:
   ```javascript
   fetch('https://churnprediction-rsrs.onrender.com/health')
     .then(r => r.json())
     .then(console.log)
     .catch(console.error)
   ```

---

### Step 2: Test Frontend Connection

1. **Open Frontend:**
   - Visit: https://churn-prediction-madhur.vercel.app

2. **Check Browser Console:**
   - Press F12 (or right-click → Inspect)
   - Go to **Console** tab
   - Look for: `API Base URL: https://churnprediction-rsrs.onrender.com`
   - ✅ **If you see this:** Frontend is configured correctly

3. **Check for Errors:**
   - Look for any red error messages
   - Common errors:
     - `ERR_CONNECTION_REFUSED` → Backend is sleeping
     - `CORS error` → CORS configuration issue
     - `Network Error` → Backend not accessible

---

### Step 3: Test API Connection from Frontend

**In Browser Console (on your frontend page):**

```javascript
// Test health endpoint
fetch('https://churnprediction-rsrs.onrender.com/health')
  .then(r => r.json())
  .then(data => {
    console.log('✅ Backend is working:', data);
  })
  .catch(error => {
    console.error('❌ Backend error:', error);
  });
```

**Expected Output:**
```
✅ Backend is working: {status: "healthy", model_loaded: true, scaler_loaded: true}
```

---

### Step 4: Test Full Prediction Flow

1. **Fill Out the Form:**
   - Go to: https://churn-prediction-madhur.vercel.app
   - Fill in customer data:
     - Average Order Value (Rs.): 75
     - Total Purchases: 8
     - Email Open Rate: 45
     - Days Since Last Purchase: 45
     - Loyalty Program: Yes
     - Website Visits: 20
     - Return Rate: 8
     - Support Tickets: 2
     - Channel: Web

2. **Click "Predict Churn"**

3. **What to Expect:**
   - **Loading:** Button shows "Predicting..." (may take 30-60 seconds first time)
   - **Success:** You see:
     - Churn probability percentage
     - Risk level (LOW/MEDIUM/HIGH)
     - Haryana-specific retention strategies
   - **Error:** Check error message

4. **Check Network Tab:**
   - Press F12 → **Network** tab
   - Click "Predict Churn"
   - Look for request to `/predict`
   - Check:
     - **Status:** Should be 200 (success)
     - **Response:** Should contain churn_probability, risk_level, actions

---

### Step 5: Verify Haryana Features

✅ **Check UI:**
- Title should say "Haryana Business Churn Prediction"
- Page descriptions mention Haryana businesses
- Currency shows "Rs." (Rupees)

✅ **Check Strategies:**
- After prediction, strategies should mention:
  - Haryana cities (Gurgaon, Faridabad, Panipat)
  - Regional products (basmati rice, dairy, textiles)
  - Local festivals (Teej, Diwali, Baisakhi)
  - WhatsApp Business
  - Bilingual communication

---

## 🔍 Troubleshooting Checklist

### If Backend Health Check Fails:

- [ ] Wait 30-60 seconds (Render free tier sleeping)
- [ ] Check Render dashboard → Logs for errors
- [ ] Verify model files (model.pkl, scaler.pkl) are in repository
- [ ] Check Render service is running (not paused)

### If Frontend Can't Connect:

- [ ] Check browser console for API Base URL
- [ ] Verify `VITE_BACKEND_URL` in Vercel dashboard
- [ ] Check Network tab for CORS errors
- [ ] Try direct backend URL in browser

### If Prediction Fails:

- [ ] Check browser console for error message
- [ ] Verify all form fields are filled
- [ ] Check Network tab → `/predict` request → Response
- [ ] Look for specific error in response

---

## ✅ Success Indicators

### Backend Working:
- ✅ Health endpoint returns JSON with `status: "healthy"`
- ✅ `model_loaded: true` and `scaler_loaded: true`
- ✅ Response time < 5 seconds (after wake-up)

### Frontend Working:
- ✅ Page loads without errors
- ✅ Console shows correct API Base URL
- ✅ No CORS errors in console
- ✅ Form submits successfully

### Full System Working:
- ✅ Prediction returns results
- ✅ Churn probability displayed
- ✅ Risk level shown
- ✅ Haryana-specific strategies appear
- ✅ No errors in console or network tab

---

## 🎯 Quick Test Commands

### Test Backend (Terminal):
```bash
# Health check
curl https://churnprediction-rsrs.onrender.com/health

# Test prediction
curl -X POST https://churnprediction-rsrs.onrender.com/predict \
  -H "Content-Type: application/json" \
  -d '{
    "avg_order_value": 75.0,
    "total_purchases": 8,
    "email_open_rate": 45.0,
    "days_since_last_purchase": 45,
    "loyalty_program": 1,
    "website_visits": 20,
    "return_rate": 8.0,
    "support_tickets": 2,
    "channel": "web"
  }'
```

### Test from Browser Console:
```javascript
// Health check
fetch('https://churnprediction-rsrs.onrender.com/health')
  .then(r => r.json())
  .then(console.log);

// Test prediction
fetch('https://churnprediction-rsrs.onrender.com/predict', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    avg_order_value: 75.0,
    total_purchases: 8,
    email_open_rate: 45.0,
    days_since_last_purchase: 45,
    loyalty_program: 1,
    website_visits: 20,
    return_rate: 8.0,
    support_tickets: 2,
    channel: "web"
  })
})
.then(r => r.json())
.then(console.log);
```

---

## 📊 Expected Results

### Successful Prediction Response:
```json
{
  "churn_probability": 0.35,
  "risk_level": "MEDIUM",
  "actions": [
    {
      "priority": "MEDIUM",
      "action": "Haryana Loyalty Program Enrollment",
      "details": "Offer bonus points redeemable at local Haryana partner stores..."
    }
  ]
}
```

---

## 🚨 Common Issues & Quick Fixes

| Issue | Quick Fix |
|-------|-----------|
| Backend timeout | Wait 30-60 seconds, then retry |
| CORS error | Check backend CORS includes Vercel URL |
| Network error | Verify backend is running on Render |
| Model not loaded | Check model files in repository |
| 500 error | Check Render logs for details |

---

**Start with Step 1** - Test the backend health endpoint first!

