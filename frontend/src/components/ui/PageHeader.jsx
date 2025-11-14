import { motion } from 'framer-motion';

/**
 * Premium Page Header with optional Haryana map silhouette
 */
const PageHeader = ({ title, description, showMap = false, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`text-center mb-12 relative ${className}`}
    >
      {/* Optional Haryana map silhouette (very subtle) */}
      {showMap && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.05, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-9xl font-bold text-primary/5 select-none">
            हरियाणा
          </div>
        </motion.div>
      )}
      
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

