import { motion } from 'framer-motion';

/**
 * Premium Card component with glass effects and premium styling
 */
const Card = ({ children, className = '', hover = true, glow = false, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      className={`
        glass rounded-2xl p-6 md:p-8
        shadow-card transition-all duration-300
        ${hover ? 'hover:shadow-card-hover hover:border-border-hover' : ''}
        ${glow ? 'hover:shadow-glow' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;

