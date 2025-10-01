import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeContextProvider');
  }
  return context;
};

export const ThemeContextProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true; // default to dark for site aesthetic
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: { main: isDarkMode ? '#ffffff' : '#000000' },
      secondary: { main: isDarkMode ? '#888888' : '#555555' },
      text: {
        primary: isDarkMode ? '#ffffff' : '#111111',
        secondary: isDarkMode ? '#888888' : '#555555',
      },
      divider: isDarkMode ? '#333333' : '#e0e0e0',
      background: {
        default: isDarkMode ? '#000000' : '#ffffff',
        paper: isDarkMode ? '#111111' : '#f7f7f7',
      },
    },
    typography: {
      fontFamily: 'monospace',
      allVariants: { letterSpacing: '0.5px' },
      h1: { fontWeight: 700, letterSpacing: '2px' },
      h2: { fontWeight: 700, letterSpacing: '2px' },
      h3: { fontWeight: 700, letterSpacing: '2px' },
      h4: { fontWeight: 700 },
      h5: { fontWeight: 700 },
      h6: { fontWeight: 700 },
      body1: { color: isDarkMode ? '#cccccc' : '#333333' },
      body2: { color: isDarkMode ? '#aaaaaa' : '#555555' },
    },
    shape: { borderRadius: 8 },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: isDarkMode ? '#000000' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#111111',
          },
          '*': { boxSizing: 'border-box' },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? 'rgba(0,0,0,0.9)' : '#ffffff',
            borderBottom: `1px solid ${isDarkMode ? '#333333' : '#e0e0e0'}`,
            backdropFilter: 'blur(10px)'
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#111111' : '#f7f7f7',
            border: `1px solid ${isDarkMode ? '#333333' : '#e0e0e0'}`,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: 8,
            color: isDarkMode ? '#ffffff' : '#111111',
          },
          contained: {
            backgroundColor: isDarkMode ? '#ffffff' : '#111111',
            color: isDarkMode ? '#000000' : '#ffffff',
            '&:hover': {
              backgroundColor: isDarkMode ? '#e0e0e0' : '#333333',
            },
            '&:disabled': {
              backgroundColor: isDarkMode ? '#333333' : '#e0e0e0',
              color: isDarkMode ? '#666666' : '#999999',
            },
          },
          outlined: {
            borderColor: isDarkMode ? '#ffffff' : '#111111',
            color: isDarkMode ? '#ffffff' : '#111111',
            '&:hover': { 
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)', 
              borderColor: isDarkMode ? '#ffffff' : '#111111' 
            },
          },
          text: {
            color: isDarkMode ? '#ffffff' : '#111111',
            '&:hover': {
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)',
            },
          },
          containedError: {
            backgroundColor: '#d32f2f',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#b71c1c',
            },
            '&:disabled': {
              backgroundColor: isDarkMode ? '#4a1a1a' : '#ffebee',
              color: isDarkMode ? '#8d4a4a' : '#c62828',
            },
          },
          containedPrimary: {
            backgroundColor: isDarkMode ? '#ffffff' : '#111111',
            color: isDarkMode ? '#000000' : '#ffffff',
            '&:hover': {
              backgroundColor: isDarkMode ? '#e0e0e0' : '#333333',
            },
          },
          containedSecondary: {
            backgroundColor: isDarkMode ? '#888888' : '#666666',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: isDarkMode ? '#666666' : '#444444',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#111111' : '#ffffff',
            border: `1px solid ${isDarkMode ? '#333333' : '#e0e0e0'}`,
            boxShadow: 'none',
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: isDarkMode ? '#000000' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#111111',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#333333' : '#e0e0e0',
            color: isDarkMode ? '#ffffff' : '#111111',
          },
        },
      },
      MuiDivider: {
        styleOverrides: { root: { borderColor: isDarkMode ? '#333333' : '#e0e0e0' } },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#0a0a0a' : '#ffffff',
          },
        },
      },
    },
    custom: {
      colors: {
        border: isDarkMode ? '#333333' : '#e0e0e0',
        subtleText: isDarkMode ? '#888888' : '#555555',
      },
    },
  }), [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const value = { isDarkMode, toggleTheme, theme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

