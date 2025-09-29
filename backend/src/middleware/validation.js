const { body, validationResult } = require('express-validator');

// Validation middleware to check for errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Auth validation rules
const validateLogin = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  handleValidationErrors
];

// Service validation rules
const validateService = [
  body('title')
    .notEmpty()
    .withMessage('Service title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('description')
    .notEmpty()
    .withMessage('Service description is required')
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('icon')
    .notEmpty()
    .withMessage('Service icon is required'),
  handleValidationErrors
];

// Project validation rules
const validateProject = [
  body('title')
    .notEmpty()
    .withMessage('Project title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('description')
    .notEmpty()
    .withMessage('Project description is required')
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
  body('category')
    .notEmpty()
    .withMessage('Project category is required')
    .isLength({ max: 50 })
    .withMessage('Category cannot exceed 50 characters'),
  body('status')
    .isIn(['planning', 'in-progress', 'completed', 'on-hold'])
    .withMessage('Invalid project status'),
  handleValidationErrors
];

// Contact validation rules
const validateContact = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 100 })
    .withMessage('Name cannot exceed 100 characters'),
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ max: 2000 })
    .withMessage('Message cannot exceed 2000 characters'),
  body('phone')
    .optional()
    .isLength({ max: 20 })
    .withMessage('Phone number cannot exceed 20 characters'),
  body('subject')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Subject cannot exceed 200 characters'),
  handleValidationErrors
];

// About validation rules
const validateAbout = [
  body('companyInfo')
    .notEmpty()
    .withMessage('Company information is required')
    .isLength({ max: 3000 })
    .withMessage('Company info cannot exceed 3000 characters'),
  body('mission')
    .notEmpty()
    .withMessage('Mission statement is required')
    .isLength({ max: 1000 })
    .withMessage('Mission cannot exceed 1000 characters'),
  body('vision')
    .notEmpty()
    .withMessage('Vision statement is required')
    .isLength({ max: 1000 })
    .withMessage('Vision cannot exceed 1000 characters'),
  handleValidationErrors
];

module.exports = {
  validateLogin,
  validateService,
  validateProject,
  validateContact,
  validateAbout,
  handleValidationErrors
};