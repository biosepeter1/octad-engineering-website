const mongoose = require('mongoose');

const successStorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Success story title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  client: {
    type: String,
    required: [true, 'Client name is required'],
    trim: true,
    maxlength: [200, 'Client name cannot exceed 200 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
    maxlength: [200, 'Location cannot exceed 200 characters']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Residential', 'Commercial', 'Industrial', 'Infrastructure', 'Renovation'],
    trim: true
  },
  duration: {
    type: String,
    required: [true, 'Project duration is required'],
    trim: true,
    maxlength: [50, 'Duration cannot exceed 50 characters']
  },
  budget: {
    type: String,
    required: [true, 'Project budget is required'],
    trim: true,
    maxlength: [100, 'Budget cannot exceed 100 characters']
  },
  completionYear: {
    type: Number,
    required: [true, 'Completion year is required'],
    min: [2000, 'Completion year must be 2000 or later'],
    max: [new Date().getFullYear() + 5, 'Completion year cannot be more than 5 years in the future']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  // Journey to Success sections
  challenge: {
    type: String,
    required: [true, 'Challenge description is required'],
    trim: true,
    maxlength: [2000, 'Challenge cannot exceed 2000 characters']
  },
  solution: {
    type: String,
    required: [true, 'Solution description is required'],
    trim: true,
    maxlength: [2000, 'Solution cannot exceed 2000 characters']
  },
  result: {
    type: String,
    required: [true, 'Result description is required'],
    trim: true,
    maxlength: [2000, 'Result cannot exceed 2000 characters']
  },
  // Testimonial section
  testimonial: {
    quote: {
      type: String,
      required: [true, 'Testimonial quote is required'],
      trim: true,
      maxlength: [1000, 'Quote cannot exceed 1000 characters']
    },
    author: {
      type: String,
      required: [true, 'Testimonial author is required'],
      trim: true,
      maxlength: [200, 'Author name cannot exceed 200 characters']
    },
    position: {
      type: String,
      required: [true, 'Author position is required'],
      trim: true,
      maxlength: [200, 'Position cannot exceed 200 characters']
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
      default: 5
    }
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
  // Metrics for the story
  metrics: [{
    label: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, 'Metric label cannot exceed 100 characters']
    },
    value: {
      type: String,
      required: true,
      trim: true,
      maxlength: [50, 'Metric value cannot exceed 50 characters']
    },
    icon: {
      type: String,
      required: true,
      trim: true,
      maxlength: [10, 'Icon cannot exceed 10 characters'],
      default: '💰'
    }
  }],
  // Display settings
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0,
    min: [0, 'Order must be 0 or greater']
  }
}, {
  timestamps: true
});

// Indexes for performance
successStorySchema.index({ order: 1, createdAt: -1 });
successStorySchema.index({ isFeatured: 1 });
successStorySchema.index({ isActive: 1 });
successStorySchema.index({ category: 1 });
successStorySchema.index({ completionYear: -1 });

// Ensure only one featured story at a time
successStorySchema.pre('save', async function(next) {
  if (this.isFeatured && this.isModified('isFeatured')) {
    await this.constructor.updateMany(
      { _id: { $ne: this._id }, isFeatured: true },
      { isFeatured: false }
    );
  }
  next();
});

module.exports = mongoose.model('SuccessStory', successStorySchema);