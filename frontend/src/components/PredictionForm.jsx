import { useState } from 'react';
import { TextField, Button, MenuItem, Card, CardContent, Typography } from '@mui/material';
import { predictChurn } from '../api/api';

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
      // Better error messages
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
    <Card className="w-full max-w-2xl mx-auto" sx={{ 
      background: 'linear-gradient(135deg, rgba(17, 17, 17, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      <CardContent className="p-8">
        <Typography 
          variant="h5" 
          component="h2" 
          className="mb-4 font-bold text-2xl"
          sx={{ 
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Customer Information
        </Typography>
        <Typography 
          variant="body2" 
          className="mb-8 text-gray-400"
          sx={{ fontSize: '0.95rem' }}
        >
          Enter your business customer data to predict churn risk. 
          Optimized for Haryana's retail, MSME, and service sectors.
        </Typography>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <TextField
              label="Average Order Value (Rs.)"
              name="avg_order_value"
              type="number"
              value={formData.avg_order_value}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ step: 0.01, min: 0 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
              }}
            />

            <TextField
              label="Total Purchases"
              name="total_purchases"
              type="number"
              value={formData.total_purchases}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ min: 0 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
              }}
            />

            <TextField
              label="Email Open Rate (%)"
              name="email_open_rate"
              type="number"
              value={formData.email_open_rate}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ step: 0.1, min: 0, max: 100 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
              }}
            />

            <TextField
              label="Days Since Last Purchase"
              name="days_since_last_purchase"
              type="number"
              value={formData.days_since_last_purchase}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ min: 0 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
              }}
            />

            <TextField
              label="Loyalty Program"
              name="loyalty_program"
              select
              value={formData.loyalty_program}
              onChange={handleChange}
              required
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
              }}
            >
              <MenuItem value={0}>No</MenuItem>
              <MenuItem value={1}>Yes</MenuItem>
            </TextField>

            <TextField
              label="Website Visits"
              name="website_visits"
              type="number"
              value={formData.website_visits}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ min: 0 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
              }}
            />

            <TextField
              label="Return Rate (%)"
              name="return_rate"
              type="number"
              value={formData.return_rate}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ step: 0.1, min: 0, max: 100 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
              }}
            />

            <TextField
              label="Support Tickets"
              name="support_tickets"
              type="number"
              value={formData.support_tickets}
              onChange={handleChange}
              required
              fullWidth
              inputProps={{ min: 0 }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
              }}
            />

            <TextField
              label="Channel"
              name="channel"
              select
              value={formData.channel}
              onChange={handleChange}
              required
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(59, 130, 246, 0.5)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#3b82f6',
                  },
                },
              }}
            >
              <MenuItem value="web">Web</MenuItem>
              <MenuItem value="mobile">Mobile</MenuItem>
              <MenuItem value="app">App</MenuItem>
            </TextField>
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg backdrop-blur-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            fullWidth
            disabled={loading}
            sx={{
              mt: 3,
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              background: loading 
                ? 'rgba(59, 130, 246, 0.5)' 
                : 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                boxShadow: '0 6px 30px rgba(59, 130, 246, 0.6)',
                transform: 'translateY(-2px)',
              },
              '&:disabled': {
                background: 'rgba(59, 130, 246, 0.3)',
              },
            }}
          >
            {loading ? 'Predicting...' : 'Predict Churn'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PredictionForm;
