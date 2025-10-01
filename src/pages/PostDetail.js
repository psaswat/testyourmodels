import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  Chip,
  IconButton,
  Breadcrumbs,
  Link,
  useTheme,
} from '@mui/material';
import {
  ArrowBack,
  Share,
  BookmarkBorder,
  Bookmark,
} from '@mui/icons-material';
import TabbedMediaDisplay from '../components/TabbedMediaDisplay';
import { getFeaturedPostsFromFirestore, getHistoricalPostsFromFirestore } from '../data/posts';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);

  const loadPost = useCallback(async () => {
    try {
      setLoading(true);
      const [featured, historical] = await Promise.all([
        getFeaturedPostsFromFirestore(),
        getHistoricalPostsFromFirestore()
      ]);
      
      // Combine all posts
      const allPosts = [...featured, ...(historical || [])];
      const foundPost = allPosts.find(p => p.id === id);
      
      if (foundPost) {
        setPost(foundPost);
      } else {
        // If not found, redirect to home
        navigate('/');
      }
    } catch (error) {
      console.error('Error loading post:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    loadPost();
  }, [loadPost]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.summary,
          url: url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(url);
        // You could add a toast notification here
      } catch (error) {
        console.log('Error copying to clipboard:', error);
      }
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // You could implement actual bookmarking logic here
  };

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: theme.palette.mode === 'dark' ? '#000' : '#f5f5f5'
      }}>
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

  if (!post) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: theme.palette.mode === 'dark' ? '#000' : '#f5f5f5'
      }}>
        <Typography variant="h6">Post not found</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: theme.palette.mode === 'dark' ? '#000' : '#f5f5f5',
      color: theme.palette.mode === 'dark' ? '#fff' : '#000'
    }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3, color: theme.palette.mode === 'dark' ? '#888' : '#666' }}>
          <Link 
            component="button" 
            variant="body2" 
            onClick={() => navigate('/')}
            sx={{ 
              color: theme.palette.mode === 'dark' ? '#888' : '#666',
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            Home
          </Link>
          <Typography variant="body2" color="text.secondary">
            {post.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {post.title}
          </Typography>
        </Breadcrumbs>

        {/* Back Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ 
            mb: 3,
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
            '&:hover': {
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)'
            }
          }}
        >
          Back to Home
        </Button>

        {/* Post Content */}
        <Paper sx={{ 
          p: { xs: 3, md: 6 },
          bgcolor: theme.palette.mode === 'dark' ? '#111' : '#fff',
          border: theme.palette.mode === 'dark' ? '1px solid #333' : '1px solid #e0e0e0',
          borderRadius: 2
        }}>
          {/* Post Header */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Chip 
                label={post.category} 
                sx={{ 
                  bgcolor: theme.palette.mode === 'dark' ? '#333' : theme.palette.primary.main,
                  color: '#fff',
                  fontFamily: theme.palette.mode === 'dark' ? 'monospace' : 'inherit'
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {new Date(post.date).toLocaleDateString()}
              </Typography>
            </Box>

            <Typography variant="h3" sx={{ 
              fontWeight: 'bold',
              mb: 2,
              lineHeight: 1.2,
              fontFamily: theme.palette.mode === 'dark' ? 'monospace' : 'inherit',
              letterSpacing: theme.palette.mode === 'dark' ? '1px' : 'normal'
            }}>
              {post.title}
            </Typography>

            <Typography variant="h6" sx={{ 
              color: theme.palette.mode === 'dark' ? '#888' : '#666',
              mb: 3,
              lineHeight: 1.6,
              fontFamily: theme.palette.mode === 'dark' ? 'monospace' : 'inherit'
            }}>
              {post.summary}
            </Typography>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
              <Button
                variant="outlined"
                startIcon={<Share />}
                onClick={handleShare}
                sx={{
                  borderColor: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
                  color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
                  fontFamily: theme.palette.mode === 'dark' ? 'monospace' : 'inherit',
                  '&:hover': {
                    borderColor: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)'
                  }
                }}
              >
                Share
              </Button>
              <IconButton
                onClick={handleBookmark}
                sx={{
                  color: bookmarked ? theme.palette.primary.main : theme.palette.text.secondary,
                  '&:hover': {
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.04)'
                  }
                }}
              >
                {bookmarked ? <Bookmark /> : <BookmarkBorder />}
              </IconButton>
            </Box>
          </Box>

          {/* Media Display */}
          <Box sx={{ mb: 4 }}>
            <TabbedMediaDisplay
              mediaVersions={post.mediaVersions}
              title={post.title}
            />
          </Box>

          {/* Post Content */}
          {post.content && (
            <Box sx={{ 
              mt: 4,
              '& p': {
                mb: 2,
                lineHeight: 1.6,
                fontFamily: theme.palette.mode === 'dark' ? 'monospace' : 'inherit'
              },
              '& h1, & h2, & h3, & h4, & h5, & h6': {
                fontFamily: theme.palette.mode === 'dark' ? 'monospace' : 'inherit',
                fontWeight: 'bold',
                mb: 2,
                mt: 3
              }
            }}>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </Box>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default PostDetail;
