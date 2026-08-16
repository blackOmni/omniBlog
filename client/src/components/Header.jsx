// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, themeActions } from '../store';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LogoutIcon from '@mui/icons-material/Logout';
import './css/Header.css';

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
    <AppBar position="sticky" className="header-appbar" elevation={0}>
      <Toolbar className="header-toolbar">
        {/* Left Side: Brand Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          className="header-logo"
        >
          OmniBlog
        </Typography>

        {/* Center: Navigation Links */}
        <Box className="header-center-nav">
          <Button component={Link} to="/blogs" className="header-nav-btn">
            All Blogs
          </Button>
          {isLoggedIn && (
            <>
              <Button component={Link} to="/myBlogs" className="header-nav-btn">
                My Blogs
              </Button>
              <Button
                component={Link}
                to="/blogs/add"
                className="header-nav-btn"
              >
                Add Blog
              </Button>
            </>
          )}
        </Box>

        {/* Right Side: Theme Toggle FIRST, then Logout Icon */}
        <Box className="header-right-actions">
          <Tooltip title={isDarkMode ? 'Light Mode' : 'Dark Mode'}>
            <IconButton
              onClick={() => dispatch(themeActions.toggleDarkMode())}
              color="inherit"
              className="theme-toggle-btn"
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>

          {!isLoggedIn ? (
            <Button
              onClick={() => navigate('/login')}
              variant="contained"
              color="primary"
            >
              Login / Signup
            </Button>
          ) : (
            <Tooltip title="Logout">
              <IconButton
                onClick={handleLogout}
                color="error"
                className="logout-icon-btn"
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
