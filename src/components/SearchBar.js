import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
  Fade,
  ClickAwayListener,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { posts } from '../data/posts';

const SearchBar = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const searchPosts = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = posts.filter(post => {
      const searchTerm = query.toLowerCase();
      return (
        post.title.toLowerCase().includes(searchTerm) ||
        post.summary.toLowerCase().includes(searchTerm) ||
        post.content.toLowerCase().includes(searchTerm) ||
        post.category.toLowerCase().includes(searchTerm)
      );
    });

    setSearchResults(results);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchPosts(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchQuery(value);
    setIsSearchOpen(true);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  const handleResultClick = (post) => {
    // Navigate to search results page with the post title as query
    navigate(`/search?q=${encodeURIComponent(post.title)}`);
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchOpen(false);
  };

  const handleSearchSubmit = (event) => {
    if (event.key === 'Enter' && searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  const handleClickAway = () => {
    setIsSearchOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: 'relative', width: '100%' }}>
        <TextField
          ref={searchRef}
          placeholder="Search posts..."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyPress={handleSearchSubmit}
          onFocus={() => setIsSearchOpen(true)}
          variant="outlined"
          size="small"
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
                <Search sx={{ color: 'text.secondary', fontSize: 20 }} />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={handleClearSearch}
                  sx={{ color: 'text.secondary' }}
                >
                  <Clear sx={{ fontSize: 18 }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Search Results Dropdown */}
        <Fade in={isSearchOpen && (searchQuery || searchResults.length > 0)}>
          <Paper
            elevation={8}
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 1300,
              mt: 1,
              maxHeight: 400,
              overflow: 'auto',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 2,
            }}
          >
            {searchQuery && searchResults.length === 0 ? (
              <Box sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  No posts found for "{searchQuery}"
                </Typography>
                <Typography 
                  variant="body2" 
                  color="primary" 
                  sx={{ mt: 1, cursor: 'pointer' }}
                  onClick={() => {
                    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                    setSearchQuery('');
                    setIsSearchOpen(false);
                  }}
                >
                  View all search results →
                </Typography>
              </Box>
            ) : searchResults.length > 0 ? (
              <List sx={{ py: 0 }}>
                {searchResults.map((post, index) => (
                  <ListItem
                    key={post.id}
                    button
                    onClick={() => handleResultClick(post)}
                    sx={{
                      borderBottom: index < searchResults.length - 1 ? `1px solid ${theme.palette.divider}` : 'none',
                      '&:hover': {
                        backgroundColor: theme.palette.action.hover,
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                            lineHeight: 1.3,
                          }}
                        >
                          {post.title}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
                          >
                            {formatDate(post.date)} • {post.category}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              fontSize: { xs: '0.8rem', sm: '0.875rem' },
                              lineHeight: 1.4,
                              mt: 0.5,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {post.summary}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
                {searchQuery && (
                  <ListItem
                    button
                    onClick={() => {
                      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
                      setSearchQuery('');
                      setIsSearchOpen(false);
                    }}
                    sx={{
                      borderTop: `1px solid ${theme.palette.divider}`,
                      backgroundColor: theme.palette.action.hover,
                      '&:hover': {
                        backgroundColor: theme.palette.action.selected,
                      },
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant="body2"
                          color="primary"
                          sx={{
                            fontWeight: 500,
                            fontSize: { xs: '0.875rem', sm: '1rem' },
                            textAlign: 'center',
                          }}
                        >
                          View all {searchResults.length} results →
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
              </List>
            ) : (
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Recent Posts
                </Typography>
                <List sx={{ py: 0 }}>
                  {posts.slice(0, 3).map((post, index) => (
                    <ListItem
                      key={post.id}
                      button
                      onClick={() => handleResultClick(post)}
                      sx={{
                        borderBottom: index < 2 ? `1px solid ${theme.palette.divider}` : 'none',
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              fontSize: { xs: '0.875rem', sm: '1rem' },
                            }}
                          >
                            {post.title}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontSize: { xs: '0.75rem', sm: '0.8rem' } }}
                          >
                            {formatDate(post.date)} • {post.category}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}
          </Paper>
        </Fade>
      </Box>
    </ClickAwayListener>
  );
};

export default SearchBar;
