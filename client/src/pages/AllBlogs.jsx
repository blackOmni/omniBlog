import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import axiosInstance from '../api/axios';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const data = await axiosInstance.get('/blogs');
      setBlogs(data.blogs || []);
    } catch (err) {
      console.error('Failed to fetch blogs:', err.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleBlogDeleted = (deletedId) => {
    setBlogs((prev) => prev.filter((blog) => blog._id !== deletedId));
  };

  return (
    <div>
      {blogs.map((blog) => (
        <BlogCard
          key={blog._id}
          id={blog._id}
          title={blog.title}
          desc={blog.desc}
          img={blog.img}
          userName={blog.user?.name}
          ownerId={blog.user?._id || blog.user}
          onDeleteSuccess={handleBlogDeleted}
        />
      ))}
    </div>
  );
};

export default AllBlogs;
