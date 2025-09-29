const express = require('express');
const { login, getProfile } = require('../controllers/authController');
const { validateLogin } = require('../middleware/validation');
const { authenticate } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/login
// @desc    Login admin user
// @access  Public
router.post('/login', validateLogin, login);

// @route   GET /api/auth/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', authenticate, getProfile);

module.exports = router;