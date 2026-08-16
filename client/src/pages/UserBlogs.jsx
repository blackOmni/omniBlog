// src/pages/UserBlogs.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import axiosInstance from '../api/axios';
import BlogCard from '../components/BlogCard';
import '../components/css/BlogCard.css';
import './css/UserBlogs.css';

const UserBlogs = () => {
  const navigate = useNavigate();
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserBlogs = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const res = await axiosInstance.get(`/blogs/user/${userId}`);
      const data = res.user ? res.user.blogs : res.blogs || [];
      setUserBlogs(data);
    } catch (err) {
      console.error('Error fetching user blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBlogs();
  }, []);

  const handleDelete = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) {
      return;
    }
    try {
      await axiosInstance.delete(`/blogs/${blogId}`);
      setUserBlogs((prev) => prev.filter((blog) => blog._id !== blogId));
    } catch (err) {
      console.error('Failed to delete blog:', err);
      alert('Failed to delete the blog post. Please try again.');
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
    <Box className="blogs-page-wrapper">
      <Box className="user-blogs-header">
        <Typography variant="h4" className="page-heading">
          My Published Blogs
        </Typography>
        <Button
          component={Link}
          to="/blogs/add"
          variant="contained"
          startIcon={<AddIcon />}
          className="create-blog-btn"
        >
          Create New Blog
        </Button>
      </Box>

      {userBlogs.length === 0 ? (
        <Box className="empty-blogs-container">
          <Typography variant="h6" className="empty-text">
            You haven't written any blogs yet.
          </Typography>
          <Button
            component={Link}
            to="/blogs/add"
            variant="outlined"
            className="empty-create-btn"
          >
            Write Your First Post
          </Button>
        </Box>
      ) : (
        <Box className="horizontal-blogs-container">
          {userBlogs.map((blog) => (
            <Box key={blog._id} className="user-blog-card-wrapper">
              {/* Blog Management Actions */}
              <Box className="blog-card-actions-overlay">
                <Tooltip title="Edit Post">
                  <IconButton
                    size="small"
                    className="action-icon-btn edit"
                    onClick={() => navigate(`/myBlogs/edit/${blog._id}`)}
                  >
                    <EditIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Post">
                  <IconButton
                    size="small"
                    className="action-icon-btn delete"
                    onClick={() => handleDelete(blog._id)}
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Render Standard Blog Card */}
              <BlogCard blog={blog} isUser={true} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default UserBlogs;
