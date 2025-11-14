import { motion } from 'framer-motion';

/**
 * Premium Button component with gradients and Haryana accents
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false,
  loading = false,
  ...props 
}) => {
  const baseStyles = 'font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-primary text-white shadow-lg shadow-primary/30 hover:shadow-glow',
    secondary: 'bg-gradient-to-r from-accent to-accent-hover text-white shadow-lg shadow-accent/30 hover:shadow-accent/40',
    haryana: 'bg-gradient-to-r from-primary via-accent-haryana to-accent text-white shadow-lg shadow-primary/30 hover:shadow-glow',
    outline: 'border-2 border-border hover:border-primary text-text-primary hover:text-primary bg-transparent hover:bg-gradient-subtle',
    ghost: 'text-text-secondary hover:text-text-primary hover:bg-bg-card/50',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02, y: -1 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {/* Shine effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6 }}
      />
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </span>
    </motion.button>
  );
};

export default Button;

