import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  Chip,
  Card,
  CardContent,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { getFeaturedPostsFromFirestore, getHistoricalPostsFromFirestore } from '../data/posts';
import TabbedMediaDisplay from '../components/TabbedMediaDisplay';
import { useNavigate } from 'react-router-dom';
import { useTheme as useThemeContext } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import SignIn from '../components/SignIn';

const Home = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const { isAuthenticated } = useAuth();
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [historicalPosts, setHistoricalPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const [featured, historical] = await Promise.all([
        getFeaturedPostsFromFirestore(),
        getHistoricalPostsFromFirestore()
      ]);
      
      setFeaturedPosts(featured);
      setHistoricalPosts(historical);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: isDarkMode ? '#000' : '#fff',
        color: isDarkMode ? '#fff' : '#000'
      }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: isDarkMode ? '#000' : '#fff', 
      color: isDarkMode ? '#fff' : '#000',
      fontFamily: 'monospace'
    }}>
      {/* Header */}
      <Box sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        bgcolor: isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0'
      }}>
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            py: 2
          }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold',
              fontFamily: 'monospace',
              letterSpacing: '2px',
              color: isDarkMode ? '#fff' : '#000'
            }}>
              TESTYOURMODELS
            </Typography>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
              {!isAuthenticated && (
                <Button 
                  sx={{ 
                    color: isDarkMode ? '#fff' : '#000', 
                    textTransform: 'none' 
                  }}
                  onClick={() => setSignInOpen(true)}
                >
                  Sign In
                </Button>
              )}
              {isAuthenticated && (
                <Button 
                  sx={{ 
                    color: isDarkMode ? '#fff' : '#000', 
                    textTransform: 'none' 
                  }}
                  onClick={() => navigate('/admin')}
                >
                  Admin
                </Button>
              )}
              <IconButton 
                onClick={toggleTheme}
                sx={{ color: isDarkMode ? '#fff' : '#000' }}
              >
                {isDarkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>

            <IconButton 
              onClick={toggleSidebar}
              sx={{ 
                color: isDarkMode ? '#fff' : '#000', 
                display: { xs: 'block', md: 'none' } 
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Container>
      </Box>

      {/* Mobile Sidebar */}
      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={toggleSidebar}
        sx={{
          '& .MuiDrawer-paper': {
            bgcolor: isDarkMode ? '#000' : '#fff',
            color: isDarkMode ? '#fff' : '#000',
            width: 280,
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6" sx={{ color: isDarkMode ? '#fff' : '#000' }}>Menu</Typography>
            <IconButton onClick={toggleSidebar} sx={{ color: isDarkMode ? '#fff' : '#000' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {!isAuthenticated && (
              <ListItem onClick={() => { setSignInOpen(true); toggleSidebar(); }}>
                <ListItemText 
                  primary="Sign In" 
                  sx={{ color: isDarkMode ? '#fff' : '#000' }}
                />
              </ListItem>
            )}
            {isAuthenticated && (
              <ListItem onClick={() => { navigate('/admin'); toggleSidebar(); }}>
                <ListItemText 
                  primary="Admin" 
                  sx={{ color: isDarkMode ? '#fff' : '#000' }}
                />
              </ListItem>
            )}
            <ListItem onClick={() => { toggleTheme(); toggleSidebar(); }}>
              <ListItemText 
                primary={isDarkMode ? "Light Mode" : "Dark Mode"} 
                sx={{ color: isDarkMode ? '#fff' : '#000' }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ pt: 10 }}>
        <Container maxWidth="lg">

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <Box sx={{ mb: 8 }}>
              <Typography variant="h3" sx={{ 
                fontFamily: 'monospace',
                letterSpacing: '2px',
                mb: 4,
                textAlign: 'center',
                color: isDarkMode ? '#fff' : '#000'
              }}>
                FEATURED
              </Typography>
              
              {featuredPosts.map((featuredPost, index) => (
                <Paper 
                  key={featuredPost.id}
                  sx={{ 
                    bgcolor: isDarkMode ? '#111' : '#f7f7f7',
                    border: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
                    overflow: 'hidden',
                    position: 'relative',
                    mb: 4
                  }}
                >
                  <Grid container>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ p: 4 }}>
                        <Chip 
                          label={featuredPost.category} 
                          sx={{ 
                            bgcolor: isDarkMode ? '#333' : '#e0e0e0',
                            color: isDarkMode ? '#fff' : '#000',
                            mb: 2,
                            fontFamily: 'monospace'
                          }}
                        />
                        <Typography variant="h4" sx={{ 
                          fontFamily: 'monospace',
                          letterSpacing: '1px',
                          mb: 2,
                          lineHeight: 1.2,
                          color: isDarkMode ? '#fff' : '#000'
                        }}>
                          {featuredPost.title}
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          color: isDarkMode ? '#888' : '#555',
                          mb: 3,
                          lineHeight: 1.6
                        }}>
                          {featuredPost.summary}
                        </Typography>
                        <Button 
                          variant="contained"
                          onClick={() => navigate(`/post/${featuredPost.id}`)}
                          sx={{ 
                            bgcolor: isDarkMode ? '#fff' : '#000',
                            color: isDarkMode ? '#000' : '#fff',
                            fontFamily: 'monospace',
                            letterSpacing: '1px',
                            '&:hover': {
                              bgcolor: isDarkMode ? '#ccc' : '#333'
                            }
                          }}
                        >
                          READ MORE
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ height: 400, bgcolor: isDarkMode ? '#222' : '#f0f0f0' }}>
                        <TabbedMediaDisplay 
                          mediaVersions={featuredPost.mediaVersions}
                          title={featuredPost.title}
                          fallbackImage={featuredPost.image}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Box>
          )}

          {/* Recent Posts Grid */}
          <Box sx={{ mb: 8 }}>
            <Typography variant="h3" sx={{ 
              fontFamily: 'monospace',
              letterSpacing: '2px',
              mb: 4,
              textAlign: 'center',
              color: isDarkMode ? '#fff' : '#000'
            }}>
              RECENT
            </Typography>
            
            <Grid container spacing={3}>
              {historicalPosts.slice(0, 6).map((post, index) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <Card sx={{ 
                    bgcolor: isDarkMode ? '#111' : '#f7f7f7',
                    border: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: isDarkMode ? '#fff' : '#000',
                      transform: 'translateY(-4px)'
                    }
                  }}
                  onClick={() => navigate(`/post/${post.id}`)}
                  >
                    <Box sx={{ height: 200, bgcolor: isDarkMode ? '#222' : '#f0f0f0' }}>
                      <TabbedMediaDisplay 
                        mediaVersions={post.mediaVersions}
                        title={post.title}
                        fallbackImage={post.image}
                      />
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Chip 
                        label={post.category} 
                        size="small"
                        sx={{ 
                          bgcolor: isDarkMode ? '#333' : '#e0e0e0',
                          color: isDarkMode ? '#fff' : '#000',
                          mb: 2,
                          fontFamily: 'monospace'
                        }}
                      />
                      <Typography variant="h6" sx={{ 
                        fontFamily: 'monospace',
                        letterSpacing: '1px',
                        mb: 1,
                        lineHeight: 1.3,
                        color: isDarkMode ? '#fff' : '#000'
                      }}>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: isDarkMode ? '#888' : '#555',
                        lineHeight: 1.5
                      }}>
                        {post.summary}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Footer */}
          <Box sx={{ 
            textAlign: 'center', 
            py: 6,
            borderTop: isDarkMode ? '1px solid #333' : '1px solid #e0e0e0',
            mt: 8
          }}>
            <Box sx={{ mb: 3 }}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: isDarkMode ? '#fff' : '#000',
                  color: isDarkMode ? '#fff' : '#000',
                  fontFamily: 'monospace',
                  letterSpacing: '1px',
                  px: 3,
                  py: 1,
                  mr: 2,
                  '&:hover': {
                    borderColor: isDarkMode ? '#fff' : '#000',
                    bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'
                  }
                }}
                onClick={() => navigate('/about')}
              >
                ABOUT
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: isDarkMode ? '#fff' : '#000',
                  color: isDarkMode ? '#fff' : '#000',
                  fontFamily: 'monospace',
                  letterSpacing: '1px',
                  px: 3,
                  py: 1,
                  mr: 2,
                  '&:hover': {
                    borderColor: isDarkMode ? '#fff' : '#000',
                    bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'
                  }
                }}
                onClick={() => navigate('/contact')}
              >
                CONTACT
              </Button>
              {isAuthenticated && (
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: isDarkMode ? '#fff' : '#000',
                    color: isDarkMode ? '#fff' : '#000',
                    fontFamily: 'monospace',
                    letterSpacing: '1px',
                    px: 3,
                    py: 1,
                    '&:hover': {
                      borderColor: isDarkMode ? '#fff' : '#000',
                      bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)'
                    }
                  }}
                  onClick={() => navigate('/admin')}
                >
                  ADMIN
                </Button>
              )}
            </Box>
            <Typography variant="body2" sx={{ 
              color: isDarkMode ? '#888' : '#555',
              fontFamily: 'monospace',
              letterSpacing: '1px'
            }}>
              © TESTYOURMODELS 2025 All Rights Reserved
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Sign In Dialog */}
      <SignIn open={signInOpen} onClose={() => setSignInOpen(false)} />
    </Box>
  );
};

export default Home;