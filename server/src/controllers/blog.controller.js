const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const User = require('../models/User');
const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

// 1. Get All Blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find()
    .populate('user', 'name email')
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, { blogs }, 'Blogs fetched successfully'));
});

// 2. Add New Blog (with Session Transaction)
const addBlog = asyncHandler(async (req, res) => {
  const { title, description, content, image, category, user } = req.body;

  if (!title || !description || !content || !user) {
    throw new ApiError(400, 'Please provide all required fields.');
  }

  const existingUser = await User.findById(user);
  if (!existingUser) {
    throw new ApiError(404, 'User not found.');
  }

  const newBlog = new Blog({
    title,
    description,
    content,
    image: image || '',
    category: category || 'General',
    user,
  });

  const session = await mongoose.startSession();
  session.startTransaction();
  await newBlog.save({ session });
  existingUser.blogs.push(newBlog);
  await existingUser.save({ session });
  await session.commitTransaction();
  session.endSession();

  return res
    .status(201)
    .json(new ApiResponse(201, { blog: newBlog }, 'Blog created successfully'));
});

// 3. Update Existing Blog
const updateBlog = asyncHandler(async (req, res) => {
  const { title, description, content, image, category } = req.body;
  const blogId = req.params.id;

  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    { title, description, content, image, category },
    { new: true, runValidators: true }
  );

  if (!updatedBlog) {
    throw new ApiError(404, 'Blog post not found.');
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { blog: updatedBlog }, 'Blog updated successfully')
    );
});

// 4. Get Single Blog By ID (Auto-increments view count)
const getById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  ).populate('user', 'name email');

  if (!blog) {
    throw new ApiError(404, 'Blog post not found.');
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { blog }, 'Blog details fetched successfully'));
});

// 5. Delete Blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blog.findByIdAndDelete(id).populate('user');
  if (!blog) {
    throw new ApiError(404, 'Blog post not found.');
  }

  if (blog.user && blog.user.blogs) {
    await User.findByIdAndUpdate(blog.user._id, {
      $pull: { blogs: id },
    });
  }

  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Blog deleted successfully'));
});

// 6. Get User's Created Blogs
const getByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const userWithBlogs = await User.findById(userId).populate({
    path: 'blogs',
    options: { sort: { createdAt: -1 } },
  });

  if (!userWithBlogs) {
    throw new ApiError(404, 'User not found.');
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { blogs: userWithBlogs.blogs },
        'User blogs fetched successfully'
      )
    );
});

// 7. Toggle Like / Unlike Post
const toggleLikeBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  const { userId } = req.body;

  if (!userId) {
    throw new ApiError(400, 'User ID is required.');
  }

  const blog = await Blog.findById(blogId);
  if (!blog) {
    throw new ApiError(404, 'Blog post not found.');
  }

  const hasLiked = blog.likes.includes(userId);
  if (hasLiked) {
    blog.likes = blog.likes.filter((id) => id.toString() !== userId);
  } else {
    blog.likes.push(userId);
  }

  await blog.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { likes: blog.likes },
        'Like status updated successfully'
      )
    );
});

module.exports = {
  getAllBlogs,
  addBlog,
  updateBlog,
  getById,
  deleteBlog,
  getByUserId,
  toggleLikeBlog,
};
