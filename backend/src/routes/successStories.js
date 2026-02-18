const express = require('express');
const {
  getSuccessStories,
  getFeaturedSuccessStory,
  getAllSuccessStories,
  getSuccessStory,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory,
  toggleFeatured,
  toggleActive
} = require('../controllers/successStoryController');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { cacheMiddleware } = require('../middleware/cache');

const router = express.Router();

// @route   GET /api/success-stories
// @desc    Get all active success stories (public)
// @access  Public
router.get('/', cacheMiddleware('stories'), getSuccessStories);

// @route   GET /api/success-stories/featured
// @desc    Get featured success story (public)
// @access  Public
router.get('/featured', cacheMiddleware('stories'), getFeaturedSuccessStory);

// @route   GET /api/success-stories/admin
// @desc    Get all success stories for admin (including inactive)
// @access  Private (Admin only)
router.get('/admin', authenticate, requireAdmin, getAllSuccessStories);

// @route   GET /api/success-stories/:id
// @desc    Get single success story
// @access  Public
router.get('/:id', cacheMiddleware('stories'), getSuccessStory);

// @route   POST /api/success-stories
// @desc    Create new success story
// @access  Private (Admin only)
router.post('/', authenticate, requireAdmin, createSuccessStory);

// @route   PUT /api/success-stories/:id
// @desc    Update success story
// @access  Private (Admin only)
router.put('/:id', authenticate, requireAdmin, updateSuccessStory);

// @route   DELETE /api/success-stories/:id
// @desc    Delete success story
// @access  Private (Admin only)
router.delete('/:id', authenticate, requireAdmin, deleteSuccessStory);

// @route   PATCH /api/success-stories/:id/featured
// @desc    Toggle featured status
// @access  Private (Admin only)
router.patch('/:id/featured', authenticate, requireAdmin, toggleFeatured);

// @route   PATCH /api/success-stories/:id/active
// @desc    Toggle active status
// @access  Private (Admin only)
router.patch('/:id/active', authenticate, requireAdmin, toggleActive);

module.exports = router;