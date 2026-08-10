const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

// 1. MIDDLEWARES
app.use(cors());
app.use(express.json());

// 2. SERVE STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

// 3. BASIC TEST ROUTE
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is up and running!',
  });
});

module.exports = app;
