const express = require('express');
const {
  createContact,
  getContacts,
  getContact,
  updateContact,
  markAsRead,
  markAsReplied,
  sendReply,
  deleteContact,
  getContactStats
} = require('../controllers/contactController');
const { validateContact } = require('../middleware/validation');
const { authenticate, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/contact
// @desc    Create new contact message
// @access  Public
router.post('/', validateContact, createContact);

// @route   GET /api/contact/stats
// @desc    Get contact statistics
// @access  Private (Admin only)
router.get('/stats', authenticate, requireAdmin, getContactStats);

// @route   GET /api/contact
// @desc    Get all contact messages
// @access  Private (Admin only)
router.get('/', authenticate, requireAdmin, getContacts);

// @route   GET /api/contact/:id
// @desc    Get single contact message
// @access  Private (Admin only)
router.get('/:id', authenticate, requireAdmin, getContact);

// @route   PUT /api/contact/:id
// @desc    Update contact message
// @access  Private (Admin only)
router.put('/:id', authenticate, requireAdmin, updateContact);

// @route   PATCH /api/contact/:id/read
// @desc    Mark contact message as read
// @access  Private (Admin only)
router.patch('/:id/read', authenticate, requireAdmin, markAsRead);

// @route   PATCH /api/contact/:id/replied
// @desc    Mark contact message as replied
// @access  Private (Admin only)
router.patch('/:id/replied', authenticate, requireAdmin, markAsReplied);

// @route   POST /api/contact/:id/reply
// @desc    Send reply email to contact
// @access  Private (Admin only)
router.post('/:id/reply', authenticate, requireAdmin, sendReply);

// @route   DELETE /api/contact/:id
// @desc    Delete contact message
// @access  Private (Admin only)
router.delete('/:id', authenticate, requireAdmin, deleteContact);

module.exports = router;