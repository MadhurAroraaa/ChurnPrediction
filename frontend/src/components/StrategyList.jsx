import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './ui/Card';

/**
 * Strategy List Component with accordion animation
 */
const StrategyList = ({ actions }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const getPriorityConfig = (priority) => {
    switch (priority) {
      case 'HIGH':
        return {
          colorClass: 'text-risk-high',
          bgClass: 'bg-red-500/20',
          borderClass: 'border-red-500',
        };
      case 'MEDIUM':
        return {
          colorClass: 'text-risk-medium',
          bgClass: 'bg-amber-500/20',
          borderClass: 'border-amber-500',
        };
      case 'LOW':
        return {
          colorClass: 'text-risk-low',
          bgClass: 'bg-emerald-500/20',
          borderClass: 'border-emerald-500',
        };
      default:
        return {
          colorClass: 'text-text-secondary',
          bgClass: 'bg-gray-500/20',
          borderClass: 'border-border',
        };
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'HIGH':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'MEDIUM':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      case 'LOW':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  if (!actions || actions.length === 0) {
    return (
      <Card>
        <p className="text-text-secondary">No specific retention strategies recommended.</p>
      </Card>
    );
  }

  return (
    <Card glow>
      <div className="mb-6">
        <h3 className="text-xl font-display font-semibold mb-2 gradient-text">
          Recommended Retention Strategies
        </h3>
        <p className="text-text-muted text-sm">
          Personalized actions to retain your customers.
        </p>
      </div>

      <div className="space-y-3">
        {actions.map((action, index) => {
          const isExpanded = expandedIndex === index;
          const config = getPriorityConfig(action.priority);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                border-l-4 rounded-r-xl overflow-hidden
                ${config.borderClass}
                glass hover:bg-bg-elevated/50
                transition-all duration-300
                ${isExpanded ? 'shadow-card-hover' : ''}
              `}
            >
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : index)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 hover:bg-bg-card/30 transition-colors rounded-r-xl"
              >
                <div className="flex items-center gap-3 flex-1">
                  <motion.span
                    animate={{ scale: isExpanded ? 1.1 : 1 }}
                    className={config.colorClass}
                  >
                    {getPriorityIcon(action.priority)}
                  </motion.span>
                  <span className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase ${config.bgClass} ${config.colorClass} shadow-sm`}>
                    {action.priority}
                  </span>
                  <span className="font-semibold text-text-primary text-base">
                    {action.action}
                  </span>
                </div>
                <motion.svg
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="w-5 h-5 text-text-secondary flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </button>
              
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pl-16 border-t border-border/30 pt-4">
                      <p className="text-text-secondary leading-relaxed text-sm">
                        {action.details}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
};

export default StrategyList;
