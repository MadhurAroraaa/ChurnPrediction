import { motion } from 'framer-motion';
import Card from './ui/Card';

/**
 * Risk Card Component - Displays churn probability and risk level
 */
const RiskCard = ({ churnProbability, riskLevel }) => {
  const getRiskConfig = () => {
    switch (riskLevel) {
      case 'HIGH':
        return {
          colorClass: 'text-risk-high',
          bgGradient: 'from-red-500/20 to-red-500/10',
          borderColor: 'border-red-500/30',
          progressColor: 'bg-gradient-to-r from-red-500 to-red-500/80',
          icon: (
            <svg className="w-12 h-12 text-risk-high" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          ),
        };
      case 'MEDIUM':
        return {
          colorClass: 'text-risk-medium',
          bgGradient: 'from-amber-500/20 to-amber-500/10',
          borderColor: 'border-amber-500/30',
          progressColor: 'bg-gradient-to-r from-amber-500 to-amber-500/80',
          icon: (
            <svg className="w-12 h-12 text-risk-medium" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ),
        };
      case 'LOW':
        return {
          colorClass: 'text-risk-low',
          bgGradient: 'from-emerald-500/20 to-emerald-500/10',
          borderColor: 'border-emerald-500/30',
          progressColor: 'bg-gradient-to-r from-emerald-500 to-emerald-500/80',
          icon: (
            <svg className="w-12 h-12 text-risk-low" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          ),
        };
      default:
        return {
          colorClass: 'text-text-secondary',
          bgGradient: 'from-gray-500/20 to-gray-500/10',
          borderColor: 'border-border',
          progressColor: 'bg-gradient-to-r from-gray-500 to-gray-500/80',
          icon: null,
        };
    }
  };

  const config = getRiskConfig();
  const percentage = (churnProbability * 100).toFixed(2);

  return (
    <Card className={`bg-gradient-to-br ${config.bgGradient} ${config.borderColor} glow`}>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-display font-semibold text-text-primary">
          Churn Risk Assessment
        </h3>
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          {config.icon}
        </motion.div>
      </div>

      <div className="mb-8">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className={`text-6xl md:text-7xl font-display font-bold mb-3 ${config.colorClass} drop-shadow-lg`}
        >
          {percentage}%
        </motion.div>
        <p className="text-text-secondary text-sm uppercase tracking-wider font-medium">
          Churn Probability
        </p>
      </div>

      {/* Premium Progress Bar */}
      <div className="mb-8">
        <div className="h-3 bg-bg-card/50 rounded-full overflow-hidden backdrop-blur-sm">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className={`h-full ${config.progressColor} rounded-full shadow-lg relative overflow-hidden`}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </div>
      </div>

      <div className="pt-4 border-t border-border/50">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`text-xl font-display font-bold uppercase tracking-wider ${config.colorClass}`}
        >
          Risk Level: {riskLevel}
        </motion.p>
      </div>
    </Card>
  );
};

export default RiskCard;
