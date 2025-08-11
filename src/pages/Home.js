import React, { useState, useEffect, useCallback } from 'react';
import {
  Grid,
  Typography,
  Box,
  Paper,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import { PlayArrow } from '@mui/icons-material';
import PostCard from '../components/PostCard';
import { getFeaturedPost, getHistoricalPosts, posts } from '../data/posts';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const [selectedPost, setSelectedPost] = useState(getFeaturedPost());
  const [selectedTag, setSelectedTag] = useState(null);
  const [historicalPosts, setHistoricalPosts] = useState(getHistoricalPosts());
  const [userSelectedPost, setUserSelectedPost] = useState(false);

  // Function to refresh posts data without changing selected post
  const refreshPosts = useCallback(() => {
    // Only update historical posts, don't change the selected post if user has made a selection
    setHistoricalPosts(getHistoricalPosts());
    
    // Only update selected post if user hasn't manually selected one
    if (!userSelectedPost) {
      setSelectedPost(getFeaturedPost());
    }
  }, [userSelectedPost]);

  // Update posts when the component mounts
  useEffect(() => {
    setSelectedPost(getFeaturedPost());
    setHistoricalPosts(getHistoricalPosts());
  }, []);

  // Listen for storage events (when posts are added via admin)
  useEffect(() => {
    const handleStorageChange = () => {
      refreshPosts();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [userSelectedPost, refreshPosts]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Function to detect if the media is a video
  const isVideo = (mediaUrl) => {
    if (!mediaUrl) return false;
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.avi'];
    const videoDomains = ['youtube.com', 'youtu.be', 'vimeo.com', 'dailymotion.com'];
    
    // Check for video file extensions
    const hasVideoExtension = videoExtensions.some(ext => 
      mediaUrl.toLowerCase().includes(ext)
    );
    
    // Check for video domains
    const hasVideoDomain = videoDomains.some(domain => 
      mediaUrl.toLowerCase().includes(domain)
    );
    
    return hasVideoExtension || hasVideoDomain;
  };

  // Function to get YouTube video ID and thumbnail
  const getYouTubeThumbnail = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg`;
    }
    return null;
  };

  // Function to get Vimeo video thumbnail
  const getVimeoThumbnail = (url) => {
    const regExp = /vimeo\.com\/(\d+)/;
    const match = url.match(regExp);
    if (match) {
      // Note: Vimeo requires API call for thumbnails, so we'll use a placeholder
      return `https://vumbnail.com/${match[1]}.jpg`;
    }
    return null;
  };

  // Function to render media content
  const renderMedia = (mediaUrl, title) => {
    if (!mediaUrl) {
      return (
        <Box
          sx={{
            width: '100%',
            height: { xs: 280, sm: 350, md: 450 },
            backgroundColor: theme.palette.action.hover,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            No media available
          </Typography>
        </Box>
      );
    }

    if (isVideo(mediaUrl)) {
      // Handle YouTube videos
      if (mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be')) {
        const thumbnail = getYouTubeThumbnail(mediaUrl);
        return (
          <Box sx={{ position: 'relative', width: '100%' }}>
            <Box
              component="img"
              src={thumbnail || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop'}
              alt={title}
              sx={{
                width: '100%',
                height: { xs: 280, sm: 350, md: 450 },
                objectFit: 'cover',
                borderRadius: 2,
                cursor: 'pointer',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '50%',
                width: 80,
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  transform: 'translate(-50%, -50%) scale(1.1)',
                },
              }}
              onClick={() => window.open(mediaUrl, '_blank')}
            >
              <PlayArrow sx={{ fontSize: 40, color: 'white' }} />
            </Box>
          </Box>
        );
      }

      // Handle Vimeo videos
      if (mediaUrl.includes('vimeo.com')) {
        const thumbnail = getVimeoThumbnail(mediaUrl);
        return (
          <Box sx={{ position: 'relative', width: '100%' }}>
            <Box
              component="img"
              src={thumbnail || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop'}
              alt={title}
              sx={{
                width: '100%',
                height: { xs: 280, sm: 350, md: 450 },
                objectFit: 'cover',
                borderRadius: 2,
                cursor: 'pointer',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: '50%',
                width: 80,
                height: 80,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.9)',
                  transform: 'translate(-50%, -50%) scale(1.1)',
                },
              }}
              onClick={() => window.open(mediaUrl, '_blank')}
            >
              <PlayArrow sx={{ fontSize: 40, color: 'white' }} />
            </Box>
          </Box>
        );
      }

      // Handle direct video files
      if (mediaUrl.match(/\.(mp4|webm|ogg|mov|avi)$/i)) {
        return (
          <Box sx={{ position: 'relative', width: '100%' }}>
            <Box
              component="video"
              src={mediaUrl}
              controls
              sx={{
                width: '100%',
                height: { xs: 280, sm: 350, md: 450 },
                objectFit: 'cover',
                borderRadius: 2,
              }}
            />
          </Box>
        );
      }

      // Fallback for other video links
      return (
        <Box sx={{ position: 'relative', width: '100%' }}>
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop"
            alt={title}
            sx={{
              width: '100%',
              height: { xs: 280, sm: 350, md: 450 },
              objectFit: 'cover',
              borderRadius: 2,
              cursor: 'pointer',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              borderRadius: '50%',
              width: 80,
              height: 80,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.9)',
                transform: 'translate(-50%, -50%) scale(1.1)',
              },
            }}
            onClick={() => window.open(mediaUrl, '_blank')}
          >
            <PlayArrow sx={{ fontSize: 40, color: 'white' }} />
          </Box>
        </Box>
      );
    }

    // Handle regular images
    return (
      <Box
        component="img"
        src={mediaUrl}
        alt={title}
        sx={{
          width: '100%',
          height: { xs: 280, sm: 350, md: 450 },
          objectFit: 'cover',
          borderRadius: 2,
        }}
      />
    );
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setSelectedTag(null); // Clear tag selection when selecting a post
    setUserSelectedPost(true); // Mark that user has made a selection
  };

  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
    setUserSelectedPost(true); // Mark that user has made a selection
    
    // Find a post with this tag to display
    const taggedPost = posts.find(post => 
      post.category.toLowerCase() === tag.toLowerCase() ||
      post.content.toLowerCase().includes(tag.toLowerCase()) ||
      post.title.toLowerCase().includes(tag.toLowerCase())
    );
    if (taggedPost) {
      setSelectedPost(taggedPost);
    }
  };

  const getFilteredPosts = () => {
    if (!selectedTag) return historicalPosts;
    return historicalPosts.filter(post => 
      post.category.toLowerCase() === selectedTag.toLowerCase() ||
      post.content.toLowerCase().includes(selectedTag.toLowerCase()) ||
      post.title.toLowerCase().includes(selectedTag.toLowerCase())
    );
  };

  const filteredPosts = getFilteredPosts();

  if (isMobile) {
    return (
      <Box sx={{ 
        width: '100vw', 
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        py: { xs: 2, sm: 3 },
        px: { xs: 2, sm: 3 }
      }}>
        <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            sx={{ 
              mb: 4, 
              fontFamily: '"Playfair Display", serif',
              fontSize: { xs: '1.75rem', sm: '2.125rem' }
            }}
          >
            Featured Post
          </Typography>
          
          <Box sx={{ mb: 4 }}>
            <PostCard post={selectedPost} isFeatured={true} />
          </Box>

          <Typography 
            variant="h4" 
            component="h2" 
            gutterBottom 
            sx={{ 
              mb: 3, 
              fontFamily: '"Playfair Display", serif',
              fontSize: { xs: '1.5rem', sm: '2rem' }
            }}
          >
            Recent Posts
          </Typography>
          
          <Grid container spacing={3}>
            {filteredPosts.map((post) => (
              <Grid item xs={12} sm={6} key={post.id}>
                <PostCard post={post} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: '100vw', 
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
      py: { xs: 2, sm: 3, md: 4 },
      px: { xs: 2, sm: 3, md: 4 }
    }}>
      <Grid container spacing={3} sx={{ height: '100%', maxWidth: '100%' }}>
        {/* Left Sidebar - 2 columns on desktop, hidden on tablet */}
        {!isTablet && (
          <Grid item xs={12} md={2}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                height: 'fit-content',
                position: 'sticky',
                top: 100,
                backgroundColor: 'transparent',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
              }}
            >
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontFamily: '"Playfair Display", serif',
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  mb: 2
                }}
              >
                Recent Posts
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {historicalPosts.slice(0, 6).map((post) => (
                  <Box 
                    key={post.id} 
                    sx={{ 
                      cursor: 'pointer',
                      p: 1,
                      borderRadius: 1,
                      backgroundColor: selectedPost.id === post.id ? theme.palette.action.selected : 'transparent',
                      border: selectedPost.id === post.id ? `1px solid ${theme.palette.primary.main}` : 'transparent',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                    onClick={() => handlePostClick(post)}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: selectedPost.id === post.id ? 600 : 500,
                        lineHeight: 1.4,
                        fontSize: { xs: '0.8rem', md: '0.9rem' },
                        mb: 0.5,
                        color: selectedPost.id === post.id ? theme.palette.primary.main : 'inherit',
                      }}
                    >
                      {post.title}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.7rem', md: '0.8rem' },
                        display: 'block'
                      }}
                    >
                      {formatDate(post.date)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>
        )}

        {/* Main Content - 8 columns on desktop, 10 on tablet */}
        <Grid item xs={12} md={isTablet ? 10 : 8}>
          <Box sx={{ height: '100%' }}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              sx={{ 
                mb: 3, 
                fontFamily: '"Playfair Display", serif',
                fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' }
              }}
            >
              {selectedTag ? `${selectedTag} Posts` : 'Featured Post'}
            </Typography>
            
            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, sm: 4, md: 5 },
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                height: '100%',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                >
                  {formatDate(selectedPost.date)}
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                >
                  •
                </Typography>
                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                >
                  {selectedPost.category}
                </Typography>
              </Box>

              <Typography
                variant="h2"
                component="h1"
                gutterBottom
                sx={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 600,
                  lineHeight: 1.2,
                  mb: 3,
                  fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' }
                }}
              >
                {selectedPost.title}
              </Typography>

              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  mb: 4,
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                  fontSize: { xs: '1.1rem', sm: '1.3rem' }
                }}
              >
                {selectedPost.summary}
              </Typography>

              {/* Media Section - Image or Video */}
              <Box sx={{ mb: 4 }}>
                {renderMedia(selectedPost.image, selectedPost.title)}
              </Box>

              <Typography
                variant="body1"
                sx={{
                  lineHeight: 1.8,
                  whiteSpace: 'pre-line',
                  fontSize: { xs: '0.95rem', sm: '1.05rem' },
                  mb: 4,
                }}
              >
                {selectedPost.content}
              </Typography>

              {/* Tags Section */}
              <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    mb: 2,
                  }}
                >
                  Tags
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {['Technology', 'Lifestyle', 'Productivity', 'Food', 'Health', 'Design', 'Development'].map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onClick={() => handleTagClick(tag)}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: selectedTag === tag ? theme.palette.primary.main : theme.palette.action.hover,
                        color: selectedTag === tag ? 'white' : theme.palette.text.primary,
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        '&:hover': {
                          backgroundColor: selectedTag === tag ? theme.palette.primary.dark : theme.palette.action.selected,
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>

        {/* Right Sidebar - 2 columns on desktop, hidden on tablet */}
        {!isTablet && (
          <Grid item xs={12} md={2}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                height: 'fit-content',
                position: 'sticky',
                top: 100,
                backgroundColor: 'transparent',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
              }}
            >
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontFamily: '"Playfair Display", serif',
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  mb: 2
                }}
              >
                Categories
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  { name: 'Technology', count: 12 },
                  { name: 'Lifestyle', count: 8 },
                  { name: 'Productivity', count: 6 },
                  { name: 'Food', count: 4 },
                  { name: 'Health', count: 7 }
                ].map((category) => (
                  <Box 
                    key={category.name} 
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      cursor: 'pointer',
                      p: 1,
                      borderRadius: 1,
                      backgroundColor: selectedTag === category.name ? theme.palette.action.selected : 'transparent',
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                    onClick={() => handleTagClick(category.name)}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: '0.8rem', md: '0.9rem' },
                        fontWeight: selectedTag === category.name ? 600 : 500,
                        color: selectedTag === category.name ? theme.palette.primary.main : 'inherit',
                      }}
                    >
                      {category.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ 
                        fontSize: { xs: '0.7rem', md: '0.8rem' },
                        backgroundColor: theme.palette.action.hover,
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                      }}
                    >
                      {category.count}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontFamily: '"Playfair Display", serif',
                    fontSize: { xs: '1rem', md: '1.1rem' },
                    mb: 2
                  }}
                >
                  Popular Tags
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {['React', 'Design', 'Productivity', 'Tech', 'Lifestyle'].map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      onClick={() => handleTagClick(tag)}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: selectedTag === tag ? theme.palette.primary.main : theme.palette.action.hover,
                        color: selectedTag === tag ? 'white' : theme.palette.text.primary,
                        fontSize: { xs: '0.7rem', md: '0.8rem' },
                        '&:hover': {
                          backgroundColor: selectedTag === tag ? theme.palette.primary.dark : theme.palette.action.selected,
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Home;

