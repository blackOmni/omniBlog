import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axios';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ title: '', desc: '' });

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await axiosInstance.get(`/blogs/${id}`);
        setInputs({
          title: data.blog.title || '',
          desc: data.blog.desc || '',
        });
      } catch (err) {
        console.error('Failed to fetch blog details:', err.message);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/blogs/update/${id}`, {
        title: inputs.title,
        desc: inputs.desc,
      });
      navigate('/myBlogs');
    } catch (err) {
      console.error('Failed to update blog:', err.message);
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
          Edit Blog
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
        <Button
          type="submit"
          variant="contained"
          color="warning"
          sx={{ mt: 3 }}
        >
          Update Blog
        </Button>
      </Box>
    </form>
  );
};

export default BlogDetail;
