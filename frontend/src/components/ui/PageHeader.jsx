import { motion } from 'framer-motion';

/**
 * Premium Page Header
 */
const PageHeader = ({ title, description, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`text-center mb-12 relative ${className}`}
    >
      <div className="relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 gradient-text tracking-tight"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-text-secondary text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default PageHeader;

