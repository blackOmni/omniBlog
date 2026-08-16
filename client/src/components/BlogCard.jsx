// src/components/BlogCard.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Button,
  Avatar,
} from '@mui/material';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './css/BlogCard.css';

const BlogCard = ({ blog, isUser }) => {
  const [likes, setLikes] = useState(blog.likes || 0);
  const [dislikes, setDislikes] = useState(blog.dislikes || 0);
  const [userReaction, setUserReaction] = useState(null);

  // Extract author name from population object or direct string prop
  const authorName = blog.user?.name || blog.userName || 'Anonymous';
  const authorInitial = authorName.charAt(0).toUpperCase();

  const handleLike = () => {
    if (userReaction === 'like') {
      setLikes((prev) => prev - 1);
      setUserReaction(null);
    } else {
      if (userReaction === 'dislike') {
        setDislikes((prev) => prev - 1);
      }
      setLikes((prev) => prev + 1);
      setUserReaction('like');
    }
  };

  const handleDislike = () => {
    if (userReaction === 'dislike') {
      setDislikes((prev) => prev - 1);
      setUserReaction(null);
    } else {
      if (userReaction === 'like') {
        setLikes((prev) => prev - 1);
      }
      setDislikes((prev) => prev + 1);
      setUserReaction('dislike');
    }
  };

  return (
    <Card className="horizontal-blog-card" elevation={0}>
      <CardContent className="blog-card-content">
        {/* Author Header */}
        <Box className="blog-card-author">
          <Avatar className="author-avatar">{authorInitial}</Avatar>
          <Typography variant="subtitle2" className="author-name">
            {authorName}
          </Typography>
        </Box>

        {/* Optional Image */}
        {blog.image && (
          <CardMedia
            component="img"
            height="160"
            image={blog.image}
            alt={blog.title}
            className="blog-card-media"
          />
        )}

        {/* Title */}
        <Typography variant="h6" component="h2" className="blog-card-title">
          {blog.title}
        </Typography>

        {/* Short Description */}
        <Typography variant="body2" className="blog-card-description">
          {blog.description || 'No description provided.'}
        </Typography>

        {/* Footer: Reactions & Read Link */}
        <Box className="blog-card-footer">
          <Box className="blog-card-reactions">
            <IconButton
              onClick={handleLike}
              size="small"
              className={`reaction-btn ${userReaction === 'like' ? 'liked' : ''}`}
            >
              {userReaction === 'like' ? (
                <ThumbUpIcon fontSize="small" />
              ) : (
                <ThumbUpOutlinedIcon fontSize="small" />
              )}
              <span className="reaction-count">{likes}</span>
            </IconButton>

            <IconButton
              onClick={handleDislike}
              size="small"
              className={`reaction-btn ${userReaction === 'dislike' ? 'disliked' : ''}`}
            >
              {userReaction === 'dislike' ? (
                <ThumbDownAltIcon fontSize="small" />
              ) : (
                <ThumbDownAltOutlinedIcon fontSize="small" />
              )}
              <span className="reaction-count">{dislikes}</span>
            </IconButton>
          </Box>

          <Button
            component={Link}
            to={isUser ? `/myBlogs/${blog._id}` : `/blogs/${blog._id}`}
            size="small"
            endIcon={<ArrowForwardIcon />}
            className="read-more-btn"
          >
            Read
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
