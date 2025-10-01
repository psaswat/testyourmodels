import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
} from '@mui/material';
import { Menu, Brightness4, Brightness7, AdminPanelSettings, Login } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useTheme as useThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import SearchBar from './SearchBar';
import SignIn from './SignIn';
import UserProfile from './UserProfile';

const Layout = ({ children }) => {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'Contact', path: '/contact' },
    ...(isAuthenticated ? [{ text: 'Admin', path: '/admin' }] : []),
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ 
      textAlign: 'center',
      bgcolor: isDarkMode ? '#000' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
      height: '100%'
    }}>
      <Typography variant="h6" sx={{ 
        my: 2,
        fontFamily: 'monospace',
        fontWeight: 'bold',
        letterSpacing: '2px'
      }}>
        TYM
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} component={Link} to={item.path}>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                color: '#fff',
                fontWeight: location.pathname === item.path ? 600 : 400,
                fontFamily: 'monospace',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const isNullSocietyHome = location.pathname === '/';

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      bgcolor: isDarkMode ? '#000' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
      fontFamily: 'monospace'
    }}>
      {!isNullSocietyHome && (
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backgroundColor: isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
          zIndex: 1200,
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 56, sm: 64 } }}>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <Menu />
            </IconButton>
          )}

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: '#fff',
              fontFamily: 'monospace',
              fontWeight: 'bold',
              letterSpacing: '2px',
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              mr: { xs: 2, sm: 4 },
              flexShrink: 0,
            }}
          >
            TYM
          </Typography>

          {/* Navigation Links - Always visible on desktop */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  sx={{
                    color: '#fff',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    px: 1.5,
                    py: 0.5,
                    minWidth: 'auto',
                    fontFamily: 'monospace',
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: '#fff',
                    },
                  }}
                >
                  {item.text === 'Admin' && <AdminPanelSettings sx={{ mr: 0.5, fontSize: 16 }} />}
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {/* Spacer to push search and theme toggle to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Search Bar, Auth, and Theme Toggle */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0 }}>
            {!isMobile && (
              <Box sx={{ width: 200, mr: 2 }}>
                <SearchBar />
              </Box>
            )}

            {/* Authentication Section */}
            {isAuthenticated ? (
              <UserProfile />
            ) : (
              <Button
                startIcon={<Login />}
                onClick={() => setSignInOpen(true)}
                sx={{
                  color: muiTheme.palette.text.primary,
                  textTransform: 'none',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: muiTheme.palette.action.hover,
                  },
                }}
              >
                Sign In
              </Button>
            )}
            
            <IconButton 
              onClick={toggleTheme} 
              sx={{ 
                color: muiTheme.palette.text.primary,
                '&:hover': {
                  backgroundColor: muiTheme.palette.action.hover,
                },
              }}
            >
              {isDarkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Toolbar>

        {/* Mobile Search Bar */}
        {isMobile && (
          <Box sx={{ px: 2, pb: 2 }}>
            <SearchBar />
          </Box>
        )}
      </AppBar>
      )}

      {!isNullSocietyHome && (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            backgroundColor: '#000',
            color: '#fff',
          },
        }}
      >
        {drawer}
      </Drawer>
      )}

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      {!isNullSocietyHome && (
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: isDarkMode ? '#000' : '#fff',
          borderTop: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ 
            color: isDarkMode ? '#888' : '#555',
            align: 'center',
            fontFamily: 'monospace',
            letterSpacing: '1px'
          }}>
            © 2024 TYM. All rights reserved.
          </Typography>
        </Container>
      </Box>
      )}

      {/* Sign In Dialog */}
      <SignIn 
        open={signInOpen} 
        onClose={() => setSignInOpen(false)} 
      />
    </Box>
  );
};

export default Layout;

