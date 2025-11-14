import { Container, Typography } from '@mui/material';
import ChartsOverview from '../components/ChartsOverview';

const DashboardPage = () => {
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
        Analytics Dashboard
      </Typography>

      <ChartsOverview />

      <div className="mt-12 p-6 bg-blue-900/20 border border-blue-500/30 rounded-xl backdrop-blur-sm">
        <Typography variant="body2" className="text-gray-300 leading-relaxed">
          <strong className="text-blue-400">Note:</strong> Charts are generated when you run the ML training script.
          Place the generated PNG files (churn_distribution.png, feature_importance.png, roc_curves.png)
          in the public folder to display them here.
        </Typography>
      </div>
    </Container>
  );
};

export default DashboardPage;
