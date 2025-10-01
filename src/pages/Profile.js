import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Grid,
  Divider,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Edit,
  Save,
  Cancel,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useTheme as useThemeContext } from '../contexts/ThemeContext';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { isDarkMode } = useThemeContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await updateUser(formData);
      setIsEditing(false);
      setSnackbar({
        open: true,
        message: 'Profile updated successfully!',
        severity: 'success'
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to update profile. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
    });
    setIsEditing(false);
  };

  const handleSnackbarClose = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (!user) {
    return (
      <Box sx={{ 
        minHeight: '100vh',
        bgcolor: isDarkMode ? '#000' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="h6">Please sign in to view your profile.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: isDarkMode ? '#000' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
      py: { xs: 2, sm: 3, md: 6 }
    }}>
      <Container maxWidth="md">
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            mb: 4,
            fontFamily: isDarkMode ? 'monospace' : 'inherit',
            textAlign: 'center'
          }}
        >
          Profile
        </Typography>

        <Paper sx={{
          p: { xs: 3, md: 4 },
          bgcolor: isDarkMode ? '#111' : '#f7f7f7',
          border: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
          borderRadius: 2
        }}>
          {/* Profile Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              src={user.avatar}
              alt={user.name}
              sx={{
                width: 80,
                height: 80,
                mr: 3,
                border: `2px solid ${isDarkMode ? '#333' : '#e0e0e0'}`,
              }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography 
                variant="h4" 
                sx={{ 
                  fontWeight: 'bold',
                  fontFamily: isDarkMode ? 'monospace' : 'inherit',
                  mb: 1
                }}
              >
                {user.name}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: isDarkMode ? '#aaa' : '#666',
                  fontFamily: isDarkMode ? 'monospace' : 'inherit'
                }}
              >
                {user.email}
              </Typography>
            </Box>
            <Button
              variant={isEditing ? "contained" : "outlined"}
              startIcon={isEditing ? <Save /> : <Edit />}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
              sx={{
                borderColor: isDarkMode ? '#fff' : '#000',
                color: isDarkMode ? '#fff' : '#000',
                fontFamily: isDarkMode ? 'monospace' : 'inherit',
                '&:hover': {
                  borderColor: isDarkMode ? '#fff' : '#000',
                  bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'
                }
              }}
            >
              {isEditing ? 'Save' : 'Edit Profile'}
            </Button>
          </Box>

          <Divider sx={{ mb: 4, borderColor: isDarkMode ? '#333' : '#e0e0e0' }} />

          {/* Profile Form */}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: isDarkMode ? '#fff' : '#000',
                    '& fieldset': {
                      borderColor: isDarkMode ? '#333' : '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: isDarkMode ? '#fff' : '#000',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: isDarkMode ? '#fff' : '#000',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: isDarkMode ? '#aaa' : '#666',
                    '&.Mui-focused': {
                      color: isDarkMode ? '#fff' : '#000',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: isDarkMode ? '#fff' : '#000',
                    '& fieldset': {
                      borderColor: isDarkMode ? '#333' : '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: isDarkMode ? '#fff' : '#000',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: isDarkMode ? '#fff' : '#000',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: isDarkMode ? '#aaa' : '#666',
                    '&.Mui-focused': {
                      color: isDarkMode ? '#fff' : '#000',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                multiline
                rows={4}
                variant="outlined"
                placeholder="Tell us about yourself..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: isDarkMode ? '#fff' : '#000',
                    '& fieldset': {
                      borderColor: isDarkMode ? '#333' : '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: isDarkMode ? '#fff' : '#000',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: isDarkMode ? '#fff' : '#000',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: isDarkMode ? '#aaa' : '#666',
                    '&.Mui-focused': {
                      color: isDarkMode ? '#fff' : '#000',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>

          {/* Action Buttons */}
          {isEditing && (
            <Box sx={{ display: 'flex', gap: 2, mt: 4, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                startIcon={<Cancel />}
                onClick={handleCancel}
                sx={{
                  borderColor: isDarkMode ? '#fff' : '#000',
                  color: isDarkMode ? '#fff' : '#000',
                  fontFamily: isDarkMode ? 'monospace' : 'inherit',
                  '&:hover': {
                    borderColor: isDarkMode ? '#fff' : '#000',
                    bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'
                  }
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                sx={{
                  bgcolor: isDarkMode ? '#fff' : '#000',
                  color: isDarkMode ? '#000' : '#fff',
                  fontFamily: isDarkMode ? 'monospace' : 'inherit',
                  '&:hover': {
                    bgcolor: isDarkMode ? '#ccc' : '#333'
                  }
                }}
              >
                Save Changes
              </Button>
            </Box>
          )}
        </Paper>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity}
          sx={{ 
            bgcolor: isDarkMode ? '#111' : '#f7f7f7',
            color: isDarkMode ? '#fff' : '#000',
            border: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0'
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Profile;
