import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
  useTheme,
  IconButton,
  Divider,
} from '@mui/material';
import { Save, Add, Delete } from '@mui/icons-material';
import { addPostToFirestore } from '../data/posts';
// import { uploadFile, validateFileType, validateFileSize } from '../services/storageService';

const Admin = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    image: '',
    isFeatured: false,
  });
  const [mediaVersions, setMediaVersions] = useState([
    { id: 'Prompt', label: 'Prompt', url: '', type: 'image', content: '', isPrompt: true }
  ]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleMediaVersionChange = (index, field) => (event) => {
    const newVersions = [...mediaVersions];
    newVersions[index] = {
      ...newVersions[index],
      [field]: event.target.value,
    };
    setMediaVersions(newVersions);
  };

  const addMediaVersion = () => {
    const newId = String.fromCharCode(65 + mediaVersions.length - 1); // A, B, C, D, E... (subtract 1 because Prompt is already there)
    setMediaVersions([
      ...mediaVersions,
      { id: newId, label: `Version ${newId}`, url: '', type: 'image', content: '', isPrompt: false }
    ]);
  };

  const removeMediaVersion = (index) => {
    if (mediaVersions.length > 1) {
      setMediaVersions(mediaVersions.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validate required fields
    if (!formData.title || !formData.summary || !formData.content || !formData.category) {
      setShowError(true);
      return;
    }

    try {
      // Create new post object
      // Filter out empty media versions
      const validMediaVersions = mediaVersions.filter(version => version.url.trim() !== '');
      
      const newPost = {
        title: formData.title,
        summary: formData.summary,
        content: formData.content,
        category: formData.category,
        image: formData.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop',
        mediaVersions: validMediaVersions.length > 0 ? validMediaVersions : undefined,
        isFeatured: formData.isFeatured,
        date: new Date().toISOString(),
      };

      // Add the post to Firestore
      const result = await addPostToFirestore(newPost);
      
      if (result.success) {
        console.log('New post created with ID:', result.id);
        
        // Reset form
        setFormData({
          title: '',
          summary: '',
          content: '',
          category: '',
          image: '',
          isFeatured: false,
        });
        setMediaVersions([
          { id: 'Prompt', label: 'Prompt', url: '', type: 'image', content: '', isPrompt: true }
        ]);
        
        setShowSuccess(true);

        // Navigate to home page after a short delay to see the new post
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        console.error('Error creating post:', result.error);
        setShowError(true);
      }
    } catch (error) {
      console.error('Error creating post:', error);
      setShowError(true);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
    setShowError(false);
  };

  return (
    <Box sx={{ 
      width: '100vw', 
      minHeight: '100vh',
      backgroundColor: theme.palette.background.default,
      py: { xs: 2, sm: 3, md: 4 },
      px: { xs: 2, sm: 3, md: 4 }
    }}>
      <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
            mb: 1,
          }}
        >
          Admin Panel
        </Typography>
        
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{
            mb: 4,
            fontSize: { xs: '1rem', sm: '1.25rem' },
          }}
        >
          Add new blog posts
        </Typography>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Post Title"
                  value={formData.title}
                  onChange={handleInputChange('title')}
                  fullWidth
                  required
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Summary"
                  value={formData.summary}
                  onChange={handleInputChange('summary')}
                  fullWidth
                  required
                  multiline
                  rows={2}
                  variant="outlined"
                  helperText="A brief description of the post"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={formData.category}
                    label="Category"
                    onChange={handleInputChange('category')}
                    sx={{
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                    }}
                  >
                    <MenuItem value="Technology">Technology</MenuItem>
                    <MenuItem value="Lifestyle">Lifestyle</MenuItem>
                    <MenuItem value="Productivity">Productivity</MenuItem>
                    <MenuItem value="Food">Food</MenuItem>
                    <MenuItem value="Health">Health</MenuItem>
                    <MenuItem value="Design">Design</MenuItem>
                    <MenuItem value="Development">Development</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Image or Video URL (optional)"
                  value={formData.image}
                  onChange={handleInputChange('image')}
                  fullWidth
                  variant="outlined"
                  helperText="Add image URL, YouTube/Vimeo link, or video file URL. Leave empty for default image."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                    },
                  }}
                />
              </Grid>

              {/* Media Versions Section */}
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
                    Media Versions (Optional)
                  </Typography>
                  <Button
                    startIcon={<Add />}
                    onClick={addMediaVersion}
                    variant="outlined"
                    size="small"
                    sx={{ fontSize: '0.875rem' }}
                  >
                    Add Version
                  </Button>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Add multiple versions of your media for tabbed display. The first tab is always "Prompt" for sharing copyable prompts. Additional tabs (A, B, C, D, E) show different media versions.
                </Typography>
                
                {mediaVersions.map((version, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      mb: 2,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 2,
                      backgroundColor: version.isPrompt ? theme.palette.primary.light + '10' : 'transparent',
                    }}
                  >
                    <Grid container spacing={2} alignItems="flex-start">
                      <Grid item xs={12} sm={2}>
                        <TextField
                          label="Version Label"
                          value={version.label}
                          onChange={handleMediaVersionChange(index, 'label')}
                          fullWidth
                          size="small"
                          variant="outlined"
                          placeholder={version.isPrompt ? "Prompt" : "e.g., Original, Dark Theme"}
                          disabled={version.isPrompt}
                          helperText={version.isPrompt ? "Prompt tab (always first)" : ""}
                        />
                      </Grid>
                      <Grid item xs={12} sm={9}>
                        <TextField
                          label="Media URL"
                          value={version.url}
                          onChange={handleMediaVersionChange(index, 'url')}
                          fullWidth
                          size="small"
                          variant="outlined"
                          placeholder="Image URL, YouTube link, or video file URL"
                        />
                      </Grid>
                      <Grid item xs={12} sm={1}>
                        <IconButton
                          onClick={() => removeMediaVersion(index)}
                          disabled={mediaVersions.length === 1}
                          color="error"
                          size="small"
                        >
                          <Delete />
                        </IconButton>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          label={version.isPrompt ? "Prompt Content" : "Content for this version"}
                          value={version.content}
                          onChange={handleMediaVersionChange(index, 'content')}
                          fullWidth
                          multiline
                          rows={4}
                          size="small"
                          variant="outlined"
                          placeholder={version.isPrompt ? "Enter the prompt that users can copy and use..." : "Enter the content that should be displayed when this media version is selected..."}
                          helperText={version.isPrompt ? "This prompt will be displayed as a copyable code snippet" : "This content will be shown below the media when this tab is selected"}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                ))}
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Post Content"
                  value={formData.content}
                  onChange={handleInputChange('content')}
                  fullWidth
                  required
                  multiline
                  rows={8}
                  variant="outlined"
                  helperText="Write your blog post content here. Use line breaks for paragraphs."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<Save />}
                    sx={{
                      px: 4,
                      py: 1.5,
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      fontWeight: 600,
                    }}
                  >
                    Publish Post
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>

        {/* Instructions */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            mt: 4,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
            backgroundColor: theme.palette.action.hover,
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              mb: 2,
            }}
          >
            How to Add Content
          </Typography>
          
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Fill out the form above with your post details
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              For media, you can add: image URLs, YouTube links, Vimeo links, or direct video files
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              Click "Publish Post" to add the post
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              The post will appear in your blog immediately
            </Typography>
            <Typography component="li" variant="body2" sx={{ mb: 1 }}>
              For production, you'll need to connect this to a database
            </Typography>
          </Box>
        </Paper>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Post created successfully! Redirecting to home page to view your new post...
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          Please fill in all required fields.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Admin;
