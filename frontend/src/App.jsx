import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import PredictorPage from './pages/PredictorPage';
import DashboardPage from './pages/DashboardPage';
import CustomerAnalysisPage from './pages/CustomerAnalysisPage';
import Navbar from './components/layout/Navbar';

/**
 * Main App Component - Clean layout without Material UI
 */
function App() {
  const [showPopup, setShowPopup] = useState(true);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'light' ? 'light' : 'dark';
    }
    return 'dark';
  });

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('theme-light');
    } else {
      root.classList.remove('theme-light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };
  
  return (
    <Router>
      <div className="min-h-screen bg-bg text-text-primary relative">
        {/* Developer Notice Popup */}
        {showPopup && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative animate-fadeIn">
              <button
                onClick={closePopup}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-500/10 mb-4">
                  <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">Developer Notice</h3>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  The backend is hosted on a free service and may take 2-3 minutes to start up on the first request after a period of inactivity. Please be patient.
                </p>

                <button
                  onClick={closePopup}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02]"
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Background gradient overlay */}
        <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<PredictorPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/customer" element={<CustomerAnalysisPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
