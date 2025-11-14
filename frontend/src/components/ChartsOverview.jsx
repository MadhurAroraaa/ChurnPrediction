import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Dialog, 
  IconButton,
  DialogContent
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ChartsOverview = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const [imageTitle, setImageTitle] = useState('');

  const handleImageClick = (image, title) => {
    setSelectedImage(image);
    setImageTitle(title);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const charts = [
    {
      image: '/churn_distribution.png',
      title: 'Churn Distribution',
      description: 'Shows the distribution of churned vs retained customers'
    },
    {
      image: '/feature_importance.png',
      title: 'Feature Importance',
      description: 'Displays the most important features affecting churn'
    },
    {
      image: '/roc_curves.png',
      title: 'ROC Curves',
      description: 'Shows the performance of the churn prediction model'
    }
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {charts.map((chart, index) => (
          <Card 
            key={index}
            sx={{ 
              background: 'linear-gradient(135deg, rgba(17, 17, 17, 0.9) 0%, rgba(30, 30, 30, 0.9) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)'
              }
            }}
            onClick={() => handleImageClick(chart.image, chart.title)}
          >
            <CardContent className="p-6">
              <Typography variant="h6" className="mb-4 font-semibold text-lg">
                {chart.title}
              </Typography>
              <div className="relative aspect-video bg-gray-800/50 rounded-lg overflow-hidden">
                <img
                  src={chart.image}
                  alt={chart.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextSibling) {
                      e.target.nextSibling.style.display = 'flex';
                    }
                  }}
                />
                <div 
                  className="hidden items-center justify-center h-full text-center text-gray-500 p-8"
                  style={{ display: 'none' }}
                >
                  <div>
                    <p>Image not found</p>
                    <p className="text-sm mt-2">Run the ML training script to generate charts</p>
                  </div>
                </div>
              </div>
              <Typography variant="body2" className="mt-3 text-gray-400">
                {chart.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Image Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xl"
        fullWidth
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            maxWidth: '90vw',
            maxHeight: '90vh',
            width: 'auto',
            margin: 0,
            overflow: 'hidden'
          }
        }}
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            backdropFilter: 'blur(8px)'
          }
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'fixed',
            right: '24px',
            top: '24px',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            zIndex: 1500,
            width: '48px',
            height: '48px',
            backdropFilter: 'blur(4px)'
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent 
          sx={{ 
            p: 0, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%'
          }}
        >
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center p-4">
              <img
                src={selectedImage}
                alt={imageTitle}
                className="max-w-full max-h-[80vh] object-contain"
                style={{
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)'
                }}
              />
              <Typography 
                variant="h6" 
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm"
              >
                {imageTitle}
              </Typography>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChartsOverview;