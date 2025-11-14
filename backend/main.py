"""
FastAPI Backend for Churn Prediction ML Model
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import json
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import os

app = FastAPI(title="Churn Prediction API")

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://churn-prediction-madhur.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model, scaler, and feature names
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.pkl")
SCALER_PATH = os.path.join(os.path.dirname(__file__), "scaler.pkl")
FEATURE_NAMES_PATH = os.path.join(os.path.dirname(__file__), "feature_names.json")

model = None
scaler = None
feature_names = None
label_encoder = None

def load_artifacts():
    """Load model, scaler, and feature names"""
    global model, scaler, feature_names, label_encoder
    
    try:
        model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
        
        with open(FEATURE_NAMES_PATH, 'r') as f:
            feature_names = json.load(f)
        
        # Initialize label encoder for channel
        label_encoder = LabelEncoder()
        label_encoder.classes_ = np.array(['app', 'mobile', 'web'])
        
        print("✅ Model artifacts loaded successfully")
    except Exception as e:
        print(f"❌ Error loading artifacts: {e}")
        raise

# Load artifacts on startup
@app.on_event("startup")
async def startup_event():
    load_artifacts()

# Request/Response Models
class CustomerData(BaseModel):
    avg_order_value: float
    total_purchases: float
    email_open_rate: float
    days_since_last_purchase: float
    loyalty_program: int
    website_visits: int
    return_rate: float
    support_tickets: int
    channel: str  # 'web', 'mobile', or 'app'
    # Optional fields with defaults
    customer_age: float = 35.0
    account_age_days: float = 365.0
    product_categories_browsed: float = 4.0
    avg_session_duration_min: float = 10.0
    discount_usage: int = 2
    review_count: int = 1
    payment_failures: int = 0
    mobile_usage_pct: float = 50.0

class PredictionResponse(BaseModel):
    churn_probability: float
    risk_level: str
    actions: list

# Routes
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "scaler_loaded": scaler is not None
    }

@app.post("/predict", response_model=PredictionResponse)
async def predict_churn(customer: CustomerData):
    """Predict churn probability for a customer"""
    
    if model is None or scaler is None or feature_names is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    try:
        # Convert channel to encoded value
        channel_encoded = label_encoder.transform([customer.channel])[0]
        
        # Create feature vector in the correct order
        feature_dict = {
            'customer_age': customer.customer_age,
            'account_age_days': customer.account_age_days,
            'total_purchases': customer.total_purchases,
            'avg_order_value': customer.avg_order_value,
            'days_since_last_purchase': customer.days_since_last_purchase,
            'website_visits': customer.website_visits,
            'email_open_rate': customer.email_open_rate,
            'support_tickets': customer.support_tickets,
            'product_categories_browsed': customer.product_categories_browsed,
            'avg_session_duration_min': customer.avg_session_duration_min,
            'loyalty_program': customer.loyalty_program,
            'discount_usage': customer.discount_usage,
            'review_count': customer.review_count,
            'payment_failures': customer.payment_failures,
            'return_rate': customer.return_rate,
            'mobile_usage_pct': customer.mobile_usage_pct,
            'channel_encoded': channel_encoded
        }
        
        # Create DataFrame with features in correct order
        customer_df = pd.DataFrame([feature_dict])
        
        # Ensure feature order matches training
        customer_features = customer_df[feature_names]
        
        # Scale features
        customer_scaled = scaler.transform(customer_features)
        
        # Predict
        if hasattr(model, 'predict_proba'):
            churn_prob = model.predict_proba(customer_scaled)[0, 1]
        else:
            # Neural network
            churn_prob = float(model.predict(customer_scaled, verbose=0)[0][0])
        
        # Determine risk level
        if churn_prob > 0.7:
            risk_level = "HIGH"
        elif churn_prob > 0.4:
            risk_level = "MEDIUM"
        else:
            risk_level = "LOW"
        
        # Generate retention strategies
        actions = generate_retention_strategies(customer, churn_prob)
        
        return PredictionResponse(
            churn_probability=float(churn_prob),
            risk_level=risk_level,
            actions=actions
        )
    
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction error: {str(e)}")

def generate_retention_strategies(customer: CustomerData, churn_prob: float) -> list:
    """Generate personalized retention strategies"""
    actions = []
    
    # High-value customer strategies
    if customer.avg_order_value > 100:
        actions.append({
            "priority": "HIGH",
            "action": "VIP Customer Care",
            "details": "Assign dedicated account manager, offer premium support"
        })
    
    # Engagement strategies
    if customer.days_since_last_purchase > 60:
        actions.append({
            "priority": "HIGH",
            "action": "Win-back Campaign",
            "details": "Send personalized email with 20% discount on favorite categories"
        })
    
    if customer.email_open_rate < 30:
        actions.append({
            "priority": "MEDIUM",
            "action": "Re-engagement Program",
            "details": "Optimize email content, adjust sending frequency"
        })
    
    # Loyalty strategies
    if customer.loyalty_program == 0:
        actions.append({
            "priority": "MEDIUM",
            "action": "Loyalty Program Enrollment",
            "details": "Offer bonus points for joining loyalty program"
        })
    
    # Product and service improvements
    if customer.return_rate > 15:
        actions.append({
            "priority": "HIGH",
            "action": "Quality Assurance",
            "details": "Investigate high return rate, offer product consultation"
        })
    
    if customer.support_tickets > 3:
        actions.append({
            "priority": "HIGH",
            "action": "Proactive Support",
            "details": "Schedule follow-up call to resolve ongoing issues"
        })
    
    # Default action if no specific strategies
    if not actions:
        actions.append({
            "priority": "LOW",
            "action": "Standard Engagement",
            "details": "Continue standard customer engagement practices"
        })
    
    return actions

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

