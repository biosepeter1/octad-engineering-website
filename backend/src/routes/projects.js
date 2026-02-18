const express = require('express');
const {
  getProjects,
  getFeaturedProjects,
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');
const { validateProject } = require('../middleware/validation');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { cacheMiddleware } = require('../middleware/cache');

const router = express.Router();

// @route   GET /api/projects
// @desc    Get all projects (with filters)
// @access  Public
router.get('/', cacheMiddleware('projects'), getProjects);

// @route   GET /api/projects/featured
// @desc    Get featured projects
// @access  Public
router.get('/featured', cacheMiddleware('projects'), getFeaturedProjects);

// @route   GET /api/projects/admin
// @desc    Get all projects for admin
// @access  Private (Admin only)
router.get('/admin', authenticate, requireAdmin, getAllProjects);

// @route   GET /api/projects/:id
// @desc    Get single project
// @access  Public
router.get('/:id', cacheMiddleware('projects'), getProject);

// @route   POST /api/projects
// @desc    Create new project
// @access  Private (Admin only)
router.post('/', authenticate, requireAdmin, validateProject, createProject);

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private (Admin only)
router.put('/:id', authenticate, requireAdmin, validateProject, updateProject);

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private (Admin only)
router.delete('/:id', authenticate, requireAdmin, deleteProject);

module.exports = router;