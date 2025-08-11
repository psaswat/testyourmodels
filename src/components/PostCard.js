import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  useTheme,
} from '@mui/material';
import { CalendarToday } from '@mui/icons-material';

const PostCard = ({ post, isFeatured = false }) => {
  const theme = useTheme();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.palette.mode === 'dark' 
            ? '0 8px 32px rgba(0, 0, 0, 0.4)' 
            : '0 8px 32px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      <CardMedia
        component="img"
        height={isFeatured ? "300" : "200"}
        image={post.image}
        alt={post.title}
        sx={{
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
          <Typography variant="caption" color="text.secondary">
            {formatDate(post.date)}
          </Typography>
        </Box>
        
        <Chip
          label={post.category}
          size="small"
          sx={{
            alignSelf: 'flex-start',
            mb: 1,
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            fontSize: '0.75rem',
          }}
        />

        <Typography
          variant={isFeatured ? "h4" : "h6"}
          component="h2"
          gutterBottom
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 600,
            lineHeight: 1.2,
            mb: 1,
          }}
        >
          {post.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            lineHeight: 1.6,
            flexGrow: 1,
          }}
        >
          {post.summary}
        </Typography>

        {isFeatured && (
          <Typography
            variant="body1"
            sx={{
              lineHeight: 1.7,
              color: 'text.primary',
            }}
          >
            {post.content.split('\n\n')[0]}...
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default PostCard;

