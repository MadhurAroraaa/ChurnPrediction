import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from xgboost import XGBClassifier
from sklearn.metrics import roc_auc_score
import joblib
import json

# -------------------------------------------
# STEP 1: Create Synthetic Haryana Business Data
# -------------------------------------------

def generate_haryana_business_data(n=6000):
    np.random.seed(42)

    df = pd.DataFrame({
        "customer_age": np.random.randint(20, 60, n),
        "account_age_days": np.random.randint(30, 1000, n),

        "total_purchases": np.random.randint(1, 20, n),
        "avg_order_value": np.random.randint(50, 5000, n),

        "days_since_last_purchase": np.random.randint(1, 200, n),
        "website_visits": np.random.randint(0, 40, n),
        "email_open_rate": np.random.uniform(0, 100, n),

        "support_tickets": np.random.poisson(1.2, n),
        "product_categories_browsed": np.random.randint(1, 12, n),
        "avg_session_duration_min": np.random.uniform(1, 25, n),

        "loyalty_program": np.random.randint(0, 2, n),
        "discount_usage": np.random.randint(0, 6, n),
        "review_count": np.random.randint(0, 10, n),

        "payment_failures": np.random.randint(0, 3, n),
        "return_rate": np.random.uniform(0, 40, n),
        "mobile_usage_pct": np.random.uniform(20, 95, n),

        "channel": np.random.choice(["web", "mobile", "app"], n)
    })

    # -------------------------------------------
    # STEP 2: Generate Realistic Churn Labels
    # -------------------------------------------

    score = (
        0.28 * (df["days_since_last_purchase"] / 200) +
        0.20 * (df["support_tickets"] / 8) +
        0.18 * (df["return_rate"] / 40) +
        0.14 * (1 - df["email_open_rate"] / 100) +
        0.12 * (df["total_purchases"] < 3).astype(int) +
        0.10 * (1 - df["loyalty_program"]) +
        0.08 * (df["payment_failures"] / 3)
    )

    df["churn_prob"] = score
    df["churned"] = (df["churn_prob"] > 0.45).astype(int)  # threshold

    return df

data = generate_haryana_business_data()

# -------------------------------------------
# STEP 3: Preprocessing
# -------------------------------------------

label_encoder = LabelEncoder()
data["channel_encoded"] = label_encoder.fit_transform(data["channel"])

features = [
    "customer_age", "account_age_days", "total_purchases",
    "avg_order_value", "days_since_last_purchase", "website_visits",
    "email_open_rate", "support_tickets", "product_categories_browsed",
    "avg_session_duration_min", "loyalty_program", "discount_usage",
    "review_count", "payment_failures", "return_rate",
    "mobile_usage_pct", "channel_encoded"
]

X = data[features]
y = data["churned"]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42, stratify=y
)

# -------------------------------------------
# STEP 4: Train XGBoost Model
# -------------------------------------------

model = XGBClassifier(
    n_estimators=250,
    max_depth=6,
    learning_rate=0.05,
    subsample=0.85,
    colsample_bytree=0.85,
    eval_metric="logloss"
)

model.fit(X_train, y_train)

y_pred = model.predict_proba(X_test)[:, 1]
auc = roc_auc_score(y_test, y_pred)
print(f"MODEL ROC-AUC: {auc:.4f}")

# -------------------------------------------
# STEP 5: Save Artifacts
# -------------------------------------------

joblib.dump(model, "model.pkl")
joblib.dump(scaler, "scaler.pkl")

with open("feature_names.json", "w") as f:
    json.dump(features, f)

print("TRAINING COMPLETE — MODEL SAVED!")
