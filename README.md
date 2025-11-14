# Churn Prediction ML System - React + FastAPI

Complete full-stack application for customer churn prediction with React frontend and FastAPI backend.

## 📁 Project Structure

```
ChurnPrediction_Project/
├── backend/
│   ├── main.py                 # FastAPI server
│   ├── train_and_save_model.py # Script to train and save model
│   ├── requirements.txt        # Python dependencies
│   ├── model.pkl               # Trained ML model (generated)
│   ├── scaler.pkl              # Feature scaler (generated)
│   └── feature_names.json      # Feature names (generated)
├── frontend/
│   ├── src/
│   │   ├── api/               # API service
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   └── App.jsx            # Main app with routing
│   └── package.json           # Node dependencies
└── churn_prediction_system.py # Original ML system
```

## 🚀 Quick Start

### Step 1: Train and Save Model

First, train the model and save artifacts:

```bash
cd backend
python train_and_save_model.py
```

This will generate:
- `model.pkl` - Trained XGBoost model
- `scaler.pkl` - Feature scaler
- `feature_names.json` - Feature names in correct order

### Step 2: Start Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will run on: `http://localhost:8000`

Test it: `http://localhost:8000/health`

### Step 3: Start Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on: `http://localhost:5173`

## 📋 Features

### Backend API Endpoints

- `GET /health` - Health check
- `POST /predict` - Predict churn for a customer

### Frontend Pages

1. **Predictor** (`/`) - Main prediction form
2. **Dashboard** (`/dashboard`) - Analytics and charts
3. **Customer Analysis** (`/customer`) - Individual customer analysis

## 🔧 API Usage

### Predict Churn

```bash
curl -X POST "http://localhost:8000/predict" \
  -H "Content-Type: application/json" \
  -d '{
    "avg_order_value": 50.0,
    "total_purchases": 5,
    "email_open_rate": 50.0,
    "days_since_last_purchase": 30,
    "loyalty_program": 0,
    "website_visits": 15,
    "return_rate": 10.0,
    "support_tickets": 1,
    "channel": "web"
  }'
```

Response:
```json
{
  "churn_probability": 0.35,
  "risk_level": "MEDIUM",
  "actions": [
    {
      "priority": "MEDIUM",
      "action": "Loyalty Program Enrollment",
      "details": "Offer bonus points for joining loyalty program"
    }
  ]
}
```

## 📦 Dependencies

### Backend
- fastapi
- uvicorn
- numpy
- pandas
- scikit-learn
- joblib
- xgboost
- pydantic

### Frontend
- react
- react-router-dom
- axios
- recharts
- @mui/material
- tailwindcss

## 🎨 UI Features

- **Material UI** for components and cards
- **TailwindCSS** for styling
- **Recharts** for data visualization
- **Responsive design** for mobile and desktop

## 📝 Notes

1. Make sure to train the model first before starting the backend
2. The backend loads model artifacts on startup
3. CORS is enabled for `localhost:5173` (Vite default port)
4. Feature order must match the training data exactly

## 🐛 Troubleshooting

### Backend won't start
- Check that `model.pkl`, `scaler.pkl`, and `feature_names.json` exist
- Run `train_and_save_model.py` first

### Frontend can't connect to backend
- Ensure backend is running on port 8000
- Check CORS settings in `backend/main.py`
- Verify API URL in `frontend/src/api/api.js`

### Model prediction errors
- Ensure feature names match exactly
- Check that all required fields are provided
- Verify channel values are: 'web', 'mobile', or 'app'

## 📄 License

This project is for educational purposes.

