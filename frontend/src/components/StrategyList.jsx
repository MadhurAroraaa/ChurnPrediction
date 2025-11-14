import { Card, CardContent, Typography, Chip } from '@mui/material';
import { PriorityHigh, Warning, CheckCircle } from '@mui/icons-material';

const StrategyList = ({ actions }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH':
        return 'error';
      case 'MEDIUM':
        return 'warning';
      case 'LOW':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'HIGH':
        return <PriorityHigh />;
      case 'MEDIUM':
        return <Warning />;
      case 'LOW':
        return <CheckCircle />;
      default:
        return null;
    }
  };

  if (!actions || actions.length === 0) {
    return (
      <Card className="w-full" sx={{ 
        background: 'linear-gradient(135deg, rgba(17, 17, 17, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <CardContent>
          <Typography variant="body1" className="text-gray-400">
            No specific retention strategies recommended.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full" sx={{ 
      background: 'linear-gradient(135deg, rgba(17, 17, 17, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    }}>
      <CardContent className="p-8">
        <Typography 
          variant="h6" 
          component="h3" 
          className="mb-6 font-semibold text-xl"
          sx={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Recommended Retention Strategies
        </Typography>

        <div className="space-y-4">
          {actions.map((action, index) => (
            <div
              key={index}
              className="border-l-4 border-blue-500 pl-6 py-4 rounded-r-lg backdrop-blur-sm transition-all hover:bg-white/5"
              style={{
                borderLeftColor: action.priority === 'HIGH' 
                  ? '#ef4444' 
                  : action.priority === 'MEDIUM' 
                  ? '#eab308' 
                  : '#22c55e',
                background: 'rgba(255, 255, 255, 0.02)',
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <Chip
                  icon={getPriorityIcon(action.priority)}
                  label={action.priority}
                  color={getPriorityColor(action.priority)}
                  size="small"
                  sx={{
                    fontWeight: 600,
                    fontSize: '0.75rem',
                  }}
                />
                <Typography variant="subtitle1" className="font-semibold text-lg">
                  {action.action}
                </Typography>
              </div>
              <Typography variant="body2" className="text-gray-300 leading-relaxed">
                {action.details}
              </Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StrategyList;
