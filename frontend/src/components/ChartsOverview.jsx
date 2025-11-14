import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './ui/Card';

/**
 * Charts Overview Component - Modern card-based layout
 */
const ChartsOverview = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {charts.map((chart, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              hover={true}
              className="cursor-pointer h-full"
              onClick={() => setSelectedImage(chart)}
            >
              <h3 className="text-lg font-display font-semibold mb-4 text-text-primary">
                {chart.title}
              </h3>
              <div className="relative aspect-video bg-bg-card rounded-lg overflow-hidden mb-3">
                <img
                  src={chart.image}
                  alt={chart.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const placeholder = e.target.nextElementSibling;
                    if (placeholder) placeholder.style.display = 'flex';
                  }}
                />
                <div 
                  className="hidden items-center justify-center h-full text-center text-text-muted p-8"
                  style={{ display: 'none' }}
                >
                  <div>
                    <p className="text-text-secondary mb-2">Image not found</p>
                    <p className="text-sm text-text-muted">
                      Run the ML training script to generate charts
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-text-secondary text-sm">
                {chart.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedImage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-6xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute -top-12 right-0 text-text-primary hover:text-primary transition-colors"
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="bg-bg-card border border-border rounded-xl p-4">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  />
                  <p className="text-center mt-4 text-text-primary font-medium">
                    {selectedImage.title}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChartsOverview;
