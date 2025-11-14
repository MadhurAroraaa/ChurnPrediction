import { useState } from 'react';
import { predictChurn } from '../api/api';
import Card from './ui/Card';
import Button from './ui/Button';
import InputField from './ui/InputField';
import Dropdown from './ui/Dropdown';

/**
 * Prediction Form Component - Clean Tailwind implementation
 */
const PredictionForm = ({ onPrediction }) => {
  const [formData, setFormData] = useState({
    avg_order_value: 50.0,
    total_purchases: 5,
    email_open_rate: 50.0,
    days_since_last_purchase: 30,
    loyalty_program: 0,
    website_visits: 15,
    return_rate: 10.0,
    support_tickets: 1,
    channel: 'web',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'loyalty_program' || name === 'total_purchases' || name === 'website_visits' || name === 'support_tickets'
        ? parseInt(value) || 0
        : name === 'channel'
        ? value
        : parseFloat(value) || 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const prediction = await predictChurn(formData);
      onPrediction(prediction);
    } catch (err) {
      let errorMessage = 'Failed to predict churn. ';
      if (err.message) {
        errorMessage += err.message;
      } else if (err.response?.data?.detail) {
        errorMessage += err.response.data.detail;
      } else {
        errorMessage += 'Please check if the backend server is running and try again.';
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto glow">
      <div className="mb-8">
        <h2 className="text-2xl font-display font-bold mb-3 gradient-text">
          Customer Information
        </h2>
        <p className="text-text-secondary text-sm leading-relaxed">
          Enter your business customer data to predict churn risk. 
          Optimized for Haryana's retail, MSME, and service sectors.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Average Order Value (Rs.)"
            name="avg_order_value"
            type="number"
            value={formData.avg_order_value}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
            helperText="Average amount per order in Indian Rupees"
          />

          <InputField
            label="Total Purchases"
            name="total_purchases"
            type="number"
            value={formData.total_purchases}
            onChange={handleChange}
            required
            min="0"
            helperText="Total number of purchases made"
          />

          <InputField
            label="Email Open Rate (%)"
            name="email_open_rate"
            type="number"
            value={formData.email_open_rate}
            onChange={handleChange}
            required
            step="0.1"
            min="0"
            max="100"
            helperText="Percentage of marketing emails opened"
          />

          <InputField
            label="Days Since Last Purchase"
            name="days_since_last_purchase"
            type="number"
            value={formData.days_since_last_purchase}
            onChange={handleChange}
            required
            min="0"
            helperText="Number of days since customer's last purchase"
          />

          <Dropdown
            label="Loyalty Program"
            name="loyalty_program"
            value={formData.loyalty_program}
            onChange={handleChange}
            required
            options={[
              { value: 0, label: 'No' },
              { value: 1, label: 'Yes' },
            ]}
            className="md:col-span-1"
          />

          <InputField
            label="Website Visits"
            name="website_visits"
            type="number"
            value={formData.website_visits}
            onChange={handleChange}
            required
            min="0"
            helperText="Total number of website visits"
          />

          <InputField
            label="Return Rate (%)"
            name="return_rate"
            type="number"
            value={formData.return_rate}
            onChange={handleChange}
            required
            step="0.1"
            min="0"
            max="100"
            helperText="Percentage of products returned"
          />

          <InputField
            label="Support Tickets"
            name="support_tickets"
            type="number"
            value={formData.support_tickets}
            onChange={handleChange}
            required
            min="0"
            helperText="Number of customer support tickets raised"
          />

          <Dropdown
            label="Channel"
            name="channel"
            value={formData.channel}
            onChange={handleChange}
            required
            options={[
              { value: 'web', label: 'Web' },
              { value: 'mobile', label: 'Mobile' },
              { value: 'app', label: 'App' },
            ]}
            className="md:col-span-2"
          />
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-risk-high/10 border border-risk-high/30 text-risk-high px-4 py-3 rounded-xl"
          >
            {error}
          </motion.div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={loading}
          loading={loading}
          className="w-full mt-8"
        >
          {loading ? 'Predicting...' : 'Predict Churn'}
        </Button>
      </form>
    </Card>
  );
};

export default PredictionForm;
