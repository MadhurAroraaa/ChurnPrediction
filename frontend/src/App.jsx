import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, createTheme, ThemeProvider } from '@mui/material';
import PredictorPage from './pages/PredictorPage';
import DashboardPage from './pages/DashboardPage';
import CustomerAnalysisPage from './pages/CustomerAnalysisPage';
import './App.css';

// Create dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
    },
    secondary: {
      main: '#8b5cf6',
    },
    background: {
      default: '#000000',
      paper: '#111111',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#111111',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 20px',
          fontWeight: 500,
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#111111',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.2)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5)',
          },
        },
      },
    },
  },
});

const Navigation = () => {
  const location = useLocation();

  return (
    <AppBar position="static" className="mb-8" elevation={0}>
      <Toolbar className="px-6">
        <Typography 
          variant="h6" 
          component="div" 
          className="flex-grow font-bold text-xl"
          sx={{ 
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Haryana Business Churn Prediction
        </Typography>
        <Button
          component={Link}
          to="/"
          sx={{
            color: location.pathname === '/' ? '#3b82f6' : '#a0a0a0',
            fontWeight: location.pathname === '/' ? 600 : 400,
            '&:hover': {
              color: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
            },
          }}
        >
          Predictor
        </Button>
        <Button
          component={Link}
          to="/dashboard"
          sx={{
            color: location.pathname === '/dashboard' ? '#3b82f6' : '#a0a0a0',
            fontWeight: location.pathname === '/dashboard' ? 600 : 400,
            '&:hover': {
              color: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
            },
          }}
        >
          Dashboard
        </Button>
        <Button
          component={Link}
          to="/customer"
          sx={{
            color: location.pathname === '/customer' ? '#3b82f6' : '#a0a0a0',
            fontWeight: location.pathname === '/customer' ? 600 : 400,
            '&:hover': {
              color: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
            },
          }}
        >
          Customer Analysis
        </Button>
      </Toolbar>
    </AppBar>
  );
};

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <div className="min-h-screen bg-black text-white">
          <Navigation />
          <Routes>
            <Route path="/" element={<PredictorPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/customer" element={<CustomerAnalysisPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
