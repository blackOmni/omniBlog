// src/pages/AllBlogs.jsx
import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axios';
import BlogCard from '../components/BlogCard';
import { Box, Typography } from '@mui/material';
import '../components/css/BlogCard.css';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axiosInstance.get('/blogs');
        setBlogs(res.blogs);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <Box className="blogs-page-wrapper">
      <Typography variant="h4" className="page-heading">
        Explore Blogs
      </Typography>

      {/* Horizontal Scroll Deck */}
      <Box className="horizontal-blogs-container">
        {blogs &&
          blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} isUser={false} />
          ))}
      </Box>
    </Box>
  );
};

export default AllBlogs;
