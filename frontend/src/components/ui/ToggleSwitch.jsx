import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Toggle Switch Component with smooth animations
 */
const ToggleSwitch = ({ 
  isOn, 
  onToggle, 
  label = '',
  className = '' 
}) => {
  const [mounted, setMounted] = useState(false);
  
  // Ensure component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {label && <span className="text-sm font-medium text-text-secondary">{label}</span>}
        <div className="relative inline-flex h-6 w-12 items-center rounded-full bg-gray-300 dark:bg-gray-600">
          <span className="inline-block h-4 w-4 translate-x-1 rounded-full bg-white shadow-lg"></span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${label ? 'gap-2' : ''} ${className}`}>
      {label && (
        <span className="text-sm font-medium text-text-secondary whitespace-nowrap">
          {label}
        </span>
      )}
      <div className="flex items-center h-6">
        <button
          type="button"
          onClick={onToggle}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
            isOn ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
          }`}
          aria-pressed={isOn}
        >
          <motion.span
            className="absolute h-5 w-5 rounded-full bg-white shadow-md"
            style={{
              top: '50%',
              transform: 'translateY(-50%)',
              left: '0.125rem',
            }}
            initial={false}
            animate={{
              left: isOn ? 'calc(100% - 1.25rem + 0.125rem)' : '0.125rem',
            }}
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 30
          }}
        >
          <AnimatePresence mode="wait">
            {isOn ? (
              <motion.svg
                key="moon"
                className="h-3 w-3 text-primary absolute inset-0 m-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </motion.svg>
            ) : (
              <motion.svg
                key="sun"
                className="h-3 w-3 text-gray-500 absolute inset-0 m-auto"
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.span>
      </button>
        <span className="ml-2 text-sm font-medium text-text-tertiary w-10 text-right">
          {isOn ? 'Dark' : 'Light'}
        </span>
      </div>
    </div>
  );
};

export default ToggleSwitch;
