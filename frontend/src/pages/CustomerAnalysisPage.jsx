import { useState } from 'react';
import { motion } from 'framer-motion';
import { predictChurn } from '../api/api';
import RiskCard from '../components/RiskCard';
import StrategyList from '../components/StrategyList';
import PredictionForm from '../components/PredictionForm';
import PageHeader from '../components/ui/PageHeader';
import AnimatedContainer from '../components/ui/AnimatedContainer';
import Container from '../components/ui/Container';
import Dropdown from '../components/ui/Dropdown';

/**
 * Customer Analysis Page - Premium individual customer analysis
 */
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
    <AnimatedContainer>
      <Container className="py-12 md:py-16">
        <PageHeader
          title="Individual Customer Analysis"
          description="Analyze individual customers from your Haryana business database with personalized retention strategies"
          showMap={true}
        />

        <div className="mb-8">
          <Dropdown
            label="Select Customer ID"
            name="customer"
            value={selectedCustomer}
            onChange={(e) => {
              setSelectedCustomer(e.target.value);
              handleCustomerSelect(e.target.value);
            }}
            options={sampleCustomers.map(c => ({ value: c.id, label: c.name }))}
            className="max-w-md"
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 bg-risk-high/10 border border-risk-high/30 text-risk-high px-4 py-3 rounded-lg max-w-md"
            >
              {error}
            </motion.div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Form Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PredictionForm onPrediction={handleFormPrediction} />
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {loading ? (
              <div className="flex items-center justify-center h-full min-h-[500px]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-6"
                  />
                  <p className="text-text-secondary text-lg">Analyzing customer...</p>
                </motion.div>
              </div>
            ) : prediction ? (
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
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className="mb-6"
                  >
                    <svg className="w-20 h-20 mx-auto text-primary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-display font-semibold text-text-primary mb-3">
                    Select a Customer
                  </h3>
                  <p className="text-text-secondary max-w-sm mx-auto">
                    Select a customer from the dropdown or use the form to analyze a customer
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

export default CustomerAnalysisPage;
