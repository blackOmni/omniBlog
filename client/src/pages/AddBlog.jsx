import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';

const AddBlog = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);
  const [inputs, setInputs] = useState({ title: '', desc: '', img: '' });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/blogs/add', {
        title: inputs.title,
        desc: inputs.desc,
        img: inputs.img,
        user: userId,
      });
      navigate('/blogs');
    } catch (err) {
      console.error('Failed to create blog:', err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        flexDirection="column"
        width="60%"
        margin="auto"
        marginTop={5}
        padding={4}
        boxShadow={3}
        borderRadius={3}
      >
        <Typography variant="h4" textAlign="center" mb={3}>
          Add New Blog
        </Typography>
        <TextField
          name="title"
          label="Title"
          value={inputs.title}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          name="desc"
          label="Description"
          value={inputs.desc}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={6}
          fullWidth
          required
        />
        <TextField
          name="img"
          label="Image URL"
          value={inputs.img}
          onChange={handleChange}
          margin="normal"
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Submit Blog
        </Button>
      </Box>
    </form>
  );
};

export default AddBlog;
