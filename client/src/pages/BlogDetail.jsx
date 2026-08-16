// src/pages/BlogDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Container,
  Avatar,
  Divider,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axiosInstance from '../api/axios';
import './css/BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await axiosInstance.get(`/blogs/${id}`);
        // Handle various backend response wrappers safely
        const blogData = res?.blog || res?.data?.blog || res?.data || res;

        if (isMounted) {
          if (blogData && typeof blogData === 'object' && blogData._id) {
            setBlog(blogData);
          } else {
            setError('Blog post could not be found.');
          }
        }
      } catch (err) {
        console.error('Error fetching blog details:', err);
        if (isMounted) {
          setError(
            err?.response?.data?.message ||
              err?.message ||
              'Failed to load blog details. Please try again.'
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchBlogDetail();
    } else {
      setError('Invalid Blog ID.');
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error || !blog) {
    return (
      <Container maxWidth="md" style={{ marginTop: '40px' }}>
        <Alert severity="error" style={{ marginBottom: '20px' }}>
          {error || 'Unable to display blog post.'}
        </Alert>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className="blog-detail-container">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        className="back-btn"
        sx={{ mb: 3 }}
      >
        Back to Posts
      </Button>

      <Typography variant="h3" component="h1" className="blog-detail-title">
        {blog.title}
      </Typography>

      <Box className="blog-detail-author-info" sx={{ my: 2 }}>
        <Avatar className="author-avatar">
          {blog.user?.name ? blog.user.name.charAt(0).toUpperCase() : 'U'}
        </Avatar>
        <Box>
          <Typography variant="subtitle1" fontWeight="600">
            {blog.user?.name || 'Anonymous Author'}
          </Typography>
          {blog.createdAt && (
            <Typography variant="caption" color="text.secondary">
              Published on {new Date(blog.createdAt).toLocaleDateString()}
            </Typography>
          )}
        </Box>
      </Box>

      {blog.image && (
        <Box className="blog-detail-image-wrapper" sx={{ my: 3 }}>
          <img
            src={blog.image}
            alt={blog.title}
            className="blog-detail-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </Box>
      )}

      {blog.description && (
        <Typography
          variant="h6"
          className="blog-detail-description"
          color="text.secondary"
          sx={{ mb: 3, fontStyle: 'italic' }}
        >
          {blog.description}
        </Typography>
      )}

      <Divider sx={{ mb: 4 }} />

      <Typography
        variant="body1"
        className="blog-detail-content"
        sx={{ lineHeight: 1.8, whitespace: 'pre-line' }}
      >
        {blog.content}
      </Typography>
    </Container>
  );
};

export default BlogDetail;
