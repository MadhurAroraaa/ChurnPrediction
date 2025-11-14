import { motion } from 'framer-motion';
import ChartsOverview from '../components/ChartsOverview';
import PageHeader from '../components/ui/PageHeader';
import AnimatedContainer from '../components/ui/AnimatedContainer';
import Container from '../components/ui/Container';
import Card from '../components/ui/Card';

/**
 * Dashboard Page - Premium analytics dashboard
 */
const DashboardPage = () => {
  return (
    <AnimatedContainer>
      <Container className="py-12 md:py-16">
        <PageHeader
          title="Haryana Business Analytics Dashboard"
          description="Comprehensive insights into customer churn patterns across Haryana's business ecosystem"
          showMap={true}
        />

        <ChartsOverview />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <Card className="bg-gradient-subtle border-primary/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
                >
                  <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </motion.div>
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-2">Note</h3>
                <p className="text-text-secondary leading-relaxed">
                  Charts are generated when you run the ML training script.
                  Place the generated PNG files (churn_distribution.png, feature_importance.png, roc_curves.png)
                  in the public folder to display them here.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </Container>
    </AnimatedContainer>
  );
};

export default DashboardPage;
