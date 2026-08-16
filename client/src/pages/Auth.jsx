import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../store';
import axiosInstance from '../api/axios';

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
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        maxWidth={400}
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="50px auto"
        padding={4}
        borderRadius={3}
        boxShadow={3}
      >
        <Typography variant="h4">{isSignup ? 'Sign Up' : 'Login'}</Typography>
        {error && (
          <Typography color="error" mt={2}>
            {error}
          </Typography>
        )}

        {isSignup && (
          <TextField
            name="name"
            label="Name"
            value={inputs.name}
            onChange={handleChange}
            margin="normal"
            fullWidth
            required
          />
        )}
        <TextField
          name="email"
          type="email"
          label="Email"
          value={inputs.email}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          name="password"
          type="password"
          label="Password"
          value={inputs.password}
          onChange={handleChange}
          margin="normal"
          fullWidth
          required
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          {isSignup ? 'Register' : 'Sign In'}
        </Button>
        <Button onClick={() => setIsSignup(!isSignup)} sx={{ mt: 1 }}>
          {isSignup
            ? 'Already have an account? Login'
            : "Don't have an account? Sign Up"}
        </Button>
      </Box>
    </form>
  );
};

export default Auth;
