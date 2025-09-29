const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  status: {
    type: String,
    enum: ['planning', 'in-progress', 'completed', 'on-hold'],
    default: 'completed',
    required: true
  },
  category: {
    type: String,
    required: [true, 'Project category is required'],
    trim: true,
    maxlength: [50, 'Category cannot exceed 50 characters']
  },
  location: {
    type: String,
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  client: {
    type: String,
    trim: true,
    maxlength: [200, 'Client name cannot exceed 200 characters']
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  isFeature: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for ordering and filtering
projectSchema.index({ order: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ isFeature: 1 });

module.exports = mongoose.model('Project', projectSchema);