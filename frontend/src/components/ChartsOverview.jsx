import { Card, CardContent, Typography } from '@mui/material';

const ChartsOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card sx={{ 
        background: 'linear-gradient(135deg, rgba(17, 17, 17, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <CardContent className="p-6">
          <Typography variant="h6" className="mb-4 font-semibold text-lg">
            Churn Distribution
          </Typography>
          <img
            src="/churn_distribution.png"
            alt="Churn Distribution"
            className="w-full h-auto rounded-lg"
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = 'block';
              }
            }}
          />
          <div style={{ display: 'none' }} className="text-center text-gray-500 py-8">
            Image not found. Run the ML training script to generate charts.
          </div>
        </CardContent>
      </Card>

      <Card sx={{ 
        background: 'linear-gradient(135deg, rgba(17, 17, 17, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <CardContent className="p-6">
          <Typography variant="h6" className="mb-4 font-semibold text-lg">
            Feature Importance
          </Typography>
          <img
            src="/feature_importance.png"
            alt="Feature Importance"
            className="w-full h-auto rounded-lg"
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = 'block';
              }
            }}
          />
          <div style={{ display: 'none' }} className="text-center text-gray-500 py-8">
            Image not found. Run the ML training script to generate charts.
          </div>
        </CardContent>
      </Card>

      <Card sx={{ 
        background: 'linear-gradient(135deg, rgba(17, 17, 17, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <CardContent className="p-6">
          <Typography variant="h6" className="mb-4 font-semibold text-lg">
            ROC Curves
          </Typography>
          <img
            src="/roc_curves.png"
            alt="ROC Curves"
            className="w-full h-auto rounded-lg"
            onError={(e) => {
              e.target.style.display = 'none';
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = 'block';
              }
            }}
          />
          <div style={{ display: 'none' }} className="text-center text-gray-500 py-8">
            Image not found. Run the ML training script to generate charts.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsOverview;
