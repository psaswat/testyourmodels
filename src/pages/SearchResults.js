import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import PostCard from '../components/PostCard';
import { posts, searchPostsLegacy, searchPostsFromFirestore } from '../data/posts';

const SearchResults = () => {
  const theme = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState([]);

  const searchPosts = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const results = await searchPostsFromFirestore(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching posts:', error);
      // Fallback to static search
      const results = searchPostsLegacy(query);
      setSearchResults(results);
    }
  };

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    searchPosts(query);
  }, [searchParams]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    setSearchParams({ q: value });
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
    setSearchResults([]);
  };

  const getSearchStats = () => {
    if (!searchQuery) return null;
    return {
      total: searchResults.length,
      query: searchQuery,
    };
  };

  const stats = getSearchStats();

  return (
    <Box sx={{ 
      width: '100vw', 
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
      py: { xs: 2, sm: 3, md: 4 },
      px: { xs: 2, sm: 3, md: 4 }
    }}>
      <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
        {/* Search Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
              mb: 3,
            }}
          >
            Search Results
          </Typography>

          {/* Search Bar */}
          <Box sx={{ maxWidth: 600, mb: 3 }}>
            <TextField
              placeholder="Search posts..."
              value={searchQuery}
              onChange={handleSearchChange}
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: 2,
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                  '&.Mui-focused': {
                    backgroundColor: theme.palette.background.paper,
                  },
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.divider,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
                '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: theme.palette.primary.main,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'text.secondary', fontSize: 24 }} />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={handleClearSearch}
                      sx={{ color: 'text.secondary' }}
                    >
                      <Clear sx={{ fontSize: 20 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Search Stats */}
          {stats && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  mb: 1,
                }}
              >
                {stats.total === 0 ? (
                  `No results found for "${stats.query}"`
                ) : (
                  `${stats.total} result${stats.total === 1 ? '' : 's'} found for "${stats.query}"`
                )}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Search Results */}
        {searchQuery && (
          <Box>
            {searchResults.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, sm: 4 },
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  textAlign: 'center',
                }}
              >
                <Typography
                  variant="h5"
                  component="h2"
                  gutterBottom
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    fontSize: { xs: '1.25rem', sm: '1.5rem' },
                    mb: 2,
                  }}
                >
                  No posts found
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    mb: 3,
                  }}
                >
                  Try searching with different keywords or browse our recent posts below.
                </Typography>
                
                {/* Show recent posts as suggestions */}
                <Box sx={{ mt: 4 }}>
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
                    Recent Posts
                  </Typography>
                  <Grid container spacing={3}>
                    {posts.slice(0, 3).map((post) => (
                      <Grid item xs={12} sm={6} md={4} key={post.id}>
                        <PostCard post={post} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {searchResults.map((post) => (
                  <Grid item xs={12} sm={6} md={4} key={post.id}>
                    <PostCard post={post} />
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}

        {/* Default State - Show all posts */}
        {!searchQuery && (
          <Box>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                fontSize: { xs: '1.5rem', sm: '2rem' },
                mb: 3,
              }}
            >
              All Posts
            </Typography>
            <Grid container spacing={3}>
              {posts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                  <PostCard post={post} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default SearchResults;
