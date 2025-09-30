import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Typography,
  Box,
  Paper,
  Chip,
} from '@mui/material';
import TabbedMediaDisplay from '../components/TabbedMediaDisplay';
import { 
  getFeaturedPostFromFirestore, 
  getHistoricalPostsFromFirestore,
  getFeaturedPostLegacy,
  getHistoricalPostsLegacy
} from '../data/posts';

const Home = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [historicalPosts, setHistoricalPosts] = useState([]);
  const [dynamicContent, setDynamicContent] = useState('');

  // Update posts when the component mounts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        // Try Firestore first
        const featuredData = await getFeaturedPostFromFirestore();
        const historicalData = await getHistoricalPostsFromFirestore();
        
        // Filter out inactive posts
        const activeHistorical = (historicalData || []).filter(post => post.isActive !== false);
        
        // Set featured post only if it's active
        if (featuredData && featuredData.isActive !== false) {
          setSelectedPost(featuredData);
        } else if (activeHistorical.length > 0) {
          setSelectedPost(activeHistorical[0]);
        } else {
          setSelectedPost(null);
        }
        
        setHistoricalPosts(activeHistorical);
      } catch (error) {
        console.error('Error loading posts from Firestore:', error);
        // Fallback to static data
        setSelectedPost(getFeaturedPostLegacy());
        setHistoricalPosts(getHistoricalPostsLegacy());
      }
    };
    loadPosts();
  }, []);

  // Handle tag clicks
  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  // Handle post selection
  const handlePostSelect = (post) => {
    setSelectedPost(post);
    setSelectedTag(null);
  };

  // Handle content change from TabbedMediaDisplay
  const handleContentChange = useCallback((content) => {
    setDynamicContent(content);
  }, []);


  // Get posts to display based on selection
  const getPostsToDisplay = () => {
    // Always filter for active posts
    const activePosts = historicalPosts.filter(post => post.isActive !== false);
    
    if (selectedTag) {
      return activePosts.filter(post => 
        post.category === selectedTag || 
        post.tags?.includes(selectedTag)
      );
    }
    return activePosts;
  };

  const postsToDisplay = getPostsToDisplay();

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
      <Grid container spacing={3}>
        {/* Left Sidebar - Recent Posts */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            {/* Recent Posts */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                {selectedTag ? `${selectedTag} Posts` : 'Recent Posts'}
              </Typography>
              {postsToDisplay.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {postsToDisplay.map((post, index) => (
                    <Paper
                      key={post.id || index}
                      elevation={selectedPost?.id === post.id ? 3 : 1}
                      onClick={() => handlePostSelect(post)}
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        border: selectedPost?.id === post.id ? '2px solid' : '1px solid',
                        borderColor: selectedPost?.id === post.id ? 'primary.main' : 'divider',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 3,
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Chip
                          label={post.category}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                        <Typography variant="caption" color="text.secondary">
                          {new Date(post.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: 'bold',
                          lineHeight: 1.3,
                          mb: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          lineHeight: 1.4,
                        }}
                      >
                        {post.summary}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {selectedTag ? `No posts found in ${selectedTag}` : 'No posts available'}
                  </Typography>
                  {selectedTag && (
                    <Typography 
                      variant="body2" 
                      color="primary" 
                      sx={{ cursor: 'pointer', mt: 1 }}
                      onClick={() => handleTagClick(null)}
                    >
                      Show all posts
                    </Typography>
                  )}
                </Box>
              )}
            </Paper>

            {/* Tags Section */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Categories
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                <Chip 
                  label="All" 
                  onClick={() => handleTagClick(null)}
                  variant={selectedTag === null ? 'filled' : 'outlined'}
                  color={selectedTag === null ? 'primary' : 'default'}
                  sx={{ cursor: 'pointer' }}
                />
                {['Video', 'Music', 'Image', 'Deep Research', 'Reasoning'].map((tag) => (
                  <Chip 
                    key={tag} 
                    label={tag} 
                    onClick={() => handleTagClick(tag)}
                    variant={selectedTag === tag ? 'filled' : 'outlined'}
                    color={selectedTag === tag ? 'primary' : 'default'}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Paper>

            {/* Categories Sidebar */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Browse by Category
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <Box 
                  onClick={() => handleTagClick(null)}
                  sx={{ 
                    cursor: 'pointer', 
                    p: 1, 
                    borderRadius: 1,
                    '&:hover': { backgroundColor: 'action.hover' },
                    backgroundColor: selectedTag === null ? 'primary.light' : 'transparent'
                  }}
                >
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: selectedTag === null ? 'bold' : 'normal',
                      color: selectedTag === null ? 'primary.main' : 'text.primary'
                    }}
                  >
                    All Posts
                  </Typography>
                </Box>
                {[
                  { name: 'Video', count: 0 },
                  { name: 'Music', count: 0 },
                  { name: 'Image', count: 0 },
                  { name: 'Deep Research', count: 0 },
                  { name: 'Reasoning', count: 0 }
                ].map((category) => (
                  <Box 
                    key={category.name} 
                    onClick={() => handleTagClick(category.name)}
                    sx={{ 
                      cursor: 'pointer', 
                      p: 1, 
                      borderRadius: 1,
                      '&:hover': { backgroundColor: 'action.hover' },
                      backgroundColor: selectedTag === category.name ? 'primary.light' : 'transparent'
                    }}
                  >
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        fontWeight: selectedTag === category.name ? 'bold' : 'normal',
                        color: selectedTag === category.name ? 'primary.main' : 'text.primary'
                      }}
                    >
                      {category.name}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>

            {/* Popular Tags */}
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Popular Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {['Video', 'Music', 'Image', 'Deep Research', 'Reasoning'].map((tag) => (
                  <Chip 
                    key={tag} 
                    label={tag} 
                    size="small" 
                    onClick={() => handleTagClick(tag)}
                    variant={selectedTag === tag ? 'filled' : 'outlined'}
                    color={selectedTag === tag ? 'primary' : 'default'}
                    sx={{ cursor: 'pointer' }}
                  />
                ))}
              </Box>
            </Paper>
          </Box>
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} lg={8}>
          {/* Featured Post Section */}
          {selectedPost && (
            <Paper 
              elevation={3} 
              sx={{ 
                mb: 3, 
                overflow: 'hidden',
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
              }}
            >
              <Box sx={{ p: 3 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {selectedPost.title}
                </Typography>
                <Typography variant="h6" sx={{ mb: 2, opacity: 0.9 }}>
                  {selectedPost.summary}
                </Typography>
                
                {/* Media Display */}
                <Box sx={{ mb: 3 }}>
                  <TabbedMediaDisplay
                    mediaVersions={selectedPost.mediaVersions}
                    title={selectedPost.title}
                    onContentChange={handleContentChange}
                  />
                </Box>

                {/* Dynamic Content */}
                {dynamicContent && (
                  <Box sx={{ 
                    mt: 2, 
                    p: 2, 
                    backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                    borderRadius: 1,
                    backdropFilter: 'blur(10px)'
                  }}>
                    <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                      {dynamicContent}
                    </Typography>
                  </Box>
                )}

                {/* Post Meta */}
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                  <Chip 
                    label={selectedPost.category} 
                    size="small" 
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                      color: 'white',
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
                    }} 
                  />
                  <Chip 
                    label={new Date(selectedPost.date).toLocaleDateString()} 
                    size="small" 
                    sx={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                      color: 'white',
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
                    }} 
                  />
                </Box>
              </Box>
            </Paper>
          )}

          {/* No Posts Message */}
          {!selectedPost && historicalPosts.length === 0 && (
            <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h5" color="text.secondary" gutterBottom>
                Welcome to Your Blog
              </Typography>
              <Typography variant="body1" color="text.secondary">
                No posts yet. Sign in and create your first post in the Admin panel!
              </Typography>
            </Paper>
          )}

        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;