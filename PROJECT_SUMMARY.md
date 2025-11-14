# 📋 Project Summary - Churn Prediction System

## Quick Overview

**Full-Stack ML Application** for predicting customer churn with React frontend and FastAPI backend.

---

## 🎯 What This Project Does

Predicts if a customer will churn (leave) and provides personalized retention strategies.

---

## 🏗️ Architecture

```
User → React UI → FastAPI Backend → ML Model → Predictions → UI Display
```

**Two Servers:**
- **Backend:** FastAPI on port 8000
- **Frontend:** React on port 5173

---

## 📦 Components

### Backend (Python)
- **FastAPI Server** - REST API
- **XGBoost Model** - ML predictions
- **Feature Preprocessing** - Data scaling/encoding
- **Strategy Generator** - Retention recommendations

### Frontend (React)
- **3 Pages:**
  1. Predictor - Main prediction form
  2. Dashboard - Analytics charts
  3. Customer Analysis - Individual analysis
- **Components:**
  - PredictionForm
  - RiskCard
  - StrategyList
  - ChartsOverview

---

## 🔧 Tech Stack

**Backend:**
- Python 3.10, FastAPI, XGBoost, scikit-learn

**Frontend:**
- React, Material UI, TailwindCSS, Axios

---

## 📊 ML Model

- **Algorithm:** XGBoost
- **Accuracy:** ~85-90%
- **Features:** 17 customer attributes
- **Output:** Churn probability + risk level + strategies

---

## 🚀 How to Run

1. **Train Model:**
   ```bash
   cd backend
   python train_and_save_model.py
   ```

2. **Start Backend:**
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

3. **Start Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

## 📁 Key Files

- `backend/main.py` - API server
- `backend/train_and_save_model.py` - Model training
- `frontend/src/App.jsx` - React app
- `churn_prediction_system.py` - Original ML system

---

## 📈 Features

✅ Real-time predictions  
✅ Risk classification (LOW/MEDIUM/HIGH)  
✅ Personalized retention strategies  
✅ Analytics dashboard  
✅ Responsive UI  

---

## 📚 Documentation

- **Full Report:** `PROJECT_REPORT.md`
- **Setup Guide:** `SETUP.md`
- **Quick Start:** `QUICK_START.md`

---

**Status:** ✅ Production Ready

