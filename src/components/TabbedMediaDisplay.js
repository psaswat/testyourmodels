import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
  Fade,
  Paper,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import { PlayArrow, ContentCopy, Check } from '@mui/icons-material';

const TabbedMediaDisplay = ({ mediaVersions, title, fallbackImage, onContentChange }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [activeTab, setActiveTab] = useState(0);
  const [copySuccess, setCopySuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  // If no mediaVersions or only one version, render without tabs
  if (!mediaVersions || mediaVersions.length <= 1) {
    const mediaUrl = mediaVersions?.[0]?.url || fallbackImage;
    return renderSingleMedia(mediaUrl, title, theme);
  }

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    // Notify parent component about content change
    if (onContentChange && mediaVersions[newValue]) {
      onContentChange(mediaVersions[newValue].content || '');
    }
  };

  // Notify parent about initial content when component mounts
  useEffect(() => {
    if (onContentChange && mediaVersions && mediaVersions[activeTab]) {
      onContentChange(mediaVersions[activeTab].content || '');
    }
  }, [onContentChange, mediaVersions, activeTab]);

  const handleCopyPrompt = async () => {
    const currentVersion = mediaVersions[activeTab];
    if (currentVersion && currentVersion.content) {
      try {
        await navigator.clipboard.writeText(currentVersion.content);
        setCopySuccess(true);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  const currentMedia = mediaVersions[activeTab];

  return (
    <Box sx={{ width: '100%' }}>
      {/* Media Display Area */}
      <Box sx={{ position: 'relative', width: '100%', mb: 2 }}>
        <Fade in={true} timeout={300}>
          <Box>
            {currentMedia.isPrompt ? (
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
                  border: `1px solid ${theme.palette.divider}`,
                  borderRadius: 2,
                  position: 'relative',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
                    📝 Prompt
                  </Typography>
                  <Tooltip title={copied ? "Copied!" : "Copy prompt"}>
                    <IconButton
                      onClick={handleCopyPrompt}
                      sx={{
                        color: copied ? theme.palette.success.main : theme.palette.text.secondary,
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      {copied ? <Check /> : <ContentCopy />}
                    </IconButton>
                  </Tooltip>
                </Box>
                <Box
                  component="pre"
                  sx={{
                    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    lineHeight: 1.6,
                    color: theme.palette.text.primary,
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    overflow: 'auto',
                    maxHeight: '400px',
                    backgroundColor: theme.palette.mode === 'dark' ? '#0d1117' : '#ffffff',
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                    p: 2,
                    m: 0,
                  }}
                >
                  {currentMedia.content}
                </Box>
              </Paper>
            ) : (
              renderMedia(currentMedia.url, title, currentMedia.type, theme)
            )}
          </Box>
        </Fade>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          variant={isMobile ? 'scrollable' : 'standard'}
          scrollButtons={isMobile ? 'auto' : false}
          allowScrollButtonsMobile
          sx={{
            '& .MuiTab-root': {
              minWidth: { xs: 60, sm: 80 },
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              fontWeight: 500,
              textTransform: 'none',
              color: theme.palette.text.secondary,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
                fontWeight: 600,
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.primary.main,
              height: 3,
              borderRadius: '3px 3px 0 0',
            },
          }}
        >
          {mediaVersions.map((version, index) => (
            <Tab
              key={version.id}
              label={version.label}
              id={`media-tab-${index}`}
              aria-controls={`media-tabpanel-${index}`}
              sx={{
                px: { xs: 1, sm: 2 },
                py: 1,
              }}
            />
          ))}
        </Tabs>
      </Box>

      {/* Copy Success Snackbar */}
      <Snackbar
        open={copySuccess}
        autoHideDuration={2000}
        onClose={() => setCopySuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setCopySuccess(false)} severity="success" sx={{ width: '100%' }}>
          Prompt copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Helper function to render single media (fallback for posts without multiple versions)
const renderSingleMedia = (mediaUrl, title, theme) => {
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

  return renderMedia(mediaUrl, title, 'image', theme);
};

// Main media rendering function
const renderMedia = (mediaUrl, title, type, theme) => {
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

  // Check if it's a video
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
    return (
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Box
          component="video"
          src={mediaUrl}
          poster="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop"
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

  // Handle images
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
        cursor: 'pointer',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
      onClick={() => window.open(mediaUrl, '_blank')}
    />
  );
};

// Helper functions
const isVideo = (url) => {
  const videoExtensions = ['.mp4', '.webm', '.ogg', '.avi', '.mov', '.wmv', '.flv'];
  const videoDomains = ['youtube.com', 'youtu.be', 'vimeo.com', 'dailymotion.com'];
  
  return videoExtensions.some(ext => url.toLowerCase().includes(ext)) ||
         videoDomains.some(domain => url.toLowerCase().includes(domain));
};

const getYouTubeThumbnail = (url) => {
  const videoId = url.includes('youtu.be') 
    ? url.split('youtu.be/')[1]?.split('?')[0]
    : url.split('v=')[1]?.split('&')[0];
  
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  }
  return null;
};

const getVimeoThumbnail = (url) => {
  const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
  if (videoId) {
    // Vimeo requires API call for thumbnail, using placeholder for now
    return 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=600&fit=crop';
  }
  return null;
};

export default TabbedMediaDisplay;
