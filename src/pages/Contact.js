import React, { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  useTheme,
  Alert,
  Snackbar,
  CircularProgress,
} from '@mui/material';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';
import { submitContactMessage } from '../services/contactService';
import { useTheme as useThemeContext } from '../contexts/ThemeContext';

const Contact = () => {
  const theme = useTheme();
  const { isDarkMode } = useThemeContext();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await submitContactMessage(formData);
      
      if (result.success) {
        setSnackbar({
          open: true,
          message: 'Thank you for your message! We\'ll get back to you soon.',
          severity: 'success',
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        console.error('Contact form error:', result);
        if (result.code === 'permission-denied') {
          setSnackbar({
            open: true,
            message: 'Database permissions not configured. Please contact the administrator.',
            severity: 'error',
          });
        } else {
          setSnackbar({
            open: true,
            message: `Error: ${result.error || 'Unknown error occurred'}`,
            severity: 'error',
          });
        }
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSnackbar({
        open: true,
        message: 'Sorry, there was an error sending your message. Please try again.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <Box sx={{ 
      width: '100vw', 
      minHeight: '100vh',
      backgroundColor: isDarkMode ? '#000' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
      py: { xs: 2, sm: 3, md: 6 },
      px: { xs: 2, sm: 3, md: 4 },
      fontFamily: 'monospace'
    }}>
      <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 6 } }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '2px',
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' }
            }}
          >
            Get in Touch
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: 700,
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.15rem' },
              color: isDarkMode ? '#888' : '#555',
              fontFamily: 'monospace'
            }}
          >
            Have a question or want to collaborate? We'd love to hear from you.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                border: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
                borderRadius: 2,
                bgcolor: isDarkMode ? '#111' : '#f7f7f7'
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '1.3rem', sm: '1.6rem', md: '1.8rem' }
                }}
              >
                Send us a Message
              </Typography>

              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fontSize: { xs: '0.875rem', sm: '1rem' }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fontSize: { xs: '0.875rem', sm: '1rem' }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fontSize: { xs: '0.875rem', sm: '1rem' }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      multiline
                      rows={6}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          fontSize: { xs: '0.875rem', sm: '1rem' }
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={loading}
                      startIcon={loading ? <CircularProgress size={20} /> : <Send />}
                      sx={{
                        py: { xs: 1, sm: 1.5 },
                        px: { xs: 3, sm: 4 },
                        fontSize: { xs: '1rem', sm: '1.1rem' },
                      }}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                border: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
                borderRadius: 2,
                height: 'fit-content',
                bgcolor: isDarkMode ? '#111' : '#f7f7f7'
              }}
            >
              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '1.1rem', sm: '1.3rem' }
                }}
              >
                Contact Information
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Email sx={{ color: theme.palette.primary.main, fontSize: { xs: '1rem', sm: '1.2rem' } }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, color: isDarkMode ? '#888' : '#555', fontFamily: 'monospace' }}>
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, fontFamily: 'monospace' }}>
                      hello@modernblog.com
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Phone sx={{ color: theme.palette.primary.main, fontSize: { xs: '1rem', sm: '1.2rem' } }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, color: isDarkMode ? '#888' : '#555', fontFamily: 'monospace' }}>
                      Phone
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, fontFamily: 'monospace' }}>
                      +1 (555) 123-4567
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocationOn sx={{ color: theme.palette.primary.main, fontSize: { xs: '1rem', sm: '1.2rem' } }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, color: isDarkMode ? '#888' : '#555', fontFamily: 'monospace' }}>
                      Address
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, fontFamily: 'monospace' }}>
                      123 Blog Street<br />
                      San Francisco, CA 94102
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mt: 4, pt: 3, borderTop: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0' }}>
                <Typography
                  variant="h6"
                  component="h4"
                  gutterBottom
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    fontSize: { xs: '1rem', sm: '1.15rem' }
                  }}
                >
                  Office Hours
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    lineHeight: 1.6,
                    fontSize: { xs: '0.8rem', sm: '0.9rem' },
                    color: '#aaa',
                    fontFamily: 'monospace'
                  }}
                >
                  Monday - Friday: 9:00 AM - 6:00 PM<br />
                  Saturday: 10:00 AM - 4:00 PM<br />
                  Sunday: Closed
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;

