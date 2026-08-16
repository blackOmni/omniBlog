// src/pages/UserBlogEdit.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Alert,
  Paper,
  CircularProgress,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Image from '@mui/icons-material/Image';
import axiosInstance from '../api/axios';
import './css/AddBlog.css';

const UserBlogEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    image: '',
    content: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const res = await axiosInstance.get(`/blogs/${id}`);
        const blogData = res.blog || res;
        setInputs({
          title: blogData.title || '',
          description: blogData.description || '',
          image: blogData.image || '',
          content: blogData.content || '',
        });
      } catch (err) {
        console.error('Failed to load blog:', err);
        setError('Could not load blog details.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogDetail();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await axiosInstance.put(`/blogs/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        content: inputs.content,
      });
      navigate('/myBlogs');
    } catch (err) {
      console.error('Update failed:', err);
      setError(err.message || 'Failed to update blog post.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box className="user-blogs-loader">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <div className="add-blog-wrapper">
      <Paper elevation={0} className="add-blog-card">
        <Box className="add-blog-header">
          <Typography variant="h4" className="add-blog-title">
            Edit Blog Post
          </Typography>
          <Typography variant="body2" className="add-blog-subtitle">
            Update your post details and content
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" className="add-blog-alert">
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} className="add-blog-form">
          <TextField
            name="title"
            label="Blog Title"
            value={inputs.title}
            onChange={handleChange}
            className="add-blog-input"
            variant="outlined"
            fullWidth
            required
          />

          <TextField
            name="description"
            label="Short Description"
            value={inputs.description}
            onChange={handleChange}
            className="add-blog-input"
            variant="outlined"
            multiline
            rows={2}
            fullWidth
          />

          <TextField
            name="image"
            label="Image URL (Optional)"
            value={inputs.image}
            onChange={handleChange}
            className="add-blog-input"
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: <Image className="input-icon" />,
            }}
          />

          <TextField
            name="content"
            label="Blog Content"
            value={inputs.content}
            onChange={handleChange}
            className="add-blog-input"
            variant="outlined"
            multiline
            rows={10}
            fullWidth
            required
          />

          <Box className="add-blog-actions">
            <Button
              type="button"
              variant="outlined"
              className="cancel-btn"
              onClick={() => navigate('/myBlogs')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className="submit-btn"
              disabled={submitting}
              startIcon={<SaveIcon />}
            >
              {submitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </div>
  );
};

export default UserBlogEdit;
