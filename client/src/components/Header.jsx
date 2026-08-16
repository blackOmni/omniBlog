import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, themeActions } from '../store';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

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
    <AppBar position="sticky" color="default">
      <Toolbar>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          style={{
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: 'bold',
          }}
        >
          OmniBlog
        </Typography>

        {isLoggedIn && (
          <Box display="flex" marginLeft="auto" marginRight="auto" gap={2}>
            <Button component={Link} to="/blogs" color="inherit">
              All Blogs
            </Button>
            <Button component={Link} to="/myBlogs" color="inherit">
              My Blogs
            </Button>
            <Button component={Link} to="/blogs/add" color="inherit">
              Add Blog
            </Button>
          </Box>
        )}

        <Box display="flex" marginLeft="auto" alignItems="center" gap={1}>
          {!isLoggedIn ? (
            <Button
              onClick={() => navigate('/login')}
              variant="contained"
              color="primary"
            >
              Login / Signup
            </Button>
          ) : (
            <Button onClick={handleLogout} variant="outlined" color="error">
              Logout
            </Button>
          )}

          <Button
            onClick={() => dispatch(themeActions.toggleDarkMode())}
            color="inherit"
          >
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
