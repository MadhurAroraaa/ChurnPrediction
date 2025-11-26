import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

/**
 * Premium Navigation Bar with theme toggle
 */
const Navbar = ({ theme = 'dark', onToggleTheme = () => {} }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isLight = theme === 'light';
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const nav = document.querySelector('nav');
      if (isOpen && nav && !nav.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  
  const navItems = [
    { path: '/', label: 'Predictor' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/customer', label: 'Customer Analysis' },
  ];
  
  return (
    <nav className="border-b border-border/50 glass sticky top-0 z-50 bg-bg/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2"
            >
              <span className="font-display font-bold text-lg gradient-text">
                Churn Predictor
              </span>
            </motion.div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg"
                >
                  <span className={`
                    ${isActive 
                      ? 'text-text-primary' 
                      : 'text-text-secondary hover:text-text-primary'
                    }
                    transition-colors
                  `}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary rounded-full shadow-glow"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-gradient-subtle opacity-0 hover:opacity-100 transition-opacity"
                    />
                  )}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={onToggleTheme}
              aria-pressed={isLight}
              className="ml-3 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg transition-colors"
            >
              {isLight ? (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M21.75 15.5A9 9 0 1 1 10.2 2.3a7 7 0 0 0 11.55 13.2z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2" />
                  <path d="M12 20v2" />
                  <path d="M4.93 4.93l1.41 1.41" />
                  <path d="M17.66 17.66l1.41 1.41" />
                  <path d="M2 12h2" />
                  <path d="M20 12h2" />
                  <path d="M6.34 17.66l-1.41 1.41" />
                  <path d="M19.07 4.93l-1.41 1.41" />
                </svg>
              )}
              <span>{isLight ? 'Dark' : 'Light'} Mode</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-bg-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="pt-2 pb-3 space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={`mobile-${item.path}`}
                      to={item.path}
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        isActive
                          ? 'bg-bg-hover text-text-primary'
                          : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                <button
                  type="button"
                  onClick={() => {
                    onToggleTheme();
                    setIsOpen(false);
                  }}
                  className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-text-primary hover:bg-bg-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-bg"
                >
                  {isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

