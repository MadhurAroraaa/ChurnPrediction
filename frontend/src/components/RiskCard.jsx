import { Card, CardContent, Typography, LinearProgress } from '@mui/material';
import { Warning, CheckCircle, Error } from '@mui/icons-material';

const RiskCard = ({ churnProbability, riskLevel }) => {
  const getRiskColor = () => {
    switch (riskLevel) {
      case 'HIGH':
        return 'text-red-400';
      case 'MEDIUM':
        return 'text-yellow-400';
      case 'LOW':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  const getRiskIcon = () => {
    switch (riskLevel) {
      case 'HIGH':
        return <Error className="text-red-400 text-5xl" />;
      case 'MEDIUM':
        return <Warning className="text-yellow-400 text-5xl" />;
      case 'LOW':
        return <CheckCircle className="text-green-400 text-5xl" />;
      default:
        return null;
    }
  };

  const getProgressColor = () => {
    switch (riskLevel) {
      case 'HIGH':
        return 'error';
      case 'MEDIUM':
        return 'warning';
      case 'LOW':
        return 'success';
      default:
        return 'primary';
    }
  };

  const getGradient = () => {
    switch (riskLevel) {
      case 'HIGH':
        return 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(220, 38, 38, 0.1) 100%)';
      case 'MEDIUM':
        return 'linear-gradient(135deg, rgba(234, 179, 8, 0.2) 0%, rgba(202, 138, 4, 0.1) 100%)';
      case 'LOW':
        return 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(22, 163, 74, 0.1) 100%)';
      default:
        return 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(37, 99, 235, 0.1) 100%)';
    }
  };

  return (
    <Card className="w-full" sx={{ 
      background: getGradient(),
      border: `1px solid ${riskLevel === 'HIGH' ? 'rgba(239, 68, 68, 0.3)' : riskLevel === 'MEDIUM' ? 'rgba(234, 179, 8, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`,
    }}>
      <CardContent className="p-8">
        <div className="flex items-center justify-between mb-6">
          <Typography variant="h6" component="h3" className="font-semibold text-xl">
            Churn Risk Assessment
          </Typography>
          {getRiskIcon()}
        </div>

        <div className="mb-6">
          <Typography 
            variant="h3" 
            component="div" 
            className={`font-bold ${getRiskColor()} text-5xl mb-2`}
            sx={{
              textShadow: '0 2px 20px rgba(59, 130, 246, 0.3)',
            }}
          >
            {(churnProbability * 100).toFixed(2)}%
          </Typography>
          <Typography variant="body2" className="text-gray-400 text-sm uppercase tracking-wider">
            Churn Probability
          </Typography>
        </div>

        <LinearProgress
          variant="determinate"
          value={churnProbability * 100}
          color={getProgressColor()}
          className="h-3 rounded-full mb-6"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '& .MuiLinearProgress-bar': {
              borderRadius: '4px',
              boxShadow: `0 0 10px ${riskLevel === 'HIGH' ? 'rgba(239, 68, 68, 0.5)' : riskLevel === 'MEDIUM' ? 'rgba(234, 179, 8, 0.5)' : 'rgba(34, 197, 94, 0.5)'}`,
            },
          }}
        />

        <div className="mt-6">
          <Typography 
            variant="h6" 
            className={`font-bold ${getRiskColor()} text-xl`}
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Risk Level: {riskLevel}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskCard;
