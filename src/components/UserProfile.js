import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  Avatar,
  IconButton,
  Typography,
  Box,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  AdminPanelSettings,
  Logout,
  Person,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    // Navigate to profile page (you can create this later)
    console.log('Navigate to profile');
  };

  const handleAdmin = () => {
    handleClose();
    navigate('/admin');
  };

  const handleSignOut = () => {
    handleClose();
    signOut();
  };

  if (!user) return null;

  return (
    <>
      <IconButton
        onClick={handleClick}
        sx={{
          p: 0,
          '&:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Avatar
          src={user.avatar}
          alt={user.name}
          sx={{
            width: 32,
            height: 32,
            border: '2px solid',
            borderColor: 'transparent',
            '&:hover': {
              borderColor: 'primary.main',
            },
          }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* User Info */}
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {user.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user.email}
          </Typography>
        </Box>

        <Divider />

        {/* Profile Menu Item */}
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>

        {/* Admin Menu Item */}
        <MenuItem onClick={handleAdmin}>
          <ListItemIcon>
            <AdminPanelSettings fontSize="small" />
          </ListItemIcon>
          <ListItemText>Admin Panel</ListItemText>
        </MenuItem>

        <Divider />

        {/* Sign Out Menu Item */}
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserProfile;
