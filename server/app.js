const path = require('path');
const express = require('express');
const cors = require('cors');

const userRoutes = require('./src/routes/userRoutes');
const blogRoutes = require('./src/routes/blogRoutes');

const app = express();

// 1. MIDDLEWARES
app.use(cors());
app.use(express.json());

// 2. SERVE STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// 3. API ROUTES
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/blogs', blogRoutes);

// 4. BASIC TEST ROUTE
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is up and running!',
  });
});

module.exports = app;