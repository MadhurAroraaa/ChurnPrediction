import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Premium Navigation Bar with Haryana-themed accents
 */
const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Predictor' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/customer', label: 'Customer Analysis' },
  ];
  
  return (
    <nav className="border-b border-border/50 glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand with Haryana accent */}
          <Link to="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-2"
            >
              {/* Subtle Haryana accent dot */}
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary via-accent-haryana to-accent animate-pulse" />
              <span className="font-display font-bold text-lg gradient-text">
                Haryana Business Churn Predictor
              </span>
            </motion.div>
          </Link>
          
          {/* Navigation Items */}
          <div className="flex items-center gap-1">
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

