const express = require('express');
const { getAllUser, signUp, logIn } = require('../controllers/userController');

const router = express.Router();

router.get('/', getAllUser);
router.post('/signup', signUp);
router.post('/login', logIn);

module.exports = router;