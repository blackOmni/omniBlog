const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A blog title is required'],
  },
  desc: {
    type: String,
    required: [true, 'A blog description is required'],
  },
  img: {
    type: String,
    required: [true, 'A blog image URL is required'],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Blog', blogSchema);