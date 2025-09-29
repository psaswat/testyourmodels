import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Typography,
  Box,
  Paper,
  Chip,
} from '@mui/material';
import PostCard from '../components/PostCard';
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
        setSelectedPost(featuredData);
        setHistoricalPosts(historicalData);
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
    if (selectedTag) {
      return historicalPosts.filter(post => 
        post.category === selectedTag || 
        post.tags?.includes(selectedTag)
      );
    }
    return historicalPosts;
  };

  const postsToDisplay = getPostsToDisplay();

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
      <Grid container spacing={3}>
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

          {/* Historical Posts */}
          {postsToDisplay.length > 0 && (
            <Box>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                {selectedTag ? `${selectedTag} Posts` : 'Recent Posts'}
              </Typography>
              <Grid container spacing={2}>
                {postsToDisplay.map((post, index) => (
                  <Grid item xs={12} sm={6} md={4} key={post.id || index}>
                    <PostCard 
                      post={post} 
                      onClick={() => handlePostSelect(post)}
                      isSelected={selectedPost?.id === post.id}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} lg={4}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            {/* Tags Section */}
            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                Categories
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
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
      </Grid>
    </Box>
  );
};

export default Home;