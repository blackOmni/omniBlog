import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BlogCard from '../components/BlogCard';
import axiosInstance from '../api/axios';
import { Typography } from '@mui/material';

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const userId = useSelector((state) => state.auth.userId);

  const fetchUserBlogs = async () => {
    try {
      const data = await axiosInstance.get(`/blogs/user/${userId}`);
      setBlogs(data.user?.blogs || []);
    } catch (err) {
      console.error('Failed to fetch user blogs:', err.message);
    }
  };

  useEffect(() => {
    if (userId) fetchUserBlogs();
  }, [userId]);

  const handleBlogDeleted = (deletedId) => {
    setBlogs((prev) => prev.filter((blog) => blog._id !== deletedId));
  };

  return (
    <div>
      {blogs.length === 0 ? (
        <Typography textAlign="center" mt={5} variant="h6">
          You have not created any blogs yet.
        </Typography>
      ) : (
        blogs.map((blog) => (
          <BlogCard
            key={blog._id}
            id={blog._id}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            ownerId={userId}
            onDeleteSuccess={handleBlogDeleted}
          />
        ))
      )}
    </div>
  );
};

export default UserBlogs;
