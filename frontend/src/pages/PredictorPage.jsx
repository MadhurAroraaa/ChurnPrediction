import { useState } from 'react';
import { motion } from 'framer-motion';
import PredictionForm from '../components/PredictionForm';
import RiskCard from '../components/RiskCard';
import StrategyList from '../components/StrategyList';
import PageHeader from '../components/ui/PageHeader';
import AnimatedContainer from '../components/ui/AnimatedContainer';
import Container from '../components/ui/Container';

/**
 * Predictor Page - Premium churn prediction interface
 */
const PredictorPage = () => {
  const [prediction, setPrediction] = useState(null);

  const handlePrediction = (result) => {
    setPrediction(result);
  };

  return (
    <AnimatedContainer>
      <Container className="py-12 md:py-16">
        <PageHeader
          title="Customer Churn Predictor"
          description="Empower your teams with AI-driven customer retention insights for every segment."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PredictionForm onPrediction={handlePrediction} />
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {prediction ? (
              <>
                <RiskCard
                  churnProbability={prediction.churn_probability}
                  riskLevel={prediction.risk_level}
                />
                <StrategyList actions={prediction.actions} />
              </>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[500px]">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className="mb-6"
                  >
                    <svg className="w-20 h-20 mx-auto text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-display font-semibold text-text-primary mb-3">
                    Ready to Predict
                  </h3>
                  <p className="text-text-secondary max-w-sm mx-auto">
                    Fill out the form and click "Predict Churn" to see AI-powered insights for your business.
                  </p>
                </motion.div>
              </div>
            )}
          </motion.div>
        </div>
      </Container>
    </AnimatedContainer>
  );
};

export default PredictorPage;
