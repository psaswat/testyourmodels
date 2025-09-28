import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  CircularProgress,
  IconButton,
  Divider,
  InputAdornment,
} from '@mui/material';
import { 
  Close, 
  Login, 
  Google, 
  Facebook,
  Visibility,
  VisibilityOff,
  Email,
  Lock
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const SignIn = ({ open, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const { signIn, signUp, signInWithGoogle, signInWithFacebook } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = isSignUp 
        ? await signUp(email, password, displayName)
        : await signIn(email, password);
        
      if (result.success) {
        onClose();
        resetForm();
      } else {
        setError(result.error || `${isSignUp ? 'Sign up' : 'Sign in'} failed`);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider) => {
    setError('');
    setLoading(true);

    try {
      const result = provider === 'google' 
        ? await signInWithGoogle()
        : await signInWithFacebook();
        
      if (result.success) {
        onClose();
        resetForm();
      } else {
        setError(result.error || `${provider} sign in failed`);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setDisplayName('');
    setError('');
    setIsSignUp(false);
    setShowPassword(false);
  };

  const handleClose = () => {
    if (!loading) {
      onClose();
      resetForm();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        pb: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Login color="primary" />
          <Typography variant="h6" component="div">
            {isSignUp ? 'Create Account' : 'Sign In'}
          </Typography>
        </Box>
        <IconButton 
          onClick={handleClose} 
          disabled={loading}
          size="small"
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {isSignUp 
              ? 'Create an account to access the admin panel and personalized features.'
              : 'Enter your credentials to access the admin panel and personalized features.'
            }
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Social Login Buttons */}
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              onClick={() => handleSocialSignIn('google')}
              disabled={loading}
              sx={{ 
                textTransform: 'none',
                borderColor: '#db4437',
                color: '#db4437',
                '&:hover': {
                  borderColor: '#c23321',
                  backgroundColor: 'rgba(219, 68, 55, 0.04)',
                },
              }}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Facebook />}
              onClick={() => handleSocialSignIn('facebook')}
              disabled={loading}
              sx={{ 
                textTransform: 'none',
                borderColor: '#4267B2',
                color: '#4267B2',
                '&:hover': {
                  borderColor: '#365899',
                  backgroundColor: 'rgba(66, 103, 178, 0.04)',
                },
              }}
            >
              Facebook
            </Button>
          </Box>

          <Divider sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary">
              or continue with email
            </Typography>
          </Divider>

          {/* Display Name Field (only for sign up) */}
          {isSignUp && (
            <TextField
              autoFocus
              margin="dense"
              label="Full Name"
              type="text"
              fullWidth
              variant="outlined"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              disabled={loading}
              required
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />
          )}

          <TextField
            autoFocus={!isSignUp}
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="dense"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Toggle between Sign In and Sign Up */}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <Button
                variant="text"
                size="small"
                onClick={() => setIsSignUp(!isSignUp)}
                disabled={loading}
                sx={{ ml: 1, textTransform: 'none' }}
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </Button>
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleClose} 
            disabled={loading}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || !email || !password || (isSignUp && !displayName)}
            startIcon={loading ? <CircularProgress size={16} /> : <Login />}
            sx={{ minWidth: 120 }}
          >
            {loading 
              ? (isSignUp ? 'Creating Account...' : 'Signing In...') 
              : (isSignUp ? 'Create Account' : 'Sign In')
            }
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SignIn;
