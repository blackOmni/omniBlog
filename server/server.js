const mongoose = require('mongoose');
const dotenv = require('dotenv');

// 1. Load environment variables
dotenv.config({ path: './config.env' });

const app = require('./app');

// 2. Database Connection String Setup
const DB = process.env.DATABASE
  ? process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
  : 'mongodb://127.0.0.1:27017/test';

// 3. Connect to MongoDB
mongoose
  .connect(DB)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('DB connection successful!');
  })
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error('DB connection error:', err.message);
  });

// 4. Start Server
const port = process.env.PORT || 3000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}...`);
});
 