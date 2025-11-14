import { useState, useEffect } from 'react';
import { Container, Typography, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import { predictChurn } from '../api/api';
import RiskCard from '../components/RiskCard';
import StrategyList from '../components/StrategyList';
import PredictionForm from '../components/PredictionForm';

const CustomerAnalysisPage = () => {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Sample customer IDs (in real app, fetch from API)
  const sampleCustomers = [
    { id: '7590-VHVEG', name: 'Customer 7590-VHVEG' },
    { id: '5575-GNVDE', name: 'Customer 5575-GNVDE' },
    { id: '3668-QPYBK', name: 'Customer 3668-QPYBK' },
  ];

  const [selectedCustomer, setSelectedCustomer] = useState('');

  const handleCustomerSelect = async (customerId) => {
    if (!customerId) return;

    setLoading(true);
    setError(null);

    try {
      // In a real app, fetch customer data from API
      // For now, use default values
      const customerData = {
        avg_order_value: 50.0,
        total_purchases: 5,
        email_open_rate: 50.0,
        days_since_last_purchase: 30,
        loyalty_program: 0,
        website_visits: 15,
        return_rate: 10.0,
        support_tickets: 1,
        channel: 'web',
      };

      const result = await predictChurn(customerData);
      setPrediction(result);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to analyze customer');
    } finally {
      setLoading(false);
    }
  };

  const handleFormPrediction = (result) => {
    setPrediction(result);
  };

  return (
    <Container maxWidth="xl" className="py-12 px-6">
      <Typography 
        variant="h3" 
        component="h1" 
        className="mb-4 font-bold text-center"
        sx={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontSize: '3rem',
          fontWeight: 800,
          letterSpacing: '-0.02em',
        }}
      >
        Individual Customer Analysis
      </Typography>
      <Typography 
        variant="body1" 
        className="mb-12 text-center text-gray-400"
        sx={{ fontSize: '1.1rem', maxWidth: '800px', mx: 'auto' }}
      >
        Analyze individual customers from your Haryana business database with personalized retention strategies
      </Typography>

      <div className="mb-8 mt-10">
        <FormControl fullWidth className="mb-4" sx={{ mb: 3 }}>
          <InputLabel className="text-gray-400">Select Customer ID</InputLabel>
          <Select
            value={selectedCustomer}
            onChange={(e) => {
              setSelectedCustomer(e.target.value);
              handleCustomerSelect(e.target.value);
            }}
            label="Select Customer ID"
            sx={{
              color: 'white',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(255, 255, 255, 0.2)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(59, 130, 246, 0.5)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3b82f6',
              },
            }}
          >
            {sampleCustomers.map((customer) => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {error && (
          <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg backdrop-blur-sm mb-4">
            {error}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <PredictionForm onPrediction={handleFormPrediction} />
        </div>

        {prediction && (
          <div className="space-y-6">
            <RiskCard
              churnProbability={prediction.churn_probability}
              riskLevel={prediction.risk_level}
            />
            <StrategyList actions={prediction.actions} />
          </div>
        )}

        {!prediction && !loading && (
          <Box className="flex items-center justify-center h-full min-h-[500px]">
            <div className="text-center">
              <Typography 
                variant="h6" 
                className="text-gray-400 mb-2"
                sx={{ fontSize: '1.25rem' }}
              >
                Select a Customer
              </Typography>
              <Typography 
                variant="body2" 
                className="text-gray-500"
                sx={{ fontSize: '0.95rem' }}
              >
                Select a customer from the dropdown or use the form to analyze a customer
              </Typography>
            </div>
          </Box>
        )}

        {loading && (
          <Box className="flex items-center justify-center h-full min-h-[500px]">
            <Typography variant="body1" className="text-gray-400">
              Analyzing customer...
            </Typography>
          </Box>
        )}
      </div>
    </Container>
  );
};

export default CustomerAnalysisPage;
