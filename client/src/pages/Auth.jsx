// src/pages/Auth.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { authActions } from '../store';
import axiosInstance from '../api/axios';
import '../components/css/FormPages.css';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const endpoint = isSignup ? '/users/signup' : '/users/login';
    const payload = isSignup
      ? { name: inputs.name, email: inputs.email, password: inputs.password }
      : { email: inputs.email, password: inputs.password };

    try {
      const res = await axiosInstance.post(endpoint, payload);
      const userData = res?.user || res;

      if (userData && (userData._id || userData.id)) {
        dispatch(authActions.login(userData));
        navigate('/blogs');
      } else {
        setError('Unexpected authentication response.');
      }
    } catch (err) {
      setError(
        err.message || 'Authentication failed. Please check your details.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page-wrapper">
      <Paper className="form-container-card" elevation={0}>
        <Typography variant="h5" textAlign="center" className="form-heading">
          {isSignup ? 'Create Account' : 'Welcome Back'}
        </Typography>
        <Typography textAlign="center" className="form-subheading">
          {isSignup
            ? 'Sign up to post and manage blogs'
            : 'Log in to continue to OmniBlog'}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          {isSignup && (
            <TextField
              name="name"
              label="Full Name"
              value={inputs.name}
              onChange={handleChange}
              required
              fullWidth
            />
          )}
          <TextField
            name="email"
            type="email"
            label="Email Address"
            value={inputs.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            name="password"
            type="password"
            label="Password"
            value={inputs.password}
            onChange={handleChange}
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            className="primary-form-btn"
            fullWidth
          >
            {loading ? 'Processing...' : isSignup ? 'Sign Up' : 'Log In'}
          </Button>
        </Box>

        <Button
          onClick={() => {
            setIsSignup(!isSignup);
            setError('');
          }}
          fullWidth
          className="toggle-mode-btn"
        >
          {isSignup
            ? 'Already have an account? Log In'
            : "Don't have an account? Sign Up"}
        </Button>
      </Paper>
    </div>
  );
};

export default Auth;
