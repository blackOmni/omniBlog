// src/pages/AllBlogs.jsx
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert } from '@mui/material';
import axiosInstance from '../api/axios';
import BlogCard from '../components/BlogCard';
import '../components/css/BlogCard.css';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await axiosInstance.get('/blogs');
      const blogList = data?.blogs || (Array.isArray(data) ? data : []);
      setBlogs(blogList);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
      setError(err.message || 'Failed to load blog posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

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

  return (
    <div className="blogs-page-wrapper">
      <Typography variant="h4" className="page-heading" textAlign="center">
        Explore All Posts
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {!loading && blogs.length === 0 ? (
        <Typography
          textAlign="center"
          color="text.secondary"
          variant="h6"
          mt={4}
        >
          No blogs found. Be the first to create one!
        </Typography>
      ) : (
        <div className="horizontal-blogs-container">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} isUser={false} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
