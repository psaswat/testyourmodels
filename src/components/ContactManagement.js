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
  Chip,
  TextField,
  InputAdornment,
  Button,
  Alert,
  Snackbar,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from '@mui/material';
import {
  Search,
  Refresh,
  MarkEmailRead,
  Delete,
} from '@mui/icons-material';
import { getContactMessages, markMessageAsRead } from '../services/contactService';

const ContactManagement = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [viewDialog, setViewDialog] = useState({ open: false, message: null });

  const filterMessages = useCallback(() => {
    let filtered = messages;

    if (searchTerm) {
      filtered = filtered.filter(message =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMessages(filtered);
  }, [messages, searchTerm]);

  // Load messages on component mount
  useEffect(() => {
    loadMessages();
  }, []);

  // Filter messages when search term changes
  useEffect(() => {
    filterMessages();
  }, [filterMessages]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const result = await getContactMessages();
      if (result.success) {
        setMessages(result.data);
      } else {
        setSnackbar({
          open: true,
          message: 'Error loading contact messages',
          severity: 'error'
        });
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      setSnackbar({
        open: true,
        message: 'Error loading contact messages',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleViewMessage = async (message) => {
    // Mark message as read if it's currently new
    if (message.status === 'new') {
      try {
        const result = await markMessageAsRead(message.id);
        if (result.success) {
          // Update the message in the local state
          const updatedMessage = { ...message, status: 'read', updatedAt: new Date() };
          setMessages(prevMessages => 
            prevMessages.map(msg => 
              msg.id === message.id ? updatedMessage : msg
            )
          );
          setViewDialog({ open: true, message: updatedMessage });
          console.log(`Message ${message.id} marked as read`);
        } else {
          console.error('Failed to mark message as read:', result.error);
          setViewDialog({ open: true, message });
        }
      } catch (error) {
        console.error('Error marking message as read:', error);
        setViewDialog({ open: true, message });
      }
    } else {
      setViewDialog({ open: true, message });
    }
  };

  const handleCloseViewDialog = () => {
    setViewDialog({ open: false, message: null });
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'error';
      case 'read': return 'warning';
      case 'replied': return 'success';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'new': return 'New';
      case 'read': return 'Read';
      case 'replied': return 'Replied';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography>Loading contact messages...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Contact Messages
        </Typography>
        <Button
          startIcon={<Refresh />}
          onClick={loadMessages}
          variant="outlined"
        >
          Refresh
        </Button>
      </Box>

      {/* Search */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <TextField
          placeholder="Search messages..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 300 }}
        />
      </Paper>

      {/* Messages Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMessages.map((message) => (
              <TableRow key={message.id} hover>
                <TableCell>
                  <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                    {message.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {message.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" noWrap sx={{ maxWidth: 200 }}>
                    {message.subject}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(message.status)}
                    size="small"
                    color={getStatusColor(message.status)}
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatDate(message.createdAt)}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                    <Tooltip title="View Message">
                      <IconButton
                        size="small"
                        onClick={() => handleViewMessage(message)}
                        color="primary"
                      >
                        <MarkEmailRead />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        size="small"
                        onClick={() => {/* TODO: Implement delete */}}
                        color="error"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredMessages.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            {messages.length === 0 ? 'No contact messages found' : 'No messages match your search criteria'}
          </Typography>
        </Box>
      )}

      {/* View Message Dialog */}
      <Dialog
        open={viewDialog.open}
        onClose={handleCloseViewDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">
              Contact Message
            </Typography>
            <Chip
              label={viewDialog.message ? getStatusLabel(viewDialog.message.status) : ''}
              size="small"
              color={viewDialog.message ? getStatusColor(viewDialog.message.status) : 'default'}
              variant="outlined"
            />
          </Box>
        </DialogTitle>
        <DialogContent>
          {viewDialog.message && (
            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  From
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  {viewDialog.message.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {viewDialog.message.email}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Subject
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'medium' }}>
                  {viewDialog.message.subject}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Message
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {viewDialog.message.message}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                  Received
                </Typography>
                <Typography variant="body2">
                  {formatDate(viewDialog.message.createdAt)}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

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

export default ContactManagement;
