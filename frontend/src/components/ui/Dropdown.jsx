import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Reusable Dropdown/Select component
 */
const Dropdown = ({ 
  label, 
  name,
  value,
  onChange,
  options = [],
  required = false,
  className = '',
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const selectedOption = options.find(opt => opt.value === value);
  
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label 
          htmlFor={name}
          className="block text-sm font-medium text-text-secondary mb-2"
        >
          {label}
          {required && <span className="text-risk-high ml-1">*</span>}
        </label>
      )}
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full px-4 py-2.5
          bg-bg-card border border-border rounded-lg
          text-text-primary text-left
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          transition-all duration-200
          flex items-center justify-between
          hover:border-border-hover
        "
        {...props}
      >
        <span>{selectedOption?.label || 'Select...'}</span>
        <svg 
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="
              absolute z-50 w-full mt-1
              bg-bg-card border border-border rounded-lg
              shadow-card-hover overflow-hidden
            "
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange({ target: { name, value: option.value } });
                  setIsOpen(false);
                }}
                className="
                  w-full px-4 py-2.5 text-left
                  text-text-primary hover:bg-primary/10
                  transition-colors duration-150
                  flex items-center gap-2
                "
              >
                {option.icon && <span>{option.icon}</span>}
                <span>{option.label}</span>
                {value === option.value && (
                  <svg className="w-4 h-4 ml-auto text-primary" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value} />
    </div>
  );
};

export default Dropdown;

