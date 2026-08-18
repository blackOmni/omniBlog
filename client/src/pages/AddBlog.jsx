// src/pages/AddBlog.jsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Paper,
  Alert,
  MenuItem,
  Grid,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import axiosInstance from '../api/axios';
import '../components/css/FormPages.css';

const categories = ['General', 'Tech', 'Lifestyle', 'Design', 'Development'];

const AddBlog = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    content: '',
    image: '',
    category: 'General',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!userId) {
      setError('You must be logged in to create a post.');
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.post('/blogs/add', {
        ...inputs,
        user: userId,
      });
      navigate('/myBlogs');
    } catch (err) {
      setError(err.message || 'Failed to publish post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page-wrapper">
      <Paper className="form-container-card wide editor-card" elevation={0}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          {/* Row 1: Title (75%) & Category (25%) taking 100% full width */}
          <Grid container spacing={2} sx={{ width: '100%', margin: 0 }}>
            <Grid
              item
              xs={12}
              sm={9}
              sx={{ pl: '0 !important', pt: '0 !important' }}
            >
              <TextField
                name="title"
                label="Blog Title"
                placeholder="Enter blog title..."
                value={inputs.title}
                onChange={handleChange}
                required
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              sx={{
                pr: '0 !important',
                pt: { xs: '16px !important', sm: '0 !important' },
              }}
            >
              <TextField
                select
                name="category"
                label="Category"
                value={inputs.category}
                onChange={handleChange}
                fullWidth
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          {/* Short Summary */}
          <TextField
            name="description"
            label="Short Summary"
            placeholder="Write a brief overview..."
            value={inputs.description}
            onChange={handleChange}
            required
            multiline
            rows={2}
            fullWidth
          />

          {/* Image URL + Live Preview */}
          <Box display="flex" flexDirection="column" gap={1}>
            <TextField
              name="image"
              label="Cover Image URL"
              placeholder="https://example.com/image.jpg"
              value={inputs.image}
              onChange={handleChange}
              fullWidth
            />

            {inputs.image && (
              <Box className="image-preview-box">
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <ImageIcon
                    fontSize="small"
                    sx={{ color: 'var(--text-secondary)' }}
                  />
                  <span
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    Image Preview
                  </span>
                </Box>
                <img
                  src={inputs.image}
                  alt="Cover Preview"
                  className="image-preview-thumbnail"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </Box>
            )}
          </Box>

          {/* Main Content Area */}
          <TextField
            name="content"
            label="Main Article Content"
            placeholder="Write your main article content..."
            value={inputs.content}
            onChange={handleChange}
            required
            multiline
            rows={10}
            fullWidth
          />

          {/* Actions */}
          <Box display="flex" justifyContent="flex-end" gap={2} mt={1}>
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate('/blogs')}
              sx={{ borderRadius: '8px', textTransform: 'none' }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              className="primary-form-btn"
              sx={{ minWidth: 140 }}
            >
              {loading ? 'Publishing...' : 'Publish Post'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default AddBlog;
