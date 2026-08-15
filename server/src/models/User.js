const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user name is required'],
  },
  email: {
    type: String,
    required: [true, 'An email address is required'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'A password is required'],
    minlength: 6,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

module.exports = mongoose.model('User', userSchema);