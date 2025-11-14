#!/bin/bash
# Script to start the FastAPI backend server

cd "$(dirname "$0")/backend"

# Activate virtual environment if it exists
if [ -d "../venv" ]; then
    source ../venv/bin/activate
fi

# Check if model files exist
if [ ! -f "model.pkl" ] || [ ! -f "scaler.pkl" ] || [ ! -f "feature_names.json" ]; then
    echo "❌ Model files not found!"
    echo "Please run: python backend/train_and_save_model.py first"
    exit 1
fi

# Install dependencies if needed
if ! python -c "import fastapi" 2>/dev/null; then
    echo "📦 Installing backend dependencies..."
    pip install -r requirements.txt
fi

echo "🚀 Starting FastAPI backend server..."
echo "📍 Backend will run on: http://localhost:8000"
echo "📋 API docs available at: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

uvicorn main:app --reload --host 0.0.0.0 --port 8000

