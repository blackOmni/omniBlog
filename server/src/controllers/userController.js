const bcrypt = require('bcryptjs');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    if (!users || users.length === 0) {
      return res.status(404).json(new ApiError(404, 'Users not found'));
    }
    return res
      .status(200)
      .json(new ApiResponse(200, { users }, 'Users fetched successfully'));
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, 'Server error while fetching users'));
  }
};

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(new ApiError(400, 'User already exists'));
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      blogs: [],
    });

    await user.save();
    return res
      .status(201)
      .json(new ApiResponse(201, { user }, 'User registered successfully'));
  } catch (e) {
    return res
      .status(500)
      .json(new ApiError(500, 'Server error while signing up'));
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json(new ApiError(404, 'User not found'));
    }

    const isPasswordCorrect = bcrypt.compareSync(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json(new ApiError(400, 'Incorrect Password'));
    }

    return res
      .status(200)
      .json(
        new ApiResponse(200, { user: existingUser }, 'Login successful')
      );
  } catch (err) {
    return res
      .status(500)
      .json(new ApiError(500, 'Server error while logging in'));
  }
};

module.exports = { getAllUser, signUp, logIn };