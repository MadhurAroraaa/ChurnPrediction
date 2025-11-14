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
  return (
    <Router>
      <div className="min-h-screen bg-bg text-text-primary relative">
        {/* Background gradient overlay */}
        <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        
        <Navbar />
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
