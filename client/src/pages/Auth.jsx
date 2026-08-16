// src/pages/Auth.jsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store';
import axiosInstance from '../api/axios';
import './css/Auth.css';

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isSignup ? '/users/signup' : '/users/login';

    try {
      const data = await axiosInstance.post(endpoint, {
        ...(isSignup && { name: inputs.name }),
        email: inputs.email,
        password: inputs.password,
      });

      dispatch(authActions.login(data.user._id));
      navigate('/blogs');
    } catch (err) {
      setError(
        err.message || 'Authentication failed. Please check your credentials.'
      );
    }
  };

  return (
    <div className="auth-wrapper">
      <Box className="auth-card" component="form" onSubmit={handleSubmit}>
        <div className="auth-header">
          <Typography variant="h4" className="auth-title">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </Typography>
          <Typography variant="body2" className="auth-subtitle">
            {isSignup
              ? 'Sign up to start creating and sharing posts'
              : 'Enter your credentials to access your blog account'}
          </Typography>
        </div>

        {error && (
          <Alert severity="error" className="auth-alert">
            {error}
          </Alert>
        )}

        {isSignup && (
          <TextField
            name="name"
            label="Full Name"
            value={inputs.name}
            onChange={handleChange}
            className="auth-input"
            variant="outlined"
            fullWidth
            required
          />
        )}

        <TextField
          name="email"
          type="email"
          label="Email Address"
          value={inputs.email}
          onChange={handleChange}
          className="auth-input"
          variant="outlined"
          fullWidth
          required
        />

        <TextField
          name="password"
          type="password"
          label="Password"
          value={inputs.password}
          onChange={handleChange}
          className="auth-input"
          variant="outlined"
          fullWidth
          required
        />

        <Button
          type="submit"
          variant="contained"
          fullWidth
          className="auth-submit-btn"
        >
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Button>

        <div className="auth-footer">
          <Typography variant="body2" className="auth-toggle-text">
            {isSignup ? 'Already have an account?' : "Don't have an account?"}
          </Typography>
          <Button
            onClick={() => {
              setIsSignup(!isSignup);
              setError('');
            }}
            className="auth-toggle-btn"
          >
            {isSignup ? 'Log In' : 'Sign Up'}
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Auth;
