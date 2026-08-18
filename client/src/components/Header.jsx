// src/components/Header.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { authActions, themeActions } from '../store';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/login');
  };

  return (
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={Link}
          to="/blogs"
          sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
        >
          OmniBlog
        </Typography>

        <Box display="flex" alignItems="center" gap={1}>
          <Button component={Link} to="/blogs" color="inherit">
            Blogs
          </Button>

          {isLoggedIn && (
            <>
              <Button component={Link} to="/myBlogs" color="inherit">
                My Blogs
              </Button>
              <Button component={Link} to="/blogs/add" color="inherit">
                Add Blog
              </Button>
            </>
          )}

          <IconButton
            onClick={() => dispatch(themeActions.toggleDarkMode())}
            color="inherit"
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>

          {isLoggedIn ? (
            <Button
              variant="outlined"
              color="error"
              onClick={handleLogout}
              sx={{ ml: 1 }}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="contained"
              component={Link}
              to="/login"
              sx={{ ml: 1 }}
            >
              Login / Signup
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
