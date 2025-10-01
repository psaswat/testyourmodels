import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  useTheme,
} from '@mui/material';
import { Person, Email, LocationOn } from '@mui/icons-material';
import { useTheme as useThemeContext } from '../contexts/ThemeContext';

const About = () => {
  const theme = useTheme();
  const { isDarkMode } = useThemeContext();

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
            About Our Blog
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
            Sharing insights, stories, and perspectives on technology, lifestyle, and everything in between.
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
                Our Mission
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  mb: 3,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  color: isDarkMode ? '#ccc' : '#333',
                  fontFamily: 'monospace'
                }}
              >
                We believe in the power of thoughtful content to inspire, educate, and connect people from all walks of life. 
                Our blog serves as a platform for sharing diverse perspectives on topics that matter in today's rapidly evolving world.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  mb: 3,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  color: isDarkMode ? '#ccc' : '#333',
                  fontFamily: 'monospace'
                }}
              >
                From cutting-edge technology trends to sustainable living practices, from productivity insights to culinary adventures, 
                we cover a wide range of subjects that reflect the complexity and richness of modern life.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  color: isDarkMode ? '#ccc' : '#333',
                  fontFamily: 'monospace'
                }}
              >
                Our commitment is to deliver high-quality, well-researched content that not only informs but also encourages 
                readers to think critically and engage meaningfully with the world around them.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, sm: 3, md: 4 },
                border: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
                borderRadius: 2,
                textAlign: 'center',
                height: 'fit-content',
                bgcolor: isDarkMode ? '#111' : '#f7f7f7'
              }}
            >
              <Avatar
                sx={{
                  width: { xs: 80, sm: 100, md: 120 },
                  height: { xs: 80, sm: 100, md: 120 },
                  mx: 'auto',
                  mb: 3,
                  backgroundColor: theme.palette.primary.main,
                }}
              >
                <Person sx={{ fontSize: { xs: 40, sm: 50, md: 60 } }} />
              </Avatar>

              <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  fontSize: { xs: '1.1rem', sm: '1.3rem' }
                }}
              >
                Our Team
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1.6,
                  mb: 3,
                  fontSize: { xs: '0.8rem', sm: '0.9rem' },
                  color: isDarkMode ? '#aaa' : '#666',
                  fontFamily: 'monospace'
                }}
              >
                We are a passionate team of writers, designers, and creators dedicated to producing meaningful content 
                that resonates with our readers.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                  <LocationOn sx={{ color: theme.palette.primary.main, fontSize: { xs: '1rem', sm: '1.2rem' } }} />
                  <Box>
                    <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' }, color: isDarkMode ? '#888' : '#555', fontFamily: 'monospace' }}>
                      Address
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' }, fontFamily: 'monospace' }}>
                      San Francisco, CA
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 4, sm: 6 } }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              textAlign: 'center',
              mb: 4,
              fontSize: { xs: '1.3rem', sm: '1.6rem', md: '1.8rem' }
            }}
          >
            What We Cover
          </Typography>

          <Grid container spacing={3}>
            {[
              {
                title: 'Technology',
                description: 'Latest trends in web development, AI, and digital innovation.',
              },
              {
                title: 'Lifestyle',
                description: 'Sustainable living, wellness, and personal development.',
              },
              {
                title: 'Productivity',
                description: 'Time management, work-life balance, and efficiency tips.',
              },
              {
                title: 'Food & Culture',
                description: 'Culinary adventures and cultural exploration through food.',
              },
              {
                title: 'Health & Wellness',
                description: 'Mental health, digital wellness, and holistic well-being.',
              },
            ].map((category, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    height: '100%',
                    border: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
                    borderRadius: 2,
                    transition: 'transform 0.2s ease-in-out',
                    bgcolor: isDarkMode ? '#111' : '#f7f7f7',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h3"
                    gutterBottom
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      fontSize: { xs: '1rem', sm: '1.15rem' }
                    }}
                  >
                    {category.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ lineHeight: 1.6, fontSize: { xs: '0.8rem', sm: '0.9rem' }, color: isDarkMode ? '#aaa' : '#666', fontFamily: 'monospace' }}
                  >
                    {category.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default About;

