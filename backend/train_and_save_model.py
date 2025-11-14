"""
Script to train the model and save artifacts for FastAPI backend
"""
import sys
import os
import json
import joblib
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Add parent directory to path to import churn_prediction_system
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from churn_prediction_system import (
    RealDataLoader, ChurnDataGenerator, ChurnPredictionModel
)

def train_and_save():
    """Train model and save artifacts"""
    print("="*80)
    print("TRAINING MODEL FOR FASTAPI BACKEND")
    print("="*80)
    
    # Step 1: Load Data
    print("\n[1/3] Loading data...")
    loader = RealDataLoader()
    ibm_df, source = loader.load_ibm_data()
    
    if ibm_df is not None:
        df = loader.prepare_ibm_data(ibm_df)
        data_source = source
    else:
        print("⚠️  Real data not available. Using synthetic data...")
        generator = ChurnDataGenerator(n_samples=5000)
        df = generator.generate_data()
        data_source = 'synthetic'
    
    # Step 2: Train Model
    print("\n[2/3] Training model...")
    model_trainer = ChurnPredictionModel(df, data_source)
    model_trainer.preprocess_data()
    
    # Train XGBoost (best performing model typically)
    print("Training XGBoost model...")
    model_trainer.train_xgboost()
    
    # Step 3: Save Artifacts
    print("\n[3/3] Saving artifacts...")
    
    # Save model
    model_path = os.path.join(os.path.dirname(__file__), "model.pkl")
    joblib.dump(model_trainer.models['xgboost'], model_path)
    print(f"✅ Saved model to {model_path}")
    
    # Save scaler
    scaler_path = os.path.join(os.path.dirname(__file__), "scaler.pkl")
    joblib.dump(model_trainer.scaler, scaler_path)
    print(f"✅ Saved scaler to {scaler_path}")
    
    # Save feature names
    feature_names_path = os.path.join(os.path.dirname(__file__), "feature_names.json")
    with open(feature_names_path, 'w') as f:
        json.dump(model_trainer.feature_names, f, indent=2)
    print(f"✅ Saved feature names to {feature_names_path}")
    
    print("\n" + "="*80)
    print("✅ MODEL TRAINING COMPLETE!")
    print("="*80)
    print(f"\nModel: XGBoost")
    print(f"Features: {len(model_trainer.feature_names)}")
    print(f"Feature names: {model_trainer.feature_names}")
    print("\nYou can now start the FastAPI server with:")
    print("  uvicorn backend.main:app --reload")

if __name__ == "__main__":
    train_and_save()

