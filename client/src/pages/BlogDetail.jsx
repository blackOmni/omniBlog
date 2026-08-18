// src/pages/BlogDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ShareIcon from '@mui/icons-material/Share';
import axiosInstance from '../api/axios';
import '../components/css/BlogDetail.css';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Reactions state
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userReaction, setUserReaction] = useState(null);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axiosInstance.get(`/blogs/${id}`);
        const data = res?.blog || res;

        setBlog(data);
        setLikes(
          Array.isArray(data?.likes) ? data.likes.length : data?.likes || 0
        );
        setDislikes(
          Array.isArray(data?.dislikes)
            ? data.dislikes.length
            : data?.dislikes || 0
        );
      } catch (err) {
        console.error('Failed to load post:', err);
        setError(err.message || 'Unable to fetch blog details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlogDetail();
  }, [id]);

  const handleLike = () => {
    if (userReaction === 'like') {
      setLikes((prev) => prev - 1);
      setUserReaction(null);
    } else {
      if (userReaction === 'dislike') setDislikes((prev) => prev - 1);
      setLikes((prev) => prev + 1);
      setUserReaction('like');
    }
  };

  const handleDislike = () => {
    if (userReaction === 'dislike') {
      setDislikes((prev) => prev - 1);
      setUserReaction(null);
    } else {
      if (userReaction === 'like') setLikes((prev) => prev - 1);
      setDislikes((prev) => prev + 1);
      setUserReaction('dislike');
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error || !blog) {
    return (
      <Box className="blog-detail-wrapper" textAlign="center" mt={4}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error || 'Blog post not found.'}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/blogs')}
          className="back-link-btn"
        >
          Back to Articles
        </Button>
      </Box>
    );
  }

  const authorName = blog?.user?.name || blog?.userName || 'Anonymous';
  const authorInitial = authorName.charAt(0).toUpperCase();

  return (
    <div className="blog-detail-wrapper">
      {/* Top Navigation */}
      <Box mb={3}>
        <Button
          component={Link}
          to="/blogs"
          startIcon={<ArrowBackIcon />}
          className="back-link-btn"
        >
          Back to Articles
        </Button>
      </Box>

      {/* Header Info */}
      <Box className="blog-detail-header">
        {blog.category && (
          <span className="blog-detail-category">{blog.category}</span>
        )}

        <Typography variant="h3" component="h1" className="blog-detail-title">
          {blog.title}
        </Typography>

        <Box className="blog-detail-author-row">
          <Box className="author-info-group">
            <Avatar className="blog-detail-avatar">{authorInitial}</Avatar>
            <Box>
              <Typography className="author-detail-name">
                {authorName}
              </Typography>
              {blog.createdAt && (
                <Typography className="blog-detail-date">
                  {new Date(blog.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Typography>
              )}
            </Box>
          </Box>

          <IconButton onClick={handleShare} size="small" color="inherit">
            <ShareIcon
              fontSize="small"
              sx={{ color: 'var(--text-secondary)' }}
            />
          </IconButton>
        </Box>
      </Box>

      {/* Optional Feature Image */}
      {blog.image && (
        <Box className="blog-detail-image-container">
          <img
            src={blog.image}
            alt={blog.title}
            className="blog-detail-image"
          />
        </Box>
      )}

      {/* Summary Highlight Box */}
      {blog.description && (
        <Paper className="blog-detail-summary-card" elevation={0}>
          <Typography className="blog-detail-summary-text">
            "{blog.description}"
          </Typography>
        </Paper>
      )}

      {/* Main Body Content */}
      <Typography className="blog-detail-body">
        {blog.content || blog.description}
      </Typography>

      {/* Bottom Engagement Bar */}
      <Box className="blog-detail-actions">
        <Box display="flex" gap={2}>
          <IconButton
            onClick={handleLike}
            className={`action-pill ${userReaction === 'like' ? 'liked' : ''}`}
          >
            {userReaction === 'like' ? (
              <ThumbUpIcon />
            ) : (
              <ThumbUpOutlinedIcon />
            )}
            <Typography variant="body2" fontWeight={600}>
              {likes}
            </Typography>
          </IconButton>

          <IconButton
            onClick={handleDislike}
            className={`action-pill ${userReaction === 'dislike' ? 'disliked' : ''}`}
          >
            {userReaction === 'dislike' ? (
              <ThumbDownAltIcon />
            ) : (
              <ThumbDownAltOutlinedIcon />
            )}
            <Typography variant="body2" fontWeight={600}>
              {dislikes}
            </Typography>
          </IconButton>
        </Box>

        <Button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="back-link-btn"
        >
          Back to Top
        </Button>
      </Box>
    </div>
  );
};

export default BlogDetail;
