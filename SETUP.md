# Setup Instructions

## 🎯 Complete Setup Guide

### Prerequisites
- Python 3.10+ (with virtual environment)
- Node.js 16+ and npm
- All ML dependencies installed

### Step-by-Step Setup

#### 1. Train and Save Model

```bash
# Activate your Python virtual environment first
source venv/bin/activate  # or: venv\Scripts\activate on Windows

# Navigate to backend
cd backend

# Train model and save artifacts
python train_and_save_model.py
```

This creates:
- `backend/model.pkl`
- `backend/scaler.pkl`
- `backend/feature_names.json`

#### 2. Install Backend Dependencies

```bash
cd backend
pip install -r requirements.txt
```

#### 3. Start Backend Server

```bash
# Still in backend directory
uvicorn main:app --reload
```

✅ Backend running on: `http://localhost:8000`

Test: Open `http://localhost:8000/health` in browser

#### 4. Install Frontend Dependencies

```bash
# Open new terminal
cd frontend
npm install
```

This installs:
- React, React Router
- Material UI
- Axios
- Recharts
- TailwindCSS

#### 5. Start Frontend Development Server

```bash
# Still in frontend directory
npm run dev
```

✅ Frontend running on: `http://localhost:5173`

## 🎉 You're Ready!

1. Open `http://localhost:5173` in your browser
2. Navigate between pages:
   - **Predictor** - Main prediction form
   - **Dashboard** - Analytics charts
   - **Customer Analysis** - Individual customer analysis

## 📝 Quick Test

Test the API directly:

```bash
curl -X POST "http://localhost:8000/predict" \
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

## 🔧 Troubleshooting

### Model files not found
- Run `train_and_save_model.py` first
- Check that files are in `backend/` directory

### Port already in use
- Backend: Change port in `uvicorn main:app --reload --port 8001`
- Frontend: Vite will auto-suggest next available port

### CORS errors
- Check `backend/main.py` CORS settings
- Ensure frontend URL matches (default: `http://localhost:5173`)

### Module not found errors
- Backend: `pip install -r requirements.txt`
- Frontend: `npm install`

## 📚 Next Steps

1. Customize UI styling in `frontend/src/`
2. Add more API endpoints in `backend/main.py`
3. Enhance retention strategies logic
4. Add authentication if needed
5. Deploy to production

