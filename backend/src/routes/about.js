const express = require('express');
const {
  getAbout,
  updateAbout,
  getAboutStats
} = require('../controllers/aboutController');
const { validateAbout } = require('../middleware/validation');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/about
// @desc    Get about information
// @access  Public
router.get('/', getAbout);

// @route   GET /api/about/stats
// @desc    Get about statistics
// @access  Private (Admin only)
router.get('/stats', authenticate, requireAdmin, getAboutStats);

// @route   PUT /api/about
// @desc    Update about information
// @access  Private (Admin only)
router.put('/', authenticate, requireAdmin, validateAbout, updateAbout);

module.exports = router;