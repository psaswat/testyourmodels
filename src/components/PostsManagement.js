import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Snackbar,
  Switch,
  FormControlLabel,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  Edit,
  Delete,
  Search,
  MoreVert,
  Visibility,
  VisibilityOff,
  Refresh,
} from '@mui/icons-material';
import { getAllPostsFromFirestore, updatePost, deletePost } from '../data/posts';

const PostsManagement = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  const filterPosts = useCallback(() => {
    let filtered = posts;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory]);

  // Load posts on component mount
  useEffect(() => {
    loadPosts();
  }, []);

  // Filter posts when search term or category changes
  useEffect(() => {
    filterPosts();
  }, [filterPosts]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const allPosts = await getAllPostsFromFirestore();
      setPosts(allPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
      setSnackbar({
        open: true,
        message: 'Error loading posts',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleToggleStatus = async (post) => {
    try {
      const updatedPost = {
        ...post,
        isActive: !post.isActive
      };
      await updatePost(post.id, updatedPost);
      setPosts(posts.map(p => p.id === post.id ? updatedPost : p));
      setSnackbar({
        open: true,
        message: `Post ${post.isActive ? 'disabled' : 'enabled'} successfully`,
        severity: 'success'
      });
    } catch (error) {
      console.error('Error updating post status:', error);
      setSnackbar({
        open: true,
        message: 'Error updating post status',
        severity: 'error'
      });
    }
  };

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deletePost(postToDelete.id);
      setPosts(posts.filter(p => p.id !== postToDelete.id));
      setSnackbar({
        open: true,
        message: 'Post deleted successfully',
        severity: 'success'
      });
    } catch (error) {
      console.error('Error deleting post:', error);
      setSnackbar({
        open: true,
        message: 'Error deleting post',
        severity: 'error'
      });
    } finally {
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  const handleMenuClick = (event, post) => {
    setAnchorEl(event.currentTarget);
    setSelectedPost(post);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedPost(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const categories = ['Video', 'Music', 'Image', 'Deep Research', 'Reasoning'];

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading posts...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Posts Management
        </Typography>
        <Button
          startIcon={<Refresh />}
          onClick={loadPosts}
          variant="outlined"
        >
          Refresh
        </Button>
      </Box>

      {/* Search and Filter Controls */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField
            placeholder="Search posts..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 200 }}
          />
          <TextField
            select
            label="Category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">All Categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
          <Box sx={{ ml: 'auto' }}>
            <Typography variant="body2" color="text.secondary">
              {filteredPosts.length} of {posts.length} posts
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Posts Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Featured</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id} hover>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {post.summary}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                    label={post.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={post.isActive !== false}
                        onChange={() => handleToggleStatus(post)}
                        size="small"
                      />
                    }
                    label={post.isActive !== false ? 'Active' : 'Inactive'}
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={post.isFeatured ? 'Featured' : 'Regular'}
                    size="small"
                    color={post.isFeatured ? 'secondary' : 'default'}
                    variant={post.isFeatured ? 'filled' : 'outlined'}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatDate(post.date)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Tooltip title="Edit Post">
                      <IconButton
                        size="small"
                        onClick={() => {/* TODO: Implement edit */}}
                        color="primary"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Post">
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(post)}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                    <IconButton
                      size="small"
                      onClick={(e) => handleMenuClick(e, post)}
                    >
                      <MoreVert />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredPosts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            {posts.length === 0 ? 'No posts found' : 'No posts match your search criteria'}
          </Typography>
        </Box>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{postToDelete?.title}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => {/* TODO: Implement view */}}>
          <Visibility sx={{ mr: 1 }} />
          View Post
        </MenuItem>
        <MenuItem onClick={() => {/* TODO: Implement edit */}}>
          <Edit sx={{ mr: 1 }} />
          Edit Post
        </MenuItem>
        <MenuItem onClick={() => selectedPost && handleToggleStatus(selectedPost)}>
          {selectedPost?.isActive !== false ? (
            <>
              <VisibilityOff sx={{ mr: 1 }} />
              Disable Post
            </>
          ) : (
            <>
              <Visibility sx={{ mr: 1 }} />
              Enable Post
            </>
          )}
        </MenuItem>
      </Menu>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PostsManagement;
