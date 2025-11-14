/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Premium Design System with Haryana accents
        bg: {
          DEFAULT: '#0d0d0f',
          card: '#1a1a1d',
          elevated: '#242428',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.12)',
          glow: 'rgba(99, 102, 241, 0.3)',
        },
        // Primary: Modern Indigo (premium SaaS feel)
        primary: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
          light: '#818cf8',
          dark: '#4338ca',
        },
        // Accent: Purple (modern) + Haryana Green (subtle)
        accent: {
          DEFAULT: '#8b5cf6',
          hover: '#7c3aed',
          haryana: '#2e7d32', // Haryana green (use subtly)
        },
        // Haryana Heritage Colors (use VERY sparingly)
        heritage: {
          mustard: '#f4c430', // Use at 10-20% opacity only
          emerald: '#207a39', // Haryana green
          earth: '#6b4f2e', // Earth brown
        },
        text: {
          primary: '#ffffff',
          secondary: '#a3a3a3',
          muted: '#6b7280',
          accent: '#818cf8',
        },
        // Risk level colors (premium gradients)
        risk: {
          high: '#ef4444',
          medium: '#f59e0b',
          low: '#10b981',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
        'card-hover': '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.2)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'gradient-haryana': 'linear-gradient(135deg, #2e7d32 0%, #207a39 100%)',
        'gradient-subtle': 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
