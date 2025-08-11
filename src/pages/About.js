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

const About = () => {
  const theme = useTheme();

  return (
    <Box sx={{ 
      width: '100vw', 
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
      py: { xs: 2, sm: 3, md: 6 },
      px: { xs: 2, sm: 3, md: 4 }
    }}>
      <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
        <Box sx={{ textAlign: 'center', mb: { xs: 4, sm: 6 } }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.75rem' }
            }}
          >
            About Our Blog
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
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
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 600,
                  mb: 3,
                  fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
                }}
              >
                Our Mission
              </Typography>
              
              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  mb: 3,
                  fontSize: { xs: '0.875rem', sm: '1rem' }
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
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                From cutting-edge technology trends to sustainable living practices, from productivity insights to culinary adventures, 
                we cover a wide range of subjects that reflect the complexity and richness of modern life.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  fontSize: { xs: '0.875rem', sm: '1rem' }
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
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                textAlign: 'center',
                height: 'fit-content',
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
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 600,
                  fontSize: { xs: '1.25rem', sm: '1.5rem' }
                }}
              >
                Our Team
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  lineHeight: 1.6,
                  mb: 3,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
              >
                We are a passionate team of writers, designers, and creators dedicated to producing meaningful content 
                that resonates with our readers.
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Email sx={{ color: theme.palette.primary.main, fontSize: { xs: '1rem', sm: '1.2rem' } }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Email
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      hello@modernblog.com
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocationOn sx={{ color: theme.palette.primary.main, fontSize: { xs: '1rem', sm: '1.2rem' } }} />
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
                      Address
                    </Typography>
                    <Typography variant="body1" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
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
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              textAlign: 'center',
              mb: 4,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
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
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                    transition: 'transform 0.2s ease-in-out',
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
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 600,
                      fontSize: { xs: '1rem', sm: '1.25rem' }
                    }}
                  >
                    {category.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6, fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
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

