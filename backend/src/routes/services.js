const express = require('express');
const {
  getServices,
  getAllServices,
  getService,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');
const { validateService } = require('../middleware/validation');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { cacheMiddleware } = require('../middleware/cache');

const router = express.Router();

// @route   GET /api/services
// @desc    Get all active services
// @access  Public
router.get('/', cacheMiddleware('services'), getServices);

// @route   GET /api/services/admin
// @desc    Get all services for admin
// @access  Private (Admin only)
router.get('/admin', authenticate, requireAdmin, getAllServices);

// @route   GET /api/services/:id
// @desc    Get single service
// @access  Public
router.get('/:id', cacheMiddleware('services'), getService);

// @route   POST /api/services
// @desc    Create new service
// @access  Private (Admin only)
router.post('/', authenticate, requireAdmin, validateService, createService);

// @route   PUT /api/services/:id
// @desc    Update service
// @access  Private (Admin only)
router.put('/:id', authenticate, requireAdmin, validateService, updateService);

// @route   DELETE /api/services/:id
// @desc    Delete service
// @access  Private (Admin only)
router.delete('/:id', authenticate, requireAdmin, deleteService);

module.exports = router;