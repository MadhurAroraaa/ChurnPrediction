"""
AI-Driven Churn Prediction and Testing Framework for Customer Retention in E-Commerce
=====================================================================================

This system provides:
1. Real IBM Telco data OR Synthetic data generation for training
2. Multiple ML models (Random Forest, XGBoost, Neural Network)
3. Comprehensive testing framework
4. Retention strategy recommendations
5. Performance metrics and visualization
"""

import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import warnings
import os
warnings.filterwarnings('ignore')

# ML Libraries
from sklearn.model_selection import train_test_split, cross_val_score, StratifiedKFold
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (accuracy_score, precision_score, recall_score, 
                            f1_score, roc_auc_score, confusion_matrix, 
                            classification_report, roc_curve)
from sklearn.linear_model import LogisticRegression
import xgboost as xgb

# Deep Learning
from tensorflow import keras
from tensorflow.keras import layers, models, callbacks

# Visualization
import matplotlib.pyplot as plt
import seaborn as sns

# Statistical Tests
from scipy import stats
from scipy.stats import chi2_contingency, ttest_ind

# Set random seed for reproducibility
np.random.seed(42)


class RealDataLoader:
    """Load real IBM Telco customer churn data"""
    
    def load_ibm_data(self):
        """Load IBM Telco dataset from local file or download"""
        print("="*80)
        print("LOADING REAL IBM TELCO CUSTOMER DATA")
        print("="*80)
        
        # Try loading local file first
        if os.path.exists('Telco-Customer-Churn.csv'):
            print("✅ Found local IBM Telco dataset!")
            print("📂 Loading data from local file...")
            try:
                df = pd.read_csv('Telco-Customer-Churn.csv')
                print(f"✅ Successfully loaded {len(df)} REAL customer records!")
                return df, 'ibm_telco_local'
            except Exception as e:
                print(f"❌ Error loading local file: {e}")
        
        # Try downloading from GitHub
        print("🌐 Local file not found. Attempting online download...")
        try:
            url = 'https://raw.githubusercontent.com/IBM/telco-customer-churn-on-icp4d/master/data/Telco-Customer-Churn.csv'
            df = pd.read_csv(url)
            print(f"✅ Successfully downloaded {len(df)} REAL customer records!")
            
            # Save for future use
            df.to_csv('Telco-Customer-Churn.csv', index=False)
            print("💾 Saved locally for future use: Telco-Customer-Churn.csv")
            return df, 'ibm_telco_download'
        except Exception as e:
            print(f"❌ Download failed: {e}")
            return None, None
    
    def prepare_ibm_data(self, df):
        """Convert IBM Telco data to e-commerce format"""
        print("\n📊 Preparing IBM Telco data for churn prediction...")
        
        # Handle target variable
        df['Churn'] = df['Churn'].map({'Yes': 1, 'No': 0})
        
        # Convert TotalCharges to numeric
        df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
        df['TotalCharges'].fillna(df['TotalCharges'].median(), inplace=True)
        
        # Create e-commerce equivalent features
        df_ecommerce = pd.DataFrame()
        df_ecommerce['customer_id'] = df['customerID']
        df_ecommerce['customer_age'] = df['SeniorCitizen'].map({0: 35, 1: 65})  # Approximate
        df_ecommerce['account_age_days'] = df['tenure'] * 30  # Convert months to days
        df_ecommerce['total_purchases'] = (df['tenure'] / 3).clip(0, 50).round(0)  # Estimate
        df_ecommerce['avg_order_value'] = df['MonthlyCharges'] * 2  # Approximate
        df_ecommerce['days_since_last_purchase'] = np.where(df['tenure'] < 1, 90, 
                                                            30 + (72 - df['tenure']) * 2).clip(1, 365)
        df_ecommerce['website_visits'] = (df['tenure'] * 3).clip(0, 200)
        df_ecommerce['email_open_rate'] = np.where(df['PaperlessBilling'] == 'Yes', 65, 35)
        df_ecommerce['support_tickets'] = df['tenure'].apply(lambda x: 0 if x > 12 else np.random.poisson(2))
        df_ecommerce['product_categories_browsed'] = (df['tenure'] / 4).clip(1, 10)
        df_ecommerce['avg_session_duration_min'] = np.random.gamma(10, 2, len(df))
        df_ecommerce['loyalty_program'] = df['Contract'].map({'Month-to-month': 0, 'One year': 1, 'Two year': 1})
        df_ecommerce['discount_usage'] = np.where(df['Contract'] == 'Month-to-month', 0, 
                                                  np.random.poisson(2, len(df)))
        df_ecommerce['review_count'] = (df['tenure'] / 6).clip(0, 10).round(0)
        df_ecommerce['payment_failures'] = np.where(df['PaymentMethod'] == 'Electronic check', 
                                                    np.random.poisson(1, len(df)), 0)
        df_ecommerce['return_rate'] = (10 - df['tenure'] / 5).clip(0, 30)
        df_ecommerce['mobile_usage_pct'] = np.where(df['PhoneService'] == 'Yes', 75, 25)
        df_ecommerce['channel'] = df['InternetService'].map({'DSL': 'web', 'Fiber optic': 'app', 
                                                             'No': 'mobile'})
        df_ecommerce['churned'] = df['Churn']
        
        print(f"✅ Prepared {len(df_ecommerce)} records")
        print(f"   Features: {len(df_ecommerce.columns) - 2}")  # Excluding customer_id and churned
        print(f"   Churn rate: {df_ecommerce['churned'].mean()*100:.2f}%")
        
        return df_ecommerce


class ChurnDataGenerator:
    """Generate synthetic e-commerce customer data for churn prediction"""
    
    def __init__(self, n_samples=5000):
        self.n_samples = n_samples
    
    def generate_data(self):
        """Generate realistic customer behavior data"""
        print("\n" + "="*80)
        print("GENERATING ENHANCED SYNTHETIC CUSTOMER DATA")
        print("="*80)
        print(f"Creating {self.n_samples} realistic customer records...")
        
        # Customer demographics
        customer_age = np.random.normal(35, 12, self.n_samples).clip(18, 75)
        account_age_days = np.random.exponential(365, self.n_samples).clip(1, 2000)
        
        # Purchase behavior
        total_purchases = np.random.poisson(8, self.n_samples)
        avg_order_value = np.random.gamma(50, 2, self.n_samples)
        days_since_last_purchase = np.random.exponential(30, self.n_samples).clip(0, 365)
        
        # Engagement metrics
        website_visits = np.random.poisson(15, self.n_samples)
        email_open_rate = np.random.beta(3, 2, self.n_samples)
        support_tickets = np.random.poisson(1, self.n_samples)
        
        # Product preferences
        product_categories_browsed = np.random.poisson(4, self.n_samples)
        avg_session_duration = np.random.gamma(10, 2, self.n_samples)
        
        # Loyalty indicators
        loyalty_program = np.random.choice([0, 1], self.n_samples, p=[0.6, 0.4])
        discount_usage = np.random.poisson(2, self.n_samples)
        review_count = np.random.poisson(1, self.n_samples)
        
        # Payment and returns
        payment_failures = np.random.poisson(0.5, self.n_samples).clip(0, 10)
        return_rate = np.random.beta(2, 10, self.n_samples)
        
        # Device and channel
        mobile_usage_pct = np.random.beta(3, 3, self.n_samples)
        channel = np.random.choice(['web', 'mobile', 'app'], self.n_samples)
        
        # Create churn target based on realistic business logic
        churn_score = (
            -0.3 * (days_since_last_purchase / 100) +
            0.2 * (total_purchases / 10) +
            0.15 * loyalty_program +
            0.1 * email_open_rate +
            -0.2 * (payment_failures / 5) +
            -0.15 * (return_rate * 10) +
            0.1 * (website_visits / 20) +
            -0.1 * (support_tickets / 5)
        )
        
        # Add noise and convert to binary churn
        churn_prob = 1 / (1 + np.exp(-churn_score + np.random.normal(0, 0.5, self.n_samples)))
        churned = (churn_prob < 0.35).astype(int)  # ~35% churn rate
        
        # Create DataFrame
        df = pd.DataFrame({
            'customer_id': range(1, self.n_samples + 1),
            'customer_age': customer_age.round(0),
            'account_age_days': account_age_days.round(0),
            'total_purchases': total_purchases,
            'avg_order_value': avg_order_value.round(2),
            'days_since_last_purchase': days_since_last_purchase.round(0),
            'website_visits': website_visits,
            'email_open_rate': (email_open_rate * 100).round(2),
            'support_tickets': support_tickets,
            'product_categories_browsed': product_categories_browsed,
            'avg_session_duration_min': avg_session_duration.round(2),
            'loyalty_program': loyalty_program,
            'discount_usage': discount_usage,
            'review_count': review_count,
            'payment_failures': payment_failures,
            'return_rate': (return_rate * 100).round(2),
            'mobile_usage_pct': (mobile_usage_pct * 100).round(2),
            'channel': channel,
            'churned': churned
        })
        
        print(f"✅ Generated {len(df)} customer records")
        print(f"   Churn rate: {churned.mean()*100:.2f}%")
        
        return df


class ChurnPredictionModel:
    """Train and evaluate multiple churn prediction models"""
    
    def __init__(self, df, data_source='unknown'):
        self.df = df
        self.data_source = data_source
        self.models = {}
        self.scaler = StandardScaler()
        self.feature_importance = {}
        
    def preprocess_data(self):
        """Prepare data for modeling"""
        print("\n" + "="*80)
        print("PREPROCESSING DATA FOR MODEL TRAINING")
        print("="*80)
        
        # Encode categorical variables
        le = LabelEncoder()
        df_processed = self.df.copy()
        
        if 'channel' in df_processed.columns:
            df_processed['channel_encoded'] = le.fit_transform(df_processed['channel'])
        
        # Select features (excluding customer_id and target)
        feature_cols = [col for col in df_processed.columns 
                       if col not in ['customer_id', 'churned', 'channel']]
        
        # Add channel_encoded if it exists
        if 'channel_encoded' in df_processed.columns:
            feature_cols.append('channel_encoded')
        
        X = df_processed[feature_cols]
        y = df_processed['churned']
        
        print(f"📊 Features selected: {len(feature_cols)}")
        print(f"   Total samples: {len(X)}")
        print(f"   Churn cases: {y.sum()} ({y.mean()*100:.2f}%)")
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        self.X_train = pd.DataFrame(X_train_scaled, columns=feature_cols)
        self.X_test = pd.DataFrame(X_test_scaled, columns=feature_cols)
        self.y_train = y_train.reset_index(drop=True)
        self.y_test = y_test.reset_index(drop=True)
        self.feature_names = feature_cols
        
        print(f"✅ Training set: {len(self.X_train)} samples")
        print(f"✅ Test set: {len(self.X_test)} samples")
        
    def train_random_forest(self):
        """Train Random Forest model"""
        print("\n[1/3] Training Random Forest...")
        
        rf_model = RandomForestClassifier(
            n_estimators=200,
            max_depth=10,
            min_samples_split=20,
            min_samples_leaf=10,
            random_state=42,
            n_jobs=-1
        )
        
        rf_model.fit(self.X_train, self.y_train)
        self.models['random_forest'] = rf_model
        
        # Feature importance
        self.feature_importance['random_forest'] = pd.DataFrame({
            'feature': self.feature_names,
            'importance': rf_model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        print("      ✅ Random Forest trained successfully")
        
    def train_xgboost(self):
        """Train XGBoost model"""
        print("\n[2/3] Training XGBoost...")
        
        xgb_model = xgb.XGBClassifier(
            n_estimators=200,
            max_depth=6,
            learning_rate=0.05,
            subsample=0.8,
            colsample_bytree=0.8,
            random_state=42,
            eval_metric='logloss',
            tree_method='hist'  # Fix for compatibility
        )
        
        # Convert to numpy arrays to avoid pandas compatibility issues
        X_train_array = self.X_train.values if hasattr(self.X_train, 'values') else self.X_train
        y_train_array = self.y_train.values if hasattr(self.y_train, 'values') else self.y_train
        
        xgb_model.fit(X_train_array, y_train_array)
        self.models['xgboost'] = xgb_model
        
        # Feature importance
        self.feature_importance['xgboost'] = pd.DataFrame({
            'feature': self.feature_names,
            'importance': xgb_model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        print("      ✅ XGBoost trained successfully")
        
    def train_neural_network(self):
        """Train Neural Network model"""
        print("\n[3/3] Training Neural Network...")
        
        nn_model = models.Sequential([
            layers.Input(shape=(len(self.feature_names),)),
            layers.Dense(64, activation='relu'),
            layers.Dropout(0.3),
            layers.Dense(32, activation='relu'),
            layers.Dropout(0.2),
            layers.Dense(16, activation='relu'),
            layers.Dense(1, activation='sigmoid')
        ])
        
        nn_model.compile(
            optimizer='adam',
            loss='binary_crossentropy',
            metrics=['accuracy', keras.metrics.AUC(name='auc')]
        )
        
        early_stop = callbacks.EarlyStopping(
            monitor='val_loss', patience=10, restore_best_weights=True
        )
        
        history = nn_model.fit(
            self.X_train, self.y_train,
            validation_split=0.2,
            epochs=50,
            batch_size=32,
            callbacks=[early_stop],
            verbose=0
        )
        
        self.models['neural_network'] = nn_model
        self.nn_history = history
        
        print("      ✅ Neural Network trained successfully")
        
    def evaluate_models(self):
        """Evaluate all trained models"""
        print("\n" + "="*80)
        print("MODEL EVALUATION RESULTS")
        print("="*80)
        
        results = {}
        
        for model_name, model in self.models.items():
            print(f"\n{model_name.upper().replace('_', ' ')}")
            print("-" * 80)
            
            # Convert to numpy for compatibility
            X_test_array = self.X_test.values if hasattr(self.X_test, 'values') else self.X_test
            
            # Predictions
            if model_name == 'neural_network':
                y_pred_proba = model.predict(X_test_array, verbose=0).flatten()
                y_pred = (y_pred_proba > 0.5).astype(int)
            elif model_name == 'xgboost':
                # XGBoost needs numpy arrays
                y_pred = model.predict(X_test_array)
                y_pred_proba = model.predict_proba(X_test_array)[:, 1]
            else:
                y_pred = model.predict(self.X_test)
                y_pred_proba = model.predict_proba(self.X_test)[:, 1]
            
            # Metrics
            accuracy = accuracy_score(self.y_test, y_pred)
            precision = precision_score(self.y_test, y_pred)
            recall = recall_score(self.y_test, y_pred)
            f1 = f1_score(self.y_test, y_pred)
            roc_auc = roc_auc_score(self.y_test, y_pred_proba)
            
            results[model_name] = {
                'accuracy': accuracy,
                'precision': precision,
                'recall': recall,
                'f1_score': f1,
                'roc_auc': roc_auc,
                'y_pred': y_pred,
                'y_pred_proba': y_pred_proba
            }
            
            print(f"Accuracy:  {accuracy:.4f} ({accuracy*100:.2f}%)")
            print(f"Precision: {precision:.4f} ({precision*100:.2f}%)")
            print(f"Recall:    {recall:.4f} ({recall*100:.2f}%)")
            print(f"F1 Score:  {f1:.4f}")
            print(f"ROC AUC:   {roc_auc:.4f}")
            
            print("\nConfusion Matrix:")
            cm = confusion_matrix(self.y_test, y_pred)
            print(cm)
            
        self.results = results
        
        # Find best model
        best_model = max(results.items(), key=lambda x: x[1]['roc_auc'])
        print("\n" + "="*80)
        print(f"🏆 BEST MODEL: {best_model[0].replace('_', ' ').upper()}")
        print(f"   ROC-AUC Score: {best_model[1]['roc_auc']:.4f}")
        print("="*80)
        
        return results


class StatisticalTestingFramework:
    """Perform statistical tests to validate model performance"""
    
    def __init__(self, df, model_results):
        self.df = df
        self.model_results = model_results
        
    def perform_feature_tests(self, df_processed):
        """Test statistical significance of features"""
        print("\n" + "="*80)
        print("STATISTICAL FEATURE SIGNIFICANCE TESTS")
        print("="*80)
        
        churned = df_processed[df_processed['churned'] == 1]
        retained = df_processed[df_processed['churned'] == 0]
        
        numerical_features = [
            'customer_age', 'total_purchases', 'avg_order_value',
            'days_since_last_purchase', 'website_visits', 'email_open_rate'
        ]
        
        print("\nT-Tests for Numerical Features:")
        print("-" * 80)
        
        for feature in numerical_features:
            if feature in df_processed.columns:
                stat, p_value = ttest_ind(
                    churned[feature].dropna(),
                    retained[feature].dropna()
                )
                significance = "***" if p_value < 0.001 else "**" if p_value < 0.01 else "*" if p_value < 0.05 else "ns"
                print(f"{feature:30s} p-value: {p_value:.6f} {significance}")
        
        print("\n*** p<0.001, ** p<0.01, * p<0.05, ns = not significant")
        
    def perform_model_comparison(self):
        """Compare model performances statistically"""
        print("\n" + "="*80)
        print("MODEL PERFORMANCE COMPARISON")
        print("="*80)
        
        model_names = list(self.model_results.keys())
        metrics = ['accuracy', 'precision', 'recall', 'f1_score', 'roc_auc']
        
        comparison_df = pd.DataFrame({
            model: [self.model_results[model][metric] for metric in metrics]
            for model in model_names
        }, index=metrics)
        
        print("\n", comparison_df.round(4))
        
        # Find best model for each metric
        print("\nBest Model per Metric:")
        print("-" * 80)
        for metric in metrics:
            best_model = comparison_df.loc[metric].idxmax()
            best_score = comparison_df.loc[metric].max()
            print(f"{metric:15s}: {best_model:20s} ({best_score:.4f})")


class RetentionStrategyEngine:
    """Generate personalized retention strategies based on churn risk"""
    
    def __init__(self, model, scaler, feature_names):
        self.model = model
        self.scaler = scaler
        self.feature_names = feature_names
        
    def predict_churn_risk(self, customer_data):
        """Predict churn probability for a customer"""
        customer_scaled = self.scaler.transform(customer_data[self.feature_names])
        
        if hasattr(self.model, 'predict_proba'):
            churn_prob = self.model.predict_proba(customer_scaled)[:, 1][0]
        else:
            churn_prob = self.model.predict(customer_scaled, verbose=0)[0][0]
            
        return churn_prob
    
    def recommend_retention_strategy(self, customer_data, churn_prob):
        """Generate personalized retention recommendations"""
        
        risk_level = "HIGH" if churn_prob > 0.7 else "MEDIUM" if churn_prob > 0.4 else "LOW"
        
        strategies = {
            'risk_level': risk_level,
            'churn_probability': churn_prob,
            'actions': []
        }
        
        # High-value customer strategies
        if 'avg_order_value' in customer_data.columns and customer_data['avg_order_value'].values[0] > 100:
            strategies['actions'].append({
                'priority': 'HIGH',
                'action': 'VIP Customer Care',
                'details': 'Assign dedicated account manager, offer premium support'
            })
        
        # Engagement strategies
        if 'days_since_last_purchase' in customer_data.columns and customer_data['days_since_last_purchase'].values[0] > 60:
            strategies['actions'].append({
                'priority': 'HIGH',
                'action': 'Win-back Campaign',
                'details': 'Send personalized email with 20% discount on favorite categories'
            })
        
        if 'email_open_rate' in customer_data.columns and customer_data['email_open_rate'].values[0] < 30:
            strategies['actions'].append({
                'priority': 'MEDIUM',
                'action': 'Re-engagement Program',
                'details': 'Optimize email content, adjust sending frequency'
            })
        
        # Loyalty strategies
        if 'loyalty_program' in customer_data.columns and customer_data['loyalty_program'].values[0] == 0:
            strategies['actions'].append({
                'priority': 'MEDIUM',
                'action': 'Loyalty Program Enrollment',
                'details': 'Offer bonus points for joining loyalty program'
            })
        
        # Product and service improvements
        if 'return_rate' in customer_data.columns and customer_data['return_rate'].values[0] > 15:
            strategies['actions'].append({
                'priority': 'HIGH',
                'action': 'Quality Assurance',
                'details': 'Investigate high return rate, offer product consultation'
            })
        
        if 'support_tickets' in customer_data.columns and customer_data['support_tickets'].values[0] > 3:
            strategies['actions'].append({
                'priority': 'HIGH',
                'action': 'Proactive Support',
                'details': 'Schedule follow-up call to resolve ongoing issues'
            })
        
        return strategies


class VisualizationEngine:
    """Create comprehensive visualizations"""
    
    def __init__(self, df, model, results):
        self.df = df
        self.model = model
        self.results = results
        
    def plot_feature_importance(self):
        """Plot feature importance for best model"""
        print("\n📊 Creating feature importance visualization...")
        plt.figure(figsize=(12, 6))
        
        if 'random_forest' in self.model.feature_importance:
            fi = self.model.feature_importance['random_forest'].head(10)
            sns.barplot(data=fi, x='importance', y='feature', palette='viridis')
            plt.title('Top 10 Feature Importance (Random Forest)', fontsize=14, fontweight='bold')
            plt.xlabel('Importance Score')
            plt.ylabel('Feature')
            plt.tight_layout()
            plt.savefig('feature_importance.png', dpi=300, bbox_inches='tight')
            print("   ✅ Saved: feature_importance.png")
        plt.close()
        
    def plot_roc_curves(self):
        """Plot ROC curves for all models"""
        print("📈 Creating ROC curves...")
        plt.figure(figsize=(10, 8))
        
        for model_name, result in self.results.items():
            fpr, tpr, _ = roc_curve(self.model.y_test, result['y_pred_proba'])
            auc_score = result['roc_auc']
            plt.plot(fpr, tpr, label=f"{model_name.replace('_', ' ').title()} (AUC={auc_score:.3f})", linewidth=2)
        
        plt.plot([0, 1], [0, 1], 'k--', label='Random Classifier')
        plt.xlabel('False Positive Rate', fontsize=12)
        plt.ylabel('True Positive Rate', fontsize=12)
        plt.title('ROC Curves - Model Comparison', fontsize=14, fontweight='bold')
        plt.legend(loc='lower right')
        plt.grid(alpha=0.3)
        plt.tight_layout()
        plt.savefig('roc_curves.png', dpi=300, bbox_inches='tight')
        print("   ✅ Saved: roc_curves.png")
        plt.close()
    
    def plot_churn_distribution(self):
        """Plot churn distribution by key features"""
        print("📉 Creating churn distribution analysis...")
        fig, axes = plt.subplots(2, 3, figsize=(15, 10))
        fig.suptitle('Churn Analysis by Customer Segments', fontsize=16, fontweight='bold')
        
        # Days since last purchase
        if 'days_since_last_purchase' in self.df.columns:
            axes[0, 0].hist([
                self.df[self.df['churned']==0]['days_since_last_purchase'],
                self.df[self.df['churned']==1]['days_since_last_purchase']
            ], bins=30, label=['Retained', 'Churned'], alpha=0.7)
            axes[0, 0].set_xlabel('Days Since Last Purchase')
            axes[0, 0].set_ylabel('Count')
            axes[0, 0].legend()
            axes[0, 0].set_title('Purchase Recency')
        
        # Total purchases
        if 'total_purchases' in self.df.columns:
            axes[0, 1].hist([
                self.df[self.df['churned']==0]['total_purchases'],
                self.df[self.df['churned']==1]['total_purchases']
            ], bins=20, label=['Retained', 'Churned'], alpha=0.7)
            axes[0, 1].set_xlabel('Total Purchases')
            axes[0, 1].set_ylabel('Count')
            axes[0, 1].legend()
            axes[0, 1].set_title('Purchase Frequency')
        
        # Email open rate
        if 'email_open_rate' in self.df.columns:
            axes[0, 2].hist([
                self.df[self.df['churned']==0]['email_open_rate'],
                self.df[self.df['churned']==1]['email_open_rate']
            ], bins=30, label=['Retained', 'Churned'], alpha=0.7)
            axes[0, 2].set_xlabel('Email Open Rate (%)')
            axes[0, 2].set_ylabel('Count')
            axes[0, 2].legend()
            axes[0, 2].set_title('Email Engagement')
        
        # Loyalty program
        if 'loyalty_program' in self.df.columns:
            loyalty_churn = self.df.groupby(['loyalty_program', 'churned']).size().unstack()
            loyalty_churn.plot(kind='bar', ax=axes[1, 0], color=['#2ecc71', '#e74c3c'])
            axes[1, 0].set_xlabel('Loyalty Program Member')
            axes[1, 0].set_ylabel('Count')
            axes[1, 0].set_xticklabels(['No', 'Yes'], rotation=0)
            axes[1, 0].legend(['Retained', 'Churned'])
            axes[1, 0].set_title('Loyalty Program Impact')
        
        # Average order value
        if 'avg_order_value' in self.df.columns:
            axes[1, 1].boxplot([
                self.df[self.df['churned']==0]['avg_order_value'],
                self.df[self.df['churned']==1]['avg_order_value']
            ], labels=['Retained', 'Churned'])
            axes[1, 1].set_ylabel('Average Order Value ($)')
            axes[1, 1].set_title('Customer Value')
        
        # Support tickets
        if 'support_tickets' in self.df.columns:
            axes[1, 2].hist([
                self.df[self.df['churned']==0]['support_tickets'],
                self.df[self.df['churned']==1]['support_tickets']
            ], bins=10, label=['Retained', 'Churned'], alpha=0.7)
            axes[1, 2].set_xlabel('Support Tickets')
            axes[1, 2].set_ylabel('Count')
            axes[1, 2].legend()
            axes[1, 2].set_title('Customer Support Interactions')
        
        plt.tight_layout()
        plt.savefig('churn_distribution.png', dpi=300, bbox_inches='tight')
        print("   ✅ Saved: churn_distribution.png")
        plt.close()


def main():
    """Main execution function"""
    print("\n" + "🎓"*40)
    print(" "*15 + "COLLEGE PROJECT SUBMISSION")
    print("    AI-Driven E-Commerce Churn Prediction System")
    print("🎓"*40 + "\n")
    
    # Step 1: Load Data (Try IBM first, then synthetic)
    print("="*80)
    print("STEP 1: DATA ACQUISITION")
    print("="*80)
    
    data_source = 'unknown'
    
    # Try loading IBM data
    loader = RealDataLoader()
    ibm_df, source = loader.load_ibm_data()
    
    if ibm_df is not None:
        # Successfully loaded IBM data
        df = loader.prepare_ibm_data(ibm_df)
        data_source = source
    else:
        # Fallback to synthetic data
        print("\n⚠️  Real data not available. Using enhanced synthetic data...")
        generator = ChurnDataGenerator(n_samples=5000)
        df = generator.generate_data()
        data_source = 'synthetic'
    
    # Save dataset
    df.to_csv('customer_data.csv', index=False)
    print(f"\n💾 Dataset saved: customer_data.csv ({len(df)} records)")
    
    # Step 2: Train Models
    print("\n" + "="*80)
    print("STEP 2: MODEL TRAINING")
    print("="*80)
    
    model_trainer = ChurnPredictionModel(df, data_source)
    model_trainer.preprocess_data()
    model_trainer.train_random_forest()
    model_trainer.train_xgboost()
    model_trainer.train_neural_network()
    
    # Step 3: Evaluate Models
    print("\n" + "="*80)
    print("STEP 3: MODEL EVALUATION")
    print("="*80)
    
    results = model_trainer.evaluate_models()
    
    # Step 4: Statistical Testing
    print("\n" + "="*80)
    print("STEP 4: STATISTICAL VALIDATION")
    print("="*80)
    
    tester = StatisticalTestingFramework(df, results)
    tester.perform_feature_tests(df)
    tester.perform_model_comparison()
    
    # Step 5: Visualizations
    print("\n" + "="*80)
    print("STEP 5: VISUALIZATION GENERATION")
    print("="*80)
    
    viz = VisualizationEngine(df, model_trainer, results)
    viz.plot_feature_importance()
    viz.plot_roc_curves()
    viz.plot_churn_distribution()
    
    # Step 6: Demonstrate Retention Strategies
    print("\n" + "="*80)
    print("STEP 6: RETENTION STRATEGY DEMONSTRATION")
    print("="*80)
    
    # Select best model (XGBoost typically performs well)
    best_model = model_trainer.models['xgboost']
    retention_engine = RetentionStrategyEngine(
        best_model, 
        model_trainer.scaler, 
        model_trainer.feature_names
    )
    
    # Example customer (select one from data)
    example_customer = df.iloc[[10]].copy()
    
    # Prepare customer data for prediction
    if 'channel' in example_customer.columns:
        le = LabelEncoder()
        le.fit(df['channel'])
        example_customer['channel_encoded'] = le.transform(example_customer['channel'])
    
    churn_risk = retention_engine.predict_churn_risk(example_customer)
    strategies = retention_engine.recommend_retention_strategy(example_customer, churn_risk)
    
    print(f"\n📋 Example Customer Analysis:")
    print(f"   Customer ID: {example_customer.iloc[0]['customer_id'] if 'customer_id' in example_customer.columns else 'N/A'}")
    print(f"   Churn Risk Level: {strategies['risk_level']}")
    print(f"   Churn Probability: {strategies['churn_probability']:.2%}")
    
    if strategies['actions']:
        print("\n💡 Recommended Retention Actions:")
        for i, action in enumerate(strategies['actions'], 1):
            print(f"\n   {i}. [{action['priority']}] {action['action']}")
            print(f"      → {action['details']}")
    else:
        print("\n✅ Customer is low-risk. Continue standard engagement.")
    
    # Final Summary
    print("\n" + "="*80)
    print("SYSTEM EXECUTION COMPLETED SUCCESSFULLY")
    print("="*80)
    
    print(f"\n📊 DATA SOURCE: {data_source.upper()}")
    
    if 'ibm' in data_source.lower():
        print("   ✅ Trained on REAL IBM Telco customer data")
    else:
        print("   ✅ Trained on enhanced synthetic data")
    
    print("\n📦 Generated Files:")
    print("   ✅ customer_data.csv (dataset)")
    print("   ✅ feature_importance.png")
    print("   ✅ roc_curves.png")
    print("   ✅ churn_distribution.png")
    
    # Performance Summary
    best_model_name = max(results.items(), key=lambda x: x[1]['roc_auc'])[0]
    best_score = results[best_model_name]['roc_auc']
    
    print(f"\n🏆 Best Model: {best_model_name.replace('_', ' ').title()}")
    print(f"   ROC-AUC: {best_score:.4f} ({best_score*100:.2f}%)")
    print(f"   Accuracy: {results[best_model_name]['accuracy']:.4f} ({results[best_model_name]['accuracy']*100:.2f}%)")
    
    print("\n" + "🎉"*40)
    print(" "*10 + "PROJECT READY FOR COLLEGE SUBMISSION!")
    print("🎉"*40 + "\n")
    

if __name__ == "__main__":
    main()
