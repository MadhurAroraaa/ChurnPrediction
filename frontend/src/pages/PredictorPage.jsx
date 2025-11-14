import { useState } from 'react';
import PredictionForm from '../components/PredictionForm';
import RiskCard from '../components/RiskCard';
import StrategyList from '../components/StrategyList';
import { Container, Typography, Box } from '@mui/material';

const PredictorPage = () => {
  const [prediction, setPrediction] = useState(null);

  const handlePrediction = (result) => {
    setPrediction(result);
  };

  return (
    <Container maxWidth="xl" className="py-12 px-6">
      <Typography 
        variant="h3" 
        component="h1" 
        className="mb-12 font-bold text-center"
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
        Customer Churn Predictor
      </Typography>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <PredictionForm onPrediction={handlePrediction} />
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

        {!prediction && (
          <Box className="flex items-center justify-center h-full min-h-[500px]">
            <div className="text-center">
              <Typography 
                variant="h6" 
                className="text-gray-400 mb-2"
                sx={{ fontSize: '1.25rem' }}
              >
                Ready to Predict
              </Typography>
              <Typography 
                variant="body2" 
                className="text-gray-500"
                sx={{ fontSize: '0.95rem' }}
              >
                Fill out the form and click "Predict Churn" to see results
              </Typography>
            </div>
          </Box>
        )}
      </div>
    </Container>
  );
};

export default PredictorPage;
