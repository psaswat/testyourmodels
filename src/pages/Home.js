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
        bgcolor: '#000',
        color: '#fff'
      }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: '#000', 
      color: '#fff',
      fontFamily: 'monospace'
    }}>
      {/* Header */}
      <Box sx={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        bgcolor: 'rgba(0,0,0,0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #333'
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
              letterSpacing: '2px'
            }}>
              TESTYOURMODELS
            </Typography>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2, alignItems: 'center' }}>
              {!isAuthenticated && (
                <Button 
                  sx={{ color: '#fff', textTransform: 'none' }}
                  onClick={() => setSignInOpen(true)}
                >
                  Sign In
                </Button>
              )}
              {isAuthenticated && (
                <Button 
                  sx={{ color: '#fff', textTransform: 'none' }}
                  onClick={() => navigate('/admin')}
                >
                  Admin
                </Button>
              )}
              <IconButton 
                onClick={toggleTheme}
                sx={{ color: '#fff' }}
              >
                {isDarkMode ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Box>

            <IconButton 
              onClick={toggleSidebar}
              sx={{ color: '#fff', display: { xs: 'block', md: 'none' } }}
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
            bgcolor: '#000',
            color: '#fff',
            width: 280,
          },
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={toggleSidebar} sx={{ color: '#fff' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {!isAuthenticated && (
              <ListItem onClick={() => { setSignInOpen(true); toggleSidebar(); }}>
                <ListItemText primary="Sign In" />
              </ListItem>
            )}
            {isAuthenticated && (
              <ListItem onClick={() => { navigate('/admin'); toggleSidebar(); }}>
                <ListItemText primary="Admin" />
              </ListItem>
            )}
            <ListItem onClick={() => { toggleTheme(); toggleSidebar(); }}>
              <ListItemText primary={isDarkMode ? "Light Mode" : "Dark Mode"} />
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
                textAlign: 'center'
              }}>
                FEATURED
              </Typography>
              
              {featuredPosts.map((featuredPost, index) => (
                <Paper 
                  key={featuredPost.id}
                  sx={{ 
                    bgcolor: '#111',
                    border: '1px solid #333',
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
                            bgcolor: '#333',
                            color: '#fff',
                            mb: 2,
                            fontFamily: 'monospace'
                          }}
                        />
                        <Typography variant="h4" sx={{ 
                          fontFamily: 'monospace',
                          letterSpacing: '1px',
                          mb: 2,
                          lineHeight: 1.2
                        }}>
                          {featuredPost.title}
                        </Typography>
                        <Typography variant="body1" sx={{ 
                          color: '#888',
                          mb: 3,
                          lineHeight: 1.6
                        }}>
                          {featuredPost.summary}
                        </Typography>
                        <Button 
                          variant="contained"
                          onClick={() => navigate(`/post/${featuredPost.id}`)}
                          sx={{ 
                            bgcolor: '#fff',
                            color: '#000',
                            fontFamily: 'monospace',
                            letterSpacing: '1px',
                            '&:hover': {
                              bgcolor: '#ccc'
                            }
                          }}
                        >
                          READ MORE
                        </Button>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box sx={{ height: 400, bgcolor: '#222' }}>
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
              textAlign: 'center'
            }}>
              RECENT
            </Typography>
            
            <Grid container spacing={3}>
              {historicalPosts.slice(0, 6).map((post, index) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <Card sx={{ 
                    bgcolor: '#111',
                    border: '1px solid #333',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: '#fff',
                      transform: 'translateY(-4px)'
                    }
                  }}
                  onClick={() => navigate(`/post/${post.id}`)}
                  >
                    <Box sx={{ height: 200, bgcolor: '#222' }}>
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
                          bgcolor: '#333',
                          color: '#fff',
                          mb: 2,
                          fontFamily: 'monospace'
                        }}
                      />
                      <Typography variant="h6" sx={{ 
                        fontFamily: 'monospace',
                        letterSpacing: '1px',
                        mb: 1,
                        lineHeight: 1.3
                      }}>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: '#888',
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
            borderTop: '1px solid #333',
            mt: 8
          }}>
            <Box sx={{ mb: 3 }}>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#fff',
                  color: '#fff',
                  fontFamily: 'monospace',
                  letterSpacing: '1px',
                  px: 3,
                  py: 1,
                  mr: 2,
                  '&:hover': {
                    borderColor: '#fff',
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
                onClick={() => navigate('/about')}
              >
                ABOUT
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#fff',
                  color: '#fff',
                  fontFamily: 'monospace',
                  letterSpacing: '1px',
                  px: 3,
                  py: 1,
                  mr: 2,
                  '&:hover': {
                    borderColor: '#fff',
                    bgcolor: 'rgba(255,255,255,0.1)'
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
                    borderColor: '#fff',
                    color: '#fff',
                    fontFamily: 'monospace',
                    letterSpacing: '1px',
                    px: 3,
                    py: 1,
                    '&:hover': {
                      borderColor: '#fff',
                      bgcolor: 'rgba(255,255,255,0.1)'
                    }
                  }}
                  onClick={() => navigate('/admin')}
                >
                  ADMIN
                </Button>
              )}
            </Box>
            <Typography variant="body2" sx={{ 
              color: '#888',
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