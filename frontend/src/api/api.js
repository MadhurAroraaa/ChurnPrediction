import axios from 'axios';

// Fallback to production backend URL if environment variable is not set
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://churnprediction-rsrs.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout for Render free tier
});

export const predictChurn = async (customerData) => {
  try {
    const response = await api.post('/predict', customerData);
    return response.data;
  } catch (error) {
    console.error('Prediction error:', error);
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      throw new Error('Cannot connect to backend server. Please check if the backend is running and accessible.');
    }
    if (error.response) {
      throw new Error(error.response.data?.detail || error.response.data?.message || 'Prediction failed');
    }
    throw error;
  }
};

export const healthCheck = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check error:', error);
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      throw new Error('Backend server is not accessible. It may be sleeping (Render free tier) or not running. Please wait 30-60 seconds and try again.');
    }
    throw error;
  }
};

// Log current API configuration for debugging
console.log('API Base URL:', API_BASE_URL);

export default api;

