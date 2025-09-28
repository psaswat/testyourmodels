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
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Blog
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.text} component={Link} to={item.path}>
            <ListItemText 
              primary={item.text} 
              sx={{ 
                color: location.pathname === item.path ? muiTheme.palette.primary.main : 'inherit',
                fontWeight: location.pathname === item.path ? 600 : 400,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="sticky" 
        elevation={0}
        sx={{ 
          backgroundColor: muiTheme.palette.background.paper,
          borderBottom: `1px solid ${muiTheme.palette.divider}`,
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
              color: 'inherit',
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              mr: { xs: 2, sm: 4 },
              flexShrink: 0,
            }}
          >
            Blog
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
                    color: location.pathname === item.path 
                      ? muiTheme.palette.primary.main 
                      : muiTheme.palette.text.primary,
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    textTransform: 'none',
                    fontSize: '0.875rem',
                    px: 1.5,
                    py: 0.5,
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: muiTheme.palette.primary.main,
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
            backgroundColor: muiTheme.palette.background.paper,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: muiTheme.palette.background.paper,
          borderTop: `1px solid ${muiTheme.palette.divider}`,
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © 2024 Blog. All rights reserved.
          </Typography>
        </Container>
      </Box>

      {/* Sign In Dialog */}
      <SignIn 
        open={signInOpen} 
        onClose={() => setSignInOpen(false)} 
      />
    </Box>
  );
};

export default Layout;

