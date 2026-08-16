import React from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Avatar,
  Box,
  IconButton,
} from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../api/axios';

const BlogCard = ({
  id,
  title,
  desc,
  img,
  userName,
  ownerId,
  onDeleteSuccess,
}) => {
  const navigate = useNavigate();
  const currentUserId = useSelector((state) => state.auth.userId);
  const isOwner = currentUserId === ownerId;

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/blogs/${id}`);
      if (onDeleteSuccess) onDeleteSuccess(id);
    } catch (err) {
      console.error('Failed to delete blog:', err.message);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto', boxShadow: 3 }}>
      {isOwner && (
        <Box display="flex" justifyContent="flex-end" padding={1}>
          <IconButton
            onClick={() => navigate(`/myBlogs/${id}`)}
            color="warning"
          >
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={handleDelete} color="error">
            <DeleteForeverIcon />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {userName ? userName.charAt(0).toUpperCase() : 'U'}
          </Avatar>
        }
        title={title}
        subheader={`By ${userName || 'Anonymous'}`}
      />
      {img && (
        <CardMedia component="img" height="240" image={img} alt={title} />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
