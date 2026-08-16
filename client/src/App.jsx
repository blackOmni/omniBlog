// src/App.jsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './pages/Auth';
import AllBlogs from './pages/AllBlogs';
import UserBlogs from './pages/UserBlogs';
import UserBlogEdit from './pages/UserBlogEdit';
import AddBlog from './pages/AddBlog';
import BlogDetail from './pages/BlogDetail';

function App() {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <Header />
      <main className="app-main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/blogs" replace />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/blogs" element={<AllBlogs />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />

          {/* Protected Routes */}
          <Route
            path="/myBlogs"
            element={
              <ProtectedRoute>
                <UserBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myBlogs/:id"
            element={
              <ProtectedRoute>
                <BlogDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/myBlogs/edit/:id"
            element={
              <ProtectedRoute>
                <UserBlogEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs/add"
            element={
              <ProtectedRoute>
                <AddBlog />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/blogs" replace />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
